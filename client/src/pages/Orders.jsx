import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBoxOpen,
  FaShoppingBag,
  FaTruck,
  FaCheckCircle,
} from "react-icons/fa";

function Orders() {
  const [orders, setOrders] = useState([]);

  // ================= LOAD ORDERS =================

  useEffect(() => {
    const savedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    setOrders(savedOrders);
  }, []);

  // ================= EMPTY ORDERS =================

  if (orders.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50">

        {/* Header */}

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


        {/* Empty Orders */}

        <section className="max-w-7xl mx-auto px-6 py-20">

          <div className="bg-white rounded-2xl shadow-sm py-20 px-6 text-center">

            <div className="flex justify-center mb-6">

              <div className="bg-blue-100 p-6 rounded-full">

                <FaBoxOpen className="text-blue-600 text-5xl" />

              </div>

            </div>

            <h2 className="text-3xl font-bold text-gray-800">
              No Orders Yet
            </h2>

            <p className="text-gray-500 mt-3">
              Your completed orders will appear here.
            </p>

            <Link
              to="/products"
              className="inline-flex items-center gap-2 mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              <FaShoppingBag />
              Start Shopping
            </Link>

          </div>

        </section>

      </main>
    );
  }

  // ================= ORDER PAGE =================

  return (
    <main className="min-h-screen bg-gray-50">

      {/* ================= HEADER ================= */}

      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">

        <div className="max-w-7xl mx-auto px-6 py-12">

          <h1 className="text-4xl font-bold">
            My Orders
          </h1>

          <p className="mt-2 text-white/80">
            {orders.length}{" "}
            {orders.length === 1
              ? "order"
              : "orders"}{" "}
            placed.
          </p>

        </div>

      </section>


      {/* ================= ORDERS ================= */}

      <section className="max-w-5xl mx-auto px-6 py-10">

        <div className="space-y-6">

          {orders.map((order) => {

            const orderDate = new Date(
              order.createdAt
            );

            return (
              <div
                key={order.orderId}
                className="bg-white rounded-2xl shadow-sm overflow-hidden"
              >

                {/* ================= ORDER HEADER ================= */}

                <div className="px-6 py-5 border-b bg-gray-50">

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                    <div>

                      <p className="text-sm text-gray-500">
                        Order ID
                      </p>

                      <p className="font-bold text-blue-600">
                        {order.orderId}
                      </p>

                    </div>


                    <div>

                      <p className="text-sm text-gray-500">
                        Order Date
                      </p>

                      <p className="font-semibold text-gray-800">
                        {orderDate.toLocaleDateString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </p>

                    </div>


                    {/* Status */}

                    <div>

                      <span
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                          order.status ===
                          "Delivered"
                            ? "bg-green-100 text-green-700"
                            : order.status ===
                              "Cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >

                        {order.status ===
                        "Delivered" ? (
                          <FaCheckCircle />
                        ) : (
                          <FaTruck />
                        )}

                        {order.status ||
                          "Processing"}

                      </span>

                    </div>

                  </div>

                </div>


                {/* ================= ORDER ITEMS ================= */}

                <div className="p-6">

                  <div className="space-y-5">

                    {order.items.map((item) => (

                      <div
                        key={item.id}
                        className="flex gap-5"
                      >

                        {/* Image */}

                        <Link
                          to={`/products/${item.id}`}
                        >

                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl bg-gray-100"
                          />

                        </Link>


                        {/* Product Info */}

                        <div className="flex-1">

                          <p className="text-sm text-blue-600 font-medium">
                            {item.category}
                          </p>

                          <Link
                            to={`/products/${item.id}`}
                            className="font-bold text-gray-800 hover:text-blue-600 transition"
                          >
                            {item.name}
                          </Link>

                          <p className="text-sm text-gray-500 mt-1">
                            Quantity:{" "}
                            {item.quantity}
                          </p>

                        </div>


                        {/* Price */}

                        <div className="text-right">

                          <p className="font-bold text-gray-800">
                            ₹
                            {(
                              Number(
                                item.price
                              ) *
                              item.quantity
                            ).toLocaleString()}
                          </p>

                        </div>

                      </div>

                    ))}

                  </div>


                  {/* ================= ORDER SUMMARY ================= */}

                  <div className="border-t mt-6 pt-5">

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                      <div>

                        <p className="text-sm text-gray-500">
                          Payment
                        </p>

                        <p className="font-semibold text-gray-800">
                          {order.paymentMethod ===
                          "cod"
                            ? "Cash on Delivery"
                            : order.paymentMethod ===
                              "upi"
                            ? "UPI"
                            : "Credit / Debit Card"}
                        </p>

                      </div>


                      <div>

                        <p className="text-sm text-gray-500">
                          Items
                        </p>

                        <p className="font-semibold text-gray-800">
                          {order.items.reduce(
                            (total, item) =>
                              total +
                              (Number(
                                item.quantity
                              ) || 1),
                            0
                          )}
                        </p>

                      </div>


                      <div className="text-right">

                        <p className="text-sm text-gray-500">
                          Total
                        </p>

                        <p className="text-2xl font-bold text-blue-600">
                          ₹
                          {Number(
                            order.total
                          ).toLocaleString()}
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

              </div>
            );
          })}

        </div>


        {/* Continue Shopping */}

        <div className="text-center mt-10">

          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold"
          >
            <FaShoppingBag />
            Continue Shopping
          </Link>

        </div>

      </section>

    </main>
  );
}

export default Orders;


