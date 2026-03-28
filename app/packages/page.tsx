import type { Metadata } from "next";
import { PackagesContent } from "./packages-content";

export const metadata: Metadata = {
  title: "Packages",
  description:
    "Three growth phases designed to take your business from zero systems to fully automated revenue engine.",
};

export default function PackagesPage() {
  return <PackagesContent />;
}
