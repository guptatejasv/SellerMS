import { Router } from "express";
const router = Router();
import { addProduct } from "../controllers/Product/seller.addProduct";
import { getProducts } from "../controllers/Product/seller.getProducts";
import { verify_token } from "../middlewares/jwtverify";
import { updateProduct } from "../controllers/Product/selller.updateProduct";
import { deleteProduct } from "../controllers/Product/seller.deleteProduct";
import { getProduct } from "../controllers/Product/seller.getProduct";
import { addDiscount } from "../controllers/Discount/seller.addDiscount";
import { removeDiscount } from "../controllers/Discount/seller.removeDiscount";
import { updateDiscount } from "../controllers/Discount/seller.updateDiscount";
import { addBundleProduct } from "../controllers/Bundle Product/seller.addBundleProduct";
import { getBundleProduct } from "../controllers/Bundle Product/seller.getBundleProduct";
import { getBundleProducts } from "../controllers/Bundle Product/seller.getBundleProducts";
import { updateBundleProduct } from "../controllers/Bundle Product/seller.updateBundleProduct";
import { deleteBundleProduct } from "../controllers/Bundle Product/seller.deleteBundleProduct";
import { getDiscount } from "../controllers/Discount/seller.getDiscount";
import { provide } from "../controllers/seller.provide";

router.post("/addProduct", verify_token, addProduct);
router.get("/getProducts", verify_token, getProducts);
router.get("/getProduct/:id", verify_token, getProduct);
router.patch("/updateProduct/:id", verify_token, updateProduct);
router.delete("/deleteProduct/:id", verify_token, deleteProduct);
// Discount APIs
router.post("/addDiscount/:id", verify_token, addDiscount);
router.patch("/updateDiscount/:id", verify_token, updateDiscount);
router.get("/getDiscount/:id", verify_token, getDiscount);
router.delete("/removeDiscount/:id", verify_token, removeDiscount);
router.get("/provide", provide);
// Bundle Product CRUD
router.post("/addBundleProduct", verify_token, addBundleProduct);
router.get("/getBundleProducts", verify_token, getBundleProducts);
router.get("/getBundleProduct/:id", verify_token, getBundleProduct);
router.patch("/updateBundleProduct/:id", verify_token, updateBundleProduct);
router.delete("/deleteBundleProduct/:id", verify_token, deleteBundleProduct);
export default router;
