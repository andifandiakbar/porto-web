"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';

export default function SyaratKetentuan() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 1.0, ease: [0.25, 0.1, 0.25, 1] } 
    }
  };

  return (
    <motion.section 
      className="content-layanan" 
      style={{
        padding: '60px 20px',
        backgroundColor: '#ffffff',
        minHeight: '70vh',
        fontFamily: "Roboto, Arial, sans-serif"
      }}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) {
          .card-responsive {
            padding: 20px !important;
            gap: 16px !important;
          }
          .title-responsive {
            font-size: 16px !important;
          }
          .desc-responsive {
            font-size: 14px !important;
          }
        }
      `}} />

      <div className="container-minimalist" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        <motion.div 
          className="section-title" 
          variants={itemVariants}
          style={{ textAlign: 'center', marginBottom: '40px' }}
        >
          <h2 style={{ 
            color: '#093b77', 
            fontSize: '28px', 
            fontWeight: 'bold', 
            marginBottom: '7px',
            fontFamily: "Roboto, Arial, sans-serif"
          }}>
            Ketentuan Kunjungan
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
          className="ketentuan-stack" 
          variants={containerVariants}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          
          <motion.div 
            className="k-card card-responsive" 
            variants={itemVariants}
            style={cardStyle}
          >
            <div className="k-icon-wrapper" style={{ ...iconWrapperStyle, color: '#093b77', background: '#f0f7ff' }}>
              <i className="fa-solid fa-id-card" style={{ fontSize: '24px' }}></i>
            </div>
            <div className="k-info" style={{ flex: 1, minWidth: 0 }}>
              <h4 className="title-responsive" style={titleStyle}>Identitas Resmi</h4>
              <p className="desc-responsive" style={descStyle}>Wajib Membawa Identitas Resmi (KTP, KK, SIM & KARTU PELAJAR)</p>
            </div>
          </motion.div>

          <motion.div 
            className="k-card card-responsive" 
            variants={itemVariants}
            style={cardStyle}
          >
            <div className="k-icon-wrapper" style={{ ...iconWrapperStyle, color: '#093b77', background: '#f0f7ff' }}>
              <i className="fa-solid fa-file-signature" style={{ fontSize: '24px' }}></i>
            </div>
            <div className="k-info" style={{ flex: 1, minWidth: 0 }}>
              <h4 className="title-responsive" style={titleStyle}>Izin Pihak Penahan</h4>
              <p className="desc-responsive" style={descStyle}>Wajib Membawa Surat Izin Dari Pihak Penahan (Bagi Tahanan)</p>
            </div>
          </motion.div>

          <motion.div 
            className="k-card card-responsive" 
            variants={itemVariants}
            style={cardStyle}
          >
            <div className="k-icon-wrapper" style={{ ...iconWrapperStyle, color: '#093b77', background: '#f0f7ff' }}>
              <i className="fa-solid fa-shirt" style={{ fontSize: '24px' }}></i>
            </div>
            <div className="k-info" style={{ flex: 1, minWidth: 0 }}>
              <h4 className="title-responsive" style={titleStyle}>Etika Berpakaian</h4>
              <p className="desc-responsive" style={descStyle}>Dilarang Menggunakan celana Pendek</p>
            </div>
          </motion.div>

          <motion.div 
            className="k-card card-responsive" 
            variants={itemVariants}
            style={cardStyle}
          >
            <div className="k-icon-wrapper" style={{ ...iconWrapperStyle, color: '#093b77', background: '#f0f7ff' }}>
              <i className="fa-solid fa-calendar-xmark" style={{ fontSize: '24px' }}></i>
            </div>
            <div className="k-info" style={{ flex: 1, minWidth: 0 }}>
              <h4 className="title-responsive" style={titleStyle}>Hari Libur & tanggal Merah</h4>
              <p className="desc-responsive" style={descStyle}>Hari Minggu dan Libur Nasional Kunjungan Ditiadakan</p>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </motion.section>
  );
}

const cardStyle = {
  background: '#ffffff',
  padding: '30px',
  borderRadius: '16px',
  display: 'flex',
  alignItems: 'flex-start',
  gap: '24px',
  boxShadow: '0 4px 25px rgba(0, 0, 0, 0.03)',
  border: '1px solid #f1f5f9',
  cursor: 'default'
};

const iconWrapperStyle = {
  width: '60px',
  height: '60px',
  minWidth: '60px',
  borderRadius: '14px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const titleStyle = {
  margin: '0 0 6px 0',
  fontSize: '16px',
  color: '#093b77',
  fontWeight: 'bold',
  letterSpacing: '0.3px'
};

const descStyle = {
  margin: 0,
  color: '#475569',
  fontSize: '15px',
  fontWeight: 'normal',
  lineHeight: '1.4'
};