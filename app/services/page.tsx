import type { Metadata } from "next";
import { ServicesContent } from "./services-content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "8 core service areas — funnels, CRM, automation, booking, AI chatbots, custom frontend, and integrations. HighLevel setup & optimization by AJ.",
};

export default function ServicesPage() {
  return <ServicesContent />;
}
