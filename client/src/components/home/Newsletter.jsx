import { useState } from "react";

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
    <section className="bg-blue-600 text-white py-20">
      <div className="max-w-4xl mx-auto text-center px-6">

        <h2 className="text-4xl font-bold">
          Stay Updated
        </h2>

        <p className="mt-4 text-blue-100">
          Subscribe to receive exclusive offers, new arrivals and exciting deals.
        </p>

        <form
          onSubmit={handleSubscribe}
          className="flex flex-col md:flex-row gap-4 justify-center mt-10"
        >

          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 max-w-md px-5 py-3 rounded-lg text-black outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            type="submit"
            className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition"
          >
            Subscribe
          </button>

        </form>

        {message && (
          <p className="mt-5 text-lg font-medium">
            {message}
          </p>
        )}

      </div>
    </section>
  );
}

export default Newsletter;