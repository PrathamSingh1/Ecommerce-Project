import React from "react";

const Address = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-foreground mb-8 text-center">
          Shipping Address
        </h1>

        {/* Form */}
        <form className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition"
            />
          </div>

          {/* Country & State */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Country
              </label>
              <input
                type="text"
                placeholder="Enter your country"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                State
              </label>
              <input
                type="text"
                placeholder="Enter your state"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition"
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
                type="text"
                placeholder="Enter your city"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Pincode
              </label>
              <input
                type="text"
                placeholder="Enter your pincode"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Phone Number
            </label>
            <input
              type="text"
              placeholder="Enter your phone number"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition"
            />
          </div>

          {/* Address Line */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Address Line / Nearby
            </label>
            <textarea
              rows="3"
              placeholder="Enter your full address"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-between gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 py-3 bg-gradient-to-r from-primary to-purple-600 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
            >
              Submit
            </button>
            <button
              type="button"
              className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold border border-gray-300 shadow-sm hover:bg-gray-200 transition-all duration-300"
            >
              Old Address
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Address;
