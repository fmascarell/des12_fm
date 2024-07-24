import { Router } from "express";
import { check } from "express-validator";
import {
  addProductInCart,
  //deleteCart,
  deleteProductsInCart,
  getCartById,
  //setCart,
  updateProductsInCart,
} from "../controllers/carts.js";
import { validarCampos, validarJWT } from '../middleware/auth.js';

const router = Router();

router.get("/:cid", [
  validarJWT,
  check('cid', 'No es valido el Id del carrito').isMongoId(),
  validarCampos,
], getCartById);

//router.post("/", validarJWT, setCart);
router.post("/:cid/product/:pid", [
  validarJWT,
  check('cid', 'No es valido el Id del carrito').isMongoId(),
  check('pid', 'No es valido el Id del producto').isMongoId(),
  validarCampos,
], addProductInCart);

router.delete("/:cid/products/:pid", [
  validarJWT,
  check('cid', 'No es valido el Id del carrito').isMongoId(),
  check('pid', 'No es valido el Id del producto').isMongoId(),
  validarCampos,
], deleteProductsInCart);

router.put("/:cid/products/:pid", [
  validarJWT,
  check('cid', 'No es valido el Id del carrito').isMongoId(),
  check('pid', 'No es valido el Id del producto').isMongoId(),
  validarCampos,
], updateProductsInCart);
//router.delete("/:cid", validarJWT, deleteCart);

//export default router;
export { router as cartsRouter};
