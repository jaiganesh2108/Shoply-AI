import { useEffect, useState } from "react";
import { getOrders } from "../api/orders";

function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const data = await getOrders();
            setOrders(data);
        } catch (error) {
            console.error(error.response?.data || error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <h2>Loading orders...</h2>;
    }

    if (orders.length === 0) {
        return <h2>No orders yet.</h2>;
    }

    return (
        <div>
            <h1>My Orders</h1>

            {orders.map((order) => (
                <div
                    key={order.id}
                    style={{
                        border: "1px solid gray",
                        padding: "10px",
                        marginBottom: "15px",
                    }}
                >
                    <h2>Order #{order.id}</h2>

                    <p>Status: {order.status}</p>

                    <p>Total: £{order.total_price}</p>

                    <p>
                        Created:
                        {" "}
                        {new Date(order.created_at).toLocaleString()}
                    </p>

                    <h3>Items</h3>

                    <ul>
                        {order.items.map((item) => (
                            <li key={item.id}>
                                {item.product_name}
                                {" — "}
                                Qty: {item.quantity}
                                {" — "}
                                £{item.price}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default Orders;