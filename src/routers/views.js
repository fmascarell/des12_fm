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
import { auth } from "../middleware/auth.js";

const router = Router();

router.get("/", auth, homeView);
router.get("/realtimeproducts", auth, realtimeproductsView);
router.get("/chat", auth, chatView);
router.get("/products", auth, productsView);
router.get("/cart/:cid", auth, cartView);
router.get("/login", loginGet);
router.post("/login", loginPost);
router.get("/register", registerGet);
router.post("/register", registerPost);
router.get("/logout", logout);

export default router;
