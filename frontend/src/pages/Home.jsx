import React, { useState, useEffect, useRef } from "react";
import {
  Search, ShoppingBag, ArrowRight, Check, Zap, RefreshCw, Sparkles,
  ShieldCheck, Truck, Star, Wallet, Plus, MessageCircle,
} from "lucide-react";
import lottie from "lottie-web";
import AssistantChat from "../components/AssistantChat/AssistantChat";
import CrowdCanvas from "../components/ui/crowd-canvas";
import heroAnimation from "../assets/OnlineShopping.json"; // adjust path if needed

const BRAND = "Shoply AI";

// Sprite sheet for the walking crowd (you can download it into /assets and import it instead)
const CROWD_SRC =
  "https://cdn.21st.dev/assets/localized/abdb8990a7bef8c2f5af3e45f0a3c969c4b0603fba8be92e81347de4ea4e1ed7.png";

const AGENT_SCRIPT = [
  "Understanding your request",
  "Searching the catalog",
  "Comparing price, reviews, delivery",
  "Best match ready for your approval",
];

const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

/* Plays a Lottie JSON animation using lottie-web */
function HeroLottie({ data }) {
  const box = useRef(null);
  useEffect(() => {
    if (!box.current) return;
    const anim = lottie.loadAnimation({
      container: box.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: data,
    });
    return () => anim.destroy();
  }, [data]);
  return <div ref={box} style={{ width: "100%", height: "100%" }} />;
}

/* Fades a block in once as it enters the screen */
function Reveal({ children, className = "" }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") { setSeen(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`rv ${seen ? "in" : ""} ${className}`}>{children}</div>;
}

/* Animated agent demo (example only, not real data) */
function AgentDemo() {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [lines, setLines] = useState([]);

  useEffect(() => {
    if (lineIndex >= AGENT_SCRIPT.length) {
      const t = setTimeout(() => { setLines([]); setLineIndex(0); setCharIndex(0); }, 3000);
      return () => clearTimeout(t);
    }
    const cur = AGENT_SCRIPT[lineIndex];
    if (charIndex <= cur.length) {
      const t = setTimeout(() => setCharIndex((c) => c + 1), 22);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => { setLines((p) => [...p, cur]); setLineIndex((i) => i + 1); setCharIndex(0); }, 420);
    return () => clearTimeout(t);
  }, [lineIndex, charIndex]);

  const complete = lineIndex >= AGENT_SCRIPT.length;
  const typing = complete ? "" : AGENT_SCRIPT[lineIndex].slice(0, charIndex);

  return (
    <div className="glass demo" aria-label="Example of how the agent works">
      <div className="demo-bar">
        <span className="dots"><i /><i /><i /></span>
        <span className="demo-title">{BRAND} Agent · Example</span>
      </div>
      <div className="demo-prompt"><Sparkles size={16} /> “Running shoes, size 9, under ₹4,000”</div>
      <div className="demo-lines">
        {lines.map((l, i) => (
          <div className="demo-line" key={i}><span className="tick"><Check size={12} strokeWidth={3} /></span>{l}</div>
        ))}
        {!complete && (
          <div className="demo-line"><span className="pulse" />{typing}<span className="caret" /></div>
        )}
      </div>
      <div className={"demo-foot" + (complete ? " show" : "")}>
        <ShieldCheck size={15} /> You approve before anything is ordered
      </div>
    </div>
  );
}

const CHIPS = ["Running shoes under ₹4,000", "A gift for my mother", "Backpack for college", "Wireless earbuds, best reviews"];
const CATEGORIES = ["Footwear", "Electronics", "Fashion", "Home", "Gifts", "Sports", "Beauty", "Accessories", "Kitchen", "Travel"];

const FEATURES = [
  { icon: Search, title: "Understands you", body: "Describe what you want in plain words. No filters, no menus, no endless scrolling.", cls: "f1" },
  { icon: RefreshCw, title: "Compares for you", body: "Price, reviews and delivery weighed side by side.", cls: "f2" },
  { icon: Zap, title: "Orders with your OK", body: "Nothing is bought until you approve it.", cls: "f3" },
  { icon: Wallet, title: "Sticks to your budget", body: "Say a number once. The agent stays under it.", cls: "f4" },
  { icon: Truck, title: "Knows delivery times", body: "Need it by Friday? Say so and it filters for you.", cls: "f5" },
];

const STEPS = [
  { title: "Tell the agent what you need", body: "Type it like a text to a friend: what you want, your budget, your size." },
  { title: "It searches and compares", body: "The agent looks through the catalog and weighs price, reviews and delivery time." },
  { title: "You approve, it checks out", body: "Review the suggestion. Say yes and the agent completes the order." },
];

const FAQ = [
  ["Will it buy something without asking me?", "No. The agent only suggests. An order is placed after you approve it."],
  ["What can I ask for?", "Anything in the catalog. Mention the item, your budget, your size or when you need it."],
  ["What if I don't like the suggestion?", "Tell the agent what to change, like a lower price or faster delivery, and it searches again."],
  ["Do I need to set filters?", "No. Describe what you want in your own words and the agent handles the rest."],
];

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <div className="faq">
      {FAQ.map(([q, a], i) => (
        <div className={"faq-item" + (open === i ? " open" : "")} key={q}>
          <button className="faq-q" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
            {q}<Plus size={20} />
          </button>
          <div className="faq-a"><p>{a}</p></div>
        </div>
      ))}
    </div>
  );
}

/* `products` optional. Shape: { name, variant?, price?, color? } */
function Home({ products = [] }) {
  return (
    <div className="page">
      <style>{`
        :root {
          --bg:#000; --card:rgba(255,255,255,.06); --line:rgba(255,255,255,.12);
          --text:#f5f5f7; --muted:#a1a1a6; --blue:#2997ff; --violet:#8e5cf7; --pink:#ff5c8a;
          --grad:linear-gradient(90deg,#2997ff,#8e5cf7 55%,#ff5c8a);
        }
        * { box-sizing:border-box; }
        .page { background:var(--bg); color:var(--text); min-height:100vh; overflow-x:hidden;
          font-family:-apple-system,BlinkMacSystemFont,"SF Pro Display","Inter","Segoe UI",sans-serif; -webkit-font-smoothing:antialiased; }
        .wrap { max-width:1120px; margin:0 auto; padding:0 28px; }
        button { font-family:inherit; }
        button:focus-visible { outline:2px solid var(--blue); outline-offset:3px; }
        .grad { background:var(--grad); -webkit-background-clip:text; background-clip:text; color:transparent; }
        .glass { background:rgba(18,18,24,.8); border:1px solid var(--line); backdrop-filter:blur(24px); -webkit-backdrop-filter:blur(24px); }

        .rv { opacity:0; transform:translateY(28px); transition:opacity .8s ease, transform .8s cubic-bezier(.2,.7,.2,1); }
        .rv.in { opacity:1; transform:none; }

        /* HERO */
        .hero { position:relative; text-align:left; padding:104px 0 20px; overflow:hidden; }
        .aurora { position:absolute; inset:0; pointer-events:none; }
        .aurora span { position:absolute; border-radius:50%; filter:blur(110px); opacity:.5; animation:drift 14s ease-in-out infinite alternate; }
        .aurora .a { width:480px; height:480px; background:var(--blue); left:6%; top:-80px; }
        .aurora .b { width:440px; height:440px; background:var(--violet); right:8%; top:20px; animation-delay:-5s; }
        .aurora .c { width:340px; height:340px; background:var(--pink); left:40%; top:240px; opacity:.28; animation-delay:-9s; }
        @keyframes drift { to { transform:translate(50px,30px) scale(1.14); } }
        .hero .wrap { position:relative; z-index:1; } /* content sits above the crowd */

        /* HERO CROWD: glowing figures that slowly shift blue -> violet -> pink */
        .hero-crowd { position:absolute; left:0; right:0; bottom:0; height:clamp(340px,52vh,560px);
          z-index:0; pointer-events:none;
          opacity:.9;
          filter:invert(1) sepia(1) saturate(9) hue-rotate(190deg) brightness(1.5)
                 drop-shadow(0 0 10px rgba(142,92,247,.55));
          animation:crowdHue 12s ease-in-out infinite alternate;
          mask-image:linear-gradient(180deg,transparent,#000 35%);
          -webkit-mask-image:linear-gradient(180deg,transparent,#000 35%); }
        @keyframes crowdHue {
          from { filter:invert(1) sepia(1) saturate(9) hue-rotate(190deg) brightness(1.5) drop-shadow(0 0 10px rgba(41,151,255,.55)); }
          to   { filter:invert(1) sepia(1) saturate(9) hue-rotate(290deg) brightness(1.5) drop-shadow(0 0 10px rgba(255,92,138,.55)); }
        }

        .hero-grid { display:grid; grid-template-columns:1fr 1fr; gap:56px; align-items:center; }
        .hero-anim { width:100%; max-width:520px; height:420px; margin:0 auto; }
        .hero-anim svg { width:100% !important; height:100% !important; display:block; }

        .badge { display:inline-flex; align-items:center; gap:8px; font-size:13px; color:#d2d2d7; background:var(--card);
          border:1px solid var(--line); border-radius:980px; padding:7px 14px; margin-bottom:28px; }
        .badge svg { color:var(--blue); }
        .hero h1 { font-size:clamp(40px,5.6vw,72px); line-height:1.04; letter-spacing:-.045em; font-weight:700; margin:0 0 24px; }
        .sub { font-size:clamp(17px,2vw,20px); line-height:1.5; color:var(--muted); max-width:520px; margin:0 0 32px; }
        .ctas { display:flex; gap:14px; justify-content:flex-start; flex-wrap:wrap; margin-bottom:22px; }
        .btn { border:0; border-radius:980px; padding:15px 28px; font-size:16px; font-weight:600; display:inline-flex; align-items:center; gap:8px; cursor:pointer; transition:transform .5s ease; }
        .btn:hover { transform:scale(1.04); }
        .btn.main { background:var(--blue); color:#fff; box-shadow:0 10px 40px rgba(41,151,255,.45); }
        .btn.ghost { background:rgba(255,255,255,.1); color:var(--text); border:1px solid var(--line); }
        .btn.light { background:#fff; color:#000; }
        .chips { display:flex; flex-wrap:wrap; gap:10px; justify-content:flex-start; max-width:560px; margin:0; }
        .chip { display:inline-flex; align-items:center; gap:7px; background:var(--card); border:1px solid var(--line); color:#d2d2d7;
          border-radius:980px; padding:9px 15px; font-size:13.5px; cursor:pointer; transition:background .2s,border-color .2s; }
        .chip:hover { background:rgba(255,255,255,.12); border-color:rgba(255,255,255,.3); }
        .chip svg { color:var(--violet); }

        .demo-wrap { position:relative; max-width:560px; margin:60px auto 0; }
        .demo-wrap::before { content:""; position:absolute; inset:-2px; border-radius:26px; background:var(--grad); opacity:.55; filter:blur(32px); }
        .demo { position:relative; text-align:left; border-radius:24px; padding:18px 22px 22px; box-shadow:0 40px 90px rgba(0,0,0,.6); }
        .demo-bar { display:flex; align-items:center; margin-bottom:18px; }
        .dots { display:flex; gap:6px; } .dots i { width:11px; height:11px; border-radius:50%; background:#ff5f57; display:block; }
        .dots i:nth-child(2){background:#febc2e;} .dots i:nth-child(3){background:#28c840;}
        .demo-title { font-size:12px; color:var(--muted); margin:0 auto; padding-right:48px; }
        .demo-prompt { display:flex; align-items:center; gap:10px; background:rgba(255,255,255,.07); border-radius:14px; padding:13px 16px; font-size:15px; margin-bottom:18px; }
        .demo-prompt svg { color:var(--violet); flex-shrink:0; }
        .demo-lines { display:flex; flex-direction:column; gap:12px; min-height:130px; }
        .demo-line { display:flex; align-items:center; gap:12px; font-size:14.5px; color:#e5e5ea; }
        .tick { width:20px; height:20px; border-radius:50%; background:#30d158; color:#000; display:grid; place-items:center; flex-shrink:0; }
        .pulse { width:20px; height:20px; display:grid; place-items:center; flex-shrink:0; }
        .pulse::after { content:""; width:9px; height:9px; border-radius:50%; background:var(--blue); animation:ping 3s infinite; }
        @keyframes ping { 0%{box-shadow:0 0 0 0 rgba(41,151,255,.7);} 100%{box-shadow:0 0 0 10px rgba(41,151,255,0);} }
        .caret { width:2px; height:16px; background:var(--blue); margin-left:-6px; animation:blink 1.8s step-start infinite; }
        @keyframes blink { 50%{opacity:0;} }
        .demo-foot { margin-top:18px; padding-top:16px; border-top:1px solid var(--line); font-size:13px; color:var(--muted); display:flex; align-items:center; gap:8px; opacity:0; transition:opacity .5s; }
        .demo-foot.show { opacity:1; } .demo-foot svg { color:#30d158; }

        /* MARQUEE: bright, readable category names in brand colors */
        .marquee { position:relative; z-index:1; /* above the crowd */
          margin-top:80px; border-block:1px solid rgba(255,255,255,.22); padding:22px 0; overflow:hidden;
          background:rgba(0,0,0,.45);
          mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent); -webkit-mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent); }
        .track { display:flex; gap:56px; width:max-content; animation:slide 32s linear infinite; }
        .track span { font-size:26px; font-weight:700; letter-spacing:-.02em; white-space:nowrap; color:#f5f5f7;
          display:inline-flex; align-items:center; gap:56px; }
        .track span::after { content:""; width:8px; height:8px; border-radius:50%; background:currentColor; opacity:.7; }
        .track span:nth-child(3n+1) { color:#6cb8ff; text-shadow:0 0 18px rgba(41,151,255,.55); }
        .track span:nth-child(3n+2) { color:#b99cff; text-shadow:0 0 18px rgba(142,92,247,.55); }
        .track span:nth-child(3n)   { color:#ff8fb0; text-shadow:0 0 18px rgba(255,92,138,.55); }
        @keyframes slide { to { transform:translateX(-50%); } }

        /* SECTIONS */
        .section { padding-top:130px; }
        .head { text-align:center; max-width:720px; margin:0 auto 56px; }
        .head h2 { font-size:clamp(32px,5.6vw,58px); letter-spacing:-.035em; line-height:1.06; margin:0 0 16px; font-weight:700; }
        .head p { color:var(--muted); font-size:19px; line-height:1.5; margin:0; }

        /* BENTO */
        .bento { display:grid; grid-template-columns:repeat(6,1fr); gap:20px; }
        .tile { position:relative; overflow:hidden; border-radius:28px; padding:34px; border:1px solid var(--line);
          background:linear-gradient(160deg,#16161d,#0b0b10); transition:transform .3s,border-color .3s; min-height:230px; }
        .tile:hover { transform:translateY(-4px); border-color:rgba(255,255,255,.28); }
        .tile::before { content:""; position:absolute; width:260px; height:260px; border-radius:50%; top:-100px; right:-80px;
          background:radial-gradient(circle,rgba(41,151,255,.35),transparent 65%); }
        .f1 { grid-column:span 4; min-height:300px; display:flex; flex-direction:column; justify-content:flex-end; }
        .f1::before { width:460px; height:460px; background:radial-gradient(circle,rgba(142,92,247,.55),transparent 65%); }
        .f2 { grid-column:span 2; } .f3 { grid-column:span 3; } .f4 { grid-column:span 3; }
        .f5 { grid-column:span 6; display:flex; align-items:center; gap:28px; min-height:0; }
        .f5::before { background:radial-gradient(circle,rgba(255,92,138,.35),transparent 65%); }
        .ico { position:relative; flex-shrink:0; width:52px; height:52px; border-radius:16px; display:grid; place-items:center; background:var(--grad); color:#fff; margin-bottom:22px; }
        .f5 .ico { margin-bottom:0; }
        .tile h3 { position:relative; font-size:25px; letter-spacing:-.025em; margin:0 0 10px; font-weight:650; }
        .f1 h3 { font-size:40px; }
        .tile p { position:relative; margin:0; color:var(--muted); font-size:16.5px; line-height:1.5; max-width:420px; }

        /* SHOWCASE */
        .show { display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:center; }
        .show h2 { font-size:clamp(32px,5vw,52px); letter-spacing:-.035em; line-height:1.06; margin:0 0 18px; font-weight:700; }
        .show > div > p { color:var(--muted); font-size:19px; line-height:1.55; margin:0 0 28px; }
        .ticks { list-style:none; padding:0; margin:0; display:grid; gap:14px; }
        .ticks li { display:flex; align-items:center; gap:12px; font-size:16.5px; }
        .ticks .tick { width:22px; height:22px; }
        .phone { position:relative; max-width:400px; margin:0 auto; border-radius:40px; padding:14px; background:linear-gradient(160deg,#2b2b35,#0f0f14); border:1px solid var(--line); box-shadow:0 50px 100px rgba(41,151,255,.18), 0 40px 80px rgba(0,0,0,.6); }
        .screen { border-radius:28px; background:#08080c; padding:22px 18px 20px; display:grid; gap:14px; }
        .bubble { background:rgba(255,255,255,.08); border-radius:18px 18px 4px 18px; padding:12px 15px; font-size:14.5px; justify-self:end; max-width:88%; }
        .pcard { border-radius:22px; overflow:hidden; background:#14141b; border:1px solid var(--line); }
        .pimg { height:150px; display:grid; place-items:center; background:radial-gradient(circle at 30% 20%,rgba(142,92,247,.6),transparent 60%),linear-gradient(135deg,#1d2b4a,#241a3e); }
        .pimg svg { color:rgba(255,255,255,.85); }
        .pbody { padding:16px 18px 18px; }
        .ptag { display:inline-flex; align-items:center; gap:6px; font-size:11.5px; color:#30d158; margin-bottom:8px; }
        .pbody h4 { margin:0 0 4px; font-size:17px; } .pmeta { display:flex; gap:14px; color:var(--muted); font-size:13px; margin-bottom:14px; }
        .pmeta span { display:inline-flex; align-items:center; gap:5px; } .pmeta svg { color:#febc2e; }
        .pbtns { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
        .pbtns span { text-align:center; border-radius:12px; padding:11px; font-size:14px; font-weight:600; background:rgba(255,255,255,.1); }
        .pbtns span:first-child { background:var(--blue); }
        .ex { text-align:center; font-size:12px; color:var(--muted); margin-top:16px; }

        /* STATS */
        .stats { display:grid; grid-template-columns:repeat(3,1fr); border-radius:28px; border:1px solid var(--line); background:var(--card); }
        .stat { padding:44px 28px; text-align:center; border-left:1px solid var(--line); }
        .stat:first-child { border-left:0; }
        .stat b { display:block; font-size:clamp(44px,7vw,76px); letter-spacing:-.05em; line-height:1; font-weight:800; margin-bottom:10px; }
        .stat span { color:var(--muted); font-size:16px; }

        /* STEPS */
        .steps { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
        .step { border-radius:28px; padding:34px 30px 36px; background:var(--card); border:1px solid var(--line); }
        .step-n { font-size:88px; font-weight:800; letter-spacing:-.06em; line-height:1; margin-bottom:22px; }
        .step h3 { font-size:21px; letter-spacing:-.02em; margin:0 0 10px; font-weight:650; }
        .step p { margin:0; color:var(--muted); font-size:15.5px; line-height:1.55; }

        /* FAQ */
        .faq { max-width:760px; margin:0 auto; border-top:1px solid var(--line); }
        .faq-item { border-bottom:1px solid var(--line); }
        .faq-q { width:100%; background:none; border:0; color:var(--text); text-align:left; cursor:pointer; padding:24px 0; display:flex; justify-content:space-between; align-items:center; gap:20px; font-size:19px; font-weight:600; letter-spacing:-.01em; }
        .faq-q svg { flex-shrink:0; color:var(--muted); transition:transform .3s; }
        .open .faq-q svg { transform:rotate(45deg); color:var(--blue); }
        .faq-a { display:grid; grid-template-rows:0fr; transition:grid-template-rows .35s ease; }
        .open .faq-a { grid-template-rows:1fr; }
        .faq-a p { overflow:hidden; margin:0; color:var(--muted); font-size:16.5px; line-height:1.6; }
        .open .faq-a p { padding-bottom:24px; }

        /* ASSISTANT + PRODUCTS */
        #assistant { scroll-margin-top:24px; padding-top:130px; }
        .assistant-shell { border-radius:32px; background:#f5f5f7; color:#1d1d1f; padding:8px; box-shadow:0 0 120px rgba(41,151,255,.25); }
        .grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
        .card { border-radius:24px; overflow:hidden; background:#111116; border:1px solid var(--line); transition:transform .3s; }
        .card:hover { transform:translateY(-4px); }
        .card-media { height:200px; display:grid; place-items:center; background:linear-gradient(135deg,#1d1d27,#101015); }
        .card-media svg { color:rgba(255,255,255,.25); }
        .card-body { padding:20px 22px 24px; } .card-body h4 { margin:0 0 4px; font-size:18px; }
        .variant { margin:0; font-size:14px; color:var(--muted); } .price { display:block; margin-top:14px; font-size:17px; font-weight:600; }

        /* CTA */
        .cta { position:relative; overflow:hidden; margin-top:130px; border-radius:36px; text-align:center; padding:104px 28px; border:1px solid var(--line);
          background:radial-gradient(ellipse at 15% 0%,rgba(41,151,255,.55),transparent 55%),radial-gradient(ellipse at 90% 100%,rgba(255,92,138,.5),transparent 55%),#0d0d13; }
        .cta h3 { font-size:clamp(32px,5.4vw,58px); letter-spacing:-.035em; line-height:1.06; margin:0 auto 16px; max-width:720px; font-weight:700; }
        .cta p { color:#c7c7cc; font-size:19px; margin:0 0 34px; }
        footer { margin-top:80px; border-top:1px solid var(--line); padding:28px 0 40px; font-size:13px; color:var(--muted); text-align:center; }

        @media (max-width:860px) {
          .hero { padding-top:64px; }
          .hero-crowd { height:240px; }
          .hero-grid { grid-template-columns:1fr; gap:32px; text-align:center; }
          .hero-copy { order:1; }
          .hero-anim { order:2; max-width:360px; height:320px; }
          .sub { margin-left:auto; margin-right:auto; }
          .ctas, .chips { justify-content:center; }
          .chips { margin:0 auto; }
          .bento,.steps,.grid,.show,.stats { grid-template-columns:1fr; }
          .f1,.f2,.f3,.f4,.f5 { grid-column:auto; } .f5 { flex-direction:column; align-items:flex-start; gap:18px; }
          .f1 h3 { font-size:32px; } .show { gap:44px; }
          .stat { border-left:0; border-top:1px solid var(--line); } .stat:first-child { border-top:0; }
          .section,#assistant { padding-top:84px; } .cta { margin-top:84px; padding:64px 22px; border-radius:28px; }
          .track span { font-size:22px; gap:40px; } .track { gap:40px; }
        }
        @media (prefers-reduced-motion:reduce) {
          .aurora span,.pulse::after,.caret,.track,.hero-crowd { animation:none; }
          .hero-crowd { display:none; }
          .rv { opacity:1; transform:none; transition:none; } .btn,.tile,.card { transition:none; }
        }
      `}</style>

      {/* HERO */}
      <section className="hero">
        <div className="aurora"><span className="a" /><span className="b" /><span className="c" /></div>

        {/* Walking crowd, anchored to the exact bottom edge of the hero (slowed down) */}
        <div className="hero-crowd" aria-hidden="true">
          <CrowdCanvas src={CROWD_SRC} rows={15} cols={7} speed={0.6} bounce={10} />
        </div>

        <div className="wrap">
          <div className="hero-grid">
            {/* LEFT: Lottie animation */}
            <div className="hero-anim">
              <HeroLottie data={heroAnimation} />
            </div>

            {/* RIGHT: intro text */}
            <div className="hero-copy">
              <span className="badge"><Sparkles size={14} /> Meet the {BRAND} shopping agent</span>
              <h1>Just say what you want.<br /><span className="grad">We’ll handle the rest.</span></h1>
              <p className="sub">Describe an item, a budget and a size. The agent searches the catalog, picks the best match and places the order once you approve.</p>
              <div className="ctas">
                <button className="btn main" onClick={() => scrollTo("assistant")}>Ask the agent <ArrowRight size={18} strokeWidth={2.4} /></button>
                <button className="btn ghost" onClick={() => scrollTo("how-it-works")}>See how it works</button>
              </div>
              <div className="chips">
                {CHIPS.map((c) => (
                  <button className="chip" key={c} onClick={() => scrollTo("assistant")}><MessageCircle size={14} />{c}</button>
                ))}
              </div>
            </div>
          </div>

          <div className="demo-wrap"><AgentDemo /></div>
        </div>
        <div className="marquee" aria-hidden="true">
          <div className="track">
            {[...CATEGORIES, ...CATEGORIES].map((c, i) => <span key={i}>{c}</span>)}
          </div>
        </div>
      </section>

      <div className="wrap">
        {/* FEATURES */}
        <section className="section">
          <Reveal>
            <div className="head">
              <h2>Shopping, <span className="grad">simplified.</span></h2>
              <p>Less searching and scrolling. More of what you actually wanted.</p>
            </div>
            <div className="bento">
              {FEATURES.map((f) => (
                <div className={"tile " + f.cls} key={f.title}>
                  <span className="ico"><f.icon size={24} strokeWidth={2} /></span>
                  <div><h3>{f.title}</h3><p>{f.body}</p></div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* SHOWCASE */}
        <section className="section">
          <Reveal className="show">
            <div>
              <h2>A clear answer, <span className="grad">not a wall of results.</span></h2>
              <p>The agent brings you one best match with the reasons behind it. You decide what happens next.</p>
              <ul className="ticks">
                {["One recommendation, with why it was picked", "Price, rating and delivery shown up front", "Approve it, or ask for something different"].map((t) => (
                  <li key={t}><span className="tick"><Check size={13} strokeWidth={3} /></span>{t}</li>
                ))}
              </ul>
            </div>
            <div>
              <div className="phone">
                <div className="screen">
                  <div className="bubble">Running shoes, size 9, under ₹4,000</div>
                  <div className="pcard">
                    <div className="pimg"><ShoppingBag size={52} strokeWidth={1.3} /></div>
                    <div className="pbody">
                      <div className="ptag"><Sparkles size={12} /> Best match</div>
                      <h4>Your suggested product</h4>
                      <div className="pmeta">
                        <span><Star size={13} fill="currentColor" /> Top rated</span>
                        <span><Truck size={13} /> Fast delivery</span>
                      </div>
                      <div className="pbtns"><span>Approve</span><span>Show another</span></div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="ex">Example of what you’ll see. Not real order data.</p>
            </div>
          </Reveal>
        </section>

        {/* STATS */}
        <section className="section">
          <Reveal>
            <div className="stats">
              <div className="stat"><b className="grad">1</b><span>message to get started</span></div>
              <div className="stat"><b className="grad">3</b><span>things compared for you</span></div>
              <div className="stat"><b className="grad">0</b><span>orders without your approval</span></div>
            </div>
          </Reveal>
        </section>

        {/* STEPS */}
        <section className="section" id="how-it-works">
          <Reveal>
            <div className="head">
              <h2>Three steps from request to order.</h2>
              <p>You describe what you need. The agent does the searching and comparing in between.</p>
            </div>
            <div className="steps">
              {STEPS.map((s, i) => (
                <div className="step" key={s.title}>
                  <div className="step-n grad">{i + 1}</div>
                  <h3>{s.title}</h3><p>{s.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ASSISTANT */}
        <div id="assistant">
          <Reveal>
            <div className="head">
              <h2>Try it <span className="grad">right now.</span></h2>
              <p>Type what you’re looking for and the agent takes it from there.</p>
            </div>
            <div className="assistant-shell"><AssistantChat products={products} /></div>
          </Reveal>
        </div>

        {/* PRODUCTS */}
        {products.length > 0 && (
          <section className="section">
            <Reveal>
              <div className="head"><h2>Available in the catalog.</h2></div>
              <div className="grid">
                {products.map((p) => (
                  <div className="card" key={p.name}>
                    <div className="card-media" style={p.color ? { background: p.color } : undefined}><ShoppingBag size={48} strokeWidth={1.2} /></div>
                    <div className="card-body">
                      <h4>{p.name}</h4>
                      {p.variant && <p className="variant">{p.variant}</p>}
                      {p.price && <span className="price">{p.price}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </section>
        )}

        {/* FAQ */}
        <section className="section">
          <Reveal>
            <div className="head"><h2>Questions, answered.</h2></div>
            <Faq />
          </Reveal>
        </section>

        {/* CTA */}
        <Reveal>
          <div className="cta">
            <h3>Not sure where to start? Just describe what you need.</h3>
            <p>For example: the kind of item, your budget and your size.</p>
            <button className="btn light" onClick={() => scrollTo("assistant")}>Start a request <ArrowRight size={18} strokeWidth={2.4} /></button>
          </div>
        </Reveal>

        <footer>&copy; {new Date().getFullYear()} {BRAND}. All rights reserved.</footer>
      </div>
    </div>
  );
}

export default Home;