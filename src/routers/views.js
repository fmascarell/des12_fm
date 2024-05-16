import { Router } from 'express';
//import { productModel } from '../dao/models/products.js';
import { getProductService } from '../services/products.js';
const router = Router();

router.get('/', async (req,res)=>{
    //const productos = await productModel.find().lean();
    const {payload} = await getProductService();
    return res.render('home',{productos: payload, styles:'styles.css', title:'Home'});
});

router.get('/realtimeproducts',(req,res)=>{
    return res.render('realTimeProducts', {title:'Real Time'});
});

router.get('/chat',(req,res)=>{
    return res.render('chat', {styles:'chat.css', title:'Chat'});
});

export default router;