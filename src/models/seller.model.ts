import { Schema, Document, model } from "mongoose";

export interface IAuth extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  stock?: number;
  discount?: number;
}

const AuthSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
    },
    discount: {
      type: Number,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Product = model<IAuth>("Product", AuthSchema);
