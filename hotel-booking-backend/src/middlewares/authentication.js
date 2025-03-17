import { verifiyAccessToken } from "../lib/tokenServices.js";

export const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const credentials = verifiyAccessToken(token);
    req.user = credentials;
    next();
  } catch (error) {
    console.log("authentication error ", error);

    res.status(403).json({ message: "Forbidden" });
  }
};
export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    console.log({ allowedRoles, roles: req.user.roles });
    const hasRole = allowedRoles.some((role) => req.user.roles?.includes(role));
    if (!hasRole) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};
