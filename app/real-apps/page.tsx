import type { Metadata } from "next";
import { RealAppsContent } from "./real-apps-content";

export const metadata: Metadata = {
  title: "Real Apps",
  description:
    "Full-stack apps I built, shipped, and run, not automations or templates. Sign up and try them.",
};

export default function RealAppsPage() {
  return <RealAppsContent />;
}
