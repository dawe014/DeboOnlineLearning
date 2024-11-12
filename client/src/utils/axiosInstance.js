import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api', // Your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Add a request interceptor to attach the token to the headers
axiosInstance.interceptors.request.use(
  (config) => {
    // Retrieve token from localStorage (or other storage)
    const token = localStorage.getItem('token');
    
    // If a token exists, add it to the Authorization header
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    // Handle request error here
    return Promise.reject(error);
  }
);

// You can also add a response interceptor if needed
axiosInstance.interceptors.response.use(
  (response) => {
    // Any response-specific logic can go here
    return response;
  },
  (error) => {
    // Handle response errors (e.g., token expiration, unauthorized access)
    if (error.response.status === 401) {
      // Redirect to login page if unauthorized
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
