"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';

export default function JadwalKunjunganPage() {
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
        .jadwal-grid-responsive {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
          gap: 25px;
        }
        @media (max-width: 768px) {
          .jadwal-grid-responsive {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .card-responsive {
            padding: 20px !important;
            gap: 16px !important;
          }
          .label-responsive {
            font-size: 14px !important;
          }
          .title-responsive {
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
            Jadwal Kunjungan & Penitipan Barang
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
          className="jadwal-grid-responsive" 
          variants={containerVariants}
        >
          
          <motion.div 
            className="card-jadwal card-responsive" 
            variants={itemVariants}
            style={cardStyle}
          >
            <div className="k-icon-wrapper" style={{ ...iconWrapperStyle, color: '#093b77' }}>
              <i className="fa-solid fa-calendar-check" style={{ fontSize: '24px' }}></i>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={groupStyle}>
                <span className="label-responsive" style={labelStyle}>Jadwal Kunjungan (Senin - Kamis)</span>
                <h4 className="title-responsive" style={titleStyle}><span style={sessionStyle}>Pagi :</span> 09.00 - 11.15 <span style={witaStyle}>WITA</span></h4>
                <h4 className="title-responsive" style={titleStyle}><span style={sessionStyle}>Siang :</span> 13.15 - 14.15 <span style={witaStyle}>WITA</span></h4>
              </div>
              
              <div style={dividerStyle}></div>

              <div style={groupStyle}>
                <span className="label-responsive" style={labelStyle}>Jadwal Kunjungan (Jumat)</span>
                <h4 className="title-responsive" style={titleStyle}><span style={sessionStyle}>Pagi :</span> 09.00 - 11.15 <span style={witaStyle}>WITA</span></h4>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="card-jadwal card-responsive" 
            variants={itemVariants}
            style={cardStyle}
          >
            <div className="k-icon-wrapper" style={{ ...iconWrapperStyle, color: '#093b77' }}>
              <i className="fa-solid fa-boxes-packing" style={{ fontSize: '24px' }}></i>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={groupStyle}>
                <span className="label-responsive" style={labelStyle}>Penitipan Barang (Senin - Kamis)</span>
                <h4 className="title-responsive" style={titleStyle}><span style={sessionStyle}>Pagi :</span> 09.00 - 11.30 <span style={witaStyle}>WITA</span></h4>
                <h4 className="title-responsive" style={titleStyle}><span style={sessionStyle}>Siang :</span> 13.15 - 14.30 <span style={witaStyle}>WITA</span></h4>
              </div>

              <div style={dividerStyle}></div>

              <div style={groupStyle}>
                <span className="label-responsive" style={labelStyle}>Penitipan Barang (Jumat - Sabtu)</span>
                <h4 className="title-responsive" style={titleStyle}><span style={sessionStyle}>Pagi :</span> 09.00 - 11.30 <span style={witaStyle}>WITA</span></h4>
              </div>
            </div>
          </motion.div>

        </motion.div>

        <motion.div 
          className="footer-note" 
          variants={itemVariants}
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

const groupStyle = {
  marginBottom: '5px'
};

const dividerStyle = {
  height: '1px',
  background: '#f1f5f9',
  margin: '15px 0',
  width: '100%'
};

const labelStyle = {
  display: 'block',
  fontSize: '16px',
  fontWeight: 'bold',
  color: '#093b77',
  letterSpacing: '0.3px',
  marginBottom: '10px'
};

const titleStyle = {
  margin: '4px 0',
  fontSize: '15px',
  color: '#475569',
  fontWeight: 'normal',
  lineHeight: '1.4'
};

const sessionStyle = {
  color: '#475569',
  fontWeight: 'normal',
  marginRight: '4px'
};

const witaStyle = {
  fontSize: '12px',
  color: '#94a3b8',
  fontWeight: 'normal',
  marginLeft: '2px'
};