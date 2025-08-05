import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/api';

// Set up Axios interceptor to include token in headers
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Authentication APIs
export const createUser = async (userData) => {
  return await axios.post(`${API_URL}/createuser`, userData);
};

export const login = async (credentials) => {
  return await axios.post(`${API_URL}/users`, credentials);
};

export const forgotPassword = async (emailData) => {
  return await axios.post(`${API_URL}/users/forgot-password`, emailData);
};

// Job APIs
export const getJobs = async ({ search = '', page = 1, per_page = 10 }) => {
  return await axios.get(`${API_URL}/jobs`, {
    params: { search, page, per_page },
  });
};

export const addJob = async (jobData) => {
  return await axios.post(`${API_URL}/jobs/create`, jobData);
};

export const updateJob = async (id, jobData) => {
  return await axios.put(`${API_URL}/jobs/${id}`, jobData);
};

export const deleteJob = async (id) => {
  return await axios.delete(`${API_URL}/jobs/${id}`);
};