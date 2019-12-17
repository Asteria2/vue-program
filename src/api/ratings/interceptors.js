import axios from 'axios';
const axiosInstance = axios.create({
  // baseURL: 'http://localhost:9000/api',
  timeout: 15000
})
axiosInstance.interceptors.request.use((config) => {
  return config;
}, (error) => {
  return Promise.reject(error)
})
axiosInstance.interceptors.response.use((response) => {
  return response.data;
}, (error) => {
  return Promise.reject(error)
})
export default axiosInstance;
