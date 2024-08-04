import { Request, Response } from "express";
import { Auth } from "../../models/admin.model";
import { Discount } from "../../models/seller.Discount";
export const getDiscount = async (req: Request, res: Response) => {
  try {
    const pro_id = req.params.id;
    const user = req.user;
    const seller = await Auth.findById(user.id);
    if (seller) {
      if (seller.role != "seller") {
        return res.status(401).json({
          status: "fail",
          message: "You are unautherized to get Discount.",
        });
      }
    }
    const discount = await Discount.findOne({ productId: pro_id });
    if (discount) {
      if (discount.isDeleted == true || discount.isBlocked == true) {
        return res.status(400).json({
          status: "fail",
          message: `This Discount has been deleted or Blocked by admin..`,
        });
      }
    }
    res.status(200).json({
      status: "success",
      data: {
        discount,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
