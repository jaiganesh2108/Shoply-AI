import { useEffect, useState } from "react";
import { getProducts } from "../api/products";
import { Link } from "react-router-dom";
import { ShoppingBag, ArrowRight, PackageX, Search, X } from "lucide-react";

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchProducts();
    }, [search]);

    const fetchProducts = async () => {
        try {
            const data = await getProducts(search);
            setProducts(data);
        }
        catch (error) {
            console.error(error);
        }
        finally {
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
                .wrap { max-width: 1180px; margin: 0 auto; }

                .page-head { margin-bottom: 40px; }
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
                    margin-bottom: 18px;
                }
                .page-head h1 {
                    font-size: 34px;
                    letter-spacing: -0.01em;
                    margin: 0 0 8px;
                    font-weight: 500;
                }
                .page-head p {
                    font-size: 15px;
                    color: var(--muted);
                    margin: 0 0 24px;
                }

                .search-bar {
                    position: relative;
                    max-width: 380px;
                }
                .search-bar svg.search-icon {
                    position: absolute;
                    left: 14px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: var(--muted);
                    pointer-events: none;
                }
                .search-bar input {
                    width: 100%;
                    padding: 11px 40px 11px 40px;
                    border: 1px solid var(--line);
                    border-radius: 8px;
                    font-size: 14px;
                    font-family: inherit;
                    color: var(--ink);
                    background: var(--white);
                    outline: none;
                    transition: border-color 0.15s ease, box-shadow 0.15s ease;
                }
                .search-bar input::placeholder { color: #a49d8d; }
                .search-bar input:focus {
                    border-color: var(--rust);
                    box-shadow: 0 0 0 3px var(--rust-soft);
                }
                .search-clear {
                    position: absolute;
                    right: 8px;
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
                .search-clear:hover { color: var(--ink); background: var(--paper-dim); }

                .grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 24px;
                }

                .card {
                    border: 1px solid var(--line);
                    border-radius: 4px;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    background: var(--white);
                    transition: box-shadow 0.2s ease, transform 0.2s ease;
                }
                .card:hover {
                    box-shadow: 0 18px 36px -22px rgba(34, 29, 23, 0.3);
                    transform: translateY(-2px);
                }
                .card-media {
                    height: 170px;
                    background: var(--paper-dim);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                }
                .card-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    display: block;
                }
                .card-media svg { color: rgba(34,29,23,0.16); }

                .stock-badge {
                    position: absolute;
                    top: 12px;
                    right: 12px;
                    font-family: "JetBrains Mono", monospace;
                    font-size: 10.5px;
                    font-weight: 700;
                    letter-spacing: 0.02em;
                    padding: 5px 10px;
                    border-radius: 100px;
                    background: rgba(251, 250, 246, 0.92);
                    color: var(--muted);
                    border: 1.5px dashed var(--line);
                }
                .stock-badge.low {
                    background: rgba(251, 250, 246, 0.92);
                    color: var(--rust);
                    border-color: var(--rust);
                }
                .stock-badge.out {
                    background: rgba(251, 250, 246, 0.92);
                    color: #a13a2b;
                    border-color: #a13a2b;
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
                    padding-top: 12px;
                    border-top: 1px dashed var(--line);
                }
                .price { font-family: "JetBrains Mono", monospace; font-size: 15px; font-weight: 700; }

                .view-link {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 12.5px;
                    font-weight: 600;
                    color: var(--paper);
                    text-decoration: none;
                    background: var(--ink);
                    padding: 8px 12px;
                    border-radius: 7px;
                    transition: background 0.15s ease;
                }
                .view-link:hover { background: var(--rust); }

                /* Skeleton loading state */
                .skeleton-card {
                    border: 1px solid var(--line);
                    border-radius: 4px;
                    overflow: hidden;
                    background: var(--white);
                }
                .skeleton-media {
                    height: 170px;
                    background: linear-gradient(90deg, var(--paper-dim) 25%, #e6e1d3 37%, var(--paper-dim) 63%);
                    background-size: 400% 100%;
                    animation: shimmer 1.4s ease infinite;
                }
                .skeleton-line {
                    height: 12px;
                    border-radius: 6px;
                    background: linear-gradient(90deg, var(--paper-dim) 25%, #e6e1d3 37%, var(--paper-dim) 63%);
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

                @media (max-width: 900px) {
                    .grid { grid-template-columns: repeat(2, 1fr); }
                }
                @media (max-width: 560px) {
                    .page { padding: 40px 20px 72px; }
                    .grid { grid-template-columns: 1fr; }
                    .page-head h1 { font-size: 27px; }
                }
                @media (prefers-reduced-motion: reduce) {
                    .skeleton-media, .skeleton-line { animation: none; }
                }
            `}</style>

            <div className="wrap">
                <div className="page-head">
                    <span className="stamp-tag">
                        <ShoppingBag size={12} strokeWidth={2.4} />
                        Catalog
                    </span>
                    <h1 className="display">Products</h1>
                    <p>Browse everything in stock, or let the agent narrow it down for you.</p>
                    <div className="search-bar">
                        <Search size={16} strokeWidth={2} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        {search && (
                            <button
                                className="search-clear"
                                onClick={() => setSearch("")}
                                aria-label="Clear search"
                            >
                                <X size={14} strokeWidth={2.2} />
                            </button>
                        )}
                    </div>
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
                        <h3>{search ? "No matches found" : "No products yet"}</h3>
                        <p>
                            {search
                                ? `Nothing matched "${search}". Try a different search.`
                                : "Check back soon, or try refreshing the page."}
                        </p>
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
                                        {product.image ? (
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="card-image"
                                            />
                                        ) : (
                                            <ShoppingBag size={44} strokeWidth={1.2} />
                                        )}
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