import ProductCard from "./ProductCard";

function ProductGrid({ products }) {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-700">
          No products found
        </h2>

        <p className="text-gray-500 mt-2">
          Try changing your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 items-stretch">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}

export default ProductGrid;