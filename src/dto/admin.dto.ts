import { IProduct } from "../models/product";

export interface CreateProduct{
    product: IProduct;
    message: string;
}


export interface ListProductsResponse {
    data: IProduct[];
    statusCode: number
}