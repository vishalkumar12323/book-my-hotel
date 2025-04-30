import { prisma } from "../db-client.js";
import { comparePassword, hashPassword } from "../../utils/password-service.js";
class AuthDatabase {
  constructor() {
    this.prisma = prisma;
  }

  async createUser({ name, email, password }) {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: { email },
      });
      if (existingUser) {
        throw new Error("User with email already exists");
      }
      const hashedPassword = await hashPassword(password);
      const user = await this.prisma.user.create({
        data: { name, email, password: hashedPassword },
        select: { id: true, roles: true },
      });
      return user;
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Error creating user");
    }
  }
  async findUserByEmail(email) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
          password: true,
          roles: true,
        },
      });
      return user;
    } catch (error) {
      console.error("Error finding user by email:", error);
      throw new Error("Error finding user by email");
    }
  }
  async findUserById(id) {
    try {
      return await prisma.user.findUnique({
        where: { id },
        select: {
          email: true,
          id: true,
          name: true,
          roles: true,
        },
      });
    } catch (error) {
      console.error("Error finding user by ID:", error);
      throw new Error("Error finding user by ID");
    }
  }
  async findUserByRefreshToken(refreshToken) {
    try {
      return await this.prisma.session.findUnique({
        where: { refreshToken },
        select: {
          userId: true,
          user: {
            select: {
              email: true,
              name: true,
              roles: true,
            },
          },
        },
      });
    } catch (error) {
      console.error("Error finding user by refresh token:", error);
      throw new Error("Error finding user by refresh token");
    }
  }
  async createUserSession(userId, refreshToken) {}
  async updateUserSession(userId, refreshToken) {}
  async logout(userId) {
    try {
      await this.prisma.session.delete({
        where: { userId },
      });
    } catch (error) {
      console.error("Error logging out user:", error);
      throw new Error("Error logging out user");
    }
  }
}

export default AuthDatabase;
