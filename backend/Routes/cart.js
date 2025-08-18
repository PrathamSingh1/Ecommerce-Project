import express from "express";
import { addToCart, clearCart, removeProductFromCart, userCart } from "../Controllers/cart.js";


const router = express.Router();

// add to cart
router.post('/add', addToCart)

// get User Cart
router.get('/user', userCart)

// remove product from cart
router.delete('/remove/:productId', removeProductFromCart)

// clear cart
router.delete('/clear', clearCart)

export default router;