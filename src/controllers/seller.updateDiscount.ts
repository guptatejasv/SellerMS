import { Request, Response } from "express";

import { Discount } from "../models/seller.Discount";

export const updateDiscount = async (req: Request, res: Response) => {
  try {
    // const user = req.user;
    const pro_id = req.params.id;
    const discountPrev = await Discount.findById(pro_id);
    if (discountPrev) {
      if (discountPrev.isDeleted == true) {
        return res.status(400).json({
          status: "fail",
          message: `This Discount has been deleted..`,
        });
      }
    }

    const discountDetail = await Discount.findOneAndUpdate(
      { productId: pro_id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: "success",
      message: "Product details updated successfully..!",
      result: {
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
