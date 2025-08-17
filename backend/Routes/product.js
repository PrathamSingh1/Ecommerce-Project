import express from 'express';
import { addProduct, getProductById, getProducts } from '../Controllers/product.js';


const router = express.Router();

// add product
router.post('/add', addProduct)

// get product
router.get('/all', getProducts)

// get product by Id
router.get('/:id', getProductById)

export default router;