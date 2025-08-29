import React, { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Address = () => {
  const { shippingAddress, userAddress } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    phoneNumber: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { fullName, address, city, state, country, pincode, phoneNumber } =
    formData;
  const submitHandler = async (e) => {
    e.preventDefault();

    
    const result = await shippingAddress(
      fullName,
      address,
      city,
      state,
      country,
      pincode,
      phoneNumber
    );

    if (result.success) {
      navigate(`/checkout`);
    }

    setFormData({
      fullName: "",
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      phoneNumber: "",
    });
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-foreground mb-8 text-center">
          Shipping Address
        </h1>

        {/* Form */}
        <form onSubmit={submitHandler} className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Full Name
            </label>
            <input
              name="fullName"
              value={formData.fullName}
              onChange={onChangeHandler}
              type="text"
              placeholder="Enter your full name"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 transition"
            />
          </div>

          {/* Country & State */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Country
              </label>
              <input
                name="country"
                value={formData.country}
                onChange={onChangeHandler}
                type="text"
                placeholder="Enter your country"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 transition"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                State
              </label>
              <input
                name="state"
                value={formData.state}
                onChange={onChangeHandler}
                type="text"
                placeholder="Enter your state"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 transition"
              />
            </div>
          </div>

          {/* City & Pincode */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                City
              </label>
              <input
                name="city"
                value={formData.city}
                onChange={onChangeHandler}
                type="text"
                placeholder="Enter your city"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 transition"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Pincode
              </label>
              <input
                name="pincode"
                value={formData.pincode}
                onChange={onChangeHandler}
                type="number"
                placeholder="Enter your pincode"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 transition"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Phone Number
            </label>
            <input
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={onChangeHandler}
              type="number"
              placeholder="Enter your phone number"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 transition"
            />
          </div>

          {/* Address Line */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Address Line / Nearby
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={onChangeHandler}
              type="text"
              rows="3"
              placeholder="Enter your full address"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-between gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 py-3 bg-gradient-to-r from-primary to-purple-600 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer"
            >
              Submit
            </button>
            {userAddress && (
                <button
                onClick={()=> navigate(`/checkout`)}
                type="button"
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold border border-gray-300 shadow-sm hover:bg-gray-200 transition-all duration-300 cursor-pointer">
                Old Address
              </button>
            )}
            
          </div>
        </form>
      </div>
    </div>
  );
};

export default Address;
