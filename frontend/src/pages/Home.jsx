import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  Bot,
  Check,
  Star,
  Zap,
  RefreshCw,
} from "lucide-react";

/* ---------------------------------------------------
   Agent Console — the signature element.
   A small "terminal" that plays back a scripted
   sequence of an AI shopping agent doing real work:
   searching, comparing, and adding to cart.
--------------------------------------------------- */
const AGENT_SCRIPT = [
  { text: "Searching \u201Cweekend sneakers under \u20B96,000\u201D", tag: "search" },
  { text: "Comparing 214 results by fit, reviews, delivery", tag: "compare" },
  { text: "Found: Aero Runner \u2014 Navy, size UK 9", tag: "match" },
  { text: "Added to cart \u00B7 arrives Thursday", tag: "done" },
];

function AgentConsole() {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [lines, setLines] = useState([]);

  useEffect(() => {
    if (lineIndex >= AGENT_SCRIPT.length) {
      const resetTimer = setTimeout(() => {
        setLines([]);
        setLineIndex(0);
        setCharIndex(0);
      }, 2200);
      return () => clearTimeout(resetTimer);
    }

    const current = AGENT_SCRIPT[lineIndex].text;
    if (charIndex <= current.length) {
      const t = setTimeout(() => setCharIndex((c) => c + 1), 18);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setLines((prev) => [...prev, AGENT_SCRIPT[lineIndex]]);
        setLineIndex((i) => i + 1);
        setCharIndex(0);
      }, 500);
      return () => clearTimeout(t);
    }
  }, [lineIndex, charIndex]);

  const currentText =
    lineIndex < AGENT_SCRIPT.length
      ? AGENT_SCRIPT[lineIndex].text.slice(0, charIndex)
      : "";

  return (
    <div className="agent-console">
      <div className="agent-console-head">
        <span className="agent-dot" />
        <span className="agent-console-title">AGENT &middot; live</span>
        <Bot size={14} strokeWidth={2} />
      </div>
      <div className="agent-console-body">
        {lines.map((l, i) => (
          <div className="agent-line done" key={i}>
            <Check size={13} strokeWidth={2.5} />
            <span>{l.text}</span>
          </div>
        ))}
        {lineIndex < AGENT_SCRIPT.length && (
          <div className="agent-line">
            <span className="agent-caret-dot" />
            <span>
              {currentText}
              <span className="agent-caret">|</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------
   Product data
--------------------------------------------------- */
const PRODUCTS = [
  {
    name: "Aero Runner",
    variant: "Navy \u00B7 Knit mesh",
    price: "\u20B94,999",
    pick: true,
    color: "#EDEEFB",
  },
  {
    name: "Field Jacket",
    variant: "Olive \u00B7 Water resistant",
    price: "\u20B97,499",
    pick: false,
    color: "#EFF3EE",
  },
  {
    name: "Studio Tote",
    variant: "Sand \u00B7 Full grain",
    price: "\u20B93,299",
    pick: true,
    color: "#F5F0E9",
  },
  {
    name: "Everyday Watch",
    variant: "Steel \u00B7 Sapphire glass",
    price: "\u20B98,999",
    pick: false,
    color: "#EEF0F3",
  },
  {
    name: "Cloud Hoodie",
    variant: "Fog grey \u00B7 Heavyweight",
    price: "\u20B92,899",
    pick: true,
    color: "#F1F1F4",
  },
  {
    name: "Desk Lamp Mini",
    variant: "Warm white \u00B7 USB-C",
    price: "\u20B91,999",
    pick: false,
    color: "#F6EFEF",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Tell the agent what you need",
    body: "Type it like you'd text a friend \u2014 budget, size, occasion. No filters to fiddle with.",
    icon: Search,
  },
  {
    n: "02",
    title: "It searches and compares for you",
    body: "The agent checks price, reviews, and delivery across the catalog in seconds.",
    icon: RefreshCw,
  },
  {
    n: "03",
    title: "You confirm, it checks out",
    body: "Review the pick, approve it, and the agent completes checkout \u2014 no extra tabs.",
    icon: Zap,
  },
];

/* ---------------------------------------------------
   Home
--------------------------------------------------- */
function Home() {
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
          --mint: #12b886;
        }
        * { box-sizing: border-box; }
        .page {
          background: var(--white);
          color: var(--ink);
          font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
          -webkit-font-smoothing: antialiased;
          min-height: 100vh;
        }
        .display {
          font-family: "Space Grotesk", "Inter", sans-serif;
        }
        .mono {
          font-family: "JetBrains Mono", "IBM Plex Mono", monospace;
        }
        .wrap {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 32px;
        }

        /* NAV */
        .nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 22px 0;
          border-bottom: 1px solid var(--line);
        }
        .logo {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 19px;
          font-weight: 700;
          letter-spacing: -0.02em;
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
        }
        .nav-links {
          display: flex;
          gap: 32px;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .nav-links a {
          color: var(--ink);
          text-decoration: none;
          font-size: 14.5px;
          font-weight: 500;
          opacity: 0.75;
          transition: opacity 0.15s ease;
        }
        .nav-links a:hover { opacity: 1; }
        .nav-right { display: flex; align-items: center; gap: 18px; }
        .ask-agent-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: var(--accent-soft);
          color: var(--accent);
          border: none;
          border-radius: 100px;
          padding: 9px 16px;
          font-size: 13.5px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.15s ease;
        }
        .ask-agent-btn:hover { background: #e2e4fb; }
        .icon-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--ink);
          display: flex;
          align-items: center;
        }

        /* HERO */
        .hero {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 56px;
          align-items: center;
          padding: 120px 0 96px;
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
          margin-bottom: 22px;
        }
        .hero h1 {
          font-size: 52px;
          line-height: 1.06;
          letter-spacing: -0.02em;
          margin: 0 0 20px;
          font-weight: 600;
        }
        .hero h1 .accent { color: var(--accent); }
        .hero p.sub {
          font-size: 17px;
          line-height: 1.6;
          color: var(--muted);
          max-width: 460px;
          margin: 0 0 34px;
        }
        .hero-ctas { display: flex; gap: 14px; }
        .btn-primary {
          background: var(--ink);
          color: white;
          border: none;
          border-radius: 10px;
          padding: 14px 22px;
          font-size: 14.5px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: transform 0.15s ease, background 0.15s ease;
        }
        .btn-primary:hover { background: #000; transform: translateY(-1px); }
        .btn-secondary {
          background: white;
          color: var(--ink);
          border: 1px solid var(--line);
          border-radius: 10px;
          padding: 14px 22px;
          font-size: 14.5px;
          font-weight: 600;
          cursor: pointer;
          transition: border-color 0.15s ease;
        }
        .btn-secondary:hover { border-color: #cfd3da; }

        /* Agent console (signature) */
        .agent-console {
          background: var(--ink);
          border-radius: 16px;
          padding: 20px 22px 24px;
          box-shadow: 0 24px 60px -20px rgba(20, 22, 26, 0.35);
          min-height: 200px;
        }
        .agent-console-head {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #9aa0ab;
          margin-bottom: 18px;
        }
        .agent-console-title {
          font-family: "JetBrains Mono", monospace;
          font-size: 11px;
          letter-spacing: 0.08em;
          flex: 1;
        }
        .agent-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--mint);
          box-shadow: 0 0 0 4px rgba(18, 184, 134, 0.18);
        }
        .agent-console-body {
          display: flex;
          flex-direction: column;
          gap: 12px;
          min-height: 130px;
        }
        .agent-line {
          display: flex;
          align-items: flex-start;
          gap: 9px;
          font-family: "JetBrains Mono", monospace;
          font-size: 13px;
          color: #d7dae0;
          line-height: 1.5;
        }
        .agent-line.done { color: #7d8590; }
        .agent-line.done svg { color: var(--mint); margin-top: 2px; flex-shrink: 0; }
        .agent-caret-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent);
          margin-top: 6px;
          flex-shrink: 0;
        }
        .agent-caret {
          display: inline-block;
          margin-left: 1px;
          animation: blink 1s step-start infinite;
          color: var(--accent);
        }
        @keyframes blink { 50% { opacity: 0; } }

        /* Feature strip */
        .strip {
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          padding: 30px 0;
        }
        .strip-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .strip-item {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .strip-icon {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: var(--surface);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent);
          flex-shrink: 0;
        }
        .strip-item h4 {
          margin: 0 0 2px;
          font-size: 14.5px;
          font-weight: 600;
        }
        .strip-item p {
          margin: 0;
          font-size: 13px;
          color: var(--muted);
        }

        /* Process */
        .process { padding: 96px 0; }
        .section-head { max-width: 560px; margin: 0 0 52px; }
        .section-head .eyebrow { margin-bottom: 16px; }
        .section-head h2 {
          font-size: 34px;
          letter-spacing: -0.02em;
          margin: 0 0 12px;
          font-weight: 600;
        }
        .section-head p {
          color: var(--muted);
          font-size: 15.5px;
          line-height: 1.6;
          margin: 0;
        }
        .steps {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }
        .step-card {
          background: var(--surface);
          border-radius: 16px;
          padding: 28px 26px;
        }
        .step-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .step-n {
          font-family: "JetBrains Mono", monospace;
          font-size: 12.5px;
          color: var(--muted);
        }
        .step-icon {
          width: 34px;
          height: 34px;
          border-radius: 9px;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent);
        }
        .step-card h3 {
          font-size: 16.5px;
          margin: 0 0 8px;
          font-weight: 600;
        }
        .step-card p {
          font-size: 14px;
          color: var(--muted);
          line-height: 1.55;
          margin: 0;
        }

        /* Products */
        .products { padding: 0 0 100px; }
        .products-head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 36px;
        }
        .products-head h2 {
          font-size: 30px;
          letter-spacing: -0.02em;
          margin: 0;
          font-weight: 600;
        }
        .view-all {
          font-size: 14px;
          font-weight: 600;
          color: var(--ink);
          display: flex;
          align-items: center;
          gap: 6px;
          text-decoration: none;
          opacity: 0.8;
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
          transition: box-shadow 0.2s ease, transform 0.2s ease;
        }
        .card:hover {
          box-shadow: 0 20px 40px -24px rgba(20, 22, 26, 0.25);
          transform: translateY(-2px);
        }
        .card-media {
          height: 190px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .card-media svg { color: rgba(20,22,26,0.18); }
        .pick-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background: var(--ink);
          color: white;
          font-size: 11px;
          font-weight: 600;
          padding: 5px 10px;
          border-radius: 100px;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .pick-badge svg { color: #ffd166; }
        .card-body { padding: 16px 18px 20px; }
        .card-body h4 {
          margin: 0 0 3px;
          font-size: 15px;
          font-weight: 600;
        }
        .card-body .variant {
          font-size: 13px;
          color: var(--muted);
          margin: 0 0 14px;
        }
        .card-foot {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .price { font-size: 15px; font-weight: 700; }
        .add-btn {
          background: var(--surface);
          border: none;
          border-radius: 9px;
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--ink);
          transition: background 0.15s ease;
        }
        .add-btn:hover { background: var(--accent); color: white; }

        /* CTA banner */
        .cta-banner {
          margin: 0 32px 96px;
          background: var(--ink);
          border-radius: 24px;
          padding: 64px 56px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
        }
        .cta-banner h3 {
          color: white;
          font-size: 28px;
          letter-spacing: -0.02em;
          margin: 0 0 8px;
          max-width: 420px;
          font-weight: 600;
        }
        .cta-banner p {
          color: #9aa0ab;
          font-size: 14.5px;
          margin: 0;
        }
        .btn-light {
          background: white;
          color: var(--ink);
          border: none;
          border-radius: 10px;
          padding: 14px 24px;
          font-size: 14.5px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          white-space: nowrap;
        }

        /* Footer */
        footer {
          border-top: 1px solid var(--line);
          padding: 32px 0;
        }
        .footer-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 13px;
          color: var(--muted);
        }

        @media (max-width: 900px) {
          .hero { grid-template-columns: 1fr; padding: 56px 0 64px; }
          .hero h1 { font-size: 38px; }
          .strip-grid { grid-template-columns: 1fr; gap: 18px; }
          .steps { grid-template-columns: 1fr; }
          .grid { grid-template-columns: repeat(2, 1fr); }
          .cta-banner { flex-direction: column; align-items: flex-start; padding: 44px 28px; }
          .nav-links { display: none; }
        }
        @media (max-width: 560px) {
          .grid { grid-template-columns: 1fr; }
          .wrap { padding: 0 20px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .agent-caret { animation: none; }
          .card, .btn-primary { transition: none; }
        }
      `}</style>

      <div className="wrap">
        {/* HERO */}
        <section className="hero">
          <div>
            <span className="eyebrow">
              <Sparkles size={12} strokeWidth={2.4} />
              Shopping, run by an agent
            </span>
            <h1 className="display">
              Tell it what you want.<br />
              <span className="accent">It finds, compares,</span><br />
              and checks out.
            </h1>
            <p className="sub">
              Norda's agent searches the full catalog against your budget and
              taste, then completes the order the moment you say go \u2014 so
              you spend less time browsing and more time wearing.
            </p>
            <div className="hero-ctas">
              <button className="btn-primary">
                Ask the agent <ArrowRight size={16} strokeWidth={2.2} />
              </button>
              <button className="btn-secondary">Browse catalog</button>
            </div>
          </div>
          <AgentConsole />
        </section>

        {/* FEATURE STRIP */}
        <section className="strip">
          <div className="strip-grid">
            <div className="strip-item">
              <span className="strip-icon"><Search size={17} strokeWidth={2} /></span>
              <div>
                <h4>Smart search</h4>
                <p>Understands fit, budget, and taste</p>
              </div>
            </div>
            <div className="strip-item">
              <span className="strip-icon"><RefreshCw size={17} strokeWidth={2} /></span>
              <div>
                <h4>Auto-compare</h4>
                <p>Checks price and reviews for you</p>
              </div>
            </div>
            <div className="strip-item">
              <span className="strip-icon"><Zap size={17} strokeWidth={2} /></span>
              <div>
                <h4>Instant checkout</h4>
                <p>One approval, order placed</p>
              </div>
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="process">
          <div className="section-head">
            <span className="eyebrow">How it works</span>
            <h2 className="display">Three steps, no browsing fatigue</h2>
            <p>From a plain sentence to a finished order, the agent handles the legwork in between.</p>
          </div>
          <div className="steps">
            {STEPS.map((s) => (
              <div className="step-card" key={s.n}>
                <div className="step-top">
                  <span className="step-n mono">{s.n}</span>
                  <span className="step-icon">
                    <s.icon size={16} strokeWidth={2} />
                  </span>
                </div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PRODUCTS */}
        <section className="products">
          <div className="products-head">
            <h2 className="display">Picked for the season</h2>
            <a className="view-all" href="#">
              View all <ArrowRight size={15} strokeWidth={2.2} />
            </a>
          </div>
          <div className="grid">
            {PRODUCTS.map((p) => (
              <div className="card" key={p.name}>
                <div className="card-media" style={{ background: p.color }}>
                  {p.pick && (
                    <span className="pick-badge">
                      <Star size={11} strokeWidth={2.4} fill="currentColor" />
                      Agent pick
                    </span>
                  )}
                  <ShoppingBag size={46} strokeWidth={1.2} />
                </div>
                <div className="card-body">
                  <h4>{p.name}</h4>
                  <p className="variant">{p.variant}</p>
                  <div className="card-foot">
                    <span className="price">{p.price}</span>
                    <button className="add-btn" aria-label={`Add ${p.name} to cart`}>
                      <ShoppingBag size={15} strokeWidth={2} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* CTA BANNER */}
      <div className="cta-banner">
        <div>
          <h3 className="display">Let the agent build your next order.</h3>
          <p>No account needed to try it \u2014 just start typing.</p>
        </div>
        <button className="btn-light">
          Start a request <ArrowRight size={16} strokeWidth={2.2} />
        </button>
      </div>

      {/* FOOTER */}
      <div className="wrap">
        <footer>
          <div className="footer-row">
            <span>&copy; {new Date().getFullYear()} Norda</span>
            <span>Made with an agent that shops so you don't have to</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Home;