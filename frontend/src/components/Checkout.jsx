import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Checkout = () => {
  const { cart, userAddress, user, clearCart } = useContext(AppContext); 

  const navigate = useNavigate();

  const [price, setPrice] = useState(0);
  const [qty, setQty] = useState(0);

  useEffect(() => {
    let totalPrice = 0;
    let totalQty = 0;
    if (cart?.items) {
      cart.items.forEach((item) => {
        totalPrice += item.price;
        totalQty += item.qty;
      });
    }
    setPrice(totalPrice);
    setQty(totalQty);
  }, [cart]);

  const handlePayment = async () => {
    try {
      const orderResponse = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/payment/checkout`, {
        amount: price,
        qty: qty,
        cartItems: cart?.items,
        userShipping: userAddress,
        userId: user._id
      });

      console.log("order response", orderResponse)
      const {orderId, amount:orderAmount} = orderResponse.data


      var options = {
        "key": import.meta.env.VITE_RAZORPAY_TEST_ID, // Enter the Key ID generated from the Dashboard
        "amount": orderAmount*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Ecommerce Project",
        "description": "Ecommerce Project",
        "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": async function (response){
          const paymentData = {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            amount: orderAmount,
            orderItems: cart?.items,
            userId: user._id,
            userShipping: userAddress
          }

          const api = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/payment/verify-payment`, paymentData);
          
          console.log("razorpay res", api.data);

          if (api.data.success) {
            clearCart();
            navigate("/orderconfirmation");
          }

        },
        "prefill": {
            "name": "Shashi Ranjan Singh",
            "email": "prathamjii36@gmail.com",
            "contact": "9125049250"
        },
        "notes": {
            "address": "Noida"
        },
        "theme": {
            "color": "#3399cc"
        }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 sm:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-8 text-center">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Shipping Address */}
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-foreground">
            Shipping Address
          </h2>


          {userAddress ? (
            <div className="space-y-2 text-gray-700">
              <p><span className="font-medium">Name:</span> {userAddress.fullName}</p>
              <p><span className="font-medium">Phone:</span> {userAddress.phoneNumber}</p>
              <p><span className="font-medium">City:</span> {userAddress.city}</p>
              <p><span className="font-medium">State:</span> {userAddress.state}</p>
              <p><span className="font-medium">Pincode:</span> {userAddress.pincode}</p>
              <p><span className="font-medium">Country:</span> {userAddress.country}</p>
              <p><span className="font-medium">Address:</span> {userAddress.address}</p>
            </div>
          ) : (
            <p className="text-gray-500">No shipping address found. Please add one.</p>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-foreground">
            Order Summary
          </h2>

          <div className="divide-y divide-gray-200">
            {cart?.items?.length > 0 ? (
              cart.items.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center py-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.imgSrc}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded-lg border"
                    />
                    <div>
                      <h3 className="font-medium text-gray-800">{item.title}</h3>
                      <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                    </div>
                  </div>
                  <span className="font-semibold text-gray-900">
                    ₹{item.price.toLocaleString()}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-6">
                Your cart is empty 🛒
              </p>
            )}
          </div>

          {cart?.items?.length > 0 && (
            <>
              {/* Totals */}
              <div className="mt-6 space-y-3">
                <div className="flex justify-between text-gray-700">
                  <span>Total Items</span>
                  <span>{qty}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>₹{price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-4 text-foreground">
                  <span>Total</span>
                  <span>₹{price.toLocaleString()}</span>
                </div>
              </div>

              {/* Pay Button */}
              <button
                onClick={handlePayment}
                className="w-full mt-6 py-3 bg-gradient-to-r from-primary to-purple-600 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              >
                Proceed to Pay
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
