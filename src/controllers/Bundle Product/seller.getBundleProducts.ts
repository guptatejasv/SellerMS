import { Request, Response } from "express";
import { BundleProduct } from "../../models/seller.BundleProduct";
import { Auth } from "../../models/admin.model";

export const getBundleProducts = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    // Check if the user is authenticated and has the role of "seller"
    const seller = await Auth.findById(user.id);
    if (!seller || seller.role !== "seller") {
      return res.status(401).json({
        status: "fail",
        message: "You are unauthorized to get bundle products.",
      });
    }

    // Extract page and limit from query parameters
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    // Fetch bundle products with pagination and limit
    const bundleProducts = await BundleProduct.find({
      sellerId: user.id,
      isDeleted: false,
      isBlocked: false,
    })
      .skip(skip)
      .limit(limit);

    // Get the total count of bundle products
    const totalBundleProducts = await BundleProduct.countDocuments({
      sellerId: user.id,
      isDeleted: false,
      isBlocked: false,
    }).populate("products");

    res.status(200).json({
      status: "success",
      result: bundleProducts.length,
      data: {
        bundleProducts,
      },
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalBundleProducts / limit),
        totalBundleProducts,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
