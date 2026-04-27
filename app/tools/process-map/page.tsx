import type { Metadata } from "next";
import { ProcessMapContent } from "./process-map-content";

export const metadata: Metadata = {
  title: "Process Map",
  description:
    "Paste Mermaid code (from Pedro V3 or any source) and render an interactive workflow diagram of your GHL automation in seconds.",
};

export default function ProcessMapPage() {
  return <ProcessMapContent />;
}
