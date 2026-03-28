import type { Metadata } from "next";
import { ProjectsContent } from "./projects-content";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Automations, funnels, websites, and apps — all engineered for real business outcomes by AJ.",
};

export default function ProjectsPage() {
  return <ProjectsContent />;
}
