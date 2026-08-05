import { FaMinus, FaPlus } from "react-icons/fa";

function QuantitySelector({ quantity, setQuantity }) {
  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increase = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="flex items-center border border-gray-300 rounded-lg w-fit overflow-hidden">
      <button
        onClick={decrease}
        className="px-4 py-3 hover:bg-gray-100 transition"
      >
        <FaMinus size={12} />
      </button>

      <span className="px-6 font-semibold">
        {quantity}
      </span>

      <button
        onClick={increase}
        className="px-4 py-3 hover:bg-gray-100 transition"
      >
        <FaPlus size={12} />
      </button>
    </div>
  );
}

export default QuantitySelector;