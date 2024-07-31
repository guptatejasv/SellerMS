import { Schema, Document, model, ObjectId } from "mongoose";
import { Product } from "./seller.Product";

interface Product {
  productId: ObjectId;
  productName: string;
}
export interface IAuth extends Document {
  sellerId: ObjectId;
  bundleName: string;
  description: string;
  products: Product[];
  bundlePrice: number;
  isBlocked: boolean;
  isDeleted: boolean;
}

const productSchema = new Schema<Product>({
  productId: { type: Schema.Types.ObjectId, required: true },
  productName: { type: String, required: true },
});

const AuthSchema: Schema = new Schema(
  {
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },
    bundleName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    products: {
      type: [productSchema],
      required: true,
    },
    bundlePrice: {
      type: Number,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const BundleProduct = model<IAuth>("BundleProduct", AuthSchema);
