import { validateUserToken } from "../utils/token.js";

export function authMiddleware(req, res, next) {
  const token = req.cookies.token;

  if (!token) return next();

  try {
    const payload = validateUserToken(token); 
    req.user = payload; 
  } catch (err) {
    console.error("Invalid token:", err.message);
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
}


export function ensureAuthentication(req, res, next) {
  if (!req.user || !req.user.id) {
    return res.status(401).json({ error: "You must login to access the page" });
  }
  next();
}
