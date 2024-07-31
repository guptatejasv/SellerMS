import { Request, Response } from "express";
import { Product } from "../models/seller.Product";

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const pro_id = req.params.id;
    const product = await Product.findById(pro_id);
    if (product) {
      product.isDeleted = true;
      await product.save();
    }
    res.status(200).json({
      status: "success",
      message: "Product deleted successfully..",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
