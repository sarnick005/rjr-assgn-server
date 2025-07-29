import { User, UserRole } from "../../generated/prisma";

declare global {
  namespace Express {
    interface Request {
      user?: User
    }
  }
}

export {};
