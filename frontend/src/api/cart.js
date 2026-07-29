import api from "./axios";

export const addToCart = async (productId, quantity = 1) => {
    const response = await api.post("cart/", {
        product_id: productId,
        quantity: quantity,
    });

    return response.data;
};

export const getCart = async () => {
    const response = await api.get("cart/");
    return response.data;
};

export const deleteCartItem = async (id) => {
    await api.delete(`cart/${id}/`);
};