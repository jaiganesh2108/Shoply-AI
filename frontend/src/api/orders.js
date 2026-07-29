import api from "./axios";

export const createOrder = async (data) => {
    const response = await api.post("orders/", data);
    return response.data;
};

export const getOrders = async () => {
    const response = await api.get("orders/");
    return response.data;
};