import { Request, Response } from "express";
import { Product } from "../models/seller.Product";
import { Auth } from "../models/admin.model";
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const pro_id = req.params.id;
    const user = req.user;
    const seller = await Auth.findById(user.id);
    if (seller) {
      if (seller.role == "seller") {
        const product = await Product.findById(pro_id);
        if (product) {
          product.isDeleted = true;
          await product.save();
        }
        return res.status(200).json({
          status: "success",
          message: "Product deleted successfully..",
        });
      }
    }
    return res.status(401).json({
      status: "fail",
      message: "You are unautherized to delete products.",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
