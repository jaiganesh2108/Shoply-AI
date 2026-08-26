import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../api/register";
import { Eye, EyeOff, ShoppingBag, ArrowRight, AlertCircle } from "lucide-react";

function Signup() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsSubmitting(true);

        try {
            await registerUser(formData);
            navigate("/login");
        } catch (error) {
            console.error(error.response?.data || error);
            setError("Registration failed. Please check your details and try again.");
        } finally {
            setIsSubmitting(false);
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
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: var(--surface);
                    font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
                    -webkit-font-smoothing: antialiased;
                    color: var(--ink);
                    padding: 24px;
                }
                .display { font-family: "Space Grotesk", "Inter", sans-serif; }

                .card {
                    width: 100%;
                    max-width: 400px;
                    background: var(--white);
                    border: 1px solid var(--line);
                    border-radius: 20px;
                    padding: 40px 36px 32px;
                    box-shadow: 0 24px 60px -30px rgba(20, 22, 26, 0.18);
                }

                .brand {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin-bottom: 28px;
                }
                .logo-mark {
                    width: 26px;
                    height: 26px;
                    border-radius: 7px;
                    background: var(--accent);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    flex-shrink: 0;
                }
                .brand span {
                    font-size: 17px;
                    font-weight: 700;
                    letter-spacing: -0.02em;
                }

                .card h1 {
                    font-size: 24px;
                    letter-spacing: -0.02em;
                    margin: 0 0 6px;
                    font-weight: 600;
                }
                .card .sub {
                    font-size: 14px;
                    color: var(--muted);
                    margin: 0 0 28px;
                    line-height: 1.5;
                }

                .field { margin-bottom: 16px; }
                .field label {
                    display: block;
                    font-size: 13px;
                    font-weight: 600;
                    margin-bottom: 7px;
                    color: var(--ink);
                }
                .input-wrap { position: relative; }
                .field input {
                    width: 100%;
                    padding: 12px 14px;
                    border: 1px solid var(--line);
                    border-radius: 10px;
                    font-size: 14.5px;
                    font-family: inherit;
                    color: var(--ink);
                    background: var(--white);
                    outline: none;
                    transition: border-color 0.15s ease, box-shadow 0.15s ease;
                }
                .field input::placeholder { color: #a5abb5; }
                .field input:focus {
                    border-color: var(--accent);
                    box-shadow: 0 0 0 3px var(--accent-soft);
                }
                .field input.has-toggle { padding-right: 42px; }

                .toggle-btn {
                    position: absolute;
                    right: 6px;
                    top: 50%;
                    transform: translateY(-50%);
                    background: none;
                    border: none;
                    cursor: pointer;
                    color: var(--muted);
                    display: flex;
                    align-items: center;
                    padding: 6px;
                    border-radius: 6px;
                }
                .toggle-btn:hover { color: var(--ink); }

                .hint {
                    font-size: 12px;
                    color: var(--muted);
                    margin: 6px 0 0;
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
                    padding: 13px 20px;
                    font-size: 14.5px;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    cursor: pointer;
                    margin-top: 22px;
                    transition: background 0.15s ease, transform 0.15s ease, opacity 0.15s ease;
                }
                .btn-primary:hover:not(:disabled) { background: #000; transform: translateY(-1px); }
                .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }

                .foot-note {
                    text-align: center;
                    font-size: 13.5px;
                    color: var(--muted);
                    margin-top: 22px;
                }
                .foot-note a {
                    color: var(--ink);
                    font-weight: 600;
                    text-decoration: none;
                }
                .foot-note a:hover { text-decoration: underline; }

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
                    .btn-primary { transition: none; }
                }
            `}</style>

            <div className="card">
                <div className="brand">
                    <span className="logo-mark">
                        <ShoppingBag size={14} strokeWidth={2.4} />
                    </span>
                    <span>Norda</span>
                </div>

                <h1 className="display">Create your account</h1>
                <p className="sub">Sign up and let your agent start shopping for you.</p>

                {error && (
                    <div className="error-banner">
                        <AlertCircle size={15} strokeWidth={2.2} />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <label htmlFor="username">Username</label>
                        <div className="input-wrap">
                            <input
                                id="username"
                                type="text"
                                name="username"
                                placeholder="Choose a username"
                                value={formData.username}
                                onChange={handleChange}
                                autoComplete="username"
                                required
                            />
                        </div>
                    </div>

                    <div className="field">
                        <label htmlFor="email">Email</label>
                        <div className="input-wrap">
                            <input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                autoComplete="email"
                                required
                            />
                        </div>
                    </div>

                    <div className="field">
                        <label htmlFor="password">Password</label>
                        <div className="input-wrap">
                            <input
                                id="password"
                                className="has-toggle"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Create a password"
                                value={formData.password}
                                onChange={handleChange}
                                autoComplete="new-password"
                                required
                            />
                            <button
                                type="button"
                                className="toggle-btn"
                                onClick={() => setShowPassword((s) => !s)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? (
                                    <EyeOff size={17} strokeWidth={1.8} />
                                ) : (
                                    <Eye size={17} strokeWidth={1.8} />
                                )}
                            </button>
                        </div>
                        <p className="hint">Use at least 8 characters.</p>
                    </div>

                    <button type="submit" className="btn-primary" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <span className="spinner" />
                        ) : (
                            <>
                                Create account <ArrowRight size={16} strokeWidth={2.2} />
                            </>
                        )}
                    </button>
                </form>

                <p className="foot-note">
                    Already have an account? <Link to="/login">Log in</Link>
                </p>
            </div>
        </div>
    );
}

export default Signup;