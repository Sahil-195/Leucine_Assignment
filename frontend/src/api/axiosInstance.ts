import axios, { AxiosHeaders } from 'axios';
import { getCookieItem } from '../Utils/cookiesHelper';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_API_URL,
    withCredentials: true 
});

axiosInstance.interceptors.request.use(
    (config) => {

        config.withCredentials = true;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
