import type { Metadata } from "next";
import { RevenueContent } from "./revenue-content";

export const metadata: Metadata = {
  title: "Revenue Tools",
  description:
    "Interactive revenue calculator, ROI scorecard, and audit tracker — see how much money your business is leaving on the table.",
};

export default function RevenuePage() {
  return <RevenueContent />;
}
