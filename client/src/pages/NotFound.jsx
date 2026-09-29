import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <section className="text-center">

        <p className="text-7xl font-extrabold text-blue-600">
          404
        </p>

        <h1 className="text-3xl font-bold text-gray-900 mt-4">
          Page Not Found
        </h1>

        <p className="text-gray-500 mt-3 max-w-md">
          Sorry, the page you're looking for doesn't exist or may have
          been moved.
        </p>

        <Link
          to="/"
          className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          Back to Home
        </Link>

      </section>
    </main>
  );
}

export default NotFound;