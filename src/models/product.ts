import mongoose, { Schema, Document, Types } from "mongoose";
import { IUser } from "./user";

export interface IProduct extends Document {
  productName: string;
  price: number;
  description: string;
  imageUrl: string;
  rating: number;
  user: IUser;
}

const productSchema = new Schema<IProduct>({
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model<IProduct>("Product", productSchema);
