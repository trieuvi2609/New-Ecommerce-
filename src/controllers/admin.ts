import { NextFunction, Request, Response } from "express";
import Product from "../models/product";
import { IProduct } from "../models/product";
import { AuthRequest, CustomError, ResponseData } from "../types/type";
import { CreateProduct, ListProductsResponse } from "../dto/admin.dto";

export const getProductsAdmin = async (
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
    const products = await Product.find({ user: req.userId });
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

export const addProducts = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      productName,
      price,
      description,
      rating,
      quantityInStock,
      category,
      oldPrice,
    } = req.body;
    if (!req.isAuth) {
      const error: CustomError = new Error("Unauthorized");
      error.statusCode = 401;
      throw error;
    }
    if (!req.file) {
      const error: CustomError = new Error("No image provided");
      error.statusCode = 422;
      throw error;
    }
    console.log("req.file", req.file.path);
    const imageUrl = req.file.filename;
    const newProduct = new Product({
      productName,
      price,
      description,
      imageUrl: `images/${imageUrl}`,
      rating,
      quantityInStock,
      user: req.userId,
      category,
      oldPrice,
    });
    const result = await newProduct.save();
    console.log("result", result);
    const response: ResponseData<CreateProduct> = {
      data: {
        product: result,
        message: "Created product",
      },
      statusCode: 201,
    };

    res.status(201).json(response);
  } catch (err) {
    const customError = err as CustomError;
    if (!customError.statusCode) {
      customError.statusCode = 500;
    }
    next(err);
  }
};
