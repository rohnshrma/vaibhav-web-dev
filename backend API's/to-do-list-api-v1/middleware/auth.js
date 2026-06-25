import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const authenticateToken = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "Access denied. No token provided.",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user from token and attach to request
    const user = await User.findById(decoded.userId).select("-password");
    
    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid token. User not found.",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({
        status: "fail",
        message: "Invalid token.",
      });
    }
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        status: "fail",
        message: "Token expired.",
      });
    }
    return res.status(500).json({
      status: "error",
      message: "Authentication error.",
    });
  }
};
