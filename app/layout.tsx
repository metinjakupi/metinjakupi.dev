import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { GoogleTagManager } from '@next/third-parties/google'


const fontHeading = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const fontBody = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Metin Jakupi | Senior Frontend Engineer",
  description:
    "Portfolio and professional profile of Metin Jakupi, a senior frontend software engineer specializing in modern web technologies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="GTM-PZ9RQ34" />
      <body
        className={cn("antialiased", fontHeading.variable, fontBody.variable)}
      >
        {children}

      </body>
    </html>
  );
}
