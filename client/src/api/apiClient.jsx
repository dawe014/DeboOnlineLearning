import axios from 'axios';

// Create an instance of Axios
const apiClient = axios.create({
  baseURL: 'http://localhost:3000', // Replace with your API's base URL
});

// Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Dynamically add the token from localStorage
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => response, // Return successful responses as-is
  async (error) => {
    // Handle token expiry (401 Unauthorized error)
    if (error.response?.status === 401) {
      console.error('Token expired or unauthorized. Logging out...');
      localStorage.removeItem('token'); // Remove invalid token
      window.location.href = '/login'; // Redirect to login page
    }
    return Promise.reject(error); // Pass error to calling code
  }
);

export default apiClient;
