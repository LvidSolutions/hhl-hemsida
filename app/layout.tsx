import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://hhl-website.vercel.app"),
  title: {
    default: "Hermansson Hiller Lundberg Arkitekter",
    template: "%s — HHL Arkitekter",
  },
  description:
    "Hermansson Hiller Lundberg is an architecture practice in Stockholm working toward an architecture of presence, character and complexity.",
  openGraph: {
    type: "website",
    siteName: "Hermansson Hiller Lundberg Arkitekter",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" id="top">
      <body>
        <Header />
        <main id="content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
