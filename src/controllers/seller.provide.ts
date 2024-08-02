import { Request, Response } from "express";
import { Product } from "../models/seller.Product";

export const provide = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      status: "success",
      result: products.length,
      data: {
        products,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
