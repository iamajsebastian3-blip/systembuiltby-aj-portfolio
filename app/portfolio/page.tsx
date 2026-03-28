import type { Metadata } from "next";
import { PortfolioContent } from "./portfolio-content";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Featured funnels, websites, and automation projects — engineered for real business outcomes by AJ.",
};

export default function PortfolioPage() {
  return <PortfolioContent />;
}
