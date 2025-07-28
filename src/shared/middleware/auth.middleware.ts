import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const header = req.headers["authorization"]?.replace("Bearer ", "");
  if (!header) {
    res.status(401).json({ message: "Authorization header missing" });
    return;
  }
  try {
    const decoded = jwt.verify(header, JWT_SECRET) as { id: string };

    req.user = { id: decoded.id, email: "", role: "", clientDetailsId: "" };
    next();
  } catch {
    res.status(403).json({ message: "Invalid token" });
  }
};
