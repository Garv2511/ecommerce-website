
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FaCheckCircle,
  FaShoppingBag,
  FaTruck,
} from "react-icons/fa";

function OrderSuccess() {
  const { orderId } = useParams();

  const [order, setOrder] = useState(null);

  // ================= LOAD ORDER =================

  useEffect(() => {
    const savedOrder =
      JSON.parse(localStorage.getItem("lastOrder"));

    if (savedOrder) {
      setOrder(savedOrder);
    }
  }, []);

  // ================= ORDER NOT FOUND =================

  if (!order) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6">

        <div className="bg-white rounded-2xl shadow-sm p-10 text-center max-w-lg w-full">

          <h1 className="text-3xl font-bold text-gray-800">
            Order Not Found
          </h1>

          <p className="text-gray-500 mt-3">
            We couldn't find the order you're looking for.
          </p>

          <Link
            to="/products"
            className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Continue Shopping
          </Link>

        </div>

      </main>
    );
  }

  // ================= PAYMENT LABEL =================

  const paymentLabel = {
    cod: "Cash on Delivery",
    upi: "UPI",
    card: "Credit / Debit Card",
  };

  // ================= RETURN =================

  return (
    <main className="min-h-screen bg-gray-50">

      {/* ================= SUCCESS HEADER ================= */}

      <section className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">

        <div className="max-w-4xl mx-auto px-6 py-14 text-center">

          <div className="flex justify-center mb-5">

            <FaCheckCircle className="text-7xl" />

          </div>

          <h1 className="text-4xl font-bold">
            Order Placed Successfully!
          </h1>

          <p className="mt-3 text-white/90">
            Thank you for shopping with ShopEase.
          </p>

        </div>

      </section>


      {/* ================= CONTENT ================= */}

      <section className="max-w-5xl mx-auto px-6 py-10">

        {/* Order ID */}

        <div className="bg-white rounded-2xl shadow-sm p-6 text-center">

          <p className="text-sm text-gray-500">
            Order ID
          </p>

          <p className="text-2xl font-bold text-blue-600 mt-1">
            {order.orderId || orderId}
          </p>

          <p className="text-sm text-gray-500 mt-2">
            Your order has been successfully placed.
          </p>

        </div>


        {/* ================= ORDER DETAILS ================= */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">

          {/* ================= ITEMS ================= */}

          <div className="lg:col-span-2">

            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

              <div className="px-6 py-5 border-b">

                <h2 className="text-xl font-bold text-gray-800">
                  Ordered Items
                </h2>

              </div>

              <div>

                {order.items.map((item) => (

                  <div
                    key={item.id}
                    className="flex gap-5 p-6 border-b last:border-b-0"
                  >

                    {/* Image */}

                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 rounded-xl object-cover bg-gray-100"
                    />

                    {/* Info */}

                    <div className="flex-1">

                      <p className="text-sm text-blue-600 font-medium">
                        {item.category}
                      </p>

                      <h3 className="text-lg font-bold text-gray-800 mt-1">
                        {item.name}
                      </h3>

                      <p className="text-sm text-gray-500 mt-2">
                        Quantity: {item.quantity}
                      </p>

                    </div>

                    {/* Price */}

                    <div className="text-right">

                      <p className="font-bold text-gray-800">
                        ₹
                        {(
                          Number(item.price) *
                          item.quantity
                        ).toLocaleString()}
                      </p>

                      <p className="text-sm text-gray-500 mt-1">
                        ₹
                        {Number(
                          item.price
                        ).toLocaleString()}{" "}
                        each
                      </p>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          </div>


          {/* ================= SUMMARY ================= */}

          <div>

            <div className="bg-white rounded-2xl shadow-sm p-6">

              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Order Summary
              </h2>

              {/* Subtotal */}

              <div className="flex justify-between text-gray-600 mb-4">

                <span>
                  Subtotal
                </span>

                <span className="font-semibold text-gray-800">
                  ₹
                  {Number(
                    order.subtotal
                  ).toLocaleString()}
                </span>

              </div>


              {/* Delivery */}

              <div className="flex justify-between text-gray-600 mb-4">

                <span>
                  Delivery
                </span>

                <span className="font-semibold">

                  {order.deliveryCharge === 0 ? (
                    <span className="text-green-600">
                      FREE
                    </span>
                  ) : (
                    `₹${order.deliveryCharge}`
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
                  ₹
                  {Number(
                    order.total
                  ).toLocaleString()}
                </span>

              </div>


              {/* Payment */}

              <div className="mt-6 bg-gray-50 rounded-lg p-4">

                <p className="text-sm text-gray-500">
                  Payment Method
                </p>

                <p className="font-semibold text-gray-800 mt-1">
                  {paymentLabel[
                    order.paymentMethod
                  ] || order.paymentMethod}
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* ================= SHIPPING INFORMATION ================= */}

        <div className="bg-white rounded-2xl shadow-sm p-6 mt-8">

          <div className="flex items-center gap-3 mb-6">

            <FaTruck className="text-blue-600 text-xl" />

            <h2 className="text-xl font-bold text-gray-800">
              Delivery Information
            </h2>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Customer */}

            <div>

              <p className="text-sm text-gray-500">
                Customer
              </p>

              <p className="font-semibold text-gray-800 mt-1">
                {order.customer.fullName}
              </p>

              <p className="text-gray-600 mt-1">
                {order.customer.email}
              </p>

              <p className="text-gray-600">
                {order.customer.phone}
              </p>

            </div>


            {/* Address */}

            <div>

              <p className="text-sm text-gray-500">
                Shipping Address
              </p>

              <p className="font-semibold text-gray-800 mt-1">
                {order.customer.address}
              </p>

              <p className="text-gray-600">
                {order.customer.city},{" "}
                {order.customer.state}
              </p>

              <p className="text-gray-600">
                PIN: {order.customer.pincode}
              </p>

            </div>

          </div>

        </div>


        {/* ================= BUTTONS ================= */}

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">

          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            <FaShoppingBag />
            Continue Shopping
          </Link>

          <Link
            to="/"
            className="inline-flex items-center justify-center border border-gray-300 hover:bg-white text-gray-700 px-8 py-3 rounded-lg font-semibold transition"
          >
            Back to Home
          </Link>

        </div>

      </section>

    </main>
  );
}

export default OrderSuccess;
