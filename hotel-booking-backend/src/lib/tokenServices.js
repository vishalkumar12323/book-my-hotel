import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
export const createAccessToken = (payload) => {
  const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: "1m",
  });

  return accessToken;
};

export const createRefreshToken = (payload) => {
  const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: "5d",
  });

  return refreshToken;
};

export const verifiyAccessToken = (token) => {
  const credentials = jwt.verify(token, ACCESS_TOKEN_SECRET);

  return credentials;
};
