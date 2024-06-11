import { NextFunction, Request, Response } from "express";
import Product from "../models/product";
import { IProduct } from "../models/product";
import { AuthRequest, CustomError, ResponseData } from "../types/type";
import { CreateProduct, ListProductsResponse } from "../dto/admin.dto";

export const getProducts = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.isAuth) {
      const error: CustomError = new Error("Unauthorized");
      error.statusCode = 401;
      throw error;
    }
    const products = await Product.find();
    const transformedProducts = products.map((product: IProduct) => {
      const productObject = product.toObject(); // Convert Mongoose document to plain JavaScript object
      return {
        ...productObject,
        productId: product._id
      };
    });

    const response: ListProductsResponse = {
      data: transformedProducts,
      statusCode: 200,
    };
    res.status(200).json(response);
  } catch (err) {
    const error = new Error("Fetched products failed") as any;
    error.statusCode = 422;
    return next(error);
  }
};
