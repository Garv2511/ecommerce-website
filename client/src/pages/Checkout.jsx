import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  getCart,
  getCurrentUser,
  getOrders,
  saveOrders,
  saveLastOrder,
  removeCart,
} from "../utils/storage";

function Checkout() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");

  // ================= LOAD DATA =================

  useEffect(() => {
  const savedCart = getCart();
  const savedUser = getCurrentUser();

  setCart(savedCart);
  setCurrentUser(savedUser);

  if (savedUser) {
    setFormData((prev) => ({
      ...prev,
      fullName: savedUser.name || "",
      email: savedUser.email || "",
      phone: savedUser.phone || "",
    }));
  }
}, []);

  // ================= FORM INPUT =================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= CALCULATIONS =================

  const subtotal = cart.reduce(
  (total, item) => {
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 1;

    return total + price * quantity;
  },
  0
);

  const deliveryCharge =
    subtotal === 0 || subtotal >= 1000 ? 0 : 50;

  const total = subtotal + deliveryCharge;

  const totalItems = cart.reduce(
    (total, item) =>
      total + (Number(item.quantity) || 1),
    0
  );

  // ================= PLACE ORDER =================

  const placeOrder = (event) => {
    event.preventDefault();

    const savedUser = getCurrentUser();

    if (!savedUser) {
      toast.error("Please login before placing an order.");
      navigate("/login");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty.");
      navigate("/products");
      return;
    }

    const orderId =
      "SE" + Date.now().toString().slice(-8);

    const paymentStatus =
      paymentMethod === "cod"
        ? "Pending"
        : "Paid";

    const now = new Date().toISOString();

    const order = {
      orderId,

      userId: savedUser.id,

      customer: {
        ...formData,
      },

      paymentMethod,

      paymentStatus,

      items: cart,

      subtotal,

      deliveryCharge,

      total,

      status: "Processing",

      canCancel: true,

      tracking: {
        orderPlaced: now,
        processing: now,
        shipped: null,
        outForDelivery: null,
        delivered: null,
      },

      createdAt: now,
    };

    // ================= SAVE ORDER =================

    const existingOrders = getOrders();

    existingOrders.unshift(order);

    saveOrders(existingOrders);
    window.dispatchEvent(new Event("ordersUpdated"));

    saveLastOrder(order);

    // ================= CLEAR CART =================

    removeCart();

window.dispatchEvent(
  new Event("cartUpdated")
);

    // ================= SUCCESS =================

    toast.success("Order placed successfully! 🎉");

    setTimeout(() => {
      navigate(`/order-success/${orderId}`);
    }, 500);
  };

  // ================= LOGIN REQUIRED =================

  if (!currentUser) {
    return (
      <main className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold">
              Checkout
            </h1>

            <p className="mt-2 text-white/80">
              Login to continue with your order.
            </p>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-6 py-20">
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <h2 className="text-3xl font-bold text-gray-800">
              Login Required
            </h2>

            <p className="text-gray-500 mt-3">
              Please login to continue to checkout.
            </p>

            <Link
              to="/login"
              className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold"
            >
              Login
            </Link>
          </div>
        </section>
      </main>
    );
  }

  // ================= EMPTY CART =================

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold">
              Checkout
            </h1>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-6 py-20">
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <h2 className="text-3xl font-bold text-gray-800">
              Your Cart is Empty
            </h2>

            <p className="text-gray-500 mt-3">
              Add some products before proceeding to checkout.
            </p>

            <Link
              to="/products"
              className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold"
            >
              Continue Shopping
            </Link>
          </div>
        </section>
      </main>
    );
  }

  // ================= CHECKOUT PAGE =================

  return (
    <main className="min-h-screen bg-gray-50">

      {/* ================= CHECKOUT HEADER ================= */}

      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">

        <div className="max-w-7xl mx-auto px-6 py-12">

          <div className="text-center">

            <p className="text-sm font-semibold uppercase tracking-wider text-white/70">
              Secure Checkout
            </p>

            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mt-2">
              Checkout
            </h1>

            <p className="mt-3 text-white/75">
              Complete your details to place your order.
            </p>

          </div>

          {/* ================= PROGRESS INDICATOR ================= */}

          <div className="max-w-3xl mx-auto mt-10">

            <div className="flex items-center justify-center">

              {/* CART */}

              <div className="flex items-center">

                <div className="w-9 h-9 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold text-sm">
                  ✓
                </div>

                <span className="ml-2 text-sm font-semibold">
                  Cart
                </span>

              </div>

              <div className="w-16 sm:w-28 h-0.5 bg-white/60 mx-3"></div>

              {/* CHECKOUT */}

              <div className="flex items-center">

                <div className="w-9 h-9 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold text-sm ring-4 ring-white/20">
                  2
                </div>

                <span className="ml-2 text-sm font-semibold">
                  Checkout
                </span>

              </div>

              <div className="w-16 sm:w-28 h-0.5 bg-white/30 mx-3"></div>

              {/* CONFIRMATION */}

              <div className="flex items-center">

                <div className="w-9 h-9 rounded-full bg-white/15 border border-white/30 text-white/70 flex items-center justify-center font-bold text-sm">
                  3
                </div>

                <span className="ml-2 text-sm font-medium text-white/60 hidden sm:block">
                  Confirmation
                </span>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ================= CONTENT ================= */}

      <section className="max-w-7xl mx-auto px-6 py-10">

        <form
          onSubmit={placeOrder}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >

          {/* ================= LEFT SIDE ================= */}

          <div className="lg:col-span-2 space-y-8">

            {/* ================= CUSTOMER INFORMATION ================= */}

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-7">

              <div className="flex items-start gap-4 mb-7">

                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <span className="text-lg font-bold">
                    1
                  </span>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Customer Information
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Enter your contact details for order updates.
                  </p>
                </div>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* FULL NAME */}

                <div>

                  <label
                    htmlFor="fullName"
                    className="block text-sm font-semibold text-gray-800 mb-2"
                  >
                    Full Name
                  </label>

                  <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                    placeholder="Enter your full name"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3.5 bg-gray-50 text-gray-900 placeholder:text-gray-400 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />

                </div>

                {/* EMAIL */}

                <div>

                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-800 mb-2"
                  >
                    Email
                  </label>

                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                    placeholder="Enter your email"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3.5 bg-gray-50 text-gray-900 placeholder:text-gray-400 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />

                </div>

                {/* PHONE */}

                <div className="md:col-span-2">

                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-gray-800 mb-2"
                  >
                    Phone Number
                  </label>

                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    autoComplete="tel"
                    pattern="[0-9]{10}"
                    placeholder="10-digit mobile number"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3.5 bg-gray-50 text-gray-900 placeholder:text-gray-400 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />

                </div>

              </div>

            </div>

            {/* ================= SHIPPING ADDRESS ================= */}

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-7">

              <div className="flex items-start gap-4 mb-7">

                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <span className="text-lg font-bold">
                    2
                  </span>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Shipping Address
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Where should we deliver your order?
                  </p>
                </div>

              </div>

              <div className="space-y-5">

                {/* ADDRESS */}

                <div>

                  <label
                    htmlFor="checkout-address"
                    className="block text-sm font-semibold text-gray-800 mb-2"
                  >
                    Address
                  </label>

                  <textarea
                    id="checkout-address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    autoComplete="street-address"
                    rows="3"
                    placeholder="House number, street, area"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3.5 bg-gray-50 text-gray-900 placeholder:text-gray-400 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 resize-none"
                  />

                </div>

                {/* CITY + STATE */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  <div>

                    <label
                      htmlFor="city"
                      className="block text-sm font-semibold text-gray-800 mb-2"
                    >
                      City
                    </label>

                    <input
                      id="city"
                      name="city"
                      type="text"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      autoComplete="address-level2"
                      placeholder="City"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3.5 bg-gray-50 text-gray-900 placeholder:text-gray-400 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />

                  </div>

                  <div>

                    <label
                      htmlFor="state"
                      className="block text-sm font-semibold text-gray-800 mb-2"
                    >
                      State
                    </label>

                    <input
                      id="state"
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      autoComplete="address-level1"
                      placeholder="State"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3.5 bg-gray-50 text-gray-900 placeholder:text-gray-400 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />

                  </div>

                </div>

                {/* PIN CODE */}

                <div>

                  <label
                    htmlFor="pincode"
                    className="block text-sm font-semibold text-gray-800 mb-2"
                  >
                    PIN Code
                  </label>

                  <input
                    id="pincode"
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    required
                    autoComplete="postal-code"
                    pattern="[0-9]{6}"
                    placeholder="6-digit PIN code"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3.5 bg-gray-50 text-gray-900 placeholder:text-gray-400 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />

                </div>

              </div>

            </div>

            {/* ================= PAYMENT METHOD ================= */}

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-7">

              <div className="flex items-start gap-4 mb-6">

                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">

                  <span className="text-lg font-bold">
                    3
                  </span>

                </div>

                <div>

                  <h2 className="text-xl font-bold text-gray-900">
                    Payment Method
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Choose how you would like to pay for your order.
                  </p>

                </div>

              </div>

              <div className="space-y-4">

                {/* COD */}

                <label
                  className={`flex items-center gap-4 border rounded-xl p-5 cursor-pointer transition ${
                    paymentMethod === "cod"
                      ? "border-blue-500 bg-blue-50 shadow-sm"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >

                  <input
                    id="cod"
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(event) =>
                      setPaymentMethod(event.target.value)
                    }
                    className="w-4 h-4 accent-blue-600"
                  />

                  <div className="flex-1">

                    <div className="flex items-center justify-between gap-3">

                      <p className="font-semibold text-gray-900">
                        Cash on Delivery
                      </p>

                      {paymentMethod === "cod" && (
                        <span className="text-xs font-semibold text-blue-600 bg-white px-2.5 py-1 rounded-full">
                          Selected
                        </span>
                      )}

                    </div>

                    <p className="text-sm text-gray-500 mt-1">
                      Pay when your order arrives at your doorstep.
                    </p>

                  </div>

                </label>

                {/* UPI */}

                <label
                  className={`flex items-center gap-4 border rounded-xl p-5 cursor-pointer transition ${
                    paymentMethod === "upi"
                      ? "border-blue-500 bg-blue-50 shadow-sm"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >

                  <input
                    id="upi"
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={paymentMethod === "upi"}
                    onChange={(event) =>
                      setPaymentMethod(event.target.value)
                    }
                    className="w-4 h-4 accent-blue-600"
                  />

                  <div className="flex-1">

                    <div className="flex items-center justify-between gap-3">

                      <p className="font-semibold text-gray-900">
                        UPI
                      </p>

                      {paymentMethod === "upi" && (
                        <span className="text-xs font-semibold text-blue-600 bg-white px-2.5 py-1 rounded-full">
                          Selected
                        </span>
                      )}

                    </div>

                    <p className="text-sm text-gray-500 mt-1">
                      Pay quickly using your preferred UPI application.
                    </p>

                  </div>

                </label>

                {/* CARD */}

                <label
                  className={`flex items-center gap-4 border rounded-xl p-5 cursor-pointer transition ${
                    paymentMethod === "card"
                      ? "border-blue-500 bg-blue-50 shadow-sm"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >

                  <input
                    id="card"
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={(event) =>
                      setPaymentMethod(event.target.value)
                    }
                    className="w-4 h-4 accent-blue-600"
                  />

                  <div className="flex-1">

                    <div className="flex items-center justify-between gap-3">

                      <p className="font-semibold text-gray-900">
                        Credit / Debit Card
                      </p>

                      {paymentMethod === "card" && (
                        <span className="text-xs font-semibold text-blue-600 bg-white px-2.5 py-1 rounded-full">
                          Selected
                        </span>
                      )}

                    </div>

                    <p className="text-sm text-gray-500 mt-1">
                      Pay securely using your credit or debit card.
                    </p>

                  </div>

                </label>

              </div>

              {/* SECURITY MESSAGE */}

              <div className="mt-6 flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">

                <span className="text-green-600">
                  🔒
                </span>

                <p className="text-sm text-gray-500">
                  Your payment information is protected with secure checkout.
                </p>

              </div>

            </div>

          </div>

          {/* ================= ORDER SUMMARY ================= */}

          <div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sticky top-24">

              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              {/* PRODUCTS */}

              <div className="space-y-4 mb-6">

                {cart.map((item, index) => (

                  <div
                    key={`${item.id}-${index}`}
                    className="flex gap-4"
                  >

                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover bg-gray-100"
                    />

                    <div className="flex-1">

                      <p className="font-semibold text-gray-800 text-sm">
                        {item.name}
                      </p>

                      <p className="text-sm text-gray-500">
                        Qty: {Number(item.quantity) || 1}
                      </p>

                    </div>

                    <p className="font-semibold text-gray-800">
                      ₹
                      {(
                        Number(item.price) *
                        (Number(item.quantity) || 1)
                      ).toLocaleString()}
                    </p>

                  </div>

                ))}

              </div>

              {/* PRICE BREAKDOWN */}

              <div className="border-t pt-5">

                <div className="flex justify-between text-gray-600 mb-4">

                  <span>
                    Items
                  </span>

                  <span>
                    {totalItems}
                  </span>

                </div>

                <div className="flex justify-between text-gray-600 mb-4">

                  <span>
                    Subtotal
                  </span>

                  <span className="font-semibold text-gray-800">
                    ₹{subtotal.toLocaleString()}
                  </span>

                </div>

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

                <div className="border-t my-5"></div>

                {/* TOTAL */}

                <div className="flex justify-between items-center">

                  <span className="text-lg font-bold text-gray-800">
                    Total
                  </span>

                  <span className="text-2xl font-bold text-blue-600">
                    ₹{total.toLocaleString()}
                  </span>

                </div>

                {/* PLACE ORDER */}

                <button
                  type="submit"
                  className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white py-3.5 rounded-xl font-bold transition shadow-sm hover:shadow-md"
                >
                  Place Order
                </button>

                {/* BACK TO CART */}

                <Link
                  to="/cart"
                  className="block text-center mt-4 text-blue-600 hover:text-blue-800 font-semibold"
                >
                  ← Back to Cart
                </Link>

                {/* SECURITY */}

                <p className="text-xs text-gray-400 text-center mt-4">
                  🔒 Secure checkout • Safe & reliable payment
                </p>

              </div>

            </div>

          </div>

        </form>

      </section>

    </main>
  );
}

export default Checkout;