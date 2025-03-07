import { Router } from "express";
import {
  getUserProfile,
  login,
  register,
} from "../controllers/authControllers.js";
import { isAuthenticated } from "../middlewares/authentication.js";

const router = Router();

router.post("/register", register);

router.post("/login", login);
router.get("/user-profile", isAuthenticated, getUserProfile);

export default router;
