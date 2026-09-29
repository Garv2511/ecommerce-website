import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaUserPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import {
  getUsers,
  saveUsers,
  saveCurrentUser,
} from "../utils/storage";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  // ================= HANDLE INPUT =================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= REGISTER =================

  const handleRegister = (event) => {
    event.preventDefault();

    const {
      name,
      email,
      phone,
      password,
      confirmPassword,
    } = formData;

    // ================= VALIDATION =================

    if (
      !name.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !password ||
      !confirmPassword
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      toast.error(
        "Please enter a valid 10-digit phone number."
      );
      return;
    }

    if (password.length < 6) {
      toast.error(
        "Password must be at least 6 characters long."
      );
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    // ================= GET USERS =================

    const users = getUsers();

    // ================= CHECK EMAIL =================

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = users.find(
  (user) =>
    user?.email?.toLowerCase() === normalizedEmail
);

    if (existingUser) {
      toast.error(
        "An account with this email already exists."
      );
      return;
    }

    // ================= CREATE USER =================

    const newUser = {
  id: `USR-${Date.now()}`,
  name: name.trim(),
  email: normalizedEmail,
  phone: phone.trim(),
  password,
  role: "customer",
  createdAt: new Date().toISOString(),
};

    // ================= SAVE USER =================

    users.push(newUser);

    saveUsers(users);

// ================= LOGIN USER =================

// Save logged-in user without password
const { password: _, ...safeUser } = newUser;

saveCurrentUser(safeUser);

    // Notify Navbar and other components

    window.dispatchEvent(
      new Event("userUpdated")
    );

    // ================= SUCCESS =================

    toast.success(
      `Welcome to ShopEase, ${newUser.name}! 🎉`
    );

    // ================= REDIRECT =================

    setTimeout(() => {
      navigate("/");
    }, 800);
  };

  // ================= RETURN =================

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12">

      <div className="w-full max-w-lg">

        <div className="bg-white rounded-2xl shadow-lg p-8">

          {/* Icon */}

          <div className="flex justify-center mb-5">

            <div className="bg-blue-100 text-blue-600 p-4 rounded-full">
              <FaUserPlus className="text-3xl" />
            </div>

          </div>

          {/* Heading */}

          <div className="text-center mb-8">

            <h1 className="text-3xl font-bold text-gray-900">
              Create Account
            </h1>

            <p className="text-gray-500 mt-2">
              Join ShopEase and start shopping today.
            </p>

          </div>

          {/* Form */}

          <form
            onSubmit={handleRegister}
            className="space-y-5"
          >

            {/* Name */}

            <div>

              <label
                htmlFor="register-name"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Full Name
              </label>

              <input
                id="register-name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                autoComplete="name"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            {/* Email */}

            <div>

              <label
                htmlFor="register-email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email Address
              </label>

              <input
                id="register-email"
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

            {/* Phone */}

            <div>

              <label
                htmlFor="register-phone"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Phone Number
              </label>

              <input
                id="register-phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="10-digit mobile number"
                autoComplete="tel"
                pattern="[0-9]{10}"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            {/* Password */}

            <div>

              <label
                htmlFor="register-password"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Password
              </label>

              <div className="relative">

                <input
                  id="register-password"
                  name="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  autoComplete="new-password"
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

            {/* Confirm Password */}

            <div>

              <label
                htmlFor="register-confirm-password"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Confirm Password
              </label>

              <div className="relative">

                <input
                  id="register-confirm-password"
                  name="confirmPassword"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      (prev) => !prev
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  aria-label={
                    showConfirmPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>

              </div>

            </div>

            {/* Register Button */}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold transition"
            >
              Create Account
            </button>

          </form>

          {/* Login Link */}

          <div className="text-center mt-6">

            <p className="text-gray-500">

              Already have an account?{" "}

              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                Login
              </Link>

            </p>

          </div>

        </div>

      </div>

    </main>
  );
}

export default Register;