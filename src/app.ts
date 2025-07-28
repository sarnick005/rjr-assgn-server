import express from "express";
import cors from "cors";
import { loggerMiddleware } from "./shared/middleware/logger.middleware";
import errorMiddleware from "./shared/middleware/error.middleware";

const app = express();
const logger = loggerMiddleware();

// CORS config
app.use(cors());

// MIDDLEWARES
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
if (logger) app.use(logger);

// ROUTES
import authRouter from "./modules/auth/auth.routes";
import clientRouter from "./modules/client/client.route";
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/client", clientRouter);

// ERROR HANDLER
app.use(errorMiddleware);

export { app };
