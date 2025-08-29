import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";

const Checkout = () => {
  const { cart, userAddress } = useContext(AppContext); 
  // userAddress should come from context or backend
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
              <p>
                <span className="font-medium">Address:</span>{" "}
                {userAddress.address}, {userAddress.city}, {userAddress.state} - {userAddress.pincode}, {userAddress.country}
              </p>
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
