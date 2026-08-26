import React, { useState, useEffect } from "react";
import {
  Search,
  ShoppingBag,
  ArrowRight,
  Check,
  Star,
  Zap,
  RefreshCw,
  Plus,
} from "lucide-react";
import AssistantChat from "../components/AssistantChat/AssistantChat";

/* ---------------------------------------------------
   Signature element: the agent doesn't "chat" \u2014 it
   prints a receipt. Each script line is a ticket row
   that types in, then settles into a dot-leader line
   with its result, the way a POS terminal itemises
   a sale as it happens.
--------------------------------------------------- */
const AGENT_SCRIPT = [
  { label: "Searching \u201Cweekend sneakers under \u20B96,000\u201D", value: "214 found" },
  { label: "Comparing fit, reviews, delivery", value: "done" },
  { label: "Match \u2014 Aero Runner, Navy, UK 9", value: "\u20B94,999" },
  { label: "Adding to cart", value: "arrives Thu" },
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
    } else {
      const t = setTimeout(() => {
        setLines((prev) => [...prev, AGENT_SCRIPT[lineIndex]]);
        setLineIndex((i) => i + 1);
        setCharIndex(0);
      }, 480);
      return () => clearTimeout(t);
    }
  }, [lineIndex, charIndex]);

  const currentLabel =
    lineIndex < AGENT_SCRIPT.length
      ? AGENT_SCRIPT[lineIndex].label.slice(0, charIndex)
      : "";
  const complete = lineIndex >= AGENT_SCRIPT.length;

  return (
    <div className="receipt-wrap">
      <div className="receipt">
        <div className="receipt-head">
          <span className="receipt-dot" />
          <span>NORDA AGENT</span>
          <span className="receipt-head-r">TICKET #0284</span>
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
              <span>TOTAL</span>
              <span className="rl-fill" />
              <span>\u20B94,999</span>
            </div>
          </>
        )}
      </div>
      <div className="receipt-torn" />
    </div>
  );
}

/* ---------------------------------------------------
   Product data
--------------------------------------------------- */
const PRODUCTS = [
  { name: "Aero Runner", variant: "Navy \u00B7 Knit mesh", price: "\u20B94,999", pick: true, color: "#EFE9DD" },
  { name: "Field Jacket", variant: "Olive \u00B7 Water resistant", price: "\u20B97,499", pick: false, color: "#E9EAE1" },
  { name: "Studio Tote", variant: "Sand \u00B7 Full grain", price: "\u20B93,299", pick: true, color: "#F1E7D8" },
  { name: "Everyday Watch", variant: "Steel \u00B7 Sapphire glass", price: "\u20B98,999", pick: false, color: "#E7E7E2" },
  { name: "Cloud Hoodie", variant: "Fog grey \u00B7 Heavyweight", price: "\u20B92,899", pick: true, color: "#EAE8E3" },
  { name: "Desk Lamp Mini", variant: "Warm white \u00B7 USB-C", price: "\u20B91,999", pick: false, color: "#F0E4DE" },
];
const STEPS = [
  { n: "01", title: "Tell the agent what you need", body: "Type it like you'd text a friend \u2014 budget, size, occasion. No filters to fiddle with.", icon: Search },
  { n: "02", title: "It searches and compares for you", body: "The agent checks price, reviews, and delivery across the catalog in seconds.", icon: RefreshCw },
  { n: "03", title: "You confirm, it checks out", body: "Review the pick, approve it, and the agent completes checkout \u2014 no extra tabs.", icon: Zap },
];

/* ---------------------------------------------------
   Home
--------------------------------------------------- */
function Home() {
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
          background: var(--paper);
          color: var(--ink);
          font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
          -webkit-font-smoothing: antialiased;
          min-height: 100vh;
        }
        .display { font-family: "Fraunces", Georgia, serif; }
        .mono { font-family: "JetBrains Mono", "IBM Plex Mono", monospace; }
        .wrap { max-width: 1180px; margin: 0 auto; padding: 0 32px; }

        /* HERO */
        .hero {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 56px;
          align-items: center;
          padding: 120px 0 88px;
        }
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
          max-width: 460px;
          margin: 0 0 30px;
        }
        .hero-ctas { display: flex; gap: 14px; margin-bottom: 22px; }
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
        .hero-proof {
          font-family: "JetBrains Mono", monospace;
          font-size: 12px;
          color: var(--muted);
          letter-spacing: 0.01em;
        }
        .hero-proof b { color: var(--ink); }

        /* Receipt (signature) */
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
          color: var(--ink);
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
          color: var(--ink);
        }
        .receipt-line.done svg { color: var(--ledger); flex-shrink: 0; position: relative; top: 1px; }
        .rl-label { white-space: nowrap; }
        .rl-fill { flex: 1; border-bottom: 1px dotted var(--line); margin: 0 2px 3px; min-width: 12px; }
        .rl-value { color: var(--muted); font-weight: 600; white-space: nowrap; }
        .receipt-line.done .rl-value { color: var(--ink); }
        .rl-caret-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--rust); margin-top: 4px; flex-shrink: 0; }
        .rl-caret { display: inline-block; margin-left: 1px; animation: blink 1s step-start infinite; color: var(--rust); }
        @keyframes blink { 50% { opacity: 0; } }
        .receipt-total {
          display: flex;
          align-items: baseline;
          gap: 8px;
          font-family: "JetBrains Mono", monospace;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.04em;
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
        .steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; border-top: 1px solid var(--line); }
        .step-card { padding: 26px 26px 0; border-left: 1px solid var(--line); }
        .step-card:first-child { border-left: none; padding-left: 0; }
        .step-card:not(:first-child) { padding-left: 26px; }
        .step-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; }
        .step-n { font-family: "JetBrains Mono", monospace; font-size: 12px; color: var(--rust); font-weight: 600; }
        .step-icon {
          width: 32px; height: 32px; border-radius: 8px;
          background: var(--paper-dim);
          display: flex; align-items: center; justify-content: center;
          color: var(--ink);
        }
        .step-card h3 { font-size: 16px; margin: 0 0 8px; font-weight: 600; }
        .step-card p { font-size: 13.5px; color: var(--muted); line-height: 1.55; margin: 0; }

        /* Products */
        .products { padding: 0 0 100px; }
        .products-head { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 34px; }
        .products-head h2 { font-size: 29px; letter-spacing: -0.01em; margin: 0; font-weight: 500; }
        .view-all { font-size: 13.5px; font-weight: 600; color: var(--ink); display: flex; align-items: center; gap: 6px; text-decoration: none; opacity: 0.75; }
        .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .card {
          border: 1px solid var(--line);
          border-radius: 4px;
          overflow: hidden;
          background: var(--white);
          transition: box-shadow 0.2s ease, transform 0.2s ease;
        }
        .card:hover { box-shadow: 0 18px 36px -22px rgba(34, 29, 23, 0.3); transform: translateY(-2px); }
        .card-media { height: 186px; position: relative; display: flex; align-items: center; justify-content: center; }
        .card-media svg { color: rgba(34,29,23,0.16); }
        .pick-stamp {
          position: absolute;
          top: 14px; left: 14px;
          border: 1.5px dashed var(--rust);
          color: var(--rust);
          background: rgba(251, 250, 246, 0.9);
          font-family: "JetBrains Mono", monospace;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 4px 9px;
          border-radius: 100px;
          transform: rotate(-6deg);
        }
        .card-body { padding: 16px 18px 18px; }
        .card-body h4 { margin: 0 0 3px; font-size: 15px; font-weight: 600; }
        .card-body .variant { font-size: 12.5px; color: var(--muted); margin: 0 0 14px; }
        .price-row { display: flex; align-items: center; justify-content: space-between; padding-top: 12px; border-top: 1px dashed var(--line); }
        .price { font-family: "JetBrains Mono", monospace; font-size: 14.5px; font-weight: 700; }
        .add-btn {
          background: var(--ink);
          border: none;
          border-radius: 7px;
          width: 32px; height: 32px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          color: var(--paper);
          transition: background 0.15s ease;
        }
        .add-btn:hover { background: var(--rust); }

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
        }
        .cta-banner h3 { color: var(--paper); font-size: 27px; letter-spacing: -0.01em; margin: 0 0 8px; max-width: 420px; font-weight: 500; }
        .cta-banner p { color: #a49d8d; font-size: 14px; margin: 0; font-family: "JetBrains Mono", monospace; }
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
        }

        /* Footer */
        footer { border-top: 1px solid var(--line); padding: 28px 0; }
        .footer-row { display: flex; align-items: center; justify-content: space-between; font-size: 12.5px; color: var(--muted); }
        .barcode {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: "JetBrains Mono", monospace;
        }
        .barcode-bars {
          width: 90px; height: 18px;
          background: repeating-linear-gradient(90deg, var(--ink) 0px, var(--ink) 1.5px, transparent 1.5px, transparent 3px, var(--ink) 3px, var(--ink) 4.5px, transparent 4.5px, transparent 7px);
          opacity: 0.7;
        }

        @media (max-width: 900px) {
          .hero { grid-template-columns: 1fr; padding: 52px 0 60px; }
          .hero h1 { font-size: 38px; }
          .strip-grid { grid-template-columns: 1fr; gap: 16px; }
          .strip-item { border-left: none; padding: 0; border-top: 1px dashed var(--line); padding-top: 16px; }
          .strip-item:first-child { border-top: none; padding-top: 0; }
          .steps { grid-template-columns: 1fr; }
          .step-card, .step-card:not(:first-child) { border-left: none; padding-left: 0; border-top: 1px solid var(--line); padding-top: 26px; }
          .step-card:first-child { border-top: none; padding-top: 0; }
          .grid { grid-template-columns: repeat(2, 1fr); }
          .cta-banner { flex-direction: column; align-items: flex-start; padding: 40px 26px; }
        }
        @media (max-width: 560px) {
          .grid { grid-template-columns: 1fr; }
          .wrap { padding: 0 20px; }
          .footer-row { flex-direction: column; gap: 10px; align-items: flex-start; }
        }
        @media (prefers-reduced-motion: reduce) {
          .rl-caret { animation: none; }
          .card, .btn-primary { transition: none; }
        }
      `}</style>

      <div className="wrap">
        {/* HERO */}
        <section className="hero">
          <div>
            <span className="stamp-tag">Agent-run since 2024</span>
            <h1 className="display">
              Say what you want.<br />
              <span className="accent">It finds it, compares it,</span><br />
              buys it.
            </h1>
            <p className="sub">
              shoply's agent searches the full catalog against your budget and
              taste, then completes the order the moment you say go \u2014 so
              you spend less time browsing and more time wearing.
            </p>
            <div className="hero-ctas">
              <button
                className="btn-primary"
                onClick={() => document.getElementById("assistant")?.scrollIntoView({ behavior: "smooth", block: "start" })}
              >
                Ask the agent <ArrowRight size={16} strokeWidth={2.2} />
              </button>
              <button className="btn-secondary">Browse catalog</button>
            </div>
            <p className="hero-proof"><b>12,482</b> orders placed by the agent this month</p>
          </div>
          <AgentReceipt />
        </section>

        {/* FEATURE STRIP */}
        <section className="strip">
          <div className="strip-grid">
            <div className="strip-item">
              <span className="strip-icon"><Search size={16} strokeWidth={2} /></span>
              <div>
                <h4>Smart search</h4>
                <p>Understands fit, budget, and taste</p>
              </div>
            </div>
            <div className="strip-item">
              <span className="strip-icon"><RefreshCw size={16} strokeWidth={2} /></span>
              <div>
                <h4>Auto-compare</h4>
                <p>Checks price and reviews for you</p>
              </div>
            </div>
            <div className="strip-item">
              <span className="strip-icon"><Zap size={16} strokeWidth={2} /></span>
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
            <span className="stamp-tag">How it works</span>
            <h2 className="display">Three steps, no browsing fatigue</h2>
            <p>From a plain sentence to a finished order, the agent handles the legwork in between.</p>
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

        <AssistantChat products={PRODUCTS} />

        {/* PRODUCTS */}
        <section className="products">
          <div className="products-head">
            <h2 className="display">Picked for the season</h2>
            <a className="view-all" href="#">View all <ArrowRight size={15} strokeWidth={2.2} /></a>
          </div>
          <div className="grid">
            {PRODUCTS.map((p) => (
              <div className="card" key={p.name}>
                <div className="card-media" style={{ background: p.color }}>
                  {p.pick && (
                    <span className="pick-stamp">
                      <Star size={9} strokeWidth={2.5} fill="currentColor" style={{ marginRight: 3, position: "relative", top: -1 }} />
                      Agent pick
                    </span>
                  )}
                  <ShoppingBag size={44} strokeWidth={1.2} />
                </div>
                <div className="card-body">
                  <h4>{p.name}</h4>
                  <p className="variant">{p.variant}</p>
                  <div className="price-row">
                    <span className="price">{p.price}</span>
                    <button className="add-btn" aria-label={`Add ${p.name} to cart`}>
                      <Plus size={15} strokeWidth={2.3} />
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
          <p>NO ACCOUNT NEEDED \u2014 JUST START TYPING</p>
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
            <div className="barcode">
              <span>ORDER NO. 000284</span>
              <span className="barcode-bars" />
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Home;