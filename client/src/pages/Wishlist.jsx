import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaHeart,
  FaShoppingCart,
  FaTrash,
  FaStar,
} from "react-icons/fa";
import toast from "react-hot-toast";
import {
  getWishlist,
  saveWishlist,
  getCart,
  saveCart,
} from "../utils/storage";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  // ================= LOAD WISHLIST =================

  useEffect(() => {
    const savedWishlist = getWishlist();

    setWishlist(savedWishlist);
  }, []);

  // ================= REMOVE ITEM =================

  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter(
  (item) => Number(item?.id) !== Number(id)
);

    setWishlist(updatedWishlist);

    saveWishlist(updatedWishlist);

    // Update Navbar wishlist count
    window.dispatchEvent(
      new Event("wishlistUpdated")
    );
  };

  // ================= ADD TO CART =================

  const addToCart = (product) => {
    const cart = getCart();

    const existingProduct = cart.find(
      (item) => item.id === product.id
    );

    if (existingProduct) {
      existingProduct.quantity =
      (Number(existingProduct.quantity) || 0) + 1;
   } else {
        cart.push({
        ...product,
        quantity: 1,
      });
    }

    saveCart(cart);

    // Update Navbar cart count
    window.dispatchEvent(
      new Event("cartUpdated")
    );

    toast.success(`${product.name} added to cart!`);
  };

  // ================= CLEAR WISHLIST =================

  const clearWishlist = () => {
    saveWishlist([]);
    setWishlist([]);

    window.dispatchEvent(
      new Event("wishlistUpdated")
    );
  };

  // ================= EMPTY WISHLIST =================

  if (wishlist.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50">

        {/* Header */}

        <section className="bg-gradient-to-r from-pink-500 to-red-500 text-white">

          <div className="max-w-7xl mx-auto px-6 py-12">

            <h1 className="text-4xl font-bold">
              My Wishlist
            </h1>

            <p className="mt-2 text-white/80">
              Save your favorite products for later.
            </p>

          </div>

        </section>


        {/* Empty Wishlist */}

        <section className="max-w-7xl mx-auto px-6 py-20">

          <div className="bg-white rounded-2xl shadow-sm py-20 px-6 text-center">

            <div className="flex justify-center mb-6">

              <div className="bg-red-100 p-6 rounded-full">

                <FaHeart className="text-red-500 text-5xl" />

              </div>

            </div>

            <h2 className="text-3xl font-bold text-gray-800">
              Your Wishlist is Empty
            </h2>

            <p className="text-gray-500 mt-3">
              Save products you love and find them here later.
            </p>

            <Link
              to="/products"
              className="inline-flex items-center gap-2 mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              <FaShoppingCart />
              Browse Products
            </Link>

          </div>

        </section>

      </main>
    );
  }

  // ================= WISHLIST PAGE =================

  return (
    <main className="min-h-screen bg-gray-50">

      {/* ================= HEADER ================= */}

      <section className="bg-gradient-to-r from-pink-500 to-red-500 text-white">

        <div className="max-w-7xl mx-auto px-6 py-12">

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

            <div>

              <h1 className="text-4xl font-bold">
                My Wishlist
              </h1>

              <p className="mt-2 text-white/80">
                {wishlist.length}{" "}
                {wishlist.length === 1
                  ? "product"
                  : "products"}{" "}
                saved.
              </p>

            </div>


            {/* Clear Wishlist */}

            <button
              onClick={clearWishlist}
              className="self-start sm:self-auto bg-white/10 hover:bg-white/20 border border-white/30 px-5 py-2 rounded-lg font-semibold transition"
            >
              Clear Wishlist
            </button>

          </div>

        </div>

      </section>


      {/* ================= PRODUCTS ================= */}

      <section className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

          {wishlist.map((product) => {

            const rating =
              Number(product.rating) || 0;

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition group"
              >

                {/* ================= IMAGE ================= */}

                <div className="relative">

                  <Link
                    to={`/products/${product.id}`}
                  >

                    <div className="h-64 bg-gray-100 overflow-hidden">

                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />

                    </div>

                  </Link>


                  {/* Remove */}

                  <button
                    onClick={() =>
                      removeFromWishlist(product.id)
                    }
                    title="Remove from wishlist"
                    className="absolute top-4 right-4 bg-white rounded-full p-3 shadow-md text-red-500 hover:bg-red-50 transition"
                  >
                    <FaTrash />
                  </button>


                  {/* Discount */}

                  {product.discount && (
                    <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {product.discount}% OFF
                    </span>
                  )}

                </div>


                {/* ================= PRODUCT INFO ================= */}

                <div className="p-5">

                  {/* Category */}

                  <p className="text-sm text-blue-600 font-medium">
                    {product.category}
                  </p>


                  {/* Name */}

                  <Link
                    to={`/products/${product.id}`}
                    className="block text-lg font-bold text-gray-800 hover:text-blue-600 transition mt-1"
                  >
                    {product.name}
                  </Link>


                  {/* Rating */}

                  <div className="flex items-center gap-2 mt-3">

                    <div className="flex text-yellow-400">

                      {[1, 2, 3, 4, 5].map(
                        (star) => (
                          <FaStar
                            key={star}
                            className={
                              star <=
                              Math.round(rating)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }
                          />
                        )
                      )}

                    </div>

                    <span className="text-sm text-gray-500">
                      {rating.toFixed(1)}
                    </span>

                  </div>


                  {/* Price */}

                  <div className="flex items-center gap-3 mt-4">

                    <span className="text-xl font-bold text-blue-600">
                      ₹
                      {Number(
                        product.price
                      ).toLocaleString()}
                    </span>

                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        ₹
                        {Number(
                          product.originalPrice
                        ).toLocaleString()}
                      </span>
                    )}

                  </div>


                  {/* Add To Cart */}

                  <button
                    onClick={() =>
                      addToCart(product)
                    }
                    className="w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition"
                  >
                    <FaShoppingCart />
                    Add to Cart
                  </button>

                </div>

              </div>
            );
          })}

        </div>


        {/* Continue Shopping */}

        <div className="text-center mt-10">

          <Link
            to="/products"
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            ← Continue Shopping
          </Link>

        </div>

      </section>

    </main>
  );
}

export default Wishlist;

