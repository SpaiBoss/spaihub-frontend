import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
});

api.interceptors.request.use((config) => {
  const url = config.url || '';
  const isAdminRoute = url.startsWith('/api/admin') || url.startsWith('/api/auth/admin');
  const isContributorRoute = url.startsWith('/api/contributor');

  let token = null;
  if (isAdminRoute) {
    token = localStorage.getItem('adminToken');
  } else if (isContributorRoute) {
    token = localStorage.getItem('contributorToken');
  } else {
    token = localStorage.getItem('token');
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url || '';

    if (status === 401 && localStorage.getItem('token') && url.startsWith('/api/owner')) {
      localStorage.removeItem('token');
      if (!window.location.pathname.startsWith('/login')) {
        window.location.href = '/login';
      }
    }

    if (status === 401 && localStorage.getItem('adminToken') && url.startsWith('/api/admin')) {
      localStorage.removeItem('adminToken');
      if (!window.location.pathname.startsWith('/admin/login')) {
        window.location.href = '/admin/login';
      }
    }

    if (
      status === 401 &&
      localStorage.getItem('contributorToken') &&
      url.startsWith('/api/contributor') &&
      !url.startsWith('/api/contributor/auth')
    ) {
      localStorage.removeItem('contributorToken');
      if (!window.location.pathname.startsWith('/contributor/login')) {
        window.location.href = '/contributor/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;
