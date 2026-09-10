function OrderItem({ item, showCategory = false }) {
  const quantity = Number(item.quantity) || 1;
  const price = Number(item.price) || 0;

  return (
    <div className="flex gap-4 sm:gap-5 border-b last:border-b-0 pb-5 last:pb-0">
      <img
        src={item.image}
        alt={item.name}
        className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover bg-gray-100 flex-shrink-0"
      />

      <div className="flex-1 min-w-0">
        {showCategory && item.category && (
          <p className="text-sm text-blue-600 font-medium mb-1">
            {item.category}
          </p>
        )}

        <h3 className="font-semibold text-gray-800">
          {item.name}
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          Quantity: {quantity}
        </p>

        <p className="text-sm text-gray-500">
          ₹{price.toLocaleString()} each
        </p>
      </div>

      <div className="text-right flex-shrink-0">
        <p className="font-bold text-gray-800">
          ₹{(price * quantity).toLocaleString()}
        </p>
      </div>
    </div>
  );
}

export default OrderItem;