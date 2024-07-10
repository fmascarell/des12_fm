import { request, response } from "express";
import { CartsRepository, ProductsRepository, UsersRepository } from "../repositories/index.js";

export const getCartById = async (req = request, res = response) => {
  try {
    const { _id } = req;
    const { cid } = req.params;

    const usuario = await UsersRepository.getUserById(_id);

    if(!usuario) return res.status(400).json({ok: false, msg: 'Usuario no existe!'});

    if(!(usuario.cart_id.toString() === cid)) return res.status(400).json({ok: false, msg: 'Carrito no válido'});

    const carrito = await CartsRepository.getCartById(cid);

    if (carrito) return res.json({ carrito });
    return res.status(404).json({ msg: `El carrito id ${cid} no existe` });
  } catch (error) {
    return res
      .status(500)
      .json({
        msg: "Se ha producido un error, comuniquese con su administrador",
      });
  }
};

//export const setCart = async (req = request, res = response) => {
//  try {
//    const carrito = await CartsRepository.setCart();
//    return res.json({ msg: "Se creo el carrito", carrito });
//  } catch (error) {
//    console.log("setCart -> ", error);
//    return res
//      .status(500)
//      .json({
//        msg: "Se ha producido un error, comuniquese con su administrador",
//      });
//  }
//};

export const addProductInCart = async (req = request, res = response) => {
  try {
    const { _id } = req;
    const { cid, pid } = req.params;

    const usuario = await UsersRepository.getUserById(_id);

    if(!usuario) return res.status(400).json({ok: false, msg: 'Usuario no existe!'});

    console.log({ usuario });
    console.log({ cid });

    if(!(usuario.cart_id.toString() === cid)) return res.status(400).json({ok: false, msg: 'Carrito no válido'});

    const existeProducto = await ProductsRepository.getProductById(pid);
    if (!existeProducto) return res.status(400).json({ok: false, msg: 'El producto no existe'});

    const carrito = await CartsRepository.addProductInCart(cid, pid);

    if (!carrito)
      return res.status(404).json({ msg: `El carrito id ${cid} no existe` });

    return res.json({ msg: "Carrito actualizado", carrito });
  } catch (error) {
    console.log("addProductInCart -> ", error);
    return res
      .status(500)
      .json({
        msg: "Se ha producido un error, comuniquese con su administrador",
      });
  }
};

export const deleteProductsInCart = async (req = request, res = response) => {
  try {
    const { _id } = req;
    const { cid, pid } = req.params;

    const usuario = await UsersRepository.getUserById(_id);

    if(!usuario) return res.status(400).json({ok: false, msg: 'Usuario no existe!'});
    if(!(usuario.cart_id.toString() === cid)) return res.status(400).json({ok: false, msg: 'Carrito no válido'});

    const existeProducto = await ProductsRepository.getProductById(pid);
    if (!existeProducto) return res.status(400).json({ok: false, msg: 'El producto no existe'});

    const carrito = await CartsRepository.deleteProductsInCart(cid, pid);
    if (!carrito)
      return res.status(404).json({ msg: "No se pudo ejecutar la acción" });
    return res.json({ msg: "Producto eliminado", carrito });
  } catch (error) {
    console.log("deleteProductsInCart -> ", error);
    return res
      .status(500)
      .json({
        msg: "Se ha producido un error, comuniquese con su administrador",
      });
  }
};

export const updateProductsInCart = async (req = request, res = response) => {
  try {
    const { _id } = req;
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    const usuario = await UsersRepository.getUserById(_id);

    if(!usuario) return res.status(400).json({ok: false, msg: 'Usuario no existe!'});
    if(!(usuario.cart_id.toString() === cid)) return res.status(400).json({ok: false, msg: 'Carrito no válido'});

    const existeProducto = await ProductsRepository.getProductById(pid);
    if (!existeProducto) return res.status(400).json({ok: false, msg: 'El producto no existe'});

    if (!quantity || !Number.isInteger(quantity))
      return res
        .status(404)
        .json({ msg: "El valor ingresado para quantity no corresponde" });

    const carrito = await CartsRepository.updateProductsInCart(cid, pid, quantity);

    if (!carrito)
      return res.status(404).json({ msg: "No se pudo ejecutar la acción" });
    return res.json({ msg: "Producto actualizado", carrito });
  } catch (error) {
    console.log("updateProductsInCart -> ", error);
    return res
      .status(500)
      .json({
        msg: "Se ha producido un error, comuniquese con su administrador",
      });
  }
};

//export const deleteCart = async (req = request, res = response) => {
//  try {
//    const { cid } = req.params;
//    const carrito = await CartsRepository.deleteCart(cid);
//
//    if (!carrito)
//      return res.status(404).json({ msg: "No se pudo ejecutar la acción" });
//    return res.json({ msg: "Producto actualizado", carrito });
//  } catch (error) {
//    console.log("deleteCart -> ", error);
//    return res
//      .status(500)
//      .json({
//        msg: "Se ha producido un error, comuniquese con su administrador",
//      });
//  }
//};

