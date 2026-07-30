import { useEffect, useState } from "react";
import { getOrders } from "../api/orders";
import { PackageSearch, Clock, Truck, CheckCircle2, XCircle } from "lucide-react";

const STATUS_STYLES = {
    pending: { icon: Clock, className: "pending" },
    processing: { icon: Clock, className: "pending" },
    shipped: { icon: Truck, className: "shipped" },
    delivered: { icon: CheckCircle2, className: "delivered" },
    completed: { icon: CheckCircle2, className: "delivered" },
    cancelled: { icon: XCircle, className: "cancelled" },
};

function statusMeta(status) {
    const key = (status || "").toLowerCase();
    return STATUS_STYLES[key] || { icon: Clock, className: "pending" };
}

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

    return (
        <div className="page">
            <style>{`
                :root {
                    --ink: #14161a;
                    --muted: #6b7280;
                    --line: #eceef1;
                    --surface: #f7f8fa;
                    --white: #ffffff;
                    --accent: #5046e5;
                    --accent-soft: #eef0fd;
                    --mint: #12b886;
                    --mint-soft: #e9fbf5;
                    --warn: #b54708;
                    --warn-soft: #fff6ed;
                    --info: #175cd3;
                    --info-soft: #eff6ff;
                    --danger: #d92d20;
                    --danger-soft: #fef2f1;
                }
                * { box-sizing: border-box; }
                .page {
                    min-height: 100vh;
                    background: var(--white);
                    color: var(--ink);
                    font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
                    -webkit-font-smoothing: antialiased;
                    padding: 56px 32px 96px;
                }
                .display { font-family: "Space Grotesk", "Inter", sans-serif; }
                .wrap { max-width: 820px; margin: 0 auto; }

                .page-head { margin-bottom: 36px; }
                .eyebrow {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 12.5px;
                    font-weight: 600;
                    letter-spacing: 0.06em;
                    text-transform: uppercase;
                    color: var(--accent);
                    background: var(--accent-soft);
                    padding: 6px 12px;
                    border-radius: 100px;
                    margin-bottom: 16px;
                }
                .page-head h1 {
                    font-size: 30px;
                    letter-spacing: -0.02em;
                    margin: 0 0 8px;
                    font-weight: 600;
                }
                .page-head p { font-size: 14.5px; color: var(--muted); margin: 0; }

                .order-list {
                    display: flex;
                    flex-direction: column;
                    gap: 18px;
                }

                .order-card {
                    border: 1px solid var(--line);
                    border-radius: 16px;
                    overflow: hidden;
                    transition: box-shadow 0.2s ease;
                }
                .order-card:hover {
                    box-shadow: 0 16px 36px -26px rgba(20, 22, 26, 0.3);
                }

                .order-head {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 18px 22px;
                    background: var(--surface);
                    border-bottom: 1px solid var(--line);
                    flex-wrap: wrap;
                    gap: 10px;
                }
                .order-id-block h2 {
                    font-size: 15px;
                    font-weight: 600;
                    margin: 0 0 3px;
                }
                .order-id-block .date {
                    font-size: 12.5px;
                    color: var(--muted);
                }

                .status-pill {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 12.5px;
                    font-weight: 600;
                    padding: 6px 12px;
                    border-radius: 100px;
                    text-transform: capitalize;
                }
                .status-pill.pending { background: var(--warn-soft); color: var(--warn); }
                .status-pill.shipped { background: var(--info-soft); color: var(--info); }
                .status-pill.delivered { background: var(--mint-soft); color: var(--mint); }
                .status-pill.cancelled { background: var(--danger-soft); color: var(--danger); }

                .items-list {
                    list-style: none;
                    margin: 0;
                    padding: 6px 22px;
                }
                .item-row {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 12px 0;
                    border-bottom: 1px solid var(--line);
                    font-size: 14px;
                }
                .item-row:last-child { border-bottom: none; }
                .item-name { font-weight: 500; }
                .item-qty { color: var(--muted); font-size: 13px; margin-left: 8px; }
                .item-price { font-weight: 600; white-space: nowrap; }

                .order-foot {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 16px 22px;
                }
                .order-total-label { font-size: 13px; color: var(--muted); }
                .order-total { font-size: 17px; font-weight: 700; }

                /* Skeleton */
                .skeleton-card {
                    border: 1px solid var(--line);
                    border-radius: 16px;
                    padding: 22px;
                }
                .skeleton-line {
                    height: 12px;
                    border-radius: 6px;
                    background: linear-gradient(90deg, #f2f3f5 25%, #e9eaed 37%, #f2f3f5 63%);
                    background-size: 400% 100%;
                    animation: shimmer 1.4s ease infinite;
                }
                @keyframes shimmer {
                    0% { background-position: 100% 0; }
                    100% { background-position: -100% 0; }
                }

                .empty {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    padding: 90px 20px;
                    color: var(--muted);
                }
                .empty svg { color: #cfd3da; margin-bottom: 16px; }
                .empty h3 {
                    font-size: 17px;
                    color: var(--ink);
                    margin: 0 0 6px;
                    font-weight: 600;
                }
                .empty p { font-size: 14px; margin: 0; }

                @media (max-width: 560px) {
                    .page { padding: 40px 20px 72px; }
                    .page-head h1 { font-size: 25px; }
                    .order-head { flex-direction: column; align-items: flex-start; }
                }
                @media (prefers-reduced-motion: reduce) {
                    .skeleton-line { animation: none; }
                }
            `}</style>

            <div className="wrap">
                <div className="page-head">
                    <span className="eyebrow">
                        <PackageSearch size={12} strokeWidth={2.4} />
                        Order history
                    </span>
                    <h1 className="display">My Orders</h1>
                    <p>Track past purchases and what's on its way.</p>
                </div>

                {loading ? (
                    <div className="order-list">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div className="skeleton-card" key={i}>
                                <div className="skeleton-line" style={{ width: "30%", marginBottom: 14 }} />
                                <div className="skeleton-line" style={{ width: "60%", marginBottom: 10 }} />
                                <div className="skeleton-line" style={{ width: "45%" }} />
                            </div>
                        ))}
                    </div>
                ) : orders.length === 0 ? (
                    <div className="empty">
                        <PackageSearch size={40} strokeWidth={1.4} />
                        <h3>No orders yet</h3>
                        <p>Once you place an order, you'll see it here.</p>
                    </div>
                ) : (
                    <div className="order-list">
                        {orders.map((order) => {
                            const meta = statusMeta(order.status);
                            const StatusIcon = meta.icon;
                            return (
                                <div className="order-card" key={order.id}>
                                    <div className="order-head">
                                        <div className="order-id-block">
                                            <h2>Order #{order.id}</h2>
                                            <span className="date">
                                                {new Date(order.created_at).toLocaleString()}
                                            </span>
                                        </div>
                                        <span className={`status-pill ${meta.className}`}>
                                            <StatusIcon size={13} strokeWidth={2.4} />
                                            {order.status}
                                        </span>
                                    </div>

                                    <ul className="items-list">
                                        {order.items.map((item) => (
                                            <li className="item-row" key={item.id}>
                                                <span>
                                                    <span className="item-name">{item.product_name}</span>
                                                    <span className="item-qty">&times; {item.quantity}</span>
                                                </span>
                                                <span className="item-price">&#8377;{item.price}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="order-foot">
                                        <span className="order-total-label">Total</span>
                                        <span className="order-total">&#8377;{order.total_price}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Orders;
