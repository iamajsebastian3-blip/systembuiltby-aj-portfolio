import type { Metadata } from "next";
import { BookingContent } from "./booking-content";

export const metadata: Metadata = {
  title: "Book a Call",
  description:
    "Pick a time for your free strategy call. See your automated system in action.",
};

export default function BookingPage() {
  return <BookingContent />;
}
