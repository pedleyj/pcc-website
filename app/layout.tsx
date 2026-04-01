import type { Metadata } from "next";
import { headers } from "next/headers";
import { Inter } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Peninsula Covenant Church | Redwood City, CA",
  description:
    "Know Jesus deeply. Follow Him faithfully. Guide the next generation to do the same.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Reading x-nonce forces this layout to be dynamic (one nonce per request).
  // Next.js reads the nonce from the CSP response header automatically.
  const _nonce = (await headers()).get('x-nonce')

  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <ScrollToTop />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
