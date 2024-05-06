import { Router } from 'express';
import { productModel } from '../models/products.js';
const router = Router();

router.get('/', async (req,res)=>{
    const productos = productModel.find();
    return res.render('home',{productos, styles: 'styles.css'});
    //return res.render('home',{productos});
});

router.get('/realtimeproducts',(req,res)=>{
    return res.render('realTimeProducts');
});

export default router;