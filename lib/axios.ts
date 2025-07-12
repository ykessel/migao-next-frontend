import axios from 'axios';

export const API_BASE_URL = process.env.NEXT_API_BASE_URL;

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Debug the axios instance configuration
console.log('Axios instance baseURL:', axiosInstance.defaults.baseURL);

export default axiosInstance; 