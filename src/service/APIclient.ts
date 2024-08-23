import axios, { AxiosInstance } from 'axios';
import { BASE_URL } from '../library';

class APIClient {
   axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create();
    this.axiosInstance.interceptors.request.use(config => {
      const jwt = localStorage.getItem('clocklikeminds_portal');

      if (config.headers) {
        config.headers.Authorization = `Bearer ${jwt}`;
      }
      config.baseURL = BASE_URL;
      return config;
    });
  }
}

export default new APIClient().axiosInstance;