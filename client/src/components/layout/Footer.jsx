import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">

      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">

        {/* Company */}

        <div>
          <h2 className="text-3xl font-bold text-white">
            ShopEase
          </h2>

          <p className="mt-4">
            ShopEase is your trusted online shopping destination offering
            quality products, secure payments and fast delivery.
          </p>
        </div>

        {/* Quick Links */}

        <div>
          <h3 className="text-xl font-semibold text-white mb-4">
            Quick Links
          </h3>

          <ul className="space-y-3">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Products</li>
            <li className="hover:text-white cursor-pointer">Cart</li>
            <li className="hover:text-white cursor-pointer">Wishlist</li>
          </ul>
        </div>

        {/* Customer */}

        <div>
          <h3 className="text-xl font-semibold text-white mb-4">
            Customer Support
          </h3>

          <ul className="space-y-3">
            <li>FAQs</li>
            <li>Shipping</li>
            <li>Returns</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Contact */}

        <div>
          <h3 className="text-xl font-semibold text-white mb-4">
            Connect With Us
          </h3>

          <p>Email: support@shopease.com</p>
          <p>Phone: +91 98765 43210</p>

          <div className="flex gap-4 mt-6 text-2xl">

            <FaFacebook className="hover:text-blue-500 cursor-pointer transition" />

            <FaInstagram className="hover:text-pink-500 cursor-pointer transition" />

            <FaLinkedin className="hover:text-blue-400 cursor-pointer transition" />

            <FaGithub className="hover:text-white cursor-pointer transition" />

          </div>

        </div>

      </div>

      <div className="border-t border-gray-700 py-6 text-center">

        © 2026 ShopEase. All Rights Reserved.

      </div>

    </footer>
  );
}

export default Footer;