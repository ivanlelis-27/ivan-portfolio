import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Background from "@/components/Background";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Ezekiel Ivan T. Lelis | UI/UX Portfolio",
  description: "UI/UX Designer & Front-End Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={cn(
          inter.variable,
          playfair.variable,
          "antialiased bg-black text-white min-h-screen flex flex-col"
        )}
      >
        <Background />
        <CustomCursor />
        <Navbar />
        <main className="flex-grow relative z-10">{children}</main>
      </body>
    </html>
  );
}
