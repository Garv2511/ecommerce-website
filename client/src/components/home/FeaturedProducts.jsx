import { Link } from "react-router-dom";
import products from "../../data/products";
import ProductCard from "../product/ProductCard";

function FeaturedProducts() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* ================= HEADING ================= */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block text-sm font-bold uppercase tracking-wider text-blue-600 mb-3">
            Shop Our Picks
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Featured Products
          </h2>

          <p className="mt-4 text-gray-500 text-base sm:text-lg leading-relaxed">
            Discover some of our most popular products, carefully selected
            for you.
          </p>
        </div>

        {/* ================= PRODUCTS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

        {/* ================= VIEW ALL ================= */}
        <div className="flex justify-center mt-12">
          <Link
  to="/products"
  className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300"
>
  View All Products
  <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
    →
  </span>
</Link>
        </div>

      </div>
    </section>
  );
}

export default FeaturedProducts;