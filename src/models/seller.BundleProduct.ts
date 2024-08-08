import { Schema, Document, model, ObjectId } from "mongoose";
import { Product } from "./seller.Product";

interface Product {
  productId: ObjectId;
}
export interface IAuth extends Document {
  sellerId: ObjectId;
  bundleName: string;
  description: string;
  products: Product[];
  bundlePrice: number;
  sellerDiscountId?: ObjectId[];
  adminDiscountId?: ObjectId[];
  DiscountPrice?: number;
  isBlocked: boolean;
  isBlockedBy: ObjectId;
  isDeleted: boolean;
}

const productSchema = new Schema<Product>({
  productId: { type: Schema.Types.ObjectId, required: true },
});

const AuthSchema: Schema = new Schema(
  {
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: "Auth",
    },
    bundleName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    sellerDiscountId: {
      type: [Schema.Types.ObjectId],
    },
    adminDiscountId: {
      type: [Schema.Types.ObjectId],
    },
    products: {
      type: [productSchema],
      required: true,
    },
    DiscountPrice: {
      type: Number,
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
    isBlockedBy: {
      type: Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const BundleProduct = model<IAuth>("BundleProduct", AuthSchema);
