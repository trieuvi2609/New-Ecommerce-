import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  email: string;
  password: string;
  userName: string;
  status: string;
  cart: Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Hello!",
  },
  cart: [{
    type: Schema.Types.ObjectId,
    ref: 'Cart',
  }],
});

export default mongoose.model<IUser>('User', userSchema);
