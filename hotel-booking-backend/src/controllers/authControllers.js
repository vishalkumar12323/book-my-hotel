import bcrypt from "bcrypt";
import { prisma } from "../config/database.js";
import { createToken } from "../lib/tokenServices.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, role },
    });
    const token = createToken({ id: user.id, role: user.role });
    res.status(201).json({ token });
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
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = createToken({ id: user.id, role: user.role });

    res.status(201).json({ token });
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
        _count: { select: { Booking: true } },
        Booking: true,
        email: true,
        id: true,
        name: true,
        role: true,
      },
    });

    res.status(200).json(user);
  } catch (error) {
    console.log("error get user: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
