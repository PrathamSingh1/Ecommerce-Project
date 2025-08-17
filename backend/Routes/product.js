import express from 'express';
import { addProduct, getProducts } from '../Controllers/product.js';


const router = express.Router();

// add product
router.post('/add', addProduct)

// get product
router.get('/all', getProducts)

export default router;