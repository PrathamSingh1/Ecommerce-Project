import express from "express";
import { addToCart, removeProductFromCart, userCart } from "../Controllers/cart.js";


const router = express.Router();

// add to cart
router.post('/add', addToCart)

// get User Cart
router.get('/user', userCart)

// remove product from cart
router.delete('/remove/:productId', removeProductFromCart)

export default router;