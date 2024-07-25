import { Router } from 'express';
import { check } from 'express-validator';
import { crearUsuario, loginUsuario, solicitarRestablecimiento, restablecerContrasena } from '../controllers/auth.js';
import { existeEmail } from '../helpers/db-validaciones.js';
import { validarCampos, validarJWT } from '../middleware/auth.js';

const router = Router();

router.post('/login',[
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('email', 'El email debe poseer formato válido').isEmail(),
    check('password', 'La password es obligatoria con 6 caracteres mínimo').isLength({min: 6}),
    validarCampos,
], loginUsuario);

router.post('/register',[
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('lastName', 'El apellido es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('email', 'El email debe poseer formato válido').isEmail(),
    check('email').custom(existeEmail),
    check('password', 'La password es obligatoria con 6 caracteres mínimo').isLength({min: 6}),
    validarCampos,
], crearUsuario);

router.post('/forgot-password', [
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('email', 'El email debe poseer formato válido').isEmail(),
    validarCampos,
], solicitarRestablecimiento);

router.post('/reset-password', [
    check('token', 'El token es obligatorio').not().isEmpty(),
    check('newPassword', 'La nueva password es obligatoria con 6 caracteres mínimo').isLength({min: 6}),
    validarCampos,
], restablecerContrasena);

export {router as authRouter};
