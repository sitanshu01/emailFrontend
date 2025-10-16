import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/v1";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshAxios = axios.create({
          baseURL: API_BASE_URL,
          withCredentials: true,
        });
        await refreshAxios.post("/auth/refresh");
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Handle refresh token failure (e.g., redirect to login)
        console.error("Unable to refresh token", refreshError);
        // You might want to logout the user here
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
