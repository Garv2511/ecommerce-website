import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800 text-white">
      {/* Decorative background elements */}
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-purple-400/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 py-16 md:py-20 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">

          {/* ================= LEFT ================= */}
          <div className="max-w-2xl text-center lg:text-left">

            {/* Sale Badge */}
            <span className="inline-flex items-center gap-2 bg-yellow-400 text-gray-900 px-4 py-2 rounded-full text-sm font-bold shadow-md">
              🔥 Summer Sale
            </span>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mt-6 leading-[1.1] tracking-tight">
              Upgrade Your Lifestyle with{" "}
              <span className="text-yellow-300">
                ShopEase
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl mt-6 text-blue-100 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Discover thousands of products with amazing deals,
              fast delivery, and secure shopping — all in one place.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">

              <Link
                to="/products"
                className="inline-flex items-center justify-center bg-white text-blue-700 px-7 py-3.5 rounded-xl font-bold shadow-lg hover:bg-gray-100 hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Shop Now
                <span className="ml-2">→</span>
              </Link>

              <Link
                to="/products"
                className="inline-flex items-center justify-center border border-white/70 bg-white/5 backdrop-blur-sm px-7 py-3.5 rounded-xl font-bold hover:bg-white hover:text-blue-700 hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Explore Products
              </Link>

            </div>

            {/* Trust Points */}
            <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3 text-sm text-blue-100">
              <span className="flex items-center gap-2">
                ✓ Secure Shopping
              </span>

              <span className="flex items-center gap-2">
                ✓ Fast Delivery
              </span>

              <span className="flex items-center gap-2">
                ✓ Great Deals
              </span>
            </div>

          </div>

          {/* ================= RIGHT ================= */}
          <div className="w-full max-w-md lg:max-w-lg">

            <div className="relative">

              {/* Image Glow */}
              <div className="absolute inset-4 bg-white/20 blur-3xl rounded-full" />

              <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700"
                alt="Featured smartwatch product"
                className="relative w-full aspect-square object-cover rounded-3xl shadow-2xl ring-1 ring-white/20 transition-transform duration-500 hover:scale-[1.02]"
              />

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;