import { FaStar, FaHeart } from "react-icons/fa";
import QuantitySelector from "./QuantitySelector";

function ProductInfo({
  product,
  quantity,
  setQuantity,
}) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm">

      <p className="text-blue-600 font-medium mb-2">
        {product.category}
      </p>

      <h1 className="text-4xl font-bold text-gray-900">
        {product.name}
      </h1>

      {/* Rating */}

      <div className="flex items-center gap-2 mt-4">

        <div className="flex text-yellow-500 gap-1">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
        </div>

        <span className="font-semibold">
          {product.rating}
        </span>

        <span className="text-gray-500">
          ({product.reviews} reviews)
        </span>

      </div>

      {/* Price */}

      <div className="flex items-center gap-4 mt-6">

        <span className="text-3xl font-bold text-blue-600">
          ₹{product.price.toLocaleString("en-IN")}
        </span>

        <span className="text-lg text-gray-400 line-through">
          ₹{product.oldPrice.toLocaleString("en-IN")}
        </span>

      </div>

      {/* Description */}

      <p className="text-gray-600 leading-7 mt-6">
        {product.description}
      </p>

      {/* Specifications */}

      <div className="mt-8">

        <h2 className="text-xl font-bold mb-4">
          Specifications
        </h2>

        <div className="space-y-3">

          {Object.entries(product.specifications).map(
            ([key, value]) => (
              <div
                key={key}
                className="flex justify-between border-b pb-2"
              >
                <span className="font-medium text-gray-600">
                  {key}
                </span>

                <span className="text-gray-900">
                  {value}
                </span>
              </div>
            )
          )}

        </div>

      </div>

      {/* Quantity */}

      <div className="mt-8">

        <h2 className="font-bold mb-3">
          Quantity
        </h2>

        <QuantitySelector
          quantity={quantity}
          setQuantity={setQuantity}
        />

      </div>

      {/* Buttons */}

      <div className="flex gap-4 mt-8">

        <button className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition">
          Add to Cart
        </button>

        <button className="flex-1 bg-orange-500 text-white py-4 rounded-xl font-semibold hover:bg-orange-600 transition">
          Buy Now
        </button>

        <button className="px-5 border border-gray-300 rounded-xl hover:text-red-500 transition">
          <FaHeart />
        </button>

      </div>

    </div>
  );
}

export default ProductInfo;