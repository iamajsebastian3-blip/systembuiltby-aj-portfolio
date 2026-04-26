"use client";

import { useEffect, useRef, useState } from "react";

interface CheckSummary {
  key: string;
  title: string;
  count?: number | string;
  status: string;
  detail?: string;
  items?: Array<{ id?: string; name: string; meta?: Record<string, unknown> }>;
}

export interface AuditSummary {
  score: number;
  grade: string;
  status: string;
  scannedAt: string;
  checks: CheckSummary[];
}

interface CsvAttachment {
  type: "csv";
  filename: string;
  content: string;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  attachments?: CsvAttachment[];
}

interface AuditChatProps {
  audit: AuditSummary;
  locationId: string;
  pit: string;
}

const SUGGESTIONS = [
  "Give me a CSV of all my contacts",
  "Which workflows are draft?",
  "Show me the list of calendars",
  "Export my workflows as a CSV",
];

export function AuditChat({ audit, locationId, pit }: AuditChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hi 👋 I just scanned your sub-account. Ask me anything about the results — list workflows, look up calendars, or export contacts to CSV.",
    },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, sending]);

  const send = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || sending) return;

    const next: ChatMessage[] = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setSending(true);

    try {
      const payload = {
        messages: next.map(({ role, content }) => ({ role, content })),
        audit,
        locationId,
        pit,
      };
      const res = await fetch("/api/ghl-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? `HTTP ${res.status}`);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: json.content ?? "",
          attachments: Array.isArray(json.attachments) ? json.attachments : undefined,
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Hit an error: ${err instanceof Error ? err.message : "unknown"}`,
        },
      ]);
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

  const showSuggestions = messages.length === 1 && !sending;

  return (
    <div className="rounded-2xl border border-persian/30 bg-gradient-to-br from-persian/10 via-persian/[0.04] to-transparent overflow-hidden">
      <div className="flex items-center gap-3 px-5 py-3 border-b border-white/[0.06] bg-persian/[0.07]">
        <div className="relative">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow/20 border border-yellow/40 text-yellow">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
          </div>
          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-400 border-2 border-[#08060e]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-white">Ask About This Audit</p>
          <p className="text-[0.65rem] text-white/45">Powered by AI · CSV exports & live data lookups</p>
        </div>
      </div>

      <div ref={scrollRef} className="px-4 py-4 space-y-3 max-h-[420px] overflow-y-auto">
        {messages.map((m, i) => (
          <Bubble key={i} message={m} />
        ))}
        {sending && <Typing />}

        {showSuggestions && (
          <div className="flex flex-wrap gap-2 pt-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="rounded-full border border-white/[0.1] bg-white/[0.04] px-3 py-1.5 text-[0.7rem] text-white/65 hover:border-persian/40 hover:bg-persian/15 hover:text-white transition-all"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      <div
        className="border-t border-white/[0.06] px-3 pt-3 bg-white/[0.02]"
        style={{ paddingBottom: "max(0.75rem, calc(env(safe-area-inset-bottom) + 0.5rem))" }}
      >
        <div className="flex items-end gap-2 rounded-xl border border-white/[0.1] bg-white/[0.04] px-3 py-2 focus-within:border-persian/50 transition-colors">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            placeholder="Ask about the audit…"
            rows={1}
            disabled={sending}
            className="flex-1 resize-none bg-transparent text-white placeholder:text-white/30 focus:outline-none disabled:opacity-50 max-h-32 text-base sm:text-sm"
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
      </div>
    </div>
  );
}

function Bubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed break-words ${
          isUser
            ? "bg-persian text-white rounded-br-sm"
            : "bg-white/[0.06] text-white/85 border border-white/[0.08] rounded-bl-sm"
        }`}
      >
        <RenderMarkdown text={message.content} />
        {message.attachments && message.attachments.length > 0 && (
          <div className="mt-3 space-y-2">
            {message.attachments.map((att, i) => (
              <CsvDownload key={i} attachment={att} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function CsvDownload({ attachment }: { attachment: CsvAttachment }) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    const blob = new Blob([attachment.content], { type: "text/csv;charset=utf-8;" });
    const objectUrl = URL.createObjectURL(blob);
    setUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [attachment.content]);

  if (!url) return null;
  return (
    <a
      href={url}
      download={attachment.filename}
      className="inline-flex items-center gap-2 rounded-lg bg-yellow/15 border border-yellow/40 text-yellow px-3 py-2 text-xs font-bold hover:bg-yellow/25 transition-colors"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      Download {attachment.filename}
    </a>
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
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    if (match[1] && match[2]) {
      parts.push(
        <a key={`${baseKey}-${key++}`} href={match[2]} target="_blank" rel="noopener noreferrer" className="text-yellow underline-offset-2 underline hover:text-yellow-dark font-bold">
          {match[1]}
        </a>
      );
    } else if (match[3]) {
      parts.push(<strong key={`${baseKey}-${key++}`} className="font-bold text-white">{match[3]}</strong>);
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
        blocks.push(<p key={`p-${key++}`} className="my-0.5">{renderInline(line, `p-${key}`)}</p>);
      }
    }
  }
  flushList();

  return <>{blocks}</>;
}
