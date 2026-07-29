import api from "./axios";

export const getProducts = async (id) => {
    const response = await api.get(`products/${id}`);
    return response.data;
}