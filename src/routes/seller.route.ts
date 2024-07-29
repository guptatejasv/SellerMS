import { Router } from "express";
const router = Router();
import { addProduct } from "../controllers/seller.addProduct";

router.post("/addProduct", addProduct);

export default router;
