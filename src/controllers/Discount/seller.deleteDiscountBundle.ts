import { Request, Response } from "express";
import { Discount } from "../../models/seller.Discount";
import { Auth } from "../../models/admin.model";
import { BundleProduct } from "../../models/seller.BundleProduct";

export const deleteDiscountOnBundle = async (req: Request, res: Response) => {
  try {
    const dis_id = req.params.id;
    const user = req.user;
    const seller = await Auth.findById(user.id);
    if (seller) {
      if (seller.role == "seller") {
        const discount = await Discount.findById(dis_id);
        const bundleProduct = await BundleProduct.findOne({
          _id: discount?.productId,
        });
        if (discount?.adminId) {
          return res.status(200).json({
            status: "fail",
            message: "You cann't delete the discount added by seller..",
          });
        }
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

        if (bundleProduct) {
          if (!bundleProduct?.DiscountPrice) {
            const revivedPrice =
              (bundleProduct?.bundlePrice || 0) +
              ((discount?.previousPrice || 0) * (discount?.discount || 0)) /
                100;
            bundleProduct.DiscountPrice = revivedPrice;

            await bundleProduct.save();
          } else {
            const revivedPrice =
              (bundleProduct?.DiscountPrice || 0) +
              ((discount?.previousPrice || 0) * (discount?.discount || 0)) /
                100;
            bundleProduct.DiscountPrice = revivedPrice;
            if (bundleProduct.DiscountPrice == bundleProduct.bundlePrice) {
              bundleProduct.DiscountPrice = undefined;
              bundleProduct.sellerDiscountId = undefined;

              await bundleProduct.save();
            }
            await bundleProduct.save();
          }
          const updatedDiscountIds = (
            bundleProduct.sellerDiscountId || []
          ).filter((id) => id.toString() !== dis_id.toString());

          bundleProduct.sellerDiscountId = updatedDiscountIds;
          await bundleProduct.save();
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
