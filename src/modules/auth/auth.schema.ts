// auth.schema.ts
import { z } from "zod";

export const registerSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email().max(50),
  password: z
    .string()
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_]).{8,}$/,
      "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one special character"
    ),
  phone: z.string().length(10).optional(),
  role: z.enum(["CLIENT", "CA"]),
});
