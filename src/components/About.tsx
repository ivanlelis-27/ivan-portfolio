"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current && imageRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom bottom",
          toggleActions: "play none none reverse",
        }
      });

      tl.fromTo(
        imageRef.current,
        { scale: 0.8, opacity: 0, rotation: -5 },
        { scale: 1, opacity: 1, rotation: 0, duration: 1, ease: "power3.out" }
      ).fromTo(
        textRef.current.children,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power2.out" },
        "-=0.5"
      );
    }
  }, []);

  const skills = [
    "Figma", "Wireframing", "Prototyping", "Design Systems", "User Flows", "Responsive Design", "UI Design",
    "React", "JavaScript", "TypeScript", "HTML/CSS", "Angular", "Next.js", ".NET Framework", "MS SQL", "GSAP", "Tailwind CSS", "Firebase", "Supabase", "Photoshop", "Canva",
  ];

  return (
    <section id="about" ref={sectionRef} className="py-32 bg-transparent text-white relative border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          
          <div ref={imageRef} className="w-full lg:w-1/2 relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 relative z-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/me.png" 
                alt="Portrait" 
                className="w-full h-full object-cover transition-all duration-1000"
              />
            </div>
            {/* Decorative background blur */}
            <div className="absolute -inset-4 bg-white/5 blur-3xl z-0 rounded-full" />
          </div>

          <div ref={textRef} className="w-full lg:w-1/2 space-y-8">
            <h2 className="text-4xl md:text-6xl font-heading tracking-tight text-[#f4f4f0]">
              About <span className="italic font-light opacity-70">Me</span>
            </h2>
            
            <div className="space-y-4 text-gray-400 text-lg">
              <p>
                I am a UI/UX Designer and Front-End Developer with hands-on experience designing mobile applications, web portals, and CRM systems. I specialize in bringing ideas from wireframes to high-fidelity prototypes in Figma, and I'm passionate about solving user problems through thoughtful, modern design.
              </p>
              <p>
                With a strong background in front-end development using React and Angular, I bridge the gap between design and engineering, ensuring that intuitive interfaces are flawlessly implemented.
              </p>
            </div>

            <div className="pt-8 border-t border-white/10">
              <h3 className="text-2xl font-heading font-medium mb-6 text-[#f4f4f0]">Technologies & Skills</h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, i) => (
                  <span 
                    key={i} 
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-sans hover:bg-[#f4f4f0] hover:text-[#0a0a0a] hover:border-[#f4f4f0] transition-colors interactive cursor-pointer"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center gap-6 w-full">
              <a 
                href="mailto:ivanlelis.dev@gmail.com"
                className="inline-block border-b border-[#f4f4f0]/30 pb-1 text-2xl font-heading font-medium interactive hover:text-white/70 hover:border-[#f4f4f0] transition-colors"
              >
                Let's collaborate →
              </a>
              <a
                href="/resume.pdf"
                download="Ivan_Lelis_Resume.pdf"
                className="interactive flex items-center justify-center px-6 py-3 bg-transparent text-[#f4f4f0] rounded-full text-sm font-medium hover:bg-[#f4f4f0] hover:text-[#0a0a0a] border border-[#f4f4f0] transition-all"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                Download Resume
              </a>
              <button
                onClick={() => document.querySelector("#home")?.scrollIntoView({ behavior: "smooth" })}
                className="interactive flex items-center justify-center p-3 bg-white/5 text-[#f4f4f0]/70 hover:text-[#0a0a0a] hover:bg-[#f4f4f0] rounded-full transition-all sm:ml-auto group"
                title="Back to top"
              >
                <svg className="w-5 h-5 transition-transform group-hover:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
