import express from 'express';
import { login, profile, register, users } from '../Controllers/user.js';
import { authMiddleware } from "../Middlewares/auth.js"

const router = express.Router();

// register user
router.post('/register', register)

// login user 
router.post('/login', login)

// get all user's
router.get('/all', users)

// get user profile
router.get('/profile', authMiddleware, profile)


export default router;