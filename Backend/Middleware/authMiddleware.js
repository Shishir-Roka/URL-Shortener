import { validateUserToken } from "../utils/token.js";

export function authMiddleware(req,res,next){

    const authHeader = req.headers["authorization"];
    
    if (!authHeader) return next();

    const token = authHeader.split(" ")[1];
    const payload = validateUserToken(token)
    req.user = payload;    
    
    next();
}