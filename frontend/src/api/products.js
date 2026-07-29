import api from "./axios";

// Get all products
export const getProducts = async () => {
    const response = await api.get("products/");
    return response.data;
};

// Get one product
export const getProduct = async (id) => {
    const response = await api.get(`products/${id}/`);
    return response.data;
};