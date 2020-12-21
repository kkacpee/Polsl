import axios from 'axios';
import Store from '../Store';
import history from '../Helpers/HistoryHelper'
import { setAlert } from './AlertActions';

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
    if(response.config.method !== "options" && response.config.method !== "get"){
      if(response.status === 201){
        Store.dispatch(setAlert(true, "success", "Created successfully"));
      }
      else if(response.config.method === "delete"){
        Store.dispatch(setAlert(true, "success", "Deleted successfully"));
      }
      else if(response.config.method === "put"){
        Store.dispatch(setAlert(true, "success", "Updated successfully"));
      }
      else {
        Store.dispatch(setAlert(true, "success", "Success"));
      }
    }
    return response;
}, function (error) {
    if (401 === error.response.status) {
        Store.getState().Auth.token = "";
        Store.getState().Auth.authenticated = false;
        Store.dispatch(setAlert(true, "error", "Please log in with valid credentials"));
        history.push("/login");
        return Promise.reject(error);
    } else if (400 === error.response.status) {
      if(error.response.data.validationErrors){
        let message = JSON.stringify(error.response.data.validationErrors, null, 2).replace(/[\}\{\[\]"\,]+/g,"");
        Store.dispatch(setAlert(true, "error", message));
      }
      else {
        console.log(error.response)
      }
    } else if (500 === error.response.status) {
      Store.dispatch(setAlert(true, "error", error.response.data.error));
    } else {
        return Promise.reject(error);
    }
});