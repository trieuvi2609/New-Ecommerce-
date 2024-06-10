import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/user"; // Adjust the import path as necessary
import { CustomError, ResponseData } from "../types/type";
import { LoginResponse } from "../dto/auth.dto";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed.") as any;
    error.statusCode = 422;
    error.data = errors.array();
    return next(error);
  }

  const { email, userName, password } = req.body;

  try {
    const hashedPw = await bcrypt.hash(password, 12);
    const user = new User({ email, password: hashedPw, userName });
    const result = await user.save();
    res
      .status(201)
      .json({ message: "User created!", userId: result._id, statusCode: 201 });
  } catch (err) {
    const customError = err as CustomError;
    if (!customError.statusCode) {
      customError.statusCode = 500;
    }
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    const user = (await User.findOne({ email })) as IUser | null;
    if (!user) {
      const error = new Error(
        "A user with this email could not be found!"
      ) as any;
      error.statusCode = 401;
      throw error;
    }

    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error("Wrong password!") as any;
      error.statusCode = 401;
      throw error;
    }

    const accessToken = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString(),
      },
      "somesupersecretsecret",
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      { userId: user._id.toString() },
      "somesupersecretsecret", // Use a secure secret key for signing the token
      { expiresIn: "7d" } // Refresh token expires in 7 days
    );

    const response: ResponseData<LoginResponse> = {
      data: {
        accessToken,
        refreshToken,
        userId: user._id.toString(),
        statusCode: 200,
        userName: user.userName,
      },
      statusCode: 200,
    };
    res.status(200).json(response);
  } catch (err) {
    const customError = err as CustomError;
    if (!customError.statusCode) {
      customError.statusCode = 500;
    }
    next(err);
  }
};
