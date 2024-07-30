import { Router } from "express";
const router = Router();
import { addProduct } from "../controllers/seller.addProduct";
import { getProducts } from "../controllers/seller.getProducts";
import { verify_token } from "../middlewares/jwtverify";
import { updateProduct } from "../controllers/selller.updateProduct";
import { deleteProduct } from "../controllers/seller.deleteProduct";

router.post("/addProduct", verify_token, addProduct);
router.get("/getProducts", verify_token, getProducts);
router.patch("/updateProduct/:id", verify_token, updateProduct);
router.delete("/deleteProduct/:id", verify_token, deleteProduct);
export default router;
