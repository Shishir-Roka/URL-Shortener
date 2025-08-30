import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export function createUserToken(payload) {
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
}

export function validateUserToken(token){
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    return payload; 
 
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
}

