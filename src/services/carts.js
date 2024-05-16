import { cartModel } from "../dao/models/carts.js";

export const getCartByIdService = async (cid) => {
    try{
        return await cartModel.findById(cid);
    } catch(error){
        console.log('getCartByIdService -> ', error);
        throw error;
    }
}

export const setCartService = async () => {
    try{
        return await cartModel.create({});
    } catch(error){
        console.log('setCartService -> ', error);
        throw error;
    }
}

export const addProductInCartService = async (cid, pid) => {
    try{
        const carrito = await cartModel.findById(cid);

        if (!carrito)
            return null;

        const productInCart = carrito.products.find(p => p.id.toString() === pid);

        if (productInCart)
            productInCart.quantity++;
        else
            carrito.products.push({ id: pid, quantity: 1 });

        carrito.save();
        return carrito;
    }
    catch(error){
        console.log('addProductInCartService -> ', error);
        throw error;
    }
}