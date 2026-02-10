import Hero from "@/components/sections/Hero";
import TechStack from "@/components/sections/TechStack";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import SplashCursor from "@/components/SplashCursor";

export default function Home() {
  return (
    <main className="relative bg-[#030005] min-h-screen">
      <SplashCursor />
      {/* Konten Utama */}
      <div className="relative z-10">
        <Hero />
        <TechStack />
        <About />
        <Projects />
        <Contact />
      </div>
    </main>
  );
}
