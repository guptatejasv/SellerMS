import { Schema, Document, model } from "mongoose";

export interface IAuth extends Document {}

const AuthSchema: Schema = new Schema(
  {},
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Product = model<IAuth>("Product", AuthSchema);
