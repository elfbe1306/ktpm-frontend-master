import axios from "axios";

// http://localhost:5174

export const axiosClient = axios.create({
    baseURL: "http://localhost:5174/api",
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 30000,
})