import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  getCurrentUser,
  removeCurrentUser,
} from "../utils/storage";

function Profile() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);

  // ================= LOAD USER =================

  useEffect(() => {
    const savedUser = getCurrentUser();

    setCurrentUser(savedUser);
  }, []);

  // ================= LOGOUT =================

  const handleLogout = () => {
    removeCurrentUser();

    window.dispatchEvent(
      new Event("userUpdated")
    );

    toast.success("Logged out successfully.");

    navigate("/login");
  };

  // ================= LOGIN REQUIRED =================

  if (!currentUser) {
    return (
      <main className="min-h-screen bg-gray-50">

        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-6 py-12">

            <h1 className="text-4xl font-bold">
              My Profile
            </h1>

            <p className="mt-2 text-white/80">
              Manage your ShopEase account.
            </p>

          </div>
        </section>

        <section className="max-w-3xl mx-auto px-6 py-20">

          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">

            <div className="text-6xl mb-6">
              🔐
            </div>

            <h2 className="text-3xl font-bold text-gray-800">
              Login Required
            </h2>

            <p className="text-gray-500 mt-3">
              Please login to view your profile.
            </p>

            <Link
              to="/login"
              className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              Login
            </Link>

          </div>

        </section>

      </main>
    );
  }

  // ================= PROFILE =================

  return (
    <main className="min-h-screen bg-gray-50">

      {/* ================= HEADER ================= */}

      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">

        <div className="max-w-7xl mx-auto px-6 py-12">

          <h1 className="text-4xl font-bold">
            My Profile
          </h1>

          <p className="mt-2 text-white/80">
            Manage your ShopEase account.
          </p>

        </div>

      </section>

      {/* ================= CONTENT ================= */}

      <section className="max-w-5xl mx-auto px-6 py-10">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* ================= PROFILE CARD ================= */}

          <div className="bg-white rounded-2xl shadow-sm p-8 text-center">

            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-center text-4xl font-bold">
              {currentUser.name
                ? currentUser.name.charAt(0).toUpperCase()
                : "U"}
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mt-5">
              {currentUser.name || "User"}
            </h2>

            <p className="text-gray-500 mt-1">
              {currentUser.email || "No email available"}
            </p>

            <button
              type="button"
              onClick={handleLogout}
              className="w-full mt-6 bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-lg font-semibold transition"
            >
              Logout
            </button>

          </div>

          {/* ================= ACCOUNT INFORMATION ================= */}

          <div className="md:col-span-2 bg-white rounded-2xl shadow-sm p-8">

            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Account Information
            </h2>

            <div className="space-y-5">

              {/* NAME */}

              <div className="border-b pb-4">

                <p className="text-sm text-gray-500">
                  Full Name
                </p>

                <p className="font-semibold text-gray-800 mt-1">
                  {currentUser.name || "Not provided"}
                </p>

              </div>

              {/* EMAIL */}

              <div className="border-b pb-4">

                <p className="text-sm text-gray-500">
                  Email Address
                </p>

                <p className="font-semibold text-gray-800 mt-1">
                  {currentUser.email || "Not provided"}
                </p>

              </div>

              {/* PHONE */}

              <div className="border-b pb-4">

                <p className="text-sm text-gray-500">
                  Phone Number
                </p>

                <p className="font-semibold text-gray-800 mt-1">
                  {currentUser.phone || "Not provided"}
                </p>

              </div>

              {/* USER ID */}

              <div>

                <p className="text-sm text-gray-500">
                  User ID
                </p>

                <p className="font-semibold text-gray-800 mt-1">
                  {currentUser.id || "Not available"}
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* ================= QUICK LINKS ================= */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">

          <Link
            to="/orders"
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition"
          >
            <div className="text-3xl mb-3">
              📦
            </div>

            <h3 className="font-bold text-gray-800">
              My Orders
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              View and track your orders.
            </p>
          </Link>

          <Link
            to="/wishlist"
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition"
          >
            <div className="text-3xl mb-3">
              ❤️
            </div>

            <h3 className="font-bold text-gray-800">
              My Wishlist
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              View your saved products.
            </p>
          </Link>

          <Link
            to="/cart"
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition"
          >
            <div className="text-3xl mb-3">
              🛒
            </div>

            <h3 className="font-bold text-gray-800">
              My Cart
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              View products in your cart.
            </p>
          </Link>

        </div>

      </section>

    </main>
  );
}

export default Profile;