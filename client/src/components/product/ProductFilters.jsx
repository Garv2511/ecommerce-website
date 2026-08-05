import { useState } from "react";

function ProductFilters({
  category,
  setCategory,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  minRating,
  setMinRating,
  sortBy,
  setSortBy,
}) {
  return (
    <aside className="bg-white rounded-xl shadow-md p-6 w-full lg:w-64">

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Filters</h2>

        <button
          onClick={() => {
            setCategory("All");
            setMinPrice(0);
            setMaxPrice(100000);
            setMinRating(0);
            setSortBy("featured");
          }}
          className="text-sm text-blue-600 hover:underline"
        >
          Reset
        </button>
      </div>

      {/* Category */}
      <div className="mb-8">
        <h3 className="font-semibold mb-3">Category</h3>

        <div className="space-y-2">

          {[
            "All",
            "Electronics",
            "Laptops",
            "Watches",
            "Shoes",
          ].map((item) => (
            <label
              key={item}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                name="category"
                value={item}
                checked={category === item}
                onChange={(e) => setCategory(e.target.value)}
              />

              <span>{item}</span>
            </label>
          ))}

        </div>
      </div>

      {/* Price */}
      <div className="mb-8">
        <h3 className="font-semibold mb-3">Price</h3>

        <div className="flex gap-2">

          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            placeholder="Min"
            className="w-1/2 border rounded-lg px-3 py-2"
          />

          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            placeholder="Max"
            className="w-1/2 border rounded-lg px-3 py-2"
          />

        </div>
      </div>

      {/* Rating */}
      <div className="mb-8">
        <h3 className="font-semibold mb-3">Rating</h3>

        <select
          value={minRating}
          onChange={(e) => setMinRating(Number(e.target.value))}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value={0}>All Ratings</option>
          <option value={4}>4.0+ ⭐</option>
          <option value={4.5}>4.5+ ⭐</option>
          <option value={4.8}>4.8+ ⭐</option>
        </select>
      </div>

      {/* Sort */}
      <div>
        <h3 className="font-semibold mb-3">Sort By</h3>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="featured">Featured</option>
          <option value="priceLow">Price: Low → High</option>
          <option value="priceHigh">Price: High → Low</option>
          <option value="rating">Rating: High → Low</option>
        </select>
      </div>

    </aside>
  );
}

export default ProductFilters;