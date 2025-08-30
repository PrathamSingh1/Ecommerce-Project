import {Router} from "express";
import { checkout, verify } from "../Controllers/payment.js";

const router = Router();


// checkout
router.post('/checkout', checkout);

// verify-payment & save to db
router.post('/verify-payment', verify);

export default router;
