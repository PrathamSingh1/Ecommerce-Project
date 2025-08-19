import express from "express";
import { addToCart, clearCart, decreaseProductQty, removeProductFromCart, userCart } from "../Controllers/cart.js";
import { authMiddleware } from "../Middlewares/auth.js";


const router = express.Router();

// add to cart
router.post('/add', authMiddleware, addToCart)

// get User Cart
router.get('/user', authMiddleware, userCart)

// remove product from cart
router.delete('/remove/:productId', authMiddleware, removeProductFromCart)

// clear cart
router.delete('/clear', authMiddleware, clearCart)

// decrease items qty from cart
router.post('/--qty', authMiddleware, decreaseProductQty)

export default router;