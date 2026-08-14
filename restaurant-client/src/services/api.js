import axios from 'axios';

const api = axios.create({
  baseURL: 'https://restaurant-project-otyw.onrender.com/api',
});

export default api;
