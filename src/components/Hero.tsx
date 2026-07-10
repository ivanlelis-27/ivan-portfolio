"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const MARQUEE_TEXT = "DESIGN · DEVELOP · CREATE · INNOVATE · ";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const orbitalRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Staggered character reveal for first name
    if (line1Ref.current) {
      const chars1 = line1Ref.current.querySelectorAll(".char");
      tl.fromTo(
        chars1,
        { y: 120, opacity: 0, rotateX: -90 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.04 }
      );
    }

    // Second name line — slides in from right with italic flair
    if (line2Ref.current) {
      const chars2 = line2Ref.current.querySelectorAll(".char");
      tl.fromTo(
        chars2,
        { y: 100, opacity: 0, rotateX: -90 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.04 },
        "-=0.9"
      );
    }

    // Divider line width animation
    tl.fromTo(
      dividerRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.8, ease: "power2.inOut" },
      "-=0.6"
    );

    // Subtitle fade up
    tl.fromTo(
      subtitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      "-=0.4"
    );

    // Metadata row
    if (metaRef.current) {
      tl.fromTo(
        metaRef.current.children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
        "-=0.4"
      );
    }

    // Orbital rings scale in with rotation
    if (orbitalRef.current) {
      const rings = orbitalRef.current.querySelectorAll(".orbit-ring");
      const dots = orbitalRef.current.querySelectorAll(".orbit-dot");
      const crosshair = orbitalRef.current.querySelector(".crosshair");

      tl.fromTo(
        rings,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, stagger: 0.15, ease: "elastic.out(1, 0.8)" },
        "-=0.8"
      );

      tl.fromTo(
        dots,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, stagger: 0.08 },
        "-=0.6"
      );

      if (crosshair) {
        tl.fromTo(
          crosshair,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 0.5, duration: 0.5 },
          "-=0.4"
        );
      }
    }

    // Marquee fade in
    tl.fromTo(
      marqueeRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1 },
      "-=0.5"
    );

    // Scroll indicator
    tl.fromTo(
      scrollIndicatorRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6 },
      "-=0.3"
    );

    return () => {
      tl.kill();
    };
  }, []);

  // Mouse parallax for orbital group
  useEffect(() => {
    const container = containerRef.current;
    const orbital = orbitalRef.current;
    if (!container || !orbital) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(orbital, {
        x: x * 30,
        y: y * 30,
        duration: 1,
        ease: "power2.out",
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const splitChars = (text: string) =>
    text.split("").map((char, i) => (
      <span
        key={i}
        className="char inline-block"
        style={{ perspective: "600px" }}
      >
        {char}
      </span>
    ));

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-transparent"
    >
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(255,255,255,0.04) 0%, transparent 60%)",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-0 py-20">
        {/* LEFT — Typography Block */}
        <div className="flex-1 max-w-3xl">
          {/* First Name */}
          <div
            ref={line1Ref}
            className="overflow-hidden"
          >
            <h1 className="text-[15vw] lg:text-[10vw] xl:text-[9vw] font-heading font-black tracking-tight leading-[0.85] text-[#f4f4f0] uppercase select-none">
              {splitChars("EZEKIEL")}
            </h1>
          </div>

          {/* Last Name */}
          <div
            ref={line2Ref}
            className="overflow-hidden"
          >
            <h1 className="text-[15vw] lg:text-[10vw] xl:text-[9vw] font-heading font-light italic tracking-tight leading-[0.85] text-[#f4f4f0]/70 uppercase select-none">
              {splitChars("IVAN.")}
            </h1>
          </div>

          {/* Divider Line */}
          <div
            ref={dividerRef}
            className="w-full max-w-xs h-[1px] bg-gradient-to-r from-[#f4f4f0]/50 to-transparent mt-8 mb-6 origin-left"
          />

          {/* Subtitle */}
          <div ref={subtitleRef}>
            <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-[#f4f4f0]/50 font-sans">
              UI/UX Designer & Front-End Developer
            </p>
          </div>

          {/* Metadata Row */}
          <div ref={metaRef} className="flex items-center gap-6 mt-8 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#f4f4f0]/60" />
              <span className="text-xs uppercase tracking-[0.2em] text-[#f4f4f0]/40 font-sans">
                2026
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#f4f4f0]/60" />
              <span className="text-xs uppercase tracking-[0.2em] text-[#f4f4f0]/40 font-sans">
                Cavite, PH
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400/80" />
              <span className="text-xs uppercase tracking-[0.2em] text-[#f4f4f0]/40 font-sans">
                Open to Work
              </span>
            </div>
            <a
              href="/resume.pdf"
              download="Ivan_Lelis_Resume.pdf"
              className="flex items-center gap-2 px-4 py-2 ml-2 border border-[#f4f4f0]/20 rounded-full hover:bg-[#f4f4f0]/10 transition-colors interactive group"
            >
              <svg className="w-3.5 h-3.5 text-[#f4f4f0]/60 group-hover:text-[#f4f4f0] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#f4f4f0]/60 group-hover:text-[#f4f4f0] transition-colors font-sans mt-[1px]">
                Resume
              </span>
            </a>
          </div>
        </div>

        {/* RIGHT — Orbital Animation */}
        <div className="flex-shrink-0 relative w-[280px] h-[280px] md:w-[360px] md:h-[360px] lg:w-[420px] lg:h-[420px]">
          <div ref={orbitalRef} className="relative w-full h-full">
            {/* Outer Ring */}
            <div
              className="orbit-ring absolute top-1/2 left-1/2 w-full h-full rounded-full border border-[#f4f4f0]/[0.07]"
              style={{ animation: "orbit-rotate 30s linear infinite" }}
            >
              {/* Dots on outer ring */}
              <span
                className="orbit-dot absolute w-2 h-2 rounded-full bg-[#f4f4f0]/40 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ animation: "pulse-dot 3s ease-in-out infinite" }}
              />
              <span
                className="orbit-dot absolute w-1.5 h-1.5 rounded-full bg-[#f4f4f0]/25 bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
                style={{ animation: "pulse-dot 3s ease-in-out infinite 1.5s" }}
              />
            </div>

            {/* Middle Ring */}
            <div
              className="orbit-ring absolute top-1/2 left-1/2 w-[70%] h-[70%] rounded-full border border-[#f4f4f0]/[0.1]"
              style={{ animation: "orbit-rotate-reverse 22s linear infinite" }}
            >
              <span
                className="orbit-dot absolute w-2.5 h-2.5 rounded-full bg-[#f4f4f0]/30 top-1/2 right-0 translate-x-1/2 -translate-y-1/2"
                style={{ animation: "pulse-dot 4s ease-in-out infinite 0.5s" }}
              />
              <span
                className="orbit-dot absolute w-1.5 h-1.5 rounded-full bg-[#f4f4f0]/20 top-0 left-1/4 -translate-y-1/2"
                style={{ animation: "pulse-dot 3.5s ease-in-out infinite 2s" }}
              />
            </div>

            {/* Inner Ring */}
            <div
              className="orbit-ring absolute top-1/2 left-1/2 w-[40%] h-[40%] rounded-full border border-[#f4f4f0]/[0.15]"
              style={{ animation: "orbit-rotate 15s linear infinite" }}
            >
              <span
                className="orbit-dot absolute w-3 h-3 rounded-full bg-[#f4f4f0]/50 bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
                style={{ animation: "pulse-dot 2.5s ease-in-out infinite 1s" }}
              />
            </div>

            {/* Center Crosshair */}
            <div className="crosshair absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative w-6 h-6">
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#f4f4f0]/30 -translate-y-1/2" />
                <div className="absolute left-1/2 top-0 h-full w-[1px] bg-[#f4f4f0]/30 -translate-x-1/2" />
                <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full bg-[#f4f4f0]/60 -translate-x-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Subtle glow behind orbits */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-[#f4f4f0]/[0.02] rounded-full blur-3xl pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Bottom Marquee Ticker */}
      <div
        ref={marqueeRef}
        className="absolute bottom-16 left-0 w-full overflow-hidden pointer-events-none opacity-0"
      >
        <div className="marquee-track">
          {Array.from({ length: 4 }).map((_, i) => (
            <span
              key={i}
              className="text-[3vw] md:text-[2vw] font-heading font-light italic tracking-[0.15em] text-[#f4f4f0]/[0.06] whitespace-nowrap mx-4 uppercase select-none"
            >
              {MARQUEE_TEXT}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <a
        href="#work"
        onClick={(e) => {
          e.preventDefault();
          document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
        }}
        ref={scrollIndicatorRef}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 interactive group"
      >
        <div className="relative h-4 overflow-hidden w-24 flex justify-center">
          <span className="absolute top-0 text-[10px] uppercase tracking-[0.3em] text-[#f4f4f0]/30 font-sans transition-all duration-300 group-hover:-translate-y-full group-hover:opacity-0">
            Scroll
          </span>
          <span className="absolute top-full text-[10px] uppercase tracking-[0.3em] text-[#f4f4f0]/70 font-sans transition-all duration-300 group-hover:-translate-y-full">
            View Work
          </span>
        </div>
        <div
          className="w-[1px] h-6 bg-gradient-to-b from-[#f4f4f0]/40 to-transparent transition-all duration-300 group-hover:h-8 group-hover:from-[#f4f4f0]/80"
          style={{ animation: "scroll-bounce 2s ease-in-out infinite" }}
        />
      </a>
    </section>
  );
}
