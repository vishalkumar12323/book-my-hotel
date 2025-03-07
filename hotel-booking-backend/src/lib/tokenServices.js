import jwt from "jsonwebtoken";

export const createToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "5d" });

  return token;
};

export const verifiyToken = (token) => {
  const credentials = jwt.verify(token, process.env.JWT_SECRET);

  return credentials;
};
