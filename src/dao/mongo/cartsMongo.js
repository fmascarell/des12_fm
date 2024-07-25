import { cartModel } from "./models/cartsModels.js";

export const getCartById = async (cid) => await cartModel.findById(cid).populate('products.id').lean();

export const setCart = async () => await cartModel.create({});

export const addProductInCart = async (cid, pid) => {
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

export const deleteProductsInCart = async (cid, pid) => await cartModel.findByIdAndUpdate(
    cid, 
    {$pull: {'products': {id: pid}}}, 
    {new: true}
);
    
export const updateProductsInCart = async (cid, pid, quantity) => await cartModel.findOneAndUpdate(
    { _id: cid, 'products.id': pid },
    { $set: {'products.$.quantity': quantity} },
    { new: true}
);

export const deleteCart = async (cid) => await cartModel.findByIdAndDelete(cid);