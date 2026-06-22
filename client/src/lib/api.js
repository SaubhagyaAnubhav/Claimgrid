import axios from "axios";

// Automatically strip trailing "/api" or "/api/" if present,
// since our API requests already prepend "/api" (e.g. "/api/grid", "/api/users/session").
let baseURL = import.meta.env.VITE_API_URL || "http://localhost:5001";
if (baseURL.endsWith("/api/")) {
  baseURL = baseURL.slice(0, -5);
} else if (baseURL.endsWith("/api")) {
  baseURL = baseURL.slice(0, -4);
}

const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

export default api;
