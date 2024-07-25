import { request, response } from "express";
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

// Middleware de autorización para administradores
export const isAdmin = (req = request, res = response, next) => {
  if (!(req.rol === 'admin')) 
    return res.status(403).json({ ok: false, msg: 'Permisos insuficientes'});

  next();
};

// Middleware de autorización para usuarios premium
export const isPremium = (req = request, res = response, next) => {
  if (!(req.rol === 'premium')) 
    return res.status(403).json({ ok: false, msg: 'Permisos insuficientes'});

  next();
};

// Middleware de validación
export const validarCampos = (req=request, res=response, next) => {
  const errores = validationResult(req);

  if (!errores.isEmpty()) return res.status(400).json(errores);
  next();
};

export const validarJWT = (req=request, res=response, next) => {
  const token = req.header('x-token');

  if(!token)
    return res.status(401).json({ ok: false, msg: 'No hay token en la petición'});

  try {
      const { _id, email, rol } = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req._id = _id;
      req.email = email;
      req.rol = rol;
  } catch (error) {
      console.log(error);
      return res.status(401).json({ ok: false, msg: 'Token no válido'});
  }

  next();
};
