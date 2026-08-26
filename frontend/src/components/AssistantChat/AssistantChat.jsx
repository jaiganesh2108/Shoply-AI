import { useEffect, useRef, useState } from "react";
import { Bot, Sparkles, Send, ShoppingBag, RotateCcw, X, MessageCircle } from "lucide-react";
import { sendMessage } from "../../api/ai";

const QUICK_PROMPTS = [
  "Show me something under a budget",
  "Recommend a daily carry item",
  "What should I buy for work?",
  "Help me find a gift",
];

const WELCOME_MESSAGE = {
  role: "assistant",
  text: "I’m your shop assistant. Ask for a product type, budget, or use case and I’ll help you find it.",
};

function AssistantChat({ products = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false); // true while waiting on the API
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
      setHasOpenedOnce(true);
      // let the panel mount/animate in before focusing
      const t = setTimeout(() => inputRef.current?.focus(), 220);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // Close on Escape, and on outside click
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    const onClick = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        // ignore clicks on the toggle button itself; it has its own handler
        if (!e.target.closest(".assistant-fab")) setIsOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onClick);
    };
  }, [isOpen]);

  // Real API-backed send, wired into the same UI flow as before.
  const handleSend = async (value) => {
    const trimmed = value.trim();
    if (!trimmed || isTyping) {
      return;
    }

    setMessages((current) => [...current, { role: "user", text: trimmed }]);
    setInput("");
    setIsTyping(true);

    try {
      const data = await sendMessage(trimmed);
      setMessages((current) => [
        ...current,
        { role: "assistant", text: data.reply },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((current) => [
        ...current,
        { role: "assistant", text: "Sorry, something went wrong." },
      ]);
    } finally {
      setIsTyping(false);
      inputRef.current?.focus();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSend(input);
  };

  const handleReset = (event) => {
    event.stopPropagation();
    if (isTyping) return;
    setMessages([WELCOME_MESSAGE]);
    setInput("");
    inputRef.current?.focus();
  };

  const canSend = input.trim().length > 0 && !isTyping;
  const picks = products.filter((product) => product.pick).slice(0, 3);
  const showQuickPrompts = messages.length < 3;

  return (
    <>
      <style>{`
        .assistant-widget-root {
          position: fixed;
          right: 22px;
          bottom: 22px;
          z-index: 1000;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 14px;
        }

        /* Floating toggle button */
        .assistant-fab {
          width: 58px;
          height: 58px;
          border-radius: 50%;
          border: none;
          background: var(--ink);
          color: var(--paper);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 14px 30px -10px rgba(34, 29, 23, 0.45);
          transition: transform 0.18s ease, background 0.18s ease, box-shadow 0.18s ease;
          flex-shrink: 0;
          position: relative;
        }
        .assistant-fab:hover { background: var(--rust); transform: translateY(-2px); }
        .assistant-fab:active { transform: translateY(0); }
        .assistant-fab .fab-icon-swap {
          position: relative;
          width: 22px;
          height: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .assistant-fab .fab-icon-swap svg {
          position: absolute;
          transition: opacity 0.15s ease, transform 0.15s ease;
        }
        .assistant-fab .fab-icon-swap svg.hide {
          opacity: 0;
          transform: scale(0.6) rotate(-20deg);
        }
        .assistant-fab .fab-icon-swap svg.show {
          opacity: 1;
          transform: scale(1) rotate(0deg);
        }
        .fab-ping {
          position: absolute;
          top: -3px;
          right: -3px;
          width: 13px;
          height: 13px;
          border-radius: 50%;
          background: var(--rust);
          border: 2px solid var(--paper);
        }
        .fab-ping::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: var(--rust);
          animation: fab-pulse 1.8s ease-out infinite;
        }
        @keyframes fab-pulse {
          0% { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(2.4); opacity: 0; }
        }

        /* Chat panel */
        .assistant-panel {
          width: min(380px, calc(100vw - 44px));
          height: min(560px, calc(100vh - 120px));
          background: linear-gradient(180deg, #fffefb 0%, #f6f0e5 100%);
          border: 1px solid var(--line);
          border-radius: 18px;
          box-shadow: 0 30px 70px -30px rgba(34, 29, 23, 0.4);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transform-origin: bottom right;
          animation: panel-in 0.22s cubic-bezier(0.2, 0.8, 0.3, 1) both;
        }
        @keyframes panel-in {
          from { opacity: 0; transform: scale(0.94) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        .panel-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          padding: 14px 14px 14px 16px;
          border-bottom: 1px solid var(--line);
          background: linear-gradient(180deg, #ffffff 0%, #faf8f2 100%);
          flex-shrink: 0;
        }
        .panel-title {
          display: flex;
          align-items: center;
          gap: 9px;
          min-width: 0;
        }
        .panel-title .dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: var(--ledger);
          box-shadow: 0 0 0 4px rgba(91, 111, 82, 0.12);
          flex-shrink: 0;
        }
        .panel-title-text strong {
          display: block;
          font-size: 13.5px;
          font-weight: 700;
          color: var(--ink);
          line-height: 1.2;
        }
        .panel-title-text span {
          display: block;
          font-family: "JetBrains Mono", monospace;
          font-size: 10.5px;
          color: var(--muted);
          margin-top: 1px;
        }
        .panel-top-actions {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-shrink: 0;
        }
        .panel-icon-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          border: 1px solid var(--line);
          background: var(--white);
          color: var(--muted);
          border-radius: 9px;
          cursor: pointer;
          transition: border-color 0.15s ease, color 0.15s ease, background 0.15s ease;
        }
        .panel-icon-btn:hover:not(:disabled) {
          border-color: var(--rust);
          color: var(--rust);
          background: var(--paper);
        }
        .panel-icon-btn:disabled { opacity: 0.4; cursor: not-allowed; }

        .panel-log-wrap {
          position: relative;
          flex: 1;
          min-height: 0;
        }
        .panel-log-fade {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 16px;
          background: linear-gradient(180deg, #fffefb 0%, rgba(255,254,251,0) 100%);
          pointer-events: none;
          z-index: 1;
        }
        .panel-log {
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 16px 14px;
          overflow-y: auto;
        }
        .message-row {
          display: flex;
          align-items: flex-end;
          gap: 7px;
          animation: message-in 0.24s ease both;
        }
        .message-row.user { justify-content: flex-end; }
        .message-row.assistant { justify-content: flex-start; }
        @keyframes message-in {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .avatar {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          background: var(--ink);
          color: var(--paper);
        }
        .message {
          max-width: 82%;
          padding: 10px 13px;
          border-radius: 14px;
          font-size: 13.5px;
          line-height: 1.55;
        }
        .message.user {
          background: var(--ink);
          color: var(--paper);
          border-top-right-radius: 5px;
        }
        .message.assistant {
          background: var(--white);
          color: var(--ink);
          border: 1px solid var(--line);
          border-top-left-radius: 5px;
        }
        .typing-bubble { display: flex; align-items: center; padding: 12px 14px; }
        .typing-dots { display: inline-flex; gap: 4px; }
        .typing-dots span {
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--muted);
          animation: pulse 1s ease-in-out infinite;
        }
        .typing-dots span:nth-child(2) { animation-delay: 0.14s; }
        .typing-dots span:nth-child(3) { animation-delay: 0.28s; }
        @keyframes pulse {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-3px); opacity: 1; }
        }

        .panel-picks {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding: 0 14px 10px;
          flex-shrink: 0;
        }
        .panel-pick-chip {
          display: flex;
          align-items: center;
          gap: 7px;
          border: 1px solid var(--line);
          background: var(--white);
          border-radius: 999px;
          padding: 6px 10px 6px 8px;
          font-size: 11.5px;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .panel-pick-chip .pick-icon-mini {
          width: 18px; height: 18px;
          border-radius: 50%;
          background: var(--paper-dim);
          display: flex; align-items: center; justify-content: center;
          color: var(--ink);
          flex-shrink: 0;
        }
        .panel-pick-chip strong { font-weight: 600; }
        .panel-pick-chip .chip-price { color: var(--muted); font-family: "JetBrains Mono", monospace; }

        .panel-prompts {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          padding: 0 14px 12px;
          flex-shrink: 0;
        }
        .panel-prompt-chip {
          border: 1px solid var(--line);
          background: var(--white);
          color: var(--ink);
          border-radius: 999px;
          padding: 7px 11px;
          font-size: 11.5px;
          font-weight: 600;
          cursor: pointer;
          transition: border-color 0.15s ease, background 0.15s ease;
        }
        .panel-prompt-chip:hover:not(:disabled) {
          border-color: var(--rust);
          background: var(--paper);
        }
        .panel-prompt-chip:disabled { opacity: 0.5; cursor: not-allowed; }

        .panel-form {
          display: flex;
          gap: 8px;
          padding: 12px;
          border-top: 1px solid var(--line);
          background: #fcfbf7;
          flex-shrink: 0;
        }
        .panel-input {
          flex: 1;
          min-width: 0;
          border: 1px solid var(--line);
          border-radius: 11px;
          padding: 11px 12px;
          font: inherit;
          font-size: 13.5px;
          color: var(--ink);
          background: var(--white);
          outline: none;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }
        .panel-input::placeholder { color: #a39b8d; }
        .panel-input:focus {
          border-color: var(--rust);
          box-shadow: 0 0 0 3px rgba(193, 67, 42, 0.12);
        }
        .panel-send {
          border: none;
          border-radius: 11px;
          padding: 0 14px;
          min-width: 46px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: var(--ink);
          color: var(--paper);
          cursor: pointer;
          transition: background 0.15s ease, opacity 0.15s ease;
        }
        .panel-send:hover:not(:disabled) { background: var(--rust); }
        .panel-send:disabled { opacity: 0.35; cursor: not-allowed; }

        @media (max-width: 480px) {
          .assistant-widget-root { right: 14px; bottom: 14px; }
          .assistant-panel { width: calc(100vw - 28px); height: calc(100vh - 100px); border-radius: 16px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .assistant-panel, .message-row, .fab-ping::after, .assistant-fab {
            animation: none;
            transition: none;
          }
        }
      `}</style>

      <div className="assistant-widget-root">
        {isOpen && (
          <div className="assistant-panel" ref={panelRef} role="dialog" aria-label="Shop assistant chat">
            <div className="panel-top">
              <div className="panel-title">
                <span className="dot" />
                <div className="panel-title-text">
                  <strong>Shoply Assistant</strong>
                  <span>Live AI conversation</span>
                </div>
              </div>
              <div className="panel-top-actions">
                <button
                  className="panel-icon-btn"
                  type="button"
                  onClick={handleReset}
                  disabled={isTyping || messages.length < 2}
                  aria-label="Reset conversation"
                  title="Reset conversation"
                >
                  <RotateCcw size={14} strokeWidth={2.2} />
                </button>
                <button
                  className="panel-icon-btn"
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat"
                  title="Close chat"
                >
                  <X size={15} strokeWidth={2.2} />
                </button>
              </div>
            </div>

            <div className="panel-log-wrap">
              <div className="panel-log-fade" aria-hidden="true" />
              <div className="panel-log" role="log" aria-live="polite" aria-label="Conversation with the shop assistant">
                {messages.map((message, index) => (
                  <div className={`message-row ${message.role}`} key={`${message.role}-${index}`}>
                    {message.role === "assistant" && (
                      <span className="avatar" aria-hidden="true">
                        <Bot size={11} strokeWidth={2.2} />
                      </span>
                    )}
                    <div className={`message ${message.role}`}>{message.text}</div>
                  </div>
                ))}
                {isTyping && (
                  <div className="message-row assistant">
                    <span className="avatar" aria-hidden="true">
                      <Bot size={11} strokeWidth={2.2} />
                    </span>
                    <div className="message assistant typing-bubble" aria-label="Assistant is typing">
                      <span className="typing-dots" aria-hidden="true">
                        <span /><span /><span />
                      </span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {picks.length > 0 && (
              <div className="panel-picks">
                {picks.map((product) => (
                  <div className="panel-pick-chip" key={product.name}>
                    <span className="pick-icon-mini">
                      <ShoppingBag size={10} strokeWidth={2} />
                    </span>
                    <strong>{product.name}</strong>
                    <span className="chip-price">{product.price}</span>
                  </div>
                ))}
              </div>
            )}

            {showQuickPrompts && (
              <div className="panel-prompts">
                {QUICK_PROMPTS.map((prompt) => (
                  <button
                    className="panel-prompt-chip"
                    key={prompt}
                    type="button"
                    onClick={() => handleSend(prompt)}
                    disabled={isTyping}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            <form className="panel-form" onSubmit={handleSubmit}>
              <input
                ref={inputRef}
                className="panel-input"
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder='Try: "show me a tote for work"'
                aria-label="Message the shop assistant"
              />
              <button className="panel-send" type="submit" aria-label="Send message" disabled={!canSend}>
                <Send size={15} strokeWidth={2.2} />
              </button>
            </form>
          </div>
        )}

        <button
          className="assistant-fab"
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-label={isOpen ? "Close chat assistant" : "Open chat assistant"}
          aria-expanded={isOpen}
        >
          {!hasOpenedOnce && <span className="fab-ping" aria-hidden="true" />}
          <span className="fab-icon-swap" aria-hidden="true">
            <MessageCircle size={22} strokeWidth={2} className={isOpen ? "hide" : "show"} />
            <X size={22} strokeWidth={2} className={isOpen ? "show" : "hide"} />
          </span>
        </button>
      </div>
    </>
  );
}

export default AssistantChat;