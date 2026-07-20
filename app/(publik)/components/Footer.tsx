"use client";

import React from 'react';

export default function Footer() {
  return (
    <>
      <style>{`
        @media (min-width: 768px) {
          .footer-col-informasi {
            margin-right: -40px;
          }
          .footer-col-kontak {
            margin-left: -40px;
          }
        }
        .footer-col-kontak span {
          cursor: default;
          pointer-events: none;
        }
      `}</style>

      <footer className="main-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <div className="footer-logo"><img src="/assets/logo.png" alt="logo" style={{ objectFit: 'contain' }} /></div>
              <div className="footer-info">
                <p>Kementerian Imigrasi Dan</p><p>Pemasyarakatan Kanwil</p><p>Direktorat Jenderal</p><p>Pemasyarakatan Sulsel</p><p>Rutan Kelas IIB Sinjai</p>
              </div>
            </div>
            <div className="footer-col footer-col-informasi">
              <h4 style={{ textTransform: 'capitalize' }}>Informasi</h4>
              <ul>
                <li><a href="/Layanan/informasi-layanan">Informasi Layanan</a></li>
                <li><a href="/Layanan/survei">Survei</a></li>
                <li><a href="/Layanan/pengaduan">Pengaduan</a></li>
              </ul>
            </div>
            <div className="footer-col footer-col-kontak">
              <h4 style={{ textTransform: 'capitalize' }}>Kontak</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '15px' }}>
                  <i className="fa-solid fa-location-dot" style={{ color: '#ebbc00', marginRight: '10px', marginTop: '4px', fontSize: '16px' }}></i>
                  <span style={{ color: '#e2e8f0', lineHeight: '1.5', display: 'inline-block' }}>
                    Jl. Teuku Umar No. 3, Biringere,<br />Sinjai Utara, Kab. Sinjai
                  </span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                  <i className="fa-solid fa-phone" style={{ color: '#ebbc00', marginRight: '10px', fontSize: '16px' }}></i>
                  <span style={{ color: '#e2e8f0' }}>
                    +62 851-6768-7099
                  </span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center' }}>
                  <i className="fa-solid fa-envelope" style={{ color: '#ebbc00', marginRight: '10px', fontSize: '16px' }}></i>
                  <span style={{ color: '#e2e8f0' }}>
                    Sinjairutan@yahoo.co.id
                  </span>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <div className="footer-map-container" style={{ position: 'relative' }}>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.7164998826763!2d120.25039377501066!3d-5.128683694848525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dbe25d7967ea149%3A0x95616f676330edc8!2sRutan%20Sinjai!5e0!3m2!1sid!2sid!4v1740983400000!5m2!1sid!2sid" width="100%" height="209" style={{ border: 0 }} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
              </div>
            </div>
          </div>
          <div className="footer-copyright" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '40px', paddingTop: '20px', textAlign: 'center', fontSize: '14px', opacity: 0.8 }}>
            <p>© 2026 Maganghub Kemnaker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}