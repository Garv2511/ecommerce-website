import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">

      {/* Image */}
      <Link to={`/products/${product.id}`}>
        <div className="relative h-56 bg-gray-100 overflow-hidden">

          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition duration-300"
          />

          {product.discount && (
            <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {product.discount}% OFF
            </span>
          )}

        </div>
      </Link>

      {/* Content */}
      <div className="p-5">

        <p className="text-sm text-blue-600 font-medium">
          {product.category}
        </p>

        <Link to={`/products/${product.id}`}>
          <h3 className="font-bold text-lg mt-1 hover:text-blue-600 transition">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2 text-yellow-500">

          <FaStar />

          <span className="text-gray-600 text-sm">
            {product.rating}
          </span>

        </div>

        {/* Price */}
        <div className="flex items-center gap-3 mt-3">

          <span className="text-xl font-bold text-blue-600">
            ₹{Number(product.price).toLocaleString("en-IN")}
          </span>

          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              ₹{Number(product.originalPrice).toLocaleString("en-IN")}
            </span>
          )}

        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 mt-4">

          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg flex items-center justify-center gap-2 transition">
            <FaShoppingCart />
            Add to Cart
          </button>

          <button className="border border-gray-300 hover:bg-red-50 p-2 rounded-lg text-red-500 transition">
            <FaHeart />
          </button>

        </div>

      </div>
    </div>
  );
}

export default ProductCard;