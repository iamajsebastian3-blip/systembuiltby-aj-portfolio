import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://systembuiltbyaj.com"),
  title: {
    default: "System Built by AJ — Growth Engineering",
    template: "%s | System Built by AJ",
  },
  description:
    "Funnels that convert. Automations that scale. Workflows you don't have to babysit. Growth engineering by AJ.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "System Built by AJ",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
