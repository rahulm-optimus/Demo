import axios from "axios";
import config from "./config";

const api = axios.create({
  baseURL: config[process.env.REACT_APP_ENV].apiUrl,
});

// Add a request interceptor
api.interceptors.request.use(
  async (config) => {

    //calling logic to get the authorization token from Auth2.0

    // config.headers.Authorization = `Bearer ${ received token }`;
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

export default api;
