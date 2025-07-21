import axios from 'axios';

export const API_BASE_URL = process.env.NEXT_API_BASE_URL || 'https://rent-finder-rosy.vercel.app/api';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// axiosInstance.interceptors.request.use(async (config) => {
//   let token: string | null = null;
//   if (typeof window !== 'undefined') {
//     const session = await getSession();
//     // @ts-expect-error: access_token may be present in session but not typed
//     token = session?.access_token ?? null;
//   }
//   if (token) {
//     console.log('setting token ->', token)
//     config.headers = config.headers || {};
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });

export default axiosInstance; 