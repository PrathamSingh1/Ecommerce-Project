import { Products } from "../Models/Product.js";


// add product 
export const addProduct = async (req, res) => {
    const { title, description, price, category, qty, imgSrc } = req.body
    try {
        let product = await Products.create({
            title,
            description,
            price,
            category,
            qty,
            imgSrc
        });
        res.json({message: 'Product added successfully', product})

    } catch (error) {
        res.json({
            message: error.message
        })
    }
}

// get products
export const getProducts = async (req, res) => {
    let products = await Products.find().sort({createdAt:-1})
    res.json({
        message: 'All Products', products
    })
}

// find product by id
export const getProductById = async (req, res) => {
    const id = req.params.id;
    let product = await Products.findById(id);
    if(!product) {
        return res.json({
            message: "Invalid Id"
        })
    }
    res.json({
        message: "Specific products", product
    })
}