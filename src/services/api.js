/* AUTO-FIX CHECKED: potential delimiter imbalance. Please review. */
// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`🔄 API Call: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Success: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error(`❌ API Error: ${error.config?.url}`, error.response?.status, error.message);
    return Promise.reject(error);
  }
);

// Reviews API
export const reviewsAPI = {
  getAll: (params = {}) => api.get('/reviews', { params }),
  getById: (id) => api.get(`/reviews/${id}`),
  create: (reviewData) => api.post('/reviews', reviewData),
  update: (id, reviewData) => api.put(`/reviews/${id}`, reviewData),
  delete: (id, userId) => api.delete(`/reviews/${id}`, { data: { userId } }),
  getUserReviews: (userId) => api.get(`/users/${userId}/reviews`),
};

// Restaurants API
export const restaurantsAPI = {
  search: (params) => api.get('/restaurants/search', { params }),
  getById: (id) => api.get(`/restaurants/${id}`),
  getReviews: (id) => api.get(`/restaurants/${id}/reviews`),
  getFeatured: () => api.get('/restaurants/featured'),
};

// Health check
export const healthCheck = () => api.get('/health');

export default api;