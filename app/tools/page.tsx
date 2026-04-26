import type { Metadata } from "next";
import { ToolsContent } from "./tools-content";

export const metadata: Metadata = {
  title: "Tools",
  description:
    "Free interactive tools for diagnosing revenue leaks, scoring your ROI, tracking automation audits, and auditing your GoHighLevel sub-accounts.",
};

export default function ToolsPage() {
  return <ToolsContent />;
}
