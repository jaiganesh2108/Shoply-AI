import { useEffect, useRef, useState } from "react";
import {
  Bot, Send, ShoppingBag, RotateCcw, X, MessageCircle, ShieldCheck, Sparkles, RefreshCw,
} from "lucide-react";
import { sendMessage } from "../../api/ai";

/*
  Props
  - variant        "inline" (default, sits inside the #assistant section) | "floating" (bottom-right bubble)
  - brand          name shown in the header
  - products       optional. Items with `pick: true` show as chips
  - pendingPrompt  optional { text, id }. When `id` changes, the text is sent automatically
                   (used by the hero chips on the home page)
*/

const QUICK_PROMPTS = [
  "Running shoes under ₹4,000",
  "A gift for my mother",
  "Backpack for college",
  "Wireless earbuds, best reviews",
];

const STATUS_STEPS = [
  "Understanding your request",
  "Searching the catalog",
  "Comparing price, reviews, delivery",
];

const makeWelcome = (brand) => ({
  role: "assistant",
  text: `Hi, I'm the ${brand} shopping agent. Tell me what you need, plus your budget, size or delivery date, and I'll find the best match. I never order without your approval.`,
});

function AssistantChat({
  products = [],
  variant = "inline",
  brand = "Norda",
  pendingPrompt = null,
}) {
  const floating = variant === "floating";

  const [isOpen, setIsOpen] = useState(false); // floating mode only
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);
  const [messages, setMessages] = useState(() => [makeWelcome(brand)]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [statusIdx, setStatusIdx] = useState(0);

  const logRef = useRef(null);
  const inputRef = useRef(null);
  const panelRef = useRef(null);
  const sendRef = useRef(null);
  const lastPromptId = useRef(null);

  /* Scroll only the message list, never the page */
  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  /* Cycle the agent status text while waiting for the API */
  useEffect(() => {
    if (!isTyping) return;
    setStatusIdx(0);
    const t = setInterval(() => setStatusIdx((i) => Math.min(i + 1, STATUS_STEPS.length - 1)), 1500);
    return () => clearInterval(t);
  }, [isTyping]);

  /* Floating mode: focus, Escape and outside click */
  useEffect(() => {
    if (!floating || !isOpen) return;
    setHasOpenedOnce(true);
    const focusTimer = setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 220);
    const onKeyDown = (e) => { if (e.key === "Escape") setIsOpen(false); };
    const onDown = (e) => {
      if (panelRef.current?.contains(e.target)) return;
      if (e.target.closest?.(".ac-fab")) return;
      setIsOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onDown);
    return () => {
      clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onDown);
    };
  }, [floating, isOpen]);

  /* history sent to the API: everything except the welcome text and error notes */
  const buildHistory = (list) =>
    list.slice(1).filter((m) => !m.error).map((m) => ({ role: m.role, content: m.text }));

  const handleSend = async (value, { retry = false } = {}) => {
    const trimmed = (value || "").trim();
    if (!trimmed || isTyping) return;

    const base = retry ? messages.filter((m) => !m.error) : messages;
    const next = retry ? base : [...base, { role: "user", text: trimmed }];
    setMessages(next);
    setInput("");
    setIsTyping(true);

    try {
      // The second argument is ignored by the API helper if it doesn't use it
      const data = await sendMessage(trimmed, buildHistory(next));
      const reply = (data && data.reply ? String(data.reply) : "").trim();
      setMessages((cur) => [
        ...cur.filter((m) => !m.error),
        { role: "assistant", text: reply || "I couldn't find an answer for that. Try rephrasing your request." },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((cur) => [
        ...cur.filter((m) => !m.error),
        {
          role: "assistant",
          error: true,
          retryText: trimmed,
          text: "I couldn't reach the shop right now. Check your connection and try again.",
        },
      ]);
    } finally {
      setIsTyping(false);
      inputRef.current?.focus({ preventScroll: true });
    }
  };
  sendRef.current = handleSend;

  /* Prompts pushed in from the page (hero chips) */
  useEffect(() => {
    if (!pendingPrompt || pendingPrompt.id === lastPromptId.current) return;
    lastPromptId.current = pendingPrompt.id;
    if (floating) setIsOpen(true);
    sendRef.current(pendingPrompt.text);
  }, [pendingPrompt, floating]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSend(input);
  };

  const handleReset = () => {
    if (isTyping) return;
    setMessages([makeWelcome(brand)]);
    setInput("");
    inputRef.current?.focus({ preventScroll: true });
  };

  const canSend = input.trim().length > 0 && !isTyping;
  const picks = products.filter((p) => p.pick).slice(0, 3);
  const showQuickPrompts = messages.length === 1;

  const panel = (
    <div
      className="ac-panel"
      ref={panelRef}
      role={floating ? "dialog" : "region"}
      aria-label={`${brand} shopping agent`}
    >
      <div className="ac-top">
        <div className="ac-title">
          <span className="ac-logo" aria-hidden="true"><Sparkles size={16} /></span>
          <div>
            <strong>{brand} Agent</strong>
            <span><i className="ac-live" />Online · You approve every order</span>
          </div>
        </div>
        <div className="ac-actions">
          <button
            className="ac-icon-btn"
            type="button"
            onClick={handleReset}
            disabled={isTyping || messages.length < 2}
            aria-label="Start a new request"
            title="Start a new request"
          >
            <RotateCcw size={14} strokeWidth={2.2} />
          </button>
          {floating && (
            <button className="ac-icon-btn" type="button" onClick={() => setIsOpen(false)} aria-label="Close chat" title="Close chat">
              <X size={15} strokeWidth={2.2} />
            </button>
          )}
        </div>
      </div>

      <div className="ac-log" ref={logRef} role="log" aria-live="polite" aria-label="Conversation with the shopping agent">
        {messages.map((m, i) => (
          <div className={`ac-row ${m.role}`} key={i}>
            {m.role === "assistant" && (
              <span className="ac-avatar" aria-hidden="true"><Bot size={12} strokeWidth={2.2} /></span>
            )}
            <div className={`ac-msg ${m.role}${m.error ? " err" : ""}`}>
              {m.text}
              {m.error && (
                <button
                  type="button"
                  className="ac-retry"
                  onClick={() => handleSend(m.retryText, { retry: true })}
                  disabled={isTyping}
                >
                  <RefreshCw size={12} strokeWidth={2.4} /> Try again
                </button>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="ac-row assistant">
            <span className="ac-avatar" aria-hidden="true"><Bot size={12} strokeWidth={2.2} /></span>
            <div className="ac-msg assistant ac-status" aria-label="The agent is working">
              <span className="ac-dots" aria-hidden="true"><span /><span /><span /></span>
              {STATUS_STEPS[statusIdx]}
            </div>
          </div>
        )}
      </div>

      {picks.length > 0 && (
        <div className="ac-picks">
          {picks.map((p) => (
            <div className="ac-pick" key={p.name}>
              <span className="ac-pick-ico"><ShoppingBag size={10} strokeWidth={2} /></span>
              <strong>{p.name}</strong>
              {p.price && <span className="ac-pick-price">{p.price}</span>}
            </div>
          ))}
        </div>
      )}

      {showQuickPrompts && (
        <div className="ac-prompts">
          {QUICK_PROMPTS.map((q) => (
            <button className="ac-prompt" key={q} type="button" onClick={() => handleSend(q)} disabled={isTyping}>
              {q}
            </button>
          ))}
        </div>
      )}

      <form className="ac-form" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          className="ac-input"
          type="text"
          value={input}
          maxLength={500}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Try: running shoes, size 9, under ₹4,000"
          aria-label="Describe what you want to buy"
          autoComplete="off"
        />
        <button className="ac-send" type="submit" aria-label="Send message" disabled={!canSend}>
          <Send size={16} strokeWidth={2.2} />
        </button>
      </form>
      <p className="ac-note"><ShieldCheck size={13} /> Nothing is ordered until you approve it. The agent can make mistakes.</p>
    </div>
  );

  return (
    <>
      <style>{`
        .ac-root {
          --ac-line: rgba(255,255,255,.12);
          --ac-text: #f5f5f7;
          --ac-muted: #a1a1a6;
          --ac-blue: #2997ff;
          --ac-violet: #8e5cf7;
          --ac-pink: #ff5c8a;
          --ac-green: #30d158;
          --ac-grad: linear-gradient(90deg,#2997ff,#8e5cf7 55%,#ff5c8a);
          color: var(--ac-text);
          font-family: -apple-system,BlinkMacSystemFont,"SF Pro Display","Inter","Segoe UI",sans-serif;
          -webkit-font-smoothing: antialiased;
        }
        .ac-root * { box-sizing: border-box; }
        .ac-root button { font-family: inherit; }
        .ac-root button:focus-visible,
        .ac-root input:focus-visible { outline: 2px solid var(--ac-blue); outline-offset: 2px; }

        /* Inline: lives in the page, glowing like the hero demo */
        .ac-inline { position: relative; }
        .ac-inline::before {
          content: ""; position: absolute; inset: -2px; border-radius: 30px;
          background: var(--ac-grad); opacity: .35; filter: blur(36px); pointer-events: none;
        }
        .ac-inline .ac-panel { position: relative; height: min(640px, 82vh); min-height: 460px; border-radius: 28px; }

        /* Floating: bottom-right bubble */
        .ac-floating { position: fixed; right: 22px; bottom: 22px; z-index: 1000; display: flex; flex-direction: column; align-items: flex-end; gap: 14px; }
        .ac-floating .ac-panel {
          width: min(390px, calc(100vw - 44px)); height: min(580px, calc(100vh - 120px)); border-radius: 22px;
          transform-origin: bottom right; animation: ac-in .22s cubic-bezier(.2,.8,.3,1) both;
        }
        @keyframes ac-in { from { opacity: 0; transform: scale(.94) translateY(10px); } to { opacity: 1; transform: none; } }

        .ac-fab {
          position: relative; width: 58px; height: 58px; border-radius: 50%; border: 0; cursor: pointer;
          background: var(--ac-grad); color: #fff; display: grid; place-items: center;
          box-shadow: 0 14px 34px -8px rgba(41,151,255,.55); transition: transform .18s ease;
        }
        .ac-fab:hover { transform: translateY(-2px) scale(1.04); }
        .ac-fab .swap { position: relative; width: 22px; height: 22px; display: grid; place-items: center; }
        .ac-fab .swap svg { position: absolute; transition: opacity .15s ease, transform .15s ease; }
        .ac-fab .swap svg.hide { opacity: 0; transform: scale(.6) rotate(-20deg); }
        .ac-fab .ping { position: absolute; top: -2px; right: -2px; width: 13px; height: 13px; border-radius: 50%; background: var(--ac-green); border: 2px solid #000; }
        .ac-fab .ping::after { content: ""; position: absolute; inset: 0; border-radius: 50%; background: var(--ac-green); animation: ac-pulse 1.8s ease-out infinite; }
        @keyframes ac-pulse { 0% { transform: scale(1); opacity: .7; } 100% { transform: scale(2.4); opacity: 0; } }

        /* Panel */
        .ac-panel {
          display: flex; flex-direction: column; overflow: hidden;
          background: rgba(14,14,20,.94); border: 1px solid var(--ac-line);
          backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
          box-shadow: 0 40px 90px rgba(0,0,0,.55);
        }
        .ac-top { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 14px 16px; border-bottom: 1px solid var(--ac-line); flex-shrink: 0; }
        .ac-title { display: flex; align-items: center; gap: 12px; min-width: 0; }
        .ac-logo { width: 36px; height: 36px; border-radius: 12px; background: var(--ac-grad); display: grid; place-items: center; color: #fff; flex-shrink: 0; }
        .ac-title strong { display: block; font-size: 15px; font-weight: 650; letter-spacing: -.01em; line-height: 1.2; }
        .ac-title span { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--ac-muted); margin-top: 2px; }
        .ac-live { width: 7px; height: 7px; border-radius: 50%; background: var(--ac-green); box-shadow: 0 0 0 3px rgba(48,209,88,.18); flex-shrink: 0; }
        .ac-actions { display: flex; gap: 6px; flex-shrink: 0; }
        .ac-icon-btn { width: 32px; height: 32px; border-radius: 10px; border: 1px solid var(--ac-line); background: rgba(255,255,255,.06); color: var(--ac-muted); display: grid; place-items: center; cursor: pointer; transition: color .15s, border-color .15s, background .15s; }
        .ac-icon-btn:hover:not(:disabled) { color: #fff; border-color: rgba(255,255,255,.3); background: rgba(255,255,255,.12); }
        .ac-icon-btn:disabled { opacity: .35; cursor: not-allowed; }

        /* Messages */
        .ac-log { flex: 1; min-height: 0; overflow-y: auto; display: flex; flex-direction: column; gap: 14px; padding: 20px 16px; overscroll-behavior: contain; scrollbar-width: thin; scrollbar-color: rgba(255,255,255,.2) transparent; }
        .ac-row { display: flex; align-items: flex-end; gap: 8px; animation: ac-msg .24s ease both; }
        .ac-row.user { justify-content: flex-end; }
        @keyframes ac-msg { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        .ac-avatar { width: 24px; height: 24px; border-radius: 50%; background: rgba(255,255,255,.1); color: var(--ac-blue); display: grid; place-items: center; flex-shrink: 0; }
        .ac-msg { max-width: 82%; padding: 11px 15px; border-radius: 18px; font-size: 14.5px; line-height: 1.55; white-space: pre-wrap; overflow-wrap: anywhere; }
        .ac-msg.user { background: linear-gradient(135deg,#2997ff,#8e5cf7); color: #fff; border-bottom-right-radius: 5px; }
        .ac-msg.assistant { background: rgba(255,255,255,.08); border: 1px solid var(--ac-line); border-bottom-left-radius: 5px; }
        .ac-msg.err { border-color: rgba(255,92,138,.5); }
        .ac-retry { display: inline-flex; align-items: center; gap: 6px; margin-top: 10px; padding: 6px 12px; border-radius: 980px; border: 1px solid var(--ac-line); background: rgba(255,255,255,.1); color: var(--ac-text); font-size: 12.5px; font-weight: 600; cursor: pointer; }
        .ac-retry:hover:not(:disabled) { background: rgba(255,255,255,.18); }
        .ac-retry:disabled { opacity: .5; cursor: not-allowed; }
        .ac-status { display: flex; align-items: center; gap: 10px; color: #d2d2d7; }
        .ac-dots { display: inline-flex; gap: 4px; }
        .ac-dots span { width: 5px; height: 5px; border-radius: 50%; background: var(--ac-blue); animation: ac-bounce 1s ease-in-out infinite; }
        .ac-dots span:nth-child(2) { animation-delay: .14s; }
        .ac-dots span:nth-child(3) { animation-delay: .28s; }
        @keyframes ac-bounce { 0%,100% { transform: translateY(0); opacity: .4; } 50% { transform: translateY(-3px); opacity: 1; } }

        /* Picks and quick prompts */
        .ac-picks { display: flex; gap: 8px; overflow-x: auto; padding: 0 16px 10px; flex-shrink: 0; }
        .ac-pick { display: flex; align-items: center; gap: 8px; flex-shrink: 0; white-space: nowrap; border: 1px solid var(--ac-line); background: rgba(255,255,255,.06); border-radius: 980px; padding: 6px 12px 6px 8px; font-size: 12.5px; }
        .ac-pick-ico { width: 20px; height: 20px; border-radius: 50%; background: rgba(255,255,255,.1); display: grid; place-items: center; }
        .ac-pick-price { color: var(--ac-muted); }
        .ac-prompts { display: flex; flex-wrap: wrap; gap: 8px; padding: 0 16px 14px; flex-shrink: 0; }
        .ac-prompt { border: 1px solid var(--ac-line); background: rgba(255,255,255,.06); color: #d2d2d7; border-radius: 980px; padding: 8px 14px; font-size: 13px; cursor: pointer; transition: background .2s, border-color .2s; }
        .ac-prompt:hover:not(:disabled) { background: rgba(255,255,255,.13); border-color: rgba(255,255,255,.3); }
        .ac-prompt:disabled { opacity: .5; cursor: not-allowed; }

        /* Input */
        .ac-form { display: flex; gap: 10px; padding: 12px 16px 8px; border-top: 1px solid var(--ac-line); flex-shrink: 0; }
        .ac-input { flex: 1; min-width: 0; border: 1px solid var(--ac-line); border-radius: 980px; padding: 13px 18px; font: inherit; font-size: 15px; color: var(--ac-text); background: rgba(255,255,255,.07); transition: border-color .15s, box-shadow .15s; }
        .ac-input::placeholder { color: #6e6e73; }
        .ac-input:focus { outline: none; border-color: var(--ac-blue); box-shadow: 0 0 0 3px rgba(41,151,255,.22); }
        .ac-send { width: 48px; height: 48px; flex-shrink: 0; border: 0; border-radius: 50%; cursor: pointer; background: var(--ac-blue); color: #fff; display: grid; place-items: center; box-shadow: 0 8px 24px rgba(41,151,255,.4); transition: transform .15s, opacity .15s; }
        .ac-send:hover:not(:disabled) { transform: scale(1.06); }
        .ac-send:disabled { opacity: .35; cursor: not-allowed; box-shadow: none; }
        .ac-note { display: flex; align-items: center; justify-content: center; gap: 6px; margin: 0; padding: 4px 16px 14px; font-size: 12px; color: var(--ac-muted); flex-shrink: 0; }
        .ac-note svg { color: var(--ac-green); flex-shrink: 0; }

        @media (max-width: 560px) {
          .ac-inline .ac-panel { border-radius: 22px; height: min(600px, 80vh); }
          .ac-msg { max-width: 88%; font-size: 14px; }
          .ac-floating { right: 14px; bottom: 14px; }
          .ac-floating .ac-panel { width: calc(100vw - 28px); height: calc(100vh - 100px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ac-row, .ac-floating .ac-panel, .ac-fab .ping::after, .ac-dots span { animation: none; }
          .ac-fab, .ac-send, .ac-prompt { transition: none; }
        }
      `}</style>

      {floating ? (
        <div className="ac-root ac-floating">
          {isOpen && panel}
          <button
            className="ac-fab"
            type="button"
            onClick={() => setIsOpen((o) => !o)}
            aria-label={isOpen ? "Close chat assistant" : "Open chat assistant"}
            aria-expanded={isOpen}
          >
            {!hasOpenedOnce && <span className="ping" aria-hidden="true" />}
            <span className="swap" aria-hidden="true">
              <MessageCircle size={22} strokeWidth={2} className={isOpen ? "hide" : ""} />
              <X size={22} strokeWidth={2} className={isOpen ? "" : "hide"} />
            </span>
          </button>
        </div>
      ) : (
        <div className="ac-root ac-inline">{panel}</div>
      )}
    </>
  );
}

export default AssistantChat;