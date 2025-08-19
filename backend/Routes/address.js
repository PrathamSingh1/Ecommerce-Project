import { Router } from "express";
import { addAddress, getAddress } from "../Controllers/address.js";
import { authMiddleware } from "../Middlewares/auth.js";

const router = Router();

// add address
router.post('/add', authMiddleware, addAddress)

// get address 
router.get('/get', authMiddleware, getAddress)


export default router;