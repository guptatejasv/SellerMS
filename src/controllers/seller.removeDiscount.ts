import { Request, Response } from "express";
// import { Product } from "../models/seller.Product";
import { Discount } from "../models/seller.Discount";
export const removeDiscount = async (req: Request, res: Response) => {
  try {
    const pro_id = req.params.id;
    // await Discount.findOneAndDelete({
    //   productId: pro_id,
    // });
    const discount = await Discount.findById(pro_id);
    if (discount) {
      discount.isDeleted = true;
      await discount.save();
    }
    res.status(200).json({
      status: "success",
      message: "Discount is Deleted on this product..",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
