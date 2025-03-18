import { Router } from "express";
import {
  getUserProfile,
  login,
  register,
  reAuthenticate,
  logout,
} from "../controllers/authControllers.js";
import { isAuthenticated } from "../middlewares/authentication.js";

const router = Router();

router.post("/register", register);

router.post("/login", login);
router.get("/user-profile", isAuthenticated, getUserProfile);
router.post("/refresh-session", reAuthenticate);
router.delete("/logout", isAuthenticated, logout);

export default router;
