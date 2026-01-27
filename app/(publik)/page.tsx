"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import Link from 'next/link';
import { supabase } from '../../lib/supabase';

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

interface WBP {
  id: number;
  nama: string;
  nik: string;
  kasus: string;
  status: string;
  blok_kamar: string;
}

export default function LamanPublikRutan() {
  const router = useRouter(); 
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [countPenghuni, setCountPenghuni] = useState<number>(1);
  const [countKunjungan, setCountKunjungan] = useState<number>(1);
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
      if (count) setCountPenghuni(count);
    };

    fetchBeritaOnline();
    fetchWBPCount();
  }, []);

  const combinedNews = newsFromCMS.length > 0 ? newsFromCMS : newsDataDefault;
  const extendedNews = combinedNews.length >= 4 ? [...combinedNews] : [...combinedNews, ...newsDataDefault, ...newsDataDefault, ...newsDataDefault].slice(0, 8);

  const nextSlide = () => setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? banners.length - 1 : prev - 1));

  const nextNews = () => {
    if (newsIndex < extendedNews.length - (isMobile ? 1 : 4)) setNewsIndex(prev => prev + 1);
    else setNewsIndex(0);
  };

  const prevNews = () => {
    if (newsIndex > 0) setNewsIndex(prev => prev - 1);
    else setNewsIndex(extendedNews.length - (isMobile ? 1 : 4));
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
      interval = setInterval(() => nextSlide(), 3000);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [isPaused, currentSlide]);

  useEffect(() => {
    if (countKunjungan < 110) {
      const timer = setTimeout(() => setCountKunjungan(prev => prev + 1), 10);
      return () => clearTimeout(timer);
    }
  }, [countKunjungan]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);   
  
  return (
    <main className="main-wrapper" style={{ fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />

      <section className="slider-container" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
        <button className="nav-arrow arrow-left" onClick={(e) => { e.stopPropagation(); prevSlide(); }}>
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <div className="slider-wrapper" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {banners.map((item, i) => (
            <div key={i} className="slide">
              <img src={item.img} alt={`Banner ${i + 1}`} />
              {item.showText && (
                <div className="headline-overlay">
                  <h1 className="headline-text" style={{ fontSize: isMobile ? '20px' : '38px' }}>{item.headline}</h1>
                </div>
              )}
            </div>
          ))}
        </div>
        <button className="nav-arrow arrow-right" onClick={(e) => { e.stopPropagation(); nextSlide(); }}>
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </section>

      <section className="services-section">
        <div className="services-wrapper">
          <div className="services-grid">
            <div className="card">
              <div className="icon"><i className="fa-solid fa-calendar-days"></i></div>
              <h3>Jadwal Kunjungan</h3>
              <p>Lihat jam operasional kunjungan WBP</p>
              <a href="/JadwalKunjungan" className="btn">Lihat Jadwal</a>
            </div>
            <div className="card">
              <div className="icon"><i className="fa-solid fa-clipboard-list"></i></div>
              <h3>Sistem Antrian</h3>
              <p>Pendaftaran antrian kunjungan online</p>
              <a href="https://docs.google.com/forms/..." className="btn">Daftar Sekarang</a>
            </div>
            <div className="card">
              <div className="icon"><i className="fa-solid fa-file-lines"></i></div>
              <h3>Syarat & Ketentuan</h3>
              <p>Prosedur dan ketentuan kunjungan</p>
              <a href="/SyaratKetentuan" className="btn">Baca Detail</a>
            </div>
          </div>
        </div>
      </section>

      <div className="announcement-bar">
        <div className="announcement-label">Berita Terkini </div>
        <div className="announcement-content">
          <div className="running-text">
            Selamat Datang di Website Resmi Rutan Kelas II B Sinjai - Pantau terus jadwal kunjungan dan informasi terbaru di sini.
          </div>
        </div>
      </div>

      <section className="latest-news-section">
        <div className="container">
          <div className="news-slider-wrapper">
            <button className="slide-arrow prev" onClick={prevNews}><i className="fa-solid fa-chevron-left"></i></button>
            <div className="news-viewport" style={{ overflow: 'hidden', width: '100%' }}>
              <div className="news-track" style={{ display: 'flex', transition: 'transform 0.5s ease', transform: `translateX(-${newsIndex * (100 / (isMobile ? 1 : 4))}%)` }}>
                {extendedNews.map((item, index) => (
                  <Link href={`/berita/${item.id}`} key={index} style={{ textDecoration: 'none', minWidth: isMobile ? '100%' : '25%', padding: '0 10px' }}>
                    <div className="news-card-v2" style={{ cursor: 'pointer' }}>
                      <div className="news-thumb"><img src={item.img} alt="Berita" style={{ width: '100%' }} /></div>
                      <div className="news-content-v2">
                        <p className="news-date-v2">{item.meta.split('|')[1]?.trim()}</p>
                        <h3 className="news-title-v2">{item.headline.toLowerCase()}</h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <button className="slide-arrow next" onClick={nextNews}><i className="fa-solid fa-chevron-right"></i></button>
          </div>
        </div>
      </section>

      <section className="wbp-info-section" style={{ width: '100%', padding: '40px 0' }}>
        <div className="container-wbp" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div className="wbp-header-text">
            <h2 style={{ color: '#093661', fontWeight: 'bold' }}>RUTAN KELAS IIB SINJAI</h2>
            <p style={{ color: '#555' }}>SISTEM INFORMASI DATA WARGA BINAAN</p>
          </div>
          
          <div className="wbp-stats-grid">
            <div className="wbp-stat-card" style={{ backgroundColor: '#093661' }}>
              <div className="stat-number" style={{ color: '#ffc107' }}>{countPenghuni}</div>
              <div className="stat-label" style={{ color: '#fff' }}>TOTAL PENGHUNI SAAT INI</div>
            </div>
            <div className="wbp-stat-card" style={{ backgroundColor: '#093661' }}>
              <div className="stat-number" style={{ color: '#ffc107' }}>{countKunjungan}</div>
              <div className="stat-label" style={{ color: '#fff' }}>KUNJUNGAN BULAN INI</div>
            </div>
          </div>
          
          <div className="wbp-search-container" style={{ backgroundColor: '#FAFBFF', padding: '40px', borderRadius: '12px', width: '100%', boxSizing: 'border-box' }}>
            <div className="search-header-btn" style={{ backgroundColor: '#093661', color: 'white', padding: '18px', borderRadius: '8px', fontSize: isMobile ? '18px' : '24px', fontWeight: '600', marginBottom: '25px', width: '100%', textAlign: 'center', boxSizing: 'border-box' }}>
              Silahkan Cari Nama WBP yang akan dikunjungi
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <input 
                type="text" 
                style={{ width: '100%', padding: '9px', border: '2px solid #e0e0e0', borderRadius: '4px', outline: 'none', textAlign: 'center', fontSize: '16px' }}
                placeholder="Masukkan nama wbp..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <div style={{ marginTop: '15px' }}>
                <button 
                  type="button" 
                  style={{ backgroundColor: '#238b59', color: 'white', border: 'none', padding: '10px 60px', fontSize: '18px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', outline: 'none', boxShadow: '0 4px 6px rgba(35, 139, 89, 0.2)' }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.transform = 'scale(0.95)';
                    e.currentTarget.style.backgroundColor = '#1a6a44';
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.backgroundColor = '#238b59';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.backgroundColor = '#238b59';
                  }}
                  onClick={handleSearch} 
                >
                  Cari
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}