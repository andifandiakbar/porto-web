import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar"; 
import SplashCursor from "@/components/SplashCursor";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "A. Fandi Akbar | Portofolio",
  description: "IT Enthusiast & Web Developer Portofolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${inter.className} bg-[#010103] text-white antialiased`}>
        {/* SplashCursor sebagai efek background global */}
        <SplashCursor />
        
        {/* Navbar akan muncul di semua halaman */}
        <Navbar />

        {/* children adalah isi dari page.tsx (Hero, About, dll) */}
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}