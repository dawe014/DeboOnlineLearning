import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/',
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response, 
  async (error) => {
    if (error.response?.status === 401) {
      console.error('Token expired or unauthorized. Logging out...');
      localStorage.removeItem('token'); 
      window.location.href = '/login'; 
    }
    return Promise.reject(error); 
  }
);

export default apiClient;
