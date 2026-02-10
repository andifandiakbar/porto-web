"use client";

import { motion } from "framer-motion";

const skills = [
  "Next.js", "TypeScript", "Tailwind CSS", 
  "Framer Motion", "Node.js", "Git", "PostgreSQL", "Embedded System", "Figma", "Adobe Photoshop", "Adobe Illustrator", "Corel Draw", "Family Microsoft Office"
];

export default function TechStack() {
  return (
    <section className="py-20 bg-background overflow-hidden border-b border-white/5">
      <div className="container mx-auto px-6 text-center mb-8">
        <p className="text-sm font-medium text-secondary uppercase tracking-widest">
        Teknologi yang Saya Gunakan
        </p>
      </div>
      
      {/* Container Animasi */}
      <div className="flex w-full">
        <motion.div
          className="flex gap-16 whitespace-nowrap"
          // Ini mantra untuk membuat teks berjalan tanpa henti
          animate={{ x: ["0%", "-30%"] }}
          transition={{ 
            repeat: Infinity, 
            duration: 30, 
            ease: "linear" 
          }}
        >
          {/* Kita duplikasi list skill biar looping-nya halus */}
          {[...skills, ...skills, ...skills].map((skill, index) => (
            <span 
              key={index} 
              className="text-4xl md:text-6xl font-bold text-white/10 hover:text-accent transition-colors cursor-default"
            >
              {skill}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}