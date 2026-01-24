"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RutanSinjaiDashboard() {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const router = useRouter();

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', backgroundColor: '#F4F7FE', overflow: 'hidden', fontFamily: "'Inter', sans-serif" }}>
      
      <aside style={{ 
        width: isSidebarVisible ? '280px' : '0px', 
        backgroundColor: '#FFFFFF', 
        borderRight: isSidebarVisible ? '1px solid #EBEBEB' : 'none', 
        display: 'flex', 
        flexDirection: 'column', 
        zIndex: 100,
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden' 
      }}>
        <div style={{ padding: '30px 20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img 
            src="/assets/logo.png" alt="Logo Rutan"
            style={{ width: '40px', height: '40px', objectFit: 'contain' }}
          />
          <div style={{ whiteSpace: 'nowrap' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#093661', margin: 0 }}>RUTAN KELAS IIB</h2>
            <p style={{ fontSize: '10px', color: '#A0AEC0', margin: 0 }}>SINJAI</p>
          </div>
        </div>

        <nav style={{ flex: 1, padding: '10px 15px', overflowY: 'auto' }}>
          <p style={navTitle}>UTAMA</p>
          <NavItem active={activeMenu === 'dashboard'} onClick={() => setActiveMenu('dashboard')} icon="📊" label="Dashboard" />
          
          <p style={navTitle}>DATA WBP</p>
          <NavItem active={activeMenu === 'wbp'} onClick={() => setActiveMenu('wbp')} icon="👥" label="Data Narapidana" />
          <NavItem active={activeMenu === 'berita'} onClick={() => setActiveMenu('berita')} icon="📰" label="Update Berita" />
          
          <p style={navTitle}>MEDIA & GALERI</p>
          <NavItem active={activeMenu === 'foto'} onClick={() => setActiveMenu('foto')} icon="📸" label="Galeri Foto" />
          <NavItem active={activeMenu === 'video'} onClick={() => setActiveMenu('video')} icon="🎥" label="Galeri Video" />
          <NavItem active={activeMenu === 'produk'} onClick={() => setActiveMenu('produk')} icon="🎨" label="Karya WBP" />
        </nav>

        <div style={{ padding: '20px', borderTop: '1px solid #F1F1F1', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={avatarCircle}>SA</div>
          <div style={{ flex: 1 }}><div style={{ fontSize: '13px', fontWeight: 'bold' }}>Staf Admin</div></div>
          <button onClick={() => router.push('/admin')} style={exitBtn}>Keluar</button>
        </div>
      </aside>

      <main style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        <header style={topHeaderStyle}>
          <span onClick={() => setIsSidebarVisible(!isSidebarVisible)} style={{ cursor: 'pointer', fontSize: '22px', color: '#093661' }}>☰</span>
          <div style={{ fontSize: '14px', color: '#666', fontWeight: '500' }}>Sistem Informasi Manajemen Rutan Sinjai</div>
        </header>

        <div style={{ padding: '30px' }}>
          <div style={glassBanner}>
            <div style={{ position: 'relative', zIndex: 2 }}>
              <h2 style={{ margin: '0 0 10px 0', fontSize: '26px', fontWeight: 'bold' }}>Sistem Informasi Data WBP</h2>
              <p style={{ margin: 0, opacity: 0.9, fontSize: '14px' }}>Manajemen data warga binaan yang modern dan transparan.</p>
            </div>
            <div style={glassCircle1}></div>
            <div style={glassCircle2}></div>
          </div>

          <div style={statsGrid}>
            <StatCard label="TOTAL PENGHUNI" value="40" sub="Orang" color="#4680FF" />
            <StatCard label="PENGUNJUNG" value="110" sub="Bulan Ini" color="#FFB811" />
            <StatCard label="PRODUK KARYA" value="12" sub="Unit" color="#2ECC71" />
            <StatCard label="BERITA" value="5" sub="Baru" color="#E74C3C" />
          </div>

          <div style={contentCard}>
            {activeMenu === 'dashboard' ? (
              <div style={{ textAlign: 'center', padding: '60px' }}>
                <div style={{ fontSize: '50px', marginBottom: '20px' }}>🏠</div>
                <h3 style={{ color: '#093661', margin: 0 }}>Selamat Datang di Panel Utama</h3>
                <p style={{ color: '#718096' }}>Gunakan navigasi di samping untuk mengelola konten website.</p>
              </div>
            ) : (
              <div style={{ padding: '30px' }}>
                <h3 style={{ marginBottom: '25px', color: '#093661' }}>Manajemen {activeMenu.toUpperCase()}</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <input style={inputStyled} placeholder="Masukkan data..." />
                  <button style={submitBtn}>Simpan Data</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ active, onClick, icon, label }: any) {
  return (
    <div onClick={onClick} style={{
      padding: '12px 18px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '15px',
      marginBottom: '5px', transition: '0.3s',
      backgroundColor: active ? '#F0F4FF' : 'transparent',
      color: active ? '#093661' : '#5B6B79',
      fontWeight: active ? '700' : '400'
    }}>
      <span>{icon}</span><span style={{ fontSize: '14px' }}>{label}</span>
    </div>
  );
}

function StatCard({ label, value, sub, color }: any) {
  return (
    <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '16px', border: '1px solid #EBEBEB', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
      <p style={{ margin: 0, fontSize: '11px', fontWeight: 'bold', color: '#A0AEC0', letterSpacing: '1px' }}>{label}</p>
      <h2 style={{ margin: '10px 0', fontSize: '28px', color: '#2D3748' }}>{value} <span style={{ fontSize: '14px', color: '#CBD5E0', fontWeight: 'normal' }}>{sub}</span></h2>
      <div style={{ height: '4px', background: '#F0F2F5', borderRadius: '2px' }}><div style={{ width: '60%', height: '100%', background: color, borderRadius: '2px' }}></div></div>
    </div>
  );
}

const glassBanner: any = {
  background: 'linear-gradient(135deg, rgba(70, 128, 255, 0.9) 0%, rgba(0, 70, 229, 0.9) 100%)',
  backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)',
  borderRadius: '20px', padding: '45px', color: 'white', position: 'relative', overflow: 'hidden', marginBottom: '30px'
};
const glassCircle1: any = { position: 'absolute', top: '-20px', right: '-20px', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', zIndex: 1 };
const glassCircle2: any = { position: 'absolute', bottom: '-40px', left: '20%', width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', zIndex: 1 };
const navTitle: any = { fontSize: '10px', fontWeight: '800', color: '#CBD5E0', margin: '25px 0 10px 15px', letterSpacing: '1px' };
const avatarCircle: any = { width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#093661', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' };
const exitBtn: any = { padding: '8px 15px', backgroundColor: '#FFF5F5', color: '#E53E3E', border: '1px solid #FED7D7', borderRadius: '8px', fontSize: '12px', cursor: 'pointer', fontWeight: '600' };
const topHeaderStyle: any = { height: '75px', backgroundColor: '#FFF', borderBottom: '1px solid #EBEBEB', padding: '0 30px', display: 'flex', alignItems: 'center', gap: '20px' };
const statsGrid: any = { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' };
const contentCard: any = { backgroundColor: 'white', borderRadius: '20px', border: '1px solid #EBEBEB' };
const inputStyled: any = { padding: '14px', borderRadius: '10px', border: '1px solid #E2E8F0', outline: 'none' };
const submitBtn: any = { padding: '14px', backgroundColor: '#093661', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' };