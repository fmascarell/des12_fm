import {request,response} from 'express';
import { productModel } from '../dao/models/products.js';

export const getProduct = async (req=request, res=response) => {
    try{
        let { limit = 2, page = 1, sort } = req.query;
        page = page == 0 ? 1 : page;
        page = Number(page);
        const skip = (page -1) * Number(limit);
        const sortOrderOptions = { 'asc': -1, 'desc': 1 };
        sort = sortOrderOptions[sort] || null;

        const queryProducts = productModel.find().limit(Number(limit)).skip(skip);
        if (sort !== null)
            queryProducts.sort({price: sort});

        const [productos, totalDocs] = await Promise.all([queryProducts, productModel.countDocuments()]);

        const totalPages = Math.ceil(totalDocs/Number(limit));
        const hastNextPage = page < totalPages;
        const hastPrevPage = page > 1;
        const prevPage = hastPrevPage ? page -1 : null;
        const nextPage = hastNextPage ? page +1 : null;


        const result = {
            totalDocs,
            totalPages,
            limit,
            hastNextPage,
            hastPrevPage,
            prevPage,
            nextPage,
            payload: productos,
        }

        return res.json({result});
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