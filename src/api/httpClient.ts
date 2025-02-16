import axios from 'axios';
import i18next from 'i18next';
import { useAuthStore } from '../store/authStore';
import Cookies from 'js-cookie';
export const API_BASE_URL = '/api';

const httpClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

httpClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers['Accept-Language'] = i18next.language || 'en';
    return config;
  },
  (error) => Promise.reject(error)
);

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const { logout } = useAuthStore();
      logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default httpClient;
