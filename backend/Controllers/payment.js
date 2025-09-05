import { Payment } from "../Models/Payment.js";
import dotenv from "dotenv";
dotenv.config();
import Razorpay from 'razorpay';


const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_TEST_ID,
  key_secret: process.env.RAZORPAY_TEST_SECRET,
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


// verify and save to db function
export const verify = async (req, res) => {
  const {
    orderId,
    paymentId,
    signature,
    amount,
    orderItems,
    userId,
    userShipping,
  } = req.body;

  let orderConfirm = await Payment.create({
    orderId,
    paymentId,
    signature,
    amount,
    orderItems,
    userId,
    userShipping,
    payStatus: "Paid"
  });

  res.json({
    message: "Payment Successful", success: true, orderConfirm
  })
}