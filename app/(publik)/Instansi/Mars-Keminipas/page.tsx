"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function MarsKeminipasPage() {
  const containerStyle: React.CSSProperties = {
    padding: '40px 15px',
    margin: '0 auto',
    maxWidth: '800px',
    textAlign: 'center',
    fontFamily: '"Arial", sans-serif'
  };

  const titleStyle: React.CSSProperties = {
    color: '#093b77',
    marginBottom: '25px',
    fontSize: 'clamp(1.5rem, 4vw, 2rem)',
    fontWeight: 'bold',
    letterSpacing: '-0.5px',
    fontFamily: '"Arial", sans-serif',
    textTransform: 'uppercase'
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: '#fdfdfd7a',
    border: '1px solid #e2e8f0',
    borderRadius: '16px',
    padding: '24px 15px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
  };

  const stanzaStyle: React.CSSProperties = {
    marginBottom: '16px'
  };

  const lineStyle: React.CSSProperties = {
    fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
    lineHeight: '1.4',
    color: '#334155',
    fontWeight: 'normal',
    margin: '2px 0',
    letterSpacing: '-0.2px',
    fontFamily: '"Arial", sans-serif',
    textTransform: 'uppercase',
    wordBreak: 'break-word'
  };

  return (
    <motion.div 
      className="container" 
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
        <h1 style={titleStyle}>Mars Kementerian Imigrasi dan Pemasyarakatan</h1>
        
        <div style={stanzaStyle}>
          <p style={lineStyle}>Satukan visi, melangkah dengan berani</p>
          <p style={lineStyle}>‘Tuk menggapai cita mulia</p>
          <p style={lineStyle}>Junjung keadilan, wujudkan rasa aman</p>
          <p style={lineStyle}>Di atas tanah bumi pertiwi</p>
        </div>

        <div style={stanzaStyle}>
          <p style={lineStyle}>Kementerian imigrasi dan pemasyarakatan</p>
          <p style={lineStyle}>Republik indonesia</p>
          <p style={lineStyle}>Garda terdepan menjaga kedaulatan</p>
          <p style={lineStyle}>Mengawasi dan mengayomi</p>
        </div>

        <div style={stanzaStyle}>
          <p style={lineStyle}>Berwibawa, berintegritas</p>
          <p style={lineStyle}>Terhormat dan terpercaya</p>
          <p style={lineStyle}>Peduli, mendampingi</p>
          <p style={lineStyle}>Tangguh hadapi rintangan</p>
        </div>

        <div style={stanzaStyle}>
          <p style={lineStyle}>Kami siap ‘tuk mengabdi</p>
          <p style={lineStyle}>Menjaga dan melindungi</p>
          <p style={lineStyle}>Seluruh jiwa raga kami</p>
          <p style={lineStyle}>Untuk negara</p>
        </div>

        <div style={stanzaStyle}>
          <p style={lineStyle}>Kami siap ‘tuk berbakti</p>
          <p style={lineStyle}>Menuntun dan melayani</p>
          <p style={lineStyle}>Berikan yang terbaik</p>
          <p style={lineStyle}>Untuk negara</p>
        </div>

        <div>
          <p style={lineStyle}>Kementerian imigrasi dan pemasyarakatan republik indonesia</p>
        </div>
      </motion.div>
    </motion.div>
  );
}