import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/layout/Navbar";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import OrderTracking from "./pages/OrderTracking";
import AdminOrders from "./pages/admin/AdminOrders";
import NotFound from "./pages/NotFound";


function App() {
  return (
    <>
      <Navbar />

      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 2500,
        }}
      />

      <Routes>
        {/* ================= MAIN PAGES ================= */}

        <Route path="/" element={<Home />} />

        <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/products/:id"
          element={<ProductDetails />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/wishlist"
          element={<Wishlist />}
        />

        {/* ================= CHECKOUT ================= */}

        <Route
          path="/checkout"
          element={<Checkout />}
        />

        {/* ================= ORDERS ================= */}

        <Route
          path="/order-success/:orderId"
          element={<OrderSuccess />}
        />

        <Route
          path="/orders"
          element={<Orders />}
        />

        <Route
          path="/order-details/:orderId"
          element={<OrderDetails />}
        />

        <Route
  path="/order-tracking/:orderId"
  element={<OrderTracking />}
  />

        {/* ================= ADMIN ================= */}

        <Route
          path="/admin/orders"
          element={<AdminOrders />}
        />
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </>
  );
}

export default App;