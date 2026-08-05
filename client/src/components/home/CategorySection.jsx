import categories from "../../data/categories";
import CategoryCard from "./CategoryCard";

function CategorySection() {
  return (
    <section className="max-w-7xl mx-auto py-20 px-6">

      <h2 className="text-4xl font-bold text-center mb-12">
        Browse Categories
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
          />
        ))}

      </div>

    </section>
  );
}

export default CategorySection;