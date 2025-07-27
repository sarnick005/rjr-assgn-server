import morgan from "morgan";
import { RequestHandler } from "express";

export const loggerMiddleware = (): RequestHandler | null => {
  if (process.env.NODE_ENV === "development") {
    return morgan("dev");
  }
  return null;
};
