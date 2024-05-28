import { request, response } from 'express';
import { getProductService } from '../services/products.js';
import { getCartByIdService } from '../services/carts.js';

export const homeView = async (req = request, res = response) => {
  const limit = 50;
  const { payload } = await getProductService({ limit });
  const user = req.session.user;

  console.log('Rendering home view with user:', user);

  return res.render('home', {
    productos: payload,
    styles: 'styles.css',
    title: 'Home',
    user,
  });
};

export const realtimeproductsView = async (req = request, res = response) => {
  const user = req.session.user;
  console.log('Rendering real-time products view with user:', user);

  return res.render('realTimeProducts', {
    title: 'Real Time',
    styles: 'styles.css',
    user,
  });
};

export const chatView = async (req = request, res = response) => {
  const user = req.session.user;
  console.log('Rendering chat view with user:', user);

  return res.render('chat', { styles: 'chat.css', title: 'Chat', user });
};

export const productsView = async (req = request, res = response) => {
  const result = await getProductService({ ...req.query });
  const user = req.session.user;
  console.log('Rendering products view with user:', user);

  return res.render('products', {
    title: 'productos',
    result,
    styles: 'products.css',
    user,
  });
};

export const cartView = async (req = request, res = response) => {
  const { cid } = req.params;
  const carrito = await getCartByIdService(cid);
  const user = req.session.user;
  console.log('Rendering cart view with user:', user);

  return res.render('cart', {
    title: 'carrito',
    carrito,
    styles: 'cart.css',
    user,
  });
};

export const loginGet = async (req = request, res = response) => {
  if (req.session.user) {
    console.log('User already logged in, redirecting to home.');
    return res.redirect('/');
  }

  return res.render('login', { title: 'Login', styles: 'loginregister.css' });
};

export const registerGet = async (req = request, res = response) => {
  if (req.session.user) {
    console.log('User already logged in, redirecting to home.');
    return res.redirect('/');
  }

  return res.render('register', {
    title: 'Registro',
    styles: 'loginregister.css',
  });
};

export const login = async (req = request, res = response) => {
  if (!req.user) {
    console.log('Login failed, redirecting to login page.');
    return res.redirect('/login');
  }

  console.log('Login successful, user:', req.user);
  req.session.user = {
    name: req.user.name,
    lastName: req.user.lastName,
    email: req.user.email,
    rol: req.user.rol,
    image: req.user.image,
  };
  return res.redirect('/');
};

export const registerPost = async (req = request, res = response) => {
  if (!req.user) {
    console.log('Registration failed, redirecting to register page.');
    return res.redirect('/register');
  }

  console.log('Registration successful, user:', req.user);
  return res.redirect('/login');
};

export const logout = async (req = request, res = response) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error during logout:', err);
      return res.send({ status: false, body: err });
    } else {
      console.log('Logout successful, redirecting to login page.');
      return res.redirect('/login');
    }
  });
};

