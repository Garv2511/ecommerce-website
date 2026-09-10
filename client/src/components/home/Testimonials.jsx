import { FaStar, FaQuoteLeft } from "react-icons/fa";
import testimonials from "../../data/testimonialsData.js";

function Testimonials() {
  return (
    <section className="bg-gray-50 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* ================= HEADING ================= */}

        <div className="text-center max-w-2xl mx-auto mb-12">

          <span className="inline-block text-sm font-bold uppercase tracking-wider text-blue-600 mb-3">
            Customer Reviews
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            What Our Customers Say
          </h2>

          <p className="mt-4 text-gray-500 text-base sm:text-lg leading-relaxed">
            See why shoppers love choosing ShopEase for their everyday needs.
          </p>

        </div>

        {/* ================= TESTIMONIAL CARDS ================= */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">

          {testimonials.map((item) => (
            <article
              key={item.id}
              className="group relative bg-white rounded-2xl border border-gray-100 p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >

              {/* QUOTE ICON */}

              <div className="absolute top-6 right-6 text-blue-100 group-hover:text-blue-200 transition-colors">
                <FaQuoteLeft className="text-4xl" />
              </div>

              {/* STARS */}

              <div
                className="flex items-center gap-1 text-yellow-500 mb-5"
                aria-label="5 out of 5 stars"
              >
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />

                <span className="ml-2 text-sm font-semibold text-gray-500">
                  5.0
                </span>
              </div>

              {/* REVIEW */}

              <p className="text-gray-600 leading-relaxed text-base pr-6">
                "{item.review}"
              </p>

              {/* CUSTOMER */}

              <div className="flex items-center gap-3 mt-7 pt-5 border-t border-gray-100">

                {/* AVATAR */}

                <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  {item.name?.charAt(0)?.toUpperCase() || "C"}
                </div>

                <div>
                  <h3 className="font-bold text-gray-900">
                    {item.name}
                  </h3>

                  <p className="text-sm text-gray-400">
                    Verified Customer
                  </p>
                </div>

              </div>

            </article>
          ))}

        </div>

        {/* ================= TRUST MESSAGE ================= */}

        <div className="text-center mt-10">
          <p className="text-sm text-gray-500">
            ⭐ Trusted by happy customers across ShopEase
          </p>
        </div>

      </div>
    </section>
  );
}

export default Testimonials;