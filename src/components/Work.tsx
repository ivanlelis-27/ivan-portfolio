"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Eye } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

import { projectsData } from "@/lib/data";

// Unique accent colors per project for the aura glow
const PROJECT_ACCENTS = [
  { glow: "0 0 80px 20px rgba(99, 102, 241, 0.15), 0 0 160px 60px rgba(168, 85, 247, 0.08)" },   // Indigo → Purple
  { glow: "0 0 80px 20px rgba(251, 146, 60, 0.15), 0 0 160px 60px rgba(245, 101, 101, 0.08)" },   // Orange → Red
  { glow: "0 0 80px 20px rgba(52, 211, 153, 0.15), 0 0 160px 60px rgba(59, 130, 246, 0.08)" },     // Emerald → Blue
];

function ProjectCard({ project, index }: { project: typeof projectsData[0]; index: number }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageAreaRef = useRef<HTMLDivElement>(null);
  const imageTrackRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [imageAreaWidth, setImageAreaWidth] = useState(0);
  const trackTweenRef = useRef<gsap.core.Tween | null>(null);

  const accent = PROJECT_ACCENTS[index % PROJECT_ACCENTS.length];

  // Measure the image area width on mount and resize
  useEffect(() => {
    const measure = () => {
      if (imageAreaRef.current) {
        setImageAreaWidth(imageAreaRef.current.offsetWidth);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // 3D magnetic tilt effect
  // Events are on the WRAPPER (which never transforms) so the hit area stays stable
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!wrapperRef.current || !cardRef.current) return;

    const rect = wrapperRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const rotateX = (y - 0.5) * -10;
    const rotateY = (x - 0.5) * 10;

    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      scale: 1.02,
      duration: 0.5,
      ease: "power2.out",
      overwrite: "auto",
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    // Glow via box-shadow on the card — no separate element means no edge lines
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        boxShadow: accent.glow,
        duration: 0.5,
        ease: "power2.out",
      });
    }
    setIsHovered(true);
  }, [accent.glow]);

  const handleMouseLeave = useCallback(() => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        boxShadow: "0 0 0px 0px transparent",
        duration: 0.6,
        ease: "power3.out",
        overwrite: "auto",
      });
    }
    setIsHovered(false);
  }, []);

  // Gather all section images for the preview strip
  const allImages = project.sections.flatMap(s => s.images);

  // Image preview strip animation
  useEffect(() => {
    if (!imageTrackRef.current) return;

    if (isHovered) {
      if (trackTweenRef.current) trackTweenRef.current.kill();
      trackTweenRef.current = gsap.to(imageTrackRef.current, {
        xPercent: -50,
        duration: allImages.length * 2.5,
        ease: "none",
        repeat: -1,
      });
    } else {
      if (trackTweenRef.current) {
        trackTweenRef.current.kill();
        trackTweenRef.current = null;
      }
      gsap.set(imageTrackRef.current, { xPercent: 0 });
    }

    return () => {
      if (trackTweenRef.current) {
        trackTweenRef.current.kill();
      }
    };
  }, [isHovered, allImages.length]);

  return (
    <Link href={`/work/${project.slug}`} className="block">
      {/* Wrapper — receives all mouse events, never transforms itself */}
      <div
        ref={wrapperRef}
        className="project-card relative"
        style={{ perspective: 800 }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Main Card — tilts and gets box-shadow glow (no separate glow element) */}
        <div
          ref={cardRef}
          className="relative overflow-hidden rounded-2xl bg-white/[0.04] border border-white/[0.07]"
          style={{
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            boxShadow: "0 0 0px 0px transparent",
          }}
        >
          {/* Large editorial index number */}
          <div className="absolute top-4 right-6 text-[8rem] font-heading font-black leading-none text-white/[0.03] select-none pointer-events-none">
            {String(index + 1).padStart(2, "0")}
          </div>

          {/* Image Area */}
          <div ref={imageAreaRef} className="relative aspect-[16/10] overflow-hidden">
            {/* Static thumbnail — visible when NOT hovered */}
            <img
              src={project.thumbnail}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
              style={{ opacity: isHovered ? 0 : 1 }}
            />

            {/* Animated preview strip — each image fills the full card width */}
            <div
              className="absolute inset-0 overflow-hidden transition-opacity duration-500"
              style={{ opacity: isHovered ? 1 : 0 }}
            >
              <div
                ref={imageTrackRef}
                className="flex h-full"
              >
                {[...allImages, ...allImages].map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt=""
                    className="h-full flex-shrink-0 object-cover"
                    style={{ width: imageAreaWidth > 0 ? imageAreaWidth : "100%" }}
                    loading="lazy"
                  />
                ))}
              </div>
            </div>

            {/* Gradient overlay at bottom */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

            {/* "View Project" pill — floats up on hover */}
            <div
              className="absolute bottom-4 inset-x-0 flex justify-center transition-all duration-500 ease-out"
              style={{
                transform: `translateY(${isHovered ? "0px" : "40px"})`,
                opacity: isHovered ? 1 : 0,
              }}
            >
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2.5 text-sm font-sans text-white/90 interactive">
                <Eye size={14} className="opacity-70" />
                <span>View Project</span>
                <ArrowUpRight size={14} className="opacity-70" />
              </div>
            </div>
          </div>

          {/* Card Info */}
          <div className="p-6 md:p-8">
            {/* Category + Year row */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[10px] uppercase tracking-[0.25em] font-sans text-white/40 transition-colors duration-500"
                style={{ color: isHovered ? "rgba(255,255,255,0.6)" : undefined }}
              >
                {project.category}
              </span>
              <span className="ml-auto text-[10px] uppercase tracking-[0.2em] font-sans text-white/30 border border-white/10 rounded-full px-3 py-1">
                {project.year}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-2xl md:text-3xl font-heading font-semibold tracking-tight text-white/90 transition-colors duration-500 mb-4"
              style={{ color: isHovered ? "rgba(255,255,255,1)" : undefined }}
            >
              {project.title}
            </h3>

            {/* Overview teaser */}
            <p className="text-sm font-sans text-white/30 leading-relaxed line-clamp-2 transition-colors duration-500"
              style={{ color: isHovered ? "rgba(255,255,255,0.5)" : undefined }}
            >
              {project.overview}
            </p>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-2 mt-5">
              {project.technologies.map((tech, i) => (
                <span
                  key={tech}
                  className="text-[10px] font-sans uppercase tracking-wider border rounded-full px-3 py-1 transition-all duration-500"
                  style={{
                    color: isHovered ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.25)",
                    borderColor: isHovered ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)",
                    transitionDelay: `${i * 50}ms`,
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate header
    if (headerRef.current) {
      const heading = headerRef.current.querySelector("h2");
      const subtext = headerRef.current.querySelector("p");
      const line = headerRef.current.querySelector(".header-line");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none reverse",
        },
      });

      if (heading) {
        tl.fromTo(heading, { y: 60, opacity: 0, clipPath: "inset(100% 0 0 0)" }, {
          y: 0, opacity: 1, clipPath: "inset(0% 0 0 0)", duration: 1, ease: "power4.out"
        });
      }
      if (line) {
        tl.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: "power2.inOut" }, "-=0.5");
      }
      if (subtext) {
        tl.fromTo(subtext, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, "-=0.4");
      }
    }

    // Animate cards with staggered parallax entrance
    const cards = gsap.utils.toArray<HTMLElement>(".project-card");

    cards.forEach((card, i) => {
      gsap.fromTo(card,
        {
          y: 120 + (i * 20),
          opacity: 0,
          scale: 0.95,
        },
        {
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=50",
            end: "top center",
            toggleActions: "play none none reverse",
          },
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          delay: (i % 2) * 0.15,
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="py-32 md:py-44 bg-transparent text-white relative z-10"
    >
      {/* Ambient background glow for the section */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(99, 102, 241, 0.03) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="container mx-auto px-6 relative">
        {/* Section Header */}
        <div ref={headerRef} className="mb-24 md:mb-32">
          <div className="flex items-end gap-6 mb-6">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-heading tracking-tight text-[#f4f4f0] leading-[0.9]">
              Selected{" "}
              <span className="italic font-light text-white/50">Works</span>
            </h2>
            <span className="hidden md:inline-block text-sm font-sans text-white/20 tracking-[0.2em] uppercase pb-2">
              ({String(projectsData.length).padStart(2, "0")})
            </span>
          </div>
          <div className="header-line h-[1px] w-full max-w-2xl bg-gradient-to-r from-white/20 via-white/10 to-transparent origin-left mb-6" />
          <p className="text-white/40 max-w-lg text-base md:text-lg font-sans leading-relaxed">
            Curated projects where design thinking meets technical execution —
            each one built to solve real problems with craft and intention.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14">
          {projectsData.map((project, index) => (
            <div
              key={project.slug}
              className={index % 2 !== 0 ? "md:mt-24" : ""}
            >
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
