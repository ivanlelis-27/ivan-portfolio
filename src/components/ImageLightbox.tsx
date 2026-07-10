"use client";

import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageLightboxProps {
  images: { src: string; alt: string }[];
}

export default function ImageLightbox({ images }: ImageLightboxProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const prev = useCallback(() => {
    setActiveIndex((i) => (i !== null && i > 0 ? i - 1 : images.length - 1));
  }, [images.length]);
  const next = useCallback(() => {
    setActiveIndex((i) => (i !== null && i < images.length - 1 ? i + 1 : 0));
  }, [images.length]);

  useEffect(() => {
    if (activeIndex === null) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [activeIndex, close, prev, next]);

  return (
    <>
      {/* Thumbnail Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className="relative aspect-[4/3] rounded-xl overflow-hidden bg-white/5 border border-white/10 interactive group cursor-pointer text-left"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Expand hint */}
            <div className="absolute inset-0 flex items-end justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="bg-black/60 backdrop-blur-sm text-[#f4f4f0]/80 text-xs font-sans px-3 py-1.5 rounded-full border border-white/10">
                Click to expand
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox Overlay */}
      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          onClick={close}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/95" />

          {/* Close Button */}
          <button
            onClick={close}
            className="absolute top-6 right-6 z-[110] w-12 h-12 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-[#f4f4f0]/70 hover:text-[#f4f4f0] hover:border-white/40 transition-all interactive"
          >
            <X size={20} />
          </button>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-4 md:left-8 z-[110] w-12 h-12 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-[#f4f4f0]/70 hover:text-[#f4f4f0] hover:border-white/40 transition-all interactive"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-4 md:right-8 z-[110] w-12 h-12 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-[#f4f4f0]/70 hover:text-[#f4f4f0] hover:border-white/40 transition-all interactive"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {/* Image */}
          <div
            className="relative z-[105] max-w-[90vw] max-h-[85vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[activeIndex].src}
              alt={images[activeIndex].alt}
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
          </div>

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[110] font-sans text-sm text-[#f4f4f0]/50 tracking-widest">
              {activeIndex + 1} / {images.length}
            </div>
          )}
        </div>
      )}
    </>
  );
}
