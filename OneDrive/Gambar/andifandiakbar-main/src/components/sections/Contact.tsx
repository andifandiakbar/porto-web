"use client";

import { motion } from "framer-motion";
import { MessageCircle, MapPin, Github, Linkedin, Instagram, Mail } from "lucide-react"; // Menambah MessageCircle (WA)

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-surface relative overflow-hidden">
      
      {/* Hiasan Glow Ungu di pojok bawah */}
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Mari Mulai <span className="text-accent">Diskusi.</span>
          </h2>
          <p className="text-secondary text-lg max-w-2xl mx-auto mb-10">
          Anda Punya ide atau proyek menarik? Jangan ragu untuk menyapa saya!

          </p>

          {/* Tombol WhatsApp Besar (Ganti dari Email) */}
          <a 
            href="https://wa.me/6287847110950"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition-transform hover:scale-105 active:scale-95 mb-12"
          >
            <MessageCircle className="w-5 h-5" /> Chat via WhatsApp
          </a>

          {/* Info Tambahan */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-secondary text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-accent" />
              <span>Kota Makassar, Sulawesi Selatan</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-accent" />
              <span>andifandiakbar99@gmail.com</span>
            </div>
          </div>

          <div className="w-full h-px bg-white/10 my-12" />

          {/* Copyright & Sosmed */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-secondary text-sm">
              © 2026 Portofolio A. Fandi Akbar. All rights reserved.
            </p>
            
            <div className="flex gap-6">
              {/* Github */}
              <a href="https://github.com/" target="_blank" className="text-secondary hover:text-white transition-colors">
                <Github size={20} />
              </a>
              
              {/* Linkedin */}
              <a href="https://linkedin.com/" target="_blank" className="text-secondary hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              
              {/* --- BAGIAN INSTAGRAM --- */}
              <a 
                href="https://www.instagram.com/" 
                target="_blank" 
                className="text-secondary hover:text-white transition-colors"
              >
                <Instagram size={20} />
              </a>

            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}