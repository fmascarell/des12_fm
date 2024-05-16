import {request,response} from 'express';
import { addProductService, deleteProductService, getProductByIdService, getProductService, updateProductService } from '../services/products.js';

export const getProduct = async (req=request, res=response) => {
    try{
        const result = await getProductService({...req.query});
        return res.json({result});
    }
    catch(error){
        return res.status(500).json({msg:'Se ha producido un error, comuniquese con su administrador'});
    }
}

export const getProductById = async (req=request, res=response) => {
    try{
        const {pid} = req.params;
        const producto = await getProductByIdService(pid);
        
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
        const {title, description, price, code, stock, category} = req.body;
        console.log(req.params);

        if (!title, !description, !code, !price, !stock, !category)
            return res.status(404).json({msg: 'Los campos [title, description, price, code, stock, category] son obligatorios'});

        const producto = await addProductService({...req.body});
        return res.json({producto});
    }
    catch(error){
        return res.status(500).json({msg:'Se ha producido un error, comuniquese con su administrador'});
    }
}

export const updateProduct = async (req=request, res=response) => {
    try{
        const {pid} = req.params;
        const {_id, ...rest} = req.body;
        const producto = await updateProductService(pid, rest);
        if (producto)
            return res.json({msg: 'Producto actualizado', producto});
        return res.status(404).json({msg: `No se ha podido actualizar el producto id ${pid}`});
    }
    catch(error){
        return res.status(500).json({msg:'Se ha producido un error, comuniquese con su administrador'});
    }
}

export const deleteProduct = async (req=request, res=response) => {
    try{
        const {pid} = req.params;
        const producto = await deleteProductService(pid);
        if (producto)
            return res.json({msg: 'Producto eliminado', producto});
        return res.status(404).json({msg: `No se ha podido eliminar el producto id ${pid}`});
    }
    catch(error){
        console.log('deleteProduct -> ', error);
        return res.status(500).json({msg:'Se ha producido un error, comuniquese con su administrador'});
    }
}