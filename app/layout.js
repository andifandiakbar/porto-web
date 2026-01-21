"use client";

import { useState, useEffect } from 'react';
import "./globals.css";

export default function RootLayout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      const mobileStatus = window.innerWidth < 768;
      setIsMobile(mobileStatus);
      if (!mobileStatus) {
        setIsMenuOpen(false);
        setActiveSubMenu(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleItemClick = (id, href) => {
    setActiveItem(id); 
    setTimeout(() => {
      setIsMenuOpen(false);
      setActiveItem(null);
      window.location.href = href;
    }, 250); 
  };

  return (
    <html lang="id">
      <head>
        <title>Rutan Sinjai Kelas IIB</title>
        <meta name="description" content="Website Resmi Rumah Tahanan Negara Kelas IIB Sinjai" />
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" 
        />
      </head>
      <body>
        <main className="main-wrapper">
          <div className="topbar">
            <div className="container topbar-flex">
              <div className="topbar-social">
                <a href="https://www.instagram.com/rutansinjai" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-instagram"></i></a>
                <a href="https://www.tiktok.com/@rutansinjai" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-tiktok"></i></a>
                <a href="#"><i className="fa-brands fa-facebook"></i></a>
                <a href="#"><i className="fa-brands fa-youtube"></i></a>
              </div>
              <div className="topbar-info">
                <span><i className="fa-solid fa-phone"></i> 0724-7333024</span>
                <span><i className="fa-brands fa-whatsapp"></i> +628714409435</span>
                {!isMobile && <span><i className="fa-solid fa-envelope"></i> rutan.sinjai@kemenkumham.go.id</span>}
              </div>
            </div>
          </div>

          <nav className="navbar">
            <div className="container nav-flex">
              <div className="logo">
                <img src="/assets/logo.png" alt="Logo Rutan" />
                <span>Rutan Sinjai<br /><small style={{ fontWeight: 'normal' }}>Kelas IIB</small></span>
              </div>

              <div className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <i className={isMenuOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"}></i>
              </div>

              <ul className={`menu ${isMenuOpen ? 'active' : ''}`}>
                <li><a href="/"><i className="fa-solid fa-house"></i>Beranda</a></li>
                <li><a href="#"><i className="fa-solid fa-user"></i> Profil</a></li>
                <li><a href="#"><i className="fa-solid fa-image"></i> Media</a></li>
                <li className="dropdown">
                  <a href="#"><i className="fa-solid fa-circle-info"></i> Layanan</a>
                  <ul className="dropdown-menu">
                    <li><a href="/Layanan">Informasi Layanan</a></li>
                    <li><a href="#">Administrasi</a></li>
                    <li><a href="#">Pusat Terpadu (PTSP)</a></li>
                  </ul>
                </li>
                <li><a href="/Pengaduan"><i className="fa-solid fa-headset"></i> Pengaduan</a></li>
              </ul>
            </div>
          </nav>

          {isMenuOpen && isMobile && (
            <div className="mobile-menu-overlay" onClick={() => setIsMenuOpen(false)}>
              <div className="mobile-menu-modal" onClick={(e) => e.stopPropagation()}>
                <div className="mobile-menu-header">
                  <i className="fa-solid fa-xmark close-icon" onClick={() => setIsMenuOpen(false)}></i>
                </div>
                <ul className="mobile-menu-list">
                  <li><a href="/">Beranda</a></li>
                  <li><a href="#">Profil</a></li>
                  <li><a href="#">Media</a></li>
                  
                  <li className={`mobile-dropdown ${activeSubMenu ? 'active-parent-blue' : ''}`}>
                    <a href="#" onClick={(e) => { e.preventDefault(); setActiveSubMenu(!activeSubMenu); }}>
                      Layanan 
                      <i className={`fa-solid fa-chevron-${activeSubMenu ? 'up' : 'down'}`} style={{float: 'right', fontSize: '14px', marginTop: '5px'}}></i>
                    </a>
                    
                    {activeSubMenu && (
                      <ul className="mobile-submenu">
                        <li className={activeItem === 'info' ? 'active-item-blue' : ''}>
                          <a href="#" onClick={(e) => { e.preventDefault(); handleItemClick('info', '/Layanan'); }}>
                            Informasi Layanan
                          </a>
                        </li>
                        <li className={activeItem === 'admin' ? 'active-item-blue' : ''}>
                          <a href="#" onClick={(e) => { e.preventDefault(); handleItemClick('admin', '#'); }}>
                            Administrasi
                          </a>
                        </li>
                        <li className={activeItem === 'ptsp' ? 'active-item-blue' : ''}>
                          <a href="#" onClick={(e) => { e.preventDefault(); handleItemClick('ptsp', '#'); }}>
                            Pusat Terpadu (PTSP)
                          </a>
                        </li>
                      </ul>
                    )}
                  </li>
                  
                  <li><a href="/Pengaduan">Pengaduan</a></li>
                </ul>
              </div>
            </div>
          )}

          {children}

          <footer className="main-footer">
            <div className="container">
              <div className="footer-grid">
                <div className="footer-col">
                  <div className="footer-logo">
                    <img src="/assets/logo.png" alt="logo" />
                  </div>
                  <div className="footer-info">
                    <p>Kementerian Imigrasi Dan</p>
                    <p>Pemasyarakatan Kanwil</p>
                    <p>Direktorat Jenderal</p>
                    <p>Pemasyarakatan Sulsel</p>
                    <p>Rumah Tahanan Negara Kelas</p>
                    <p>IIB Sinjai</p>
                  </div>
                </div>

                <div className="footer-col">
                  <h4>Instansi Terkait</h4>
                  <ul>
                    <li><a href="#">Ditjen Pemasyarakatan</a></li>
                    <li><a href="#">Kepolisian RI</a></li>
                    <li><a href="#">Kejaksaan RI</a></li>
                    <li><a href="#">Mahkamah Agung RI</a></li>
                    <li><a href="#">Peradi</a></li>
                  </ul>
                </div>

                <div className="footer-col">
                  <h4>Profil Unit Pelaksana Teknis</h4>
                  <ul>
                    <li><a href="#">Sejarah Pemasyarakatan</a></li>
                    <li><a href="#">Selayang Pandang Satuan Kerja</a></li>
                    <li><a href="#">Kedudukan Tugas dan Fungsi</a></li>
                    <li><a href="#">Visi Misi dan Tata Nilai</a></li>
                    <li><a href="#">Mars Pemasyarakatan</a></li>
                  </ul>
                </div>
                
                <div className="footer-col">
                  <div className="footer-map-container" style={{ position: 'relative' }}>
                    <iframe 
                      id="google-map"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.1158525046294!2d120.2525164!3d-5.1172828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dbe25d7be14bb21%3A0x1df1482e91046273!2sRumah%20Tahanan%20Negara%20Kelas%20IIB%20Sinjai!5e0!3m2!1sid!2sid!4v1705220000000!5m2!1sid!2sid" 
                      width="100%" 
                      height="200" 
                      style={{ border: 0, borderRadius: "0px" }} 
                      allowFullScreen="" 
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                    <div className="map-controls" style={{ pointerEvents: 'none' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </main>
      </body>
    </html>
  );
}
