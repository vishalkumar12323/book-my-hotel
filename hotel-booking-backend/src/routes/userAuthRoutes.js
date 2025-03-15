import { Router } from "express";
import {
  getUserProfile,
  login,
  register,
  reAuthenticate,
} from "../controllers/authControllers.js";
import { isAuthenticated, isVerified } from "../middlewares/authentication.js";

const router = Router();

router.post("/register", register);

router.post("/login", login);
router.get("/user-profile", isAuthenticated, getUserProfile);
router.post("/refresh-token", isVerified, reAuthenticate);

export default router;
