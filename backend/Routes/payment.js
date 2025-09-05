import {Router} from "express";
import { checkout, userOrder, verify } from "../Controllers/payment.js";
import { authMiddleware } from "../Middlewares/auth.js";

const router = Router();


// checkout
router.post('/checkout', checkout);

// verify-payment & save to db
router.post('/verify-payment', verify);

// user order
router.get('/userorder', authMiddleware, userOrder);

export default router;
