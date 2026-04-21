"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const GREETING: Message = {
  role: "assistant",
  content:
    "Hey 👋 I'm AJ (Certified Admin) — \"Your Automation Guy\"\n\nWhat's up? What are you trying to build or fix?\n\nI can clean up your workflows and systems… But in Relationship, good luck 😄 Just kidding!",
};

export function ChatBubble() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [streaming, setStreaming] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll on new content
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, streaming]);

  // Focus input when opened
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 250);
  }, [open]);

  // Lock body scroll when open on mobile
  useEffect(() => {
    if (open && window.innerWidth < 640) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const send = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || sending) return;

    const next: Message[] = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setSending(true);
    setStreaming("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.filter((m) => m !== GREETING) }),
      });

      if (!res.ok || !res.body) {
        throw new Error(`Server error: ${res.status}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setStreaming(acc);
      }

      setMessages((prev) => [...prev, { role: "assistant", content: acc }]);
      setStreaming("");
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Hmm, the assistant ran into a hiccup. Try again in a sec, or [book a quick call](/consult/booking) and we can chat directly.",
        },
      ]);
      setStreaming("");
    } finally {
      setSending(false);
    }
  };

  const onKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      {/* Floating launcher */}
      <AnimatePresence>
        {!open && (
          <motion.button
            key="launcher"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={() => setOpen(true)}
            aria-label="Chat with AJ"
            className="fixed bottom-5 right-5 z-[60] h-14 w-14 rounded-full overflow-hidden ring-2 ring-persian/60 shadow-[0_8px_28px_rgba(94,23,235,0.5)] transition-all hover:ring-persian hover:scale-105"
          >
            <span className="absolute inset-0 inline-flex animate-ping rounded-full bg-persian/30" />
            <Image
              src="/aj-profile.png"
              alt="Chat with AJ"
              fill
              className="object-cover relative z-10"
              sizes="56px"
              priority
            />
            <span className="absolute bottom-0.5 right-0.5 z-20 h-3 w-3 rounded-full bg-green-400 border-2 border-[#0a0517]" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.2, 0, 0.2, 1] }}
            className="fixed inset-0 z-[60] sm:inset-auto sm:bottom-5 sm:right-5 sm:h-[640px] sm:max-h-[calc(100vh-2.5rem)] sm:w-[400px] flex flex-col rounded-none sm:rounded-2xl border border-white/[0.1] bg-[#0a0517] shadow-[0_24px_64px_rgba(0,0,0,0.6)] overflow-hidden"
          >
            {/* Header */}
            <header className="flex items-center justify-between px-4 py-3 border-b border-white/[0.08] bg-gradient-to-r from-persian/30 via-persian/15 to-transparent backdrop-blur-md shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative shrink-0">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden border border-persian/40 bg-persian/20">
                    <Image
                      src="/aj-profile.png"
                      alt="AJ"
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-400 border-2 border-[#0a0517]" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-white truncate">AJ</p>
                  <p className="text-[0.65rem] text-green-400 truncate flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Online
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="shrink-0 flex items-center justify-center w-8 h-8 rounded-lg text-white/60 hover:text-white hover:bg-white/[0.08] transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </header>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((m, i) => (
                <Bubble key={i} message={m} />
              ))}
              {streaming && <Bubble message={{ role: "assistant", content: streaming }} streaming />}
              {sending && !streaming && <Typing />}
            </div>

            {/* Input */}
            <div className="border-t border-white/[0.08] p-3 bg-white/[0.02] shrink-0">
              <div className="flex items-end gap-2 rounded-2xl border border-white/[0.1] bg-white/[0.04] px-3 py-2 focus-within:border-persian/50 transition-colors">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKey}
                  placeholder="Ask me anything…"
                  rows={1}
                  disabled={sending}
                  className="flex-1 resize-none bg-transparent text-sm text-white placeholder:text-white/30 focus:outline-none disabled:opacity-50 max-h-32"
                  style={{ minHeight: "20px" }}
                />
                <button
                  onClick={() => send()}
                  disabled={sending || !input.trim()}
                  aria-label="Send"
                  className="shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-persian text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-persian-dark transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </div>
              <p className="mt-2 text-center text-[0.6rem] text-white/25 uppercase tracking-widest">
                AI-powered · Built with Next.js + Groq
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Bubble({ message, streaming }: { message: Message; streaming?: boolean }) {
  const isUser = message.role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed break-words ${
          isUser
            ? "bg-persian text-white rounded-br-sm"
            : "bg-white/[0.06] text-white/85 border border-white/[0.08] rounded-bl-sm"
        }`}
      >
        <RenderMarkdown text={message.content} />
        {streaming && <span className="inline-block w-1 h-3.5 bg-persian-light ml-0.5 align-middle animate-pulse" />}
      </div>
    </div>
  );
}

function Typing() {
  return (
    <div className="flex justify-start">
      <div className="bg-white/[0.06] border border-white/[0.08] rounded-2xl rounded-bl-sm px-3.5 py-3">
        <div className="flex gap-1">
          {[0, 0.15, 0.3].map((d) => (
            <span
              key={d}
              className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce"
              style={{ animationDelay: `${d}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Tiny markdown renderer for **bold**, [text](url), and bullet lists.
function renderInline(text: string, baseKey: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    if (match[1] && match[2]) {
      parts.push(
        <a
          key={`${baseKey}-${key++}`}
          href={match[2]}
          className="text-yellow underline-offset-2 underline hover:text-yellow-dark font-bold"
        >
          {match[1]}
        </a>
      );
    } else if (match[3]) {
      parts.push(
        <strong key={`${baseKey}-${key++}`} className="font-bold text-white">
          {match[3]}
        </strong>
      );
    }
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}

function RenderMarkdown({ text }: { text: string }) {
  const lines = text.split("\n");
  const blocks: React.ReactNode[] = [];
  let listBuffer: string[] = [];
  let key = 0;

  const flushList = () => {
    if (listBuffer.length === 0) return;
    blocks.push(
      <ul key={`ul-${key++}`} className="list-disc pl-5 my-1.5 space-y-1">
        {listBuffer.map((item, i) => (
          <li key={i}>{renderInline(item, `li-${i}`)}</li>
        ))}
      </ul>
    );
    listBuffer = [];
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    const bullet = line.match(/^\s*[*\-•]\s+(.*)$/);
    if (bullet) {
      listBuffer.push(bullet[1]);
    } else {
      flushList();
      if (line.trim() === "") {
        blocks.push(<div key={`br-${key++}`} className="h-2" />);
      } else {
        blocks.push(
          <p key={`p-${key++}`} className="my-0.5">
            {renderInline(line, `p-${key}`)}
          </p>
        );
      }
    }
  }
  flushList();

  return <>{blocks}</>;
}
