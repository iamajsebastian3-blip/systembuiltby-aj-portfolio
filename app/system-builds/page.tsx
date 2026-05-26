import type { Metadata } from "next";
import { SystemBuildsContent } from "./system-builds-content";

export const metadata: Metadata = {
  title: "System Builds",
  description:
    "Step-by-step walkthroughs of every system I build — workflows, pipelines, funnels, and automations. Recorded raw, no fluff.",
};

export default function SystemBuildsPage() {
  return <SystemBuildsContent />;
}
