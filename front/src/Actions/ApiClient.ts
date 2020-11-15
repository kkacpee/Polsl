import axios from 'axios';
import Store from '../Store';

export const apiClient = axios.create({
    baseURL: `${process.env.REACT_APP_API_URI}`,
  });

  apiClient.interceptors.request.use(
    (config) => {
      const state = Store.getState();
      const token = state.Auth.token;
    
      if (token !== "") {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );