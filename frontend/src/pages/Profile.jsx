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
                    display: flex;
                    justify-content: center;
                }
                .display { font-family: "Space Grotesk", "Inter", sans-serif; }
                .wrap { width: 100%; max-width: 480px; }

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
                    font-size: 28px;
                    letter-spacing: -0.02em;
                    margin: 0 0 32px;
                    font-weight: 600;
                }

                .card {
                    border: 1px solid var(--line);
                    border-radius: 20px;
                    padding: 32px;
                }

                .avatar-row {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    margin-bottom: 28px;
                    padding-bottom: 28px;
                    border-bottom: 1px solid var(--line);
                }
                .avatar {
                    width: 58px;
                    height: 58px;
                    border-radius: 50%;
                    background: var(--accent);
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 19px;
                    font-weight: 700;
                    letter-spacing: -0.02em;
                    flex-shrink: 0;
                }
                .avatar-row h2 {
                    font-size: 17px;
                    font-weight: 600;
                    margin: 0 0 3px;
                }
                .avatar-row .handle {
                    font-size: 13px;
                    color: var(--muted);
                }

                .field-row {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    padding: 14px 0;
                }
                .field-row + .field-row { border-top: 1px solid var(--line); }
                .field-icon {
                    width: 36px;
                    height: 36px;
                    border-radius: 9px;
                    background: var(--surface);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--accent);
                    flex-shrink: 0;
                }
                .field-text label {
                    display: block;
                    font-size: 11.5px;
                    font-weight: 600;
                    letter-spacing: 0.04em;
                    text-transform: uppercase;
                    color: var(--muted);
                    margin-bottom: 2px;
                }
                .field-text span {
                    font-size: 14.5px;
                    font-weight: 500;
                }

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

                .error-state {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    padding: 60px 24px;
                }
                .error-state svg { color: var(--danger); margin-bottom: 14px; }
                .error-state h3 {
                    font-size: 16.5px;
                    margin: 0 0 6px;
                    font-weight: 600;
                }
                .error-state p {
                    font-size: 13.5px;
                    color: var(--muted);
                    margin: 0 0 20px;
                }
                .retry-btn {
                    background: var(--ink);
                    color: white;
                    border: none;
                    border-radius: 9px;
                    padding: 10px 18px;
                    font-size: 13.5px;
                    font-weight: 600;
                    cursor: pointer;
                }

                @media (max-width: 560px) {
                    .page { padding: 40px 20px 72px; }
                }
                @media (prefers-reduced-motion: reduce) {
                    .skeleton-line { animation: none; }
                }
            `}</style>

            <div className="wrap">
                <div className="page-head">
                    <span className="eyebrow">
                        <UserIcon size={12} strokeWidth={2.4} />
                        Account
                    </span>
                    <h1 className="display">Profile</h1>
                </div>

                <div className="card">
                    {loading ? (
                        <>
                            <div className="avatar-row">
                                <div className="skeleton-line" style={{ width: 58, height: 58, borderRadius: "50%" }} />
                                <div style={{ flex: 1 }}>
                                    <div className="skeleton-line" style={{ width: "50%", height: 14, marginBottom: 8 }} />
                                    <div className="skeleton-line" style={{ width: "35%", height: 12 }} />
                                </div>
                            </div>
                            <div className="skeleton-line" style={{ width: "70%", height: 14, marginBottom: 16 }} />
                            <div className="skeleton-line" style={{ width: "60%", height: 14 }} />
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
                                    <UserIcon size={16} strokeWidth={2} />
                                </span>
                                <div className="field-text">
                                    <label>Username</label>
                                    <span>{user.username}</span>
                                </div>
                            </div>

                            <div className="field-row">
                                <span className="field-icon">
                                    <Mail size={16} strokeWidth={2} />
                                </span>
                                <div className="field-text">
                                    <label>Email</label>
                                    <span>{user.email}</span>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Profile;