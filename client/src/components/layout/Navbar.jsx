import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaHeart,
  FaSearch,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import toast from "react-hot-toast";
import {
  getCart,
  getWishlist,
  getCurrentUser,
  removeCurrentUser,
} from "../../utils/storage";

function Navbar() {
  const navigate = useNavigate();

  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const [search, setSearch] = useState("");

  // ================= LOAD CART + WISHLIST =================

  const updateCounts = () => {
    const savedCart = getCart();
    const savedWishlist = getWishlist();

    const totalCartItems = savedCart.reduce(
      (total, item) =>
        total + (Number(item.quantity) || 1),
      0
    );

    setCartCount(totalCartItems);
    setWishlistCount(savedWishlist.length);
  };

  // ================= LOAD CURRENT USER =================

  const updateUser = () => {
    const savedUser = getCurrentUser();

    setCurrentUser(savedUser);
  };

  // ================= INITIAL LOAD =================

  useEffect(() => {
    updateCounts();
    updateUser();

    window.addEventListener("storage", updateCounts);
    window.addEventListener("cartUpdated", updateCounts);
    window.addEventListener("wishlistUpdated", updateCounts);
    window.addEventListener("userUpdated", updateUser);

    return () => {
      window.removeEventListener("storage", updateCounts);
      window.removeEventListener("cartUpdated", updateCounts);
      window.removeEventListener(
        "wishlistUpdated",
        updateCounts
      );
      window.removeEventListener(
        "userUpdated",
        updateUser
      );
    };
  }, []);

  // ================= LOGOUT =================

  const handleLogout = () => {
    removeCurrentUser();

    setCurrentUser(null);

    window.dispatchEvent(
      new Event("userUpdated")
    );

    toast.success("Logged out successfully! 👋");

    navigate("/");
  };

    // ================= SEARCH =================

  const handleSearch = (event) => {
    event.preventDefault();

    const trimmedSearch = search.trim();

    if (trimmedSearch) {
      navigate(
        `/products?search=${encodeURIComponent(trimmedSearch)}`
      );
    } else {
      navigate("/products");
    }
  };

  // ================= RETURN =================

return (
  <nav className="sticky top-0 z-40 bg-slate-900 text-white shadow-md">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
      <div className="flex items-center justify-between gap-4">

        {/* ================= LOGO ================= */}
        <Link
          to="/"
          className="text-2xl sm:text-3xl font-extrabold tracking-tight text-blue-400 hover:text-blue-300 transition-colors duration-200 shrink-0"
        >
          ShopEase
        </Link>

        {/* ================= SEARCH ================= */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center bg-white rounded-xl overflow-hidden w-[280px] lg:w-[320px] shadow-sm focus-within:ring-2 focus-within:ring-blue-400 transition"
        >
          <label
            htmlFor="navbar-search"
            className="sr-only"
          >
            Search products
          </label>

          <input
            id="navbar-search"
            name="search"
            type="search"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search products..."
            autoComplete="off"
            aria-label="Search products"
            className="flex-1 min-w-0 px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 outline-none"
          />

          <button
            type="submit"
            aria-label="Search"
            className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 px-4 py-3 transition-colors duration-200"
          >
            <FaSearch className="text-sm" />
          </button>
        </form>

        {/* ================= NAVIGATION ================= */}
        <div className="flex items-center gap-2 sm:gap-4 text-sm sm:text-base">

          {/* HOME */}
          <Link
            to="/"
            className="hidden sm:inline-block px-2 py-2 hover:text-blue-400 transition-colors duration-200"
          >
            Home
          </Link>

          {/* PRODUCTS */}
          <Link
            to="/products"
            className="hidden sm:inline-block px-2 py-2 hover:text-blue-400 transition-colors duration-200"
          >
            Products
          </Link>

          {/* WISHLIST */}
          <Link
            to="/wishlist"
            className="relative flex items-center justify-center w-10 h-10 rounded-lg hover:bg-white/10 hover:text-red-400 transition-all duration-200"
            title="Wishlist"
            aria-label="Wishlist"
          >
            <FaHeart />

            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full min-w-5 h-5 px-1 flex items-center justify-center shadow-sm">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* CART */}
          <Link
            to="/cart"
            className="relative flex items-center justify-center w-10 h-10 rounded-lg hover:bg-white/10 hover:text-green-400 transition-all duration-200"
            title="Cart"
            aria-label="Cart"
          >
            <FaShoppingCart />

            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-green-500 text-white text-[10px] font-bold rounded-full min-w-5 h-5 px-1 flex items-center justify-center shadow-sm">
                {cartCount}
              </span>
            )}
          </Link>

          {/* ================= USER ================= */}
          {currentUser ? (
            <div className="flex items-center gap-2 sm:gap-3">

              {/* WELCOME */}
              <span className="hidden xl:inline text-sm text-gray-400">
                Welcome,{" "}
                <span className="font-semibold text-white">
                  {currentUser.name}
                </span>
              </span>

              {/* MY ORDERS */}
              <Link
                to="/orders"
                className="hidden lg:inline-block px-2 py-2 hover:text-blue-400 transition-colors duration-200"
              >
                My Orders
              </Link>

              {/* ADMIN ORDERS */}
              {currentUser?.role === "admin" && (
                <Link
                  to="/admin/orders"
                  className="hidden lg:inline-block px-2 py-2 text-yellow-400 hover:text-yellow-300 transition-colors duration-200 font-semibold"
                >
                  Admin Orders
                </Link>
              )}

              {/* PROFILE */}
              <Link
                to="/profile"
                className="flex items-center gap-2 h-10 px-2 sm:px-3 rounded-lg hover:bg-white/10 hover:text-blue-400 transition-all duration-200"
                title="Profile"
                aria-label="Profile"
              >
                <FaUser />

                <span className="hidden lg:inline">
                  {currentUser.name}
                </span>
              </Link>

              {/* LOGOUT */}
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 h-10 bg-red-500 hover:bg-red-600 px-3 sm:px-4 rounded-lg font-semibold transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <FaSignOutAlt />

                <span className="hidden sm:inline">
                  Logout
                </span>
              </button>
            </div>
          ) : (
            /* ================= LOGIN ================= */
            <Link
              to="/login"
              className="flex items-center gap-2 h-10 bg-blue-600 hover:bg-blue-700 px-3 sm:px-4 rounded-lg font-semibold transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <FaUser />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  </nav>
);
}

export default Navbar;