import { Request, Response } from "express";
// import { Product } from "../models/seller.Product";
import { BundleProduct } from "../../models/seller.BundleProduct";
import { Auth } from "../../models/admin.model";
export const updateBundleProduct = async (req: Request, res: Response) => {
  try {
    // const user = req.user;
    const pro_id = req.params.id;
    const user = req.user;
    const seller = await Auth.findById(user.id);
    if (seller) {
      if (seller.role == "seller") {
        const bundleProductPrev = await BundleProduct.findById(pro_id);
        if (bundleProductPrev) {
          if (
            bundleProductPrev.isDeleted == true ||
            bundleProductPrev.isBlocked == true
          ) {
            return res.status(400).json({
              status: "fail",
              message: `You cann't update this Bundle Product. This Bundle Product has been deleted or blocked by admin..`,
            });
          }
        }

        const bundleProduct = await BundleProduct.findByIdAndUpdate(
          pro_id,
          req.body,
          {
            new: true,
            runValidators: true,
          }
        );
        return res.status(200).json({
          status: "success",
          message: "Bundle Product details updated successfully..!",
          result: {
            bundleProduct,
          },
        });
      }
    }
    return res.status(401).json({
      status: "fail",
      message: "You are unautherized to update Bundle products.",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
