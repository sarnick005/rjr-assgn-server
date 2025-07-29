import { z } from "zod";
import { signinSchema, signupSchema } from "./auth.schema";

export type SignupBody = z.infer<typeof signupSchema>;
export type SigninBody = z.infer<typeof signinSchema>;

