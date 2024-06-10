import { Request } from "express";

export interface CustomError extends Error {
    statusCode?: number;
    data?: any; // You can adjust this depending on the type of additional data you want to include
  }

export interface ResponseData<T> {
  data?: T;
  statusCode: number;
}

export interface AuthRequest extends Request {
  isAuth?: boolean;
  userId?: string;
}