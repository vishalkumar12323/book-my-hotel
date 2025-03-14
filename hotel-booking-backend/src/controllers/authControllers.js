import bcrypt from "bcrypt";
import { prisma } from "../config/database.js";
import { createAccessToken, createRefreshToken } from "../lib/tokenServices.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, roles: role },
    });

    const accessToken = createAccessToken({ id: user.id });
    const refreshToken = createRefreshToken({ id: user.id });

    await prisma.session.create({
      data: {
        userId: user.id,
        refreshToken,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5),
      },
    });
    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 5,
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.status(201).json({ accessToken });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        password: true,
      },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = createAccessToken({ id: user.id });
    const refreshToken = createRefreshToken({ id: user.id });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 5,
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.status(201).json({ accessToken });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        email: true,
        id: true,
        name: true,
        roles: true,
        Session: true,
      },
    });

    res.status(200).json(user);
  } catch (error) {
    console.log("error get user: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const reAuthenticate = async (req, res) => {
  const refreshToken =
    req.cookies?.refreshToken || req.headers.authorization?.split(" ")[1];

  if (!refreshToken) return res.status(401).json({ message: "Unauthorized" });

  try {
    const session = await prisma.session.findUnique({
      where: { refreshToken },
      include: {
        user: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!session) return res.status(403).json({ message: "Forbidden" });

    const accessToken = createAccessToken({ id: session.userId });
    res.status(200).json({ accessToken });
  } catch (error) {
    console.error("Error re-authenticating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
