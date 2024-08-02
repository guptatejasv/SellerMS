import { Request, Response } from "express";
// import { Product } from "../models/seller.Product";
import { Auth } from "../models/admin.model";
import { BundleProduct } from "../models/seller.BundleProduct";

export const deleteBundleProduct = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const seller = await Auth.findById(user.id);
    if (seller) {
      if (seller.role != "seller") {
        return res.status(401).json({
          status: "fail",
          message: "You are unautherized to add products.",
        });
      }
    }
    const bundlePro_id = req.params.id;

    const bundleProduct = await BundleProduct.findById(bundlePro_id);

    if (bundleProduct) {
      bundleProduct.isDeleted = true;
      await bundleProduct.save();
    }

    res.status(200).json({
      status: "success",
      message: "Bundle Product deleted successfully..",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
