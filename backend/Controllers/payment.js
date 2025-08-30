import { Payment } from "../Models/Payment.js";
import Razorpay from 'razorpay';


const razorpay = new Razorpay({
  key_id: '<your_partner_key>',
  key_secret: '<your_partner_secret>',
});



// checkout function
export const checkout = async (req, res) => {
    const {amount, cartItems, userShipping, userId} = req.body;

    var options = {
    amount: amount*100, 
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
    };
    const order = await razorpay.orders.create(options);

    res.json({
        orderId: order.id,
        amount,
        cartItems,
        userShipping,
        userId,
        payStatus: "created"
    })
}


// verify function
export const verify = async (req, res) => {
  
}