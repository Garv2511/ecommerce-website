import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [deleteOrderId, setDeleteOrderId] = useState(null);

  // ================= LOAD ORDERS =================

  const loadOrders = () => {
    const savedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    setOrders(savedOrders);
  };

  useEffect(() => {
    loadOrders();

    window.addEventListener("ordersUpdated", loadOrders);
    window.addEventListener("storage", loadOrders);

    return () => {
      window.removeEventListener("ordersUpdated", loadOrders);
      window.removeEventListener("storage", loadOrders);
    };
  }, []);

  // ================= UPDATE STATUS =================

  const updateStatus = (orderId, newStatus) => {
  const savedOrders =
    JSON.parse(localStorage.getItem("orders")) || [];

  const currentOrder = savedOrders.find(
    (order) => order.orderId === orderId
  );

  if (!currentOrder) {
    return;
  }

  // ================= ALLOWED STATUS FLOW =================

  const allowedStatuses = getStatusOptions(
    currentOrder.status
  );

  // Prevent going backwards or jumping to an invalid status
  if (!allowedStatuses.includes(newStatus)) {
    toast.error("Invalid status change.");
    return;
  }

  // ================= UPDATE ORDER =================

  const now = new Date().toISOString();

  const updatedOrders = savedOrders.map((order) => {
    if (order.orderId !== orderId) {
      return order;
    }

    return {
      ...order,

      status: newStatus,

      tracking: {
        ...(order.tracking || {}),

        ...(newStatus === "Processing"
          ? { processing: order.tracking?.processing || now }
          : {}),

        ...(newStatus === "Shipped"
          ? { shipped: now }
          : {}),

        ...(newStatus === "Out for Delivery"
          ? { outForDelivery: now }
          : {}),

        ...(newStatus === "Delivered"
          ? { delivered: now }
          : {}),

        ...(newStatus === "Cancelled"
          ? { cancelled: now }
          : {}),
      },

      canCancel:
        newStatus === "Processing",
    };
  });

  // ================= SAVE =================

  localStorage.setItem(
    "orders",
    JSON.stringify(updatedOrders)
  );

  setOrders(updatedOrders);

  window.dispatchEvent(
    new Event("ordersUpdated")
  );

  toast.success(
    `Order status changed to ${newStatus}`
  );
};

  // ================= DELETE ORDER =================

  const deleteOrder = (orderId) => {
  setDeleteOrderId(orderId);
};

const confirmDeleteOrder = () => {
  if (!deleteOrderId) {
    return;
  }

  const savedOrders =
    JSON.parse(localStorage.getItem("orders")) || [];

  const updatedOrders = savedOrders.filter(
    (order) => order.orderId !== deleteOrderId
  );

  localStorage.setItem(
    "orders",
    JSON.stringify(updatedOrders)
  );

  setOrders(updatedOrders);

  window.dispatchEvent(
    new Event("ordersUpdated")
  );

  setDeleteOrderId(null);

  toast.success("Order deleted.");
};

  // ================= PAYMENT METHOD =================

  const getPaymentMethod = (method) => {
    if (method === "cod") return "Cash on Delivery";
    if (method === "upi") return "UPI";
    if (method === "card") return "Credit / Debit Card";

    return method || "Unknown";
  };

  // ================= STATUS OPTIONS =================

const getStatusOptions = (status) => {
  switch (status) {
    case "Processing":
      return ["Processing", "Shipped", "Cancelled"];

    case "Shipped":
      return ["Shipped", "Out for Delivery"];

    case "Out for Delivery":
      return ["Out for Delivery", "Delivered"];

    case "Delivered":
      return ["Delivered"];

    case "Cancelled":
      return ["Cancelled"];

    default:
      return ["Processing"];
  }
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

  // ================= EMPTY =================

  if (orders.length === 0) {
    return (
      <main className="min-h-screen bg-gray-100">

        <section className="bg-gradient-to-r from-slate-900 to-indigo-900 text-white">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold">
              Admin Orders
            </h1>

            <p className="mt-2 text-white/70">
              Manage all customer orders.
            </p>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-6 py-20">
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">

            <div className="text-6xl mb-6">
              📦
            </div>

            <h2 className="text-3xl font-bold text-gray-800">
              No Orders Found
            </h2>

            <p className="text-gray-500 mt-3">
              Customer orders will appear here after checkout.
            </p>

          </div>
        </section>

      </main>
    );
  }

  // ================= ADMIN ORDERS =================

  return (
    <main className="min-h-screen bg-gray-100">

          {/* DELETE CONFIRMATION MODAL */}
    {deleteOrderId && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-order-title"
        >
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6">

          <div className="flex items-center justify-between mb-4">
            <h2
  id="delete-order-title"
  className="text-2xl font-bold text-gray-800"
>
  Delete Order?
</h2>

            <button
              type="button"
              onClick={() => setDeleteOrderId(null)}
              className="text-gray-400 hover:text-gray-600 text-2xl"
              aria-label="Close delete confirmation"
            >
              ×
            </button>
          </div>

          <p className="text-gray-600 leading-relaxed">
            Are you sure you want to delete this order?
            This action cannot be undone.
          </p>

          <div className="flex justify-end gap-3 mt-6">

            <button
              type="button"
              onClick={() => setDeleteOrderId(null)}
              className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={confirmDeleteOrder}
              className="px-5 py-2.5 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition"
            >
              Delete Order
            </button>

          </div>
        </div>
      </div>
    )}

      {/* HEADER */}

      <section className="bg-gradient-to-r from-slate-900 to-indigo-900 text-white">

        <div className="max-w-7xl mx-auto px-6 py-12">

          <h1 className="text-4xl font-bold">
            Admin Orders
          </h1>

          <p className="mt-2 text-white/70">
            Manage customer orders and update their status.
          </p>

        </div>

      </section>

      {/* ORDERS */}

      <section className="max-w-7xl mx-auto px-6 py-10">

        <div className="space-y-6">

          {orders.map((order) => (

            <div
              key={order.orderId}
              className="bg-white rounded-2xl shadow-sm overflow-hidden"
            >

              {/* ORDER HEADER */}

              <div className="p-6 border-b">

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

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
                      Customer
                    </p>

                    <p className="font-semibold text-gray-800">
                      {order.customer?.fullName ||
                        "Unknown Customer"}
                    </p>

                    <p className="text-sm text-gray-500">
                      {order.customer?.email || ""}
                    </p>

                  </div>

                  <div>

                    <p className="text-sm text-gray-500">
                      Payment
                    </p>

                    <p className="font-semibold text-gray-800">
                      {getPaymentMethod(
                        order.paymentMethod
                      )}
                    </p>

                    <p className="text-sm text-gray-500">
                      {order.paymentStatus || ""}
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

              {/* CUSTOMER ADDRESS */}

              <div className="px-6 pt-6">

                <div className="bg-gray-50 rounded-xl p-5">

                  <h3 className="font-bold text-gray-800 mb-2">
                    Shipping Address
                  </h3>

                  <p className="text-gray-600">
                    {order.customer?.address}
                  </p>

                  <p className="text-gray-600">
                    {order.customer?.city},{" "}
                    {order.customer?.state} -{" "}
                    {order.customer?.pincode}
                  </p>

                  <p className="text-gray-600 mt-1">
                    Phone: {order.customer?.phone}
                  </p>

                </div>

              </div>

              {/* ITEMS */}

              <div className="p-6">

                <h3 className="font-bold text-gray-800 mb-4">
                  Order Items
                </h3>

                <div className="space-y-4">

                  {order.items?.map((item, index) => (

                    <div
                      key={`${item.id}-${index}`}
                      className="flex items-center gap-4 border-b pb-4"
                    >

                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover bg-gray-100"
                      />

                      <div className="flex-1">

                        <p className="font-semibold text-gray-800">
                          {item.name}
                        </p>

                        <p className="text-sm text-gray-500">
                          Quantity:{" "}
                          {Number(item.quantity) || 1}
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

              {/* FOOTER */}

              <div className="bg-gray-50 px-6 py-5">

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                  {/* TOTAL */}

                  <div>

                    <p className="text-sm text-gray-500">
                      Order Total
                    </p>

                    <p className="text-2xl font-bold text-blue-600">
                      ₹
                      {Number(
                        order.total
                      ).toLocaleString()}
                    </p>

                  </div>

                  {/* STATUS */}

                  <div>

                  <label
  htmlFor={`order-status-${order.orderId}`}
  className="block text-sm font-semibold text-gray-700 mb-2"
>
  Update Status
</label>

<select
  id={`order-status-${order.orderId}`}
  name={`order-status-${order.orderId}`}
  value={order.status}
  onChange={(event) =>
    updateStatus(
      order.orderId,
      event.target.value
    )
  }
  disabled={
    order.status === "Delivered" ||
    order.status === "Cancelled"
  }
  className="border border-gray-300 rounded-lg px-4 py-2 bg-white outline-none focus:ring-2 focus:ring-blue-500"
>
  {getStatusOptions(order.status).map((status) => (
    <option key={status} value={status}>
      {status}
    </option>
  ))}
</select>

                  </div>

                  {/* DELETE */}

                  <button
                    type="button"
                    onClick={() =>
                      deleteOrder(order.orderId)
                    }
                    className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-lg font-semibold transition"
                  >
                    Delete Order
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>

    </main>
  );
}

export default AdminOrders;