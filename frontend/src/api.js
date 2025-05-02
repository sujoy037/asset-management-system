import axios from 'axios';
import BASE_URL from './config'; // Import the base URL

// Create an Axios instance with the base URL
const api = axios.create({
  baseURL: BASE_URL,  // This will use the base URL from the config file
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
