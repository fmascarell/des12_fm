import { Router } from "express";
import {
  addProductInCart,
  //deleteCart,
  deleteProductsInCart,
  getCartById,
  //setCart,
  updateProductsInCart,
} from "../controllers/carts.js";
import { validarJWT } from '../middleware/auth.js';

const router = Router();

router.get("/:cid", validarJWT, getCartById);
//router.post("/", validarJWT, setCart);
router.post("/:cid/product/:pid", validarJWT, addProductInCart);
router.delete("/:cid/products/:pid", validarJWT, deleteProductsInCart);
router.put("/:cid/products/:pid", validarJWT, updateProductsInCart);
//router.delete("/:cid", validarJWT, deleteCart);

//export default router;
export { router as cartsRouter};
