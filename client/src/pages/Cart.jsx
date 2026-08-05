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

        {/* Header */}

        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">

          <div className="max-w-7xl mx-auto px-6 py-12">

            <h1 className="text-4xl font-bold">
              Shopping Cart
            </h1>

            <p className="mt-2 text-white/80">
              Review your items before checkout.
            </p>

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

      <section className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ================= CART ITEMS ================= */}

          <div className="lg:col-span-2">

            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

              {/* Cart Header */}

              <div className="flex items-center justify-between px-6 py-5 border-b">

                <h2 className="text-xl font-bold text-gray-800">
                  Cart Items
                </h2>

                <button
                  onClick={clearCart}
                  className="text-red-500 hover:text-red-700 text-sm font-semibold"
                >
                  Clear Cart
                </button>

              </div>


              {/* Items */}

              <div>

                {cart.map((item) => (

                  <div
                    key={item.id}
                    className="p-6 border-b last:border-b-0"
                  >

                    <div className="flex flex-col sm:flex-row gap-6">

                      {/* Product Image */}

                      <Link
                        to={`/products/${item.id}`}
                        className="shrink-0"
                      >

                        <div className="w-full sm:w-32 h-32 bg-gray-100 rounded-xl overflow-hidden">

                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />

                        </div>

                      </Link>


                      {/* Product Info */}

                      <div className="flex-1">

                        <div className="flex justify-between gap-4">

                          <div>

                            <p className="text-sm text-blue-600 font-medium">
                              {item.category}
                            </p>

                            <Link
                              to={`/products/${item.id}`}
                              className="text-lg font-bold text-gray-800 hover:text-blue-600 transition"
                            >
                              {item.name}
                            </Link>

                          </div>


                          {/* Remove */}

                          <button
                            onClick={() =>
                              removeItem(item.id)
                            }
                            className="text-gray-400 hover:text-red-500 transition"
                            title="Remove item"
                          >
                            <FaTrash />
                          </button>

                        </div>


                        {/* Price */}

                        <div className="mt-3">

                          <span className="text-xl font-bold text-blue-600">
                            ₹
                            {Number(
                              item.price
                            ).toLocaleString()}
                          </span>

                          {item.originalPrice && (
                            <span className="ml-3 text-sm text-gray-400 line-through">
                              ₹
                              {Number(
                                item.originalPrice
                              ).toLocaleString()}
                            </span>
                          )}

                        </div>


                        {/* Quantity + Item Total */}

                        <div className="flex flex-wrap items-center justify-between gap-4 mt-5">

                          {/* Quantity */}

                          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">

                            <button
                              onClick={() =>
                                decreaseQuantity(item.id)
                              }
                              className="px-3 py-2 hover:bg-gray-100 transition"
                            >
                              <FaMinus className="text-xs" />
                            </button>

                            <span className="px-5 py-2 border-x border-gray-300 font-semibold">
                              {item.quantity}
                            </span>

                            <button
                              onClick={() =>
                                increaseQuantity(item.id)
                              }
                              className="px-3 py-2 hover:bg-gray-100 transition"
                            >
                              <FaPlus className="text-xs" />
                            </button>

                          </div>


                          {/* Item Total */}

                          <div className="text-right">

                            <p className="text-sm text-gray-500">
                              Item Total
                            </p>

                            <p className="text-lg font-bold text-gray-800">
                              ₹
                              {(
                                Number(item.price) *
                                item.quantity
                              ).toLocaleString()}
                            </p>

                          </div>

                        </div>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            </div>


            {/* Continue Shopping */}

            <Link
              to="/products"
              className="inline-flex items-center mt-6 text-blue-600 hover:text-blue-800 font-semibold"
            >
              ← Continue Shopping
            </Link>

          </div>


          {/* ================= ORDER SUMMARY ================= */}

          <div>

            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">

              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Order Summary
              </h2>


              {/* Subtotal */}

              <div className="flex justify-between text-gray-600 mb-4">

                <span>
                  Subtotal
                </span>

                <span className="font-semibold text-gray-800">
                  ₹{subtotal.toLocaleString()}
                </span>

              </div>


              {/* Delivery */}

              <div className="flex justify-between text-gray-600 mb-4">

                <span>
                  Delivery
                </span>

                <span className="font-semibold">

                  {deliveryCharge === 0 ? (
                    <span className="text-green-600">
                      FREE
                    </span>
                  ) : (
                    `₹${deliveryCharge}`
                  )}

                </span>

              </div>


              {/* Divider */}

              <div className="border-t my-5"></div>


              {/* Total */}

              <div className="flex justify-between items-center">

                <span className="text-lg font-bold text-gray-800">
                  Total
                </span>

                <span className="text-2xl font-bold text-blue-600">
                  ₹{total.toLocaleString()}
                </span>

              </div>


              {/* Free Delivery Message */}

              {subtotal > 0 && subtotal < 1000 && (

                <p className="text-sm text-gray-500 mt-4 bg-gray-50 p-3 rounded-lg">

                  Add ₹
                  {(1000 - subtotal).toLocaleString()}
                  {" "}more to get{" "}
                  <span className="font-semibold text-green-600">
                    FREE delivery
                  </span>
                  .

                </p>

              )}


              {subtotal >= 1000 && (

                <p className="text-sm text-green-600 mt-4 bg-green-50 p-3 rounded-lg font-medium">
                  🎉 You qualify for FREE delivery!
                </p>

              )}


              {/* Checkout */}

              <button
  onClick={() => navigate("/checkout")}
  className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-bold transition">
  Proceed to Checkout
</button>


              {/* Payment Info */}

              <p className="text-xs text-gray-400 text-center mt-4">
                Secure checkout • Safe & reliable payment
              </p>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Cart;

