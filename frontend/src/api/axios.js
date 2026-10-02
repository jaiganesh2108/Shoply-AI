
import axios from "axios";
import { redirectToLogin } from "./authUtils";

// Remove trailing slashes from the API URL automatically
const API_ROOT = (
    import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"
).replace(/\/+$/, "");

const api = axios.create({
    baseURL: `${API_ROOT}/api/`,
});