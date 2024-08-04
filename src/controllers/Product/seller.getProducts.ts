import { Request, Response } from "express";
import { Product } from "../../models/seller.Product";
import { Auth } from "../../models/admin.model";
export const getProducts = async (req: Request, res: Response) => {
  try {
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
    console.log(user);

    const products = await Product.find({
      sellerId: user.id,
      isDeleted: false,
      isBlocked: false,
    });

    res.status(200).json({
      status: "success",
      result: products.length,
      data: {
        products,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
