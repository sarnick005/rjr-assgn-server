import express from "express";
import cors from "cors";
import { loggerMiddleware } from "./shared/middleware/logger.middleware";
import errorMiddleware from "./shared/middleware/error.middleware";
import { CORS_ORIGIN } from "./shared/config/env";
import router from "./routes";

const app = express();
const logger = loggerMiddleware();

// CORS config
app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);

// MIDDLEWARES
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
if (logger) app.use(logger);

// ROUTES
app.use(router);

// ERROR HANDLER
app.use(errorMiddleware);

export { app };
