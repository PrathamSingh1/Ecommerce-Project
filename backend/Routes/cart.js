import express from "express";
import { addToCart, clearCart, decreaseProductQty, removeProductFromCart, userCart } from "../Controllers/cart.js";
import { authMiddleware } from "../Middlewares/Auth.js";


const router = express.Router();

// add to cart
router.post('/add', authMiddleware, addToCart)

// get User Cart
router.get('/user', userCart)

// remove product from cart
router.delete('/remove/:productId', removeProductFromCart)

// clear cart
router.delete('/clear', clearCart)

// decrease items qty from cart
router.post('/--qty', decreaseProductQty)

export default router;