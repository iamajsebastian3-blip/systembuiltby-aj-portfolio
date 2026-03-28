import type { Metadata } from "next";
import { ConsultContent } from "./consult-content";

export const metadata: Metadata = {
  title: "Free Consultation",
  description:
    "Book a free, no-commitment strategy call to discover where your business is leaking revenue — and how to fix it.",
};

export default function ConsultPage() {
  return <ConsultContent />;
}
