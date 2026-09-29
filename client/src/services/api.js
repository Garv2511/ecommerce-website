// ================= API SERVICE =================

const API_URL = import.meta.env.VITE_API_URL;

// HANDLE API RESPONSE
const handleResponse = async (response) => {
  if (!response.ok) {
    let message = "Something went wrong";

    try {
      const errorData = await response.json();

      if (errorData.message) {
        message = errorData.message;
      }
    } catch {
      // Response does not contain JSON
    }

    throw new Error(message);
  }

  return response.json();
};

// GET REQUEST
export const get = async (endpoint) => {
  const response = await fetch(`${API_URL}${endpoint}`);

  return handleResponse(response);
};

// POST REQUEST
export const post = async (endpoint, data) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return handleResponse(response);
};

// PUT REQUEST
export const put = async (endpoint, data) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return handleResponse(response);
};

// DELETE REQUEST
export const remove = async (endpoint) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: "DELETE",
  });

  return handleResponse(response);
};