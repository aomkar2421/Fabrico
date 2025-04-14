// import axios from 'axios';

// // export const API_BASE_URL = "http://35.175.218.197:8080"
// export const API_BASE_URL = "http://localhost:8080"

// const jwt=localStorage.getItem("jwt");

// export const api=axios.create({
//     baseURL: API_BASE_URL,
//     headers: {
//     "Authorization": `Bearer ${jwt}`,
//     "Content-Type": "application/json"
//     }
// })


import axios from 'axios';

export const API_BASE_URL = "http://13.218.81.219:8080"
// export const API_BASE_URL = "http://localhost:8080"

// Create a function to get the current JWT token
const getJwtToken = () => localStorage.getItem("jwt");

// Create axios instance with dynamic auth header
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

// Add request interceptor to include auth token on each request if available
api.interceptors.request.use(
  (config) => {
    const token = getJwtToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);