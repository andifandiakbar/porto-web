"use client";

import React from 'react';

export default function SyaratKetentuan() {
  return (
    <section className="content-layanan" style={{
      padding: '60px 20px',
      backgroundColor: '#ffffff',
      minHeight: '70vh',
      fontFamily: "'Plus Jakarta Sans', sans-serif"
    }}>
      <div className="container-minimalist" style={{ maxWidth: '850px', margin: '0 auto' }}>
        
        <div className="section-title" style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ 
            color: '#093b77', 
            fontSize: '28px', 
            fontWeight: '700', 
            marginBottom: '7px' 
          }}>
            Ketentuan Kunjungan
          </h2>
          <div className="underline" style={{
            width: '45px',
            height: '4px',
            background: '#ddb309',
            margin: '0 auto',
            borderRadius: '10px'
          }}></div>
        </div>

        <div className="ketentuan-stack" style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          
          <div className="k-card" style={cardStyle}>
            <div className="k-icon-wrapper" style={iconWrapperStyle}>
              <i className="fa-solid fa-id-card"></i>
            </div>
            <div className="k-info">
              <h4 style={titleStyle}>Identitas Resmi</h4>
              <p style={descStyle}>Wajib Membawa Identitas Resmi (KTP, KK, SIM & KARTU PELAJAR)</p>
            </div>
          </div>

          <div className="k-card" style={cardStyle}>
            <div className="k-icon-wrapper" style={iconWrapperStyle}>
              <i className="fa-solid fa-file-signature"></i>
            </div>
            <div className="k-info">
              <h4 style={titleStyle}>Izin Pihak Penahan</h4>
              <p style={descStyle}>Wajib Membawa Surat Izin Dari Pihak Penahan (Bagi Tahanan)</p>
            </div>
          </div>

          <div className="k-card" style={cardStyle}>
            <div className="k-icon-wrapper" style={iconWrapperStyle}>
              <i className="fa-solid fa-shirt"></i>
            </div>
            <div className="k-info">
              <h4 style={titleStyle}>Etika Berpakaian</h4>
              <p style={descStyle}>Dilarang Menggunakan celana Pendek</p>
            </div>
          </div>

          <div className="k-card" style={cardStyle}>
            <div className="k-icon-wrapper" style={iconWrapperStyle}>
              <i className="fa-solid fa-calendar-xmark"></i>
            </div>
            <div className="k-info">
              <h4 style={titleStyle}>Hari Libur</h4>
              <p style={descStyle}>Hari Minggu dan Libur Nasional Kunjungan Ditiadakan</p>
            </div>
          </div>

        </div>
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
  border: '1px solid #f1f5f9'
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
  fontSize: '22px',
  color: '#093b77'
};

const titleStyle = {
  margin: '0 0 4px 0',
  fontSize: '17px',
  color: '#093b77',
  fontWeight: '700'
};

const descStyle = {
  margin: 0,
  color: '#64748b',
  fontSize: '14px',
  lineheight: '1.6'
};