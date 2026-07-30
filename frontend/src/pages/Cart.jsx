import { useEffect, useState } from "react";
import { getCart, deleteCartItem } from "../api/cart";
import { createOrder } from "../api/orders";
import { useNavigate, Link } from "react-router-dom";
import {
    ShoppingBag,
    Trash2,
    ArrowRight,
    AlertCircle,
    ShoppingCart,
} from "lucide-react";

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [removingId, setRemovingId] = useState(null);
    const [checkingOut, setCheckingOut] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

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

    const total = cartItems.reduce((sum, item) => {
        return sum + item.product.price * item.quantity;
    }, 0);

    const handleCheckout = async () => {
        setError("");
        setCheckingOut(true);
        try {
            const order = await createOrder({
                total_price: total,
            });

            navigate(`/payment/${order.id}`);
        } catch (error) {
            console.error(error.response?.data || error);
            setError("Checkout failed. Please try again.");
        } finally {
            setCheckingOut(false);
        }
    };

    const handleRemove = async (id) => {
        setRemovingId(id);
        try {
            await deleteCartItem(id);

            setCartItems((items) =>
                items.filter((item) => item.id !== id)
            );
        } catch (error) {
            console.error(error.response?.data || error);
        } finally {
            setRemovingId(null);
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
                .wrap { max-width: 880px; margin: 0 auto; }

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
                    margin: 0;
                    font-weight: 600;
                }

                .layout {
                    display: grid;
                    grid-template-columns: 1.5fr 1fr;
                    gap: 32px;
                    align-items: start;
                }

                .item-list {
                    display: flex;
                    flex-direction: column;
                    gap: 14px;
                }

                .item-card {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    border: 1px solid var(--line);
                    border-radius: 14px;
                    padding: 16px;
                    transition: opacity 0.2s ease;
                }
                .item-card.removing { opacity: 0.4; }

                .item-thumb {
                    width: 60px;
                    height: 60px;
                    border-radius: 10px;
                    background: var(--surface);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }
                .item-thumb svg { color: rgba(20,22,26,0.16); }

                .item-info { flex: 1; min-width: 0; }
                .item-info h2 {
                    font-size: 15px;
                    font-weight: 600;
                    margin: 0 0 4px;
                }
                .item-info .item-meta {
                    font-size: 13px;
                    color: var(--muted);
                }

                .item-subtotal {
                    font-size: 15px;
                    font-weight: 700;
                    white-space: nowrap;
                }

                .remove-btn {
                    background: none;
                    border: none;
                    cursor: pointer;
                    color: var(--muted);
                    display: flex;
                    align-items: center;
                    padding: 8px;
                    border-radius: 8px;
                    transition: background 0.15s ease, color 0.15s ease;
                }
                .remove-btn:hover { background: var(--danger-soft); color: var(--danger); }
                .remove-btn:disabled { opacity: 0.5; cursor: not-allowed; }

                .summary-card {
                    border: 1px solid var(--line);
                    border-radius: 16px;
                    padding: 24px;
                    position: sticky;
                    top: 24px;
                }
                .summary-card h3 {
                    font-size: 15px;
                    font-weight: 600;
                    margin: 0 0 18px;
                }
                .summary-row {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    font-size: 13.5px;
                    color: var(--muted);
                    padding: 8px 0;
                }
                .summary-total {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    font-size: 17px;
                    font-weight: 700;
                    padding-top: 14px;
                    margin-top: 6px;
                    border-top: 1px solid var(--line);
                }

                .error-banner {
                    display: flex;
                    align-items: flex-start;
                    gap: 8px;
                    background: var(--danger-soft);
                    color: var(--danger);
                    font-size: 13px;
                    padding: 11px 13px;
                    border-radius: 10px;
                    margin: 16px 0 0;
                    line-height: 1.4;
                }
                .error-banner svg { flex-shrink: 0; margin-top: 1px; }

                .btn-primary {
                    width: 100%;
                    background: var(--ink);
                    color: white;
                    border: none;
                    border-radius: 10px;
                    padding: 14px 20px;
                    font-size: 14.5px;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    cursor: pointer;
                    margin-top: 20px;
                    transition: background 0.15s ease, transform 0.15s ease, opacity 0.15s ease;
                }
                .btn-primary:hover:not(:disabled) { background: #000; transform: translateY(-1px); }
                .btn-primary:disabled { opacity: 0.65; cursor: not-allowed; transform: none; }

                .spinner {
                    width: 14px;
                    height: 14px;
                    border: 2px solid rgba(255,255,255,0.35);
                    border-top-color: white;
                    border-radius: 50%;
                    animation: spin 0.7s linear infinite;
                }
                @keyframes spin { to { transform: rotate(360deg); } }

                /* Skeleton */
                .skeleton-line {
                    border-radius: 8px;
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
                .empty p { font-size: 14px; margin: 0 0 20px; }
                .empty a {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    background: var(--ink);
                    color: white;
                    text-decoration: none;
                    font-size: 13.5px;
                    font-weight: 600;
                    padding: 11px 18px;
                    border-radius: 9px;
                }

                @media (max-width: 760px) {
                    .layout { grid-template-columns: 1fr; }
                    .summary-card { position: static; }
                }
                @media (max-width: 560px) {
                    .page { padding: 40px 20px 72px; }
                    .page-head h1 { font-size: 25px; }
                }
                @media (prefers-reduced-motion: reduce) {
                    .skeleton-line { animation: none; }
                    .spinner { animation: none; }
                }
            `}</style>

            <div className="wrap">
                <div className="page-head">
                    <span className="eyebrow">
                        <ShoppingCart size={12} strokeWidth={2.4} />
                        Cart
                    </span>
                    <h1 className="display">My Cart</h1>
                </div>

                {loading ? (
                    <div className="item-list">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div className="item-card" key={i}>
                                <div className="skeleton-line" style={{ width: 60, height: 60, borderRadius: 10 }} />
                                <div style={{ flex: 1 }}>
                                    <div className="skeleton-line" style={{ width: "40%", height: 14, marginBottom: 8 }} />
                                    <div className="skeleton-line" style={{ width: "25%", height: 12 }} />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : cartItems.length === 0 ? (
                    <div className="empty">
                        <ShoppingCart size={40} strokeWidth={1.4} />
                        <h3>Your cart is empty</h3>
                        <p>Add something you like, or let the agent find it for you.</p>
                        <Link to="/products">
                            Browse products <ArrowRight size={15} strokeWidth={2.2} />
                        </Link>
                    </div>
                ) : (
                    <div className="layout">
                        <div className="item-list">
                            {cartItems.map((item) => (
                                <div
                                    className={`item-card ${removingId === item.id ? "removing" : ""}`}
                                    key={item.id}
                                >
                                    <div className="item-thumb">
                                        <ShoppingBag size={24} strokeWidth={1.4} />
                                    </div>
                                    <div className="item-info">
                                        <h2>{item.product.name}</h2>
                                        <span className="item-meta">
                                            &#8377;{item.product.price} &times; {item.quantity}
                                        </span>
                                    </div>
                                    <span className="item-subtotal">
                                        &#8377;{item.product.price * item.quantity}
                                    </span>
                                    <button
                                        className="remove-btn"
                                        onClick={() => handleRemove(item.id)}
                                        disabled={removingId === item.id}
                                        aria-label={`Remove ${item.product.name}`}
                                    >
                                        <Trash2 size={17} strokeWidth={1.8} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="summary-card">
                            <h3>Order summary</h3>
                            <div className="summary-row">
                                <span>Items</span>
                                <span>{cartItems.length}</span>
                            </div>
                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>&#8377;{total}</span>
                            </div>
                            <div className="summary-total">
                                <span>Total</span>
                                <span>&#8377;{total}</span>
                            </div>

                            {error && (
                                <div className="error-banner">
                                    <AlertCircle size={15} strokeWidth={2.2} />
                                    <span>{error}</span>
                                </div>
                            )}

                            <button
                                className="btn-primary"
                                onClick={handleCheckout}
                                disabled={checkingOut}
                            >
                                {checkingOut ? (
                                    <span className="spinner" />
                                ) : (
                                    <>
                                        Proceed to checkout
                                        <ArrowRight size={16} strokeWidth={2.2} />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Cart;