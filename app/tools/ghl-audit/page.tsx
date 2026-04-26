import type { Metadata } from "next";
import { GhlAuditContent } from "./audit-content";

export const metadata: Metadata = {
  title: "GHL Sub-Account Audit",
  description:
    "Free health scan for any GoHighLevel sub-account. Detect misconfigurations, missing automations, and optimization opportunities in seconds.",
};

export default function GhlAuditPage() {
  return <GhlAuditContent />;
}
