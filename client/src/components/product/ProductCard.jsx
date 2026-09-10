import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

function ProductCard({ product }) {
  // ================= WISHLIST STATUS =================

  const [isWishlisted, setIsWishlisted] = useState(() => {
    const wishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    return wishlist.some(
      (item) => Number(item.id) === Number(product.id)
    );
  });

  // ================= ADD TO CART =================

  const addToCart = () => {
    const cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find(
      (item) => Number(item.id) === Number(product.id)
    );

    let updatedCart;

    if (existingProduct) {
      updatedCart = cart.map((item) =>
        Number(item.id) === Number(product.id)
          ? {
              ...item,
              quantity: (Number(item.quantity) || 0) + 1,
            }
          : item
      );
    } else {
      updatedCart = [
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ];
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    window.dispatchEvent(
      new Event("cartUpdated")
    );

    toast.success(`${product.name} added to cart!`);
  };

  // ================= WISHLIST =================

  const toggleWishlist = () => {
    const wishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    const exists = wishlist.some(
      (item) => Number(item.id) === Number(product.id)
    );

    let updatedWishlist;

    if (exists) {
      updatedWishlist = wishlist.filter(
        (item) =>
          Number(item.id) !== Number(product.id)
      );

      setIsWishlisted(false);
      toast.success("Removed from wishlist");
    } else {
      updatedWishlist = [
        ...wishlist,
        product,
      ];

      setIsWishlisted(true);
      toast.success("Added to wishlist");
    }

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updatedWishlist)
    );

    window.dispatchEvent(
      new Event("wishlistUpdated")
    );
  };

  // ================= RETURN =================

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

      {/* ================= IMAGE ================= */}

      <Link
        to={`/products/${product.id}`}
        className="block"
      >
        <div className="relative h-56 bg-gray-100 overflow-hidden">

          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* IMAGE OVERLAY */}

          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* DISCOUNT */}

          {product.discount && (
            <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
              {product.discount}% OFF
            </span>
          )}
        </div>
      </Link>

      {/* ================= CONTENT ================= */}

      <div className="p-5">

        {/* CATEGORY */}

        <p className="text-xs uppercase tracking-wide text-blue-600 font-bold">
          {product.category}
        </p>

        {/* PRODUCT NAME */}

        <Link
          to={`/products/${product.id}`}
          className="block"
        >
          <h3 className="font-bold text-lg text-gray-900 mt-1 line-clamp-2 hover:text-blue-600 transition">
            {product.name}
          </h3>
        </Link>

        {/* RATING */}

        <div className="flex items-center gap-2 mt-3">

          <div className="flex items-center gap-1 text-yellow-500">
            <FaStar />
            <span className="text-sm font-semibold">
              {product.rating}
            </span>
          </div>

          <span className="text-xs text-gray-400">
            Customer rating
          </span>

        </div>

        {/* PRICE */}

        <div className="flex items-center gap-3 mt-3">

          <span className="text-xl font-extrabold text-gray-900">
            ₹{Number(product.price).toLocaleString("en-IN")}
          </span>

          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              ₹
              {Number(
                product.originalPrice
              ).toLocaleString("en-IN")}
            </span>
          )}

        </div>

        {/* ACTIONS */}

        <div className="flex items-center gap-2 mt-5">

          {/* ADD TO CART */}

          <button
            type="button"
            onClick={addToCart}
            className="flex-1 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white py-2.5 rounded-xl flex items-center justify-center gap-2 font-semibold transition-all duration-200"
          >
            <FaShoppingCart />
            Add to Cart
          </button>

          {/* WISHLIST */}

          <button
            type="button"
            onClick={toggleWishlist}
            title={
              isWishlisted
                ? "Remove from wishlist"
                : "Add to wishlist"
            }
            aria-label={
              isWishlisted
                ? `Remove ${product.name} from wishlist`
                : `Add ${product.name} to wishlist`
            }
            className={`w-11 h-11 flex items-center justify-center rounded-xl border transition-all duration-200 active:scale-95 ${
              isWishlisted
                ? "border-red-200 bg-red-50"
                : "border-gray-200 bg-white hover:bg-red-50 hover:border-red-200"
            }`}
          >
            <FaHeart
              className={
                isWishlisted
                  ? "text-red-500"
                  : "text-gray-400"
              }
            />
          </button>

        </div>

      </div>
    </div>
  );
}

export default ProductCard;

