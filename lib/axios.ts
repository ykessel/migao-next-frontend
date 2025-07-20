import axios from 'axios';

export const API_BASE_URL = process.env.NEXT_API_BASE_URL || 'https://rent-finder-rosy.vercel.app/api';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance; 