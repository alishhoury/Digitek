import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost/api/v0.1",
    withCredentials: true,
});

export default api;