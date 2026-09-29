import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getOrders,
  getLastOrder,
} from "../utils/storage";
import {
  FaCheckCircle,
  FaShoppingBag,
  FaTruck,
  FaClipboardCheck,
  FaBoxOpen,
} from "react-icons/fa";

function OrderSuccess() {
  const { orderId } = useParams();

  const [order, setOrder] = useState(null);

  // ================= LOAD ORDER =================

  useEffect(() => {
    const savedOrders = getOrders();

    const foundOrder = savedOrders.find(
      (item) => String(item.orderId) === String(orderId)
    );

    if (foundOrder) {
      setOrder(foundOrder);
      return;
    }

    // Fallback to lastOrder
    const lastOrder = getLastOrder();

    if (
      lastOrder &&
      String(lastOrder.orderId) === String(orderId)
    ) {
      setOrder(lastOrder);
    }
  }, [orderId]);

  // ================= ORDER NOT FOUND =================

  if (!order) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6">

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-10 sm:p-12 text-center max-w-lg w-full">

          <div className="w-20 h-20 mx-auto rounded-full bg-red-50 text-red-500 flex items-center justify-center mb-6">
            <FaBoxOpen className="text-4xl" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900">
            Order Not Found
          </h1>

          <p className="text-gray-500 mt-3 leading-relaxed">
            We couldn't find the order you're looking for.
            It may have been removed or is no longer available.
          </p>

          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-2 mt-7 bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-xl font-semibold transition"
          >
            <FaShoppingBag />
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

      {/* ===================================================== */}
      {/* SUCCESS HEADER */}
      {/* ===================================================== */}

      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">

        <div className="max-w-7xl mx-auto px-6 py-12 sm:py-14">

          <div className="max-w-4xl mx-auto text-center">

            {/* SUCCESS ICON */}

            <div className="flex justify-center mb-5">

              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/15 border border-white/20 flex items-center justify-center shadow-lg">

                <FaCheckCircle className="text-6xl sm:text-7xl text-white" />

              </div>

            </div>

            <p className="text-sm font-semibold uppercase tracking-wider text-white/70">
              Order Confirmation
            </p>

            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mt-2">
  {order.status === "Cancelled"
    ? "Order Cancelled"
    : order.status === "Delivered"
    ? "Order Delivered"
    : order.status === "Out for Delivery"
    ? "Order Out for Delivery"
    : order.status === "Shipped"
    ? "Order Shipped"
    : "Order Placed Successfully!"}
</h1>

            <p className="mt-3 text-white/80 max-w-xl mx-auto">
  {order.status === "Cancelled"
    ? "This order has been cancelled."
    : order.status === "Delivered"
    ? "Your order has been delivered successfully. Thank you for shopping with ShopEase."
    : order.status === "Out for Delivery"
    ? "Your order is on its way and will be delivered soon."
    : order.status === "Shipped"
    ? "Your order has been shipped and is on its way."
    : "Thank you for shopping with ShopEase. Your order has been received and is now being processed."}
</p>

            {/* ================================================= */}
            {/* PROGRESS INDICATOR */}
            {/* ================================================= */}

            <div className="max-w-3xl mx-auto mt-10">

              <div className="flex items-center justify-center">

                {/* CART */}

                <div className="flex items-center">

                  <div className="w-9 h-9 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold text-sm">
                    ✓
                  </div>

                  <span className="ml-2 text-sm font-semibold hidden sm:block">
                    Cart
                  </span>

                </div>

                <div className="w-10 sm:w-24 h-0.5 bg-white/70 mx-2 sm:mx-3"></div>

                {/* CHECKOUT */}

                <div className="flex items-center">

                  <div className="w-9 h-9 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold text-sm">
                    ✓
                  </div>

                  <span className="ml-2 text-sm font-semibold hidden sm:block">
                    Checkout
                  </span>

                </div>

                <div className="w-10 sm:w-24 h-0.5 bg-white/70 mx-2 sm:mx-3"></div>

                {/* CONFIRMATION */}

                <div className="flex items-center">

                  <div className="w-9 h-9 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold text-sm ring-4 ring-white/20">
                    ✓
                  </div>

                  <span className="ml-2 text-sm font-semibold">
                    Confirmation
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ===================================================== */}
      {/* CONTENT */}
      {/* ===================================================== */}

      <section className="max-w-6xl mx-auto px-6 py-10 sm:py-12">

        {/* ================================================= */}
        {/* ORDER ID CARD */}
        {/* ================================================= */}

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-7">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

            <div>

              <div className="flex items-center gap-3">

                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">

                  <FaClipboardCheck className="text-lg" />

                </div>

                <div>

                  <p className="text-sm text-gray-500">
                    Order ID
                  </p>

                  <p className="text-xl font-bold text-gray-900">
                    {order.orderId || orderId}
                  </p>

                </div>

              </div>

              <p className="text-sm text-gray-500 mt-4">
  {order.status === "Cancelled"
    ? "This order has been cancelled."
    : order.status === "Delivered"
    ? "Your order has been delivered successfully."
    : order.status === "Out for Delivery"
    ? "Your order is out for delivery."
    : order.status === "Shipped"
    ? "Your order has been shipped."
    : "Your order has been successfully placed and is being prepared."}
</p>

            </div>

            <div className="self-start sm:self-center">

              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-50 text-yellow-700 text-sm font-semibold">

                <span className="w-2 h-2 rounded-full bg-yellow-500"></span>

                {order.status || "Processing"}

              </span>

            </div>

          </div>

        </div>


        {/* ================================================= */}
        {/* ORDER DETAILS GRID */}
        {/* ================================================= */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">

          {/* ================================================= */}
          {/* ORDERED ITEMS */}
          {/* ================================================= */}

          <div className="lg:col-span-2">

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

              <div className="px-6 py-5 border-b border-gray-100">

                <div className="flex items-center justify-between gap-4">

                  <div>

                    <h2 className="text-xl font-bold text-gray-900">
                      Ordered Items
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      {order.items?.length || 0} product
                      {order.items?.length === 1 ? "" : "s"} in this order
                    </p>

                  </div>

                  <FaShoppingBag className="text-blue-600 text-xl" />

                </div>

              </div>


              <div>

                {order.items?.map((item, index) => {

                  const quantity =
                    Number(item.quantity) || 1;

                  const itemTotal =
                     (Number(item?.price) || 0) * quantity;

                  return (
                    <div
                      key={`${item.id}-${index}`}
                      className="flex flex-col sm:flex-row gap-5 p-6 border-b border-gray-100 last:border-b-0"
                    >

                      {/* IMAGE */}

                      <div className="shrink-0">

                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 rounded-xl object-cover bg-gray-100 border border-gray-100"
                        />

                      </div>


                      {/* PRODUCT INFO */}

                      <div className="flex-1 min-w-0">

                        {item.category && (
                          <p className="text-xs text-blue-600 font-semibold uppercase tracking-wide">
                            {item.category}
                          </p>
                        )}

                        <h3 className="text-lg font-bold text-gray-900 mt-1">
                          {item.name}
                        </h3>

                        <div className="flex flex-wrap items-center gap-x-5 gap-y-1 mt-3">

                          <p className="text-sm text-gray-500">
                            Quantity:{" "}
                            <span className="font-semibold text-gray-700">
                              {quantity}
                            </span>
                          </p>

                          <p className="text-sm text-gray-500">
                            ₹{(Number(item?.price) || 0).toLocaleString()} each
                          </p>

                        </div>

                      </div>


                      {/* PRICE */}

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
          {/* ORDER SUMMARY */}
          {/* ================================================= */}

          <div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 lg:sticky lg:top-24">

              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>


              {/* ITEMS */}

              <div className="flex justify-between text-gray-600 mb-4">

                <span>
                  Items
                </span>

                <span className="font-semibold text-gray-800">
                  {order.items?.reduce(
                    (total, item) =>
                      total + (Number(item.quantity) || 1),
                    0
                  )}
                </span>

              </div>


              {/* SUBTOTAL */}

              <div className="flex justify-between text-gray-600 mb-4">

                <span>
                  Subtotal
                </span>

                <span className="font-semibold text-gray-800">
                  ₹{(Number(order.subtotal) || 0).toLocaleString()}
                </span>

              </div>


              {/* DELIVERY */}

              <div className="flex justify-between text-gray-600 mb-4">

                <span>
                  Delivery
                </span>

                <span className="font-semibold">

                  {Number(order.deliveryCharge) === 0 ? (
                   <span className="text-green-600">
                   FREE
                   </span>
                  ) : (
                  `₹${(Number(order.deliveryCharge) || 0).toLocaleString()}`
                  )}

                </span>

              </div>


              <div className="border-t border-gray-100 my-5"></div>


              {/* TOTAL */}

              <div className="flex justify-between items-center">

                <span className="text-lg font-bold text-gray-900">
                  Total
                </span>

                <span className="text-2xl font-bold text-blue-600">
                  ₹{(Number(order.total) || 0).toLocaleString()}
                </span>

              </div>


              {/* PAYMENT */}

              <div className="mt-6 bg-gray-50 border border-gray-100 rounded-xl p-4">

                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Payment Method
                </p>

                <p className="font-semibold text-gray-900 mt-1">
                  {paymentLabel[order.paymentMethod] ||
                    order.paymentMethod ||
                    "Unknown"}
                </p>

                <div className="mt-4 pt-4 border-t border-gray-200">

                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Payment Status
                  </p>

                  <p
                    className={`font-semibold mt-1 ${
                      order.paymentStatus === "Paid"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {order.paymentStatus || "Pending"}
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* ================================================= */}
        {/* DELIVERY INFORMATION */}
        {/* ================================================= */}

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-7 mt-8">

          <div className="flex items-start gap-4 mb-7">

            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">

              <FaTruck className="text-lg" />

            </div>

            <div>

              <h2 className="text-xl font-bold text-gray-900">
                Delivery Information
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Your order will be delivered to the address below.
              </p>

            </div>

          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* CUSTOMER */}

            <div>

              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Customer
              </p>

              <p className="font-semibold text-gray-900 mt-2">
                {order.customer?.fullName}
              </p>

              <p className="text-gray-600 mt-1">
                {order.customer?.email}
              </p>

              <p className="text-gray-600">
                {order.customer?.phone}
              </p>

            </div>


            {/* ADDRESS */}

            <div>

              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Shipping Address
              </p>

              <p className="font-semibold text-gray-900 mt-2">
                {order.customer?.address}
              </p>

              <p className="text-gray-600 mt-1">
                {order.customer?.city},{" "}
                {order.customer?.state}
              </p>

              <p className="text-gray-600">
                PIN: {order.customer?.pincode}
              </p>

            </div>

          </div>

        </div>


        {/* ================================================= */}
        {/* NEXT STEPS */}
        {/* ================================================= */}

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-7 mt-8">

          <div className="text-center">

            <h2 className="text-xl font-bold text-gray-900">
              What would you like to do next?
            </h2>

            <p className="text-sm text-gray-500 mt-2">
              Manage your order or continue exploring ShopEase.
            </p>

          </div>


          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-7">

            {/* TRACK ORDER */}

            <Link
              to={`/order-tracking/${order.orderId}`}
              className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-7 py-3.5 rounded-xl font-semibold transition shadow-sm hover:shadow-md"
            >
              <FaTruck />
              Track Order
            </Link>


            {/* MY ORDERS */}

            <Link
              to="/orders"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-7 py-3.5 rounded-xl font-semibold transition shadow-sm hover:shadow-md"
            >
              <FaShoppingBag />
              View My Orders
            </Link>


            {/* CONTINUE SHOPPING */}

            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-7 py-3.5 rounded-xl font-semibold transition shadow-sm hover:shadow-md"
            >
              <FaShoppingBag />
              Continue Shopping
            </Link>

          </div>

        </div>


        {/* ================================================= */}
        {/* TRUST MESSAGE */}
        {/* ================================================= */}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-sm text-gray-400 mt-8">

          <span>
            🔒 Secure Checkout
          </span>

          <span className="hidden sm:block">
            •
          </span>

          <span>
            ✓ Order Confirmation
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

export default OrderSuccess;