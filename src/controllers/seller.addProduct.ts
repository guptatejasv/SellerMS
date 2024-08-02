import { Request, Response } from "express";
import { Product } from "../models/seller.Product";
import { Auth } from "../models/admin.model";

export const addProduct = async (req: Request, res: Response) => {
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

    const { name, description, price, category } = req.body;
    const product = await Product.create({
      sellerId: user.id,
      name,
      description,
      price,
      category,
    });
    res.status(201).json({
      status: "success",
      message: "Product Added Successfully..",
      data: {
        product,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
