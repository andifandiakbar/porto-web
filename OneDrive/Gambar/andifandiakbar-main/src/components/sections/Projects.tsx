"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

const projects = [
  {
    title: "Website Rutan Sinjai",
    desc: "Digitalisasi sistem informasi dan layanan publik Rutan Kelas IIB Sinjai untuk meningkatkan efisiensi akses masyarakat.",
    tags: ["Web Development", "TypeScript", "Responsive"],
    image: "/112.jpg",
    link: "https://porto-web-nine.vercel.app/", 
  },
];

export default function Projects() {
  return (
    // SAYA UBAH: py-24 menjadi pt-12 pb-24 agar posisi naik ke atas
    <section id="projects" className="pt-12 pb-24 bg-transparent relative">
      <div className="container mx-auto px-6">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Proyek <span className="text-accent">Pilihan.</span>
          </h2>
          <p className="text-secondary max-w-2xl mx-auto">
          Beberapa hasil karya yang pernah saya kerjakan.
          </p>
        </motion.div>

        {/* PERUBAHAN DI SINI: Menggunakan flex dan justify-center agar kartu ke tengah */}
        <div className="flex justify-center items-center max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              
              /* Mengatur lebar kartu agar pas (max-w-2xl) dan tetap responsif */
              className="group relative bg-white/5 rounded-2xl overflow-hidden transition-all duration-300 z-10 
              border border-purple-500/40 shadow-[0_0_20px_rgba(168,85,247,0.25)] 
              md:border-white/10 md:shadow-none 
              md:hover:border-purple-400 md:hover:shadow-[0_0_60px_rgba(168,85,247,0.7)] md:hover:-translate-y-2
              max-w-2xl w-full"
            >
              {/* Bagian Gambar */}
              <div className="relative h-64 md:h-80 w-full overflow-hidden">
                 <Image 
                   src={project.image} 
                   alt={project.title}
                   fill
                   className="object-cover group-hover:scale-110 transition-transform duration-500"
                 />
                 <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
              </div>
              
              <div className="p-8 text-left"> {/* Ditambah padding agar lebih lega */}
                <h3 className="text-2xl font-bold mb-3 text-purple-200 md:text-white md:group-hover:text-purple-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-secondary text-base mb-6">
                  {project.desc}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs px-3 py-1.5 rounded bg-white/5 text-secondary border border-white/5 group-hover:border-purple-500/30 group-hover:text-purple-200 transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <a 
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-white hover:text-purple-300 transition-colors cursor-pointer"
                  >
                    <ExternalLink size={18} /> Detail
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}