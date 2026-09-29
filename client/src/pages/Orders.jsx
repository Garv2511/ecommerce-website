import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  getCurrentUser,
  getOrders,
  saveOrders,
} from "../utils/storage";
import {
  FaBoxOpen,
  FaShoppingBag,
  FaTruck,
  FaCheckCircle,
  FaClock,
  FaClipboardList,
  FaCalendarAlt,
  FaCreditCard,
  FaTimesCircle,
} from "react-icons/fa";

function Orders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // ================= CANCEL MODAL =================
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  // ================= LOAD ORDERS =================
  const loadOrders = () => {
  const savedUser = getCurrentUser();

  setCurrentUser(savedUser);

  if (!savedUser) {
    setOrders([]);
    return;
  }

  const savedOrders = getOrders();

  const userOrders = savedOrders.filter(
    (order) =>
      String(order.userId) === String(savedUser.id)
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

    const savedOrders = getOrders();

    const cancelTime = new Date().toISOString();

    const updatedOrders = savedOrders.map((order) => {
      if (order.orderId !== selectedOrderId) {
        return order;
      }

      return {
  ...order,
  status: "Cancelled",
  canCancel: false,

  paymentStatus:
    order.paymentMethod === "cod"
      ? "Not Required"
      : "Refund Pending",

  cancelledAt: cancelTime,
  tracking: {
    ...(order.tracking || {}),
    cancelled: cancelTime,
  },
};
    });

    saveOrders(updatedOrders);

    loadOrders();

    window.dispatchEvent(
      new Event("ordersUpdated")
    );

    closeCancelModal();

    toast.success("Order cancelled successfully.");
  };

  // ================= LOGIN REQUIRED =================
  if (!currentUser) {
    return (
      <main className="min-h-screen bg-gray-50">

        {/* HEADER */}
        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">

          <div className="max-w-7xl mx-auto px-6 py-12 sm:py-14">

            <div className="max-w-4xl mx-auto">

              <p className="text-sm font-semibold uppercase tracking-wider text-white/70">
                ShopEase
              </p>

              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mt-2">
                My Orders
              </h1>

              <p className="mt-3 text-white/80">
                Track and manage your orders in one place.
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
              Please login to view your orders, track deliveries,
              and manage your purchases.
            </p>

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="inline-flex items-center justify-center gap-2 mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-semibold transition shadow-sm hover:shadow-md"
            >
              <FaClipboardList />
              Login to View Orders
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

        {/* HEADER */}
        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">

          <div className="max-w-7xl mx-auto px-6 py-12 sm:py-14">

            <div className="max-w-4xl mx-auto">

              <p className="text-sm font-semibold uppercase tracking-wider text-white/70">
                ShopEase
              </p>

              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mt-2">
                My Orders
              </h1>

              <p className="mt-3 text-white/80">
                Welcome, {currentUser.name}. Track and manage your orders.
              </p>

            </div>

          </div>

        </section>

        {/* EMPTY STATE */}
        <section className="max-w-3xl mx-auto px-6 py-16 sm:py-20">

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 sm:p-12 text-center">

            <div className="w-20 h-20 mx-auto rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
              <FaShoppingBag className="text-4xl" />
            </div>

            <h2 className="text-3xl font-bold text-gray-900">
              No Orders Yet
            </h2>

            <p className="text-gray-500 mt-3 max-w-md mx-auto leading-relaxed">
              You haven't placed any orders yet.
              Start shopping and your purchases will appear here.
            </p>

            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-semibold transition shadow-sm hover:shadow-md"
            >
              <FaShoppingBag />
              Start Shopping
            </Link>

          </div>

        </section>

      </main>
    );
  }

  // ================= STATS =================

  const activeOrders = orders.filter(
    (order) =>
      order.status !== "Delivered" &&
      order.status !== "Cancelled"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  const totalItems = orders.reduce(
    (total, order) =>
      total +
      (order.items?.reduce(
        (itemTotal, item) =>
          itemTotal + (Number(item.quantity) || 1),
        0
      ) || 0),
    0
  );

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
              My Orders
            </h1>

            <p className="mt-3 text-white/80 text-base sm:text-lg">
              Welcome, {currentUser.name}. Track and manage your purchases.
            </p>

          </div>

        </div>

      </section>


      {/* ================================================= */}
      {/* CONTENT */}
      {/* ================================================= */}

      <section className="max-w-6xl mx-auto px-6 py-10 sm:py-12">

        {/* ================================================= */}
        {/* ORDER STATS */}
        {/* ================================================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

          {/* TOTAL ORDERS */}

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">

            <div className="flex items-center gap-4">

              <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <FaClipboardList />
              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Total Orders
                </p>

                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {orders.length}
                </p>

              </div>

            </div>

          </div>


          {/* ACTIVE */}

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">

            <div className="flex items-center gap-4">

              <div className="w-11 h-11 rounded-xl bg-yellow-50 text-yellow-600 flex items-center justify-center shrink-0">
                <FaClock />
              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Active Orders
                </p>

                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {activeOrders}
                </p>

              </div>

            </div>

          </div>


          {/* DELIVERED */}

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">

            <div className="flex items-center gap-4">

              <div className="w-11 h-11 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                <FaCheckCircle />
              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Delivered
                </p>

                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {deliveredOrders}
                </p>

              </div>

            </div>

          </div>


          {/* ITEMS */}

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">

            <div className="flex items-center gap-4">

              <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <FaShoppingBag />
              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Items Purchased
                </p>

                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {totalItems}
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* ================================================= */}
        {/* ORDERS */}
        {/* ================================================= */}

        <div className="space-y-6">

          {orders.map((order) => {

            const statusStyle =
              getStatusStyle(order.status);

            const itemCount =
              order.items?.reduce(
                (total, item) =>
                  total + (Number(item.quantity) || 1),
                0
              ) || 0;

            return (
              <div
                key={order.orderId}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
              >

                {/* ================================================= */}
                {/* ORDER HEADER */}
                {/* ================================================= */}

                <div className="p-5 sm:p-6 border-b border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                    {/* ORDER ID */}

                    <div className="flex items-start gap-4">

                      <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <FaClipboardList />
                      </div>

                      <div>

                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                          Order ID
                        </p>

                        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mt-1">
                          {order.orderId}
                        </h2>

                      </div>

                    </div>


                    {/* DATE */}

                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 rounded-lg bg-gray-50 text-gray-500 flex items-center justify-center">
                        <FaCalendarAlt />
                      </div>

                      <div>

                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                          Order Date
                        </p>

                        <p className="font-semibold text-gray-800 text-sm sm:text-base shrink-0">
                          {formatDate(order.createdAt)}
                        </p>

                      </div>

                    </div>


                    {/* STATUS */}

                    <div
                      className={`inline-flex items-center gap-2 self-start lg:self-center px-4 py-2 rounded-full border text-sm font-semibold ${statusStyle.badge}`}
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
                {/* ITEMS */}
                {/* ================================================= */}

                <div className="px-6 py-6 sm:px-7">

                  <div className="flex items-center justify-between mb-5">

                    <div>

                      <h3 className="text-lg font-bold text-gray-900">
                        Ordered Items
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        {itemCount} item
                        {itemCount === 1 ? "" : "s"} in this order
                      </p>

                    </div>

                    <FaShoppingBag className="text-blue-600 text-xl" />

                  </div>


                  <div className="space-y-4">

                    {order.items?.map((item, index) => {

                      const quantity =
                        Number(item.quantity) || 1;

                      const itemTotal =
                        Number(item.price) * quantity;

                      return (
                        <div
                          key={`${item.id}-${index}`}
                          className="flex items-start sm:items-center gap-3 sm:gap-4"
                        >

                          {/* IMAGE */}

                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover bg-gray-100 border border-gray-100 shrink-0"
                          />


                          {/* PRODUCT */}

                          <div className="flex-1 min-w-0">

                            {item.category && (
                              <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                                {item.category}
                              </p>
                            )}

                            <h4 className="font-bold text-gray-900 mt-1">
                              {item.name}
                            </h4>

                            <div className="flex flex-wrap gap-x-5 gap-y-1 mt-2">

                              <p className="text-sm text-gray-500">
                                Qty:{" "}
                                <span className="font-semibold text-gray-700">
                                  {quantity}
                                </span>
                              </p>

                              <p className="text-sm text-gray-500">
                                ₹{Number(item.price).toLocaleString()} each
                              </p>

                            </div>

                          </div>


                          {/* ITEM TOTAL */}

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


                {/* ================================================= */}
                {/* ORDER INFORMATION */}
                {/* ================================================= */}

                <div className="bg-gray-50 px-5 sm:px-6 py-5">

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* PAYMENT */}

                    <div>

                      <div className="flex items-center gap-3 mb-2">

                        <div className="w-9 h-9 rounded-lg bg-white border border-gray-200 text-gray-500 flex items-center justify-center">
                          <FaCreditCard className="text-sm" />
                        </div>

                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                          Payment
                        </p>

                      </div>

                      <p className="font-semibold text-gray-900">
                        {getPaymentMethod(order.paymentMethod)}
                      </p>

                      {order.paymentStatus && (
                        <p
                          className={`text-sm mt-1 font-semibold ${
                            order.paymentStatus === "Paid"
                              ? "text-green-600"
                              : "text-yellow-600"
                          }`}
                        >
                          {order.paymentStatus}
                        </p>
                      )}

                    </div>


                    {/* ITEMS */}

                    <div>

                      <div className="flex items-center gap-3 mb-2">

                        <div className="w-9 h-9 rounded-lg bg-white border border-gray-200 text-gray-500 flex items-center justify-center">
                          <FaShoppingBag className="text-sm" />
                        </div>

                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                          Items
                        </p>

                      </div>

                      <p className="font-semibold text-gray-900">
                        {itemCount} item
                        {itemCount === 1 ? "" : "s"}
                      </p>

                    </div>


                    {/* TOTAL */}

                    <div>

                      <div className="flex items-center gap-3 mb-2">

                        <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center">
                          ₹
                        </div>

                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                          Order Total
                        </p>

                      </div>

                      <p className="text-2xl font-bold text-blue-600">
                        ₹{Number(order.total).toLocaleString()}
                      </p>

                    </div>

                  </div>


                  {/* ================================================= */}
                  {/* ACTIONS */}
                  {/* ================================================= */}

                  <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-6 pt-6 border-t border-gray-200">

                    {/* VIEW DETAILS */}

                    <button
                      type="button"
                      onClick={() =>
                        navigate(
                          `/order-details/${order.orderId}`
                        )
                      }
                      className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition shadow-sm hover:shadow-md"
                    >
                      <FaClipboardList />
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
                      className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition shadow-sm hover:shadow-md"
                    >
                      <FaTruck />
                      Track Order
                    </button>


                    {/* CANCEL */}

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
                          className="inline-flex items-center justify-center gap-2 bg-white hover:bg-red-50 text-red-600 border border-red-200 hover:border-red-300 px-6 py-3 rounded-xl font-semibold transition"
                        >
                          <FaTimesCircle />
                          Cancel Order
                        </button>
                      )}

                  </div>

                </div>

              </div>
            );
          })}

        </div>


        {/* ================================================= */}
        {/* CONTINUE SHOPPING */}
        {/* ================================================= */}

        <div className="flex justify-center mt-10">

          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-8 py-3.5 rounded-xl font-semibold transition shadow-sm hover:shadow-md"
          >
            <FaShoppingBag />
            Continue Shopping
          </Link>

        </div>


        {/* ================================================= */}
        {/* TRUST MESSAGE */}
        {/* ================================================= */}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-sm text-gray-400 mt-8">

          <span>
            🔒 Secure Orders
          </span>

          <span className="hidden sm:block">
            •
          </span>

          <span>
            ✓ Easy Tracking
          </span>

          <span className="hidden sm:block">
            •
          </span>

          <span>
            🚚 Reliable Delivery
          </span>

        </div>

      </section>


      {/* ================================================= */}
      {/* CANCEL MODAL */}
      {/* ================================================= */}

      {showCancelModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
          onClick={closeCancelModal}
        >

          <div
            className="w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-2xl p-7 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >

            {/* ICON */}

            <div className="flex justify-center mb-5">

              <div className="w-16 h-16 rounded-full bg-red-50 text-red-500 border border-red-100 flex items-center justify-center">
                <FaTimesCircle className="text-4xl" />
              </div>

            </div>


            {/* CONTENT */}

            <div className="text-center">

              <p className="text-xs font-semibold uppercase tracking-wide text-red-500">
                Order Cancellation
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-2">
                Cancel Order?
              </h2>

              <p className="text-gray-500 mt-3 leading-relaxed">
                Are you sure you want to cancel this order?
                This action cannot be undone.
              </p>

            </div>


            {/* ACTIONS */}

            <div className="flex flex-col sm:flex-row gap-3 mt-7">

              <button
                type="button"
                onClick={closeCancelModal}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-3 rounded-xl font-semibold transition"
              >
                Keep Order
              </button>

              <button
                type="button"
                onClick={cancelOrder}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl font-semibold transition shadow-sm"
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