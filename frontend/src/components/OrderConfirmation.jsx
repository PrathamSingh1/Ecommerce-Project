import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";

const OrderConfirmation = () => {
  const { userOrder } = useContext(AppContext);

  const [latestOrder, setLatestOrder] = useState({});

  useEffect(() => {
    if (userOrder) {
      setLatestOrder(userOrder[0]);
    }
  }, [userOrder]);

  console.log("latestOrder", latestOrder);

  const totalQty = latestOrder?.orderItems?.reduce((acc, item) => acc + item.qty, 0) || 0;

  return (
    <div className="max-w-6xl mx-auto p-6 sm:p-8">
      {/* Heading */}
      <div className="text-center mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary">
          🎉 Your Order has been Confirmed!
        </h1>
        <p className="text-gray-600 mt-2">
          Thank you for shopping with us. Your order will be delivered soon 🚚
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Items */}
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-foreground">
            Order Items
          </h2>

          <div className="divide-y divide-gray-200">
            {latestOrder?.orderItems?.length > 0 ? (
              latestOrder?.orderItems.map((item) => (
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
              <p className="text-center text-gray-500 py-6">No items found</p>
            )}
          </div>

          {latestOrder?.orderItems?.length > 1 && (
            <div className="mt-6 border-t pt-4 space-y-2">
              <div className="flex justify-between text-gray-700">
                <span>Total Quantity</span>
                <span>{totalQty}</span>
              </div>
              <div className="flex justify-between font-bold text-lg text-foreground">
                <span>Total Price</span>
                <span>₹{latestOrder?.amount.toLocaleString()}</span>
              </div>
            </div>
          )}
        </div>

        {/* Order & Shipping Details */}
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-foreground">
            Order Details & Shipping Address
          </h2>

          {latestOrder ? (
            <div className="space-y-3 text-gray-700">
              {/* Order Details */}
              <p>
                <span className="font-medium">Order ID:</span> {latestOrder?.orderId}
              </p>
              <p>
                <span className="font-medium">Payment ID:</span>{" "}
                {latestOrder?.paymentId}
              </p>
              <p>
                <span className="font-medium">Payment Status:</span>{" "}
                <span
                  className={`${
                    latestOrder?.payStatus === "Paid"
                      ? "text-green-600 font-semibold"
                      : "text-red-600 font-semibold"
                  }`}
                >
                  {latestOrder?.payStatus}
                </span>
              </p>
              <p>
                <span className="font-medium">Order Date:</span>{" "}
                {new Date(latestOrder?.orderDate).toLocaleDateString()}
              </p>

              {/* Shipping Address */}
              <div className="border-t pt-4 space-y-2">
                <p>
                  <span className="font-medium">Name:</span>{" "}
                  {latestOrder?.userShipping?.fullName}
                </p>
                <p>
                  <span className="font-medium">Phone:</span>{" "}
                  {latestOrder?.userShipping?.phoneNumber}
                </p>
                <p>
                  <span className="font-medium">State:</span>{" "}
                  {latestOrder?.userShipping?.state}
                </p>
                <p>
                  <span className="font-medium">City:</span>{" "}
                  {latestOrder?.userShipping?.city}
                </p>
                <p>
                  <span className="font-medium">PinCode:</span>{" "}
                  {latestOrder?.userShipping?.pincode}
                </p>
                <p>
                  <span className="font-medium">Nearby:</span>{" "}
                  {latestOrder?.userShipping?.address}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No order details found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
