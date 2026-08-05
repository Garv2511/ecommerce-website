import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] =
    useState("cod");

  // ================= LOAD CART =================

  useEffect(() => {
    const savedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCart(savedCart);
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
    (total, item) =>
      total +
      Number(item.price) *
        (Number(item.quantity) || 1),
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

  if (cart.length === 0) {
    alert("Your cart is empty.");
    navigate("/products");
    return;
  }

  const orderId =
    "SE" + Date.now().toString().slice(-8);

  const order = {
    orderId,
    customer: formData,
    paymentMethod,
    items: cart,
    subtotal,
    deliveryCharge,
    total,
    status: "Processing",
    createdAt: new Date().toISOString(),
  };

  // ================= SAVE ALL ORDERS =================

  const existingOrders =
    JSON.parse(localStorage.getItem("orders")) || [];

  existingOrders.unshift(order);

  localStorage.setItem(
    "orders",
    JSON.stringify(existingOrders)
  );

  // Keep the latest order for Order Success page
  localStorage.setItem(
    "lastOrder",
    JSON.stringify(order)
  );

  // ================= CLEAR CART =================

  localStorage.removeItem("cart");

  // Update Navbar cart count
  window.dispatchEvent(
    new Event("cartUpdated")
  );

  // ================= GO TO SUCCESS PAGE =================

  navigate(`/order-success/${orderId}`);
};

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

      {/* ================= HEADER ================= */}

      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">

        <div className="max-w-7xl mx-auto px-6 py-12">

          <h1 className="text-4xl font-bold">
            Checkout
          </h1>

          <p className="mt-2 text-white/80">
            Complete your details to place your order.
          </p>

        </div>

      </section>


      {/* ================= CHECKOUT CONTENT ================= */}

      <section className="max-w-7xl mx-auto px-6 py-10">

        <form
          onSubmit={placeOrder}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >

          {/* ================= CUSTOMER DETAILS ================= */}

          <div className="lg:col-span-2 space-y-8">

            {/* Customer Information */}

            <div className="bg-white rounded-2xl shadow-sm p-6">

              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Customer Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* Full Name */}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>


                {/* Email */}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>


                {/* Phone */}

                <div className="md:col-span-2">

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    pattern="[0-9]{10}"
                    placeholder="10-digit mobile number"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />

                </div>

              </div>

            </div>


            {/* ================= SHIPPING ADDRESS ================= */}

            <div className="bg-white rounded-2xl shadow-sm p-6">

              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Shipping Address
              </h2>

              <div className="space-y-5">

                {/* Address */}

                <div>

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Address
                  </label>

                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    rows="3"
                    placeholder="House number, street, area"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />

                </div>


                {/* City / State */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  <div>

                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      City
                    </label>

                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      placeholder="City"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                  </div>


                  <div>

                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      State
                    </label>

                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      placeholder="State"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                  </div>

                </div>


                {/* Pincode */}

                <div>

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    PIN Code
                  </label>

                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    required
                    pattern="[0-9]{6}"
                    placeholder="6-digit PIN code"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />

                </div>

              </div>

            </div>


            {/* ================= PAYMENT ================= */}

            <div className="bg-white rounded-2xl shadow-sm p-6">

              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Payment Method
              </h2>

              <div className="space-y-4">

                {/* COD */}

                <label
                  className={`flex items-center gap-4 border rounded-xl p-4 cursor-pointer transition ${
                    paymentMethod === "cod"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300"
                  }`}
                >

                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(event) =>
                      setPaymentMethod(
                        event.target.value
                      )
                    }
                  />

                  <div>

                    <p className="font-semibold text-gray-800">
                      Cash on Delivery
                    </p>

                    <p className="text-sm text-gray-500">
                      Pay when your order arrives.
                    </p>

                  </div>

                </label>


                {/* UPI */}

                <label
                  className={`flex items-center gap-4 border rounded-xl p-4 cursor-pointer transition ${
                    paymentMethod === "upi"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300"
                  }`}
                >

                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={paymentMethod === "upi"}
                    onChange={(event) =>
                      setPaymentMethod(
                        event.target.value
                      )
                    }
                  />

                  <div>

                    <p className="font-semibold text-gray-800">
                      UPI
                    </p>

                    <p className="text-sm text-gray-500">
                      Pay using a UPI application.
                    </p>

                  </div>

                </label>


                {/* CARD */}

                <label
                  className={`flex items-center gap-4 border rounded-xl p-4 cursor-pointer transition ${
                    paymentMethod === "card"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300"
                  }`}
                >

                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={(event) =>
                      setPaymentMethod(
                        event.target.value
                      )
                    }
                  />

                  <div>

                    <p className="font-semibold text-gray-800">
                      Credit / Debit Card
                    </p>

                    <p className="text-sm text-gray-500">
                      Pay securely using your card.
                    </p>

                  </div>

                </label>

              </div>

            </div>

          </div>


          {/* ================= ORDER SUMMARY ================= */}

          <div>

            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">

              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Order Summary
              </h2>


              {/* Products */}

              <div className="space-y-4 mb-6">

                {cart.map((item) => (

                  <div
                    key={item.id}
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
                        Qty: {item.quantity}
                      </p>

                    </div>

                    <p className="font-semibold text-gray-800">
                      ₹
                      {(
                        Number(item.price) *
                        item.quantity
                      ).toLocaleString()}
                    </p>

                  </div>

                ))}

              </div>


              <div className="border-t pt-5">

                {/* Items */}

                <div className="flex justify-between text-gray-600 mb-4">

                  <span>
                    Items
                  </span>

                  <span>
                    {totalItems}
                  </span>

                </div>


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


                {/* Place Order */}

                <button
                  type="submit"
                  className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-bold transition"
                >
                  Place Order
                </button>


                <Link
                  to="/cart"
                  className="block text-center mt-4 text-blue-600 hover:text-blue-800 font-semibold"
                >
                  ← Back to Cart
                </Link>

              </div>

            </div>

          </div>

        </form>

      </section>

    </main>
  );
}

export default Checkout;

