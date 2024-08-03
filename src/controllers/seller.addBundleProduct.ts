/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { ObjectId } from "mongoose";
import { BundleProduct } from "../models/seller.BundleProduct";
import { Product } from "../models/seller.Product";
import { Auth } from "../models/admin.model";
import { checkSameSeller } from "../helper/checkSameSeller";

interface Product {
  productId: ObjectId;
}

// Define the request body interface
interface BundleProductRequestBody {
  bundleName: string;
  description: string;
  bundlePrice: number;
  products: Product[];
}
const calculateTotalPrice = (products: any) => {
  return products.reduce(
    (total: any, product: any) => total + product.price,
    0
  );
};
export const addBundleProduct = async (req: Request, res: Response) => {
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
    const { bundleName, description, products } =
      req.body as BundleProductRequestBody;
    const productIds = products.map((product) => product.productId);

    const checkSeller = await checkSameSeller(productIds);
    if (checkSeller == false) {
      return res.status(400).json({
        status: "fail",
        message:
          "You cann't create a Bundle Product of products with other seller..",
      });
    }

    // const allSameSeller = products.every(product => product.sellerId === products[0].sellerId);

    // Retriving Product details with their Product Id--
    const productsDetails = await Product.find({
      _id: { $in: products.map((p: { productId: unknown }) => p.productId) },
    }).exec();

    const bundlePrice = calculateTotalPrice(productsDetails);

    // Calculate the total price of the bundle

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
