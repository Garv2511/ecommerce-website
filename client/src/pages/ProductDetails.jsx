import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  FaStar,
  FaShoppingCart,
  FaHeart,
} from "react-icons/fa";

import products from "../data/products";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find(
    (item) => item.id.toString() === id
  );

  const [quantity, setQuantity] = useState(1);

  const [isWishlisted, setIsWishlisted] = useState(() => {
    const wishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    return wishlist.some((item) => item.id === Number(id));
  });

  // ================= PRODUCT NOT FOUND =================

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">

          <h1 className="text-4xl font-bold text-gray-800">
            Product Not Found
          </h1>

          <p className="text-gray-500 mt-3">
            The product you are looking for does not exist.
          </p>

          <Link
            to="/products"
            className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Back to Products
          </Link>

        </div>
      </div>
    );
  }

  // ================= QUANTITY =================

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  // ================= ADD TO CART =================

const addToCart = () => {
  const cart =
    JSON.parse(localStorage.getItem("cart")) || [];

  const existingProduct = cart.find(
    (item) => item.id === product.id
  );

  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    cart.push({
      ...product,
      quantity: quantity,
    });
  }

  // Save updated cart
  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

  // Tell Navbar that cart has changed
  window.dispatchEvent(
    new Event("cartUpdated")
  );

  alert(`${product.name} added to cart!`);
};


  // ================= BUY NOW =================

  const buyNow = () => {
    addToCart();
    navigate("/cart");
  };

  // ================= WISHLIST =================

  const toggleWishlist = () => {
    let wishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    const exists = wishlist.some(
      (item) => item.id === product.id
    );

    if (exists) {
      wishlist = wishlist.filter(
        (item) => item.id !== product.id
      );

      setIsWishlisted(false);
    } else {
      wishlist.push(product);

      setIsWishlisted(true);
    }

    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    );

    // Tell Navbar that wishlist changed
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  // ================= RATING STARS =================

  const rating = Number(product.rating) || 0;

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  // ================= RETURN =================

  return (
    <div className="bg-gray-50 min-h-screen py-12">

      <div className="max-w-7xl mx-auto px-6">

        {/* BREADCRUMB */}

        <div className="mb-8 text-sm text-gray-500">

          <Link
            to="/"
            className="hover:text-blue-600"
          >
            Home
          </Link>

          {" / "}

          <Link
            to="/products"
            className="hover:text-blue-600"
          >
            Products
          </Link>

          {" / "}

          <span className="text-gray-800">
            {product.name}
          </span>

        </div>

        {/* PRODUCT DETAILS */}

        <div className="bg-white rounded-2xl shadow-lg p-8 grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* PRODUCT IMAGE */}

          <div className="bg-gray-100 rounded-xl overflow-hidden h-[500px]">

            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />

          </div>

          {/* PRODUCT INFORMATION */}

          <div className="flex flex-col justify-center">

            {/* CATEGORY */}

            <p className="text-blue-600 font-medium mb-2">
              {product.category}
            </p>

            {/* NAME */}

            <h1 className="text-4xl font-bold text-gray-900">
              {product.name}
            </h1>

            {/* RATING */}

            <div className="flex items-center gap-3 mt-5">

              <div className="flex text-yellow-400 text-lg">

                {[1, 2, 3, 4, 5].map((star) => {

                  if (star <= fullStars) {
                    return (
                      <FaStar key={star} />
                    );
                  }

                  if (
                    star === fullStars + 1 &&
                    hasHalfStar
                  ) {
                    return (
                      <div
                        key={star}
                        className="relative"
                      >
                        <FaStar className="text-gray-300" />

                        <div
                          className="absolute top-0 left-0 overflow-hidden"
                          style={{ width: "50%" }}
                        >
                          <FaStar className="text-yellow-400" />
                        </div>
                      </div>
                    );
                  }

                  return (
                    <FaStar
                      key={star}
                      className="text-gray-300"
                    />
                  );
                })}

              </div>

              <span className="text-gray-600">
                {rating.toFixed(1)} / 5
              </span>

            </div>

            {/* PRICE */}

            <div className="flex items-center gap-4 mt-6">

              <span className="text-4xl font-bold text-blue-600">
                ₹{Number(product.price).toLocaleString()}
              </span>

              {product.originalPrice && (
                <span className="text-xl text-gray-400 line-through">
                  ₹
                  {Number(
                    product.originalPrice
                  ).toLocaleString()}
                </span>
              )}

              {product.discount && (
                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-bold">
                  {product.discount}% OFF
                </span>
              )}

            </div>

            {/* DESCRIPTION */}

            <div className="mt-8">

              <h2 className="text-xl font-bold text-gray-800 mb-3">
                Product Description
              </h2>

              <p className="text-gray-600 leading-relaxed">
                {product.description ||
                  `Experience excellent quality and performance with the ${product.name}. This product is designed to provide reliability, comfort, and great value for your money.`}
              </p>

            </div>

            {/* QUANTITY */}

            <div className="mt-8">

              <h3 className="font-semibold text-gray-800 mb-3">
                Quantity
              </h3>

              <div className="flex items-center border border-gray-300 rounded-lg w-fit overflow-hidden">

                <button
                  onClick={decreaseQuantity}
                  disabled={quantity === 1}
                  className={`px-4 py-2 text-xl transition ${
                    quantity === 1
                      ? "text-gray-300 cursor-not-allowed"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  −
                </button>

                <span className="px-6 py-2 border-x border-gray-300 font-semibold">
                  {quantity}
                </span>

                <button
                  onClick={increaseQuantity}
                  className="px-4 py-2 text-xl hover:bg-gray-100 text-gray-700 transition"
                >
                  +
                </button>

              </div>

            </div>

            {/* BUTTONS */}

            <div className="flex gap-4 mt-8">

              {/* ADD TO CART */}

              <button
                onClick={addToCart}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg flex items-center justify-center gap-2 transition"
              >
                <FaShoppingCart />
                Add to Cart
              </button>

              {/* WISHLIST */}

              <button
                onClick={toggleWishlist}
                className={`px-5 border rounded-lg transition ${
                  isWishlisted
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300 hover:bg-red-50"
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

            {/* BUY NOW */}

            <button
              onClick={buyNow}
              className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition"
            >
              Buy Now
            </button>

            {/* EXTRA INFORMATION */}

            <div className="mt-8 grid grid-cols-2 gap-4">

              <div className="bg-gray-50 rounded-lg p-4">

                <p className="text-sm text-gray-500">
                  Category
                </p>

                <p className="font-semibold text-gray-800 mt-1">
                  {product.category}
                </p>

              </div>

              <div className="bg-gray-50 rounded-lg p-4">

                <p className="text-sm text-gray-500">
                  Rating
                </p>

                <p className="font-semibold text-gray-800 mt-1">
                  ⭐ {rating.toFixed(1)}
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;
