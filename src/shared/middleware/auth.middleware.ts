import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";
import { UserRole } from "../../generated/prisma";
import { db } from "../config/db";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const header = req.headers["authorization"]?.replace("Bearer ", "");
  if (!header) {
    res.status(401).json({ message: "Authorization header missing" });
    return;
  }

  try {
    const decoded = jwt.verify(header, JWT_SECRET) as { id: string };
    const user = await db.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      res.status(403).json({ message: "User not found" });
      return;
    }

    req.user = user;
 
    next();
  } catch {
    res.status(403).json({ message: "Invalid token" });
  }
};