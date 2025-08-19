import jwt from "jsonwebtoken";
import { User } from "../Models/User.js";



export const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization;

    if(!token) {
        return res.json({
            message: "Login First"
        })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const id = decoded.userId;

    let user = await User.findById(id);

    if(!user) {
        return res.json({
            message: "User not exist"
        })
    }

    req.user = user;

    next();
}