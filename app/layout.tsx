import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Debate Me — Argue with AI",
  description: "Argue with AI. Let the internet decide who won.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
