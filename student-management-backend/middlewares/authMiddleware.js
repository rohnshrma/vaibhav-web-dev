import jwt from "jsonwebtoken";
import Admin from "../models/admin.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const token = authHeader.split(" ")[1];

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const user = await Admin.findById(decode.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "Admin/User not found",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid Token",
    });
  }
};
export default authMiddleware;

export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "unauthorized" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Forbiddden : Insufficient permissions",
      });
    }

    next();
  };
};
