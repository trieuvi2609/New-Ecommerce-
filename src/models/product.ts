import { Document, Schema, model } from 'mongoose';

export interface IProduct extends Document {
  productName: string;
  price: number;
  oldPrice: number;
  description: string;
  imageUrl: string;
  rating: number;
  user: Schema.Types.ObjectId;
  category: string;
}

const productSchema = new Schema<IProduct>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  oldPrice: { type: Number, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  rating: { type: Number, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, required: true },
});

const Product = model<IProduct>('Product', productSchema);

export default Product;
