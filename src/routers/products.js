import { Router } from 'express';
import { uploader } from '../config/multer.js';
import { addProduct, deleteProduct, getProduct, getProductById, updateProduct } from '../controllers/products.js';
const router = Router();

router.get('/', getProduct);
router.get('/:pid', getProductById);
router.post('/', uploader.single('file'), addProduct);
router.put('/:pid', uploader.single('file'), updateProduct);
router.delete('/:pid', deleteProduct);

//export default router;
export { router as productsRouter};