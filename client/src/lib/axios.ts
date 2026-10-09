import axios, { AxiosError } from 'axios';

const api = axios.create({
  baseURL: '/api/v1',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    const url = originalRequest?.url || '';

    // Auth endpoints that should never attempt token refresh
    const isAuthEndpoint =
      url.includes('/auth/login') ||
      url.includes('/auth/admin/login') ||
      url.includes('/auth/register') ||
      url.includes('/auth/refresh-token') ||
      url.includes('/auth/me') ||
      url.includes('/auth/forgot-password') ||
      url.includes('/auth/reset-password');

    if (error.response?.status === 401 && originalRequest && !(originalRequest as any)._retry && !isAuthEndpoint) {
      (originalRequest as any)._retry = true;
      try {
        await axios.post('/api/v1/auth/refresh-token', {}, { withCredentials: true });
        return api(originalRequest);
      } catch (refreshError) {
        const path = window.location.pathname;
        if (!path.startsWith('/login') && !path.startsWith('/admin/login') && !path.startsWith('/register') && path !== '/') {
          window.location.href = path.startsWith('/admin') ? '/admin/login' : '/login';
        }
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export { api };
export default api;
