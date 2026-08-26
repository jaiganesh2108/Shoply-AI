import api from "./axios";

export const createPayment = async (data) => {
    const response = await api.post("payments/", data);
    return response.data;
};

export const getPayments = async () => {
    const response = await api.get("payments/");
    return response.data;
};