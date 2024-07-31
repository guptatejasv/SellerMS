import { Schema, Document, model, ObjectId } from "mongoose";

export interface IAuth extends Document {
  BundleProductId: ObjectId;
  quantitySold: number;
  totalRevenue: number;
  reportDate: Date;
}

const AuthSchema: Schema = new Schema(
  {
    BundleProductId: {
      type: Schema.Types.ObjectId,
      ref: "BundleProduct",
      required: true,
    },
    quantitySold: {
      type: Number,
      required: true,
    },
    totalRevenue: {
      type: Number,
      required: true,
    },
    reportDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const BundleProductSale = model<IAuth>("BundleProductSale", AuthSchema);
