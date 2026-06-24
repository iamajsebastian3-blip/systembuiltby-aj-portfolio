import type { Metadata } from "next";
import { MentorsContent } from "./mentors-content";

export const metadata: Metadata = {
  title: "Mentors",
  description:
    "The mentors and educators who shaped how I build — GoHighLevel, automation, and AI experts I learned from directly.",
};

export default function MentorsPage() {
  return <MentorsContent />;
}
