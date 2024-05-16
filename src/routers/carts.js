import { Router } from "express";
import {
  addProductInCart,
  deleteCart,
  deleteProductsInCart,
  getCartById,
  setCart,
  updateProductsInCart,
} from "../controllers/carts.js";
const router = Router();

router.get("/:cid", getCartById);
router.post("/", setCart);
router.post("/:cid/product/:pid", addProductInCart);
router.delete("/:cid/products/:pid", deleteProductsInCart);
router.put("/:cid/products/:pid", updateProductsInCart);
router.delete("/:cid", deleteCart);

export default router;
