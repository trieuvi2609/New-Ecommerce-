import mongoose, { Schema, Document, Types } from "mongoose";
import { IUser } from "./user";

export interface IShop extends Document {
  listProducts: Types.ObjectId[];
  rating: number;
  comments: Types.ObjectId[];
}

const shopSchema = new Schema<IShop>({
  listProducts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  comments: [
    {
      type: String,
    },
  ],
  rating: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model<IShop>("Shop", shopSchema);
