import axios from 'axios';

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

export default instance;
