function OrderStatusBadge({ status }) {
  const getStatusStyle = () => {
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

  return (
    <span
      className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${getStatusStyle()}`}
    >
      {status || "Unknown"}
    </span>
  );
}

export default OrderStatusBadge;