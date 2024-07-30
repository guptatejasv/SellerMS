import { Schema, Document, model, ObjectId } from "mongoose";

export interface IAuth extends Document {
  productId: ObjectId;
  quantitySold: number;
  totalRevenue: number;
  reportDate: Date;
}

const AuthSchema: Schema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Products",
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

export const Sales = model<IAuth>("Sales", AuthSchema);
