import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";

const InterFonts = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Echo Chat",
  description: "Next-Gen Chat Application.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${InterFonts.variable} ${InterFonts.className} antialiased`}
      >
        <NextTopLoader color="#9810FA" />
        {children}
      </body>
    </html>
  );
}
