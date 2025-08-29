import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { Trash2, Minus, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, decreaseQty, addToCart, removeFromCart, clearCart } = useContext(AppContext);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let qty = 0;
    let price = 0;
    if (cart?.items) {
      for (let i = 0; i < cart.items?.length; i++) {
        qty += cart.items[i].qty;
        price += cart.items[i].price;
      }
    }
    setPrice(price);
    setQty(qty);
  }, [cart]);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-x-hidden">
      {/* Cart Items */}
      <div className="lg:col-span-2 space-y-4 sm:space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Your Cart</h1>
          {cart?.items?.length > 0 && (
            <button
              onClick={clearCart}
              className="transition-colors ml-2 flex items-center gap-2 p-2 text-sm sm:text-base cursor-pointer"
            >
              Clear Cart
              <Trash2 className="w-5 h-5 text-red-500" />
            </button>
          )}
        </div>

        {cart?.items?.length > 0 ? (
          cart.items.map((product) => (
            <div
              key={product._id}
              className="flex flex-col sm:flex-row items-center sm:items-stretch gap-4 sm:gap-6 bg-white rounded-2xl shadow-md p-4 border border-gray-200 hover:shadow-lg transition-all"
            >
              {/* Image */}
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center flex-shrink-0">
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

              {/* Product Info + Qty + Price + Remove */}
              <div className="flex flex-1 flex-col sm:flex-row items-center sm:items-center justify-between w-full gap-4 sm:gap-6">
                {/* Title + Qty Text */}
                <div className="flex flex-col text-center sm:text-left">
                  <h2 className="text-base sm:text-lg font-semibold text-foreground">
                    {product.title}
                  </h2>
                  <p className="text-sm text-gray-500">Qty: {product.qty}</p>
                </div>

                {/* Qty Controls + Price + Remove */}
                <div className="flex items-center gap-4 sm:ml-auto flex-wrap justify-center">
                  {/* Qty Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decreaseQty(product.productId, 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-full border bg-gray-100 hover:bg-gray-200 transition cursor-pointer"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-medium">{product.qty}</span>
                    <button
                      onClick={() =>
                        addToCart(
                          product?.productId,
                          product.title,
                          product.price / product.qty,
                          1,
                          product.imgSrc
                        )
                      }
                      className="w-8 h-8 flex items-center justify-center rounded-full border bg-gray-100 hover:bg-gray-200 transition cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Price */}
                  <p className="font-bold text-primary text-right min-w-[70px]">
                    ₹{product.price.toLocaleString()}
                  </p>

                  {/* Remove */}
                  <button
                    onClick={() => removeFromCart(product?.productId)}
                    className="text-red-500 hover:text-red-600 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 text-gray-500 bg-white rounded-2xl shadow-inner">
            Your cart is empty 🛒
          </div>
        )}
      </div>

      {cart?.items?.length > 0 && (
        <div className="bg-white rounded-2xl shadow-md p-6 h-fit border border-gray-200">
          <h2 className="text-lg sm:text-xl font-bold text-foreground mb-6">Order Summary</h2>
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

          <button
            onClick={() => navigate(`/shipping`)}
            className="w-full mt-6 py-3 bg-gradient-to-r from-primary to-purple-600 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
