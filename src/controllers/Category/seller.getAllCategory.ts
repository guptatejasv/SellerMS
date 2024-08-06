import { Request, Response } from "express";
import { Category } from "../../models/seller.Category";

export const getAllCategory = async (req: Request, res: Response) => {
  try {
    // Extract page and limit from query parameters
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    // Fetch categories with pagination and limit
    const allCategory = await Category.find({ isDeleted: false })
      .skip(skip)
      .limit(limit);

    // Get the total count of categories
    const totalCategories = await Category.countDocuments({ isDeleted: false });

    res.status(200).json({
      status: "success",
      results: allCategory.length,
      data: {
        allCategory,
      },
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalCategories / limit),
        totalCategories,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
