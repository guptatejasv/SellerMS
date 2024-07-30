import { Request, Response } from "express";
// import { Product } from "../models/seller.Product";
import { Discount } from "../models/seller.Discount";
export const addDiscount = async (req: Request, res: Response) => {
  try {
    const id = req.user.id;
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
