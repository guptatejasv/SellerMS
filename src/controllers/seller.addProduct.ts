import { Request, Response } from "express";
import { Product } from "../models/seller.model";

export const addProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, category } = req.body;
    const product = await Product.create({
      name,
      description,
      price,
      category,
    });
    res.status(201).json({
      status: "success",
      message: "Product Added Successfully..",
      data: {
        product,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
