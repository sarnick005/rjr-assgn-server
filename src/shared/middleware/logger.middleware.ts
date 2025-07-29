import morgan from "morgan";
import { RequestHandler } from "express";
import { NODE_ENV } from "../config/env";

export const loggerMiddleware = (): RequestHandler | null => {
  if (NODE_ENV === "development") {
    console.log(NODE_ENV);
    
    return morgan("dev");
  }
  return null;
};
