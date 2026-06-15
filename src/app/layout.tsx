import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { Cursor } from "@/components/ui/cursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://yantrava.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Yantrava Labs — A permanent builder of software brands",
    template: "%s · Yantrava Labs",
  },
  description:
    "Yantrava Labs is a holding company building independent software product brands that earn long-term user trust — one product at a time. Built in India.",
  keywords: [
    "Yantrava Labs",
    "holding company",
    "venture studio",
    "AI software",
    "Rooted",
    "CardioGuard",
    "India",
  ],
  authors: [{ name: "Yantrava Labs Private Limited" }],
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Yantrava Labs — A permanent builder of software brands",
    description:
      "A holding company building independent software product brands that earn long-term user trust — one product at a time. Built in India.",
    siteName: "Yantrava Labs",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yantrava Labs",
    description:
      "A permanent builder of software brands that earn long-term user trust. Built in India.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}
    >
      <body>
        <Cursor />
        <SmoothScroll>{children}</SmoothScroll>
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
