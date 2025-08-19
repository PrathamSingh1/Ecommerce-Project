import { User } from "../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// user register function
export const register = async (req, res) => {
    const { name, email, password } = req.body
    try {
        let user = await User.findOne({email})
        if(user) {
            return res.json({
                message: "User already exist",success: false
            })
        }
        const hashPass = await bcrypt.hash(password, 10);
        user = await User.create({
            name,
            email,
            password: hashPass
        });
        res.json({message: "User register successfully...!", user, success:true})
    } catch (error) {
        res.json({
            message: error.message
        })
    }
}

// user login function
export const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email);
    try {
        let user = await User.findOne({email});
        if(!user) {
            return res.json({
                message: "User Not Found", success: false
            })
        }
        const validPassword = await bcrypt.compare(password, user.password)
        if(!validPassword) {
            return res.json({
                message: "Invalid Credential", success: false
            });
        }

        const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET,{
            expiresIn: "24h"
        })

        res.json({
            message: `Welcome ${user.name}`, token, success: true
        })
    } catch(error) {
        res.json({
            message: error.message
        })
    }
}

// get All users
export const users = async (req, res) => {
    try {
        let users = await User.find().sort({createdAt:-1});
        res.json(users);
    } catch (error) {
        res.json({
            message: error.message
        })
    }
}

// get profile
export const profile = async (req, res) => {
    res.json({
        user: req.user
    })
}