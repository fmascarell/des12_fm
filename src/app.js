//import express from "express";
//import { Server } from "socket.io";
//import { engine } from "express-handlebars";
//import session from "express-session";
//import MongoStore from "connect-mongo";
//import passport from "passport";
//import 'dotenv/config';
//
//import products from './routers/products.js';
//import carts from './routers/carts.js';
//import views from './routers/views.js';
//import __dirname from "./utils.js";
//import { dbConnection } from "./database/config.js";
//import { messageModel } from "./dao/models/messages.js";
//import { addProductService, getProductService } from "./services/products.js";
//import { initializaPassport } from "./config/passport.js";
//
//const app = express();
//const PORT = process.env.PORT;
//
//app.use(express.json());
//app.use(express.urlencoded({extended: true}));
//app.use(express.static(__dirname + '/public'));
//
//app.use(session({
//  store: MongoStore.create({
//    mongoUrl: `${process.env.URI_MONGODB}`,
//    ttl: 3600
//  }),
//  secret: process.env.SECRET_SESSION,
//  resave: false,
//  saveUninitialized: true
//}));
//
////config passport
//initializaPassport();
//app.use(passport.initialize());
//app.use(passport.session());
//
//app.engine('handlebars', engine());
//app.set('views', __dirname + '/views');
//app.set('view engine','handlebars');
//
//app.use('/', views);
//app.use('/api/products', products);
//app.use('/api/carts', carts);
//
//await dbConnection();
//
//const expServer = app.listen(PORT, () => {console.log(`App run in port ${PORT}`);});
//const io = new Server(expServer);
//
//io.on('connection', async (socket) => {
//  //productos
//  const limit = 50;
//  const {payload} = await getProductService({limit});
//  const productos = payload;
//  socket.emit('productos', payload);
//
//  socket.on('addProduct', async (producto) =>{
//    const newProduct = await addProductService({...producto});
//    if (newProduct)
//      productos.push(newProduct);
//      socket.emit('productos', productos);
//  })
//
//  //chat
//  const messages = await messageModel.find();
//  socket.emit('message', messages);
//
//  socket.on('message', async(data)=>{
//    const newMessage = await messageModel.create({...data});
//    if (newMessage)
//    {
//      const messages = await messageModel.find();
//      io.emit('messageLogs', messages);
//    }
//  });
//
//  socket.broadcast.emit('newUser');
//
//});

import express from "express";
import { Server } from "socket.io";
import { engine } from "express-handlebars";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import 'dotenv/config';

import products from './routers/products.js';
import carts from './routers/carts.js';
import views from './routers/views.js';
import __dirname from "./utils.js";
import { dbConnection } from "./database/config.js";
import { messageModel } from "./dao/models/messages.js";
import { addProductService, getProductService } from "./services/products.js";
import { initializaPassport } from "./config/passport.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.use(session({
  store: MongoStore.create({
    mongoUrl: process.env.URI_MONGODB,
    ttl: 3600
  }),
  secret: process.env.SECRET_SESSION,
  resave: false,
  saveUninitialized: true
}));

//config passport
initializaPassport();
app.use(passport.initialize());
app.use(passport.session());

app.engine('handlebars', engine());
app.set('views', __dirname + '/views');
app.set('view engine','handlebars');

app.use('/', views);
app.use('/api/products', products);
app.use('/api/carts', carts);

await dbConnection();

const expServer = app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

const io = new Server(expServer);

io.on('connection', async (socket) => {
  //productos
  const limit = 50;
  const { payload } = await getProductService({ limit });
  const productos = payload;
  socket.emit('productos', payload);

  socket.on('addProduct', async (producto) => {
    const newProduct = await addProductService({ ...producto });
    if (newProduct) {
      productos.push(newProduct);
      socket.emit('productos', productos);
    }
  });

  //chat
  const messages = await messageModel.find();
  socket.emit('message', messages);

  socket.on('message', async (data) => {
    const newMessage = await messageModel.create({ ...data });
    if (newMessage) {
      const messages = await messageModel.find();
      io.emit('messageLogs', messages);
    }
  });

  socket.broadcast.emit('newUser');
});
