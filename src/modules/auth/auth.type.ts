import { z } from "zod";
import { registerSchema } from "./auth.schema";

export type RegisterBody = z.infer<typeof registerSchema>;
