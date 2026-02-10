"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Code2, Database, Laptop } from "lucide-react";
import Squares from "../Squares";
import RotatingText from "./RotatingText"; 

const FloatingIcon = ({ children, delay, x, y }: { children: React.ReactNode; delay: number; x: number; y: number }) => (
  <motion.div
    animate={{ 
      y: [0, -20, 0],
      rotate: [0, 10, -10, 0]
    }}
    transition={{ 
      duration: 5, 
      delay: delay,
      repeat: Infinity,
      ease: "easeInOut" 
    }}
    // z-30 sangat penting agar ikon tidak "tenggelam" di warna background
    className="absolute text-white/5 md:text-white/10 pointer-events-none z-30"
    style={{ left: `${x}%`, top: `${y}%` }}
  >
    {children}
  </motion.div>
);

export default function Hero() {
  return (
    // Warna paling gelap: #010103
    <section className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden bg-[#010103]">
      
      {/* 1. BACKGROUND SQUARES */}
      <div className="absolute inset-0 z-0">
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <Squares
            speed={0.5}
            squareSize={42}
            direction="diagonal"
            borderColor="#1a1a3a" // Border kotak dibuat lebih gelap agar menyatu
            hoverFillColor="#2e2a78"
          />
        </div>
      </div>
      
      {/* 2. EFEK CAHAYA (DIBUAT LEBIH REDUP) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        
        {/* Opacity cahaya diturunkan agar background tetap terasa sangat gelap */}
        <div className="absolute top-[-5%] left-[-20%] md:left-[-5%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-600/10 rounded-full blur-[80px] md:blur-[120px]" />
        <div className="absolute bottom-[5%] left-[-15%] md:left-[2%] w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-pink-500/10 rounded-full blur-[80px] md:blur-[100px]" />
        <div className="absolute top-[0%] right-[-20%] md:right-[-5%] w-[350px] md:w-[450px] h-[350px] md:h-[450px] bg-purple-600/10 rounded-full blur-[90px] md:blur-[110px]" />
        <div className="absolute bottom-[0%] right-[-15%] md:right-[-2%] w-[350px] md:w-[500px] h-[350px] md:h-[500px] bg-cyan-400/10 rounded-full blur-[90px] md:blur-[120px]" />

        <div className="hidden md:block absolute top-[40%] left-[-10%] w-[300px] h-[600px] bg-indigo-500/5 rounded-full blur-[130px]" />
        <div className="hidden md:block absolute top-[35%] right-[-10%] w-[300px] h-[600px] bg-fuchsia-500/5 rounded-full blur-[130px]" />
      </div>

      {/* 3. IKON MELAYANG */}
      <FloatingIcon delay={0} x={5} y={15}><Code2 size={40} /></FloatingIcon>
      <FloatingIcon delay={2} x={85} y={12}><Database size={35} /></FloatingIcon>
      <FloatingIcon delay={1} x={8} y={75}><Laptop size={50} /></FloatingIcon>
      <FloatingIcon delay={3} x={88} y={80}><Github size={30} /></FloatingIcon>

      {/* KONTEN UTAMA */}
      <div className="z-20 text-center max-w-4xl relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-gray-400 mb-6 backdrop-blur-sm"
        >
          <span className="animate-pulse mr-2 text-green-400">●</span>
          Available for freelance & hire
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight flex flex-col items-center gap-2 mx-auto max-w-[280px] md:max-w-none"
        >
          <span>Halo, Saya A. Fandi Akbar</span>
          <RotatingText 
            texts={[
              "Front-End Development",
              "Back-End Development",
              "Embedded System (IoT)",
              "UI/UX Design",
              "Graphic Design",
              "IT Support"
            ]} 
          />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-base md:text-xl text-gray-400 max-w-[300px] md:max-w-2xl mx-auto mt-4 leading-relaxed" 
        >
          Terbiasa bekerja menggunakan komputer dan sistem digital untuk menunjang berbagai aktivitas berbasis teknologi.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10"
        >
          <a 
            href="#projects" 
            className="flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            Lihat Portfolio <ArrowRight size={20} />
          </a>
          
          <div className="flex gap-4">
             <button className="p-4 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-white group">
                <Github size={24} className="group-hover:text-cyan-400 transition-colors" />
             </button>
             <button className="p-4 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-white group">
                <Linkedin size={24} className="group-hover:text-blue-400 transition-colors" />
             </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}