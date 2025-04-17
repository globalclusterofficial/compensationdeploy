import axios from "axios";
import { BASE_URL, WEBSITE_NAME } from "./constants";

// Create an Axios instance with base URL and default headers
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  // baseURL: "http://127.0.0.1:8000",
});

// Custom request interceptor
axiosInstance.interceptors.request.use((config) => {
  // Check if the data is FormData
  if (config.data instanceof FormData) {
    config.headers["Content-Type"] = "multipart/form-data";
  } else {
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});

// Helper function to get tokens from localStorage
const getTokensFromStorage = () => {
  const lc_storage = localStorage.getItem(`persist:${WEBSITE_NAME}:auth`);
  const lc_storage_obj = JSON.parse(lc_storage || "{}");
  return {
    accessToken: lc_storage_obj?.access?.replace(/"/g, ""),
    refreshToken: lc_storage_obj?.refresh?.replace(/"/g, ""),
  };
};

// Helper function to update access token in localStorage
const updateAccessTokenInStorage = (newAccessToken) => {
  const lc_storage = localStorage.getItem(`persist:${WEBSITE_NAME}:auth`);
  const lc_storage_obj = JSON.parse(lc_storage || "{}");
  lc_storage_obj.access = JSON.stringify(newAccessToken);
  localStorage.setItem(
    `persist:${WEBSITE_NAME}:auth`,
    JSON.stringify(lc_storage_obj),
  );
};

// Request interceptor to add authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const { accessToken } = getTokensFromStorage();
    const shouldExclude =
      (config.url.includes("/accounts/individuals/") ||
        config.url.includes("/accounts/companies/")) &&
      config.method === "POST";

    if (accessToken && !shouldExclude) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor to handle token refresh on 401 errors, excluding login URL
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle token expiration (401 error), excluding login URL
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/login")
    ) {
      originalRequest._retry = true;

      try {
        const { refreshToken } = getTokensFromStorage();
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }
        const response = await axios.post(
          `${BASE_URL}/api/v1/accounts/token/refresh/`,
          {
            refresh: refreshToken,
          },
        );
        const newAccessToken = response.data.access;
        updateAccessTokenInStorage(newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Failed to refresh token:", refreshError);
        // window.location.href = "/login"; // Redirect to login
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export { axiosInstance };
