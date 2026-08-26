import { useEffect, useState } from "react";
import { getCart, deleteCartItem } from "../api/cart";
import { createOrder } from "../api/orders";
import { useNavigate, Link } from "react-router-dom";
import { ShoppingBag, Trash2, ArrowRight, AlertCircle, ShoppingCart } from "lucide-react";

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
                .wrap { max-width: 880px; margin: 0 auto; }

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
                    margin: 0;
                    font-weight: 500;
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
                    gap: 12px;
                }

                .item-card {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    border: 1px solid var(--line);
                    border-radius: 4px;
                    background: var(--white);
                    padding: 16px;
                    transition: opacity 0.2s ease;
                }
                .item-card.removing { opacity: 0.4; }

                .item-thumb {
                    width: 56px;
                    height: 56px;
                    border-radius: 6px;
                    background: var(--paper-dim);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }
                .item-thumb svg { color: rgba(34,29,23,0.18); }

                .item-info { flex: 1; min-width: 0; }
                .item-info h2 {
                    font-size: 15px;
                    font-weight: 600;
                    margin: 0 0 4px;
                }
                .item-info .item-meta {
                    font-family: "JetBrains Mono", monospace;
                    font-size: 12px;
                    color: var(--muted);
                }

                .item-subtotal {
                    font-family: "JetBrains Mono", monospace;
                    font-size: 14.5px;
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
                    border-radius: 7px;
                    transition: background 0.15s ease, color 0.15s ease;
                }
                .remove-btn:hover { background: var(--rust-soft); color: var(--rust); }
                .remove-btn:disabled { opacity: 0.5; cursor: not-allowed; }

                /* Summary card styled as a printed receipt */
                .summary-card {
                    background: var(--white);
                    padding: 24px 24px 26px;
                    position: sticky;
                    top: 24px;
                    background-image:
                        radial-gradient(circle at 0 12px, var(--paper) 6px, transparent 6.5px),
                        radial-gradient(circle at 100% 12px, var(--paper) 6px, transparent 6.5px);
                }
                .summary-card h3 {
                    font-family: "JetBrains Mono", monospace;
                    font-size: 12px;
                    font-weight: 700;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    margin: 0 0 16px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .summary-card h3::before {
                    content: "";
                    width: 7px;
                    height: 7px;
                    border-radius: 50%;
                    background: var(--ledger);
                    box-shadow: 0 0 0 3px rgba(91, 111, 82, 0.15);
                }
                .summary-row {
                    display: flex;
                    align-items: baseline;
                    gap: 6px;
                    font-family: "JetBrains Mono", monospace;
                    font-size: 12.5px;
                    color: var(--ink);
                    padding: 6px 0;
                }
                .summary-row .fill { flex: 1; border-bottom: 1px dotted var(--line); margin-bottom: 3px; }
                .summary-row .val { color: var(--muted); font-weight: 600; }
                .summary-total {
                    display: flex;
                    align-items: baseline;
                    gap: 6px;
                    font-family: "JetBrains Mono", monospace;
                    font-size: 16px;
                    font-weight: 700;
                    padding-top: 14px;
                    margin-top: 8px;
                    border-top: 1px dashed var(--line);
                }
                .summary-total .fill { flex: 1; border-bottom: 1px dotted var(--line); margin-bottom: 3px; }

                .error-banner {
                    display: flex;
                    align-items: flex-start;
                    gap: 8px;
                    background: var(--rust-soft);
                    color: var(--rust);
                    font-size: 13px;
                    padding: 11px 13px;
                    border-radius: 8px;
                    margin: 16px 0 0;
                    line-height: 1.4;
                }
                .error-banner svg { flex-shrink: 0; margin-top: 1px; }

                .btn-primary {
                    width: 100%;
                    background: var(--rust);
                    color: white;
                    border: none;
                    border-radius: 9px;
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
                .btn-primary:hover:not(:disabled) { background: #a83a24; transform: translateY(-1px); }
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
                .empty p { font-size: 14px; margin: 0 0 20px; }
                .empty a {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    background: var(--ink);
                    color: var(--paper);
                    text-decoration: none;
                    font-size: 13.5px;
                    font-weight: 600;
                    padding: 11px 18px;
                    border-radius: 8px;
                }
                .empty a:hover { background: var(--rust); }

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
                    <span className="stamp-tag">
                        <ShoppingCart size={12} strokeWidth={2.4} />
                        Cart
                    </span>
                    <h1 className="display">My Cart</h1>
                </div>

                {loading ? (
                    <div className="item-list">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div className="item-card" key={i}>
                                <div className="skeleton-line" style={{ width: 56, height: 56, borderRadius: 6 }} />
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
                                        <ShoppingBag size={22} strokeWidth={1.4} />
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
                                <span className="fill" />
                                <span className="val">{cartItems.length}</span>
                            </div>
                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span className="fill" />
                                <span className="val">&#8377;{total}</span>
                            </div>
                            <div className="summary-total">
                                <span>Total</span>
                                <span className="fill" />
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