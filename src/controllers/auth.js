import { response, request } from "express";
import { CartsRepository, UsersRepository } from "../repositories/index.js";
import { createHash, isValidPassword } from "../utils/bcryptPassword.js";
import { generateToken } from "../utils/jsonWebToken.js";
import { sendEmail } from '../utils/email.js';

export const loginUsuario = async (req = request, res = response) => {
  try {
    const { email, password } = req.body;

    const usuario = await UsersRepository.getUserByEmail(email);
    if (!usuario)
      return res.status(400).json({ ok: false, msg: "Datos incorrectos" });

    const validPassword = isValidPassword(password, usuario.password);
    if (!validPassword)
      return res.status(400).json({ ok: false, msg: "Datos incorrectos" });

    const { _id, name, lastName, rol } = usuario;
    const token = generateToken({ _id, name, lastName, email, rol });

    return res.json({ ok: true, usuario, token });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ ok: false, msg: "Por favor contactese con un administrador" });
  }
};

export const crearUsuario = async (req = request, res = response) => {
  try {
    req.body.password = createHash(req.body.password);
    
    const carrito = await CartsRepository.setCart();

    if (!carrito) return res.status(500).json({ ok: false, msg: 'No se pudo crear el carrito' });
    
    req.body.cart_id = carrito._id;
    const usuario = await UsersRepository.registerUser(req.body);
    
    const { _id, name, lastName, email, rol } = usuario;
    const token = generateToken({ _id, name, lastName, email, rol });
    return res.json({ ok: true, usuario, token });
    
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ ok: false, msg: "Por favor contactese con un administrador" });
  }
};

export const solicitarRestablecimiento = async (req, res) => {
  const { email } = req.body;
  const usuario = await UsersRepository.getUserByEmail(email);
  if (!usuario) {
      return res.status(400).json({ msg: 'No existe usuario con ese email' });
  }

  const token = generateToken({ _id, name, lastName, email, rol });
  const resetLink = `http://yourapp.com/reset-password?token=${token}`;
  await sendEmail(email, 'Restablecimiento de contraseña', `Haz click en el siguiente enlace para restablecer tu contraseña: ${resetLink}`);
  res.status(200).json({ msg: 'Correo de restablecimiento enviado' });
};

export const restablecerContrasena = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
      const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const usuario = await UsersRepository.getUserById(id);
      if (!usuario) {
          return res.status(400).json({ msg: 'Token no válido' });
      }
      if (isValidPassword(newPassword, usuario.password)) {
          return res.status(400).json({ msg: 'La nueva contraseña no puede ser la misma que la antigua' });
      }
      usuario.password = createHash(newPassword);
      await usuario.save();
      res.status(200).json({ msg: 'Contraseña restablecida con éxito' });
  } catch (error) {
      res.status(400).json({ msg: 'Token expirado o no válido' });
  }
};
