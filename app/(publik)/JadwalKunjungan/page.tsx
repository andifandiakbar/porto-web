"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';

export default function JadwalKunjunganPage() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    <section className="content-layanan" style={{
      padding: '60px 20px',
      backgroundColor: '#ffffff',
      minHeight: '70vh',
      fontFamily: "'Plus Jakarta Sans', sans-serif"
    }}>
      <div className="container-minimalist" style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        <motion.div 
          className="section-title" 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '40px' }}
        >
          <h2 style={{ 
            color: '#093b77', 
            fontSize: '28px', 
            fontWeight: '700', 
            marginBottom: '7px'
          }}>
            Jadwal Kunjungan
          </h2>
          <div className="underline" style={{
            width: '50px',
            height: '4px',
            background: '#ddb309',
            margin: '0 auto',
            borderRadius: '2px'
          }}></div>
        </motion.div>

        <motion.div 
          className="jadwal-grid" 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px'
          }}
        >
          
          <motion.div 
            className="card-jadwal" 
            variants={itemVariants}
            style={cardStyle}
          >
            <div className="k-icon-wrapper" style={{ ...iconWrapperStyle, color: '#ddb309' }}>
              <i className="fa-solid fa-users"></i>
            </div>
            <div className="k-info">
              <span style={labelStyle}>KATEGORI NARAPIDANA</span>
              <h4 style={titleStyle}>Senin & Rabu</h4>
            </div>
          </motion.div>

          <motion.div 
            className="card-jadwal" 
            variants={itemVariants}
            style={cardStyle}
          >
            <div className="k-icon-wrapper" style={{ ...iconWrapperStyle, color: '#093b77' }}>
              <i className="fa-solid fa-user-shield"></i>
            </div>
            <div className="k-info">
              <span style={labelStyle}>KATEGORI TAHANAN</span>
              <h4 style={titleStyle}>Kamis & Jumat</h4>
            </div>
          </motion.div>

          <motion.div 
            className="card-jadwal" 
            variants={itemVariants}
            style={cardStyle}
          >
            <div className="k-icon-wrapper" style={{ ...iconWrapperStyle, color: '#10b981' }}>
              <i className="fa-solid fa-sun"></i>
            </div>
            <div className="k-info">
              <span style={labelStyle}>LAYANAN PAGI</span>
              <h4 style={titleStyle}>09.15 – 11.15 WITA</h4>
            </div>
          </motion.div>

          <motion.div 
            className="card-jadwal" 
            variants={itemVariants}
            style={cardStyle}
          >
            <div className="k-icon-wrapper" style={{ ...iconWrapperStyle, color: '#10b981' }}>
              <i className="fa-solid fa-cloud-sun"></i>
            </div>
            <div className="k-info">
              <span style={labelStyle}>LAYANAN SIANG</span>
              <h4 style={titleStyle}>13.15 – 14.15 WITA</h4>
            </div>
          </motion.div>

        </motion.div>

        <motion.div 
          className="footer-note" 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          style={{
            textAlign: 'center',
            marginTop: '35px',
            color: '#64748b',
            fontSize: '14px'
          }}
        >
          <p><i className="fa-solid fa-circle-info"></i> Hari Minggu & Libur Nasional Layanan Ditiadakan</p>
        </motion.div>
      </div>
    </section>
  );
}

const cardStyle = {
  background: '#ffffff',
  padding: '22px 25px',
  borderRadius: '16px',
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)',
  border: '1px solid #f1f5f9',
  cursor: 'default'
};

const iconWrapperStyle = {
  width: '55px',
  height: '55px',
  minWidth: '55px',
  background: '#f1f5f9',
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '22px'
};

const labelStyle = {
  display: 'block',
  fontSize: '11px',
  fontWeight: '700',
  color: '#64748b',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  marginBottom: '4px'
};

const titleStyle = {
  margin: 0,
  fontSize: '18px',
  color: '#093b77',
  fontWeight: '700'
};