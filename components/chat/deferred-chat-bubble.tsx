"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ChatBubble = dynamic(
  () => import("./chat-bubble").then((m) => m.ChatBubble),
  { ssr: false }
);

// Defers mounting the chat bubble until the browser is idle (or 2s, whichever comes first).
// Keeps the chat code out of the critical-path bundle and avoids running its effects on first paint.
export function DeferredChatBubble() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    type IdleCallback = (cb: () => void, opts?: { timeout: number }) => number;
    const ric = (window as unknown as { requestIdleCallback?: IdleCallback }).requestIdleCallback;
    if (typeof ric === "function") {
      const id = ric(() => setReady(true), { timeout: 2000 });
      return () => {
        const cancel = (window as unknown as { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback;
        if (typeof cancel === "function") cancel(id);
      };
    }
    const t = setTimeout(() => setReady(true), 1500);
    return () => clearTimeout(t);
  }, []);

  if (!ready) return null;
  return <ChatBubble />;
}
