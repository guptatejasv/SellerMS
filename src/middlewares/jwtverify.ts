import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";

dotenv.config();
const jwt_secret: string = process.env.JWT_SECRET as string;

export const verify_token = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
      return res.status(400).json({ error: "Invalid token" });
    }

    const decode = jwt.verify(token, jwt_secret) as JwtPayload;

    if (!decode.id) {
      res.status(400).json({
        status: "fail",
        message: "Token does not contain user id",
      });
    }

    req.user = decode;
    console.log(req.user);
    next();
  } catch (error) {
    console.log("something went wront while verifing the token", error);
    res.status(500).json({ error: error });
  }
};
