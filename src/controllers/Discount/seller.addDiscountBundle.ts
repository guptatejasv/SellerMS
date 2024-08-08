import { Request, Response } from "express";
import { Discount } from "../../models/seller.Discount";
import { Auth } from "../../models/admin.model";
import { BundleProduct } from "../../models/seller.BundleProduct";

export const addDiscountOnBundle = async (req: Request, res: Response) => {
  try {
    const id = req.user.id;
    const user = req.user;
    const seller = await Auth.findById(user.id);
    if (seller) {
      if (seller.role == "seller") {
        const pro_id = req.params.id;
        const { discountCoupon, discount, startDate, endDate } = req.body;
        if (!discountCoupon || !discount || !startDate || !endDate) {
          return res
            .status(204)
            .json({ message: "All fields are required to fill" });
        }
        const bundleProducts = await BundleProduct.findById(pro_id);
        if (!bundleProducts) {
          return res.status(200).json({
            status: "fail",
            message: "Product with this id does not exist..",
          });
        }
        if (!bundleProducts.sellerDiscountId) {
          return res.status(400).json({
            status: "success",
            message: "you can not add discount to products added by admin",
          });
        }
        const discountCouponCheck = await Discount.findOne({
          discountCoupon,
        });
        if (discountCouponCheck) {
          return res.status(400).json({
            status: "success",
            message: "Please Enter a different Discount Coupon..",
          });
        }
        const discountDetail = await Discount.create({
          sellerId: id,
          productId: pro_id,
          discountCoupon,
          discount,
          startDate,
          endDate,
        });

        const discountId = await Discount.find({
          sellerId: id,
          productId: pro_id,
        });
        console.log();
        if (!bundleProducts?.DiscountPrice) {
          discountDetail.previousPrice = bundleProducts.bundlePrice;
          await discountDetail.save();
          const discountPrice =
            bundleProducts.bundlePrice -
            (bundleProducts.bundlePrice * discount) / 100;
          bundleProducts.DiscountPrice = discountPrice;

          await bundleProducts.save();
        } else {
          discountDetail.previousPrice = bundleProducts.DiscountPrice;
          await discountDetail.save();
          const discountPrice =
            bundleProducts.DiscountPrice -
            (bundleProducts.DiscountPrice * discount) / 100;
          bundleProducts.DiscountPrice = discountPrice;

          await bundleProducts.save();
        }
        await BundleProduct.findByIdAndUpdate(pro_id, {
          sellerDiscountId: discountId,
        });
        console.log(discountId);
        return res.status(201).json({
          status: "success",
          data: {
            discountDetail,
          },
        });
      }
    }
    return res.status(401).json({
      status: "fail",
      message: "You are unautherized to add discount.",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
