import { Router } from 'express';
import { crearUsuario, loginUsuario } from '../controllers/auth.js';

const router = Router();

router.post('/login', loginUsuario);
router.post('/register', crearUsuario);

export {router as authRouter};