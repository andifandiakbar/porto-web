"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import Link from 'next/link';
import { supabase } from '../../lib/supabase';
import { motion, Variants } from 'framer-motion';

import "./desktop.css"; 
import "./mobile.css";

interface Banner {
  img: string;
  headline?: string;
  showText: boolean;
}

interface News {
  id?: number;
  img: string;
  headline: string;
  meta: string;
  status?: string; 
}

export default function LamanPublikRutan() {
  const router = useRouter(); 
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [countPenghuni, setCountPenghuni] = useState<number>(0);
  const [targetPenghuni, setTargetPenghuni] = useState<number>(0);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [newsIndex, setNewsIndex] = useState<number>(0); 

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [newsFromCMS, setNewsFromCMS] = useState<News[]>([]);

  const banners: Banner[] = [
    {
      img: '/assets/Banner.png',
      headline: "SELAMAT DATANG DI LAMAN RESMI RUMAH TAHANAN NEGARA KELAS II B KABUPATEN SINJAI",
      showText: true
    },
    { img: '/assets/Banner2.png', showText: false },
    { img: '/assets/Banner3.png', showText: false }
  ];

  const newsDataDefault: News[] = [
    {
      id: 0,
      img: '/assets/berita1.png',
      headline: 'GANDENG LBH BAKTI KEADILAN, RUTAN SINJAI FASILITASI TAHANAN DAPATKAN BANTUAN HUKUM',
      meta: 'Rutan Kelas IIB Sinjai | Oct 7, 2024'
    }
  ];

  useEffect(() => {
    const fetchBeritaOnline = async () => {
      const { data, error } = await supabase
        .from('daftar_berita')
        .select('*')
        .order('id', { ascending: false });

      if (data && data.length > 0) {
        const formatted = data.map((item: any) => ({
          id: item.id,
          img: item.img || '/assets/berita1.png',
          headline: item.judul || item.headline,
          meta: `Rutan Kelas IIB Sinjai | ${item.tanggal}`
        }));
        setNewsFromCMS(formatted);
      }
    };

    const fetchWBPCount = async () => {
      const { count } = await supabase
        .from('daftar_wbp')
        .select('*', { count: 'exact', head: true });
      if (count) setTargetPenghuni(count);
    };

    fetchBeritaOnline();
    fetchWBPCount();
  }, []);

  const combinedNews = newsFromCMS.length > 0 ? newsFromCMS : newsDataDefault;
  const extendedNews = combinedNews;

  const nextSlide = () => {
    setIsPaused(true);
    setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsPaused(false), 5000);
  };

  const prevSlide = () => {
    setIsPaused(true);
    setCurrentSlide((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
    setTimeout(() => setIsPaused(false), 5000);
  };

  const nextNews = () => {
    const itemsToShow = isMobile ? 1 : 3;
    const maxIndex = Math.max(0, extendedNews.length - itemsToShow);
    if (newsIndex < maxIndex) setNewsIndex(prev => prev + 1);
    else setNewsIndex(0);
  };

  const prevNews = () => {
    const itemsToShow = isMobile ? 1 : 3;
    const maxIndex = Math.max(0, extendedNews.length - itemsToShow);
    if (newsIndex > 0) setNewsIndex(prev => prev - 1);
    else setNewsIndex(maxIndex);
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      alert("Masukkan nama terlebih dahulu");
      return;
    }
    router.push(`/dashboard-pencarian?nama=${encodeURIComponent(searchTerm)}`);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (!isPaused) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
      }, 5000);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [isPaused, banners.length]);

  useEffect(() => {
    if (countPenghuni < targetPenghuni) {
      const timer = setTimeout(() => {
        setCountPenghuni(prev => prev + 1);
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [countPenghuni, targetPenghuni]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);   

  const fadeInVariant: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };
  
  return (
    <main className="main-wrapper" style={{ fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />

      <section className="slider-container" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
        <button className="nav-arrow arrow-left" style={{ zIndex: 20, cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); prevSlide(); }}>
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <div className="slider-wrapper" style={{ display: 'flex', transform: `translateX(-${currentSlide * 100}%)`, transition: 'transform 0.6s ease-in-out' }}>
          {banners.map((item, i) => (
            <div key={i} className="slide" style={{ minWidth: '100%', flexShrink: 0 }}>
              <img src={item.img} alt={`Banner ${i + 1}`} style={{ width: '100%' }} />
              {item.showText && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                  className="headline-overlay" 
                  style={{ background: 'transparent' }}
                >
                  <h1 className="headline-text" style={{ fontSize: isMobile ? '20px' : '38px' }}>{item.headline}</h1>
                </motion.div>
              )}
            </div>
          ))}
        </div>
        <button className="nav-arrow arrow-right" style={{ zIndex: 20, cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); nextSlide(); }}>
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </section>

      <motion.section 
        className="services-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{ visible: { transition: { staggerChildren: 0 } } }}
      >
        <div className="services-wrapper">
          <div className="services-grid">
            <motion.div variants={fadeInVariant} className="card">
              <div className="icon"><i className="fa-solid fa-calendar-days"></i></div>
              <h3>Jadwal Kunjungan</h3>
              <p>Lihat jam operasional kunjungan WBP</p>
              <Link href="/JadwalKunjungan" className="btn">Lihat Jadwal</Link>
            </motion.div>
            <motion.div variants={fadeInVariant} className="card">
              <div className="icon"><i className="fa-solid fa-file-lines"></i></div>
              <h3>Syarat & Ketentuan</h3>
              <p>Prosedur dan ketentuan kunjungan</p>
              <Link href="/SyaratKetentuan" className="btn">Baca Detail</Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.div 
        className="announcement-bar"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInVariant}
      >
        <div className="announcement-label">Berita Terkini </div>
        <div className="announcement-content" style={{ overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
          <motion.div 
            className="running-text"
            animate={{ x: ["100%", "-100%"] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            style={{ whiteSpace: 'nowrap', position: 'relative', width: 'max-content' }}
          >
            Selamat Datang di Website Resmi Rutan Kelas II B Sinjai - Pantau terus jadwal kunjungan dan informasi terbaru di sini.
          </motion.div>
        </div>
      </motion.div>

      <motion.section 
        className="latest-news-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInVariant}
      >
        <div className="container">
          <div className="news-slider-wrapper" style={{ position: 'relative' }}>
            <button className="slide-arrow prev" onClick={prevNews} style={{ zIndex: 10 }}><i className="fa-solid fa-chevron-left"></i></button>
            <div className="news-viewport" style={{ overflow: 'hidden', width: '100%' }}>
              <div className="news-track" style={{ 
                display: 'flex', 
                transition: 'transform 0.5s ease-in-out', 
                transform: `translateX(-${newsIndex * (isMobile ? 100 : 33.333)}%)` 
              }}>
                {extendedNews.map((item, index) => (
                  <Link 
                    href={`/berita/${item.id}`} 
                    key={index} 
                    className="news-item-link" 
                    style={{ 
                      flexGrow: 0,
                      flexShrink: 0,
                      flexBasis: isMobile ? '100%' : '33.333%', 
                      paddingLeft: '10px',
                      paddingRight: '10px', 
                      boxSizing: 'border-box' 
                    }}
                  >
                    <div className="news-card-v2">
                      <div className="news-thumb">
                        <img src={item.img} alt="Berita" style={{ width: '100%', display: 'block' }} />
                      </div>
                      <div className="news-content-v2">
                        <span className="badge-berita">Beritaa Utama</span>
                        <h3 className="news-title-v2">{item.headline}</h3>
                        <p className="news-date-v2">
                          By Humas Rutan Sinjai  |  {item.meta.includes('|') ? item.meta.split('|')[1]?.trim() : item.meta}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <button className="slide-arrow next" onClick={nextNews} style={{ zIndex: 10 }}><i className="fa-solid fa-chevron-right"></i></button>
          </div>
        </div>
      </motion.section>

      <section className="wbp-info-section" style={{ width: '100%', paddingTop: '80px', paddingBottom: '80px', backgroundColor: '#F8FAFC' }}>
        <div className="container-wbp" style={{ maxWidth: '1150px', marginLeft: 'auto', marginRight: 'auto', paddingLeft: '20px', paddingRight: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1.3fr', gap: '40px', alignItems: 'center' }}>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariant}
              style={{ textAlign: 'center' }}
            >
              <h2 style={{ color: '#093661', fontWeight: '700', fontSize: isMobile ? '28px' : '40px', lineHeight: '1.2', marginTop: '0', marginBottom: '15px' }}>
                Data Pelayanan
              </h2>
              <p style={{ color: '#64748b', fontSize: '15px', lineHeight: '1.3', marginTop: '0', marginBottom: '25px', marginLeft: 'auto', marginRight: 'auto', maxWidth: '450px' }}>
                Informasi jumlah penghuni Rumah Tahanan Negara Kelas II B Sinjai yang diperbarui secara berkala untuk transparansi publik.
              </p>
              
              <div>
                <div style={{ color: '#ebbc00', fontSize: '100px', fontWeight: '700', lineHeight: '1' }}>{countPenghuni}</div>
                <div style={{ color: '#64748b', fontSize: '18px', fontWeight: '600', marginTop: '10px', textTransform: 'none' }}>Total Penghuni Saat Ini</div>
              </div>
            </motion.div>

            <motion.div 
              className="wbp-search-container" 
              style={{ backgroundColor: '#ffffff', paddingTop: isMobile ? '30px' : '45px', paddingBottom: isMobile ? '30px' : '45px', paddingLeft: isMobile ? '20px' : '45px', paddingRight: isMobile ? '20px' : '45px', borderRadius: '28px', boxShadow: '0 10px 40px rgba(0,0,0,0.04)', borderStyle: 'solid', borderWidth: '1px', borderColor: '#f1f5f9' }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariant}
            >
              <h3 style={{ color: '#093661', fontSize: '30px', fontWeight: '760', marginTop: '0', marginBottom: '10px' }}>Cari Data WBP</h3>
              <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '0', marginBottom: '30px' }}>Gunakan fitur pencarian di bawah untuk menemukan lokasi atau status warga binaan.</p>
              
              <div style={{ position: 'relative', width: '100%' }}>
                <i className="fa-solid fa-magnifying-glass" style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}></i>
                <input 
                  type="text" 
                  style={{ width: '100%', paddingTop: '16px', paddingBottom: '16px', paddingLeft: '55px', paddingRight: '20px', borderStyle: 'solid', borderWidth: '2px', borderColor: '#f1f5f9', backgroundColor: '#f8fafc', borderRadius: '14px', outline: 'none', fontSize: '16px', color: '#1e293b', boxSizing: 'border-box' }}
                  placeholder="Ketik nama warga binaan..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              
              <motion.button 
                type="button" 
                style={{ width: '100%', marginTop: '20px', backgroundColor: '#093661', color: 'white', border: 'none', paddingTop: '16px', paddingBottom: '16px', fontSize: '16px', borderRadius: '14px', cursor: 'pointer', fontWeight: '700' }}
                whileHover={{ backgroundColor: '#0c467e', y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSearch} 
              >
                Mulai Pencarian
              </motion.button>
              

            </motion.div>

          </div>
        </div>
      </section>
    </main>
  );
}