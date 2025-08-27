import React, { useContext } from "react";
import AppContext from "../../context/AppContext";

const Profile = ({ onLogout }) => {
  const { user } = useContext(AppContext);

  return (
    <div className="absolute right-0 top-12 w-72 bg-white shadow-xl rounded-2xl p-5 z-50">
      {/* Header */}
      <div className="flex items-center gap-4 border-b pb-4">
        <img
          src={user?.avatar || "https://via.placeholder.com/60"}
          alt="profile"
          className="w-14 h-14 rounded-full object-cover"
        />
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            {user?.name || "Guest User"}
          </h2>
          <p className="text-sm text-gray-500">{user?.email || "No email"}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 space-y-3">
        <button className="w-full py-2 rounded-xl text-sm font-medium bg-gray-100 hover:bg-gray-200 transition">
          My Orders
        </button>
        <button className="w-full py-2 rounded-xl text-sm font-medium bg-gray-100 hover:bg-gray-200 transition">
          Settings
        </button>
        <button
          onClick={onLogout}
          className="w-full py-2 rounded-xl text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
