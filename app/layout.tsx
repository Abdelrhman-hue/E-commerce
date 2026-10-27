import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "./nav";
import Footer from "./footer";
import { Toaster } from "sonner";
import AIAssistantModal from "@/Components/AIAssistantModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shop Bog - Modern Full-Stack E-Commerce",
  description: "The best place to explore and purchase your favorite products with AI shopping assistant.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#111111] text-white">
        <Nav />
        {children}
        <Toaster richColors position="bottom-center" />
        <AIAssistantModal />
        <Footer />
      </body>
    </html>
  );
}
