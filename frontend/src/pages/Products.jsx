import { useEffect, useState } from "react";
import { getProducts } from "../api/products";
import { Link } from "react-router-dom";
import { ShoppingBag, ArrowRight, PackageX } from "lucide-react";

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const data = await getProducts();
            setProducts(data);
        }
        catch (error) {
            console.log(error);
        }
        finally {
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
                    --warn: #b54708;
                    --warn-soft: #fff6ed;
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
                .wrap { max-width: 1180px; margin: 0 auto; }

                .page-head { margin-bottom: 40px; }
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
                    font-size: 34px;
                    letter-spacing: -0.02em;
                    margin: 0 0 8px;
                    font-weight: 600;
                }
                .page-head p {
                    font-size: 15px;
                    color: var(--muted);
                    margin: 0;
                }

                .grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 26px;
                }

                .card {
                    border: 1px solid var(--line);
                    border-radius: 16px;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    transition: box-shadow 0.2s ease, transform 0.2s ease;
                }
                .card:hover {
                    box-shadow: 0 20px 40px -24px rgba(20, 22, 26, 0.25);
                    transform: translateY(-2px);
                }
                .card-media {
                    height: 170px;
                    background: var(--surface);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                }
                .card-media svg { color: rgba(20,22,26,0.16); }

                .stock-badge {
                    position: absolute;
                    top: 12px;
                    right: 12px;
                    font-size: 11px;
                    font-weight: 600;
                    padding: 5px 10px;
                    border-radius: 100px;
                    background: var(--white);
                    color: var(--muted);
                    border: 1px solid var(--line);
                }
                .stock-badge.low {
                    background: var(--warn-soft);
                    color: var(--warn);
                    border-color: transparent;
                }
                .stock-badge.out {
                    background: #fef2f1;
                    color: #d92d20;
                    border-color: transparent;
                }

                .card-body {
                    padding: 18px 20px 20px;
                    display: flex;
                    flex-direction: column;
                    flex: 1;
                }
                .card-body h2 {
                    font-size: 16px;
                    font-weight: 600;
                    margin: 0 0 6px;
                }
                .card-body .desc {
                    font-size: 13.5px;
                    color: var(--muted);
                    line-height: 1.5;
                    margin: 0 0 16px;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    flex: 1;
                }
                .card-foot {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-top: auto;
                }
                .price { font-size: 16px; font-weight: 700; }

                .view-link {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 13px;
                    font-weight: 600;
                    color: var(--ink);
                    text-decoration: none;
                    background: var(--surface);
                    padding: 8px 12px;
                    border-radius: 9px;
                    transition: background 0.15s ease, color 0.15s ease;
                }
                .view-link:hover { background: var(--accent); color: white; }

                /* Skeleton loading state */
                .skeleton-card {
                    border: 1px solid var(--line);
                    border-radius: 16px;
                    overflow: hidden;
                }
                .skeleton-media {
                    height: 170px;
                    background: linear-gradient(90deg, #f2f3f5 25%, #e9eaed 37%, #f2f3f5 63%);
                    background-size: 400% 100%;
                    animation: shimmer 1.4s ease infinite;
                }
                .skeleton-line {
                    height: 12px;
                    border-radius: 6px;
                    background: linear-gradient(90deg, #f2f3f5 25%, #e9eaed 37%, #f2f3f5 63%);
                    background-size: 400% 100%;
                    animation: shimmer 1.4s ease infinite;
                    margin: 18px 20px 0;
                }
                .skeleton-line.short { width: 40%; margin-top: 12px; margin-bottom: 20px; }
                @keyframes shimmer {
                    0% { background-position: 100% 0; }
                    100% { background-position: -100% 0; }
                }

                /* Empty state */
                .empty {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
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

                @media (max-width: 900px) {
                    .grid { grid-template-columns: repeat(2, 1fr); }
                }
                @media (max-width: 560px) {
                    .page { padding: 40px 20px 72px; }
                    .grid { grid-template-columns: 1fr; }
                    .page-head h1 { font-size: 27px; }
                }
                @media (prefers-reduced-motion: reduce) {
                    .skeleton-media, .skeleline { animation: none; }
                }
            `}</style>

            <div className="wrap">
                <div className="page-head">
                    <span className="eyebrow">
                        <ShoppingBag size={12} strokeWidth={2.4} />
                        Catalog
                    </span>
                    <h1 className="display">Products</h1>
                    <p>Browse everything in stock, or let the agent narrow it down for you.</p>
                </div>

                {loading ? (
                    <div className="grid">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div className="skeleton-card" key={i}>
                                <div className="skeleton-media" />
                                <div className="skeleton-line" />
                                <div className="skeleton-line short" />
                            </div>
                        ))}
                    </div>
                ) : products.length === 0 ? (
                    <div className="empty">
                        <PackageX size={40} strokeWidth={1.4} />
                        <h3>No products yet</h3>
                        <p>Check back soon, or try refreshing the page.</p>
                    </div>
                ) : (
                    <div className="grid">
                        {products.map((product) => {
                            const stockLabel =
                                product.stock === 0
                                    ? "out"
                                    : product.stock <= 5
                                    ? "low"
                                    : "";
                            return (
                                <div className="card" key={product.id}>
                                    <div className="card-media">
                                        <span className={`stock-badge ${stockLabel}`}>
                                            {product.stock === 0
                                                ? "Out of stock"
                                                : product.stock <= 5
                                                ? `Only ${product.stock} left`
                                                : `${product.stock} in stock`}
                                        </span>
                                        <ShoppingBag size={44} strokeWidth={1.2} />
                                    </div>
                                    <div className="card-body">
                                        <h2>{product.name}</h2>
                                        <p className="desc">{product.description}</p>
                                        <div className="card-foot">
                                            <span className="price">
                                                &#8377; {product.price}
                                            </span>
                                            <Link
                                                className="view-link"
                                                to={`/products/${product.id}`}
                                            >
                                                View details
                                                <ArrowRight size={14} strokeWidth={2.2} />
                                            </Link>
                                        </div>
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

export default Products;