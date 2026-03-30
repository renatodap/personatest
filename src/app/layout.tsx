import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PersonaTest — Discover Your Personality",
  description: "Take our quick personality assessment and discover what drives you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased dark`}>
      <body className="min-h-full flex flex-col bg-[#0a0a0a] text-[#ededed] font-[family-name:var(--font-inter)]">
        {children}
      </body>
    </html>
  );
}
