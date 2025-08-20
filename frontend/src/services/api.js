import axios from 'axios';

// 1. Create a new axios instance with a custom configuration
const api = axios.create({
  // Set the base URL for all API requests
  baseURL: 'http://localhost:5000/api/v1', // <-- IMPORTANT: Replace with your actual backend URL
  withCredentials: true,
});


api.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await generateRefreshToken();
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
      }
    }
    return Promise.reject(error);
  }
);


const generateRefreshToken = async () => {
  try {
    await api.get("/refresh-Token");
  } catch (error) {
    console.error(error);
    toast.error(error?.response?.data?.error?.message);
  }
}




export default api;

