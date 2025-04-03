import axios from "axios";

const baseURL = import.meta.env.VITE_SERVER_URL; // Khi production, sử dụng URL thật

const instance = axios.create({ baseURL });

// instance.interceptors.request.use((config) => {
//   console.log("Request URL:", config.url);
//   console.log("Request params:", config.params);
//   console.log("Request data:", config.data);
//   return config;
// });
export default instance;