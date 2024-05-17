import { Router } from 'express';
import { getProductService } from '../services/products.js';
import { getCartByIdService } from '../services/carts.js';

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
    return res.render('products', {title: 'productos', result, styles:'products.css'});
});

router.get('/cart/:cid', async(req, res) => {
    const {cid} = req.params;
    console.log('id del carrito: ', cid)
    const carrito = await getCartByIdService(cid);
    return res.render('cart', { title: 'carrito', carrito, styles: 'cart.css' });
});

export default router;