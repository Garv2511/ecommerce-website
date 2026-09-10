import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaTrash,
  FaPlus,
  FaMinus,
  FaShoppingCart,
} from "react-icons/fa";

function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  // ================= LOAD CART =================

  useEffect(() => {
    const savedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCart(savedCart);
  }, []);

  // ================= SAVE CART =================

  const saveCart = (updatedCart) => {
  setCart(updatedCart);

  localStorage.setItem(
    "cart",
    JSON.stringify(updatedCart)
  );

  window.dispatchEvent(new Event("cartUpdated"));
};

  // ================= INCREASE QUANTITY =================

  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item
    );

    saveCart(updatedCart);
  };

  // ================= DECREASE QUANTITY =================

  const decreaseQuantity = (id) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      )
      .filter((item) => item.quantity > 0);

    saveCart(updatedCart);
  };

  // ================= REMOVE ITEM =================

  const removeItem = (id) => {
    const updatedCart = cart.filter(
      (item) => item.id !== id
    );

    saveCart(updatedCart);
  };

  // ================= CLEAR CART =================

  const clearCart = () => {
  localStorage.removeItem("cart");
  setCart([]);

  window.dispatchEvent(new Event("cartUpdated"));
};

  // ================= CALCULATIONS =================

  const subtotal = cart.reduce(
    (total, item) =>
      total + Number(item.price) * item.quantity,
    0
  );

  const deliveryCharge =
    subtotal === 0 || subtotal >= 1000 ? 0 : 50;

  const total = subtotal + deliveryCharge;

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // ================= EMPTY CART =================

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50">

        {/* ================= CART HEADER ================= */}

<section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">

  <div className="max-w-7xl mx-auto px-6 py-14">

    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

      {/* LEFT SIDE */}

      <div>

        <div className="flex items-center gap-3 mb-3">

          <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center">

            <FaShoppingCart className="text-xl" />

          </div>

          <span className="text-sm font-semibold text-white/80 uppercase tracking-wide">
            Your Shopping Cart
          </span>

        </div>

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          Shopping Cart
        </h1>

        <p className="mt-3 text-white/75">
          Review your items before checkout.
        </p>

      </div>


      {/* RIGHT SIDE — ITEM COUNT */}

      <div className="self-start sm:self-center">

        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-4 text-center">

          <p className="text-3xl font-bold">
            {totalItems}
          </p>

          <p className="text-sm text-white/75">
            {totalItems === 1 ? "Item" : "Items"} in Cart
          </p>

        </div>

      </div>

    </div>

  </div>

</section>


        {/* Empty Cart */}

        <section className="max-w-7xl mx-auto px-6 py-20">

          <div className="bg-white rounded-2xl shadow-sm py-20 px-6 text-center">

            <div className="flex justify-center mb-6">

              <div className="bg-blue-100 p-6 rounded-full">

                <FaShoppingCart className="text-blue-600 text-5xl" />

              </div>

            </div>

            <h2 className="text-3xl font-bold text-gray-800">
              Your Cart is Empty
            </h2>

            <p className="text-gray-500 mt-3">
              Looks like you haven't added anything to your cart yet.
            </p>

            <Link
              to="/products"
              className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              Continue Shopping
            </Link>

          </div>

        </section>

      </main>
    );
  }

  // ================= CART PAGE =================

  return (
    <main className="min-h-screen bg-gray-50">

      {/* ================= HEADER ================= */}

      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">

        <div className="max-w-7xl mx-auto px-6 py-12">

          <h1 className="text-4xl font-bold">
            Shopping Cart
          </h1>

          <p className="mt-2 text-white/80">
            {totalItems}{" "}
            {totalItems === 1 ? "item" : "items"} in your cart.
          </p>

        </div>

      </section>


      {/* ================= CART CONTENT ================= */}

      <section className="max-w-7xl mx-auto px-6 py-10 pb-16">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ================= CART ITEMS ================= */}

          <div className="lg:col-span-2">

           {/* ================= CART ITEMS CONTAINER ================= */}

<div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

  {/* ================= CART HEADER ================= */}

  <div className="px-6 py-5 border-b border-gray-200">

    <div className="flex items-center justify-between gap-4">

      {/* LEFT SIDE */}

      <div>

        <div className="flex items-center gap-3">

          <h2 className="text-xl font-bold text-gray-900">
            Cart Items
          </h2>

          <span className="bg-blue-50 text-blue-600 text-xs font-bold px-2.5 py-1 rounded-full">
            {totalItems}
          </span>

        </div>

        <p className="text-sm text-gray-500 mt-1">
          Review and manage the products in your cart.
        </p>

      </div>


      {/* CLEAR CART */}

      <button
        onClick={clearCart}
        className="shrink-0 text-sm font-semibold text-red-500 hover:text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg transition"
      >
        Clear Cart
      </button>

    </div>

  </div>


              {/* ================= CART ITEMS ================= */}

<div>

  {cart.map((item) => (

    <div
      key={item.id}
      className="p-6 border-b last:border-b-0 hover:bg-gray-50/70 transition duration-200"
    >

      <div className="flex flex-col sm:flex-row gap-6">

        {/* ================= PRODUCT IMAGE ================= */}

        <Link
          to={`/products/${item.id}`}
          className="shrink-0 group"
        >

          <div className="w-full sm:w-32 h-32 bg-gray-100 rounded-xl overflow-hidden border border-gray-100">

            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            />

          </div>

        </Link>


        {/* ================= PRODUCT INFORMATION ================= */}

        <div className="flex-1 min-w-0">

          {/* TOP ROW */}

          <div className="flex justify-between gap-4">

            <div className="min-w-0">

              {/* CATEGORY */}

              <p className="text-xs uppercase tracking-wide text-blue-600 font-bold">
                {item.category}
              </p>


              {/* PRODUCT NAME */}

              <Link
                to={`/products/${item.id}`}
                className="block text-lg font-bold text-gray-900 mt-1 hover:text-blue-600 transition truncate"
              >
                {item.name}
              </Link>

            </div>


            {/* REMOVE BUTTON */}

            <button
              type="button"
              onClick={() => removeItem(item.id)}
              title="Remove item"
              aria-label={`Remove ${item.name} from cart`}
              className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition"
            >

              <FaTrash className="text-sm" />

            </button>

          </div>


          {/* ================= PRICE ================= */}

          <div className="flex items-center gap-3 mt-3">

            <span className="text-xl font-bold text-blue-600">
              ₹{Number(item.price).toLocaleString("en-IN")}
            </span>

            {item.originalPrice && (

              <span className="text-sm text-gray-400 line-through">
                ₹{Number(item.originalPrice).toLocaleString("en-IN")}
              </span>

            )}

          </div>


          {/* ================= QUANTITY + ITEM TOTAL ================= */}

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mt-5">


            {/* ================= QUANTITY ================= */}

            <div>

              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Quantity
              </p>

              <div className="inline-flex items-center border border-gray-300 rounded-xl overflow-hidden bg-white shadow-sm">

                <button
                  type="button"
                  onClick={() => decreaseQuantity(item.id)}
                  aria-label={`Decrease quantity of ${item.name}`}
                  className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition"
                >
                  <FaMinus className="text-xs" />
                </button>


                <span className="w-12 h-10 flex items-center justify-center border-x border-gray-300 font-bold text-gray-800">
                  {item.quantity}
                </span>


                <button
                  type="button"
                  onClick={() => increaseQuantity(item.id)}
                  aria-label={`Increase quantity of ${item.name}`}
                  className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition"
                >
                  <FaPlus className="text-xs" />
                </button>

              </div>

            </div>


            {/* ================= ITEM TOTAL ================= */}

            <div className="sm:text-right">

              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Item Total
              </p>

              <p className="text-xl font-bold text-gray-900 mt-1">
                ₹{(
                  Number(item.price) * item.quantity
                ).toLocaleString("en-IN")}
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  ))}

  </div>
</div>


            {/* ================= CONTINUE SHOPPING ================= */}

<div className="mt-6 flex items-center justify-between">

  <Link
    to="/products"
    className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition group"
  >
    <span className="text-lg group-hover:-translate-x-1 transition-transform">
      ←
    </span>

    Continue Shopping
  </Link>

  <span className="hidden sm:block text-xs text-gray-400">
    Find more products you may like
  </span>

</div>

          </div>


          {/* ================= ORDER SUMMARY ================= */}

<div>

  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden sticky top-24">

    {/* ================= SUMMARY HEADER ================= */}

    <div className="px-6 py-5 border-b border-gray-200">

      <div className="flex items-center justify-between">

        <h2 className="text-xl font-bold text-gray-900">
          Order Summary
        </h2>

        <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {totalItems} {totalItems === 1 ? "Item" : "Items"}
        </span>

      </div>

      <p className="text-sm text-gray-500 mt-1">
        Review your order before checkout.
      </p>

    </div>


    {/* ================= SUMMARY CONTENT ================= */}

    <div className="p-6">

      {/* SUBTOTAL */}

      <div className="flex items-center justify-between mb-4">

        <span className="text-sm text-gray-600">
          Subtotal
        </span>

        <span className="font-semibold text-gray-900">
          ₹{subtotal.toLocaleString("en-IN")}
        </span>

      </div>


      {/* DELIVERY */}

      <div className="flex items-center justify-between">

        <span className="text-sm text-gray-600">
          Delivery
        </span>

        {deliveryCharge === 0 ? (

          <span className="text-sm font-bold text-green-600">
            FREE
          </span>

        ) : (

          <span className="font-semibold text-gray-900">
            ₹{deliveryCharge.toLocaleString("en-IN")}
          </span>

        )}

      </div>


      {/* DIVIDER */}

      <div className="border-t border-gray-200 my-5"></div>


      {/* TOTAL */}

      <div className="flex items-center justify-between">

        <div>

          <p className="text-base font-bold text-gray-900">
            Total
          </p>

          <p className="text-xs text-gray-500 mt-1">
            Including delivery
          </p>

        </div>

        <span className="text-2xl font-bold text-blue-600">
          ₹{total.toLocaleString("en-IN")}
        </span>

      </div>


      {/* ================= FREE DELIVERY MESSAGE ================= */}

      {subtotal > 0 && subtotal < 1000 && (

        <div className="mt-5 bg-blue-50 border border-blue-100 rounded-xl p-4">

          <div className="flex items-start gap-3">

            <div className="text-lg">
              🚚
            </div>

            <div>

              <p className="text-sm font-semibold text-gray-800">
                You're ₹{(1000 - subtotal).toLocaleString("en-IN")} away
              </p>

              <p className="text-xs text-gray-500 mt-1">
                Add more products to unlock
                <span className="font-semibold text-green-600">
                  {" "}FREE delivery
                </span>.
              </p>

            </div>

          </div>

        </div>

      )}


      {subtotal >= 1000 && (

        <div className="mt-5 bg-green-50 border border-green-100 rounded-xl p-4">

          <div className="flex items-center gap-3">

            <span className="text-lg">
              🎉
            </span>

            <p className="text-sm font-semibold text-green-700">
              You qualify for FREE delivery!
            </p>

          </div>

        </div>

      )}


      {/* ================= CHECKOUT BUTTON ================= */}

      <button
        type="button"
        onClick={() => navigate("/checkout")}
        className="w-full mt-6 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white py-3.5 rounded-xl font-bold shadow-sm hover:shadow-md transition duration-200"
      >
        Proceed to Checkout
      </button>


      {/* ================= SECURITY MESSAGE ================= */}

      <div className="flex items-center justify-center gap-2 mt-4">

        <span className="text-green-600 text-sm">
          🔒
        </span>

        <p className="text-xs text-gray-400">
          Secure checkout • Safe & reliable payment
        </p>

      </div>

    </div>

  </div>

</div>

        </div>

      </section>

    </main>
  );
}

export default Cart;

