import { Schema, Document, model, ObjectId } from "mongoose";

export interface IAuth extends Document {
  sellerId: ObjectId;
  productId: ObjectId;
  discountType?: string;
  discount?: number;
  startDate?: Date;
  endDate?: Date;
}

const AuthSchema: Schema = new Schema(
  {
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Products",
      required: true,
    },
    discountType: {
      type: String,
    },
    discount: {
      type: Number,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Discount = model<IAuth>("Discount", AuthSchema);
