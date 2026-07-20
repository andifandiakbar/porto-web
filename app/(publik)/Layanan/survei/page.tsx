"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function SurveiLayanan() {
  const [isHover, setIsHover] = useState(false);

  const containerStyle = {
    padding: '60px 20px',
    fontFamily: '"Roboto", Arial, sans-serif',
    backgroundColor: '#f8fafc',
    minHeight: '70vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box' as const,
  };

  const cardStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '24px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
    maxWidth: '750px',
    width: '100%',
    padding: 'clamp(30px, 5vw, 50px) clamp(20px, 5vw, 40px)',
    textAlign: 'center' as const,
    boxSizing: 'border-box' as const,
  };

  const badgeStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#eff6ff',
    color: '#093b77',
    padding: '8px 16px',
    borderRadius: '50px',
    fontSize: '13px',
    fontWeight: 'bold',
    marginBottom: '24px',
    textTransform: 'none' as const,
  };

  const headerTitleStyle = {
    fontSize: 'clamp(24px, 4vw, 32px)',
    fontWeight: 'bold',
    color: '#093b77',
    marginBottom: '16px',
    lineHeight: '1.2',
  };

  const textContainerStyle = {
    color: '#475569',
    fontSize: 'clamp(14px, 2vw, 15px)',
    lineHeight: '1.8',
    marginBottom: '35px',
    textAlign: 'center' as const,
  };

  const paragraphStyle = {
    marginBottom: '16px',
  };

  const buttonStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    backgroundColor: isHover ? '#052347' : '#093b77',
    color: '#ffffff',
    padding: '16px 36px',
    borderRadius: '50px',
    fontWeight: 'bold',
    fontSize: '16px',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(9, 59, 119, 0.2)',
    transform: isHover ? 'translateY(-2px)' : 'translateY(0)',
    maxWidth: '100%',
    boxSizing: 'border-box' as const,
  };

  const arrowIconStyle = {
    transition: 'transform 0.3s ease',
    transform: isHover ? 'translateX(4px)' : 'translateX(0)',
  };

  const footerTextStyle = {
    color: '#64748b',
    fontSize: '14px',
    lineHeight: '1.6',
    borderTop: '1px solid #f1f5f9',
    paddingTop: '24px',
    marginTop: '35px',
  };

  return (
    <motion.div 
      style={containerStyle}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <motion.div 
        style={cardStyle}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
      >
        
        <div>
          <span style={badgeStyle}>
            Periode: Mei 2026
          </span>
        </div>

        <h1 style={headerTitleStyle}>Survei Kepuasan Masyarakat</h1>

        <div style={textContainerStyle}>
          <p style={{ ...paragraphStyle, fontWeight: 'bold', color: '#093b77', fontSize: '16px' }}>
            Assalamualaikum Warahmatullahi Wabarakatuh
          </p>
          <p style={paragraphStyle}>
            Dalam rangka memberikan pelayanan publik yang berkualitas kepada masyarakat, perlu dilaksanakan survei untuk mengukur tingkat kepuasan masyarakat sebagai pengguna layanan Rutan Kelas II Sinjai.
          </p>
          <p style={{ ...paragraphStyle, margin: 0 }}>
            Kami meminta partisipasi Bapak/Ibu dalam pengisian <strong>Survei Mandiri Persepsi Anti Korupsi</strong> dan <strong>Survei Persepsi Kualitas Pelayanan</strong> melalui tautan resmi di bawah ini:
          </p>
        </div>

        <div>
          <a 
            href="https://star-survei3a.kemenimipas.go.id/ly/PTZN9Xyo" 
            target="_blank" 
            rel="noopener noreferrer"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            style={buttonStyle}
          >
            <span>Mulai Pengisian Survei</span>
            <i className="fa-solid fa-arrow-right" style={arrowIconStyle}></i>
          </a>
        </div>

        <div style={footerTextStyle}>
          <p style={{ marginBottom: '8px', fontWeight: 'bold', color: '#093b77' }}>
            Sebelumnya kami ucapkan terima kasih atas partisipasi Bapak/Ibu.
          </p>
          <p style={{ margin: 0, color: '#64748b', fontStyle: 'italic' }}>
            Partisipasi Bapak/Ibu/Saudara berarti dalam membangun perbaikan dan peningkatan layanan kami.
          </p>
        </div>

      </motion.div>
    </motion.div>
  );
}