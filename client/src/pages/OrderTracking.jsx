import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function OrderTracking() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // ================= LOAD ORDER =================

  const loadOrder = () => {
    const savedUser =
      JSON.parse(localStorage.getItem("currentUser")) || null;

    const savedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

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

  // ================= INITIAL LOAD + LIVE UPDATES =================

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
  
  // ================= DATE =================

  const formatDate = (date) => {
    if (!date) return null;

    return new Date(date).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // ================= STATUS =================

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

  // ================= TRACKING STEPS =================

  const trackingSteps = [
    {
      title: "Order Placed",
      description: "Your order has been placed successfully.",
      date: order?.tracking?.orderPlaced,
    },
    {
      title: "Processing",
      description: "Your order is being prepared.",
      date: order?.tracking?.processing,
    },
    {
      title: "Shipped",
      description: "Your order has been shipped.",
      date: order?.tracking?.shipped,
    },
    {
      title: "Out for Delivery",
      description: "Your order is out for delivery.",
      date: order?.tracking?.outForDelivery,
    },
    {
      title: "Delivered",
      description: "Your order has been delivered.",
      date: order?.tracking?.delivered,
    },
  ];

  // ================= LOGIN REQUIRED =================

  if (!currentUser) {
    return (
      <main className="min-h-screen bg-gray-50">

        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-6 py-12">

            <h1 className="text-4xl font-bold">
              Track Order
            </h1>

            <p className="mt-2 text-white/80">
              Track the status of your order.
            </p>

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
              Please login to track your order.
            </p>

            <button
              type="button"
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
              Track Order
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

  // ================= CANCELLED ORDER =================

  if (order.status === "Cancelled") {
    return (
      <main className="min-h-screen bg-gray-50">

        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-6 py-12">

            <h1 className="text-4xl font-bold">
              Track Order
            </h1>

            <p className="mt-2 text-white/80">
              Order #{order.orderId}
            </p>

          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-10">

          <div className="bg-white rounded-2xl shadow-sm p-8">

            <div className="text-center">

              <div className="text-6xl mb-5">
                ❌
              </div>

              <h2 className="text-3xl font-bold text-red-600">
                Order Cancelled
              </h2>

              <p className="text-gray-500 mt-3">
                This order has been cancelled.
              </p>

              {order.cancelledAt && (
                <p className="text-sm text-gray-500 mt-2">
                  Cancelled on {formatDate(order.cancelledAt)}
                </p>
              )}

            </div>

            <div className="border-t mt-8 pt-8">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>
                  <p className="text-sm text-gray-500">
                    Order ID
                  </p>

                  <p className="font-bold text-gray-800 mt-1">
                    {order.orderId}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Order Date
                  </p>

                  <p className="font-semibold text-gray-800 mt-1">
                    {formatDate(order.createdAt)}
                  </p>
                </div>

              </div>

            </div>

            <div className="flex flex-wrap gap-4 mt-8">

              <Link
                to={`/order-details/${order.orderId}`}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                View Order Details
              </Link>

              <Link
                to="/orders"
                className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                ← Back to Orders
              </Link>

            </div>

          </div>

        </section>

      </main>
    );
  }

  // ================= NORMAL TRACKING PAGE =================

  return (
    <main className="min-h-screen bg-gray-50">

      {/* HEADER */}

      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">

        <div className="max-w-7xl mx-auto px-6 py-12">

          <h1 className="text-4xl font-bold">
            Track Your Order
          </h1>

          <p className="mt-2 text-white/80">
            Order #{order.orderId}
          </p>

        </div>

      </section>

      {/* CONTENT */}

      <section className="max-w-4xl mx-auto px-6 py-10">

        {/* ORDER SUMMARY */}

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div>
              <p className="text-sm text-gray-500">
                Order ID
              </p>

              <p className="font-bold text-gray-800 mt-1">
                {order.orderId}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Order Date
              </p>

              <p className="font-semibold text-gray-800 mt-1">
                {formatDate(order.createdAt)}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Current Status
              </p>

              <p className="font-bold text-blue-600 mt-1">
                {order.status}
              </p>
            </div>

          </div>

        </div>

        {/* TRACKING */}

        <div className="bg-white rounded-2xl shadow-sm p-8">

          <h2 className="text-2xl font-bold text-gray-800 mb-8">
            Order Progress
          </h2>

          <div className="space-y-0">

            {trackingSteps.map((step, index) => {

              const completed = index <= currentStep;

              const active = index === currentStep;

              return (
                <div
                  key={step.title}
                  className="flex gap-5"
                >

                  {/* LEFT TIMELINE */}

                  <div className="flex flex-col items-center">

                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        completed
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {completed ? "✓" : index + 1}
                    </div>

                    {index !== trackingSteps.length - 1 && (
                      <div
                        className={`w-1 h-16 ${
                          index < currentStep
                            ? "bg-blue-600"
                            : "bg-gray-200"
                        }`}
                      />
                    )}

                  </div>

                  {/* STEP DETAILS */}

                  <div className="pb-8 flex-1">

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

                      <h3
                        className={`text-lg font-bold ${
                          active
                            ? "text-blue-600"
                            : completed
                            ? "text-gray-800"
                            : "text-gray-400"
                        }`}
                      >
                        {step.title}
                      </h3>

                      {step.date && (
                        <span className="text-sm text-gray-500">
                          {formatDate(step.date)}
                        </span>
                      )}

                    </div>

                    <p
                      className={`mt-1 ${
                        completed
                          ? "text-gray-600"
                          : "text-gray-400"
                      }`}
                    >
                      {step.description}
                    </p>

                  </div>

                </div>
              );
            })}

          </div>

        </div>

        {/* ACTIONS */}

        <div className="flex flex-wrap gap-4 mt-8">

          <Link
            to={`/order-details/${order.orderId}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            View Order Details
          </Link>

          <Link
            to="/orders"
            className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            ← Back to Orders
          </Link>

        </div>

      </section>

    </main>
  );
}

export default OrderTracking;