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
                @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,500&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

                :root {
                    --paper: #FBFAF6;
                    --paper-dim: #F1EEE4;
                    --ink: #221D17;
                    --muted: #7A7568;
                    --line: #E2DDCF;
                    --rust: #C1432A;
                    --rust-soft: #F4E1D8;
                    --ledger: #5B6F52;
                    --ledger-soft: #E7EBE2;
                    --amber: #A8791F;
                    --amber-soft: #F3E9D3;
                    --slate: #3D5A73;
                    --slate-soft: #DFE7EC;
                    --white: #ffffff;
                }
                * { box-sizing: border-box; }
                .page {
                    min-height: 100vh;
                    background: var(--paper);
                    color: var(--ink);
                    font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
                    -webkit-font-smoothing: antialiased;
                    padding: 56px 32px 96px;
                }
                .display { font-family: "Fraunces", Georgia, serif; }
                .mono { font-family: "JetBrains Mono", "IBM Plex Mono", monospace; }
                .wrap { max-width: 820px; margin: 0 auto; }

                .page-head { margin-bottom: 36px; }
                .stamp-tag {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    font-family: "JetBrains Mono", monospace;
                    font-size: 11px;
                    font-weight: 600;
                    letter-spacing: 0.05em;
                    text-transform: uppercase;
                    color: var(--rust);
                    border: 1.5px dashed var(--rust);
                    padding: 6px 12px;
                    border-radius: 100px;
                    transform: rotate(-2deg);
                    margin-bottom: 16px;
                }
                .page-head h1 {
                    font-size: 30px;
                    letter-spacing: -0.01em;
                    margin: 0 0 8px;
                    font-weight: 500;
                }
                .page-head p { font-size: 14.5px; color: var(--muted); margin: 0; }

                .order-list {
                    display: flex;
                    flex-direction: column;
                    gap: 26px;
                }

                /* Each order is its own printed receipt */
                .order-card {
                    background: var(--white);
                    filter: drop-shadow(0 14px 28px rgba(34, 29, 23, 0.08));
                }
                .order-inner {
                    padding: 20px 22px 4px;
                    background-image:
                        radial-gradient(circle at 0 12px, var(--paper) 6px, transparent 6.5px),
                        radial-gradient(circle at 100% 12px, var(--paper) 6px, transparent 6.5px);
                }

                .order-head {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding-bottom: 16px;
                    border-bottom: 1px dashed var(--line);
                    flex-wrap: wrap;
                    gap: 10px;
                }
                .order-id-block h2 {
                    font-family: "JetBrains Mono", monospace;
                    font-size: 13px;
                    font-weight: 700;
                    letter-spacing: 0.03em;
                    margin: 0 0 3px;
                }
                .order-id-block .date {
                    font-family: "JetBrains Mono", monospace;
                    font-size: 11.5px;
                    color: var(--muted);
                }

                .status-pill {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    font-family: "JetBrains Mono", monospace;
                    font-size: 11px;
                    font-weight: 700;
                    letter-spacing: 0.02em;
                    padding: 6px 11px;
                    border-radius: 100px;
                    text-transform: uppercase;
                }
                .status-pill.pending { background: var(--amber-soft); color: var(--amber); }
                .status-pill.shipped { background: var(--slate-soft); color: var(--slate); }
                .status-pill.delivered { background: var(--ledger-soft); color: var(--ledger); }
                .status-pill.cancelled { background: var(--rust-soft); color: var(--rust); }

                .items-list {
                    list-style: none;
                    margin: 0;
                    padding: 4px 0;
                }
                .item-row {
                    display: flex;
                    align-items: baseline;
                    gap: 8px;
                    padding: 11px 0;
                    border-bottom: 1px dotted var(--line);
                    font-family: "JetBrains Mono", monospace;
                    font-size: 13px;
                }
                .item-row:last-child { border-bottom: none; }
                .item-name { font-weight: 500; white-space: nowrap; }
                .item-qty { color: var(--muted); font-size: 12px; }
                .item-fill { flex: 1; border-bottom: 1px dotted var(--line); margin-bottom: 3px; min-width: 8px; }
                .item-price { font-weight: 700; white-space: nowrap; }

                .order-foot {
                    display: flex;
                    align-items: baseline;
                    justify-content: flex-end;
                    gap: 10px;
                    padding: 16px 22px 20px;
                    border-top: 1px dashed var(--line);
                    margin-top: 4px;
                }
                .order-total-label {
                    font-family: "JetBrains Mono", monospace;
                    font-size: 11px;
                    letter-spacing: 0.06em;
                    text-transform: uppercase;
                    color: var(--muted);
                }
                .order-total { font-family: "JetBrains Mono", monospace; font-size: 17px; font-weight: 700; }

                .order-torn {
                    width: 100%;
                    height: 12px;
                    background: var(--white);
                    clip-path: polygon(0% 0%,100% 0%,100% 100%,95% 10%,90% 100%,85% 10%,80% 100%,75% 10%,70% 100%,65% 10%,60% 100%,55% 10%,50% 100%,45% 10%,40% 100%,35% 10%,30% 100%,25% 10%,20% 100%,15% 10%,10% 100%,5% 10%,0% 100%);
                }

                /* Skeleton */
                .skeleton-card {
                    border: 1px solid var(--line);
                    border-radius: 4px;
                    padding: 22px;
                    background: var(--white);
                }
                .skeleton-line {
                    height: 12px;
                    border-radius: 6px;
                    background: linear-gradient(90deg, var(--paper-dim) 25%, #e6e1d3 37%, var(--paper-dim) 63%);
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
                    border: 1.5px dashed var(--line);
                    border-radius: 8px;
                }
                .empty svg { color: #cdc6b4; margin-bottom: 16px; }
                .empty h3 {
                    font-family: "Fraunces", Georgia, serif;
                    font-size: 18px;
                    color: var(--ink);
                    margin: 0 0 6px;
                    font-weight: 500;
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
                    <span className="stamp-tag">
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
                                    <div className="order-inner">
                                        <div className="order-head">
                                            <div className="order-id-block">
                                                <h2>ORDER #{order.id}</h2>
                                                <span className="date">
                                                    {new Date(order.created_at).toLocaleString()}
                                                </span>
                                            </div>
                                            <span className={`status-pill ${meta.className}`}>
                                                <StatusIcon size={12} strokeWidth={2.6} />
                                                {order.status}
                                            </span>
                                        </div>

                                        <ul className="items-list">
                                            {order.items.map((item) => (
                                                <li className="item-row" key={item.id}>
                                                    <span className="item-name">{item.product_name}</span>
                                                    <span className="item-qty">&times;{item.quantity}</span>
                                                    <span className="item-fill" />
                                                    <span className="item-price">&#8377;{item.price}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="order-foot">
                                        <span className="order-total-label">Total</span>
                                        <span className="order-total">&#8377;{order.total_price}</span>
                                    </div>
                                    <div className="order-torn" />
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