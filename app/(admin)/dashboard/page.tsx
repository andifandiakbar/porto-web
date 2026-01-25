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
        zIndex: 1000,
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden',
        flexShrink: 0 
      }}>
        
        <div style={{ 
          padding: '30px 28px', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'flex-start', 
          textAlign: 'left', 
          gap: '0px',
          flexShrink: 0,
          backgroundColor: '#FFF'
        }}>
          <img 
            src="/assets/logo.png" alt="Logo Rutan"
            style={{ width: '90px', height: '90px', objectFit: 'contain' }}
          />
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#093661', margin: 1 }}>Rutan Kelas II B</h2>
            <p style={{ fontSize: '15px', color: '#A0AEC0', margin: 1 }}>Sinjai</p>
          </div>
        </div>

        <nav style={{ flex: 1, padding: '10px 15px', overflowY: 'auto', backgroundColor: '#FFF' }}>
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

        <div style={{ 
          padding: '20px', 
          borderTop: '1px solid #F1F1F1', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px',
          backgroundColor: '#FFF',
          flexShrink: 0,
          zIndex: 10
        }}>
          <div style={avatarCircle}>SA</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#2D3748' }}>Staf Admin</div>
          </div>
          <button onClick={() => router.push('/admin')} style={exitBtn}>Keluar</button>
        </div>
      </aside>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
        
        <header style={{
          ...topHeaderStyle,
          position: 'sticky',
          top: 0,
          zIndex: 900,
          boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
        }}>
          <span onClick={() => setIsSidebarVisible(!isSidebarVisible)} style={{ cursor: 'pointer', fontSize: '22px', color: '#093661' }}>☰</span>
          <div style={{ fontSize: '14px', color: '#666', fontWeight: '500' }}>Sistem Informasi Manajemen Rutan Kelas II B Sinjai</div>
        </header>

        <main style={{ flex: 1, overflowY: 'auto', padding: '30px' }}>
          <div style={glassBanner}>
            <div style={{ position: 'relative', zIndex: 2 }}>
              <h2 style={{ margin: '0 0 10px 0', fontSize: '26px', fontWeight: 'bold' }}>Sistem Informasi</h2>
              <p style={{ margin: 0, opacity: 0.9, fontSize: '14px' }}>Manajemen data warga binaan yang modern dan transparan.</p>
            </div>
            <div style={glassCircle1}></div>
            <div style={glassCircle2}></div>
          </div>

          <div style={statsGrid}>
            <StatCard label="TOTAL PENGHUNI" value="40" sub="Orang" color="#4680FF" />
            <StatCard label="PENGUNJUNG" value="110" sub="Bulan Ini" color="#FFB811" />
            <StatCard label="PRODUK KARYA" value="4" sub="Unit" color="#2ECC71" />
            <StatCard label="BERITA" value="5" sub="Baru" color="#E74C3C" />
          </div>

          <div style={contentCard}>
            {activeMenu === 'dashboard' ? (
              <div style={{ textAlign: 'center', padding: '60px' }}>
                <div style={{ fontSize: '50px', marginBottom: '20px' }}>🏠</div>
                <h3 style={{ color: '#093661', margin: 0 }}>Selamat Datang di Panel Utama</h3>
                <p style={{ color: '#718096' }}>Gunakan menu di sebelah kiri untuk mengelola data website. Perubahan yang Anda simpan di sini akan langsung tampil pada halaman publik website Rutan Sinjai secara real-time.</p>
              </div>
            ) : activeMenu === 'wbp' ? (
              <div style={{ padding: '30px' }}>
                <h3 style={sectionTitle}><span>👥</span> Tambah Data Narapidana (WBP)</h3>
                <div style={formGrid}>
                  <FormInput label="Nama Lengkap" placeholder="Masukkan nama sesuai KTP" />
                  <FormInput label="NIK / No. Identitas" placeholder="Masukkan 16 digit NIK" />
                  <FormInput label="Perkara / Kasus" placeholder="Contoh: Narkotika, Pencurian" />
                  <FormInput label="Lama Pidana" placeholder="Contoh: 5 Tahun 6 Bulan" />
                  <FormInput label="Tanggal Ekspirasi" type="date" />
                  <FormInput label="Blok / Kamar" placeholder="Contoh: Blok A - Kamar 04" />
                  <button style={{ ...submitBtn, gridColumn: 'span 2' }}>Simpan Data Narapidana</button>
                </div>
              </div>
            ) : activeMenu === 'berita' ? (
              <div style={{ padding: '30px' }}>
                <h3 style={sectionTitle}>📰 Posting Berita Terbaru</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <input style={inputStyled} placeholder="Judul Berita" />
                  <textarea style={{ ...inputStyled, height: '150px' }} placeholder="Isi Berita..."></textarea>
                  <button style={submitBtn}>Publikasikan Berita</button>
                </div>
              </div>
            ) : activeMenu === 'foto' ? (
              <div style={{ padding: '30px' }}>
                <h3 style={sectionTitle}>📸 Upload Galeri Foto</h3>
                <div style={formGrid}>
                  <FormInput label="Keterangan Foto" placeholder="Deskripsi singkat foto" />
                  <FormInput label="Pilih File Foto" type="file" />
                  <button style={{ ...submitBtn, gridColumn: 'span 2' }}>Upload Foto</button>
                </div>
              </div>
            ) : activeMenu === 'video' ? (
              <div style={{ padding: '30px' }}>
                <h3 style={sectionTitle}>🎥 Tambah Galeri Video</h3>
                <div style={formGrid}>
                  <FormInput label="Judul Video" placeholder="Judul video..." />
                  <FormInput label="Link URL Video" placeholder="https://youtube.com/watch?v=..." />
                  <button style={{ ...submitBtn, gridColumn: 'span 2' }}>Simpan Video</button>
                </div>
              </div>
            ) : activeMenu === 'produk' ? (
              <div style={{ padding: '30px' }}>
                <h3 style={sectionTitle}>🎨 Manajemen Karya WBP</h3>
                <div style={formGrid}>
                  <FormInput label="Nama Produk" placeholder="Nama barang karya WBP" />
                  <FormInput label="Harga (Rp)" placeholder="Masukkan nominal harga" />
                  <div style={{ gridColumn: 'span 2' }}><FormInput label="Upload Foto Produk" type="file" accept="image/*" /></div>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={labelStyled}>Deskripsi Produk</label>
                    <textarea style={{ ...inputStyled, height: '80px', width: '100%' }} placeholder="Detail produk..."></textarea>
                  </div>
                  <button style={{ ...submitBtn, gridColumn: 'span 2' }}>Tambah Produk Karya</button>
                </div>
              </div>
            ) : null}
          </div>
        </main>n
      </div>
    </div>
  );
}

const formGrid = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' };
const sectionTitle = { marginBottom: '25px', color: '#093661', display: 'flex', alignItems: 'center', gap: '10px' };
const labelStyled = { fontSize: '13px', fontWeight: '600', color: '#4A5568', marginBottom: '8px', display: 'block' };
const navTitle: any = { fontSize: '10px', fontWeight: '800', color: '#CBD5E0', margin: '25px 0 10px 15px', letterSpacing: '1px' };
const avatarCircle: any = { width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#093661', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 };
const exitBtn: any = { padding: '8px 15px', backgroundColor: '#FFF5F5', color: '#E53E3E', border: '1px solid #FED7D7', borderRadius: '8px', fontSize: '12px', cursor: 'pointer', fontWeight: '600' };
const topHeaderStyle: any = { height: '75px', backgroundColor: '#FFF', borderBottom: '1px solid #EBEBEB', padding: '0 30px', display: 'flex', alignItems: 'center', gap: '20px', flexShrink: 0 };
const statsGrid: any = { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' };
const contentCard: any = { backgroundColor: 'white', borderRadius: '20px', border: '1px solid #EBEBEB', minHeight: '400px', marginBottom: '40px' };
const inputStyled: any = { width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #E2E8F0', outline: 'none', fontSize: '14px', fontFamily: 'inherit', boxSizing: 'border-box' as const };
const submitBtn: any = { padding: '14px', backgroundColor: '#093661', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' };
const glassBanner: any = { background: 'linear-gradient(135deg, #4680FF 0%, #0046E5 100%)', borderRadius: '20px', padding: '45px', color: 'white', position: 'relative', overflow: 'hidden', marginBottom: '30px' };
const glassCircle1: any = { position: 'absolute', top: '-20px', right: '-20px', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' };
const glassCircle2: any = { position: 'absolute', bottom: '-40px', left: '20%', width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' };

function NavItem({ active, onClick, icon, label }: any) {
  return (
    <div onClick={onClick} style={{
      padding: '12px 18px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '15px',
      marginBottom: '5px', transition: '0.3s',
      backgroundColor: active ? '#F0F4FF' : 'transparent',
      color: active ? '#093661' : '#5B6B79',
      fontWeight: active ? '700' : '400'
    }}>
      <span style={{ fontSize: '18px' }}>{icon}</span><span style={{ fontSize: '14px' }}>{label}</span>
    </div>
  );
}

function FormInput({ label, ...props }: any) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <label style={labelStyled}>{label}</label>
      <input style={inputStyled} {...props} />
    </div>
  );
}

function StatCard({ label, value, sub, color }: any) {
  return (
    <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '16px', border: '1px solid #EBEBEB' }}>
      <p style={{ margin: 0, fontSize: '11px', fontWeight: 'bold', color: '#A0AEC0', letterSpacing: '1px' }}>{label}</p>
      <h2 style={{ margin: '10px 0', fontSize: '28px', color: '#2D3748' }}>{value} <span style={{ fontSize: '14px', color: '#CBD5E0', fontWeight: 'normal' }}>{sub}</span></h2>
      <div style={{ height: '4px', background: '#F0F2F5', borderRadius: '2px' }}><div style={{ width: '60%', height: '100%', background: color, borderRadius: '2px' }}></div></div>
    </div>
  );
}