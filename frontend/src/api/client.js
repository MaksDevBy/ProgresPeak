import axios from "axios";


const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  withCredentials: true,
});


api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
      if (
          error.response?.status === 401 &&
          !originalRequest._retry &&
          originalRequest.url !== "/token/refresh/"
      ) {
          originalRequest._retry = true;
      try {
        await api.post('/token/refresh/', {});
        return api(originalRequest); // Повторить исходный запрос
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        // Перенаправить на логин
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;