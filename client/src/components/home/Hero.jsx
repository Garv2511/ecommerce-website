import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white">
      <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col lg:flex-row items-center justify-between gap-10">

        {/* Left */}
        <div className="max-w-xl">
          <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold">
            🔥 Summer Sale
          </span>

          <h1 className="text-5xl md:text-6xl font-bold mt-6 leading-tight">
            Upgrade Your Lifestyle with ShopEase
          </h1>

          <p className="text-lg mt-6 text-blue-100">
            Discover thousands of products with amazing deals, fast delivery,
            and secure shopping.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              to="/products"
              className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Shop Now
            </Link>

            <Link
              to="/products"
              className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-700 transition"
            >
              Explore Products
            </Link>
          </div>
        </div>

        {/* Right */}
        <div>
          <img
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700"
            alt="Featured Product"
            className="rounded-2xl shadow-2xl w-full max-w-md"
          />
        </div>

      </div>
    </section>
  );
}

export default Hero;