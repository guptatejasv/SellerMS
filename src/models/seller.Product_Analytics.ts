import { Schema, Document, model, ObjectId } from "mongoose";

export interface IAuth extends Document {
  productId: ObjectId;
  views: number;
  wishlistAdds: number;
  purchases: number;
  analyticsDate: Date;
}

const AuthSchema: Schema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Products",
      required: true,
    },
    views: {
      type: Number,
      required: true,
    },
    wishlistAdds: {
      type: Number,
      required: true,
    },
    purchases: {
      type: Number,
      required: true,
    },
    analyticsDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const ProductAnalytics = model<IAuth>("ProductAnalytics", AuthSchema);
