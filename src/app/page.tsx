import Hero from "@/components/Hero";
import Work from "@/components/Work";
import About from "@/components/About";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative text-white">
      <Hero />
      <Work />
      <About />
      <Footer />
    </div>
  );
}
