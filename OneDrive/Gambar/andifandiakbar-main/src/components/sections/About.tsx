"use client";

import { motion } from "framer-motion";
import { Code2, Palette, Terminal, Cpu } from "lucide-react";
import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py-24 bg-black relative overflow-hidden">
      
      {/* Background Pattern - Mengikuti kodingan terbaru kamu */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]"></div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* BAGIAN ATAS: Grid 2 Kolom */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          
          {/* 1. TEKS (Kiri) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-2 md:order-1"
          >
            <h2 className="text-4xl font-bold mb-6">
              Tentang <span className="text-accent">Saya.</span>
            </h2>
            
            <div className="space-y-4 text-secondary text-lg leading-relaxed mb-8">
              <p>
                Halo!👋 Saya <span className="text-white font-semibold">A. Fandi Akbar</span>, 
                Information Technology Enthusiast dari <span className="text-white">Kota Makassar</span>.
              </p>
              <p>
              Saya memiliki kemampuan menggunakan komputer serta pemahaman sistem teknologi informasi. Dengan latar belakang tersebut, saya terbiasa menangani berbagai kebutuhan digital, mulai dari pengembangan sistem, desain, hingga dukungan teknis secara terstruktur dan fungsional.
              </p>
            </div>

            <div className="flex gap-6">
              <div className="px-6 py-3 border border-white/10 rounded-xl bg-white/5">
                <h3 className="text-3xl font-bold text-accent mb-1">2.5+</h3>
                <p className="text-xs text-secondary uppercase tracking-wider">Years Exp</p>
              </div>
              <div className="px-6 py-3 border border-white/10 rounded-xl bg-white/5">
                <h3 className="text-3xl font-bold text-accent mb-1">17+</h3>
                <p className="text-xs text-secondary uppercase tracking-wider">Projects</p>
              </div>
            </div>
          </motion.div>

          {/* 2. FOTO LINGKARAN PENUH (Kanan) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-center order-1 md:order-2"
          >
            <div className="relative group">
                {/* Efek Glow Ungu di Belakang */}
                <div className="absolute inset-0 bg-purple-600/40 blur-[60px] rounded-full group-hover:bg-purple-600/60 transition-all duration-500 scale-110"></div>
                
                {/* BINGKAI UTAMA: LINGKARAN PENUH */}
                <div className="relative w-80 h-80 rounded-full overflow-hidden border-[5px] border-white/10 group-hover:border-purple-500/50 transition-all duration-500 shadow-2xl z-10">
                    <Image 
                        src="/fandi3.png" 
                        alt="A. Fandi Akbar"
                        fill
                        className="object-cover object-top group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                </div>
            </div>
          </motion.div>

        </div>

        {/* BAGIAN BAWAH: Skill Cards */}
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {/* Skill 1 */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-blue-500/10 transition-all group">
              <Code2 className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-lg font-bold mb-1">Web Development</h3>
              <p className="text-xs text-secondary">Front-End, Back-End</p>
            </div>
            {/* Skill 2 */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-purple-500/10 transition-all group">
              <Palette className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-lg font-bold mb-1">Creative & UI/UX Design</h3>
              <p className="text-xs text-secondary">Figma Design, Adobe PS, Adobe Ai, Corel Draw</p>
            </div>
            {/* Skill 3 */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-green-500/10 transition-all group">
              <Terminal className="w-8 h-8 text-green-400 mb-4" />
              <h3 className="text-lg font-bold mb-1">Database</h3>
              <p className="text-xs text-secondary">SQL, PostgreSQL, Supabase</p>
            </div>
            {/* Skill 4 */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-yellow-500/10 transition-all group">
              <Cpu className="w-8 h-8 text-yellow-400 mb-4" />
              <h3 className="text-lg font-bold mb-1">Embedded System</h3>
              <p className="text-xs text-secondary">Internet of Things (IoT), Hardware</p>
            </div>
        </motion.div>

      </div>
    </section>
  );
}