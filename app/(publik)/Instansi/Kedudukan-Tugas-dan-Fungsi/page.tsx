"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function TugasFungsiPage() {
  const containerStyle: React.CSSProperties = {
    padding: '40px 15px',
    margin: '0 auto',
    maxWidth: '800px',
    lineHeight: '1.6',
    color: '#333',
    fontFamily: '"Arial", sans-serif'
  };

  const titleStyle: React.CSSProperties = {
    color: '#093b77',
    marginBottom: '20px',
    fontSize: 'clamp(1.3rem, 3.5vw, 1.75rem)',
    fontWeight: 'bold',
    fontFamily: '"Arial", sans-serif',
    textTransform: 'uppercase',
    lineHeight: '1.3'
  };

  const headingStyle: React.CSSProperties = {
    color: '#093b77',
    marginBottom: '10px',
    fontSize: '1.15rem',
    fontWeight: 'bold',
    fontFamily: '"Arial", sans-serif'
  };

  const textStyle: React.CSSProperties = {
    fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontFamily: '"Arial", sans-serif',
    padding: '12px',
    backgroundColor: '#f9f9f9',
    margin: 0
  };

  const descStyle: React.CSSProperties = {
    marginBottom: '12px',
    fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
    fontFamily: '"Arial", sans-serif',
    fontWeight: 'normal'
  };

  const listStyle: React.CSSProperties = {
    paddingLeft: '20px',
    fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
    fontFamily: '"Arial", sans-serif'
  };

  const itemStyle: React.CSSProperties = {
    marginBottom: '6px',
    fontWeight: 'normal',
    fontFamily: '"Arial", sans-serif'
  };

  return (
    <motion.div 
      className="container" 
      style={containerStyle}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <motion.h1 
        style={titleStyle}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
      >
        Tugas Pokok dan Fungsi Kementerian Imigrasi dan Pemasyarakatan
      </motion.h1>
      
      <section style={{ marginBottom: '25px' }}>
        <h2 style={headingStyle}>Tugas</h2>
        <p style={textStyle}>
          &quot;Kementerian mempunyai tugas menyelenggarakan suburusan pemerintahan di bidang imigrasi dan pemasyarakatan yang merupakan lingkup urusan pemerintahan di bidang hukum untuk membantu Presiden dalam menyelenggarakan pemerintahan negara.&quot;
        </p>
      </section>

      <section>
        <h2 style={headingStyle}>Fungsi</h2>
        <p style={descStyle}>
          Dalam melaksanakan tugas sebagaimana dimaksud dalam Pasal 5 Peraturan Menteri Imigrasi dan Pemasyarakatan Nomor 1 Tahun 2024, Kementerian Imigrasi dan Pemasyarakatan menyelenggarakan fungsi:
        </p>
        <ul style={listStyle}>
          <li style={itemStyle}>Perumusan, penetapan dan pelaksanaan kebijakan di bidang keimigrasian dan pemasyarakatan.</li>
          <li style={itemStyle}>Pelaksanaan bimbingan teknis, dan supervisi atas pelaksanaan urusan keimigrasian dan pemasyarakatan di daerah.</li>
          <li style={itemStyle}>Koordinasi pelaksanaan tugas, pembinaan dan pemberian dukungan administrasi kepada seluruh unsur organisasi di lingkungan Kementerian.</li>
          <li style={itemStyle}>Pengelolaan barang milik negara/kekayaan negara yang menjadi tanggung jawab Kementerian.</li>
          <li style={itemStyle}>Pengawasan atas pelaksanaan tugas di lingkungan Kementerian.</li>
          <li style={itemStyle}>Pelaksanaan pengembangan sumber daya manusia di bidang keimigrasian dan pemasyarakatan.</li>
          <li style={itemStyle}>Pelaksanaan kegiatan teknis yang berskala nasional.</li>
          <li style={itemStyle}>Pelaksanaan tugas pokok sampai ke daerah.</li>
          <li style={itemStyle}>Pelaksanaan dukungan yang bersifat substantif kepada seluruh unsur organisasi di lingkungan Kementerian Imigrasi dan Pemasyarakatan.</li>
          <li style={itemStyle}>Pelaksanaan fungsi lain yang diberikan oleh Presiden.</li>
        </ul>
      </section>
    </motion.div>
  );
}