import {request,response} from 'express';
import { productModel } from '../dao/models/products.js';

export const getProduct = async (req=request, res=response) => {
    try{
        let { limit = 2, page = 1 } = req.query;
        page = page == 0 ? 1 : page;
        const queryProducts = productModel.find().limit(Number(limit));
        const [productos, total] = await Promise.all([queryProducts, productModel.countDocuments()]);
        return res.json({ total, productos});

        const a = {
            status: 'success/error',
            payload: [],
            totalPages: 0,
            prevPage: 1,
            nextPage: 3,
            hastPrePage: true,
            hastNextPage: false,
            prevLink: '',
            nextLink: '',
        }
    }
    catch(error){
        console.log('getProduct -> ', error);
        return res.status(500).json({msg:'Se ha producido un error, comuniquese con su administrador'});
    }
}

export const getProductById = async (req=request, res=response) => {
    try{
        const {pid} = req.params;
        const producto = await productModel.findById(pid);
        if (!producto)
            return res.status(404).json({msg: `El producto con id ${pid} no existe`});
        return res.json({ producto });
    }
    catch(error){
        console.log('getProductById -> ', error);
        return res.status(500).json({msg:'Se ha producido un error, comuniquese con su administrador'});
    }
}

export const addProduct = async (req=request, res=response) => {
    try{
        const {title, description, price, thumbnails, code, stock, category, status} = req.body;
        console.log(req.params);
        if (!title, !description, !code, !price, !stock, !category)
            return res.status(404).json({msg: 'Los campos [title, description, price, code, stock, category] son obligatorios'});

        const producto = await productModel.create({title, description, price, thumbnails, code, stock, category, status});
        return res.json({producto});
    }
    catch(error){
        console.log('addProduct -> ', error);
        return res.status(500).json({msg:'Se ha producido un error, comuniquese con su administrador'});
    }
}

export const updateProduct = async (req=request, res=response) => {
    try{
        const {pid} = req.params;
        const {_id, ...rest} = req.body;
        const producto = await productModel.findByIdAndUpdate(pid, {...rest}, {new: true});
        if (producto)
            return res.json({msg: 'Producto actualizado', producto});
        return res.status(404).json({msg: `No se ha podido actualizar el producto id ${pid}`});
    }
    catch(error){
        console.log('updateProduct -> ', error);
        return res.status(500).json({msg:'Se ha producido un error, comuniquese con su administrador'});
    }
}

export const deleteProduct = async (req=request, res=response) => {
    try{
        const {pid} = req.params;
        const producto = await productModel.findByIdAndDelete(pid);
        if (producto)
            return res.json({msg: 'Producto eliminado', producto});
        return res.status(404).json({msg: `No se ha podido eliminar el producto id ${pid}`});
    }
    catch(error){
        console.log('deleteProduct -> ', error);
        return res.status(500).json({msg:'Se ha producido un error, comuniquese con su administrador'});
    }
}