import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../api/authUtils";
import {
    ShoppingBag,
    ShoppingCart,
    Package,
    User,
    LogOut,
    Menu,
    X,
} from "lucide-react";

function Navbar() {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const token = localStorage.getItem("access");

    const handleLogout = () => {
        logoutUser();
        navigate("/login");
    };

    const handleAssistantClick = (event) => {
        event.preventDefault();

        if (window.location.pathname === "/") {
            document.getElementById("assistant")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        } else {
            navigate("/#assistant");
        }
    };

    return (
        <nav className="navbar">
            <style>{`
                :root {
                    --ink: #14161a;
                    --muted: #6b7280;
                    --line: #eceef1;
                    --surface: #f7f8fa;
                    --white: #ffffff;
                    --accent: #5046e5;
                    --accent-soft: #eef0fd;
                }
                * { box-sizing: border-box; }
                .navbar {
                    background: var(--white);
                    border-bottom: 1px solid var(--line);
                    font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
                    -webkit-font-smoothing: antialiased;
                    position: sticky;
                    top: 0;
                    z-index: 40;
                }
                .navbar-inner {
                    max-width: 1180px;
                    margin: 0 auto;
                    padding: 16px 32px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .logo {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 17px;
                    font-weight: 700;
                    letter-spacing: -0.02em;
                    color: var(--ink);
                    text-decoration: none;
                    font-family: "Space Grotesk", "Inter", sans-serif;
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

                .nav-links {
                    display: flex;
                    align-items: center;
                    gap: 28px;
                    list-style: none;
                    margin: 0;
                    padding: 0;
                }
                .nav-links a {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    color: var(--ink);
                    text-decoration: none;
                    font-size: 14px;
                    font-weight: 500;
                    opacity: 0.75;
                    transition: opacity 0.15s ease;
                }
                .nav-links a:hover { opacity: 1; }
                .nav-links a svg { color: var(--muted); }

                .nav-right {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .ghost-btn {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    background: none;
                    border: none;
                    color: var(--ink);
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    padding: 8px 10px;
                    border-radius: 8px;
                    transition: background 0.15s ease, color 0.15s ease;
                }
                .ghost-btn:hover { background: #fef2f1; color: #d92d20; }

                .link-btn {
                    font-size: 14px;
                    font-weight: 600;
                    text-decoration: none;
                    padding: 9px 16px;
                    border-radius: 9px;
                    transition: background 0.15s ease, color 0.15s ease;
                }
                .link-btn.ghost { color: var(--ink); opacity: 0.8; }
                .link-btn.ghost:hover { opacity: 1; }
                .link-btn.solid {
                    background: var(--ink);
                    color: white;
                }
                .link-btn.solid:hover { background: #000; }

                .menu-toggle {
                    display: none;
                    background: none;
                    border: none;
                    cursor: pointer;
                    color: var(--ink);
                    padding: 6px;
                }

                .mobile-panel {
                    display: none;
                    flex-direction: column;
                    gap: 4px;
                    padding: 8px 32px 18px;
                    border-top: 1px solid var(--line);
                }
                .mobile-panel a,
                .mobile-panel button {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 12px 4px;
                    font-size: 14.5px;
                    font-weight: 500;
                    color: var(--ink);
                    text-decoration: none;
                    background: none;
                    border: none;
                    text-align: left;
                    cursor: pointer;
                    border-bottom: 1px solid var(--line);
                }
                .mobile-panel a:last-child,
                .mobile-panel button:last-child { border-bottom: none; }
                .mobile-panel svg { color: var(--muted); }
                .mobile-panel .logout-item { color: #d92d20; }
                .mobile-panel .logout-item svg { color: #d92d20; }

                @media (max-width: 820px) {
                    .nav-links, .nav-right .link-btn, .nav-right .ghost-btn, .nav-right .icon-only { display: none; }
                    .menu-toggle { display: flex; }
                    .navbar-inner { padding: 14px 20px; }
                    .mobile-panel.open { display: flex; }
                }
            `}</style>

            <div className="navbar-inner">
                <Link to="/" className="logo">
                    <span className="logo-mark">
                        <ShoppingBag size={14} strokeWidth={2.4} />
                    </span>
                    Shoply Agent
                </Link>

                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/products">Products</Link></li>
                    <li>
                        <a href="#assistant" onClick={handleAssistantClick}>
                            Assistant
                        </a>
                    </li>
                    {token && (
                        <>
                            <li><Link to="/cart"><ShoppingCart size={15} strokeWidth={2} />Cart</Link></li>
                            <li><Link to="/orders"><Package size={15} strokeWidth={2} />Orders</Link></li>
                            <li><Link to="/profile"><User size={15} strokeWidth={2} />Profile</Link></li>
                        </>
                    )}
                </ul>

                <div className="nav-right">
                    {token ? (
                        <button className="ghost-btn" onClick={handleLogout}>
                            <LogOut size={15} strokeWidth={2} />
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link to="/login" className="link-btn ghost">Login</Link>
                            <Link to="/signup" className="link-btn solid">Sign up</Link>
                        </>
                    )}
                    <button
                        className="menu-toggle"
                        onClick={() => setMenuOpen((o) => !o)}
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                    >
                        {menuOpen ? <X size={22} strokeWidth={1.8} /> : <Menu size={22} strokeWidth={1.8} />}
                    </button>
                </div>
            </div>

            <div className={`mobile-panel ${menuOpen ? "open" : ""}`}>
                <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
                <Link to="/products" onClick={() => setMenuOpen(false)}>Products</Link>
                <a
                    href="#assistant"
                    onClick={(event) => {
                        setMenuOpen(false);
                        handleAssistantClick(event);
                    }}
                >
                    Assistant
                </a>
                    {token ? (
                    <>
                        <Link to="/cart" onClick={() => setMenuOpen(false)}>
                            <ShoppingCart size={16} strokeWidth={2} /> Cart
                        </Link>
                        <Link to="/orders" onClick={() => setMenuOpen(false)}>
                            <Package size={16} strokeWidth={2} /> Orders
                        </Link>
                        <Link to="/profile" onClick={() => setMenuOpen(false)}>
                            <User size={16} strokeWidth={2} /> Profile
                        </Link>
                        <button
                            className="logout-item"
                            onClick={() => {
                                setMenuOpen(false);
                                handleLogout();
                            }}
                        >
                            <LogOut size={16} strokeWidth={2} /> Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
                        <Link to="/signup" onClick={() => setMenuOpen(false)}>Sign up</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;