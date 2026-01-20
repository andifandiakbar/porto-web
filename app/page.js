"use client";
import { useState, useEffect } from 'react';

export default function NamaKomponenAnda() {
  const [activeFilter, setActiveFilter] = useState('berita');
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [countPenghuni, setCountPenghuni] = useState(1);
  const [countKunjungan, setCountKunjungan] = useState(1);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [newsIndex, setNewsIndex] = useState(0);

  const banners = [
    {
      img: '/assets/Banner.png',
      headline: "SELAMAT DATANG DI LAMAN RESMI RUMAH TAHANAN NEGARA KELAS II B KABUPATEN SINJAI",
      showText: true
    },
    { img: '/assets/Banner2.png', showText: false },
    { img: '/assets/Banner3.png', showText: false }
  ];

  const newsData = [
    {
      img: '/assets/berita1.png',
      headline: 'GANDENG LBH BAKTI KEADILAN, RUTAN SINJAI FASILITASI TAHANAN DAPATKAN BANTUAN HUKUM',
      meta: 'Rutan Kelas IIB Sinjai | Oct 7, 2024'
    },
    {
      img: '/assets/berita2.png',
      headline: 'RUTAN SINJAI GELAR PEMBINAAN KEMANDIRIAN BAGI WARGA BINAAN',
      meta: 'Rutan Kelas IIB Sinjai | Oct 10, 2024'
    }
  ];

  const extendedNews = [...newsData, ...newsData, ...newsData, ...newsData].slice(0, 8);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const nextNews = () => {
    if (newsIndex < extendedNews.length - 4) {
      setNewsIndex(prev => prev + 1);
    } else {
      setNewsIndex(0);
    }
  };

  const prevNews = () => {
    if (newsIndex > 0) {
      setNewsIndex(prev => prev - 1);
    } else {
      setNewsIndex(extendedNews.length - 4);
    }
  };

  useEffect(() => {
    if (countPenghuni < 40) {
      const timer = setTimeout(() => setCountPenghuni(prev => prev + 1), 30);
      return () => clearTimeout(timer);
    }
  }, [countPenghuni]);

  useEffect(() => {
    if (countKunjungan < 110) {
      const timer = setTimeout(() => setCountKunjungan(prev => prev + 1), 10);
      return () => clearTimeout(timer);
    }
  }, [countKunjungan]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);  
  
  return (
    <main className="main-wrapper">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />

      <section
        className="slider-container"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <button className="nav-arrow arrow-left" onClick={prevSlide}>
          <i className="fa-solid fa-chevron-left"></i>
        </button>

        <div className="slider-wrapper" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {banners.map((item, i) => (
            <div key={i} className="slide">
              <img src={item.img} alt={`Banner Rutan Sinjai ${i + 1}`} />
              {item.showText && (
                <div className="headline-overlay">
                  <h1 className="headline-text" style={{ fontSize: isMobile ? '20px' : '38px' }}>
                    {item.headline}
                  </h1>
                </div>
              )}
            </div>
          ))}
        </div>

        <button className="nav-arrow arrow-right" onClick={nextSlide}>
          <i className="fa-solid fa-chevron-right"></i>
        </button>

        <div className="dots-container">
          {banners.map((_, i) => (
            <div
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`dot ${currentSlide === i ? 'active' : 'inactive'}`}
            ></div>
          ))}
        </div>
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
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSctP_AqsA1_CMpp0LQpqjCKCRaRAAre0mi2C_gnERtZdQlB5g/viewform" className="btn">Daftar Sekarang</a>
            </div>

            <div className="card">
              <div className="icon">
                <i className="fa-solid fa-file-lines"></i>
              </div>
              <h3>Syarat & Ketentuan</h3>
              <p>Prosedur dan ketentuan kunjungan</p>
              <a href="/SyaratKetentuan" className="btn">
                Baca Detail
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="announcement-bar">
        <div className="announcement-label">Berita Terbaru </div>
        <div className="announcement-content">
          <div className="running-text">
            Selamat Datang di Website Resmi Rutan Kelas II B Sinjai - Pantau terus jadwal kunjungan dan informasi terbaru di sini.
          </div>
        </div>
        <div className="announcement-nav">
          <i className="fa-solid fa-chevron-left"></i>
          <i className="fa-solid fa-chevron-right"></i>
        </div>
      </div>

      <section className="latest-news-section">
        <div className="container">
          <div className="news-slider-wrapper">
            <button className="slide-arrow prev" onClick={prevNews}><i className="fa-solid fa-chevron-left"></i></button>

            <div className="news-viewport" style={{ overflow: 'hidden', width: '100%' }}>
              <div
                className="news-track"
                style={{
                  display: 'flex',
                  transition: 'transform 0.5s ease-in-out',
                  transform: `translateX(-${newsIndex * (100 / (isMobile ? 1 : 4))}%)`
                }}
              >
                {extendedNews.map((item, index) => (
                  <div
                    key={index}
                    className="news-card-v2"
                    style={{
                      minWidth: isMobile ? '100%' : '25%',
                      padding: '0 10px',
                      boxSizing: 'border-box'
                    }}
                  >
                    <div className="news-thumb">
                      <img src={item.img} alt="Berita" style={{ width: '100%' }} />
                    </div>
                    <div className="news-content-v2">
                      <p className="news-date-v2">{item.meta.split('|')[1]?.trim() || "Oct 7, 2024"}</p>
                      <a href="#" className="news-title-link">
                        <h3 className="news-title-v2">{item.headline.toLowerCase()}</h3>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button className="slide-arrow next" onClick={nextNews}><i className="fa-solid fa-chevron-right"></i></button>
          </div>

          <div className="view-more-container">
            <button className="btn-view-more">Lihat Lebih Lengkap</button>
          </div>
        </div>
      </section>

      <section className="wbp-info-section">
        <div className="container-wbp">
          <div className="wbp-header-text">
            <h2>RUTAN KELAS IIB SINJAI</h2>
            <p>SISTEM INFORMASI DATA WARGA BINAAN</p>
          </div>
          <div className="wbp-stats-grid">
            <div className="wbp-stat-card">
              <div className="stat-number">{countPenghuni}</div>
              <div className="stat-label">TOTAL PENGHUNI SAAT INI</div>
            </div>
            <div className="wbp-stat-card">
              <div className="stat-number">{countKunjungan}</div>
              <div className="stat-label">KUNJUNGAN BULAN INI</div>
            </div>
          </div>
          <div className="wbp-search-container">
            <p>Silahkan Cari Nama WBP yang akan dikunjungi</p>
            <div className="search-box">
              <input type="text" placeholder="Masukkan nama..." id="inputNama" />
              <button type="button" className="btn-cari" onClick={() => alert('Fitur pencarian sedang disiapkan')}>Cari</button>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}