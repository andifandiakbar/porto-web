"use client";
import React, { useState, useEffect } from 'react';

export default function DashboardHome({ setActiveMenu, daftarWBP, daftarPengaduan, daftarBerita }: any) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ padding: isMobile ? '20px' : '40px' }}>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      
      <div style={{ marginBottom: '35px' }}>
        <h3 style={{ color: '#093661', fontSize: isMobile ? '18px' : '22px', fontWeight: '700', marginBottom: '8px' }}>Selamat Datang Kembali Admin! 👋</h3>
        <p style={{ color: '#718096', fontSize: '14px' }}>Pantau dan kelola data operasional Rutan Sinjai dalam satu panel.</p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', 
        gap: '20px', 
        marginBottom: '40px' 
      }}>
        <StatCard label="WARGA BINAAN" value={daftarWBP.length.toString()} sub="Jiwa" color="#093661" isMobile={isMobile} />
        <StatCard label="PENGADUAN" value={daftarPengaduan.length.toString()} sub="Laporan" color="#FFB811" isMobile={isMobile} />
        <StatCard label="KARYA WBP" value="3" sub="Produk" color="#2ECC71" isMobile={isMobile} />
        <StatCard label="BERITA" value={daftarBerita.length.toString()} sub="Post" color="#E53E3E" isMobile={isMobile} />
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', 
        gap: '20px', 
        marginBottom: '45px' 
      }}>
        <QuickActionCard icon="fa-solid fa-user-plus" label="Data WBP" sub="Input Narapidana" onClick={() => setActiveMenu('wbp')} color="#093661" />
        <QuickActionCard icon="fa-solid fa-pen-to-square" label="Update Berita" sub="Posting info terbaru" onClick={() => setActiveMenu('berita')} color="#2ECC71" />
        <QuickActionCard icon="fa-solid fa-bell" label="Pengaduan" sub="Cek laporan masuk" onClick={() => setActiveMenu('pengaduan')} color="#FFB811" />
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: isMobile ? '1fr' : '1.6fr 1fr', 
        gap: '30px' 
      }}>
        <div style={{ backgroundColor: '#F8FAFC', padding: '25px', borderRadius: '18px', border: '1px solid #E2E8F0' }}>
          <h4 style={{ fontSize: '16px', color: '#093661', marginBottom: '20px', fontWeight: 'bold' }}>Aktivitas Terakhir</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {daftarWBP.length > 0 && <ActivityItem label={`Input WBP: ${daftarWBP[0].nama}`} time="Baru saja" status="Selesai" isMobile={isMobile} />}
            {daftarPengaduan.length > 0 && <ActivityItem label={`Aduan Baru: ${daftarPengaduan[0].pelapor}`} time="Baru saja" status={daftarPengaduan[0].status?.toLowerCase() === 'proses' ? 'Proses' : 'Selesai'} isMobile={isMobile} />}
            {daftarBerita.length > 0 && <ActivityItem label={`Update Berita: ${daftarBerita[0].judul}`} time="Baru saja" status="Selesai" isMobile={isMobile} />}
          </div>
        </div>

        <div style={{ backgroundColor: '#093661', padding: '25px', borderRadius: '18px', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: '-20px', top: '-20px', fontSize: '100px', opacity: 0.1, color: 'white' }}>
            <i className="fa-solid fa-cloud"></i>
          </div>
          <h4 style={{ fontSize: '16px', marginBottom: '15px', fontWeight: '600', position: 'relative', zIndex: 1 }}>Status Sistem Cloud</h4>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px', position: 'relative', zIndex: 1 }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#2ECC71', boxShadow: '0 0 10px #2ECC71' }}></div>
            <span style={{ fontSize: '14px', fontWeight: '500' }}>Database Supabase: Online</span>
          </div>
          <p style={{ fontSize: '13px', opacity: 0.8, lineHeight: '1.6', position: 'relative', zIndex: 1 }}>Server berjalan secara realtime. Semua data terenkripsi dan aman di cloud server.</p>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, sub, color, isMobile }: any) {
  return (
    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '16px', border: '1px solid #EBEBEB', transition: 'all 0.3s ease' }}>
      <p style={{ margin: 0, fontSize: '11px', fontWeight: '800', color: '#718096', letterSpacing: '0.5px' }}>{label}</p>
      <h2 style={{ margin: '10px 0', fontSize: '24px', color: '#2D3748', display: 'flex', alignItems: 'baseline', gap: '5px' }}>
        {value} <span style={{ fontSize: '12px', color: '#A0AEC0', fontWeight: 'normal' }}>{sub}</span>
      </h2>
      <div style={{ height: '4px', backgroundColor: '#EDF2F7', borderRadius: '10px', overflow: 'hidden' }}>
        <div style={{ width: `${Math.min(parseInt(value) * 5, 100)}%`, height: '100%', backgroundColor: color, borderRadius: '10px', transition: 'width 1s ease-in-out' }}></div>
      </div>
    </div>
  );
}

function QuickActionCard({ icon, label, sub, onClick, color }: any) {
  const [isHover, setIsHover] = useState(false);

  return (
    <div 
      onClick={onClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      style={{ 
        padding: '20px', 
        backgroundColor: isHover ? '#F8FAFC' : 'white', 
        borderRadius: '14px', 
        border: isHover ? `1px solid ${color}` : '1px solid #EBEBEB', 
        cursor: 'pointer', 
        transition: 'all 0.2s ease', 
        display: 'flex', 
        gap: '15px', 
        alignItems: 'center', 
        boxShadow: isHover ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' : '0 4px 6px -1px rgba(0, 0, 0, 0.05)' 
      }}
    >
      <div style={{ 
        fontSize: '18px', 
        width: '45px', 
        height: '45px', 
        backgroundColor: isHover ? color : `${color}15`, 
        borderRadius: '12px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        color: isHover ? 'white' : color,
        transition: 'all 0.2s ease'
      }}>
        <i className={icon}></i>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: '700', fontSize: '14px', color: '#2D3748' }}>{label}</div>
        <div style={{ fontSize: '12px', color: '#A0AEC0' }}>{sub}</div>
      </div>
    </div>
  );
}

function ActivityItem({ label, time, status, isMobile }: any) {
  const isSelesai = status === 'Selesai';
  const isProses = status === 'Proses';

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: 'space-between', 
      alignItems: isMobile ? 'flex-start' : 'center', 
      padding: '12px 15px', 
      backgroundColor: 'white', 
      borderRadius: '12px', 
      border: '1px solid #EDF2F7',
      gap: isMobile ? '10px' : '0',
      transition: '0.2s ease'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ 
          width: '32px', 
          height: '32px', 
          borderRadius: '8px', 
          backgroundColor: isSelesai ? '#F0FFF4' : isProses ? '#FFFBEB' : '#F7FAFC', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: isSelesai ? '#2ECC71' : isProses ? '#FFB811' : '#A0AEC0',
          fontSize: '12px'
        }}>
          <i className={isSelesai ? "fa-solid fa-check" : isProses ? "fa-solid fa-spinner fa-spin" : "fa-solid fa-clock"}></i>
        </div>
        <div>
          <div style={{ fontSize: '13px', fontWeight: '600', color: '#4A5568', maxWidth: isMobile ? '200px' : '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{label}</div>
          <div style={{ fontSize: '11px', color: '#A0AEC0' }}>{time}</div>
        </div>
      </div>
      <span style={{ 
        fontSize: '10px', 
        padding: '4px 10px', 
        borderRadius: '20px', 
        backgroundColor: isSelesai ? '#E6FFFA' : isProses ? '#FFFBEB' : '#F7FAFC', 
        color: isSelesai ? '#234E52' : isProses ? '#975A16' : '#4A5568', 
        fontWeight: '800', 
        border: `1px solid ${isSelesai ? '#B2F5EA' : isProses ? '#FEEBC8' : '#E2E8F0'}` 
      }}>
        {status.toUpperCase()}
      </span>
    </div>
  );
}