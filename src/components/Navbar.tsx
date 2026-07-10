"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

// Fix for import from next/link
import NextLink from "next/link";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Work", href: "#work" },
  { name: "About", href: "#about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname === "/") {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 py-6",
        scrolled ? "bg-[#0a0a0a]/80 backdrop-blur-md py-4 border-b border-[#f4f4f0]/10" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <NextLink href="/" className="text-xl font-heading font-medium tracking-wide interactive flex items-center gap-2">
          <span className="opacity-50">|</span> IVAN
        </NextLink>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NextLink
              key={link.name}
              href={pathname === "/" ? link.href : `/${link.href}`}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="text-xs uppercase tracking-[0.2em] text-[#f4f4f0]/70 hover:text-[#f4f4f0] transition-colors interactive"
            >
              {link.name}
            </NextLink>
          ))}
          <a href="mailto:ivanlelis.dev@gmail.com" className="interactive bg-[#f4f4f0] text-[#0a0a0a] px-6 py-2 rounded-full text-sm font-medium hover:bg-transparent hover:text-[#f4f4f0] border border-[#f4f4f0] transition-all">
            Let's Talk
          </a>
        </nav>
      </div>
    </header>
  );
}
