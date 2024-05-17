import { Router } from 'express';
import { getProductService } from '../services/products.js';
const router = Router();

router.get('/', async (req,res)=>{
    const {payload} = await getProductService();
    return res.render('home',{productos: payload, styles:'styles.css', title:'Home'});
});

router.get('/realtimeproducts',(req,res)=>{
    return res.render('realTimeProducts', {title:'Real Time'});
});

router.get('/chat',(req,res)=>{
    return res.render('chat', {styles:'chat.css', title:'Chat'});
});

router.get('/products', async(req, res) => {
    const result = await getProductService({...req.query});
    return res.render('products', {title: 'productos', result});
});

export default router;