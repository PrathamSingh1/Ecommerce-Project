import React from "react";

const Login = () => {
  return (
    <div className="min-h-full flex items-center justify-center bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 px-4">
      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-15 mt-25 border border-gray-200">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
          Welcome Back
        </h1>
        <p className="text-sm text-gray-500 text-center mb-8">
          Please log in to your account
        </p>

        {/* Form */}
        <form className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-primary to-purple-600 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <a href="/register" className="text-primary font-medium hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
