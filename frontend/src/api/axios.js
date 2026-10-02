
import axios from "axios";
import { redirectToLogin } from "./authUtils";

// Get the API URL and remove trailing slashes
const API_ROOT = (
    import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"
).replace(/\/+$/, "");

// Create Axios instance
const api = axios.create({
    baseURL: `${API_ROOT}/api/`,
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access");

        const publicRoutes = [
            "register/",
            "login/",
            "refresh/",
        ];

        const requestUrl = config.url || "";

        const isPublicRoute = publicRoutes.some((route) =>
            requestUrl.includes(route)
        );

        if (token && !isPublicRoute) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;
        const requestUrl = error.config?.url || "";

        const isAuthEndpoint = [
            "login/",
            "register/",
            "refresh/",
        ].some((route) => requestUrl.includes(route));

        if (
            (status === 401 || status === 403) &&
            !isAuthEndpoint
        ) {
            redirectToLogin();
        }

        return Promise.reject(error);
    }
);

export default api;