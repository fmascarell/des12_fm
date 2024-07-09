import express from "express";
import 'dotenv/config';

import { productsRouter, cartsRouter, authRouter } from "./routers/index.js";

import __dirname from './dirname.js';
import { dbConnection } from "./config/config.js";

const app = express();
const PORT = process.env.PORT;

// Configuración de middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

// endpoint
app.use('/api/auth', authRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Conexión a la base de datos
await dbConnection();

// Configuración del servidor y Socket.io
app.listen(PORT, () => { console.log(`App running on port ${PORT}`);});

