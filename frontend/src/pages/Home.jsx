import React, { useState, useEffect } from "react";
import { Search, ShoppingBag, ArrowRight, Check, Zap, RefreshCw } from "lucide-react";
import AssistantChat from "../components/AssistantChat/AssistantChat";

const BRAND = "Norda";

/* ---------------------------------------------------
   Signature element: the agent "prints a receipt".
   Each line types in, then settles into a dot-leader
   row, like a POS terminal itemising a sale.
   This is a labelled example of what the agent does,
   not real order data.
--------------------------------------------------- */
const AGENT_SCRIPT = [
  { label: "Understanding your request", value: "done" },
  { label: "Searching the catalog", value: "done" },
  { label: "Comparing price, reviews, delivery", value: "done" },
  { label: "Best match ready for your approval", value: "ready" },
];

function AgentReceipt() {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [lines, setLines] = useState([]);

  useEffect(() => {
    if (lineIndex >= AGENT_SCRIPT.length) {
      const resetTimer = setTimeout(() => {
        setLines([]);
        setLineIndex(0);
        setCharIndex(0);
      }, 2600);
      return () => clearTimeout(resetTimer);
    }
    const current = AGENT_SCRIPT[lineIndex].label;
    if (charIndex <= current.length) {
      const t = setTimeout(() => setCharIndex((c) => c + 1), 17);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setLines((prev) => [...prev, AGENT_SCRIPT[lineIndex]]);
      setLineIndex((i) => i + 1);
      setCharIndex(0);
    }, 480);
    return () => clearTimeout(t);
  }, [lineIndex, charIndex]);

  const complete = lineIndex >= AGENT_SCRIPT.length;
  const currentLabel = complete ? "" : AGENT_SCRIPT[lineIndex].label.slice(0, charIndex);

  return (
    <div className="receipt-wrap" aria-label="Example of how the agent works">
      <div className="receipt">
        <div className="receipt-head">
          <span className="receipt-dot" />
          <span>{BRAND.toUpperCase()} AGENT</span>
          <span className="receipt-head-r">EXAMPLE</span>
        </div>
        <div className="receipt-rule" />
        <div className="receipt-body">
          {lines.map((l, i) => (
            <div className="receipt-line done" key={i}>
              <Check size={12} strokeWidth={2.5} />
              <span className="rl-label">{l.label}</span>
              <span className="rl-fill" />
              <span className="rl-value">{l.value}</span>
            </div>
          ))}
          {!complete && (
            <div className="receipt-line active">
              <span className="rl-caret-dot" />
              <span className="rl-label">
                {currentLabel}
                <span className="rl-caret">|</span>
              </span>
            </div>
          )}
        </div>
        {complete && (
          <>
            <div className="receipt-rule dashed" />
            <div className="receipt-total">
              <span>YOU APPROVE BEFORE ANYTHING IS ORDERED</span>
            </div>
          </>
        )}
      </div>
      <div className="receipt-torn" />
    </div>
  );
}

const FEATURES = [
  { icon: Search, title: "Understands you", body: "Describe what you want in plain words" },
  { icon: RefreshCw, title: "Compares for you", body: "Checks price, reviews and delivery" },
  { icon: Zap, title: "Orders with your OK", body: "Nothing is bought until you approve" },
];

const STEPS = [
  {
    n: "01",
    title: "Tell the agent what you need",
    body: "Type it like you would text a friend: what you want, your budget, your size. No filters to set.",
    icon: Search,
  },
  {
    n: "02",
    title: "It searches and compares",
    body: "The agent looks through the catalog and weighs price, reviews and delivery time for you.",
    icon: RefreshCw,
  },
  {
    n: "03",
    title: "You approve, it checks out",
    body: "Review the suggestion. If you like it, say so and the agent completes the order.",
    icon: Zap,
  },
];

const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

/* ---------------------------------------------------
   Home
   `products` is optional. Pass your real catalog from
   your data source; the catalog section only appears
   when there are items.
   Expected shape: { name, variant?, price?, color? }
--------------------------------------------------- */
function Home({ products = [] }) {
  return (
    <div className="page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,500&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

        :root {
          --paper: #FBFAF6;
          --paper-dim: #F1EEE4;
          --ink: #221D17;
          --muted: #6F6A5D;
          --line: #E2DDCF;
          --rust: #C1432A;
          --ledger: #5B6F52;
          --white: #ffffff;
        }
        * { box-sizing: border-box; }
        .page {
          background: var(--paper);
          color: var(--ink);
          font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
          -webkit-font-smoothing: antialiased;
          min-height: 100vh;
        }
        .display { font-family: "Fraunces", Georgia, serif; }
        .mono { font-family: "JetBrains Mono", "IBM Plex Mono", monospace; }
        .wrap { max-width: 1180px; margin: 0 auto; padding: 0 32px; }
        button:focus-visible { outline: 2px solid var(--rust); outline-offset: 2px; }

        /* HERO */
        .hero {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 56px;
          align-items: center;
          padding: 110px 0 88px;
        }
        .stamp-tag {
          display: inline-flex;
          align-items: center;
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
          margin-bottom: 26px;
        }
        .hero h1 {
          font-size: 54px;
          line-height: 1.08;
          letter-spacing: -0.01em;
          margin: 0 0 20px;
          font-weight: 500;
        }
        .hero h1 .accent { color: var(--rust); font-style: italic; }
        .hero p.sub {
          font-size: 17px;
          line-height: 1.62;
          color: var(--muted);
          max-width: 480px;
          margin: 0 0 30px;
        }
        .hero-ctas { display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 22px; }
        .btn-primary {
          background: var(--rust);
          color: white;
          border: none;
          border-radius: 9px;
          padding: 14px 22px;
          font-size: 14.5px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: transform 0.15s ease, background 0.15s ease;
        }
        .btn-primary:hover { background: #a83a24; transform: translateY(-1px); }
        .btn-secondary {
          background: transparent;
          color: var(--ink);
          border: 1px solid var(--line);
          border-radius: 9px;
          padding: 14px 22px;
          font-size: 14.5px;
          font-weight: 600;
          cursor: pointer;
          transition: border-color 0.15s ease;
        }
        .btn-secondary:hover { border-color: var(--ink); }
        .hero-note { font-size: 13px; color: var(--muted); margin: 0; }

        /* Receipt */
        .receipt-wrap { display: flex; flex-direction: column; align-items: center; filter: drop-shadow(0 26px 50px rgba(34, 29, 23, 0.16)); }
        .receipt {
          background: var(--white);
          width: 100%;
          padding: 22px 24px 26px;
          background-image:
            radial-gradient(circle at 0 14px, var(--paper) 6px, transparent 6.5px),
            radial-gradient(circle at 100% 14px, var(--paper) 6px, transparent 6.5px);
        }
        .receipt-head {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: "JetBrains Mono", monospace;
          font-size: 11px;
          letter-spacing: 0.08em;
          font-weight: 600;
        }
        .receipt-head-r { margin-left: auto; color: var(--muted); font-weight: 500; }
        .receipt-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: var(--ledger);
          box-shadow: 0 0 0 4px rgba(91, 111, 82, 0.15);
        }
        .receipt-rule { border-top: 1px solid var(--line); margin: 14px 0; }
        .receipt-rule.dashed { border-top: 1px dashed var(--line); }
        .receipt-body { display: flex; flex-direction: column; gap: 13px; min-height: 128px; }
        .receipt-line {
          display: flex;
          align-items: baseline;
          gap: 8px;
          font-family: "JetBrains Mono", monospace;
          font-size: 12.5px;
        }
        .receipt-line.done svg { color: var(--ledger); flex-shrink: 0; position: relative; top: 1px; }
        .rl-label { white-space: nowrap; }
        .rl-fill { flex: 1; border-bottom: 1px dotted var(--line); margin: 0 2px 3px; min-width: 12px; }
        .rl-value { color: var(--ink); font-weight: 600; white-space: nowrap; }
        .rl-caret-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--rust); margin-top: 4px; flex-shrink: 0; }
        .rl-caret { display: inline-block; margin-left: 1px; animation: blink 1s step-start infinite; color: var(--rust); }
        @keyframes blink { 50% { opacity: 0; } }
        .receipt-total {
          font-family: "JetBrains Mono", monospace;
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-align: center;
        }
        .receipt-torn {
          width: 100%;
          height: 14px;
          background: var(--white);
          clip-path: polygon(0% 0%,100% 0%,100% 100%,95% 20%,90% 100%,85% 20%,80% 100%,75% 20%,70% 100%,65% 20%,60% 100%,55% 20%,50% 100%,45% 20%,40% 100%,35% 20%,30% 100%,25% 20%,20% 100%,15% 20%,10% 100%,5% 20%,0% 100%);
        }

        /* Feature strip */
        .strip { border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); padding: 28px 0; }
        .strip-grid { display: grid; grid-template-columns: repeat(3, 1fr); }
        .strip-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 24px;
          border-left: 1px dashed var(--line);
        }
        .strip-item:first-child { border-left: none; padding-left: 0; }
        .strip-icon {
          width: 36px; height: 36px;
          border-radius: 8px;
          border: 1.5px dashed var(--rust);
          display: flex; align-items: center; justify-content: center;
          color: var(--rust);
          flex-shrink: 0;
        }
        .strip-item h4 { margin: 0 0 2px; font-size: 14px; font-weight: 600; }
        .strip-item p { margin: 0; font-size: 12.5px; color: var(--muted); }

        /* Process */
        .process { padding: 92px 0; }
        .section-head { max-width: 560px; margin: 0 0 50px; }
        .section-head .stamp-tag { margin-bottom: 18px; }
        .section-head h2 { font-size: 33px; letter-spacing: -0.01em; margin: 0 0 12px; font-weight: 500; }
        .section-head p { color: var(--muted); font-size: 15.5px; line-height: 1.6; margin: 0; }
        .steps { display: grid; grid-template-columns: repeat(3, 1fr); border-top: 1px solid var(--line); }
        .step-card { padding: 26px 26px 0; border-left: 1px solid var(--line); }
        .step-card:first-child { border-left: none; padding-left: 0; }
        .step-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; }
        .step-n { font-size: 12px; color: var(--rust); font-weight: 600; }
        .step-icon {
          width: 32px; height: 32px; border-radius: 8px;
          background: var(--paper-dim);
          display: flex; align-items: center; justify-content: center;
        }
        .step-card h3 { font-size: 16px; margin: 0 0 8px; font-weight: 600; }
        .step-card p { font-size: 13.5px; color: var(--muted); line-height: 1.55; margin: 0; }

        /* Assistant anchor */
        #assistant { scroll-margin-top: 24px; }

        /* Products (only rendered when real products are passed in) */
        .products { padding: 92px 0 100px; }
        .products-head h2 { font-size: 29px; letter-spacing: -0.01em; margin: 0 0 34px; font-weight: 500; }
        .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .card { border: 1px solid var(--line); border-radius: 4px; overflow: hidden; background: var(--white); }
        .card-media { height: 186px; display: flex; align-items: center; justify-content: center; background: var(--paper-dim); }
        .card-media svg { color: rgba(34,29,23,0.16); }
        .card-body { padding: 16px 18px 18px; }
        .card-body h4 { margin: 0 0 3px; font-size: 15px; font-weight: 600; }
        .card-body .variant { font-size: 12.5px; color: var(--muted); margin: 0; }
        .price { display: block; margin-top: 12px; padding-top: 12px; border-top: 1px dashed var(--line); font-family: "JetBrains Mono", monospace; font-size: 14.5px; font-weight: 700; }

        /* CTA banner */
        .cta-banner {
          margin: 0 32px 96px;
          background: var(--ink);
          border-radius: 14px;
          padding: 60px 56px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
          position: relative;
          overflow: hidden;
        }
        .cta-banner::after {
          content: "";
          position: absolute;
          right: -40px; top: -60px;
          width: 260px; height: 260px;
          border: 1.5px dashed rgba(251,250,246,0.14);
          border-radius: 50%;
          pointer-events: none;
        }
        .cta-banner h3 { color: var(--paper); font-size: 27px; letter-spacing: -0.01em; margin: 0 0 8px; max-width: 440px; font-weight: 500; }
        .cta-banner p { color: #b3ac9c; font-size: 14px; margin: 0; }
        .btn-light {
          background: var(--paper);
          color: var(--ink);
          border: none;
          border-radius: 9px;
          padding: 14px 24px;
          font-size: 14px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          white-space: nowrap;
          position: relative;
          z-index: 1;
        }

        footer { border-top: 1px solid var(--line); padding: 28px 0; font-size: 12.5px; color: var(--muted); }

        @media (max-width: 900px) {
          .hero { grid-template-columns: 1fr; padding: 52px 0 60px; }
          .hero h1 { font-size: 38px; }
          .strip-grid { grid-template-columns: 1fr; gap: 16px; }
          .strip-item { border-left: none; padding: 16px 0 0; border-top: 1px dashed var(--line); }
          .strip-item:first-child { border-top: none; padding-top: 0; }
          .steps { grid-template-columns: 1fr; }
          .step-card, .step-card:first-child { border-left: none; padding: 26px 0 0; border-top: 1px solid var(--line); }
          .step-card:first-child { border-top: none; padding-top: 0; }
          .grid { grid-template-columns: repeat(2, 1fr); }
          .cta-banner { flex-direction: column; align-items: flex-start; padding: 40px 26px; }
        }
        @media (max-width: 560px) {
          .grid { grid-template-columns: 1fr; }
          .wrap { padding: 0 20px; }
          .cta-banner { margin: 0 20px 72px; }
          .receipt-line { font-size: 11.5px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .rl-caret { animation: none; }
          .btn-primary { transition: none; }
        }
      `}</style>

      <div className="wrap">
        {/* HERO */}
        <section className="hero">
          <div>
            <span className="stamp-tag">AI shopping agent</span>
            <h1 className="display">
              Tell us what you want to buy.
              <br />
              <span className="accent">Our agent finds it, compares options,</span>
              <br />
              and orders it.
            </h1>
            <p className="sub">
              {BRAND} is a shop with a built-in assistant. Describe what you are
              looking for, such as an item, a budget and a size. The agent searches
              the catalog, picks the best match and places the order once you approve.
            </p>
            <div className="hero-ctas">
              <button className="btn-primary" onClick={() => scrollTo("assistant")}>
                Ask the agent <ArrowRight size={16} strokeWidth={2.2} />
              </button>
              <button className="btn-secondary" onClick={() => scrollTo("how-it-works")}>
                See how it works
              </button>
            </div>
            <p className="hero-note">You always confirm before an order is placed.</p>
          </div>
          <AgentReceipt />
        </section>

        {/* FEATURE STRIP */}
        <section className="strip">
          <div className="strip-grid">
            {FEATURES.map((f) => (
              <div className="strip-item" key={f.title}>
                <span className="strip-icon"><f.icon size={16} strokeWidth={2} /></span>
                <div>
                  <h4>{f.title}</h4>
                  <p>{f.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PROCESS */}
        <section className="process" id="how-it-works">
          <div className="section-head">
            <span className="stamp-tag">How it works</span>
            <h2 className="display">Three steps from request to order</h2>
            <p>You describe what you need. The agent does the searching and comparing in between.</p>
          </div>
          <div className="steps">
            {STEPS.map((s) => (
              <div className="step-card" key={s.n}>
                <div className="step-top">
                  <span className="step-n mono">{s.n}</span>
                  <span className="step-icon"><s.icon size={16} strokeWidth={2} /></span>
                </div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ASSISTANT */}
        <div id="assistant">
          <AssistantChat products={products} />
        </div>

        {/* PRODUCTS: only shown when real products are provided */}
        {products.length > 0 && (
          <section className="products">
            <div className="products-head">
              <h2 className="display">Available in the catalog</h2>
            </div>
            <div className="grid">
              {products.map((p) => (
                <div className="card" key={p.name}>
                  <div className="card-media" style={p.color ? { background: p.color } : undefined}>
                    <ShoppingBag size={44} strokeWidth={1.2} />
                  </div>
                  <div className="card-body">
                    <h4>{p.name}</h4>
                    {p.variant && <p className="variant">{p.variant}</p>}
                    {p.price && <span className="price">{p.price}</span>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* CTA BANNER */}
      <div className="cta-banner">
        <div>
          <h3 className="display">Not sure where to start? Just describe what you need.</h3>
          <p>For example: the kind of item, your budget and your size.</p>
        </div>
        <button className="btn-light" onClick={() => scrollTo("assistant")}>
          Start a request <ArrowRight size={16} strokeWidth={2.2} />
        </button>
      </div>

      {/* FOOTER */}
      <div className="wrap">
        <footer>&copy; {new Date().getFullYear()} {BRAND}</footer>
      </div>
    </div>
  );
}

export default Home;