import axios from 'axios';
import Store from '../Store';
import history from '../Helpers/HistoryHelper'

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

  apiClient.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (401 === error.response.status) {
        Store.getState().Auth.token = "";
        Store.getState().Auth.authenticated = false;
        history.push("/login");
        return Promise.reject(error);
    } else {
        return Promise.reject(error);
    }
});