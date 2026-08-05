import { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaHeart,
  FaSearch,
  FaUser,
  FaBoxOpen,
} from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  //================= HANDLE SEARCH =================

  const handleSearch = () => {
    const query = search.trim();

    if (!query) {
      navigate("/products");
      return;
    }

    navigate(`/products?search=${encodeURIComponent(query)}`);
  };

  // ================= UPDATE COUNTS =================

  const updateCounts = () => {
    const cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const wishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    const totalCartItems = cart.reduce(
      (total, item) =>
        total + (Number(item.quantity) || 1),
      0
    );

    setCartCount(totalCartItems);
    setWishlistCount(wishlist.length);
  };

  // ================= LOAD COUNTS =================

  useEffect(() => {
    updateCounts();

    window.addEventListener(
      "storage",
      updateCounts
    );

    window.addEventListener(
      "cartUpdated",
      updateCounts
    );

    window.addEventListener(
      "wishlistUpdated",
      updateCounts
    );

    return () => {
      window.removeEventListener(
        "storage",
        updateCounts
      );

      window.removeEventListener(
        "cartUpdated",
        updateCounts
      );

      window.removeEventListener(
        "wishlistUpdated",
        updateCounts
      );
    };
  }, []);

  return (
    <nav className="bg-slate-900 text-white shadow-lg">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* ================= LOGO ================= */}

        <Link
          to="/"
          className="text-3xl font-bold text-blue-400 hover:text-blue-300"
        >
          ShopEase
        </Link>


        {/* ================= SEARCH ================= */}

        <div className="hidden md:flex items-center bg-white rounded-lg overflow-hidden w-[400px]">

          <input
  type="text"
  placeholder="Search products..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  }}
  className="flex-1 px-4 py-2 text-black outline-none"
/>

          <button onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-600 px-4 py-3">
          <FaSearch />
          </button>

        </div>


        {/* ================= NAVIGATION ================= */}

        <div className="flex items-center gap-6 text-lg">

          {/* Home */}

          <Link
            to="/"
            className="hover:text-blue-400 transition"
          >
            Home
          </Link>


          {/* Products */}

          <Link
            to="/products"
            className="hover:text-blue-400 transition"
          >
            Products
          </Link>


          {/* ================= ORDERS ================= */}

          <Link
            to="/orders"
            className="flex items-center gap-2 hover:text-blue-400 transition"
            title="My Orders"
          >
            <FaBoxOpen />
            <span className="hidden lg:inline">
              Orders
            </span>
          </Link>


          {/* ================= WISHLIST ================= */}

          <Link
            to="/wishlist"
            className="relative flex items-center justify-center w-8 h-8 hover:text-red-400 transition"
            title="Wishlist"
          >

            <FaHeart />

            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[11px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}

          </Link>


          {/* ================= CART ================= */}

          <Link
            to="/cart"
            className="relative flex items-center justify-center w-8 h-8 hover:text-green-400 transition"
            title="Cart"
          >

            <FaShoppingCart />

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[11px] font-bold rounded-full w-5 h-5 flex items-center justify-center z-10">
                {cartCount}
              </span>
            )}

          </Link>


          {/* ================= LOGIN ================= */}

          <Link
            to="/login"
            className="flex items-center gap-2 bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >

            <FaUser />

            <span>
              Login
            </span>

          </Link>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;

