"use client";

import React, { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeSubMenu, setActiveSubMenu] = useState<boolean>(false);
  const [activeMediaMenu, setActiveMediaMenu] = useState<boolean>(false); 
  const [activeTentangMenu, setActiveTentangMenu] = useState<boolean>(false);

  return (
    <div className="navbar-wrapper">
      <div className="topbar">
        <div className="container topbar-flex">
          <div className="topbar-social">
            <a href="https://www.instagram.com/rutansinjai" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-instagram"></i></a>
            <a href="https://www.tiktok.com/@rutansinjai" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-tiktok"></i></a>
            <a href="https://www.facebook.com/share/1E2nTFHBkA/" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-facebook"></i></a>
            <a href="https://youtube.com/@rutansinjai3762?si=iec3-i3r6VG8yG3D" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-youtube"></i></a>
          </div>
          <div className="topbar-info">
            <a href="https://wa.me/6281356640175" target="_blank" rel="noopener noreferrer" className="info-item"><i className="fa-brands fa-whatsapp"></i> +62 851-6768-7099</a>
            <a href="mailto:rutanIIBsinjai@email.go.id" className="info-item"><i className="fa-solid fa-envelope"></i> Sinjairutan@yahoo.co.id</a>
          </div>
        </div>
      </div>

      <nav className="navbar">
        <div className="container nav-flex">
          <div className="logo" style={{ cursor: 'pointer' }} onClick={() => window.location.href = '/'}>
            <img src="/assets/logo.png" alt="Logo Rutan" style={{ objectFit: 'contain', flexShrink: 0 }} />
            <span>Rutan<br /><small style={{ fontWeight: 'normal' }}>Kelas IIB Sinjai</small></span>
          </div>

          <div className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <i className={isMenuOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"}></i>
          </div>

          <ul className={`menu ${isMenuOpen ? 'active' : ''}`}>
            <li><a href="/"><i className="fa-solid fa-house"></i>Beranda</a></li>
            <li className="dropdown">
              <a href="#" onClick={(e) => e.preventDefault()}><i className="fa-solid fa-user"></i>Tentang</a>
              <ul className="dropdown-menu">
                <li><a href="/Instansi/Sejarah-Pemasyarakatan">Sejarah Pemasyarakatan</a></li>
                <li><a href="/Instansi/Visi-Misi">Visi Misi</a></li>
                <li><a href="/Instansi/Kedudukan-Tugas-dan-Fungsi">Kedudukan Tugas dan Fungsi</a></li>
                <li><a href="/Instansi/Mars-Keminipas">Mars Keminipas</a></li>
                <li><a href="/Instansi/Profil-Pejabat">Profil Pejabat</a></li>
              </ul>
            </li>
            <li className="dropdown">
              <a href="#" onClick={(e) => e.preventDefault()}><i className="fa-solid fa-image"></i>Media</a>
              <ul className="dropdown-menu">
                <li><a href="/media/karya">Karya Binaan</a></li>
                <li><a href="/media/galeri-foto">Galeri Foto</a></li>
                <li><a href="/media/video-kegiatan">Video Kegiatan</a></li>
              </ul>
            </li>
            <li className="dropdown">
              <a href="#" onClick={(e) => e.preventDefault()}><i className="fa-solid fa-circle-info"></i>Informasi Publik</a>
              <ul className="dropdown-menu">
                <li><a href="/Layanan/informasi-layanan">Informasi Layanan</a></li>
                <li><a href="/Layanan/survei">Survei</a></li>
                <li><a href="/Layanan/pengaduan">Pengaduan</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setIsMenuOpen(false)}>
          <div className="mobile-menu-modal" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <i className="fa-solid fa-xmark close-icon" onClick={() => setIsMenuOpen(false)}></i>
            </div>
            <ul className="mobile-menu-list">
              <li><a href="/">Beranda</a></li>
              <li className={`mobile-dropdown ${activeTentangMenu ? 'active-parent-blue' : ''}`}>
                <a href="#" onClick={(e) => { e.preventDefault(); setActiveTentangMenu(!activeTentangMenu); }}>
                  Tentang
                  <i className={`fa-solid fa-chevron-${activeTentangMenu ? 'up' : 'down'}`} style={{float: 'right', fontSize: '14px', marginTop: '5px'}}></i>
                </a>
                {activeTentangMenu && (
                  <ul className="mobile-submenu">
                    <li><a href="/Instansi/Sejarah-Pemasyarakatan">Sejarah Pemasyarakatan</a></li>
                    <li><a href="/Instansi/Kedudukan-Tugas-dan-Fungsi">Kedudukan Tugas dan Fungsi</a></li>
                    <li><a href="/Instansi/Visi-Misi">Visi Misi</a></li>
                    <li><a href="/Instansi/Mars-Keminipas">Mars Keminipas</a></li>
                    <li><a href="/Instansi/Profil-Pejabat">Profil Pejabat</a></li>
                  </ul>
                )}
              </li>
              <li className={`mobile-dropdown ${activeMediaMenu ? 'active-parent-blue' : ''}`}>
                <a href="#" onClick={(e) => { e.preventDefault(); setActiveMediaMenu(!activeMediaMenu); }}>
                  Media
                  <i className={`fa-solid fa-chevron-${activeMediaMenu ? 'up' : 'down'}`} style={{float: 'right', fontSize: '14px', marginTop: '5px'}}></i>
                </a>
                {activeMediaMenu && (
                  <ul className="mobile-submenu">
                    <li><a href="/media/karya">Karya Binaan</a></li>
                    <li><a href="/media/galeri-foto">Galeri Foto</a></li>
                    <li><a href="/media/video-kegiatan">Video Kegiatan</a></li>
                  </ul>
                )}
              </li>
              <li className={`mobile-dropdown ${activeSubMenu ? 'active-parent-blue' : ''}`}>
                <a href="#" onClick={(e) => { e.preventDefault(); setActiveSubMenu(!activeSubMenu); }}>
                  Informasi Publik 
                  <i className={`fa-solid fa-chevron-${activeSubMenu ? 'up' : 'down'}`} style={{float: 'right', fontSize: '14px', marginTop: '5px'}}></i>
                </a>
                {activeSubMenu && (
                  <ul className="mobile-submenu">
                    <li><a href="/Layanan/informasi-layanan">Informasi Layanan</a></li>
                    <li><a href="/Layanan/pengaduan">Pengaduan</a></li>
                    <li><a href="/Layanan/survei">Survei</a></li>
                  </ul>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}

      <style jsx global>{`
        html, body {
          margin: 0;
          padding: 0;
          overscroll-behavior-y: none;
        }
        .navbar-wrapper {
          position: sticky;
          top: 0;
          z-index: 1000;
          overscroll-behavior-y: none;
          margin-top: -10;
          padding-top: 0;
        }
      `}</style>
    </div>
  );
}