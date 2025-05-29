import axios from 'axios';

const api = axios.create({
  baseURL: 'https://be-flood-sight.vercel.app/',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('profileData');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;