import { Router } from "express";
import {
  cartView,
  chatView,
  homeView,
  loginGet,
  loginPost,
  logout,
  productsView,
  realtimeproductsView,
  registerGet,
  registerPost,
} from "../controllers/views.js";
import { admin, auth } from "../middleware/auth.js";

const router = Router();

// Ruta para la vista principal
router.get("/", homeView);

// Ruta para productos en tiempo real, requiere autenticación y permisos de administrador
router.get("/realtimeproducts", [auth, admin], realtimeproductsView);

// Ruta para el chat, requiere autenticación
router.get("/chat", auth, chatView);

// Ruta para ver productos, requiere autenticación
router.get("/products", auth, productsView);

// Ruta para ver el carrito, requiere autenticación
router.get("/cart/:cid", auth, cartView);

// Rutas para la autenticación (login y registro)
router.get("/login", loginGet);
router.post("/login", loginPost);
router.get("/register", registerGet);
router.post("/register", registerPost);

// Ruta para cerrar sesión
router.get("/logout", logout);

export default router;
