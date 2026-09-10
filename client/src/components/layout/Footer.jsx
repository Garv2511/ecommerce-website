import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaArrowUp,
} from "react-icons/fa";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-slate-950 text-gray-300">

      {/* ================= MAIN FOOTER ================= */}
      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* ================= SHOP EASE ================= */}
          <div>
            <Link
              to="/"
              className="inline-block text-3xl font-bold text-blue-400 hover:text-blue-300 transition"
            >
              ShopEase
            </Link>

            <p className="text-gray-400 leading-relaxed mt-5 max-w-sm">
              Your trusted online shopping destination for quality products,
              secure payments, great deals, and fast delivery.
            </p>

            {/* SOCIAL ICONS */}
            <div className="flex gap-3 mt-7">

              <a
                href="#"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 hover:text-white transition duration-300"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-pink-600 hover:border-pink-600 hover:text-white transition duration-300"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-sky-500 hover:border-sky-500 hover:text-white transition duration-300"
              >
                <FaTwitter />
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-blue-700 hover:border-blue-700 hover:text-white transition duration-300"
              >
                <FaLinkedinIn />
              </a>

            </div>
          </div>

          {/* ================= QUICK LINKS ================= */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">
              Quick Links
            </h3>

            <ul className="space-y-4">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition duration-300"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/products"
                  className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition duration-300"
                >
                  Products
                </Link>
              </li>

              <li>
                <Link
                  to="/cart"
                  className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition duration-300"
                >
                  Cart
                </Link>
              </li>

              <li>
                <Link
                  to="/wishlist"
                  className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition duration-300"
                >
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* ================= CUSTOMER SUPPORT ================= */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">
              Customer Support
            </h3>

            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition duration-300"
                >
                  FAQs
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition duration-300"
                >
                  Shipping
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition duration-300"
                >
                  Returns
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition duration-300"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* ================= CONTACT ================= */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">
              Contact Us
            </h3>

            <ul className="space-y-5">

              <li className="flex items-start gap-3">
                <FaEnvelope className="text-blue-400 mt-1 shrink-0" />
                <span className="text-gray-400">
                  support@shopease.com
                </span>
              </li>

              <li className="flex items-start gap-3">
                <FaPhone className="text-blue-400 mt-1 shrink-0" />
                <span className="text-gray-400">
                  +91 98765 43210
                </span>
              </li>

              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-blue-400 mt-1 shrink-0" />
                <span className="text-gray-400">
                  Chandigarh, India
                </span>
              </li>

            </ul>
          </div>

        </div>
      </div>

      {/* ================= BOTTOM BAR ================= */}
      <div className="border-t border-slate-800">

        <div className="max-w-7xl mx-auto px-6 py-6">

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">

            <p className="text-gray-500 text-sm text-center md:text-left">
              © {new Date().getFullYear()} ShopEase. All rights reserved.
            </p>

            <p className="text-gray-500 text-sm text-center">
              Made with ❤️ for a better shopping experience.
            </p>

            {/* BACK TO TOP */}
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition duration-300"
            >
              <FaArrowUp />
            </button>

          </div>

        </div>
      </div>

    </footer>
  );
}

export default Footer;