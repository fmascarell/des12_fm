import { Router } from 'express';
import { addProductInCart, getCartById, setCart } from '../controllers/carts.js';
const router = Router();

router.get('/:cid', getCartById);
router.post('/', setCart);
router.post('/:cid/product/:pid', addProductInCart);

export default router;