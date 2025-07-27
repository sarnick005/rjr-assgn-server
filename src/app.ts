import express from "express";
import cors from "cors";
import errorMiddleware from "./shared/middleware/error.middleware";

const app = express();

// CORS config
app.use(cors());

// MIDDLEWARES
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(errorMiddleware);

export { app };
