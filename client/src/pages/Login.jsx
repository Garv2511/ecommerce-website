import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaSignInAlt } from "react-icons/fa";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  // ================= HANDLE INPUT =================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= LOGIN =================

  const handleLogin = (event) => {
    event.preventDefault();

    const { email, password } = formData;

    // Empty field validation

    if (!email || !password) {
      toast.error("Please enter your email and password.");
      return;
    }

    // Get registered users

    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    // Find matching user

    const user = users.find(
      (item) =>
        item.email.toLowerCase() ===
          email.toLowerCase() &&
        item.password === password
    );

    // Invalid login

    if (!user) {
      toast.error("Invalid email or password.");
      return;
    }

    // Save logged-in user

    localStorage.setItem(
      "currentUser",
      JSON.stringify(user)
    );

    // Notify other components

    window.dispatchEvent(
      new Event("userUpdated")
    );

    toast.success(`Welcome back, ${user.name}! 👋`);

    // Redirect

    setTimeout(() => {
      navigate("/");
    }, 800);
  };

  // ================= RETURN =================

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12">

      <div className="w-full max-w-md">

        {/* Card */}

        <div className="bg-white rounded-2xl shadow-lg p-8">

          {/* Icon */}

          <div className="flex justify-center mb-5">

            <div className="bg-blue-100 text-blue-600 p-4 rounded-full">
              <FaSignInAlt className="text-3xl" />
            </div>

          </div>

          {/* Heading */}

          <div className="text-center mb-8">

            <h1 className="text-3xl font-bold text-gray-900">
              Welcome Back
            </h1>

            <p className="text-gray-500 mt-2">
              Login to continue shopping with ShopEase.
            </p>

          </div>

          {/* Form */}

          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >

            {/* Email */}

            <div>

              <label
                htmlFor="login-email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email Address
              </label>

              <input
                id="login-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                autoComplete="email"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>


            {/* Password */}

            <div>

              <label
                htmlFor="login-password"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Password
              </label>

              <div className="relative">

                <input
                  id="login-password"
                  name="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      (prev) => !prev
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>

              </div>

            </div>


            {/* Login Button */}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold transition"
            >
              Login
            </button>

          </form>


          {/* Register */}

          <div className="text-center mt-6">

            <p className="text-gray-500">

              Don't have an account?{" "}

              <Link
                to="/register"
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                Create Account
              </Link>

            </p>

          </div>

        </div>

      </div>

    </main>
  );
}

export default Login;

