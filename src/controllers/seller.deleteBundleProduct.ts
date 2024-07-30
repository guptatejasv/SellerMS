import { Request, Response } from "express";
// import { Product } from "../models/seller.Product";
import { BundleProduct } from "../models/seller.BundleProduct";

export const deleteBundleProduct = async (req: Request, res: Response) => {
  try {
    const bundlePro_id = req.params.id;
    await BundleProduct.findByIdAndDelete(bundlePro_id);
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
