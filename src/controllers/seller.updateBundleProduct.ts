import { Request, Response } from "express";
// import { Product } from "../models/seller.Product";
import { BundleProduct } from "../models/seller.BundleProduct";
import { Auth } from "../models/admin.model";
export const updateBundleProduct = async (req: Request, res: Response) => {
  try {
    // const user = req.user;
    const pro_id = req.params.id;
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
    const bundleProductPrev = await BundleProduct.findById(pro_id);
    if (bundleProductPrev) {
      if (bundleProductPrev.isDeleted == true) {
        return res.status(400).json({
          status: "fail",
          message: `This Bundle Product has been deleted..`,
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
