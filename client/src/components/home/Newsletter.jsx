import { useState } from "react";
import { FaEnvelope } from "react-icons/fa";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email.includes("@")) {
      setMessage("Please enter a valid email address.");
      return;
    }

    setMessage("🎉 Thank you for subscribing!");
    setEmail("");

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">

        {/* EYEBROW */}
        <p className="text-sm font-bold uppercase tracking-widest text-blue-200">
          Newsletter
        </p>

        {/* HEADING */}
        <h2 className="text-4xl md:text-5xl font-bold mt-3">
          Get Exclusive Offers
        </h2>

        {/* DESCRIPTION */}
        <p className="text-blue-100 text-base md:text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
          Subscribe to receive exclusive offers, new arrivals, and exciting
          deals delivered straight to your inbox.
        </p>

        {/* FORM CARD */}
        <div className="mt-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 md:p-5 shadow-xl">
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col md:flex-row gap-3"
          >
            <div className="relative flex-1">
              <label htmlFor="newsletter-email" className="sr-only">
                Email Address
              </label>

              <FaEnvelope
                aria-hidden="true"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                id="newsletter-email"
                name="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                className="w-full bg-white text-gray-900 pl-11 pr-4 py-3.5 rounded-xl outline-none border-2 border-transparent focus:border-blue-300 transition placeholder:text-gray-400"
              />
            </div>

            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 px-8 py-3.5 rounded-xl font-bold transition duration-300 shadow-md hover:shadow-lg"
            >
              Subscribe
            </button>
          </form>

          {/* PRIVACY MESSAGE */}
          <p className="text-xs text-blue-100/80 mt-3">
            No spam. Just great deals and updates from ShopEase.
          </p>
        </div>

        {/* MESSAGE */}
        {message && (
          <p
            role="status"
            aria-live="polite"
            className={`mt-5 text-sm md:text-base font-semibold ${
              message.includes("valid")
                ? "text-red-200"
                : "text-green-200"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </section>
  );
}

export default Newsletter;