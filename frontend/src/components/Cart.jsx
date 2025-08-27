import React, { useContext } from "react";
import AppContext from "../context/AppContext";
import { Trash2, Minus, Plus } from "lucide-react";

const Cart = () => {
  const { cart, setCart } = useContext(AppContext);

  // Increase quantity
  const increaseQty = (id) => {
    const updatedItems = cart.items.map((item) =>
      item._id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
    );
    setCart({ ...cart, items: updatedItems });
  };

  // Decrease quantity
  const decreaseQty = (id) => {
    const updatedItems = cart.items.map((item) =>
      item._id === id && (item.quantity || 1) > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart({ ...cart, items: updatedItems });
  };

  // Remove item
  const removeItem = (id) => {
    const updatedItems = cart.items.filter((item) => item._id !== id);
    setCart({ ...cart, items: updatedItems });
  };

  // Calculate subtotal
  const subtotal = cart?.items?.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

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
                  Qty: {product.quantity || 1}
                </p>
              </div>

              {/* Qty + Price */}
              <div className="flex items-center gap-4">
                {/* Qty Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseQty(product._id)}
                    className="w-8 h-8 flex items-center justify-center rounded-full border bg-gray-100 hover:bg-gray-200 transition"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-medium">{product.quantity || 1}</span>
                  <button
                    onClick={() => increaseQty(product._id)}
                    className="w-8 h-8 flex items-center justify-center rounded-full border bg-gray-100 hover:bg-gray-200 transition"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Price */}
                <p className="font-bold text-primary w-24 text-right">
                  ₹{(product.price * (product.quantity || 1)).toLocaleString()}
                </p>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => removeItem(product._id)}
                className="text-red-500 hover:text-red-600 transition-colors ml-2"
              >
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
          <span>₹{subtotal?.toLocaleString() || 0}</span>
        </div>
        <div className="flex justify-between text-gray-700 mb-6">
          <span>Shipping</span>
          <span className="text-green-600">Free</span>
        </div>
        <div className="flex justify-between font-bold text-lg text-foreground border-t pt-4">
          <span>Total</span>
          <span>₹{subtotal?.toLocaleString() || 0}</span>
        </div>

        <button className="w-full mt-6 py-3 bg-gradient-to-r from-primary to-purple-600 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
