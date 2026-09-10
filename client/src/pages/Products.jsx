import { useMemo, useState, useEffect } from "react";
import ProductGrid from "../components/product/ProductGrid";
import products from "../data/products";
import { useLocation, useNavigate } from "react-router-dom";

function Products() {
  const location = useLocation();
const navigate = useNavigate();

const searchParams = new URLSearchParams(location.search);

const searchQuery = (
  searchParams.get("search") || ""
).trim().toLowerCase();

const urlCategory = searchParams.get("category") || "All";

const [search, setSearch] = useState(
  searchParams.get("search") || ""
);

const [category, setCategory] = useState(urlCategory);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("default");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
  const params = new URLSearchParams(location.search);

  const nextSearch = params.get("search") || "";
  const nextCategory = params.get("category") || "All";

  setSearch(nextSearch);
  setCategory(nextCategory);
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

<section className="bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900 text-white">

  <div className="max-w-7xl mx-auto px-6 py-14">

    <div className="max-w-2xl">

      <p className="text-sm font-semibold uppercase tracking-widest text-blue-300">
        Shop Our Collection
      </p>

      <h1 className="text-4xl md:text-5xl font-bold mt-3">
        All Products
      </h1>

      <p className="mt-4 text-white/70 text-lg leading-relaxed">
        Explore our collection of quality products, great prices,
        and amazing deals — all in one place.
      </p>

    </div>

  </div>

</section>


      {/* ================= PRODUCTS SECTION ================= */}

      <section className="max-w-7xl mx-auto px-6 py-10">

        {/* ================= SEARCH + SORT TOOLBAR ================= */}

<div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 mb-8">

  <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">

    {/* ================= SEARCH ================= */}

    <div className="w-full lg:max-w-xl">

      <label
        htmlFor="product-search"
        className="block text-sm font-semibold text-gray-700 mb-2"
      >
        Search Products
      </label>

      <form
        onSubmit={handleSearchSubmit}
        className="flex gap-2"
      >

        <div className="relative flex-1">

          {/* Search Icon */}

          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            🔎
          </span>

          <input
            id="product-search"
            name="productSearch"
            type="text"
            placeholder="Search by product name or category..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              resetPage();
            }}
            className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-800 placeholder-gray-400 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

        </div>

        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition shadow-sm"
        >
          Search
        </button>

      </form>

    </div>


    {/* ================= SORT ================= */}

    <div className="w-full lg:w-64">

      <label
        htmlFor="products-sort"
        className="block text-sm font-semibold text-gray-700 mb-2"
      >
        Sort Products
      </label>

      <select
        id="products-sort"
        name="sortBy"
        value={sortBy}
        onChange={(e) => {
          setSortBy(e.target.value);
          resetPage();
        }}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-800 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 cursor-pointer"
      >

        <option value="default">
          Recommended
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

</div>


        {/* ================= FILTERS ================= */}

<div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-7 mb-10">

  {/* ================= FILTER HEADER ================= */}

  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">

    <div>
      <div className="flex items-center gap-2">
        <span className="text-xl">🎛️</span>

        <h2 className="text-xl font-bold text-gray-900">
          Refine Your Search
        </h2>
      </div>

      <p className="text-sm text-gray-500 mt-1">
        Filter products by category, price, and rating.
      </p>
    </div>

  </div>


  {/* ================= FILTER OPTIONS ================= */}

  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

    {/* ================= CATEGORY ================= */}

    <div>

      <label
        htmlFor="products-category"
        className="block text-sm font-semibold text-gray-700 mb-2"
      >
        Category
      </label>

      <select
        id="products-category"
        name="category"
        value={category}
        onChange={(e) => {
          const newCategory = e.target.value;

          setCategory(newCategory);
          resetPage();

          const params = new URLSearchParams(location.search);

          if (newCategory === "All") {
            params.delete("category");
          } else {
            params.set("category", newCategory);
          }

          const queryString = params.toString();

          navigate(
            `${location.pathname}${
              queryString ? `?${queryString}` : ""
            }`,
            { replace: true }
          );
        }}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-800 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 cursor-pointer"
      >

        {categories.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}

      </select>

    </div>


    {/* ================= MAXIMUM PRICE ================= */}

    <div>

      <label
        htmlFor="products-max-price"
        className="block text-sm font-semibold text-gray-700 mb-2"
      >
        Maximum Price
      </label>

      <div className="relative">

        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
          ₹
        </span>

        <input
          id="products-max-price"
          name="maxPrice"
          type="number"
          value={maxPrice}
          onChange={(e) => {
            setMaxPrice(e.target.value);
            resetPage();
          }}
          className="w-full pl-9 pr-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-800 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

      </div>

      <p className="text-xs text-gray-400 mt-2">
        Show products up to this price
      </p>

    </div>


    {/* ================= MINIMUM RATING ================= */}

    <div>

      <label
        htmlFor="products-rating"
        className="block text-sm font-semibold text-gray-700 mb-2"
      >
        Minimum Rating
      </label>

      <select
        id="products-rating"
        name="minRating"
        value={minRating}
        onChange={(e) => {
          setMinRating(e.target.value);
          resetPage();
        }}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-800 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 cursor-pointer"
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


  {/* ================= FILTER FOOTER ================= */}

  <div className="mt-7 pt-5 border-t border-gray-100">

    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

      {/* RESULT COUNT */}

      <div className="text-sm text-gray-500">

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


      {/* CLEAR FILTERS */}

      <button
        type="button"
        onClick={() => {
          setSearch("");
          setCategory("All");
          setMinPrice(0);
          setMaxPrice(100000);
          setMinRating(0);
          setSortBy("default");
          setCurrentPage(1);

          navigate("/products", {
            replace: true,
          });
        }}
        className="inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition shadow-sm"
      >
        ↻
        Clear Filters
      </button>

    </div>

  </div>

</div>


        {/* ================= PRODUCTS ================= */}

        {currentProducts.length > 0 ? (

          <ProductGrid products={currentProducts} />

       ) : (

  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm py-20 px-6 text-center">

    {/* Empty State Icon */}

    <div className="mx-auto w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center text-4xl">
      🔍
    </div>

    {/* Heading */}

    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-6">
      No Products Found
    </h2>

    {/* Description */}

    <p className="text-gray-500 mt-3 max-w-md mx-auto leading-relaxed">
      We couldn't find any products matching your current search
      or filters. Try adjusting your selections.
    </p>

    {/* Clear Filters */}

    <button
      type="button"
      onClick={() => {
        setSearch("");
        setCategory("All");
        setMinPrice(0);
        setMaxPrice(100000);
        setMinRating(0);
        setSortBy("default");
        setCurrentPage(1);

        navigate("/products", {
          replace: true,
        });
      }}
      className="inline-flex items-center justify-center gap-2 mt-7 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition shadow-sm"
    >
      ↻
      Clear Filters
    </button>

  </div>

)}


       {/* ================= PAGINATION ================= */}

{totalPages > 1 && (
  <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">

    {/* Pagination Container */}
    <div className="flex items-center gap-2 bg-white border border-gray-200 shadow-sm rounded-xl p-2">

      {/* Previous */}
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() =>
          setCurrentPage((page) => page - 1)
        }
        aria-label="Go to previous page"
        className={`px-4 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 ${
          currentPage === 1
            ? "text-gray-400 bg-gray-50 cursor-not-allowed"
            : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
        }`}
      >
        ← <span className="hidden sm:inline">Previous</span>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {Array.from(
          { length: totalPages },
          (_, index) => index + 1
        ).map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => setCurrentPage(page)}
            aria-label={`Go to page ${page}`}
            aria-current={
              currentPage === page ? "page" : undefined
            }
            className={`w-10 h-10 rounded-lg font-semibold text-sm transition-all duration-200 ${
              currentPage === page
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next */}
      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() =>
          setCurrentPage((page) => page + 1)
        }
        aria-label="Go to next page"
        className={`px-4 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 ${
          currentPage === totalPages
            ? "text-gray-400 bg-gray-50 cursor-not-allowed"
            : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
        }`}
      >
        <span className="hidden sm:inline">Next</span> →
      </button>

    </div>

  </div>
)}
      </section>

    </main>
  );
}

export default Products;