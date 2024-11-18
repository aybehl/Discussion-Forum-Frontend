import axios from "axios";

const apiUrl = import.meta.env.VITE_APP_BACKEND_BASE_URL;
console.log('apiUrl - ' , apiUrl);
const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("jwtToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    console.log('Request sent:', config);
    return config;
  },
  (error) => {
    // Handle request errors
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // You can process response data here
    console.log('Response received:', response);
    return response;
  },
  (error) => {
    // Handle response errors
    if (error.response) {
      console.error('Response error:', error.response.data);
    } else {
      console.error('Network error:', error.message);
    }
    return Promise.reject(error);
  }
);


export default axiosInstance;