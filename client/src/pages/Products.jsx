import { useMemo, useState, useEffect } from "react";
import ProductGrid from "../components/product/ProductGrid";
import products from "../data/products";
import { useLocation, useNavigate } from "react-router-dom";

function Products() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = (searchParams.get("search") || "").trim().toLowerCase();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState("All");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("default");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const nextSearch = searchParams.get("search") || "";
    setSearch(nextSearch);
    setCurrentPage(1);
  }, [location.search]);

  const productsPerPage = 8;

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  // ================= FILTER + SORT =================

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const searchText = searchQuery.trim().toLowerCase();

      const searchMatch =
        product.name.toLowerCase().includes(searchText) ||
        product.category.toLowerCase().includes(searchText);

      const categoryMatch =
        category === "All" || product.category === category;

      const priceMatch =
        Number(product.price) >= Number(minPrice) &&
        Number(product.price) <= Number(maxPrice);

      const ratingMatch =
        Number(product.rating) >= Number(minRating);

      return (
        searchMatch &&
        categoryMatch &&
        priceMatch &&
        ratingMatch
      );
    });

    // Sorting
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    if (sortBy === "newest") {
      result.sort((a, b) => b.id - a.id);
    }

    return result;
  }, [
    searchQuery,
    category,
    minPrice,
    maxPrice,
    minRating,
    sortBy,
  ]);

  // ================= PAGINATION =================

  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );

  const startIndex =
    (currentPage - 1) * productsPerPage;

  const endIndex =
    startIndex + productsPerPage;

  const currentProducts =
    filteredProducts.slice(startIndex, endIndex);

  // ================= RESET PAGE =================

  const resetPage = () => {
    setCurrentPage(1);
  };

  const updateSearchInUrl = (value) => {
    const params = new URLSearchParams(location.search);
    const trimmedQuery = value.trim();

    if (trimmedQuery) {
      params.set("search", trimmedQuery);
    } else {
      params.delete("search");
    }

    const queryString = params.toString();
    navigate(`${location.pathname}${queryString ? `?${queryString}` : ""}`, {
      replace: true,
    });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateSearchInUrl(search);
  };

  // ================= RETURN =================

  return (
    <main className="min-h-screen bg-gray-50">

      {/* ================= HEADER ================= */}

      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">

        <div className="max-w-7xl mx-auto px-6 py-12">

          <h1 className="text-4xl font-bold">
            All Products
          </h1>

          <p className="mt-2 text-white/80">
            Discover amazing products at the best prices.
          </p>

        </div>

      </section>


      {/* ================= PRODUCTS SECTION ================= */}

      <section className="max-w-7xl mx-auto px-6 py-10">

        {/* SEARCH + SORT */}

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">

          {/* Search */}

          <div className="w-full lg:w-96">

            <label className="block text-sm font-semibold mb-2">
              Search Products
            </label>

            <form onSubmit={handleSearchSubmit} className="flex gap-2">
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => {
                  const nextValue = e.target.value;
                  setSearch(nextValue);
                  resetPage();
                  updateSearchInUrl(nextValue);
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="submit"
                className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Search
              </button>
            </form>

          </div>


          {/* Sort */}

          <div>

            <label className="block text-sm font-semibold mb-2">
              Sort By
            </label>

            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                resetPage();
              }}
              className="px-4 py-3 border border-gray-300 rounded-lg bg-white outline-none"
            >

              <option value="default">
                Default
              </option>

              <option value="price-low">
                Price: Low to High
              </option>

              <option value="price-high">
                Price: High to Low
              </option>

              <option value="rating">
                Highest Rated
              </option>

              <option value="newest">
                Newest
              </option>

            </select>

          </div>

        </div>


        {/* ================= FILTERS ================= */}

        <div className="bg-white rounded-xl shadow-sm p-6 mb-10">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Category */}

            <div>

              <label className="block text-sm font-semibold mb-2">
                Category
              </label>

              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  resetPage();
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white"
              >

                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}

              </select>

            </div>


            {/* Maximum Price */}

            <div>

              <label className="block text-sm font-semibold mb-2">
                Maximum Price
              </label>

              <input
                type="number"
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(e.target.value);
                  resetPage();
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>


            {/* Rating */}

            <div>

              <label className="block text-sm font-semibold mb-2">
                Minimum Rating
              </label>

              <select
                value={minRating}
                onChange={(e) => {
                  setMinRating(e.target.value);
                  resetPage();
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white"
              >

                <option value="0">
                  All Ratings
                </option>

                <option value="4">
                  4★ and above
                </option>

                <option value="4.5">
                  4.5★ and above
                </option>

              </select>

            </div>

          </div>


          {/* RESULT COUNT */}

          <div className="mt-5 text-gray-600">

            Showing{" "}

            <span className="font-bold text-gray-900">
              {filteredProducts.length === 0
                ? 0
                : startIndex + 1}
              –
              {Math.min(
                endIndex,
                filteredProducts.length
              )}
            </span>{" "}

            of{" "}

            <span className="font-bold text-gray-900">
              {filteredProducts.length}
            </span>{" "}

            products

          </div>

        </div>


        {/* ================= PRODUCTS ================= */}

        {currentProducts.length > 0 ? (

          <ProductGrid products={currentProducts} />

        ) : (

          <div className="bg-white rounded-xl shadow-sm py-20 text-center">

            <h2 className="text-2xl font-bold text-gray-700">
              No products found
            </h2>

            <p className="text-gray-500 mt-2">
              Try changing your search or filters.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
                setMinPrice(0);
                setMaxPrice(100000);
                setMinRating(0);
                setSortBy("default");
                setCurrentPage(1);
              }}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
            >
              Clear Filters
            </button>

          </div>

        )}


        {/* ================= PAGINATION ================= */}

        {totalPages > 1 && (

          <div className="flex justify-center items-center gap-2 mt-12">

            {/* Previous */}

            <button
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage((page) => page - 1)
              }
              className={`px-4 py-2 rounded-lg border transition ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white hover:bg-gray-100 text-gray-700"
              }`}
            >
              ← Previous
            </button>


            {/* Page Numbers */}

            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            ).map((page) => (

              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-lg transition ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "bg-white border hover:bg-gray-100"
                }`}
              >
                {page}
              </button>

            ))}


            {/* Next */}

            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((page) => page + 1)
              }
              className={`px-4 py-2 rounded-lg border transition ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white hover:bg-gray-100 text-gray-700"
              }`}
            >
              Next →
            </button>

          </div>

        )}

      </section>

    </main>
  );
}

export default Products;