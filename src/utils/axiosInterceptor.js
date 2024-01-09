// axios.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://dummyjson.com', // U can Replace with your API base URL
});

axiosInstance.interceptors.request.use((config) => {
  return config;
});

export default axiosInstance;