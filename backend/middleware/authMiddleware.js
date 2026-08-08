import { extractBearerToken, verifyAccessToken } from "../services/JWTServices.js";

export const authMiddleware = async (req, res, next) => {
  // Check for Token in headers
  let token = extractBearerToken(req.headers.authorization)

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {

    // Verify token
    const decoded = verifyAccessToken(token);
    // Attach user ID/info to request object
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, token failed" });
  }

};
