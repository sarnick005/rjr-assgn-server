import { UserRole } from "../../generated/prisma";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: UserRole;
        clientDetailsId?: string | null;
      };
    }
  }
}

export {};
