import { Request, Response } from "express";
// import { Product } from "../models/seller.Product";
import { Discount } from "../models/seller.Discount";
import { Auth } from "../models/admin.model";
export const removeDiscount = async (req: Request, res: Response) => {
  try {
    const pro_id = req.params.id;
    // await Discount.findOneAndDelete({
    //   productId: pro_id,
    // });
    const user = req.user;
    const seller = await Auth.findById(user.id);
    if (seller) {
      if (seller.role == "seller") {
        const discount = await Discount.findById(pro_id);
        if (discount) {
          discount.isDeleted = true;
          await discount.save();
        }
        return res.status(200).json({
          status: "success",
          message: "Discount is Deleted on this product..",
        });
      }
    }
    return res.status(401).json({
      status: "fail",
      message: "You are unautherized to add products.",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
