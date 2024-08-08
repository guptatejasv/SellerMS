import { Router } from "express";
const router = Router();
import { addProduct } from "../controllers/Product/seller.addProduct";
import { getProducts } from "../controllers/Product/seller.getProducts";
import { verify_token } from "../middlewares/jwtverify";
import { updateProduct } from "../controllers/Product/selller.updateProduct";
import { deleteProduct } from "../controllers/Product/seller.deleteProduct";
import { getProduct } from "../controllers/Product/seller.getProduct";
import { addDiscount } from "../controllers/Discount/seller.addDiscount";
import { deleteDiscount } from "../controllers/Discount/seller.deleteDiscount";
import { updateDiscount } from "../controllers/Discount/seller.updateDiscount";
import { addBundleProduct } from "../controllers/Bundle Product/seller.addBundleProduct";
import { getBundleProduct } from "../controllers/Bundle Product/seller.getBundleProduct";
import { getBundleProducts } from "../controllers/Bundle Product/seller.getBundleProducts";
import { updateBundleProduct } from "../controllers/Bundle Product/seller.updateBundleProduct";
import { deleteBundleProduct } from "../controllers/Bundle Product/seller.deleteBundleProduct";
import { getCategory } from "../controllers/Category/seller.getCategory";
import { getAllCategory } from "../controllers/Category/seller.getAllCategory";
import { getDiscounts } from "../controllers/Discount/seller.getDiscounts";
import { addDiscountOnBundle } from "../controllers/Discount/seller.addDiscountBundle";

router.post("/addProduct", verify_token, addProduct);
router.get("/getProducts", verify_token, getProducts);
router.get("/getProduct/:id", verify_token, getProduct);
router.patch("/updateProduct/:id", verify_token, updateProduct);
router.delete("/deleteProduct/:id", verify_token, deleteProduct);
// Discount routes

router.post("/addDiscount/:id", verify_token, addDiscount);
router.patch("/updateDiscount/:id", verify_token, updateDiscount);
router.get("/getDiscounts/:id", verify_token, getDiscounts);
router.delete("/deleteDiscount/:id", verify_token, deleteDiscount);
router.post("/addDiscountOnBundle/:id", verify_token, addDiscountOnBundle);

// Bundle Product CRUD
router.post("/addBundleProduct", verify_token, addBundleProduct);
router.get("/getBundleProducts", verify_token, getBundleProducts);
router.get("/getBundleProduct/:id", verify_token, getBundleProduct);
router.patch("/updateBundleProduct/:id", verify_token, updateBundleProduct);
router.delete("/deleteBundleProduct/:id", verify_token, deleteBundleProduct);
// Category realted routes
router.get("/getAllCategory", verify_token, getAllCategory);
router.get("/getCategory/:id", verify_token, getCategory);

export default router;
