import { Request, Response } from "express";
// import { Product } from "../models/seller.Product";
import { Discount } from "../models/seller.Discount";
import { Auth } from "../models/admin.model";
export const addDiscount = async (req: Request, res: Response) => {
  try {
    const id = req.user.id;
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
    const { discountType, discount, startDate, endDate } = req.body;
    if (!discountType || !discount || !startDate || !endDate) {
      return res
        .status(204)
        .json({ message: "All fields are required to fill" });
    }
    const discountDetail = await Discount.create({
      sellerId: id,
      productId: pro_id,
      discountType,
      discount,
      startDate,
      endDate,
    });
    res.status(201).json({
      status: "success",
      data: {
        discountDetail,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
