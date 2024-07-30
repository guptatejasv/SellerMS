import { Router } from "express";
const router = Router();
import { addProduct } from "../controllers/seller.addProduct";
import { getProducts } from "../controllers/seller.getProducts";
import { verify_token } from "../middlewares/jwtverify";
import { updateProduct } from "../controllers/selller.updateProduct";
import { deleteProduct } from "../controllers/seller.deleteProduct";
import { getProduct } from "../controllers/seller.getProduct";
import { addDiscount } from "../controllers/seller.addDiscount";
import { removeDiscount } from "../controllers/seller.removeDiscount";
import { updateDiscount } from "../controllers/seller.updateDiscount";
import { addBundleProduct } from "../controllers/seller.addBundleProduct";
import { getBundleProduct } from "../controllers/seller.getBundleProduct";
import { getBundleProducts } from "../controllers/seller.getBundleProducts";
import { updateBundleProduct } from "../controllers/seller.updateBundleProduct";
import { deleteBundleProduct } from "../controllers/seller.deleteBundleProduct";

router.post("/addProduct", verify_token, addProduct);
router.get("/getProducts", verify_token, getProducts);
router.get("/getProduct/:id", verify_token, getProduct);
router.patch("/updateProduct/:id", verify_token, updateProduct);
router.delete("/deleteProduct/:id", verify_token, deleteProduct);
// Discount APIs
router.post("/addDiscount/:id", verify_token, addDiscount);
router.patch("/updateDiscount/:id", verify_token, updateDiscount);
router.delete("/removeDiscount/:id", verify_token, removeDiscount);
// Bundle Product CRUD
router.post("/addBundleProduct", verify_token, addBundleProduct);
router.get("/getBundleProducts", verify_token, getBundleProducts);
router.get("/getBundleProduct/:id", verify_token, getBundleProduct);
router.patch("/updateBundleProduct/:id", verify_token, updateBundleProduct);
router.delete("/deleteBundleProduct/:id", verify_token, deleteBundleProduct);
export default router;
