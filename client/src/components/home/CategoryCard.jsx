import { Link } from "react-router-dom";

function CategoryCard({ category }) {
  return (
    <Link
      to={`/products?category=${encodeURIComponent(category.name)}`}
      className="group block bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      {/* ================= IMAGE ================= */}
      <div className="relative overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-52 sm:h-56 object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70" />

        {/* Category Name on Image */}
        <div className="absolute bottom-4 left-5 right-5">
          <h3 className="text-2xl font-bold text-white drop-shadow-md">
            {category.name}
          </h3>
        </div>
      </div>

      {/* ================= CARD FOOTER ================= */}
      <div className="flex items-center justify-between px-5 py-4">
        <span className="text-sm font-semibold text-gray-500">
          Explore products
        </span>

        <span className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
          →
        </span>
      </div>
    </Link>
  );
}

export default CategoryCard;