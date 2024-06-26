import { Router } from 'express';
import passport from 'passport';
import {
  addProductView,
  addProductViewPost,
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
import { uploader } from '../config/multer.js';

const router = Router();

router.get('/', homeView);
router.get('/realtimeproducts', [auth, admin], realtimeproductsView);
router.get('/chat', auth, chatView);
router.get('/products', auth, productsView);
router.get('/add-product', auth, addProductView);
router.post('/add-product', [auth, uploader.single('file')], addProductViewPost);
router.get('/cart/:cid', auth, cartView);

router.get('/login', loginGet);
router.get('/register', registerGet);
router.get('/logout', logout);
router.post('/register', passport.authenticate('register', { failureRedirect: '/register' }), registerPost);
router.post('/login', passport.authenticate('login', { failureRedirect: '/login' }), login);

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/login-github-callback', passport.authenticate('github', { failureRedirect: '/register' }), login);

export default router;

