import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
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

  // ================= WISHLIST STATUS =================

  const [isWishlisted, setIsWishlisted] = useState(() => {
    const wishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    return wishlist.some(
      (item) => Number(item.id) === Number(id)
    );
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
      (item) => Number(item.id) === Number(product.id)
    );

    let updatedCart;

    if (existingProduct) {
      updatedCart = cart.map((item) =>
        Number(item.id) === Number(product.id)
          ? {
              ...item,
              quantity:
                (Number(item.quantity) || 0) + quantity,
            }
          : item
      );
    } else {
      updatedCart = [
        ...cart,
        {
          ...product,
          quantity,
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

  // ================= BUY NOW =================

  const buyNow = () => {
    addToCart();
    navigate("/cart");
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
      // Remove product
      updatedWishlist = wishlist.filter(
        (item) => Number(item.id) !== Number(product.id)
      );

      setIsWishlisted(false);

      toast.success("Removed from wishlist");
    } else {
      // Add product
      updatedWishlist = [
        ...wishlist,
        product,
      ];

      setIsWishlisted(true);

      toast.success("Added to wishlist");
    }

    // Save updated wishlist
    localStorage.setItem(
      "wishlist",
      JSON.stringify(updatedWishlist)
    );

    // Tell Navbar about the change
    window.dispatchEvent(
      new Event("wishlistUpdated")
    );
  };

  // ================= RATING STARS =================

  const rating = Number(product.rating) || 0;

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  // ================= RETURN =================

  return (
    <div className="bg-gray-50 min-h-screen py-12">

      <div className="max-w-7xl mx-auto px-6">

        {/* ================= BREADCRUMB ================= */}

        <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500">

          <Link
            to="/"
            className="hover:text-blue-600"
          >
            Home
          </Link>

          <span className="text-gray-300">/</span>

          <Link
            to="/products"
            className="hover:text-blue-600"
          >
            Products
          </Link>

          <span className="text-gray-300">/</span>

          <span className="text-gray-800">
            {product.name}
          </span>

        </div>

        {/* ================= PRODUCT DETAILS ================= */}

       <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 md:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">

          {/* ================= PRODUCT IMAGE ================= */}

          <div className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden h-[420px] md:h-[480px] lg:h-[520px] flex items-center justify-center">

            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />

          </div>

          {/* ================= PRODUCT INFORMATION ================= */}

          <div className="flex flex-col justify-center py-2 lg:py-4">

            {/* CATEGORY */}

            <p className="text-sm uppercase tracking-wide text-blue-600 font-bold mb-3">
              {product.category}
            </p>  

            {/* NAME */}

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
              {product.name}
            </h1>

            {/* ================= RATING ================= */}

<div className="flex items-center gap-3 mt-5">

  {/* Rating Badge */}
  <div className="inline-flex items-center gap-2 bg-yellow-50 border border-yellow-200 px-3 py-1.5 rounded-lg">

    <FaStar className="text-yellow-500 text-sm" />

    <span className="font-bold text-gray-900">
      {rating.toFixed(1)}
    </span>

  </div>

  {/* Stars */}
  <div className="flex text-yellow-400 text-sm">

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

  <span className="text-sm text-gray-500">
    Customer Rating
  </span>

</div>


{/* ================= PRICE ================= */}

<div className="mt-7">

  <div className="flex items-center flex-wrap gap-4">

    {/* Current Price */}
    <span className="text-4xl font-extrabold text-gray-900">
      ₹{Number(product.price).toLocaleString("en-IN")}
    </span>

    {/* Original Price */}
    {product.originalPrice && (
      <span className="text-lg text-gray-400 line-through">
        ₹
        {Number(
          product.originalPrice
        ).toLocaleString("en-IN")}
      </span>
    )}

    {/* Discount */}
    {product.discount && (
      <span className="bg-red-50 border border-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-bold">
        {product.discount}% OFF
      </span>
    )}

  </div>

  {/* Savings */}
  {product.originalPrice && (
    <p className="text-sm text-green-600 font-medium mt-2">
      You save ₹
      {(
        Number(product.originalPrice) -
        Number(product.price)
      ).toLocaleString("en-IN")}
    </p>
  )}

</div>

            {/* ================= DESCRIPTION ================= */}

<div className="mt-8">

  {/* Small Label */}
  <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">
    About this product
  </p>

  {/* Heading */}
  <h2 className="text-2xl font-bold text-gray-900">
    Product Description
  </h2>

  {/* Description Box */}
  <div className="mt-4 bg-gray-50 border border-gray-100 rounded-xl p-5">

    <div className="border-l-4 border-blue-600 pl-4">

      <p className="text-gray-600 leading-7 text-[15px]">
        {product.description ||
          `Experience excellent quality and performance with the ${product.name}. This product is designed to provide reliability, comfort, and great value for your money.`}
      </p>

    </div>

  </div>

</div>

            {/* ================= QUANTITY ================= */}

<div className="mt-8">

  <div className="flex items-center justify-between mb-3">

    <h3 className="font-semibold text-gray-900">
      Quantity
    </h3>

    <span className="text-sm text-gray-500">
      Select quantity
    </span>

  </div>

  <div className="inline-flex items-center bg-gray-50 border border-gray-200 rounded-xl p-1">

    {/* DECREASE */}

    <button
      type="button"
      onClick={decreaseQuantity}
      disabled={quantity === 1}
      aria-label="Decrease quantity"
      className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl font-medium transition ${
        quantity === 1
          ? "text-gray-300 cursor-not-allowed"
          : "text-gray-700 hover:bg-white hover:shadow-sm active:scale-95"
      }`}
    >
      −
    </button>

    {/* QUANTITY */}

    <span
      aria-live="polite"
      className="w-14 text-center text-lg font-bold text-gray-900"
    >
      {quantity}
    </span>

    {/* INCREASE */}

    <button
      type="button"
      onClick={increaseQuantity}
      aria-label="Increase quantity"
      className="w-10 h-10 rounded-lg flex items-center justify-center text-xl font-medium text-gray-700 hover:bg-white hover:shadow-sm active:scale-95 transition"
    >
      +
    </button>

  </div>

</div>

            {/* ================= ACTION BUTTONS ================= */}

<div className="mt-8 space-y-3">

  {/* ADD TO CART + WISHLIST */}

  <div className="flex gap-3">

    {/* ADD TO CART */}

    <button
      type="button"
      onClick={addToCart}
      className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all duration-200"
    >
      <FaShoppingCart className="text-base" />
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
          ? "Remove from wishlist"
          : "Add to wishlist"
      }
      className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-200 active:scale-[0.95] ${
        isWishlisted
          ? "border-red-200 bg-red-50 text-red-500 shadow-sm"
          : "border-gray-300 bg-white text-gray-400 hover:border-red-200 hover:bg-red-50 hover:text-red-500"
      }`}
    >
      <FaHeart
        className={`text-lg transition-transform duration-200 ${
          isWishlisted ? "scale-110" : ""
        }`}
      />
    </button>

  </div>

  {/* BUY NOW */}

  <button
    type="button"
    onClick={buyNow}
    className="w-full h-12 bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white rounded-xl font-semibold flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200"
  >
    Buy Now
  </button>

</div>

           {/* ================= EXTRA INFORMATION ================= */}

<div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">

  {/* CATEGORY CARD */}

  <div className="group rounded-xl border border-gray-200 bg-gray-50 p-5 transition-all duration-200 hover:bg-white hover:border-blue-200 hover:shadow-sm">

    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
      Category
    </p>

    <p className="mt-2 text-base font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
      {product.category}
    </p>

  </div>


  {/* RATING CARD */}

  <div className="group rounded-xl border border-gray-200 bg-gray-50 p-5 transition-all duration-200 hover:bg-white hover:border-yellow-200 hover:shadow-sm">

    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
      Customer Rating
    </p>

    <div className="flex items-center gap-2 mt-2">

      <span className="text-base font-semibold text-gray-800">
        {rating.toFixed(1)}
      </span>

      <div className="flex items-center text-yellow-400 text-sm">
        <FaStar />
      </div>

      <span className="text-sm text-gray-500">
        / 5
      </span>

    </div>

  </div>

</div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;

