import express from "express";
import AuthService from "../services/auth-servcie.js";
import { isAuthenticated } from "./middlewares/index.js";

const router = express.Router();
const authService = new AuthService();

// Route for getting user profile
// This route is protected and requires authentication
router.route("/user-profile").get(isAuthenticated, async (req, res) => {
  try {
    const user = await authService.getUserProfile(req.user.id);
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error getting user profile:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route for signing up a new user
router.route("/signup").post(async (req, res) => {
  const { name, email, password, roles } = req.body;
  try {
    const { accessToken, refreshToken, user } = await authService.signup({
      name,
      email,
      password,
      roles,
    });

    await authService.createSession(user.id, refreshToken);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 5, // 5 days
    });
    res.status(201).json({ accessToken });
  } catch (error) {
    console.error("Error during signup:", error);
    if (error.message === "USER_EXISTS") {
      return res.status(409).json({
        message: "User already exists with this email",
      });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route for logging in an existing user
router.route("/login").post(async (req, res) => {
  const { email, password } = req.body;
  try {
    const { accessToken, refreshToken, user } = await authService.login({
      email,
      password,
    });

    await authService.updateSession(user.id, refreshToken);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 5, // 5 days
    });
    res.status(200).json({ accessToken });
  } catch (error) {
    console.error("Error during login:", error);
    if (error.message === "INVALID_CREDENTIALS") {
      return res.status(404).json({ message: "Invalid email or password" });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route for refreshing the user session
router.route("/refresh-session").post(async (req, res) => {
  try {
    if (!req.cookies.refreshToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { accessToken, refreshToken, user } =
      await authService.refreshSession(req.cookies.refreshToken);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 5, // 5 days
    });
    res.status(201).json({ accessToken, user });
  } catch (error) {
    console.error("Error refreshing session:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route for logging out the user
// This route is protected and requires authentication
router.route("/logout").delete(isAuthenticated, async (req, res) => {
  try {
    await authService.logout(req.user.id);
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
