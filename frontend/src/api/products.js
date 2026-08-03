import api from "./axios";

// Get all products
export const getProducts = async (search = "") => {
    const response = await api.get(`products/?search=${search}`);
    return response.data;
};

// Get one product
export const getProduct = async (id) => {
    const response = await api.get(`products/${id}/`);
    return response.data;
};
