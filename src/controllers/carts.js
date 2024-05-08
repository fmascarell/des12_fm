import {request,response} from 'express';
import { cartModel } from '../dao/models/carts.js';

export const getCartById = async (req=request, res=response) => {
    try{
        const { cid } = req.params;
        const carrito = await cartModel.findById(cid);
        
        if (carrito)
            return res.json({carrito});
        return res.status(404).json({msg: `El carrito id ${cid} no existe`});
    }
    catch(error){
        console.log('getCartById -> ', error);
        return res.status(500).json({msg:'Se ha producido un error, comuniquese con su administrador'});
    }
}

export const setCart = async (req=request, res=response) => {
    try{
        const carrito = await cartModel.create({});
        return res.json({msg: 'Se creo el carrito', carrito});
    }
    catch(error){
        console.log('setCart -> ', error);
        return res.status(500).json({msg:'Se ha producido un error, comuniquese con su administrador'});
    }
}

export const addProductInCart = async (req=request, res=response) => {
    try{
        const {cid,pid} = req.params;
        const carrito = await cartModel.findById(cid);

        if (!carrito)
            return res.status(404).json({msg: `El carrito id ${cid} no existe`});

        const productInCart = carrito.products.find(p => p.id.toString() === pid);

        if (productInCart)
            productInCart.quantity++;
        else
            carrito.products.push({ id: pid, quantity: 1 });

        carrito.save();
        return res.json({ msg: 'Carrito actualizado', carrito});
    }
    catch(error){
        console.log('addProductInCart -> ', error);
        return res.status(500).json({msg:'Se ha producido un error, comuniquese con su administrador'});
    }
}