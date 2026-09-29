// ================= STORAGE UTILITY =================

// SAFE JSON PARSER
const getStoredData = (key, fallback) => {
  try {
    const data = localStorage.getItem(key);

    if (!data) {
      return fallback;
    }

    return JSON.parse(data);
  } catch {
    return fallback;
  }
};


// ================= CURRENT USER =================

// GET CURRENT USER
export const getCurrentUser = () => {
  return getStoredData("currentUser", null);
};

// SAVE CURRENT USER
export const saveCurrentUser = (user) => {
  localStorage.setItem(
    "currentUser",
    JSON.stringify(user)
  );
};

// REMOVE CURRENT USER
export const removeCurrentUser = () => {
  localStorage.removeItem("currentUser");
};


// ================= CART =================

// GET CART
export const getCart = () => {
  return getStoredData("cart", []);
};

// SAVE CART
export const saveCart = (cart) => {
  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );
};

// REMOVE CART
export const removeCart = () => {
  localStorage.removeItem("cart");
};


// ================= ORDERS =================

// GET ORDERS
export const getOrders = () => {
  return getStoredData("orders", []);
};

// SAVE ORDERS
export const saveOrders = (orders) => {
  localStorage.setItem(
    "orders",
    JSON.stringify(orders)
  );
};


// ================= WISHLIST =================

// GET WISHLIST
export const getWishlist = () => {
  return getStoredData("wishlist", []);
};

// SAVE WISHLIST
export const saveWishlist = (wishlist) => {
  localStorage.setItem(
    "wishlist",
    JSON.stringify(wishlist)
  );
};


// ================= USERS =================

// GET USERS
export const getUsers = () => {
  return getStoredData("users", []);
};

// SAVE USERS
export const saveUsers = (users) => {
  localStorage.setItem(
    "users",
    JSON.stringify(users)
  );
};


// ================= LAST ORDER =================

// GET LAST ORDER
export const getLastOrder = () => {
  return getStoredData("lastOrder", null);
};

// SAVE LAST ORDER
export const saveLastOrder = (order) => {
  localStorage.setItem(
    "lastOrder",
    JSON.stringify(order)
  );
};