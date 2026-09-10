import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Orders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // ================= CANCEL MODAL =================
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  // ================= LOAD ORDERS =================
  const loadOrders = () => {
    const savedUser =
      JSON.parse(localStorage.getItem("currentUser")) || null;

    setCurrentUser(savedUser);

    if (!savedUser) {
      setOrders([]);
      return;
    }

    const savedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    // Only show orders belonging to logged-in user
    const userOrders = savedOrders.filter(
      (order) => String(order.userId) === String(savedUser.id)
    );

    setOrders(userOrders);
  };

  // ================= INITIAL LOAD =================
  useEffect(() => {
    loadOrders();

    window.addEventListener("userUpdated", loadOrders);
    window.addEventListener("ordersUpdated", loadOrders);
    window.addEventListener("storage", loadOrders);

    return () => {
      window.removeEventListener("userUpdated", loadOrders);
      window.removeEventListener("ordersUpdated", loadOrders);
      window.removeEventListener("storage", loadOrders);
    };
  }, []);

  // ================= DATE =================
  const formatDate = (date) => {
    if (!date) return "Unknown date";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // ================= PAYMENT =================
  const getPaymentMethod = (method) => {
    if (method === "cod") {
      return "Cash on Delivery";
    }

    if (method === "upi") {
      return "UPI";
    }

    if (method === "card") {
      return "Credit / Debit Card";
    }

    return method || "Unknown";
  };

  // ================= STATUS STYLE =================
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

  // ================= OPEN CANCEL MODAL =================
  const openCancelModal = (orderId) => {
    setSelectedOrderId(orderId);
    setShowCancelModal(true);
  };

  // ================= CLOSE CANCEL MODAL =================
  const closeCancelModal = () => {
    setShowCancelModal(false);
    setSelectedOrderId(null);
  };

  // ================= CANCEL ORDER =================
  const cancelOrder = () => {
    if (!selectedOrderId) {
      return;
    }

    const savedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    const updatedOrders = savedOrders.map((order) => {
      if (order.orderId !== selectedOrderId) {
        return order;
      }

      return {
        ...order,
        status: "Cancelled",
        canCancel: false,
        cancelledAt: new Date().toISOString(),
        tracking: {
          ...(order.tracking || {}),
          cancelled: new Date().toISOString(),
        },
      };
    });

    localStorage.setItem(
      "orders",
      JSON.stringify(updatedOrders)
    );

    // Update currently displayed orders
    loadOrders();

    // Notify other components
    window.dispatchEvent(
      new Event("ordersUpdated")
    );

    // Close modal
    closeCancelModal();

    // Success message
    toast.success("Order cancelled successfully.");
  };

  // ================= LOGIN REQUIRED =================
  if (!currentUser) {
    return (
      <main className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold">
              My Orders
            </h1>

            <p className="mt-2 text-white/80">
              Track and manage your orders.
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
              Please login to view your orders.
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

  // ================= EMPTY ORDERS =================
  if (orders.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold">
              My Orders
            </h1>

            <p className="mt-2 text-white/80">
              Track and manage your orders.
            </p>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-6 py-20">
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <div className="text-6xl mb-6">
              📦
            </div>

            <h2 className="text-3xl font-bold text-gray-800">
              No Orders Yet
            </h2>

            <p className="text-gray-500 mt-3">
              You haven't placed any orders yet.
            </p>

            <Link
              to="/products"
              className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              Start Shopping
            </Link>
          </div>
        </section>
      </main>
    );
  }

  // ================= ORDERS PAGE =================
  return (
    <main className="min-h-screen bg-gray-50">

      {/* ================= HEADER ================= */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold">
            My Orders
          </h1>

          <p className="mt-2 text-white/80">
            Welcome, {currentUser.name}. Track and manage your orders.
          </p>
        </div>
      </section>

      {/* ================= ORDERS ================= */}
      <section className="max-w-5xl mx-auto px-6 py-10">
        <div className="space-y-6">

          {orders.map((order) => (
            <div
              key={order.orderId}
              className="bg-white rounded-2xl shadow-sm overflow-hidden"
            >

              {/* ================= ORDER HEADER ================= */}
              <div className="p-6 border-b">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                  <div>
                    <p className="text-sm text-gray-500">
                      Order ID
                    </p>

                    <h2 className="font-bold text-lg text-gray-800">
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

              {/* ================= ITEMS ================= */}
              <div className="p-6">
                <div className="space-y-4">

                  {order.items?.map((item, index) => (
                    <div
                      key={`${item.id}-${index}`}
                      className="flex items-center gap-4"
                    >

                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 rounded-xl object-cover bg-gray-100"
                      />

                      <div className="flex-1">

                        <h3 className="font-semibold text-gray-800">
                          {item.name}
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                          Quantity:{" "}
                          {Number(item.quantity) || 1}
                        </p>

                        <p className="text-sm text-gray-500">
                          ₹
                          {Number(
                            item.price
                          ).toLocaleString()}{" "}
                          each
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

              {/* ================= ORDER FOOTER ================= */}
              <div className="bg-gray-50 px-6 py-5">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                  {/* PAYMENT */}
                  <div>
                    <p className="text-sm text-gray-500">
                      Payment Method
                    </p>

                    <p className="font-semibold text-gray-800 mt-1">
                      {getPaymentMethod(
                        order.paymentMethod
                      )}
                    </p>

                    {order.paymentStatus && (
                      <p className="text-sm text-gray-500 mt-1">
                        Payment:{" "}
                        <span className="font-semibold">
                          {order.paymentStatus}
                        </span>
                      </p>
                    )}
                  </div>

                  {/* ITEMS */}
                  <div>
                    <p className="text-sm text-gray-500">
                      Items
                    </p>

                    <p className="font-semibold text-gray-800 mt-1">
                      {order.items?.reduce(
                        (total, item) =>
                          total +
                          (Number(item.quantity) || 1),
                        0
                      )}
                    </p>
                  </div>

                  {/* TOTAL */}
                  <div>
                    <p className="text-sm text-gray-500">
                      Order Total
                    </p>

                    <p className="text-xl font-bold text-blue-600 mt-1">
                      ₹
                      {Number(
                        order.total
                      ).toLocaleString()}
                    </p>
                  </div>

                </div>

                {/* ================= ACTIONS ================= */}
                <div className="flex flex-wrap gap-3 mt-6 pt-5 border-t">

                  {/* VIEW DETAILS */}
                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        `/order-details/${order.orderId}`
                      )
                    }
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold transition"
                  >
                    View Details
                  </button>

                  {/* TRACK ORDER */}
                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        `/order-tracking/${order.orderId}`
                      )
                    }
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-semibold transition"
                  >
                    Track Order
                  </button>

                  {/* CANCEL ORDER */}
                  {order.canCancel &&
                    order.status !== "Cancelled" &&
                    order.status !== "Shipped" &&
                    order.status !== "Out for Delivery" &&
                    order.status !== "Delivered" && (
                      <button
                        type="button"
                        onClick={() =>
                          openCancelModal(order.orderId)
                        }
                        className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-lg font-semibold transition"
                      >
                        Cancel Order
                      </button>
                    )}

                </div>
              </div>

            </div>
          ))}

        </div>

        {/* ================= CONTINUE SHOPPING ================= */}
        <div className="text-center mt-10">
          <Link
            to="/products"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            Continue Shopping
          </Link>
        </div>

      </section>

      {/* ================================================= */}
      {/* ================= CANCEL MODAL ================== */}
      {/* ================================================= */}

      {showCancelModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={closeCancelModal}
        >
          <div
            className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >

            {/* MODAL ICON */}
            <div className="flex justify-center mb-5">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-3xl">
                ⚠️
              </div>
            </div>

            {/* MODAL CONTENT */}
            <div className="text-center">

              <h2 className="text-2xl font-bold text-gray-800">
                Cancel Order?
              </h2>

              <p className="text-gray-500 mt-3 leading-relaxed">
                Are you sure you want to cancel this order?
                This action cannot be undone.
              </p>

            </div>

            {/* MODAL ACTIONS */}
            <div className="flex gap-3 mt-7">

              <button
                type="button"
                onClick={closeCancelModal}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-3 rounded-lg font-semibold transition"
              >
                Keep Order
              </button>

              <button
                type="button"
                onClick={cancelOrder}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-lg font-semibold transition"
              >
                Yes, Cancel
              </button>

            </div>

          </div>
        </div>
      )}

    </main>
  );
}

export default Orders;