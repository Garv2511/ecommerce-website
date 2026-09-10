import categories from "../../data/categories";
import CategoryCard from "./CategoryCard";

function CategorySection() {
  return (
    <section className="bg-gray-50 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* ================= HEADING ================= */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block text-sm font-bold uppercase tracking-wider text-blue-600 mb-3">
            Shop by Category
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Browse Categories
          </h2>

          <p className="mt-4 text-gray-500 text-base sm:text-lg leading-relaxed">
            Explore our wide range of products and find exactly what
            you're looking for.
          </p>
        </div>

        {/* ================= CATEGORY GRID ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default CategorySection;