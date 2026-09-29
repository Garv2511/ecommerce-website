import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getCurrentUser,
  getOrders,
} from "../utils/storage";
import {
  FaBoxOpen,
  FaCalendarAlt,
  FaCheckCircle,
  FaClipboardList,
  FaCreditCard,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaShoppingBag,
  FaTruck,
  FaTimesCircle,
  FaUser,
  FaClock,
} from "react-icons/fa";

function OrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // ================= LOAD ORDER =================

  useEffect(() => {
  const loadOrder = () => {
    const savedUser = getCurrentUser();

    const savedOrders = getOrders();

    setCurrentUser(savedUser);

    if (!savedUser) {
      setOrder(null);
      return;
    }

    const foundOrder = savedOrders.find(
      (item) =>
        String(item.orderId) === String(orderId) &&
        String(item.userId) === String(savedUser.id)
    );

    setOrder(foundOrder || null);
  };

  loadOrder();

  window.addEventListener("ordersUpdated", loadOrder);
  window.addEventListener("userUpdated", loadOrder);
  window.addEventListener("storage", loadOrder);

  return () => {
    window.removeEventListener("ordersUpdated", loadOrder);
    window.removeEventListener("userUpdated", loadOrder);
    window.removeEventListener("storage", loadOrder);
  };
}, [orderId]);

  // ================= DATE =================

const formatDate = (date) => {
  if (!date) return "N/A";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "N/A";
  }

  return parsedDate.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

  // ================= PAYMENT =================

  const getPaymentMethod = (method) => {
    if (method === "cod") return "Cash on Delivery";
    if (method === "upi") return "UPI";
    if (method === "card") return "Credit / Debit Card";

    return method || "Unknown";
  };

  // ================= STATUS =================

  const getStatusStyle = (status) => {
    switch (status) {
      case "Processing":
        return {
          badge: "bg-yellow-50 text-yellow-700 border-yellow-200",
          dot: "bg-yellow-500",
          icon: <FaClock />,
        };

      case "Shipped":
        return {
          badge: "bg-blue-50 text-blue-700 border-blue-200",
          dot: "bg-blue-500",
          icon: <FaTruck />,
        };

      case "Out for Delivery":
        return {
          badge: "bg-purple-50 text-purple-700 border-purple-200",
          dot: "bg-purple-500",
          icon: <FaTruck />,
        };

      case "Delivered":
        return {
          badge: "bg-green-50 text-green-700 border-green-200",
          dot: "bg-green-500",
          icon: <FaCheckCircle />,
        };

      case "Cancelled":
        return {
          badge: "bg-red-50 text-red-700 border-red-200",
          dot: "bg-red-500",
          icon: <FaTimesCircle />,
        };

      default:
        return {
          badge: "bg-gray-50 text-gray-700 border-gray-200",
          dot: "bg-gray-500",
          icon: <FaBoxOpen />,
        };
    }
  };

  // ================= LOGIN REQUIRED =================

  if (!currentUser) {
    return (
      <main className="min-h-screen bg-gray-50">

        {/* HEADER */}

        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">

          <div className="max-w-7xl mx-auto px-6 py-12 sm:py-14">

            <div className="max-w-5xl mx-auto">

              <p className="text-sm font-semibold uppercase tracking-wider text-white/70">
                ShopEase
              </p>

              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mt-2">
                Order Details
              </h1>

              <p className="mt-3 text-white/80">
                View information about your order.
              </p>

            </div>

          </div>

        </section>


        {/* LOGIN CARD */}

        <section className="max-w-3xl mx-auto px-6 py-16 sm:py-20">

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 sm:p-12 text-center">

            <div className="w-20 h-20 mx-auto rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
              <FaClipboardList className="text-4xl" />
            </div>

            <h2 className="text-3xl font-bold text-gray-900">
              Login Required
            </h2>

            <p className="text-gray-500 mt-3 max-w-md mx-auto leading-relaxed">
              Please login to view your order details.
            </p>

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="inline-flex items-center justify-center gap-2 mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-semibold transition shadow-sm hover:shadow-md"
            >
              <FaUser />
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

        {/* HEADER */}

        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">

          <div className="max-w-7xl mx-auto px-6 py-12 sm:py-14">

            <div className="max-w-5xl mx-auto">

              <p className="text-sm font-semibold uppercase tracking-wider text-white/70">
                ShopEase
              </p>

              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mt-2">
                Order Details
              </h1>

              <p className="mt-3 text-white/80">
                We couldn't find the requested order.
              </p>

            </div>

          </div>

        </section>


        {/* NOT FOUND CARD */}

        <section className="max-w-3xl mx-auto px-6 py-16 sm:py-20">

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 sm:p-12 text-center">

            <div className="w-20 h-20 mx-auto rounded-full bg-red-50 text-red-500 flex items-center justify-center mb-6">
              <FaBoxOpen className="text-4xl" />
            </div>

            <h2 className="text-3xl font-bold text-gray-900">
              Order Not Found
            </h2>

            <p className="text-gray-500 mt-3 max-w-md mx-auto leading-relaxed">
              We couldn't find this order. It may have been
              removed or may no longer be available.
            </p>

            <Link
              to="/orders"
              className="inline-flex items-center justify-center gap-2 mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-semibold transition shadow-sm hover:shadow-md"
            >
              <FaClipboardList />
              Back to Orders
            </Link>

          </div>

        </section>

      </main>
    );
  }

  // ================= STATUS =================

  const statusStyle = getStatusStyle(order.status);

  const itemCount =
    order.items?.reduce(
      (total, item) =>
        total + (Number(item.quantity) || 1),
      0
    ) || 0;

  // ================= MAIN PAGE =================

  return (
    <main className="min-h-screen bg-gray-50">

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">

        <div className="max-w-7xl mx-auto px-6 py-12 sm:py-14">

          <div className="max-w-5xl mx-auto">

            <p className="text-sm font-semibold uppercase tracking-wider text-white/70">
              ShopEase
            </p>

            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mt-2">
              Order Details
            </h1>

            <p className="mt-3 text-white/80 text-base sm:text-lg">
              Review your order information and delivery details.
            </p>

          </div>

        </div>

      </section>


      {/* ================================================= */}
      {/* CONTENT */}
      {/* ================================================= */}

      <section className="max-w-6xl mx-auto px-6 py-10 sm:py-12">


        {/* ================================================= */}
        {/* ORDER OVERVIEW */}
        {/* ================================================= */}

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-7">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

            {/* ORDER ID */}

            <div className="flex items-start gap-4">

              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <FaClipboardList className="text-lg" />
              </div>

              <div>

                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Order ID
                </p>

                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
                  {order.orderId}
                </h2>

              </div>

            </div>


            {/* DATE */}

            <div className="flex items-start gap-3">

              <div className="w-10 h-10 rounded-lg bg-gray-50 text-gray-500 flex items-center justify-center">
                <FaCalendarAlt />
              </div>

              <div>

                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Order Date
                </p>

                <p className="font-semibold text-gray-800 mt-1">
                  {formatDate(order.createdAt)}
                </p>

              </div>

            </div>


            {/* STATUS */}

            <div
              className={`inline-flex items-center gap-2 self-start lg:self-center px-4 py-2.5 rounded-full border text-sm font-semibold ${statusStyle.badge}`}
            >

              <span
                className={`w-2 h-2 rounded-full ${statusStyle.dot}`}
              ></span>

              {statusStyle.icon}

              {order.status || "Processing"}

            </div>

          </div>

        </div>


        {/* ================================================= */}
        {/* CANCELLED NOTICE */}
        {/* ================================================= */}

        {order.status === "Cancelled" && (
          <div className="mt-6 bg-red-50 border border-red-200 rounded-2xl p-5 sm:p-6">

            <div className="flex items-start gap-4">

              <div className="w-11 h-11 rounded-xl bg-white text-red-500 border border-red-100 flex items-center justify-center shrink-0">
                <FaTimesCircle />
              </div>

              <div>

                <h2 className="font-bold text-red-800">
                  This order has been cancelled
                </h2>

                <p className="text-sm text-red-700 mt-1 leading-relaxed">
                  This order is no longer being processed or delivered.
                </p>

                {order.cancelledAt && (
                  <p className="text-sm text-red-600 mt-2">
                    Cancelled on:{" "}
                    <span className="font-semibold">
                      {formatDate(order.cancelledAt)}
                    </span>
                  </p>
                )}

              </div>

            </div>

          </div>
        )}


        {/* ================================================= */}
        {/* MAIN GRID */}
        {/* ================================================= */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">


          {/* ================================================= */}
          {/* LEFT CONTENT */}
          {/* ================================================= */}

          <div className="lg:col-span-2 space-y-8">


            {/* ================================================= */}
            {/* ORDERED ITEMS */}
            {/* ================================================= */}

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

              <div className="px-6 py-5 sm:px-7 border-b border-gray-100">

                <div className="flex items-center justify-between">

                  <div>

                    <h2 className="text-xl font-bold text-gray-900">
                      Ordered Items
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      {itemCount} item
                      {itemCount === 1 ? "" : "s"} in this order
                    </p>

                  </div>

                  <FaShoppingBag className="text-blue-600 text-xl" />

                </div>

              </div>


              <div className="p-6 sm:p-7">

                <div className="space-y-4">

                  {order.items?.map((item, index) => {

                    const quantity =
                      Number(item.quantity) || 1;

                    const itemTotal =
                      Number(item.price) * quantity;

                    return (
                      <div
                        key={`${item.id}-${index}`}
                        className="flex flex-col sm:flex-row gap-5 p-4 sm:p-5 rounded-xl bg-gray-50 border border-gray-100"
                      >

                        {/* IMAGE */}

                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 rounded-xl object-cover bg-white border border-gray-200 shrink-0"
                        />


                        {/* PRODUCT INFO */}

                        <div className="flex-1 min-w-0">

                          {item.category && (
                            <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                              {item.category}
                            </p>
                          )}

                          <h3 className="text-lg font-bold text-gray-900 mt-1">
                            {item.name}
                          </h3>

                          <div className="flex flex-wrap gap-x-5 gap-y-1 mt-3">

                            <p className="text-sm text-gray-500">
                              Quantity:{" "}
                              <span className="font-semibold text-gray-700">
                                {quantity}
                              </span>
                            </p>

                            <p className="text-sm text-gray-500">
                              ₹{Number(item.price).toLocaleString()} each
                            </p>

                          </div>

                        </div>


                        {/* TOTAL */}

                        <div className="sm:text-right self-start sm:self-center">

                          <p className="text-lg font-bold text-gray-900">
                            ₹{itemTotal.toLocaleString()}
                          </p>

                          <p className="text-xs text-gray-400 mt-1">
                            Item total
                          </p>

                        </div>

                      </div>
                    );
                  })}

                </div>

              </div>

            </div>


            {/* ================================================= */}
            {/* SHIPPING INFORMATION */}
            {/* ================================================= */}

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-7">

              <div className="flex items-start gap-4 mb-7">

                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <FaMapMarkerAlt />
                </div>

                <div>

                  <h2 className="text-xl font-bold text-gray-900">
                    Shipping Information
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Your order will be delivered to this address.
                  </p>

                </div>

              </div>


              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* CUSTOMER */}

                <div>

                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Customer
                  </p>

                  <div className="flex items-center gap-3 mt-3">

                    <div className="w-9 h-9 rounded-lg bg-gray-50 text-gray-500 flex items-center justify-center">
                      <FaUser className="text-sm" />
                    </div>

                    <p className="font-semibold text-gray-900">
                      {order.customer?.fullName || "N/A"}
                    </p>

                  </div>

                  <div className="mt-4 space-y-2">

                    <div className="flex items-center gap-3 text-sm text-gray-600">

                      <FaEnvelope className="text-gray-400 shrink-0" />

                      <span>
                        {order.customer?.email || "N/A"}
                      </span>

                    </div>

                    <div className="flex items-center gap-3 text-sm text-gray-600">

                      <FaPhone className="text-gray-400 shrink-0" />

                      <span>
                        {order.customer?.phone || "N/A"}
                      </span>

                    </div>

                  </div>

                </div>


                {/* ADDRESS */}

                <div>

                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Delivery Address
                  </p>

                  <div className="mt-3">

                    <p className="font-semibold text-gray-900">
                      {order.customer?.address || "N/A"}
                    </p>

                    <p className="text-gray-600 mt-1">
                      {order.customer?.city || "N/A"},{" "}
                      {order.customer?.state || "N/A"}
                    </p>

                    <p className="text-gray-600 mt-1">
                      PIN: {order.customer?.pincode || "N/A"}
                    </p>

                  </div>

                </div>

              </div>

            </div>


            {/* ================================================= */}
            {/* PAYMENT INFORMATION */}
            {/* ================================================= */}

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-7">

              <div className="flex items-start gap-4 mb-7">

                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <FaCreditCard />
                </div>

                <div>

                  <h2 className="text-xl font-bold text-gray-900">
                    Payment Information
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Payment details for this order.
                  </p>

                </div>

              </div>


              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* PAYMENT METHOD */}

                <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">

                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Payment Method
                  </p>

                  <p className="font-semibold text-gray-900 mt-2">
                    {getPaymentMethod(order.paymentMethod)}
                  </p>

                </div>


                {/* PAYMENT STATUS */}

                <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">

                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Payment Status
                  </p>

                  <p
  className={`font-semibold mt-1 ${
    order.paymentStatus === "Paid"
      ? "text-green-600"
      : order.paymentStatus === "Refund Pending"
      ? "text-orange-600"
      : order.paymentStatus === "Not Required"
      ? "text-gray-500"
      : "text-yellow-600"
  }`}
>
  {order.paymentStatus || "Pending"}
</p>

                </div>

              </div>

            </div>

          </div>


          {/* ================================================= */}
          {/* RIGHT SIDEBAR */}
          {/* ================================================= */}

          <div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 lg:sticky lg:top-24">

              <h2 className="text-xl font-bold text-gray-900">
                Order Summary
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                {itemCount} item
                {itemCount === 1 ? "" : "s"} in this order
              </p>


              {/* ITEMS */}

              <div className="flex justify-between text-gray-600 mt-7">

                <span>
                  Items
                </span>

                <span className="font-semibold text-gray-800">
                  {itemCount}
                </span>

              </div>


              {/* SUBTOTAL */}

              <div className="flex justify-between text-gray-600 mt-4">

                <span>
                  Subtotal
                </span>

                <span className="font-semibold text-gray-800">
                  ₹{Number(order.subtotal).toLocaleString()}
                </span>

              </div>


              {/* DELIVERY */}

              <div className="flex justify-between text-gray-600 mt-4">

                <span>
                  Delivery
                </span>

                <span className="font-semibold">

                  {Number(order.deliveryCharge) === 0 ? (
                    <span className="text-green-600">
                      FREE
                    </span>
                  ) : (
                    `₹${Number(
                      order.deliveryCharge
                    ).toLocaleString()}`
                  )}

                </span>

              </div>


              <div className="border-t border-gray-100 my-6"></div>


              {/* TOTAL */}

              <div className="flex justify-between items-center">

                <span className="text-lg font-bold text-gray-900">
                  Total
                </span>

                <span className="text-2xl font-bold text-blue-600">
                  ₹{Number(order.total).toLocaleString()}
                </span>

              </div>

              <div className="mt-6 space-y-3"> 

              {/* TRACK ORDER */}
              <Link
                to={`/order-tracking/${order.orderId}`}
                className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-semibold transition"
              >
              🚚 Track Order
              </Link>

              {/* BACK */}

              <Link
                to="/orders"
                className="w-full inline-flex items-center justify-center gap-2 mt-3 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3.5 rounded-xl font-semibold transition"
              >
                <FaClipboardList />
                Back to Orders
              </Link>

              </div>

            </div>

          </div>

        </div>

        {/* ================================================= */}
        {/* TRUST MESSAGE */}
        {/* ================================================= */}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-sm text-gray-400 mt-8">

          <span>
            🔒 Secure Order Information
          </span>

          <span className="hidden sm:block">
            •
          </span>

          <span>
            ✓ Easy Order Management
          </span>

          <span className="hidden sm:block">
            •
          </span>

          <span>
            🚚 Reliable Delivery
          </span>

        </div>

      </section>

    </main>
  );
}

export default OrderDetails;