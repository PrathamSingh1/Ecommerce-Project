import { Router } from "express";
import { addAddress } from "../Controllers/address.js";
import { authMiddleware } from "../Middlewares/auth.js";

const router = Router();

//
router.post('/add', authMiddleware, addAddress)


export default router;