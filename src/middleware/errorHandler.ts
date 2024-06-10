// middlewares/errorHandler.ts
import { Request, Response, NextFunction } from "express";
import { CustomError } from "../types/type";

const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "An unknown error occurred.";
  const data = err.data || null;

  res.status(statusCode).json({ message, data, statusCode });
};

export default errorHandler;
