import axios from 'axios';

const token = localStorage.getItem('token'); // Get token from localStorage

const apiClient = axios.create({
  baseURL: 'http://localhost:3000', // Replace with your base URL
  headers: {
    Authorization: `Bearer ${token}`, // Include the token in the Authorization header
  },
});

export default apiClient;
