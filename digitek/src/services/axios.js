import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/v0.1",
  withCredentials: true,
});

export default api;
