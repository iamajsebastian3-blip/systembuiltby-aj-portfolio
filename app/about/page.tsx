import type { Metadata } from "next";
import { AboutContent } from "./about-content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about AJ — growth engineer specializing in GoHighLevel automation systems, funnels, and CRM infrastructure.",
};

export default function AboutPage() {
  return <AboutContent />;
}
