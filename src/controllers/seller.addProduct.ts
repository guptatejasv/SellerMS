import { Request, Response } from "express";
import { Product } from "../models/seller.model";

export const addProduct = async (req: Request, res: Response) => {
  try {
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
