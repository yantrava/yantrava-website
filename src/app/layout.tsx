import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/smooth-scroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true, // backs the LCP headline
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false, // only small eyebrows/labels — not critical-path
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  preload: true, // the italic display face appears in the LCP headline
});

const SITE_URL = "https://yantrava.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Yantrava Labs: A permanent builder of software brands",
    template: "%s · Yantrava Labs",
  },
  description:
    "Yantrava Labs is a holding company building independent software product brands that earn long-term user trust, one product at a time.",
  alternates: { canonical: "/" },
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
    locale: "en_US",
    title: "Yantrava Labs: A permanent builder of software brands",
    description:
      "A holding company building independent software product brands that earn long-term user trust, one product at a time.",
    siteName: "Yantrava Labs",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yantrava Labs",
    description:
      "A permanent builder of software brands that earn long-term user trust.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
  viewportFit: "cover", // respect notch / safe-area insets in landscape
};

// Organization structured data — helps investor/press/search surfaces resolve
// the entity (logo/image points at the auto-generated OG card).
const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Yantrava Labs",
  legalName: "Yantrava Labs Private Limited",
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image`,
  description:
    "A holding company building independent software product brands that earn long-term user trust, one product at a time.",
  foundingLocation: { "@type": "Country", name: "India" },
  email: "support@yantrava.com",
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
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SmoothScroll>{children}</SmoothScroll>
        <div className="grain" aria-hidden="true" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </body>
    </html>
  );
}
