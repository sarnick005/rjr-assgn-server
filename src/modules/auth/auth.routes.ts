import { Router } from "express";
import { signinController, signupController } from "./auth.controller";

const authRouter = Router();

authRouter.post("/signup", signupController);
authRouter.post("/signin", signinController);

export default authRouter;
