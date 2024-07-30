import { Request, Response } from "express";
// import { Product } from "../models/seller.Product";
import { BundleProduct } from "../models/seller.BundleProduct";

export const updateBundleProduct = async (req: Request, res: Response) => {
  try {
    // const user = req.user;
    const pro_id = req.params.id;

    const bundleProduct = await BundleProduct.findByIdAndUpdate(
      pro_id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: "success",
      message: "Bundle Product details updated successfully..!",
      result: {
        bundleProduct,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
