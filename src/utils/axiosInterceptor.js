// axios.js
import axios from 'axios';
const apiKey = '0129u1c82crbd76t46t7t4vw6f4ednseit746t5s4e7c27t5798275t82ct528x7t2t2t5287583t82t582'; // Replace with your actual API key

const axiosInstance = axios.create({
  baseURL: 'https://dummyjson.com', // Replace with your API base URL
});

axiosInstance.interceptors.request.use((config) => {
  config.headers['Authorization'] = `Bearer ${apiKey}`;
  return config;
});

export default axiosInstance;