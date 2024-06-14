import express from "express";
import { Server } from "socket.io";
import { engine } from "express-handlebars";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import 'dotenv/config';
import __dirname from './dirname.js';
import products from './routers/products.js';
import carts from './routers/carts.js';
import views from './routers/views.js';
import { dbConnection } from "./config/config.js";
import { messageModel } from "./dao/models/messages.js";
import { addProductService, getProductService } from "./services/products.js";
import { initializaPassport } from "./config/passport.js";

const app = express();
const PORT = process.env.PORT;

// Configuración de middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

// Configuración de sesión
app.use(session({
  store: MongoStore.create({
    mongoUrl: `${process.env.URI_MONGODB}/${process.env.DB_MONGODB}`,
    ttl: 3600
  }),
  secret: process.env.SECRET_SESSION,
  resave: false,
  saveUninitialized: true
}));

// Inicializar Passport
initializaPassport();
app.use(passport.initialize());
app.use(passport.session());

// Configuración de Handlebars
app.engine('handlebars', engine());
app.set('views', __dirname + '/views');
app.set('view engine','handlebars');

// Rutas
app.use('/', views);
app.use('/api/products', products);
app.use('/api/carts', carts);

// Conexión a la base de datos
await dbConnection();

// Configuración del servidor y Socket.io
const expServer = app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

const io = new Server(expServer);

io.on('connection', async (socket) => {
  // Productos
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

  // Chat
  const messages = await messageModel.find();
  socket.emit('messageLogs', messages); // Emitir los mensajes al evento 'messageLogs' cuando un cliente se conecta

  socket.on('message', async (data) => {
    const newMessage = await messageModel.create({ ...data });
    if (newMessage) {
      const messages = await messageModel.find();
      io.emit('messageLogs', messages); // Emitir los mensajes actualizados a todos los clientes cuando se recibe un nuevo mensaje
    }
  });

  socket.broadcast.emit('newUser');
});
