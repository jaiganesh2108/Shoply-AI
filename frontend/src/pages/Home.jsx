import React, { useState, useEffect, useRef } from "react";
import {
  Search, ShoppingBag, ArrowRight, Check, Zap, RefreshCw, ShieldCheck, Truck,
  Star, Wallet, Plus, MessageCircle, Sparkles,
} from "lucide-react";
import lottie from "lottie-web";
import AssistantChat from "../components/AssistantChat/AssistantChat";
import CrowdCanvas from "../components/ui/crowd-canvas";
import heroAnimation from "../assets/OnlineShopping.json"; // adjust path if needed

const BRAND = "Shoply AI";
const CROWD_SRC =
  "https://cdn.21st.dev/assets/localized/abdb8990a7bef8c2f5af3e45f0a3c969c4b0603fba8be92e81347de4ea4e1ed7.png";

/* ---------------- content ---------------- */
const AGENT_SCRIPT = ["Understanding your request", "Searching the catalog", "Comparing price, reviews, delivery", "Best match ready for approval"];
const STAGE_OF_LINE = [0, 1, 1, 2];

/* Illustrative examples only, not real catalog data */
const EXAMPLES = [
  { q: "Running shoes, size 9, under ₹4,000", name: "Lightweight road runner", why: "Top-rated in size 9, ₹500 under budget", price: "₹3,499", rating: "4.6", eta: "Arrives tomorrow" },
  { q: "A gift for my mother, under ₹2,000, by Friday", name: "Silk-blend scarf set", why: "Gift-wrapped, arrives before Friday", price: "₹1,799", rating: "4.8", eta: "Arrives Thursday" },
  { q: "Wireless earbuds with the best reviews", name: "Noise-cancelling earbuds", why: "Highest rated in the catalog", price: "₹2,999", rating: "4.7", eta: "Arrives in 2 days" },
];

const CHIPS = ["Running shoes under ₹4,000", "A gift for my mother", "Backpack for college", "Wireless earbuds, best reviews"];
const CATEGORIES = ["Footwear", "Electronics", "Fashion", "Home", "Gifts", "Sports", "Beauty", "Accessories", "Kitchen", "Travel"];
const TRUST = [[ShieldCheck, "You approve every order"], [Wallet, "Stays inside your budget"], [Truck, "Checks delivery dates"]];

const STEPS = [
  { title: "Tell the agent what you need", body: "Type it like a text to a friend: what you want, your budget, your size." },
  { title: "It searches and compares", body: "The agent looks through the catalog and weighs price, reviews and delivery time." },
  { title: "You approve, it checks out", body: "Review the suggestion. Say yes and the agent completes the order." },
];

const FEATURES = [
  { cls: "t1 dk", icon: Search, title: "Understands you", body: "Describe what you want in plain words. No filters, no menus, no endless scrolling.",
    vis: <><span className="sp-bub u">Backpack for college, under ₹2,500</span><span className="sp-bub a">12 matches. Here’s the best one.</span></> },
  { cls: "t2", icon: RefreshCw, title: "Compares for you", body: "Price, reviews and delivery weighed side by side, so you don’t have to.",
    vis: [["Price", 82], ["Reviews", 94], ["Delivery", 70]].map(([l, w]) => <div className="sp-bar" key={l}><span>{l}</span><i style={{ "--w": w + "%" }} /></div>) },
  { cls: "t3 gd", icon: Zap, title: "Orders with your OK", body: "Nothing is bought until you approve it.",
    vis: <div className="sp-sw"><span>Approve order</span><span className="sp-sw-k" /></div> },
  { cls: "t4", icon: Wallet, title: "Sticks to your budget", body: "Say a number once. The agent stays under it.",
    vis: <><div className="sp-meter"><i style={{ "--w": "78%" }} /></div><div className="sp-mrow"><span>₹3,120 picked</span><span>₹4,000 limit</span></div></> },
  { cls: "t5", icon: Truck, title: "Knows delivery times", body: "Need it by Friday? Say so and it filters for you.",
    vis: <div className="sp-ship"><span>Ordered</span><span>Packed</span><span>Fri</span></div> },
];

const FAQ = [
  ["Will it buy something without asking me?", "No. The agent only suggests. An order is placed after you approve it."],
  ["What can I ask for?", "Anything in the catalog. Mention the item, your budget, your size or when you need it."],
  ["What if I don't like the suggestion?", "Tell the agent what to change, like a lower price or faster delivery, and it searches again."],
  ["Do I need to set filters?", "No. Describe what you want in your own words and the agent handles the rest."],
];

/* ---------------- helpers ---------------- */
const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

const spot = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", e.clientX - r.left + "px");
  e.currentTarget.style.setProperty("--my", e.clientY - r.top + "px");
};

function useInView(threshold = 0.15, once = true) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") { setSeen(true); return; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); if (once) io.disconnect(); } else if (!once) setSeen(false);
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, once]);
  return [ref, seen];
}

function Reveal({ children, className = "", delay = 0 }) {
  const [ref, seen] = useInView(0.12);
  return <div ref={ref} style={{ transitionDelay: delay + "ms" }} className={`sp-rv ${seen ? "in" : ""} ${className}`}>{children}</div>;
}

function Words({ text, start = 0 }) {
  return text.split(" ").map((w, i) => <span key={i} className="sp-w" style={{ animationDelay: start + i * 80 + "ms" }}>{w}</span>);
}

/* Button that leans toward a mouse pointer (touch and pen unaffected) */
function Mag({ className = "", onClick, children }) {
  const move = (e) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.16}px,${(e.clientY - r.top - r.height / 2) * 0.26}px)`;
  };
  return (
    <button type="button" className={"sp-btn " + className} onClick={onClick} onPointerMove={move}
      onPointerLeave={(e) => (e.currentTarget.style.transform = "")}>{children}</button>
  );
}

function HeroLottie({ data }) {
  const box = useRef(null);
  useEffect(() => {
    if (!box.current) return;
    const calm = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const anim = lottie.loadAnimation({ container: box.current, renderer: "svg", loop: true, autoplay: !calm, animationData: data });
    return () => anim.destroy();
  }, [data]);
  return <div ref={box} style={{ width: "100%", height: "100%" }} role="img" aria-label="Illustration of online shopping" />;
}

/* The signature moment: a looping, self-playing example of the agent at work.
   Pauses when off-screen. Reports its stage so the steps beside it can light up. */
function AgentDemo({ onStage }) {
  const [ref, active] = useInView(0.3, false);
  const [ex, setEx] = useState(0);
  const [typed, setTyped] = useState(0);
  const [done, setDone] = useState(0);
  const [card, setCard] = useState(false);
  const [ok, setOk] = useState(false);
  const E = EXAMPLES[ex];

  useEffect(() => {
    if (!active) return;
    let dead = false;
    const timers = [];
    const at = (ms, fn) => timers.push(setTimeout(() => !dead && fn(), ms));
    setTyped(0); setDone(0); setCard(false); setOk(false); onStage?.(0);
    E.q.split("").forEach((_, i) => at(300 + i * 28, () => setTyped(i + 1)));
    let t = 300 + E.q.length * 28 + 350;
    AGENT_SCRIPT.forEach((_, i) => at(t + i * 650, () => { setDone(i + 1); onStage?.(STAGE_OF_LINE[i]); }));
    t += AGENT_SCRIPT.length * 650 + 200;
    at(t, () => setCard(true));
    at(t + 1800, () => setOk(true));
    at(t + 4600, () => setEx((e) => (e + 1) % EXAMPLES.length));
    return () => { dead = true; timers.forEach(clearTimeout); };
  }, [ex, active]); // eslint-disable-line react-hooks/exhaustive-deps

  const ready = typed >= E.q.length;
  return (
    <div ref={ref} className="sp-dc" role="img" aria-label="Animated example of the agent finding a product and waiting for approval">
      <div className="sp-dc-bar">
        <span className="sp-dots"><i /><i /><i /></span>
        <span>{BRAND} agent · example, not real orders</span>
      </div>
      <div className="sp-prompt"><Sparkles size={16} />{E.q.slice(0, typed)}{!ready && <span className="sp-caret" />}</div>
      <div className="sp-lines">
        {AGENT_SCRIPT.map((l, i) => ready && i <= done && (
          <div className="sp-line" key={l}>
            {i < done ? <span className="sp-tick"><Check size={12} strokeWidth={3} /></span> : <span className="sp-pulse" />}
            {l}
          </div>
        ))}
      </div>
      <div className={"sp-res" + (card ? " on" : "")}>
        <div className="sp-res-img"><ShoppingBag size={26} /></div>
        <div>
          <b>{E.name}</b>
          <p>{E.why}</p>
          <span className="sp-meta"><Star size={13} fill="currentColor" />{E.rating}<Truck size={13} />{E.eta}</span>
        </div>
        <strong>{E.price}</strong>
        <span className={"sp-ok" + (ok ? " done" : "")}>{ok ? <><Check size={16} strokeWidth={3} /> Approved by you</> : "Approve"}</span>
      </div>
    </div>
  );
}

function How() {
  const [stage, setStage] = useState(0);
  return (
    <section className="sp-sec" id="how-it-works">
      <div className="sp-wrap">
        <Reveal>
          <div className="sp-head">
            <h2>From request to order in three steps.</h2>
            <p>You describe what you need. The agent does the searching and comparing in between.</p>
          </div>
        </Reveal>
        <div className="sp-how">
          <div className="sp-steps">
            {STEPS.map((s, i) => (
              <div className={"sp-step" + (stage === i ? " on" : "")} key={s.title}>
                <span className="sp-n">{i + 1}</span>
                <div><h3>{s.title}</h3><p>{s.body}</p></div>
              </div>
            ))}
          </div>
          <Reveal className="sp-sticky"><AgentDemo onStage={setStage} /></Reveal>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <div className="sp-faq">
      {FAQ.map(([q, a], i) => (
        <div className={"sp-fi" + (open === i ? " open" : "")} key={q}>
          <button className="sp-fq" id={`sp-q${i}`} aria-expanded={open === i} aria-controls={`sp-a${i}`} onClick={() => setOpen(open === i ? -1 : i)}>
            {q}<Plus size={22} />
          </button>
          <div className="sp-fa" id={`sp-a${i}`} role="region" aria-labelledby={`sp-q${i}`} aria-hidden={open !== i}><p>{a}</p></div>
        </div>
      ))}
    </div>
  );
}

/* `products` optional. Shape: { name, variant?, price?, color? } */
function Home({ products = [] }) {
  const heroRef = useRef(null);
  const barRef = useRef(null);
  const assistRef = useRef(null);
  const [fabOn, setFabOn] = useState(false);
  const [inAssistant, setInAssistant] = useState(false);
  const [prompt, setPrompt] = useState(null); // { text, id } consumed by AssistantChat
  const ask = (text) => { setPrompt({ text, id: Date.now() }); scrollTo("assistant"); };

  useEffect(() => {
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        if (barRef.current) barRef.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
        setFabOn(window.scrollY > 700);
      });
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => { window.removeEventListener("scroll", on); cancelAnimationFrame(raf); };
  }, []);

  useEffect(() => {
    const el = assistRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setInAssistant(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const heroMove = (e) => {
    if (e.pointerType !== "mouse" || !heroRef.current) return;
    const r = heroRef.current.getBoundingClientRect();
    heroRef.current.style.setProperty("--mx", e.clientX - r.left + "px");
    heroRef.current.style.setProperty("--my", e.clientY - r.top + "px");
  };

  const fab = fabOn && !inAssistant;

  return (
    <div className="sp">
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,800&family=Figtree:wght@400;500;600&display=swap");
        .sp{--plum:#1b1030;--plum2:#291754;--line:rgba(255,255,255,.14);--paper:#f3f0fa;--ink:#1b1030;--mute:#5c5470;--mute-d:#bfb5d6;--gold:#ffb320;--mag:#e6338f;--teal:#2bd4b0;
          background:var(--paper);color:var(--ink);min-height:100vh;overflow-x:clip;font:400 17px/1.55 Figtree,system-ui,sans-serif;-webkit-font-smoothing:antialiased}
        .sp *{box-sizing:border-box}
        .sp h1,.sp h2,.sp h3{font-family:"Bricolage Grotesque",Figtree,sans-serif;margin:0;letter-spacing:-.03em;line-height:1.05}
        .sp :where(p){margin:0}
        :where(.sp) button{font:inherit;color:inherit}
        .sp :focus-visible{outline:3px solid var(--gold);outline-offset:3px;border-radius:10px}
        .sp-wrap{max-width:1160px;margin:0 auto;padding:0 28px}
        .sp-rv{opacity:0;transform:translateY(24px);transition:opacity .8s ease,transform .8s cubic-bezier(.2,.7,.2,1)}
        .sp-rv.in{opacity:1;transform:none}
        .sp-rv>.sp-tile{height:100%}
        .sp-prog{position:fixed;top:0;left:0;right:0;height:3px;z-index:60;background:linear-gradient(90deg,var(--gold),var(--mag));transform:scaleX(0);transform-origin:left}

        .sp-btn{border:0;border-radius:14px;padding:15px 26px;font-weight:700;display:inline-flex;align-items:center;gap:10px;cursor:pointer;transition:transform .25s ease,box-shadow .3s,background .2s}
        .sp-btn:active{scale:.97}
        .sp-btn svg{transition:transform .3s}.sp-btn:hover svg{transform:translateX(4px)}
        .sp-btn.gold{background:var(--gold);color:var(--plum);box-shadow:0 12px 40px -8px rgba(255,179,32,.55)}
        .sp-btn.gold:hover{box-shadow:0 16px 50px -6px rgba(255,179,32,.8)}
        .sp-btn.ghost{background:rgba(255,255,255,.08);color:#f6f2ff;border:1px solid var(--line)}
        .sp-btn.ghost:hover{background:rgba(255,255,255,.16)}
        .sp-btn.dark{background:var(--plum);color:#fff}
        .sp-btn.dark:hover{background:var(--plum2)}

        /* HERO */
        .sp-hero{position:relative;isolation:isolate;overflow:hidden;background:var(--plum);color:#f6f2ff;padding:84px 0 clamp(180px,27vh,300px)}
        .sp-hero::before{content:"";position:absolute;inset:0;z-index:-1;background:radial-gradient(60% 55% at 10% 0%,rgba(255,179,32,.2),transparent 70%),radial-gradient(50% 50% at 96% 28%,rgba(230,51,143,.26),transparent 70%)}
        .sp-hero::after{content:"";position:absolute;inset:0;z-index:-1;pointer-events:none;background:radial-gradient(460px circle at var(--mx,72%) var(--my,28%),rgba(255,179,32,.11),transparent 60%)}
        .sp-crowd{position:absolute;left:0;right:0;bottom:0;height:clamp(240px,38vh,420px);z-index:-1;pointer-events:none;opacity:.55;
          filter:invert(1) sepia(1) saturate(6) hue-rotate(-8deg) brightness(1.25) drop-shadow(0 0 12px rgba(255,179,32,.4));
          animation:sp-hue 14s ease-in-out infinite alternate;
          -webkit-mask-image:linear-gradient(180deg,transparent,#000 45%);mask-image:linear-gradient(180deg,transparent,#000 45%)}
        @keyframes sp-hue{to{filter:invert(1) sepia(1) saturate(6) hue-rotate(-40deg) brightness(1.25) drop-shadow(0 0 12px rgba(230,51,143,.45))}}
        .sp-hgrid{display:grid;grid-template-columns:1.12fr .88fr;gap:48px;align-items:center}
        .sp-hero h1{font-size:clamp(42px,6.2vw,86px);font-weight:800;line-height:.97;letter-spacing:-.045em;margin-bottom:26px}
        .sp-w{display:inline-block;margin-right:.24em;animation:sp-word .9s cubic-bezier(.2,.8,.2,1) both}
        @keyframes sp-word{from{opacity:0;transform:translateY(.55em) rotate(2deg)}}
        @keyframes sp-rise{from{opacity:0;transform:translateY(18px)}}
        .sp-sub{font-size:clamp(17px,1.8vw,20px);color:var(--mute-d);max-width:500px;margin-bottom:32px;animation:sp-rise .9s .8s both}
        .sp-ctas{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:30px;animation:sp-rise .9s .95s both}
        .sp-try{font-size:14px;color:var(--mute-d);margin-bottom:12px;animation:sp-rise .9s 1.05s both}
        .sp-chips{display:flex;flex-wrap:wrap;gap:10px;max-width:580px;animation:sp-rise .9s 1.1s both}
        .sp-chip{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.06);border:1px solid var(--line);border-radius:99px;padding:9px 15px;font-size:14px;cursor:pointer;transition:background .2s,border-color .2s,transform .25s}
        .sp-chip:hover{background:rgba(255,179,32,.16);border-color:var(--gold);transform:translateY(-3px)}
        .sp-chip svg{color:var(--gold)}
        .sp-trust{list-style:none;padding:0;margin:34px 0 0;display:flex;flex-wrap:wrap;gap:12px 26px;font-size:14.5px;color:var(--mute-d);animation:sp-rise .9s 1.25s both}
        .sp-trust li{display:flex;align-items:center;gap:8px}.sp-trust svg{color:var(--gold)}
        .sp-frame{position:relative;aspect-ratio:1;width:100%;max-width:470px;margin-left:auto;padding:20px;border-radius:40px;border:1px solid var(--line);
          background:linear-gradient(160deg,rgba(255,255,255,.11),rgba(255,255,255,.03));backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);animation:sp-float 8s ease-in-out infinite,sp-rise 1s .4s both}
        .sp-frame::before{content:"";position:absolute;inset:-30px;z-index:-1;background:radial-gradient(circle,rgba(255,179,32,.28),transparent 65%);filter:blur(30px)}
        .sp-frame svg{width:100%!important;height:100%!important;display:block}
        @keyframes sp-float{50%{transform:translateY(-14px)}}

        /* CATEGORY BAND */
        .sp-band{background:var(--gold);color:var(--plum);overflow:hidden;padding:18px 0}
        .sp-track{display:flex;width:max-content;animation:sp-slide 38s linear infinite}
        .sp-band:hover .sp-track{animation-play-state:paused}
        .sp-track span{display:inline-flex;align-items:center;gap:36px;padding-right:36px;font:800 clamp(24px,3vw,34px)/1 "Bricolage Grotesque",Figtree,sans-serif;letter-spacing:-.03em;white-space:nowrap}
        @keyframes sp-slide{to{transform:translateX(-50%)}}

        /* SECTIONS */
        .sp-sec{padding:clamp(72px,10vw,128px) 0;scroll-margin-top:96px}
        .sp-head{display:flex;justify-content:space-between;align-items:flex-end;gap:20px 48px;flex-wrap:wrap;margin-bottom:52px}
        .sp-head h2{font-size:clamp(34px,5vw,60px);font-weight:800;max-width:14em}
        .sp-head p{color:var(--mute);max-width:380px;font-size:18px}
        .sp-dk{background:var(--plum);color:#f6f2ff}.sp-dk .sp-head p{color:var(--mute-d)}

        /* HOW */
        .sp-how{display:grid;grid-template-columns:.9fr 1.1fr;gap:56px;align-items:start}
        .sp-steps{display:grid;gap:14px}
        .sp-step{display:flex;gap:18px;padding:24px;border-radius:22px;border:1px solid transparent;transition:background .4s,border-color .4s,box-shadow .4s,opacity .4s;opacity:.55}
        .sp-step.on{background:#fff;border-color:rgba(27,16,48,.08);box-shadow:0 20px 50px -24px rgba(27,16,48,.35);opacity:1}
        .sp-n{flex-shrink:0;width:36px;height:36px;border-radius:50%;display:grid;place-items:center;font:800 16px "Bricolage Grotesque",sans-serif;background:rgba(27,16,48,.08);transition:background .4s,transform .4s}
        .sp-step.on .sp-n{background:var(--gold);transform:scale(1.12)}
        .sp-step h3{font-size:21px;margin-bottom:6px}.sp-step p{color:var(--mute);font-size:16px}
        .sp-sticky{position:sticky;top:110px}
        .sp-dc{background:var(--plum);color:#f6f2ff;border-radius:30px;padding:22px;border:1px solid var(--line);box-shadow:0 50px 90px -34px rgba(27,16,48,.6);min-height:460px}
        .sp-dc-bar{display:flex;align-items:center;gap:14px;font-size:12.5px;color:var(--mute-d);margin-bottom:18px}
        .sp-dots{display:flex;gap:6px}.sp-dots i{width:11px;height:11px;border-radius:50%;background:#ff5f57;display:block}.sp-dots i:nth-child(2){background:#febc2e}.sp-dots i:nth-child(3){background:#28c840}
        .sp-prompt{display:flex;align-items:center;gap:10px;min-height:54px;background:rgba(255,255,255,.08);border-radius:16px;padding:14px 16px;font-size:16px;margin-bottom:18px}
        .sp-prompt svg{color:var(--gold);flex-shrink:0}
        .sp-caret{width:2px;height:18px;background:var(--gold);animation:sp-blink 1s step-start infinite}
        @keyframes sp-blink{50%{opacity:0}}
        .sp-lines{display:grid;gap:10px;min-height:128px;align-content:start}
        .sp-line{display:flex;align-items:center;gap:12px;font-size:15px;color:#e9e3f7;animation:sp-pop .45s cubic-bezier(.3,1.4,.5,1)}
        @keyframes sp-pop{from{opacity:0;transform:translateX(-12px)}}
        .sp-tick{width:20px;height:20px;border-radius:50%;background:var(--teal);color:var(--plum);display:grid;place-items:center;flex-shrink:0}
        .sp-pulse{width:20px;height:20px;display:grid;place-items:center;flex-shrink:0}
        .sp-pulse::after{content:"";width:9px;height:9px;border-radius:50%;background:var(--gold);animation:sp-ping 1.6s infinite}
        @keyframes sp-ping{0%{box-shadow:0 0 0 0 rgba(255,179,32,.7)}100%{box-shadow:0 0 0 10px rgba(255,179,32,0)}}
        .sp-res{display:grid;grid-template-columns:64px 1fr auto;gap:6px 14px;align-items:center;margin-top:16px;padding:16px;border-radius:22px;background:#fff;color:var(--ink);
          opacity:0;transform:translateY(20px) scale(.97);transition:opacity .5s,transform .6s cubic-bezier(.3,1.3,.5,1)}
        .sp-res.on{opacity:1;transform:none}
        .sp-res-img{width:64px;height:64px;border-radius:18px;display:grid;place-items:center;color:#fff;background:linear-gradient(135deg,var(--gold),var(--mag))}
        .sp-res b{font:800 17px "Bricolage Grotesque",sans-serif;letter-spacing:-.02em}
        .sp-res p{font-size:13.5px;color:var(--mute);margin:2px 0 6px}
        .sp-res strong{font:800 20px "Bricolage Grotesque",sans-serif;align-self:start}
        .sp-meta{display:flex;align-items:center;gap:5px;font-size:12.5px;color:var(--mute)}.sp-meta svg{color:#e69a00}.sp-meta svg+svg,.sp-meta svg:last-of-type{margin-left:8px}
        .sp-ok{grid-column:1/-1;margin-top:8px;display:flex;align-items:center;justify-content:center;gap:8px;padding:12px;border-radius:14px;font-weight:700;background:var(--plum);color:#fff;transition:background .4s,color .4s}
        .sp-ok.done{background:var(--teal);color:var(--plum)}

        /* FEATURES */
        .sp-bento{display:grid;grid-template-columns:repeat(6,1fr);gap:18px}
        .t1,.t2{grid-column:span 3}.t3,.t4,.t5{grid-column:span 2}
        .sp-tile{position:relative;overflow:hidden;display:flex;flex-direction:column;gap:26px;padding:30px;border-radius:30px;background:#fff;border:1px solid rgba(27,16,48,.08);transition:transform .4s cubic-bezier(.2,.8,.2,1),box-shadow .4s}
        .sp-tile:hover{transform:translateY(-6px);box-shadow:0 30px 60px -28px rgba(27,16,48,.4)}
        .sp-tile::after{content:"";position:absolute;inset:0;pointer-events:none;opacity:0;transition:opacity .3s;background:radial-gradient(340px circle at var(--mx,50%) var(--my,50%),rgba(255,179,32,.2),transparent 60%)}
        .sp-tile:hover::after{opacity:1}
        .sp-tile.dk{background:var(--plum);color:#f6f2ff;border-color:transparent}.sp-tile.dk p{color:var(--mute-d)}
        .sp-tile.gd{background:var(--gold);border-color:transparent}.sp-tile.gd p{color:rgba(27,16,48,.75)}
        .sp-vis{flex:1;min-height:112px;display:flex;flex-direction:column;justify-content:center}
        .sp-ti{display:flex;align-items:center;gap:12px;margin-bottom:8px}
        .sp-ico{width:38px;height:38px;border-radius:12px;display:grid;place-items:center;background:rgba(27,16,48,.07);transition:transform .5s cubic-bezier(.3,1.5,.5,1)}
        .dk .sp-ico{background:rgba(255,255,255,.12)}.gd .sp-ico{background:rgba(27,16,48,.12)}
        .sp-tile:hover .sp-ico{transform:rotate(-10deg) scale(1.12)}
        .sp-tile h3{font-size:24px}.sp-tile p{color:var(--mute);font-size:16px;max-width:400px}
        .sp-bub{display:block;width:fit-content;max-width:90%;padding:10px 14px;border-radius:16px;font-size:14.5px}
        .sp-bub.u{margin-left:auto;background:rgba(255,255,255,.13);border-bottom-right-radius:4px}
        .sp-bub.a{margin-top:8px;background:var(--gold);color:var(--plum);border-bottom-left-radius:4px;font-weight:500}
        .sp-bar{display:grid;grid-template-columns:72px 1fr;align-items:center;gap:12px;font-size:13.5px;color:var(--mute);margin-bottom:12px}
        .sp-bar i,.sp-meter{display:block;height:10px;border-radius:99px;background:rgba(27,16,48,.08);position:relative;overflow:hidden}
        .sp-meter{height:14px}
        .sp-bar i::after,.sp-meter i::after{content:"";position:absolute;inset:0;width:var(--w);border-radius:inherit;background:linear-gradient(90deg,var(--gold),var(--mag));transform:scaleX(0);transform-origin:left;transition:transform 1.3s cubic-bezier(.2,.8,.2,1) .35s}
        .sp-meter i{display:block;position:absolute;inset:0}
        .sp-rv.in .sp-bar i::after,.sp-rv.in .sp-meter i::after{transform:scaleX(1)}
        .sp-mrow{display:flex;justify-content:space-between;margin-top:10px;font-size:13.5px;color:var(--mute)}
        .sp-sw{display:flex;align-items:center;justify-content:space-between;padding:14px 16px;border-radius:16px;background:rgba(27,16,48,.1);font-weight:600}
        .sp-sw-k{position:relative;width:48px;height:28px;border-radius:99px;background:rgba(27,16,48,.3);animation:sp-swb 4s infinite}
        .sp-sw-k::after{content:"";position:absolute;top:3px;left:3px;width:22px;height:22px;border-radius:50%;background:#fff;animation:sp-swk 4s infinite}
        @keyframes sp-swk{0%,40%{transform:none}55%,92%{transform:translateX(20px)}}
        @keyframes sp-swb{0%,40%{background:rgba(27,16,48,.3)}55%,92%{background:var(--plum)}}
        .sp-ship{position:relative;display:flex;padding-top:30px;font-size:13px;color:var(--mute)}
        .sp-ship span{flex:1;text-align:center;position:relative}
        .sp-ship span::before{content:"";position:absolute;top:-24px;left:50%;margin-left:-8px;width:16px;height:16px;border-radius:50%;background:#fff;border:3px solid var(--gold);z-index:1}
        .sp-ship::before,.sp-ship::after{content:"";position:absolute;top:-16px;left:16.66%;right:16.66%;height:3px;border-radius:9px;background:rgba(27,16,48,.1);margin-top:30px}
        .sp-ship::after{background:var(--gold);transform:scaleX(0);transform-origin:left;transition:transform 1.5s cubic-bezier(.2,.8,.2,1) .4s}
        .sp-rv.in .sp-ship::after{transform:scaleX(1)}

        /* ASSISTANT */
        .sp-chat{max-width:1000px;margin:0 auto}

        /* PRODUCTS */
        .sp-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:20px}
        .sp-card{border-radius:26px;overflow:hidden;background:#fff;border:1px solid rgba(27,16,48,.08);transition:transform .4s,box-shadow .4s;height:100%}
        .sp-card:hover{transform:translateY(-6px);box-shadow:0 30px 60px -28px rgba(27,16,48,.4)}
        .sp-card-m{height:190px;display:grid;place-items:center;color:rgba(27,16,48,.3);background:linear-gradient(135deg,#e9e2fb,#fbe9f2)}
        .sp-card-m svg{transition:transform .5s}.sp-card:hover .sp-card-m svg{transform:scale(1.2) rotate(-6deg)}
        .sp-card-b{padding:20px 22px 24px}.sp-card-b h3{font-size:19px}
        .sp-card-b p{color:var(--mute);font-size:14.5px;margin-top:2px}.sp-card-b strong{display:block;margin-top:14px;font:800 20px "Bricolage Grotesque",sans-serif}

        /* FAQ */
        .sp-faqg{display:grid;grid-template-columns:.8fr 1.2fr;gap:56px}
        .sp-faqg h2{font-size:clamp(34px,4.6vw,56px);font-weight:800;margin-bottom:14px}.sp-faqg .l p{color:var(--mute);font-size:18px;max-width:340px}
        .sp-faq{border-top:1px solid rgba(27,16,48,.14)}
        .sp-fi{border-bottom:1px solid rgba(27,16,48,.14)}
        .sp-fq{width:100%;background:none;border:0;text-align:left;cursor:pointer;padding:24px 0;display:flex;justify-content:space-between;align-items:center;gap:20px;font-size:19px;font-weight:600}
        .sp-fq svg{flex-shrink:0;color:var(--mute);transition:transform .4s cubic-bezier(.3,1.4,.5,1),color .3s}
        .sp-fi.open .sp-fq svg{transform:rotate(135deg);color:var(--mag)}
        .sp-fa{display:grid;grid-template-rows:0fr;opacity:0;transition:grid-template-rows .4s ease,opacity .4s}
        .sp-fi.open .sp-fa{grid-template-rows:1fr;opacity:1}
        .sp-fa p{overflow:hidden;color:var(--mute);font-size:17px}
        .sp-fi.open .sp-fa p{padding-bottom:24px}

        /* CTA + FOOTER */
        .sp-cta{position:relative;overflow:hidden;display:flex;justify-content:space-between;align-items:center;gap:32px;flex-wrap:wrap;padding:clamp(40px,7vw,88px);border-radius:40px;background:var(--gold);color:var(--plum)}
        .sp-cta::before{content:"";position:absolute;width:420px;height:420px;right:-120px;top:-160px;border-radius:50%;background:radial-gradient(circle,rgba(230,51,143,.55),transparent 65%);transition:transform 1.2s}
        .sp-cta:hover::before{transform:scale(1.25) translate(-30px,20px)}
        .sp-cta>*{position:relative}
        .sp-cta h2{font-size:clamp(32px,5vw,58px);font-weight:800;max-width:11em}
        .sp-cta p{margin-top:14px;font-size:18px;color:rgba(27,16,48,.8)}
        .sp-foot{margin-top:clamp(72px,10vw,120px);background:var(--plum);color:var(--mute-d);padding:36px 0;font-size:14.5px}
        .sp-foot .sp-wrap{display:flex;justify-content:space-between;align-items:center;gap:16px 32px;flex-wrap:wrap}
        .sp-foot nav{display:flex;gap:22px;flex-wrap:wrap}
        .sp-link{background:none;border:0;cursor:pointer;color:inherit;padding:0;transition:color .2s}.sp-link:hover{color:var(--gold)}

        .sp-fab{position:fixed;right:20px;bottom:20px;z-index:50;display:flex;align-items:center;gap:10px;padding:14px 20px;border:0;border-radius:99px;font-weight:700;cursor:pointer;
          background:var(--gold);color:var(--plum);box-shadow:0 14px 40px -6px rgba(255,179,32,.7);transform:translateY(90px) scale(.9);opacity:0;pointer-events:none;transition:transform .5s cubic-bezier(.3,1.4,.5,1),opacity .3s}
        .sp-fab.on{transform:none;opacity:1;pointer-events:auto}

        @media (max-width:960px){
          .sp-hgrid,.sp-how,.sp-faqg{grid-template-columns:1fr}
          .sp-hgrid{gap:40px}.sp-frame{max-width:340px;margin:0 auto}
          .sp-sticky{position:static}.sp-how{gap:36px}.sp-faqg{gap:28px}
          .sp-bento{grid-template-columns:repeat(2,1fr)}
          .t1,.t2,.t3,.t4{grid-column:span 1}.t5{grid-column:span 2}
        }
        @media (max-width:620px){
          .sp-wrap{padding:0 20px}.sp-hero{padding-top:56px}
          .sp-bento{grid-template-columns:1fr}.t1,.t2,.t3,.t4,.t5{grid-column:auto}
          .sp-tile{padding:24px}.sp-dc{padding:16px;min-height:0}.sp-res{grid-template-columns:52px 1fr auto}.sp-res-img{width:52px;height:52px}
          .sp-fab span{display:none}.sp-fab{padding:16px}.sp-step{padding:18px}
          .sp-cta{border-radius:28px}
        }
        @media (prefers-reduced-motion:reduce){
          .sp *,.sp *::before,.sp *::after{animation:none!important;transition:none!important}
          .sp-crowd{display:none}.sp-rv{opacity:1;transform:none}
          .sp-bar i::after,.sp-meter i::after,.sp-ship::after{transform:scaleX(1)}
        }
      `}</style>

      <div className="sp-prog" ref={barRef} aria-hidden="true" />

      {/* HERO */}
      <section className="sp-hero" ref={heroRef} onPointerMove={heroMove}>
        <div className="sp-crowd" aria-hidden="true">
          <CrowdCanvas src={CROWD_SRC} rows={15} cols={7} speed={0.6} bounce={10} />
        </div>
        <div className="sp-wrap">
          <div className="sp-hgrid">
            <div>
              <h1><Words text="Say what you want." start={150} /><br /><Words text="We find it. You approve it." start={480} /></h1>
              <p className="sp-sub">Describe an item, a budget and a size. The agent searches the catalog, picks the best match and places the order once you approve.</p>
              <div className="sp-ctas">
                <Mag className="gold" onClick={() => scrollTo("assistant")}>Ask the agent <ArrowRight size={18} strokeWidth={2.4} /></Mag>
                <Mag className="ghost" onClick={() => scrollTo("how-it-works")}>See how it works</Mag>
              </div>
              <p className="sp-try">Try asking</p>
              <div className="sp-chips">
                {CHIPS.map((c) => (
                  <button type="button" className="sp-chip" key={c} onClick={() => ask(c)}><MessageCircle size={14} />{c}</button>
                ))}
              </div>
              <ul className="sp-trust">{TRUST.map(([Icon, t]) => <li key={t}><Icon size={17} />{t}</li>)}</ul>
            </div>
            <div className="sp-frame"><HeroLottie data={heroAnimation} /></div>
          </div>
        </div>
      </section>

      <div className="sp-band" aria-hidden="true">
        <div className="sp-track">{[...CATEGORIES, ...CATEGORIES].map((c, i) => <span key={i}>{c}<Sparkles size={22} /></span>)}</div>
      </div>

      <How />

      {/* FEATURES */}
      <section className="sp-sec" id="features" style={{ paddingTop: 0 }}>
        <div className="sp-wrap">
          <Reveal>
            <div className="sp-head">
              <h2>Shopping without the scrolling.</h2>
              <p>Less searching, fewer tabs. More of what you actually wanted.</p>
            </div>
          </Reveal>
          <div className="sp-bento">
            {FEATURES.map((f, i) => (
              <Reveal className={f.cls.split(" ")[0]} delay={i * 80} key={f.title}>
                <div className={"sp-tile " + f.cls.split(" ").slice(1).join(" ")} onMouseMove={spot}>
                  <div className="sp-vis">{f.vis}</div>
                  <div>
                    <div className="sp-ti"><span className="sp-ico"><f.icon size={20} /></span><h3>{f.title}</h3></div>
                    <p>{f.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ASSISTANT */}
      <section className="sp-sec sp-dk" id="assistant" ref={assistRef}>
        <div className="sp-wrap">
          <Reveal>
            <div className="sp-head">
              <h2>Try it right now.</h2>
              <p>Type what you’re looking for and the agent takes it from there.</p>
            </div>
            <div className="sp-chat"><AssistantChat products={products} brand={BRAND} pendingPrompt={prompt} /></div>
          </Reveal>
        </div>
      </section>

      {/* PRODUCTS */}
      {products.length > 0 && (
        <section className="sp-sec" style={{ paddingBottom: 0 }}>
          <div className="sp-wrap">
            <Reveal><div className="sp-head"><h2>Available in the catalog.</h2></div></Reveal>
            <div className="sp-grid">
              {products.map((pr, i) => (
                <Reveal delay={(i % 4) * 80} key={pr.name}>
                  <div className="sp-card">
                    <div className="sp-card-m" style={pr.color ? { background: pr.color } : undefined}><ShoppingBag size={48} strokeWidth={1.3} /></div>
                    <div className="sp-card-b">
                      <h3>{pr.name}</h3>
                      {pr.variant && <p>{pr.variant}</p>}
                      {pr.price && <strong>{pr.price}</strong>}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="sp-sec" id="faq">
        <div className="sp-wrap">
          <Reveal className="sp-faqg">
            <div className="l"><h2>Questions, answered.</h2><p>Still unsure? Ask the agent directly. It’s the quickest way to find out.</p></div>
            <Faq />
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <div className="sp-wrap">
        <Reveal>
          <div className="sp-cta">
            <div>
              <h2>Not sure where to start? Describe what you need.</h2>
              <p>The kind of item, your budget and your size is enough.</p>
            </div>
            <Mag className="dark" onClick={() => scrollTo("assistant")}>Start a request <ArrowRight size={18} strokeWidth={2.4} /></Mag>
          </div>
        </Reveal>
      </div>

      <footer className="sp-foot">
        <div className="sp-wrap">
          <span>&copy; {new Date().getFullYear()} {BRAND}. All rights reserved.</span>
          <nav aria-label="Page sections">
            <button className="sp-link" onClick={() => scrollTo("how-it-works")}>How it works</button>
            <button className="sp-link" onClick={() => scrollTo("features")}>Features</button>
            <button className="sp-link" onClick={() => scrollTo("faq")}>FAQ</button>
            <button className="sp-link" onClick={() => scrollTo("assistant")}>Try the agent</button>
          </nav>
        </div>
      </footer>

      <button className={"sp-fab" + (fab ? " on" : "")} tabIndex={fab ? 0 : -1} aria-label="Ask the agent" onClick={() => scrollTo("assistant")}>
        <MessageCircle size={20} /><span>Ask the agent</span>
      </button>
    </div>
  );
}

export default Home;