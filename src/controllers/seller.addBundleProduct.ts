import { Request, Response } from "express";
import { ObjectId } from "mongoose";
import { BundleProduct } from "../models/seller.BundleProduct";

interface Product {
  productId: ObjectId;
  productName: string;
}

// Define the request body interface
interface BundleProductRequestBody {
  bundleName: string;
  description: string;
  bundlePrice: number;
  products: Product[];
}
export const addBundleProduct = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    const { bundleName, description, bundlePrice, products } =
      req.body as BundleProductRequestBody;
    const bundleProduct = await BundleProduct.create({
      sellerId: user.id,
      bundleName,
      description,
      bundlePrice,
      products,
    });
    res.status(201).json({
      status: "success",
      message: "Bundle Product Added Successfully..",
      data: {
        bundleProduct,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
