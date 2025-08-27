import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { Trash2, Minus, Plus } from "lucide-react";

const Cart = () => {
  const { cart, decreaseQty, addToCart } = useContext(AppContext);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    let qty = 0;
    let price = 0;
    if(cart?.items) {
      for(let i=0; i<cart.items?.length; i++) {
        qty += cart.items[i].qty
        price += cart.items[i].price
      }
    }
    setPrice(price)
    setQty(qty)
  }, [cart])


  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Cart Items */}
      <div className="lg:col-span-2 space-y-6">
        <h1 className="text-2xl font-bold text-foreground mb-4">Your Cart</h1>

        {cart?.items?.length > 0 ? (
          cart.items.map((product) => (
            <div
              key={product._id}
              className="flex items-center gap-6 bg-white rounded-2xl shadow-md p-4 border border-gray-200 hover:shadow-lg transition-all"
            >
              {/* Image */}
              <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
                {product.imgSrc ? (
                  <img
                    src={product.imgSrc}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400 text-sm">No Image</span>
                )}
              </div>

              {/* Product Info */}
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-foreground">
                  {product.title}
                </h2>
                <p className="text-sm text-gray-500">
                  Qty: {product.qty}
                </p>
              </div>

              {/* Qty + Price */}
              <div className="flex items-center gap-4">
                {/* Qty Controls */}
                <div className="flex items-center gap-2">
                  <button onClick={()=> decreaseQty(product.productId, 1)} className="w-8 h-8 flex items-center justify-center rounded-full border bg-gray-100 hover:bg-gray-200 transition">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-medium">{product.qty}</span>
                  <button onClick={() =>
                  addToCart(
                    product?.productId,
                    product.title,
                    product.price/product.qty,
                    1,
                    product.imgSrc
                  )
                } className="w-8 h-8 flex items-center justify-center rounded-full border bg-gray-100 hover:bg-gray-200 transition">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Price */}
                <p className="font-bold text-primary w-24 text-right">
                  ₹{product.price.toLocaleString()}
                </p>
              </div>

              {/* Remove Button */}
              <button className="text-red-500 hover:text-red-600 transition-colors ml-2">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))
        ) : (
          <div className="text-center py-12 text-gray-500 bg-white rounded-2xl shadow-inner">
            Your cart is empty 🛒
          </div>
        )}
      </div>

      {/* Cart Summary */}
      <div className="bg-white rounded-2xl shadow-md p-6 h-fit border border-gray-200">
        <h2 className="text-xl font-bold text-foreground mb-6">Order Summary</h2>
        <div className="flex justify-between text-gray-700 mb-3">
          <span>Subtotal</span>
          <span>₹{price}</span>
        </div>
        <div className="flex justify-between text-gray-700 mb-6">
          <span>Shipping</span>
          <span className="text-green-600">Free</span>
        </div>
        <div className="flex justify-between font-bold text-lg text-foreground border-t pt-4">
          <span>Total</span>
          <span>₹{price}</span>
        </div>

        <button className="w-full mt-6 py-3 bg-gradient-to-r from-primary to-purple-600 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
