import { Request, Response } from "express";

import { Category } from "../../models/seller.Category";
export const getCategory = async (req: Request, res: Response) => {
  try {
    const cateId = req.params.id;
    const category = await Category.findById(cateId);
    if (!category) {
      return res.status(400).json({
        status: "fail",
        message: "There is no category with this id",
      });
    }
    if (category.isDeleted) {
      return res.status(400).json({
        status: "fail",
        message: "This Category has been deleted..",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        category,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
