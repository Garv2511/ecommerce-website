import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getCurrentUser,
  getOrders,
} from "../utils/storage";
import {
  FaBoxOpen,
  FaCheck,
  FaClipboardCheck,
  FaClock,
  FaTruck,
  FaShippingFast,
  FaHome,
  FaShoppingBag,
  FaTimesCircle,
  FaArrowLeft,
} from "react-icons/fa";

function OrderTracking() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // =====================================================
  // LOAD ORDER
  // =====================================================

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

  // =====================================================
  // INITIAL LOAD + LIVE UPDATES
  // =====================================================

  useEffect(() => {
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

  // =====================================================
  // DATE
  // =====================================================

  const formatDate = (date) => {
  if (!date) return null;

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  return parsedDate.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

  // =====================================================
  // STATUS
  // =====================================================

  const getCurrentStep = () => {
    if (!order) return 0;

    switch (order.status) {
      case "Processing":
        return 1;

      case "Shipped":
        return 2;

      case "Out for Delivery":
        return 3;

      case "Delivered":
        return 4;

      case "Cancelled":
        return -1;

      default:
        return 1;
    }
  };

  const currentStep = getCurrentStep();

  // =====================================================
  // STATUS MESSAGE
  // =====================================================

  const getStatusMessage = () => {
    switch (order?.status) {
      case "Processing":
        return "Your order is being prepared for shipment.";

      case "Shipped":
        return "Your order is on its way to you.";

      case "Out for Delivery":
        return "Your order is out for delivery and should arrive soon.";

      case "Delivered":
        return "Your order has been successfully delivered.";

      default:
        return "Your order is being processed.";
    }
  };

  // =====================================================
  // STATUS STYLE
  // =====================================================

  const getStatusStyle = (status) => {
    switch (status) {
      case "Processing":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";

      case "Shipped":
        return "bg-blue-50 text-blue-700 border-blue-200";

      case "Out for Delivery":
        return "bg-purple-50 text-purple-700 border-purple-200";

      case "Delivered":
        return "bg-green-50 text-green-700 border-green-200";

      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  // =====================================================
  // TRACKING STEPS
  // =====================================================

  const trackingSteps = [
    {
      title: "Order Placed",
      description:
        "Your order has been placed successfully.",
      date: order?.tracking?.orderPlaced,
      icon: FaClipboardCheck,
    },
    {
      title: "Processing",
      description:
        "Your order is being prepared.",
      date: order?.tracking?.processing,
      icon: FaClock,
    },
    {
      title: "Shipped",
      description:
        "Your order has been shipped.",
      date: order?.tracking?.shipped,
      icon: FaShippingFast,
    },
    {
      title: "Out for Delivery",
      description:
        "Your order is out for delivery.",
      date: order?.tracking?.outForDelivery,
      icon: FaTruck,
    },
    {
      title: "Delivered",
      description:
        "Your order has been delivered.",
      date: order?.tracking?.delivered,
      icon: FaHome,
    },
  ];

  // =====================================================
  // TOTAL ITEMS
  // =====================================================

  const totalItems =
    order?.items?.reduce(
      (total, item) =>
        total + (Number(item.quantity) || 1),
      0
    ) || 0;

  // =====================================================
  // LOGIN REQUIRED
  // =====================================================

  if (!currentUser) {
    return (
      <main className="min-h-screen bg-gray-50">

        {/* HEADER */}

        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">

          <div className="max-w-7xl mx-auto px-6 py-12">

            <p className="text-sm font-semibold uppercase tracking-wider text-white/70">
              ShopEase
            </p>

            <h1 className="text-4xl sm:text-5xl font-bold mt-2">
              Track Order
            </h1>

            <p className="mt-2 text-white/80">
              Track the status of your order.
            </p>

          </div>

        </section>

        {/* LOGIN CARD */}

        <section className="max-w-3xl mx-auto px-6 py-16 sm:py-20">

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-10 sm:p-12 text-center">

            <div className="w-20 h-20 mx-auto rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-6">

              <FaClipboardCheck className="text-4xl" />

            </div>

            <h2 className="text-3xl font-bold text-gray-900">
              Login Required
            </h2>

            <p className="text-gray-500 mt-3 leading-relaxed">
              Please login to track your order and view
              its delivery progress.
            </p>

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="inline-flex items-center justify-center gap-2 mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-semibold transition shadow-sm hover:shadow-md"
            >
              Login
            </button>

          </div>

        </section>

      </main>
    );
  }

  // =====================================================
  // ORDER NOT FOUND
  // =====================================================

  if (!order) {
    return (
      <main className="min-h-screen bg-gray-50">

        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">

          <div className="max-w-7xl mx-auto px-6 py-12">

            <p className="text-sm font-semibold uppercase tracking-wider text-white/70">
              ShopEase
            </p>

            <h1 className="text-4xl sm:text-5xl font-bold mt-2">
              Track Order
            </h1>

            <p className="mt-2 text-white/80">
              Order tracking information
            </p>

          </div>

        </section>

        <section className="max-w-3xl mx-auto px-6 py-16 sm:py-20">

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-10 sm:p-12 text-center">

            <div className="w-20 h-20 mx-auto rounded-full bg-red-50 text-red-500 flex items-center justify-center mb-6">

              <FaBoxOpen className="text-4xl" />

            </div>

            <h2 className="text-3xl font-bold text-gray-900">
              Order Not Found
            </h2>

            <p className="text-gray-500 mt-3 leading-relaxed">
              We couldn't find the order you're looking for.
              It may have been removed or is no longer available.
            </p>

            <Link
              to="/orders"
              className="inline-flex items-center justify-center gap-2 mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-semibold transition shadow-sm hover:shadow-md"
            >
              <FaArrowLeft />
              Back to Orders
            </Link>

          </div>

        </section>

      </main>
    );
  }

  // =====================================================
  // CANCELLED ORDER
  // =====================================================

  if (order.status === "Cancelled") {
    return (
      <main className="min-h-screen bg-gray-50">

        {/* HEADER */}

        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">

          <div className="max-w-7xl mx-auto px-6 py-12">

            <p className="text-sm font-semibold uppercase tracking-wider text-white/70">
              ShopEase
            </p>

            <h1 className="text-4xl sm:text-5xl font-bold mt-2">
              Track Your Order
            </h1>

            <p className="mt-2 text-white/80">
              Order #{order.orderId}
            </p>

          </div>

        </section>

        {/* CANCELLED CONTENT */}

        <section className="max-w-4xl mx-auto px-6 py-10 sm:py-12">

          {/* STATUS CARD */}

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

            <div className="p-8 sm:p-10 text-center">

              <div className="w-20 h-20 mx-auto rounded-full bg-red-50 text-red-500 flex items-center justify-center mb-6">

                <FaTimesCircle className="text-5xl" />

              </div>

              <p className="text-sm font-semibold uppercase tracking-wider text-red-500">
                Order Status
              </p>

              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
                Order Cancelled
              </h2>

              <p className="text-gray-500 mt-3 max-w-lg mx-auto">
                This order has been cancelled and will not be
                processed for delivery.
              </p>

              {order.cancelledAt && (
                <div className="inline-flex items-center gap-2 mt-5 px-4 py-2 rounded-full bg-red-50 border border-red-100 text-red-600 text-sm font-semibold">
                  <FaClock />
                  Cancelled on {formatDate(order.cancelledAt)}
                </div>
              )}

            </div>

            {/* ORDER INFO */}

            <div className="border-t border-gray-100 bg-gray-50 px-6 sm:px-8 py-6">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                <div>

                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Order ID
                  </p>

                  <p className="font-bold text-gray-900 mt-2">
                    {order.orderId}
                  </p>

                </div>

                <div>

                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Order Date
                  </p>

                  <p className="font-semibold text-gray-900 mt-2">
                    {formatDate(order.createdAt)}
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* ACTIONS */}

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">

            <Link
              to={`/order-details/${order.orderId}`}
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-7 py-3.5 rounded-xl font-semibold transition shadow-sm hover:shadow-md"
            >
              <FaClipboardCheck />
              View Order Details
            </Link>

            <Link
              to="/orders"
              className="inline-flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-7 py-3.5 rounded-xl font-semibold transition shadow-sm hover:shadow-md"
            >
              <FaArrowLeft />
              Back to Orders
            </Link>

          </div>

          {/* TRUST MESSAGE */}

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

  // =====================================================
  // NORMAL TRACKING PAGE
  // =====================================================

  return (
    <main className="min-h-screen bg-gray-50">

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">

        <div className="max-w-7xl mx-auto px-6 py-12 sm:py-14">

          <p className="text-sm font-semibold uppercase tracking-wider text-white/70">
            ShopEase
          </p>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mt-2">
            Track Your Order
          </h1>

          <p className="mt-2 text-white/80">
            Follow your order from placement to delivery.
          </p>

        </div>

      </section>

      {/* ================================================= */}
      {/* CONTENT */}
      {/* ================================================= */}

      <section className="max-w-5xl mx-auto px-6 py-10 sm:py-12">

        {/* ================================================= */}
        {/* CURRENT STATUS CARD */}
        {/* ================================================= */}

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-7">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

            {/* ORDER ID */}

            <div className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">

                <FaClipboardCheck className="text-xl" />

              </div>

              <div>

                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Order ID
                </p>

                <p className="text-xl font-bold text-gray-900 mt-1">
                  {order.orderId}
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  Placed on {formatDate(order.createdAt)}
                </p>

              </div>

            </div>

            {/* STATUS */}

            <div className="flex flex-col sm:flex-row sm:items-center gap-3">

              <span className="text-sm text-gray-500">
                Current Status
              </span>

              <span
                className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold ${getStatusStyle(
                  order.status
                )}`}
              >
                <span className="w-2 h-2 rounded-full bg-current"></span>
                {order.status}
              </span>

            </div>

          </div>

          {/* STATUS MESSAGE */}

          <div className="mt-6 pt-5 border-t border-gray-100 flex items-start gap-3">

            <div className="text-indigo-600 mt-0.5">
              <FaTruck />
            </div>

            <p className="text-sm text-gray-600 leading-relaxed">
              {getStatusMessage()}
            </p>

          </div>

        </div>


        {/* ================================================= */}
        {/* PROGRESS BAR */}
        {/* ================================================= */}

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 mt-8">

          <div className="flex items-center justify-between gap-4 mb-8">

            <div>

              <h2 className="text-2xl font-bold text-gray-900">
                Delivery Progress
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Stay updated with every stage of your order.
              </p>

            </div>

            <FaTruck className="text-indigo-600 text-2xl hidden sm:block" />

          </div>


          {/* ================================================= */}
          {/* TIMELINE */}
          {/* ================================================= */}

          <div>

            {trackingSteps.map((step, index) => {

              const completed = index <= currentStep;
              const active = index === currentStep;
              const isLast = index === trackingSteps.length - 1;

              const StepIcon = step.icon;

              return (
                <div
                  key={step.title}
                  className="flex gap-4 sm:gap-5"
                >

                  {/* ================================================= */}
                  {/* TIMELINE LEFT */}
                  {/* ================================================= */}

                  <div className="flex flex-col items-center">

                    {/* ICON CIRCLE */}

                    <div
                      className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition ${
                        completed
                          ? active
                            ? "bg-indigo-600 text-white ring-4 ring-indigo-100 shadow-md"
                            : "bg-green-500 text-white"
                          : "bg-gray-100 text-gray-400 border border-gray-200"
                      }`}
                    >

                      {completed ? (
                        active ? (
                          <StepIcon className="text-lg" />
                        ) : (
                          <FaCheck className="text-lg" />
                        )
                      ) : (
                        <StepIcon className="text-lg" />
                      )}

                    </div>


                    {/* CONNECTING LINE */}

                    {!isLast && (
                      <div
                        className={`w-0.5 h-20 sm:h-24 ${
                          index < currentStep
                            ? "bg-green-500"
                            : "bg-gray-200"
                        }`}
                      />
                    )}

                  </div>


                  {/* ================================================= */}
                  {/* STEP DETAILS */}
                  {/* ================================================= */}

                  <div
                    className={`flex-1 min-w-0 ${
                      isLast ? "pb-1" : "pb-8"
                    }`}
                  >

                    <div
                      className={`rounded-xl p-4 sm:p-5 border transition ${
                        active
                          ? "bg-indigo-50 border-indigo-200"
                          : completed
                          ? "bg-green-50/40 border-green-100"
                          : "bg-gray-50 border-gray-100"
                      }`}
                    >

                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">

                        <div>

                          <div className="flex items-center gap-2">

                            <h3
                              className={`text-lg font-bold ${
                                active
                                  ? "text-indigo-700"
                                  : completed
                                  ? "text-gray-900"
                                  : "text-gray-400"
                              }`}
                            >
                              {step.title}
                            </h3>

                            {active && (
                              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-700">
                                Current
                              </span>
                            )}

                          </div>

                          <p
                            className={`mt-1 text-sm leading-relaxed ${
                              completed
                                ? "text-gray-600"
                                : "text-gray-400"
                            }`}
                          >
                            {step.description}
                          </p>

                        </div>


                        {/* DATE */}

                        <div className="shrink-0">

                          {step.date ? (
                            <span
                              className={`text-xs sm:text-sm font-medium ${
                                active
                                  ? "text-indigo-600"
                                  : "text-gray-500"
                              }`}
                            >
                              {formatDate(step.date)}
                            </span>
                          ) : (
                            <span className="text-xs sm:text-sm text-gray-400">
                              Pending
                            </span>
                          )}

                        </div>

                      </div>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>

        </div>


        {/* ================================================= */}
        {/* ORDER SUMMARY */}
        {/* ================================================= */}

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-7 mt-8">

          <div className="flex items-center gap-4 mb-6">

            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">

              <FaShoppingBag className="text-lg" />

            </div>

            <div>

              <h2 className="text-xl font-bold text-gray-900">
                Order Summary
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                A quick overview of your purchase.
              </p>

            </div>

          </div>


          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

            {/* ITEMS */}

            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">

              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Items
              </p>

              <p className="text-xl font-bold text-gray-900 mt-2">
                {totalItems}
              </p>

            </div>


            {/* ORDER DATE */}

            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">

              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Order Date
              </p>

              <p className="font-semibold text-gray-900 mt-2">
                {formatDate(order.createdAt)}
              </p>

            </div>


            {/* TOTAL */}

            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">

              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Order Total
              </p>

              <p className="text-xl font-bold text-blue-600 mt-2">
                ₹{Number(order.total).toLocaleString()}
              </p>

            </div>

          </div>

        </div>


        {/* ================================================= */}
        {/* ACTIONS */}
        {/* ================================================= */}

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">

          <Link
            to={`/order-details/${order.orderId}`}
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-7 py-3.5 rounded-xl font-semibold transition shadow-sm hover:shadow-md"
          >
            <FaClipboardCheck />
            View Order Details
          </Link>

          <Link
            to="/orders"
            className="inline-flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-7 py-3.5 rounded-xl font-semibold transition shadow-sm hover:shadow-md"
          >
            <FaArrowLeft />
            Back to Orders
          </Link>

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
            ✓ Live Order Status
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

export default OrderTracking;