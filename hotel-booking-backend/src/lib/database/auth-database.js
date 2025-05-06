import { prisma } from "../db-client.js";
import { comparePassword, hashPassword } from "../../utils/password-service.js";
class AuthDatabase {
  constructor() {
    this.prisma = prisma;
  }

  async createUser({ name, email, password, roles }) {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: { email },
      });
      if (existingUser) {
        throw new Error("USER_EXISTS");
      }
      const hashedPassword = await hashPassword(password);
      const user = await this.prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          roles: roles?.split(" "),
        },
        select: { id: true, roles: true },
      });
      return user;
    } catch (error) {
      console.error("Error creating user:", error);
      if (error.message === "USER_EXISTS") {
        throw error;
      }
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
      if (!user) {
        throw new Error("USER_NOT_FOUND");
      }
      return user;
    } catch (error) {
      console.error("Error finding user by email:", error);
      if (error.message === "USER_NOT_FOUND") {
        throw error;
      }
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
  async createUserSession(userId, refreshToken) {
    try {
      const existingSession = await this.prisma.session.findFirst({
        where: {
          OR: [{ refreshToken }, { userId }],
        },
      });

      if (existingSession) {
        return await this.prisma.session.update({
          where: { id: existingSession.id },
          data: {
            userId,
            refreshToken,
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5),
          },
        });
      }
      return await this.prisma.session.create({
        data: {
          userId,
          refreshToken,
          expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5),
        },
      });
    } catch (error) {
      console.error("Error creating user session:", error);
      throw new Error("Error creating user session");
    }
  }
  async updateUserSession(userId, refreshToken) {
    try {
      const existingSession = await this.prisma.session.findUnique({
        where: { userId },
      });

      if (!existingSession) {
        return await this.createUserSession(userId, refreshToken);
      }

      await this.prisma.session.update({
        where: { userId },
        data: {
          refreshToken,
          expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5),
        },
      });
    } catch (error) {
      console.error("Error updating user session:", error);
      throw new Error("Error updating user session");
    }
  }
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
