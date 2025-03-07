import { verifiyToken } from "../lib/tokenServices.js";

export const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const credentials = verifiyToken(token);
    req.user = credentials;
    next();
  } catch (error) {
    console.log("authentication error ", error);

    res.status(403).json({ message: "Forbidden" });
  }
};

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access Denied" });
    }
    next();
  };
};
