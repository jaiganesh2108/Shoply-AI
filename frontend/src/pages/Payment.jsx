import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createPayment } from "../api/payments";
import {
    CreditCard,
    Banknote,
    Check,
    AlertCircle,
    ArrowRight,
    ShieldCheck,
} from "lucide-react";

const METHODS = [
    {
        value: "ONLINE",
        label: "Pay online",
        desc: "Card, UPI, or net banking",
        icon: CreditCard,
    },
    {
        value: "COD",
        label: "Cash on delivery",
        desc: "Pay when your order arrives",
        icon: Banknote,
    },
];

function Payment() {
    const { orderId } = useParams();
    const navigate = useNavigate();

    const [method, setMethod] = useState("ONLINE");
    const [paying, setPaying] = useState(false);
    const [error, setError] = useState("");

    const handlePayment = async () => {
        setError("");
        setPaying(true);
        try {
            await createPayment({
                order: orderId,
                payment_method: method,
            });

            navigate("/orders");
        } catch (error) {
            console.error(error.response?.data || error);
            setError("Payment failed. Please try again.");
        } finally {
            setPaying(false);
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
                    background: var(--surface);
                    color: var(--ink);
                    font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
                    -webkit-font-smoothing: antialiased;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 24px;
                }
                .display { font-family: "Space Grotesk", "Inter", sans-serif; }

                .card {
                    width: 100%;
                    max-width: 440px;
                    background: var(--white);
                    border: 1px solid var(--line);
                    border-radius: 20px;
                    padding: 36px;
                    box-shadow: 0 24px 60px -30px rgba(20, 22, 26, 0.18);
                }

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
                    margin-bottom: 18px;
                }
                .card h1 {
                    font-size: 25px;
                    letter-spacing: -0.02em;
                    margin: 0 0 4px;
                    font-weight: 600;
                }
                .order-ref {
                    font-size: 13.5px;
                    color: var(--muted);
                    margin: 0 0 28px;
                }
                .order-ref strong { color: var(--ink); font-weight: 600; }

                .method-group {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    margin-bottom: 24px;
                }
                .method-option {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    border: 1.5px solid var(--line);
                    border-radius: 12px;
                    padding: 14px 16px;
                    cursor: pointer;
                    transition: border-color 0.15s ease, background 0.15s ease;
                }
                .method-option:hover { border-color: #cfd3da; }
                .method-option.selected {
                    border-color: var(--accent);
                    background: var(--accent-soft);
                }
                .method-option input {
                    position: absolute;
                    opacity: 0;
                    width: 0;
                    height: 0;
                }
                .method-icon {
                    width: 38px;
                    height: 38px;
                    border-radius: 10px;
                    background: var(--white);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--accent);
                    flex-shrink: 0;
                }
                .method-option.selected .method-icon { background: var(--white); }
                .method-text { flex: 1; }
                .method-text h3 {
                    font-size: 14.5px;
                    font-weight: 600;
                    margin: 0 0 2px;
                }
                .method-text p {
                    font-size: 12.5px;
                    color: var(--muted);
                    margin: 0;
                }
                .radio-dot {
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    border: 1.5px solid var(--line);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }
                .method-option.selected .radio-dot {
                    border-color: var(--accent);
                }
                .radio-dot-fill {
                    width: 9px;
                    height: 9px;
                    border-radius: 50%;
                    background: var(--accent);
                }

                .secure-note {
                    display: flex;
                    align-items: center;
                    gap: 7px;
                    font-size: 12.5px;
                    color: var(--muted);
                    margin-bottom: 22px;
                }
                .secure-note svg { color: var(--muted); flex-shrink: 0; }

                .error-banner {
                    display: flex;
                    align-items: flex-start;
                    gap: 8px;
                    background: var(--danger-soft);
                    color: var(--danger);
                    font-size: 13px;
                    padding: 11px 13px;
                    border-radius: 10px;
                    margin-bottom: 18px;
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

                @media (prefers-reduced-motion: reduce) {
                    .spinner { animation: none; }
                    .btn-primary, .method-option { transition: none; }
                }
            `}</style>

            <div className="card">
                <span className="eyebrow">
                    <ShieldCheck size={12} strokeWidth={2.4} />
                    Secure payment
                </span>
                <h1 className="display">Complete payment</h1>
                <p className="order-ref">
                    For order <strong>#{orderId}</strong>
                </p>

                <div className="method-group" role="radiogroup" aria-label="Payment method">
                    {METHODS.map((m) => (
                        <label
                            key={m.value}
                            className={`method-option ${method === m.value ? "selected" : ""}`}
                        >
                            <input
                                type="radio"
                                name="payment-method"
                                value={m.value}
                                checked={method === m.value}
                                onChange={(e) => setMethod(e.target.value)}
                            />
                            <span className="method-icon">
                                <m.icon size={17} strokeWidth={2} />
                            </span>
                            <span className="method-text">
                                <h3>{m.label}</h3>
                                <p>{m.desc}</p>
                            </span>
                            <span className="radio-dot">
                                {method === m.value && <span className="radio-dot-fill" />}
                            </span>
                        </label>
                    ))}
                </div>

                <p className="secure-note">
                    <ShieldCheck size={14} strokeWidth={2} />
                    Your payment details are encrypted and secure.
                </p>

                {error && (
                    <div className="error-banner">
                        <AlertCircle size={15} strokeWidth={2.2} />
                        <span>{error}</span>
                    </div>
                )}

                <button className="btn-primary" onClick={handlePayment} disabled={paying}>
                    {paying ? (
                        <span className="spinner" />
                    ) : (
                        <>
                            Pay now <ArrowRight size={16} strokeWidth={2.2} />
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}

export default Payment;