import { FaStar } from "react-icons/fa";
import testimonials from "../../data/testimonialsData.js";

function Testimonials() {
  return (
    <section className="bg-gray-100 py-20">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-12">
          What Our Customers Say
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <div className="flex text-yellow-500 mb-4">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>

              <p className="text-gray-600">
                "{item.review}"
              </p>

              <h3 className="font-bold mt-6">
                {item.name}
              </h3>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default Testimonials;