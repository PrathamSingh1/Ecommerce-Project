import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import userRouter from "./Routes/user.js";
import productRouter from "./Routes/product.js";
import cartRouter from "./Routes/cart.js";
import addressRouter from "./Routes/address.js";
import cors from "cors";



const app = express();
app.use(express.json());
app.use(cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.urlencoded({ extended: true })); 

// home testing route

app.get('/', (req, res) => {
    res.json({
        message: 'This is home route'
    })
})


// user Router
app.use('/api/user', userRouter)

// product Router
app.use('/api/product', productRouter)

// cart Router
app.use('/api/cart', cartRouter)

// address Router
app.use('/api/address', addressRouter)



mongoose.connect(process.env.DATABASE_URL,{
    dbName:"Ecommerce"
}).then(()=>{
    console.log("Mongodb connected sucessfully");
}).catch((err)=>{
    console.log(err);
})



const port = 3000;
app.listen(port,()=>console.log(`Server is running on port ${port}`))