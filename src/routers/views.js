import { Router } from "express";
import {
  cartView,
  chatView,
  homeView,
  loginGet,
  productsView,
  realtimeproductsView,
  registerGet,
} from "../controllers/views.js";

const router = Router();

router.get("/", homeView);
router.get("/realtimeproducts", realtimeproductsView);
router.get("/chat", chatView);
router.get("/products", productsView);
router.get("/cart/:cid", cartView);

router.get("/login", loginGet);
router.get("/register", registerGet);

export default router;
