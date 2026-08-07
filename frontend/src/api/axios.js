import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api',
  withCredentials: true, //Sends HttpOnly cookies
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest.retry) {
      originalRequest._retry = true;

      try {
        //Get new access token from refresh token
        const response = await api.post("auth/refresh")
        const newAccessToken = response.data.accessToken;

        //Update the token
        localStorage.setItem("token", newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        //Retry the original request
        return api(originalRequest);
      } catch (error) {
        localStorage.clear();
        window.location.href = "/signin";
        return Promise.reject(error);

      }
    }
    return Promise.reject(error);
  }
)

export default api;
