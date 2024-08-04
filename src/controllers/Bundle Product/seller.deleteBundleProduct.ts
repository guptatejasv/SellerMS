import { Request, Response } from "express";
// import { Product } from "../models/seller.Product";
import { Auth } from "../../models/admin.model";
import { BundleProduct } from "../../models/seller.BundleProduct";

export const deleteBundleProduct = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const seller = await Auth.findById(user.id);
    if (seller) {
      if (seller.role == "seller") {
        const bundlePro_id = req.params.id;

        const bundleProduct = await BundleProduct.findById(bundlePro_id);
        if (bundleProduct) {
          if (
            bundleProduct.isDeleted == true ||
            bundleProduct.isBlocked == true
          ) {
            return res.status(400).json({
              status: "fail",
              message: `This Bundle product has been already deleted or Blocked by admin..`,
            });
          }
        }
        if (bundleProduct) {
          bundleProduct.isDeleted = true;
          await bundleProduct.save();
        }

        return res.status(200).json({
          status: "success",
          message: "Bundle Product deleted successfully..",
        });
      }
    }
    return res.status(401).json({
      status: "fail",
      message: "You are unautherized to Delete Bundle product.",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
