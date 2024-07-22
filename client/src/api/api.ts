import AuthContext from '@/contexts/AuthContext';
import { BASE_PATH } from '@/router/router.const';
import axios from 'axios';
import { useContext } from 'react';

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const Api = axios.create({
  baseURL: `${VITE_BASE_URL}`,
  responseType: 'json',
  withCredentials: true,
});

Api.interceptors.request.use(
  config => {
    const { accessToken } = useContext(AuthContext);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

Api.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const { logout, setAccessToken, refreshToken } = useContext(AuthContext);
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      if (refreshToken) {
        try {
          const response = await axios.post(`${BASE_PATH}/refreshToken`, { refreshToken });
          const newAccessToken = response.data.accessToken;
          setAccessToken(newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(originalRequest);
        } catch (error) {
          logout();
        }
      }
    }
    return Promise.reject(error);
  }
);

export default Api;
