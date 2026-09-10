import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function OrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const savedUser =
      JSON.parse(localStorage.getItem("currentUser")) || null;

    const savedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    setCurrentUser(savedUser);

    if (!savedUser) {
      return;
    }

    const foundOrder = savedOrders.find(
      (item) =>
        String(item.orderId) === String(orderId) &&
        String(item.userId) === String(savedUser.id)
    );

    setOrder(foundOrder || null);
  }, [orderId]);

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getPaymentMethod = (method) => {
    if (method === "cod") return "Cash on Delivery";
    if (method === "upi") return "UPI";
    if (method === "card") return "Credit / Debit Card";

    return method || "Unknown";
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Processing":
        return "bg-yellow-100 text-yellow-700";

      case "Shipped":
        return "bg-blue-100 text-blue-700";

      case "Out for Delivery":
        return "bg-purple-100 text-purple-700";

      case "Delivered":
        return "bg-green-100 text-green-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // ================= LOGIN REQUIRED =================

  if (!currentUser) {
    return (
      <main className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold">
              Order Details
            </h1>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-6 py-20">
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <div className="text-6xl mb-6">
              🔐
            </div>

            <h2 className="text-3xl font-bold text-gray-800">
              Login Required
            </h2>

            <p className="text-gray-500 mt-3">
              Please login to view your order.
            </p>

            <button
              onClick={() => navigate("/login")}
              className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              Login
            </button>
          </div>
        </section>
      </main>
    );
  }

  // ================= ORDER NOT FOUND =================

  if (!order) {
    return (
      <main className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold">
              Order Details
            </h1>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-6 py-20">
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <div className="text-6xl mb-6">
              📦
            </div>

            <h2 className="text-3xl font-bold text-gray-800">
              Order Not Found
            </h2>

            <p className="text-gray-500 mt-3">
              We couldn't find this order.
            </p>

            <Link
              to="/orders"
              className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              Back to Orders
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">

      {/* ================= HEADER ================= */}

      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">

          <h1 className="text-4xl font-bold">
            Order Details
          </h1>

          <p className="mt-2 text-white/80">
            Order #{order.orderId}
          </p>

        </div>
      </section>

      {/* ================= CONTENT ================= */}

      <section className="max-w-5xl mx-auto px-6 py-10">

        {/* ORDER INFORMATION */}

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

            <div>
              <p className="text-sm text-gray-500">
                Order ID
              </p>

              <h2 className="text-xl font-bold text-gray-800">
                {order.orderId}
              </h2>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Order Date
              </p>

              <p className="font-semibold text-gray-800">
                {formatDate(order.createdAt)}
              </p>
            </div>

            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusStyle(
                order.status
              )}`}
            >
              {order.status}
            </span>

          </div>

        </div>

        {/* ================= PRODUCTS ================= */}

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">

          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Ordered Items
          </h2>

          <div className="space-y-5">

            {order.items?.map((item, index) => (

              <div
                key={`${item.id}-${index}`}
                className="flex items-center gap-4 border-b pb-5 last:border-b-0 last:pb-0"
              >

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 rounded-xl object-cover bg-gray-100"
                />

                <div className="flex-1">

                  <h3 className="font-semibold text-gray-800">
                    {item.name}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Quantity: {Number(item.quantity) || 1}
                  </p>

                  <p className="text-sm text-gray-500">
                    ₹{Number(item.price).toLocaleString()} each
                  </p>

                </div>

                <p className="font-bold text-gray-800">
                  ₹
                  {(
                    Number(item.price) *
                    (Number(item.quantity) || 1)
                  ).toLocaleString()}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* ================= SHIPPING ADDRESS ================= */}

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">

          <h2 className="text-xl font-bold text-gray-800 mb-5">
            Shipping Address
          </h2>

          <div className="text-gray-600 space-y-1">

            <p className="font-semibold text-gray-800">
              {order.customer?.fullName}
            </p>

            <p>
              {order.customer?.address}
            </p>

            <p>
              {order.customer?.city},{" "}
              {order.customer?.state} -{" "}
              {order.customer?.pincode}
            </p>

            <p>
              Phone: {order.customer?.phone}
            </p>

            <p>
              Email: {order.customer?.email}
            </p>

          </div>

        </div>

        {/* ================= PAYMENT ================= */}

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">

          <h2 className="text-xl font-bold text-gray-800 mb-5">
            Payment Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            <div>
              <p className="text-sm text-gray-500">
                Payment Method
              </p>

              <p className="font-semibold text-gray-800 mt-1">
                {getPaymentMethod(order.paymentMethod)}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Payment Status
              </p>

              <p className="font-semibold text-gray-800 mt-1">
                {order.paymentStatus || "Pending"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Total
              </p>

              <p className="text-xl font-bold text-blue-600 mt-1">
                ₹{Number(order.total).toLocaleString()}
              </p>
            </div>

          </div>

        </div>

        {/* ================= PRICE BREAKDOWN ================= */}

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">

          <h2 className="text-xl font-bold text-gray-800 mb-5">
            Price Breakdown
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>

              <span>
                ₹{Number(order.subtotal).toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Delivery</span>

              <span>
                {Number(order.deliveryCharge) === 0
                  ? "FREE"
                  : `₹${Number(
                      order.deliveryCharge
                    ).toLocaleString()}`}
              </span>
            </div>

            <div className="border-t pt-4 flex justify-between">

              <span className="text-lg font-bold text-gray-800">
                Total
              </span>

              <span className="text-2xl font-bold text-blue-600">
                ₹{Number(order.total).toLocaleString()}
              </span>

            </div>

          </div>

        </div>

        {/* ================= ACTIONS ================= */}

        <div className="flex flex-wrap gap-4">

          <Link
            to="/orders"
            className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            ← Back to Orders
          </Link>

          <button
            type="button"
            onClick={() =>
              navigate(`/order-tracking/${order.orderId}`)
            }
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Track Order
          </button>

        </div>

      </section>

    </main>
  );
}

export default OrderDetails;