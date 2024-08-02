import { Request, Response } from "express";
import { Product } from "../models/seller.Product";
import { Auth } from "../models/admin.model";
export const updateProduct = async (req: Request, res: Response) => {
  try {
    // const user = req.user;
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
    const pro_id = req.params.id;
    const productPrev = await Product.findById(pro_id);
    if (productPrev) {
      if (productPrev.isDeleted == true) {
        return res.status(400).json({
          status: "fail",
          message: `This product has been deleted..`,
        });
      }
    }

    const product = await Product.findByIdAndUpdate(pro_id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      message: "Product details updated successfully..!",
      result: {
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
