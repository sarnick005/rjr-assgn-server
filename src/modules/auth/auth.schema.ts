import { z } from "zod";

export const signupSchema = z.object({
  name: z.string(),
  email: z.email().max(50),
  password: z
    .string()
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_]).{8,}$/,
      "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one special character"
    ),
  phone: z.string().length(10).optional(),
  role: z.enum(["CLIENT", "CA"]).optional(),
});

export const signinSchema = z.object({
  email: z.email().max(50),
  password: z
    .string()
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_]).{8,}$/,
      "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one special character"
    ),
});
