import type { Metadata } from "next";
import { PortfolioContent } from "./portfolio-content";

export const metadata: Metadata = {
  title: "Funnels & Websites",
  description:
    "Featured funnels and websites — engineered for real business outcomes by AJ.",
};

export default function PortfolioPage() {
  return <PortfolioContent />;
}
