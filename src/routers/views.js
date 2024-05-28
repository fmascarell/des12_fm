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
