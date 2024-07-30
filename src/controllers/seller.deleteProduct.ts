import { Request, Response } from "express";
import { Product } from "../models/seller.model";

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const pro_id = req.params.id;
    await Product.findByIdAndDelete(pro_id);
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
