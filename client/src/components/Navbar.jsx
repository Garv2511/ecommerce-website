import { Link } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaSearch, FaUser } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="bg-slate-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-bold text-blue-400 hover:text-blue-300"
        >
          ShopEase
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex items-center bg-white rounded-lg overflow-hidden w-[400px]">

          <input
            type="text"
            placeholder="Search products..."
            className="flex-1 px-4 py-2 text-black outline-none"
          />

          <button className="bg-blue-500 hover:bg-blue-600 px-4 py-3">
            <FaSearch />
          </button>

        </div>

        {/* Navigation */}
        <div className="flex items-center gap-6 text-lg">

          <Link to="/" className="hover:text-blue-400">
            Home
          </Link>

          <Link to="/products" className="hover:text-blue-400">
            Products
          </Link>

          <Link to="/wishlist" className="hover:text-red-400">
            <FaHeart />
          </Link>

          <Link to="/cart" className="hover:text-green-400">
            <FaShoppingCart />
          </Link>

          <Link
            to="/login"
            className="flex items-center gap-2 bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <FaUser />
            Login
          </Link>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;