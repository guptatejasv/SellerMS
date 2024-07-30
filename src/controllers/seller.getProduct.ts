import { Request, Response } from "express";
import { Product } from "../models/seller.Product";

export const getProduct = async (req: Request, res: Response) => {
  try {
    const pro_id = req.params.id;
    const product = await Product.findById(pro_id);
    res.status(200).json({
      status: "success",
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
