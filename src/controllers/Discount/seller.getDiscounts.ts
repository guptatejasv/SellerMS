import { Request, Response } from "express";
import { Auth } from "../../models/admin.model";
import { Discount } from "../../models/seller.Discount";
export const getDiscounts = async (req: Request, res: Response) => {
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
    const discount = await Discount.find({
      productId: pro_id,
      isDeleted: false,
      isBlocked: false,
    });
    console.log(discount);

    res.status(200).json({
      status: "success",
      results: discount.length,
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
