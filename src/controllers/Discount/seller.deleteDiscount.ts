import { Request, Response } from "express";
// import { Product } from "../models/seller.Product";
import { Discount } from "../../models/seller.Discount";
import { Auth } from "../../models/admin.model";
import { Product } from "../../models/seller.Product";

export const deleteDiscount = async (req: Request, res: Response) => {
  try {
    const dis_id = req.params.id;
    const user = req.user;
    const seller = await Auth.findById(user.id);
    if (seller) {
      if (seller.role == "seller") {
        const discount = await Discount.findById(dis_id);
        const product = await Product.findOne({
          _id: discount?.productId,
        });

        if (discount) {
          if (discount.isDeleted == true) {
            return res.status(400).json({
              status: "fail",
              message: "Discount with this id is alreay remove from product.",
            });
          }
          discount.isDeleted = true;
          await discount.save();
        }

        if (product) {
          if (!product?.DiscountPrice) {
            const revivedPrice =
              (product?.price || 0) +
              ((discount?.previousPrice || 0) * (discount?.discount || 0)) /
                100;
            product.DiscountPrice = revivedPrice;

            await product.save();
          } else {
            const revivedPrice =
              (product?.DiscountPrice || 0) +
              ((discount?.previousPrice || 0) * (discount?.discount || 0)) /
                100;
            product.DiscountPrice = revivedPrice;
            if (product.DiscountPrice == product.price) {
              product.DiscountPrice = undefined;
              await product.save();
            }
            await product.save();
          }
          const updatedDiscountIds = (product.sellerDiscountId || []).filter(
            (id) => id.toString() !== dis_id.toString()
          );

          product.sellerDiscountId = updatedDiscountIds;
          await product.save();
        }
        console.log(discount);
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
