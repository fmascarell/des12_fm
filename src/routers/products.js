import { Router } from 'express';
import { uploader } from '../config/multer.js';
import { addProduct, deleteProduct, getProduct, getProductById, updateProduct } from '../controllers/products.js';
import { isAdmin, validarCampos, validarJWT } from '../middleware/auth.js';
import { check } from 'express-validator';
import { existeCode, existeProduct } from '../helpers/db-validaciones.js';

const router = Router();

router.get('/', validarJWT, getProduct);

router.get('/:pid', [
    validarJWT,
    check('pid', 'No es valido el Id de producto').isMongoId(),
    validarCampos,
], getProductById);

router.post('/', [
    validarJWT,
    isAdmin,
    check('title', 'El campo title es obligatorio').not().isEmpty(),
    check('description', 'El campo description es obligatorio').not().isEmpty(),
    check('code', 'El campo code es obligatorio').not().isEmpty(),
    check('code').custom(existeCode),
    check('price', 'El campo price es obligatorio y de tipo numerico').not().isEmpty().isNumeric(),
    check('stock', 'El campo stock es obligatorio y de tipo numerico').not().isEmpty().isNumeric(),
    check('category', 'El campo category es obligatorio').not().isEmpty(),
    validarCampos,
    uploader.single('file'),
], addProduct);

router.put('/:pid', [
    validarJWT,
    isAdmin,
    check('pid', 'No es valido el Id de producto').isMongoId(),
    check('pid').custom(existeProduct),
    validarCampos,
    uploader.single('file'),
], updateProduct);

router.delete('/:pid', [
    validarJWT,
    isAdmin,
    check('pid', 'No es valido el Id de producto').isMongoId(),
    check('pid').custom(existeProduct),
    validarCampos,
], deleteProduct);

//export default router;
export { router as productsRouter};