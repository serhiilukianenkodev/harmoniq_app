import axios from 'axios';
import { store } from '../redux/store.js';
import { refreshUser } from '../redux/auth/operations.js';

const baseURL = 'https://harmoniq-backend-qo0h.onrender.com';

const instance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const setAuthHeader = token => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  delete instance.defaults.headers.common.Authorization;
};

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

instance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // Якщо токен протух і це не запит до /auth/refresh
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/auth/refresh')
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        // Якщо вже йде оновлення — ставимо запит у чергу
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: token => {
              originalRequest.headers['Authorization'] = `Bearer ${token}`;
              resolve(instance(originalRequest));
            },
            reject: err => reject(err),
          });
        });
      }

      isRefreshing = true;

      try {
        // Викликаємо refreshUser через store.dispatch
        const result = await store.dispatch(refreshUser());

        if (refreshUser.fulfilled.match(result)) {
          const newToken = result.payload.token;
          setAuthHeader(newToken);
          processQueue(null, newToken);
          return instance(originalRequest);
        } else {
          processQueue(result.error, null);
          return Promise.reject(result.error);
        }
      } catch (err) {
        processQueue(err, null);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
