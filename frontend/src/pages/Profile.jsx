import { useEffect, useState } from "react";
import api from "../api/axios";
import { Mail, User as UserIcon, ShieldAlert } from "lucide-react";

function Profile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        api.get("profile/")
            .then((response) => {
                setUser(response.data);
            })
            .catch(() => {
                console.log("Not Logged In");
                setError(true);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const initials = user?.username
        ? user.username.slice(0, 2).toUpperCase()
        : "";

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
                    display: flex;
                    justify-content: center;
                }
                .display { font-family: "Fraunces", Georgia, serif; }
                .mono { font-family: "JetBrains Mono", "IBM Plex Mono", monospace; }
                .wrap { width: 100%; max-width: 480px; }

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
                    font-size: 28px;
                    letter-spacing: -0.01em;
                    margin: 0 0 32px;
                    font-weight: 500;
                }

                /* Card styled as a membership ticket stub */
                .card {
                    background: var(--white);
                    filter: drop-shadow(0 16px 32px rgba(34, 29, 23, 0.1));
                }
                .card-inner {
                    padding: 30px 30px 6px;
                    background-image:
                        radial-gradient(circle at 0 14px, var(--paper) 6px, transparent 6.5px),
                        radial-gradient(circle at 100% 14px, var(--paper) 6px, transparent 6.5px);
                }
                .card-torn {
                    width: 100%;
                    height: 12px;
                    background: var(--white);
                    clip-path: polygon(0% 0%,100% 0%,100% 100%,95% 10%,90% 100%,85% 10%,80% 100%,75% 10%,70% 100%,65% 10%,60% 100%,55% 10%,50% 100%,45% 10%,40% 100%,35% 10%,30% 100%,25% 10%,20% 100%,15% 10%,10% 100%,5% 10%,0% 100%);
                }

                .avatar-row {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    margin-bottom: 24px;
                    padding-bottom: 24px;
                    border-bottom: 1px dashed var(--line);
                }
                .avatar {
                    width: 56px;
                    height: 56px;
                    border-radius: 8px;
                    background: var(--ink);
                    color: var(--paper);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: "JetBrains Mono", monospace;
                    font-size: 17px;
                    font-weight: 700;
                    letter-spacing: -0.01em;
                    flex-shrink: 0;
                }
                .avatar-row h2 {
                    font-size: 17px;
                    font-weight: 600;
                    margin: 0 0 3px;
                }
                .avatar-row .handle {
                    font-family: "JetBrains Mono", monospace;
                    font-size: 12px;
                    color: var(--muted);
                }

                .field-row {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    padding: 14px 0;
                }
                .field-row + .field-row { border-top: 1px dotted var(--line); }
                .field-icon {
                    width: 34px;
                    height: 34px;
                    border-radius: 7px;
                    border: 1.5px dashed var(--rust);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--rust);
                    flex-shrink: 0;
                }
                .field-text label {
                    display: block;
                    font-family: "JetBrains Mono", monospace;
                    font-size: 10.5px;
                    font-weight: 700;
                    letter-spacing: 0.06em;
                    text-transform: uppercase;
                    color: var(--muted);
                    margin-bottom: 3px;
                }
                .field-text span {
                    font-size: 14.5px;
                    font-weight: 500;
                }

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

                .error-state {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    padding: 50px 24px 30px;
                }
                .error-state svg { color: var(--rust); margin-bottom: 14px; }
                .error-state h3 {
                    font-family: "Fraunces", Georgia, serif;
                    font-size: 17px;
                    margin: 0 0 6px;
                    font-weight: 500;
                }
                .error-state p {
                    font-size: 13.5px;
                    color: var(--muted);
                    margin: 0 0 20px;
                }
                .retry-btn {
                    background: var(--rust);
                    color: white;
                    border: none;
                    border-radius: 8px;
                    padding: 10px 18px;
                    font-size: 13.5px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: background 0.15s ease;
                }
                .retry-btn:hover { background: #a83a24; }

                @media (max-width: 560px) {
                    .page { padding: 40px 20px 72px; }
                }
                @media (prefers-reduced-motion: reduce) {
                    .skeleton-line { animation: none; }
                }
            `}</style>

            <div className="wrap">
                <div className="page-head">
                    <span className="stamp-tag">
                        <UserIcon size={12} strokeWidth={2.4} />
                        Account
                    </span>
                    <h1 className="display">Profile</h1>
                </div>

                <div className="card">
                    <div className="card-inner">
                        {loading ? (
                            <>
                                <div className="avatar-row">
                                    <div className="skeleton-line" style={{ width: 56, height: 56, borderRadius: 8 }} />
                                    <div style={{ flex: 1 }}>
                                        <div className="skeleton-line" style={{ width: "50%", height: 14, marginBottom: 8 }} />
                                        <div className="skeleton-line" style={{ width: "35%", height: 12 }} />
                                    </div>
                                </div>
                                <div className="skeleton-line" style={{ width: "70%", height: 14, marginBottom: 16 }} />
                                <div className="skeleton-line" style={{ width: "60%", height: 14, marginBottom: 20 }} />
                            </>
                        ) : error ? (
                            <div className="error-state">
                                <ShieldAlert size={34} strokeWidth={1.6} />
                                <h3>You're not logged in</h3>
                                <p>Sign in to view your profile details.</p>
                                <button className="retry-btn" onClick={() => (window.location.href = "/login")}>
                                    Go to login
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="avatar-row">
                                    <div className="avatar">{initials}</div>
                                    <div>
                                        <h2>{user.username}</h2>
                                        <span className="handle">@{user.username}</span>
                                    </div>
                                </div>

                                <div className="field-row">
                                    <span className="field-icon">
                                        <UserIcon size={15} strokeWidth={2} />
                                    </span>
                                    <div className="field-text">
                                        <label>Username</label>
                                        <span>{user.username}</span>
                                    </div>
                                </div>

                                <div className="field-row">
                                    <span className="field-icon">
                                        <Mail size={15} strokeWidth={2} />
                                    </span>
                                    <div className="field-text">
                                        <label>Email</label>
                                        <span>{user.email}</span>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="card-torn" />
                </div>
            </div>
        </div>
    );
}

export default Profile;