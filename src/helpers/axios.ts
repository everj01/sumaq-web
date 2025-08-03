import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token solo si existe y no es login/register
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  const isAuthRoute = config.url?.includes('/login') || config.url?.includes('/register');

  console.log('TOKEN', token);
  console.log('RUTA', isAuthRoute);

  if (token && !isAuthRoute) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
