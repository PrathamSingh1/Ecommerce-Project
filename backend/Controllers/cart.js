import { Cart } from "../Models/Cart.js";


// add to Cart
export const addToCart = async (req, res) => {
    const {productId, title, price, qty, imgSrc} = req.body;

    const userId = "68a0ac4ada41b1967f356f8e";

    let cart = await Cart.findOne({userId});

    if(!cart) {
        cart = await Cart({userId, items:[]})
    }

    const itemIndex = cart.items.findIndex((item) =>item.productId.toString() === productId)

    if(itemIndex > -1) {
        cart.items[itemIndex].qty += qty;
        cart.items[itemIndex].price += price*qty
    } else {
        cart.items.push({
        productId,
        title,
        price,
        qty,
        imgSrc
    })
    }

    await cart.save()
    res.json({
        message: "Itmes Added To Cart", cart
    })
}

// get User Cart
export const userCart = async (req, res) => {
    const userId = "68a0ac4ada41b1967f356f8e";

    let cart = await Cart.findOne({userId});
    if(!cart) {
        return res.jsnon({
            message: 'Cart not found'
        })
    }
    res.json({
        message: "User cart", cart
    })
}

// remove product from Cart
export const removeProductFromCart = async (req, res) => {
    const productId = req.params.productId;
    const userId = "68a0ac4ada41b1967f356f8e";

    let cart = await Cart.findOne({ userId });
    if(!cart) {
        return res.json({
            message: "Cart not found"
        })
    }

    cart.items = cart.items.filter((item)=>item.productId.toString() !== productId);

    await cart.save();

    res.json({
        message: "Product removed from cart"
    })

}
