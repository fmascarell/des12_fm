//import { Router } from 'express';
//import passport from 'passport';
//import {
//  cartView,
//  chatView,
//  homeView,
//  loginGet,
//  loginPost,
//  logout,
//  productsView,
//  realtimeproductsView,
//  registerGet,
//  registerPost,
//} from '../controllers/views.js';
//import { admin, auth } from '../middleware/auth.js';
//
//const router = Router();
//
//// Ruta para la vista principal
//router.get('/', homeView);
//
//// Ruta para productos en tiempo real, requiere autenticación y permisos de administrador
//router.get('/realtimeproducts', [auth, admin], realtimeproductsView);
//
//// Ruta para el chat, requiere autenticación
//router.get('/chat', auth, chatView);
//
//// Ruta para ver productos, requiere autenticación
//router.get('/products', auth, productsView);
//
//// Ruta para ver el carrito, requiere autenticación
//router.get('/cart/:cid', auth, cartView);
//
//// Rutas para la autenticación (login y registro)
//router.get('/login', loginGet);
//router.get('/register', registerGet);
//
//// Ruta para cerrar sesión
//router.get('/logout', logout);
//
//router.post('/register',passport.authenticate('register',{failureRedirect:'/register'}), registerPost);
//router.post('/login',passport.authenticate('login',{failureRedirect:''}), loginPost);
//
//export default router;

import { Router } from 'express';
import passport from 'passport';
import {
  cartView,
  chatView,
  homeView,
  login,
  loginGet,
  logout,
  productsView,
  realtimeproductsView,
  registerGet,
  registerPost,
} from '../controllers/views.js';
import { admin, auth } from '../middleware/auth.js';

const router = Router();

router.get('/', homeView);
router.get('/realtimeproducts', [auth, admin], realtimeproductsView);
router.get('/chat', auth, chatView);
router.get('/products', auth, productsView);
router.get('/cart/:cid', auth, cartView);
router.get('/login', loginGet);
router.get('/register', registerGet);
router.get('/logout', logout);

router.post('/register', passport.authenticate('register', { failureRedirect: '/register' }), registerPost);
router.post('/login', passport.authenticate('login', { failureRedirect: '/login' }), login);

router.get('/github', passport.authenticate({ scope: ['user:email']}), async(req, res) => {});
router.get('/login-github-callback', passport.authenticate('github', {failureRedirect:'/register'}), login);

export default router;
