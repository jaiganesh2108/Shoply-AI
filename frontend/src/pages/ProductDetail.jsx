import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProduct } from "../api/products";
import { addToCart } from "../api/cart";
import {
    ShoppingBag,
    ArrowLeft,
    Check,
    AlertCircle,
    Tag,
    Boxes,
} from "lucide-react";

function ProductDetail() {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [adding, setAdding] = useState(false);
    const [added, setAdded] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        setLoading(true);
        try {
            const data = await getProduct(id);
            setProduct(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = async () => {
        setError("");
        setAdding(true);
        try {
            await addToCart(product.id);
            setAdded(true);
            setTimeout(() => setAdded(false), 2200);
        } catch (error) {
            console.error(error.response?.data || error);
            setError("Couldn't add this to your cart. Please try again.");
        } finally {
            setAdding(false);
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
                    --warn: #b54708;
                    --warn-soft: #fff6ed;
                    --danger: #d92d20;
                    --danger-soft: #fef2f1;
                    --mint: #12b886;
                    --mint-soft: #e9fbf5;
                }
                * { box-sizing: border-box; }
                .page {
                    min-height: 100vh;
                    background: var(--white);
                    color: var(--ink);
                    font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
                    -webkit-font-smoothing: antialiased;
                    padding: 40px 32px 96px;
                }
                .display { font-family: "Space Grotesk", "Inter", sans-serif; }
                .wrap { max-width: 1000px; margin: 0 auto; }

                .back-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 13.5px;
                    font-weight: 600;
                    color: var(--muted);
                    text-decoration: none;
                    margin-bottom: 32px;
                    transition: color 0.15s ease;
                }
                .back-link:hover { color: var(--ink); }

                .layout {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 56px;
                    align-items: start;
                }

                .media {
                    background: var(--surface);
                    border-radius: 20px;
                    aspect-ratio: 1 / 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                }
                .product-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    display: block;
                }
                .media svg { color: rgba(20,22,26,0.14); }

                .category-tag {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 12.5px;
                    font-weight: 600;
                    letter-spacing: 0.04em;
                    text-transform: uppercase;
                    color: var(--accent);
                    background: var(--accent-soft);
                    padding: 6px 12px;
                    border-radius: 100px;
                    margin-bottom: 18px;
                }

                .info h1 {
                    font-size: 30px;
                    letter-spacing: -0.02em;
                    margin: 0 0 12px;
                    font-weight: 600;
                }
                .price {
                    font-size: 24px;
                    font-weight: 700;
                    margin: 0 0 20px;
                }
                .description {
                    font-size: 15px;
                    line-height: 1.65;
                    color: var(--muted);
                    margin: 0 0 26px;
                    padding-bottom: 26px;
                    border-bottom: 1px solid var(--line);
                }

                .meta-row {
                    display: flex;
                    align-items: center;
                    gap: 24px;
                    margin-bottom: 28px;
                }
                .meta-item {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 13.5px;
                    color: var(--muted);
                }
                .meta-item svg { color: var(--muted); flex-shrink: 0; }
                .meta-item strong { color: var(--ink); font-weight: 600; }

                .stock-pill {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 12.5px;
                    font-weight: 600;
                    padding: 5px 10px;
                    border-radius: 100px;
                    background: var(--mint-soft);
                    color: var(--mint);
                }
                .stock-pill.low { background: var(--warn-soft); color: var(--warn); }
                .stock-pill.out { background: var(--danger-soft); color: var(--danger); }
                .stock-pill .dot {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: currentColor;
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
                    margin-bottom: 16px;
                    line-height: 1.4;
                }
                .error-banner svg { flex-shrink: 0; margin-top: 1px; }

                .btn-primary {
                    width: 100%;
                    background: var(--ink);
                    color: white;
                    border: none;
                    border-radius: 10px;
                    padding: 15px 20px;
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
                .btn-primary.added { background: var(--mint); }

                .spinner {
                    width: 14px;
                    height: 14px;
                    border: 2px solid rgba(255,255,255,0.35);
                    border-top-color: white;
                    border-radius: 50%;
                    animation: spin 0.7s linear infinite;
                }
                @keyframes spin { to { transform: rotate(360deg); } }

                /* Loading / skeleton */
                .skeleton-layout {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 56px;
                }
                .skeleton-block {
                    background: linear-gradient(90deg, #f2f3f5 25%, #e9eaed 37%, #f2f3f5 63%);
                    background-size: 400% 100%;
                    animation: shimmer 1.4s ease infinite;
                    border-radius: 16px;
                }
                @keyframes shimmer {
                    0% { background-position: 100% 0; }
                    100% { background-position: -100% 0; }
                }

                .not-found {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    padding: 90px 20px;
                    color: var(--muted);
                }
                .not-found svg { color: #cfd3da; margin-bottom: 16px; }
                .not-found h3 {
                    font-size: 18px;
                    color: var(--ink);
                    margin: 0 0 6px;
                    font-weight: 600;
                }

                @media (max-width: 800px) {
                    .layout, .skeleton-layout { grid-template-columns: 1fr; gap: 32px; }
                    .page { padding: 28px 20px 72px; }
                    .info h1 { font-size: 25px; }
                }
                @media (prefers-reduced-motion: reduce) {
                    .skeleton-block { animation: none; }
                    .spinner { animation: none; }
                }
            `}</style>

            <div className="wrap">
                <Link className="back-link" to="/products">
                    <ArrowLeft size={15} strokeWidth={2.2} />
                    Back to products
                </Link>

                {loading ? (
                    <div className="skeleton-layout">
                        <div className="skeleton-block" style={{ aspectRatio: "1 / 1" }} />
                        <div>
                            <div className="skeleton-block" style={{ height: 20, width: "30%", marginBottom: 18 }} />
                            <div className="skeleton-block" style={{ height: 30, width: "70%", marginBottom: 14 }} />
                            <div className="skeleton-block" style={{ height: 24, width: "25%", marginBottom: 24 }} />
                            <div className="skeleton-block" style={{ height: 80, width: "100%", marginBottom: 24 }} />
                            <div className="skeleton-block" style={{ height: 48, width: "100%" }} />
                        </div>
                    </div>
                ) : !product ? (
                    <div className="not-found">
                        <ShoppingBag size={40} strokeWidth={1.4} />
                        <h3>Product not found</h3>
                        <p>It may have been removed or the link is incorrect.</p>
                    </div>
                ) : (
                    <div className="layout">
                        <div className="media">
                            {product.image ? (
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="product-image"
                                />
                            ) : (
                                <ShoppingBag size={72} strokeWidth={1.1} />
                            )}
                        </div>

                        <div className="info">
                            {product.category && (
                                <span className="category-tag">
                                    <Tag size={12} strokeWidth={2.4} />
                                    {product.category}
                                </span>
                            )}
                            <h1 className="display">{product.name}</h1>
                            <p className="price">&#8377; {product.price}</p>
                            <p className="description">{product.description}</p>

                            <div className="meta-row">
                                <span className="meta-item">
                                    <Boxes size={16} strokeWidth={2} />
                                    {product.stock === 0 ? (
                                        <span className="stock-pill out">
                                            <span className="dot" />
                                            Out of stock
                                        </span>
                                    ) : product.stock <= 5 ? (
                                        <span className="stock-pill low">
                                            <span className="dot" />
                                            Only {product.stock} left
                                        </span>
                                    ) : (
                                        <span className="stock-pill">
                                            <span className="dot" />
                                            <strong>{product.stock}</strong>&nbsp;in stock
                                        </span>
                                    )}
                                </span>
                            </div>

                            {error && (
                                <div className="error-banner">
                                    <AlertCircle size={15} strokeWidth={2.2} />
                                    <span>{error}</span>
                                </div>
                            )}

                            <button
                                className={`btn-primary ${added ? "added" : ""}`}
                                onClick={handleAddToCart}
                                disabled={adding || product.stock === 0}
                            >
                                {adding ? (
                                    <span className="spinner" />
                                ) : added ? (
                                    <>
                                        <Check size={16} strokeWidth={2.4} />
                                        Added to cart
                                    </>
                                ) : product.stock === 0 ? (
                                    "Out of stock"
                                ) : (
                                    <>
                                        <ShoppingBag size={16} strokeWidth={2.2} />
                                        Add to cart
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

export default ProductDetail;