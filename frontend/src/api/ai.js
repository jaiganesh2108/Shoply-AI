import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/ai";

export const sendMessage = async (message) => {
    const response = await axios.post(
        `${API_URL}/chat/`,
        {
            message: message,
        }
    );

    return response.data;
};