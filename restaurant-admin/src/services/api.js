import axios from 'axios';

const api = axios.create({
  baseURL: 'https://restaurant-project-otyw.onrender.com/api',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
