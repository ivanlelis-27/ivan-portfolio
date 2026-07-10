import { projectsData } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ImageLightbox from "@/components/ImageLightbox";

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = projectsData.find((p) => p.slug === resolvedParams.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-32 pb-20 text-[#f4f4f0] relative z-10">
      <div className="container mx-auto px-6">
        
        {/* Back button */}
        <Link href="/#work" className="inline-flex items-center gap-2 text-[#f4f4f0]/50 hover:text-[#f4f4f0] transition-colors mb-12 interactive group font-sans">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm uppercase tracking-[0.15em]">Back to Work</span>
        </Link>

        {/* Header */}
        <div className="max-w-4xl mb-16">
          <h1 className="text-5xl md:text-7xl font-heading tracking-tight mb-6 text-[#f4f4f0]">{project.title}</h1>
          <p className="text-xl text-[#f4f4f0]/60 leading-relaxed font-sans">
            {project.overview}
          </p>
        </div>

        {/* Project Meta Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-white/10 mb-20">
          <div>
            <h4 className="text-xs text-[#f4f4f0]/40 uppercase tracking-[0.2em] mb-2 font-sans">Role</h4>
            <p className="font-sans font-medium text-[#f4f4f0]">{project.role}</p>
          </div>
          <div>
            <h4 className="text-xs text-[#f4f4f0]/40 uppercase tracking-[0.2em] mb-2 font-sans">Timeline</h4>
            <p className="font-sans font-medium text-[#f4f4f0]">{project.timeline}</p>
          </div>
          <div>
            <h4 className="text-xs text-[#f4f4f0]/40 uppercase tracking-[0.2em] mb-2 font-sans">Category</h4>
            <p className="font-sans font-medium text-[#f4f4f0]">{project.category}</p>
          </div>
          <div>
            <h4 className="text-xs text-[#f4f4f0]/40 uppercase tracking-[0.2em] mb-2 font-sans">Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map(tech => (
                <span key={tech} className="text-sm font-sans bg-white/5 border border-white/10 px-3 py-1 rounded-full text-[#f4f4f0]/80">{tech}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Problem & Solution */}
        <div className="grid md:grid-cols-2 gap-16 mb-20 max-w-5xl mx-auto">
          <div>
            <h3 className="text-3xl font-heading font-medium mb-4 text-[#f4f4f0]">The Problem</h3>
            <p className="text-[#f4f4f0]/60 leading-relaxed font-sans">{project.problem}</p>
          </div>
          <div>
            <h3 className="text-3xl font-heading font-medium mb-4 text-[#f4f4f0]">The Solution</h3>
            <p className="text-[#f4f4f0]/60 leading-relaxed font-sans">{project.solution}</p>
          </div>
        </div>

        {/* Images/Sections */}
        <div className="space-y-32">
          {project.sections.map((section, idx) => (
            <div key={idx} className="space-y-10">
              <div className="max-w-3xl">
                <h2 className="text-4xl font-heading font-medium mb-4 text-[#f4f4f0]">{section.title}</h2>
                <p className="text-[#f4f4f0]/50 text-lg font-sans">{section.description}</p>
              </div>
              
              {/* Images with Lightbox */}
              <ImageLightbox
                images={section.images.map((img, imgIdx) => ({
                  src: img.startsWith("/") ? img : "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=2070&auto=format&fit=crop",
                  alt: `${section.title} Screenshot ${imgIdx + 1}`,
                }))}
              />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
