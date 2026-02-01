"use client";

import React, { useState, useEffect, ReactNode } from 'react';

import "./desktop.css"; 
import "./mobile.css";

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [activeSubMenu, setActiveSubMenu] = useState<boolean>(false);
  const [activeMediaMenu, setActiveMediaMenu] = useState<boolean>(false); 
  const [activeItem, setActiveItem] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const mobileStatus = window.innerWidth < 768;
      setIsMobile(mobileStatus);
      if (!mobileStatus) {
        setIsMenuOpen(false);
        setActiveSubMenu(false);
        setActiveMediaMenu(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleItemClick = (id: string, href: string) => {
    setActiveItem(id); 
    setTimeout(() => {
      setIsMenuOpen(false);
      setActiveItem(null);
      window.location.href = href;
    }, 250); 
  };

  return (
    <div className="layout-wrapper">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
        
        <main className="main-wrapper">
          <div className="topbar">
            <div className="container topbar-flex">
              <div className="topbar-social">
                <a href="https://www.instagram.com/rutansinjai" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-instagram"></i></a>
                <a href="https://www.tiktok.com/@rutansinjai" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-tiktok"></i></a>
                <a href="https://www.facebook.com/share/1E2nTFHBkA/" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-facebook"></i></a>
                <a href="https://youtube.com/@rutansinjai3762?si=iec3-i3r6VG8yG3D" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-youtube"></i></a>
              </div>
              <div className="topbar-info">
                <a href="tel:07247333024" className="info-item"><i className="fa-solid fa-phone"></i> 048222188</a>
                <a href="https://wa.me/6281356640175" target="_blank" rel="noopener noreferrer" className="info-item"><i className="fa-brands fa-whatsapp"></i> +6281356640175</a>
                <a href="mailto:rutanIIBsinjai@email.go.id" className="info-item"><i className="fa-solid fa-envelope"></i> rutan.kelas-IIB.sinjai@email.go.id</a>
              </div>
            </div>
          </div>

          <nav className="navbar">
            <div className="container nav-flex">
              <div className="logo" style={{ cursor: 'pointer' }} onClick={() => window.location.href = '/'}>
                <img 
                  src="/assets/logo.png" 
                  alt="Logo Rutan" 
                  style={{ 
                    objectFit: 'contain',
                    flexShrink: 0
                  }} 
                />
                <span>Rutan Sinjai<br /><small style={{ fontWeight: 'normal' }}>Kelas IIB</small></span>
              </div>

              <div className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <i className={isMenuOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"}></i>
              </div>

              <ul className={`menu ${isMenuOpen ? 'active' : ''}`}>
                <li><a href="/"><i className="fa-solid fa-house"></i>Beranda</a></li>
                <li><a href="#"><i className="fa-solid fa-user"></i> Profil</a></li>
                <li className="dropdown">
                  <a href="#"><i className="fa-solid fa-image"></i> Media</a>
                  <ul className="dropdown-menu">
                    <li><a href="/karya">Karya Binaan</a></li>
                    <li><a href="#">Galeri Foto</a></li>
                    <li><a href="#">Video Kegiatan</a></li>
                  </ul>
                </li>
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

                  <li className={`mobile-dropdown ${activeMediaMenu ? 'active-parent-blue' : ''}`}>
                    <a href="#" onClick={(e) => { e.preventDefault(); setActiveMediaMenu(!activeMediaMenu); }}>
                      Media
                      <i className={`fa-solid fa-chevron-${activeMediaMenu ? 'up' : 'down'}`} style={{float: 'right', fontSize: '14px', marginTop: '5px'}}></i>
                    </a>
                    {activeMediaMenu && (
                      <ul className="mobile-submenu">
                        <li><a href="#" onClick={(e) => { e.preventDefault(); handleItemClick('karya', '/karya'); }}>Karya Binaan</a></li>
                        <li><a href="#" onClick={(e) => { e.preventDefault(); handleItemClick('foto', '#'); }}>Galeri Foto</a></li>
                        <li><a href="#" onClick={(e) => { e.preventDefault(); handleItemClick('video', '#'); }}>Video Kegiatan</a></li>
                      </ul>
                    )}
                  </li>
                  
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
                    <img 
                      src="/assets/logo.png" 
                      alt="logo" 
                      style={{ 
                        objectFit: 'contain'
                      }} 
                    />
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
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.115810052989!2d120.25043017589574!3d-5.12858525287739!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x302fbcd7be14bb21%3A0x1df1482e91046273!2sRumah%20Tahanan%20Negara%20Kelas%20IIB%20Sinjai!5e0!3m2!1sid!2sid!4v1716300000000!5m2!1sid!2sid" 
                      width="80%" 
                      height="209" 
                      style={{ border: 0 }}
                      allowFullScreen={true} 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade">
                    </iframe>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </main>
    </div>
  );
}