import { Request, Response } from "express";
import { Product } from "../models/seller.Product";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    const products = await Product.find({ sellerId: user.id });
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
