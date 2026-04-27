"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { PageTransition } from "@/components/motion/page-transition";

const PEDRO_URL =
  "https://chatgpt.com/g/g-69bab77f48a48191a3a24946c2907358-pedro-ai-v3-your-highlevel-automation-architect";

const SAMPLE = `graph TD
  subgraph S01["001 - New Lead Stage"]
    T1["Form Submitted"]
    T1 --> FO1{"Find Opportunity"}
    FO1 -->|Found| UO1["Update Opportunity"]
    FO1 -->|Not Found| CO1["Create Opportunity"]
    UO1 --> SMS1["Send Welcome SMS"]
    CO1 --> SMS1
    SMS1 --> EM1["Send Welcome Email"]
    EM1 --> W1["Wait: 2 days"]
    W1 --> D1{"Booked Call?"}
    D1 -->|Yes| GT1["Go To: Booked"]
    D1 -->|No| REM1["Send Reminder SMS"]
  end

  subgraph S02["002 - Call Booked Stage"]
    T2["Appointment Booked"]
    T2 --> CONF["Send Confirmation"]
    CONF --> TAG1["Add Tag: booked"]
  end`;

const MIN_ZOOM = 0.2;
const MAX_ZOOM = 4;

export function ProcessMapContent() {
  const [code, setCode] = useState(SAMPLE);
  const [renderedCode, setRenderedCode] = useState(SAMPLE);
  const [error, setError] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "copied">("idle");

  const viewportRef = useRef<HTMLDivElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(0);
  const panStateRef = useRef<{ startX: number; startY: number; offX: number; offY: number } | null>(null);

  const fitToView = useCallback(() => {
    const viewport = viewportRef.current;
    const wrapper = diagramRef.current;
    if (!viewport || !wrapper) return;
    const svg = wrapper.querySelector("svg") as SVGSVGElement | null;
    if (!svg) return;
    // Prefer the viewBox (intrinsic units) over getBoundingClientRect, which
    // varies with current CSS scale and gives unstable measurements.
    const vb = svg.viewBox?.baseVal;
    const naturalW = vb && vb.width ? vb.width : svg.getBoundingClientRect().width;
    const naturalH = vb && vb.height ? vb.height : svg.getBoundingClientRect().height;
    if (!naturalW || !naturalH) return;
    const padding = 32;
    const scale = Math.min(
      (viewport.clientWidth - padding) / naturalW,
      (viewport.clientHeight - padding) / naturalH,
      MAX_ZOOM
    );
    const next = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, scale));
    setZoom(next);
    setOffset({
      x: (viewport.clientWidth - naturalW * next) / 2,
      y: (viewport.clientHeight - naturalH * next) / 2,
    });
  }, []);

  // Render diagram on Render Diagram click
  useEffect(() => {
    let cancelled = false;
    (async () => {
      setError(null);
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: "dark",
          themeVariables: {
            primaryColor: "#27187E",
            primaryTextColor: "#ffffff",
            primaryBorderColor: "#7c3aed",
            lineColor: "#7c3aed",
            secondaryColor: "#1a0640",
            tertiaryColor: "#0a0517",
            background: "#0a0517",
            mainBkg: "#27187E",
            edgeLabelBackground: "#1a0640",
            fontFamily: "Inter, system-ui, sans-serif",
          },
          securityLevel: "strict",
          flowchart: { curve: "basis", padding: 16 },
        });
        idRef.current += 1;
        const id = `process-map-${idRef.current}`;
        const { svg } = await mermaid.render(id, renderedCode);
        if (cancelled) return;
        if (diagramRef.current) {
          diagramRef.current.innerHTML = svg;
          // Pin the SVG to its intrinsic viewBox size so CSS scale stays crisp.
          // Without this, browsers rasterize the SVG at its rendered size and the
          // upscale via transform looks blurry.
          const node = diagramRef.current.querySelector("svg");
          if (node) {
            const vb = node.viewBox && node.viewBox.baseVal;
            if (vb && vb.width && vb.height) {
              node.setAttribute("width", String(vb.width));
              node.setAttribute("height", String(vb.height));
            }
            node.removeAttribute("style");
            node.style.maxWidth = "none";
            node.style.display = "block";
          }
          // Fit on next frame so layout is settled
          requestAnimationFrame(() => fitToView());
        }
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Failed to render diagram");
        if (diagramRef.current) diagramRef.current.innerHTML = "";
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [renderedCode, fitToView]);

  // Re-fit on viewport resize / fullscreen toggle
  useEffect(() => {
    const onResize = () => fitToView();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [fitToView]);
  useEffect(() => {
    const t = setTimeout(() => fitToView(), 100);
    return () => clearTimeout(t);
  }, [fullscreen, fitToView]);

  const handleRender = () => setRenderedCode(code);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyState("copied");
      setTimeout(() => setCopyState("idle"), 1500);
    } catch {
      setCopyState("idle");
    }
  };

  const downloadBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownload = async () => {
    const svg = diagramRef.current?.querySelector("svg") as SVGSVGElement | null;
    if (!svg) return;

    const xml = new XMLSerializer().serializeToString(svg);

    // Rasterize SVG → canvas at 3x DPI for crisp PNG output
    const vb = svg.viewBox?.baseVal;
    const naturalW = vb && vb.width ? vb.width : svg.getBoundingClientRect().width;
    const naturalH = vb && vb.height ? vb.height : svg.getBoundingClientRect().height;
    if (!naturalW || !naturalH) return;

    const scale = 3;
    const canvas = document.createElement("canvas");
    canvas.width = Math.ceil(naturalW * scale);
    canvas.height = Math.ceil(naturalH * scale);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#0a0517";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const svg64 = btoa(unescape(encodeURIComponent(xml)));
    const dataUrl = `data:image/svg+xml;base64,${svg64}`;
    const img = new Image();
    img.crossOrigin = "anonymous";

    await new Promise<void>((resolve, reject) => {
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve();
      };
      img.onerror = () => reject(new Error("Failed to rasterize SVG"));
      img.src = dataUrl;
    });

    canvas.toBlob((blob) => {
      if (!blob) return;
      downloadBlob(blob, "process-map.png");
    }, "image/png");
  };

  // Zoom around cursor (or center if no cursor point)
  const zoomAt = (factor: number, cx?: number, cy?: number) => {
    const viewport = viewportRef.current;
    if (!viewport) {
      setZoom((z) => Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, z * factor)));
      return;
    }
    const rect = viewport.getBoundingClientRect();
    const px = cx ?? rect.width / 2;
    const py = cy ?? rect.height / 2;
    setZoom((prevZoom) => {
      const newZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, prevZoom * factor));
      const ratio = newZoom / prevZoom;
      setOffset((prev) => ({
        x: px - (px - prev.x) * ratio,
        y: py - (py - prev.y) * ratio,
      }));
      return newZoom;
    });
  };

  const onWheel = (e: React.WheelEvent) => {
    if (!e.ctrlKey && !e.metaKey && Math.abs(e.deltaY) < 20) {
      // Allow normal scroll if user isn't actively zooming
      return;
    }
    e.preventDefault();
    const rect = viewportRef.current?.getBoundingClientRect();
    if (!rect) return;
    const factor = e.deltaY < 0 ? 1.12 : 1 / 1.12;
    zoomAt(factor, e.clientX - rect.left, e.clientY - rect.top);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    setIsPanning(true);
    panStateRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      offX: offset.x,
      offY: offset.y,
    };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isPanning || !panStateRef.current) return;
    const { startX, startY, offX, offY } = panStateRef.current;
    setOffset({ x: offX + (e.clientX - startX), y: offY + (e.clientY - startY) });
  };

  const onPointerUp = (e: React.PointerEvent) => {
    setIsPanning(false);
    panStateRef.current = null;
    try { (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId); } catch {}
  };

  return (
    <PageTransition>
      <div className={`mx-auto ${fullscreen ? "max-w-none px-0 py-0" : "max-w-[1280px] px-4 sm:px-8 py-12"}`}>
        {!fullscreen && (
          <>
            <Link
              href="/tools"
              className="inline-flex items-center gap-1 text-sm text-white/40 hover:text-white/70 transition-colors mb-8"
            >
              &larr; Back to Tools
            </Link>

            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-yellow">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="14" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                    <line x1="10" y1="6.5" x2="14" y2="6.5" />
                    <line x1="17.5" y1="10" x2="17.5" y2="14" />
                    <line x1="6.5" y1="10" x2="6.5" y2="14" />
                    <line x1="10" y1="17.5" x2="14" y2="17.5" />
                  </svg>
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-white">Process Map</h1>
              </div>
              <p className="text-sm sm:text-base text-white/60 max-w-2xl">
                Paste Mermaid code and render an interactive diagram of your GHL automation. Use Pedro V3 to convert your workflow description into Mermaid first, then paste below. Drag to pan, scroll to zoom.
              </p>
            </div>
          </>
        )}

        <div className={`grid gap-4 ${fullscreen ? "grid-cols-1 h-screen" : "grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]"}`}>
          {/* Editor */}
          {!fullscreen && (
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-md overflow-hidden flex flex-col">
              <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-white/[0.06] bg-gradient-to-r from-persian/15 to-transparent">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="shrink-0 flex items-center justify-center w-9 h-9 rounded-lg bg-yellow/20 border border-yellow/40 text-yellow">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="13 2 13 9 20 9" />
                      <path d="M20 13v7a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2h7" />
                    </svg>
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-white truncate">Mermaid Editor</p>
                    <p className="text-[0.65rem] text-white/40 truncate">Paste code from Pedro V3 or any source</p>
                  </div>
                </div>
                <a
                  href={PEDRO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center gap-1.5 rounded-lg bg-persian px-3 py-2 text-xs font-bold text-white border border-persian/60 hover:bg-persian-dark transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  Open Pedro V3
                </a>
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck={false}
                className="flex-1 min-h-[420px] w-full resize-none bg-transparent text-white/85 px-4 py-4 text-[13px] font-mono leading-relaxed focus:outline-none placeholder:text-white/30"
                placeholder="graph TD&#10;  A[Start] --> B[End]"
              />
              <div className="flex items-center gap-2 px-3 py-3 border-t border-white/[0.06] bg-white/[0.02]">
                <button
                  onClick={handleRender}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-persian px-4 py-2.5 text-sm font-bold text-white shadow-[0_8px_24px_rgba(94,23,235,0.35)] hover:bg-persian-dark transition-all"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  Render Diagram
                </button>
                <button
                  onClick={handleCopy}
                  aria-label="Copy code"
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-white/[0.06] border border-white/[0.1] px-3 py-2.5 text-xs font-bold text-white/80 hover:bg-white/[0.1] transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" />
                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                  </svg>
                  {copyState === "copied" ? "Copied" : "Copy"}
                </button>
              </div>
            </div>
          )}

          {/* Preview */}
          <div className={`rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-md overflow-hidden flex flex-col ${fullscreen ? "rounded-none border-0 h-screen" : ""}`}>
            <div className="flex items-center justify-between gap-2 px-3 py-2.5 border-b border-white/[0.06] bg-gradient-to-r from-persian/15 to-transparent">
              <div className="flex items-center gap-2 min-w-0">
                <span className="shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-md bg-persian/20 border border-persian/40 text-persian-light">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 11V6a2 2 0 00-2-2v0a2 2 0 00-2 2v0M14 10V4a2 2 0 00-2-2v0a2 2 0 00-2 2v2" />
                    <path d="M10 10.5V6a2 2 0 00-2-2v0a2 2 0 00-2 2v8" />
                    <path d="M18 8a2 2 0 114 0v6a8 8 0 01-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 012.83-2.82L7 15" />
                  </svg>
                </span>
                <p className="text-sm font-bold text-white truncate">Diagram Preview</p>
                <span className="hidden sm:inline text-[0.6rem] text-white/35 ml-1">Drag to pan · Scroll/Ctrl+scroll to zoom</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => zoomAt(1 / 1.2)}
                  aria-label="Zoom out"
                  className="w-8 h-8 rounded-md bg-white text-black flex items-center justify-center hover:bg-white/85 transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>
                <span className="text-[0.65rem] text-white/60 w-12 text-center font-bold">{Math.round(zoom * 100)}%</span>
                <button
                  onClick={() => zoomAt(1.2)}
                  aria-label="Zoom in"
                  className="w-8 h-8 rounded-md bg-white text-black flex items-center justify-center hover:bg-white/85 transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <line x1="12" y1="5" x2="12" y2="19" />
                  </svg>
                </button>
                <button
                  onClick={() => fitToView()}
                  aria-label="Fit to view"
                  className="inline-flex items-center gap-1 rounded-md bg-white text-black px-2.5 h-8 text-[0.65rem] font-bold hover:bg-white/85 transition-colors"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9V5a2 2 0 012-2h4M21 9V5a2 2 0 00-2-2h-4M3 15v4a2 2 0 002 2h4M21 15v4a2 2 0 01-2 2h-4" />
                  </svg>
                  Fit
                </button>
                <div className="w-px h-5 bg-white/10 mx-1" />
                <button
                  onClick={handleDownload}
                  aria-label="Download PNG"
                  className="inline-flex items-center gap-1 rounded-md bg-white text-black px-2.5 h-8 text-[0.65rem] font-bold hover:bg-white/85 transition-colors"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  PNG
                </button>
                <button
                  onClick={() => setFullscreen((f) => !f)}
                  aria-label="Toggle fullscreen"
                  className="w-8 h-8 rounded-md bg-white text-black flex items-center justify-center hover:bg-white/85 transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    {fullscreen ? (
                      <path d="M8 3v3a2 2 0 01-2 2H3M21 8h-3a2 2 0 01-2-2V3M3 16h3a2 2 0 012 2v3M16 21v-3a2 2 0 012-2h3" />
                    ) : (
                      <path d="M3 8V5a2 2 0 012-2h3M21 8V5a2 2 0 00-2-2h-3M3 16v3a2 2 0 002 2h3M21 16v3a2 2 0 01-2 2h-3" />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            <div
              ref={viewportRef}
              onWheel={onWheel}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              className={`relative flex-1 overflow-hidden bg-[#0a0517] ${
                isPanning ? "cursor-grabbing" : "cursor-grab"
              }`}
              style={{
                minHeight: fullscreen ? "auto" : "640px",
                touchAction: "none",
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgba(124,58,237,0.18) 1px, transparent 0)",
                backgroundSize: "24px 24px",
              }}
            >
              {error ? (
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <div className="max-w-md text-center">
                    <p className="text-rose-300 text-sm font-bold mb-2">Couldn't render</p>
                    <p className="text-xs text-white/45 leading-relaxed font-mono whitespace-pre-wrap break-words">{error}</p>
                  </div>
                </div>
              ) : (
                <div
                  ref={diagramRef}
                  className="absolute top-0 left-0 origin-top-left"
                  style={{
                    transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
                  }}
                />
              )}
            </div>

            {!fullscreen && (
              <p className="px-4 py-2 text-[0.6rem] text-white/30 uppercase tracking-widest border-t border-white/[0.06] text-center">
                Powered by Mermaid · Diagrams generated with Pedro V3 by Cece Tan
              </p>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
