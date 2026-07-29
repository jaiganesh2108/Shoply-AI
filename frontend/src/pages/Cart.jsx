import { useEffect, useState } from "react";
import { getCart, deleteCartItem } from "../api/cart";

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const data = await getCart();
            setCartItems(data);
        } catch (error) {
            console.error(error.response?.data || error);
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = async (id) => {
        try {
            await deleteCartItem(id);

            setCartItems((items) =>
                items.filter((item) => item.id !== id)
            );
        } catch (error) {
            console.error(error.response?.data || error);
        }
    };

    if (loading) {
        return <h2>Loading cart...</h2>;
    }

    if (cartItems.length === 0) {
        return <h2>Your cart is empty.</h2>;
    }

    const total = cartItems.reduce((sum, item) => {
        return sum + item.product.price * item.quantity;
    }, 0);

    return (
        <div>
            <h1>My Cart</h1>

            {cartItems.map((item) => (
                <div
                    key={item.id}
                    style={{
                        border: "1px solid gray",
                        padding: "10px",
                        marginBottom: "10px",
                    }}
                >
                    <h2>{item.product.name}</h2>

                    <p>Price: ₹{item.product.price}</p>

                    <p>Quantity: {item.quantity}</p>

                    <p>
                        Subtotal: ₹
                        {item.product.price * item.quantity}
                    </p>

                    <button
                        onClick={() => handleRemove(item.id)}
                    >
                        Remove
                    </button>
                </div>
            ))}

            <h2>Total: ₹{total}</h2>

            <button>Proceed to Checkout</button>
        </div>
    );
}

export default Cart;