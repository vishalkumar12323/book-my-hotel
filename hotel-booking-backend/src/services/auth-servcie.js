import Authdatabase from "../lib/database/auth-database.js";
import {
  createAccessToken,
  createRefreshToken,
} from "../utils/token-services.js";
import { comparePassword } from "../utils/password-service.js";

class AuthService {
  constructor() {
    this.db = new Authdatabase();
  }

  async signup({ name, email, password, roles }) {
    try {
      const user = await this.db.createUser({ name, email, password, roles });
      const accessToken = createAccessToken({
        id: user.id,
        roles: user.roles,
      });
      const refreshToken = createRefreshToken({
        id: user.id,
        roles: user.roles,
      });
      await this.db.createUserSession(user.id, refreshToken);
      return { accessToken, refreshToken, user };
    } catch (error) {
      console.error("Error during signup:", error);
      if (error.message === "USER_EXISTS") {
        throw error;
      }
      throw new Error("Error during signup");
    }
  }

  async login(credentials) {
    const { email, password } = credentials;
    try {
      let user;
      try {
        user = await this.db.findUserByEmail(email);
      } catch (error) {
        if (error.message === "USER_NOT_FOUND") {
          throw new Error("INVALID_CREDENTIALS");
        }
        throw error;
      }

      if (!(await comparePassword(password, user.password))) {
        throw new Error("INVALID_CREDENTIALS");
      }

      const accessToken = createAccessToken({
        id: user.id,
        roles: user.roles,
      });
      const refreshToken = createRefreshToken({
        id: user.id,
        roles: user.roles,
      });
      await this.db.updateUserSession(user.id, refreshToken);
      return { accessToken, refreshToken, user };
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  }

  async getUserProfile(id) {
    return await this.db.findUserById(id);
  }

  async refreshSession(refreshToken) {
    const userSession = await this.db.findUserByRefreshToken(refreshToken);
    if (!userSession) {
      throw new Error("Invalid refresh token");
    }
    const { user, userId } = userSession;
    const accessToken = createAccessToken({
      id: userId,
      roles: user.roles,
    });
    const newRefreshToken = createRefreshToken({
      id: userId,
      roles: user.roles,
    });
    await this.db.updateUserSession(userId, newRefreshToken);
    return { accessToken, refreshToken: newRefreshToken, user };
  }

  async createSession(userId, refreshToken) {
    return await this.db.createUserSession(userId, refreshToken);
  }

  async updateSession(userId, refreshToken) {
    return await this.db.updateUserSession(userId, refreshToken);
  }

  async logout(userId) {
    return await this.db.logout(userId);
  }
}

export default AuthService;
