import { request, response } from "express";

// Middleware de autenticación
export const auth = (req = request, res = response, next) => {
  if (req.session?.user) return next();

  return res.redirect('/login');
};

// Middleware de autorización para administradores
export const admin = (req = request, res = response, next) => {
  if (req.session?.user.rol === 'admin') return next();

  return res.redirect('/');
};
