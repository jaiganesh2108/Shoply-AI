import api from "./axios";

export const registerUser = async (data) => {
    const response = await api.post("register/", data);
    return response.data;
};