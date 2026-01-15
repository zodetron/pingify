import axios from "axios";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api"

export const axiosInstance = axios.create({
  // baseURL: "http://localhost:5001/api",
  baseURL: BASE_URL,
  withCredentials: true, // 🔴 REQUIRED
});
