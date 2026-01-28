"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabase';
import DashboardHome from './DashboardHome';
import PengaduanMenu from './PengaduanMenu';
import WBPMenu from './WBPMenu'; 
import BeritaMenu from './BeritaMenu';
import FotoMenu from './FotoMenu';
import VideoMenu from './VideoMenu';
import ProdukMenu from './ProdukMenu'; 

interface NavItemProps {
  active: boolean;
  onClick: () => void;
  icon: string;
  label: string;
}

interface StatCardProps {
  label: string;
  value: string;
  sub: string;
  color: string;
}

export default function RutanSinjaiDashboard() {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const router = useRouter();
  const [activeExit, setActiveExit] = useState(false);
  const [judulBerita, setJudulBerita] = useState('');
  const [isiBerita, setIsiBerita] = useState('');
  const [kategoriBerita, setKategoriBerita] = useState('Informasi'); 
  const [fileGambar, setFileGambar] = useState<File | null>(null);
  const [pengaduanForm, setPengaduanForm] = useState({ pelapor: '', kontak: '', isi: '' });
  const [wbpForm, setWbpForm] = useState({ nama: '', nik: '', kasus: '', lama_pidana: '', ekspirasi: '', blok_kamar: '' });
  const [daftarPengaduan, setDaftarPengaduan] = useState<any[]>([]);
  const [daftarBerita, setDaftarBerita] = useState<any[]>([]);
  const [daftarWBP, setDaftarWBP] = useState<any[]>([]);
  const [daftarKarya, setDaftarKarya] = useState<any[]>([]);

  useEffect(() => {
    fetchBerita();
    fetchWBP();
    fetchPengaduan();
    fetchKarya();
  }, []);

  const fetchPengaduan = async () => {
    const { data } = await supabase.from('daftar_pengaduan').select('*').order('id', { ascending: false });
    if (data) setDaftarPengaduan(data);
  };

  const fetchBerita = async () => {
    const { data } = await supabase.from('daftar_berita').select('*').order('id', { ascending: false });
    if (data) setDaftarBerita(data);
  };

  const fetchWBP = async () => {
    const { data } = await supabase.from('daftar_wbp').select('*').order('id', { ascending: false });
    if (data) setDaftarWBP(data);
  };

  const fetchKarya = async () => {
    const { data } = await supabase.from('daftar_karya').select('*').order('id', { ascending: false });
    if (data) setDaftarKarya(data);
  };

  const handlePublikasiBerita = async () => {
    if (!judulBerita || !isiBerita) { alert("Silahkan isi judul dan konten berita"); return; }
    let publicUrl = '/assets/berita1.png';
    if (fileGambar) {
      const fileExt = fileGambar.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `berita/${fileName}`;
      const { error: uploadError } = await supabase.storage.from('images').upload(filePath, fileGambar);
      if (uploadError) { alert("Gagal upload gambar, pastikan bucket 'images' sudah publik"); return; }
      const { data: urlData } = supabase.storage.from('images').getPublicUrl(filePath);
      publicUrl = urlData.publicUrl;
    }
    const { error } = await supabase.from('daftar_berita').insert([{ judul: judulBerita, isi: isiBerita, konten: isiBerita, tanggal: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }), status: kategoriBerita, img: publicUrl }]);
    if (!error) { alert("Berita sudah Online!"); setJudulBerita(''); setIsiBerita(''); setKategoriBerita('Informasi'); setFileGambar(null); fetchBerita(); }
  };

  const handleSimpanWBP = async () => {
    const { error } = await supabase.from('daftar_wbp').insert([{ nama: wbpForm.nama, nik: wbpForm.nik, kasus: wbpForm.kasus, lama_pidana: wbpForm.lama_pidana, ekspirasi: wbpForm.ekspirasi, blok_kamar: wbpForm.blok_kamar }]);
    if (!error) { alert("Data WBP Berhasil Disimpan ke Cloud!"); setWbpForm({ nama: '', nik: '', kasus: '', lama_pidana: '', ekspirasi: '', blok_kamar: '' }); fetchWBP(); }
  };

  const handleSimpanPengaduan = async () => {
    const { error } = await supabase.from('daftar_pengaduan').insert([{ pelapor: pengaduanForm.pelapor, kontak: pengaduanForm.kontak, isi: pengaduanForm.isi, status: 'Pending' }]);
    if (!error) { alert("Pengaduan Berhasil Disimpan!"); setPengaduanForm({ pelapor: '', kontak: '', isi: '' }); fetchPengaduan(); }
  };

  const handleDelete = async (id: number, table: string) => {
    if (confirm("Hapus data ini secara permanen?")) {
      const { error } = await supabase.from(table).delete().eq('id', id);
      if (!error) {
        if (table === 'daftar_berita') fetchBerita();
        else if (table === 'daftar_wbp') fetchWBP();
        else if (table === 'daftar_karya') fetchKarya();
        else fetchPengaduan();
      }
    }
  };

  const toggleStatusBerita = async (id: number, currentStatus: string) => {
    const newStatus = currentStatus === 'Informasi' ? 'Wawasan' : 'Informasi';
    const { error } = await supabase.from('daftar_berita').update({ status: newStatus }).eq('id', id);
    if (!error) fetchBerita();
  };

  const toggleStatusPengaduan = async (id: number, currentStatus: string) => {
    const newStatus = currentStatus === 'Pending' ? 'Proses' : 'Pending';
    const { error } = await supabase.from('daftar_pengaduan').update({ status: newStatus }).eq('id', id);
    if (!error) fetchPengaduan();
  };

  return (
    <div style={{ display: 'flex', height: '96vh', width: '100vw', backgroundColor: '#F4F7FE', overflow: 'hidden', fontFamily: "'Inter', sans-serif" }}>
      <aside style={{ width: isSidebarVisible ? '210px' : '0px', backgroundColor: '#FFFFFF', borderRight: isSidebarVisible ? '1px solid #EBEBEB' : 'none', display: 'flex', flexDirection: 'column', zIndex: 1000, transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)', overflow: 'hidden', flexShrink: 0 }}>
        <div style={{ padding: '10px 30px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left', gap: '0px', flexShrink: 0, backgroundColor: '#FFF' }}>
          <img src="/assets/logo.png" alt="Logo Rutan" style={{ width: '90px', height: '90px', objectFit: 'contain' }} />
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#093661', margin: 1 }}>Rutan Kelas II B</h2>
            <p style={{ fontSize: '15px', color: '#A0AEC0', margin: 1 }}>Sinjai</p>
          </div>
        </div>
        <nav style={{ flex: 1, padding: '10px 15px', overflowY: 'auto', backgroundColor: '#FFF' }}>
          <p style={navTitle}>UTAMA</p>
          <NavItem active={activeMenu === 'dashboard'} onClick={() => setActiveMenu('dashboard')} icon="📊" label="Dashboard" />
          <p style={navTitle}>LAYANAN</p>
          <NavItem active={activeMenu === 'pengaduan'} onClick={() => setActiveMenu('pengaduan')} icon="📩" label="Pengaduan" />
          <p style={navTitle}>DATA WBP</p>
          <NavItem active={activeMenu === 'wbp'} onClick={() => setActiveMenu('wbp')} icon="👥" label="Data Narapidana" />
          <NavItem active={activeMenu === 'berita'} onClick={() => setActiveMenu('berita')} icon="📰" label="Update Berita" />
          <p style={navTitle}>MEDIA & GALERI</p>
          <NavItem active={activeMenu === 'foto'} onClick={() => setActiveMenu('foto')} icon="📸" label="Galeri Foto" />
          <NavItem active={activeMenu === 'video'} onClick={() => setActiveMenu('video')} icon="🎥" label="Galeri Video" />
          <NavItem active={activeMenu === 'produk'} onClick={() => setActiveMenu('produk')} icon="🎨" label="Karya WBP" />
        </nav>
        <div style={{ padding: '20px', borderTop: '1px solid #F1F1F1', display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#FFF', flexShrink: 0, zIndex: 10 }}>
          <div style={avatarCircle}>SA</div>
          <div style={{ flex: 1 }}><div style={{ fontSize: '13px', fontWeight: 'bold', color: '#2D3748' }}>Staf Admin</div></div>
          <button onMouseDown={() => setActiveExit(true)} onMouseUp={() => setActiveExit(false)} onClick={() => router.push('/admin')} style={{ ...exitBtn, transform: activeExit ? 'scale(0.92)' : 'scale(1)', backgroundColor: activeExit ? '#FED7D7' : '#FFF5F5' }}>Keluar</button>
        </div>
      </aside>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
        <header style={{ ...topHeaderStyle, position: 'sticky', top: 0, zIndex: 900, boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
          <span onClick={() => setIsSidebarVisible(!isSidebarVisible)} style={{ cursor: 'pointer', fontSize: '22px', color: '#093661' }}>☰</span>
          <div style={{ fontSize: '14px', color: '#666', fontWeight: '500' }}>Dashboard Manajemen Data & Informasi – Rutan Kelas IIB Sinjai</div>
        </header>

        <main style={{ flex: 1, overflowY: 'auto', padding: '30px' }}>
          <div style={glassBanner}>
            <div style={{ position: 'relative', zIndex: 2 }}>
              <h2 style={{ margin: '0 0 10px 0', fontSize: '26px', fontWeight: 'bold' }}>Sistem Informasi</h2>
              <p style={{ margin: 0, opacity: 0.9, fontSize: '14px' }}>Manajemen data warga binaan yang modern dan transparan.</p>
            </div>
            <div style={glassCircle1}></div><div style={glassCircle2}></div>
          </div>

          <div style={statsGrid}>
            <StatCard label="TOTAL PENGHUNI" value={daftarWBP.length.toString()} sub="Orang" color="#4680FF" />
            <StatCard label="PENGUNJUNG" value="110" sub="Bulan Ini" color="#FFB811" />
            <StatCard label="PRODUK KARYA" value={daftarKarya.length.toString()} sub="Unit" color="#2ECC71" />
            <StatCard label="BERITA" value={daftarBerita.length.toString()} sub="Total" color="#E74C3C" />
          </div>

          <div style={contentCard}>
            {activeMenu === 'dashboard' && <DashboardHome setActiveMenu={setActiveMenu} daftarWBP={daftarWBP} daftarPengaduan={daftarPengaduan} daftarBerita={daftarBerita} />}
            {activeMenu === 'pengaduan' && <PengaduanMenu pengaduanForm={pengaduanForm} setPengaduanForm={setPengaduanForm} handleSimpanPengaduan={handleSimpanPengaduan} daftarPengaduan={daftarPengaduan} toggleStatusPengaduan={toggleStatusPengaduan} handleDelete={handleDelete} />}
            {activeMenu === 'wbp' && <WBPMenu wbpForm={wbpForm} setWbpForm={setWbpForm} handleSimpanWBP={handleSimpanWBP} daftarWBP={daftarWBP} handleDelete={handleDelete} />}
            {activeMenu === 'berita' && <BeritaMenu judulBerita={judulBerita} setJudulBerita={setJudulBerita} kategoriBerita={kategoriBerita} setKategoriBerita={setKategoriBerita} setFileGambar={setFileGambar} isiBerita={isiBerita} setIsiBerita={setIsiBerita} handlePublikasiBerita={handlePublikasiBerita} daftarBerita={daftarBerita} toggleStatusBerita={toggleStatusBerita} handleDelete={handleDelete} />}
            {activeMenu === 'foto' && <FotoMenu />}
            {activeMenu === 'video' && <VideoMenu />}
            {activeMenu === 'produk' && <ProdukMenu daftarKarya={daftarKarya} fetchKarya={fetchKarya} handleDelete={handleDelete} />}
          </div>
        </main>
      </div>
    </div>
  );
}

function NavItem({ active, onClick, icon, label }: NavItemProps) {
  return (
    <div onClick={onClick} style={{ padding: '12px 18px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '5px', backgroundColor: active ? '#F0F4FF' : 'transparent', color: active ? '#093661' : '#5B6B79', fontWeight: active ? '700' : '400' }}>
      <span style={{ fontSize: '18px' }}>{icon}</span><span style={{ fontSize: '14px' }}>{label}</span>
    </div>
  );
}

function StatCard({ label, value, sub, color }: StatCardProps) {
  return (
    <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '16px', border: '1px solid #EBEBEB' }}>
      <p style={{ margin: 0, fontSize: '11px', fontWeight: 'bold', color: '#A0AEC0' }}>{label}</p>
      <h2 style={{ margin: '10px 0', fontSize: '28px', color: '#2D3748' }}>{value} <span style={{ fontSize: '14px', color: '#CBD5E0' }}>{sub}</span></h2>
      <div style={{ height: '4px', background: '#F0F2F5', borderRadius: '2px' }}><div style={{ width: '60%', height: '100%', background: color, borderRadius: '2px' }}></div></div>
    </div>
  );
}

const navTitle: React.CSSProperties = { fontSize: '10px', fontWeight: '800', color: '#CBD5E0', margin: '25px 0 10px 15px', letterSpacing: '1px' };
const avatarCircle: React.CSSProperties = { width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#093661', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 };
const exitBtn: React.CSSProperties = { padding: '8px 15px', backgroundColor: '#FFF5F5', color: '#E53E3E', border: '1px solid #FED7D7', borderRadius: '8px', fontSize: '12px', cursor: 'pointer', fontWeight: '600' };
const topHeaderStyle: React.CSSProperties = { height: '75px', backgroundColor: '#FFF', borderBottom: '1px solid #EBEBEB', padding: '0 30px', display: 'flex', alignItems: 'center', gap: '20px', flexShrink: 0 };
const statsGrid: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' };
const contentCard: React.CSSProperties = { backgroundColor: 'white', borderRadius: '20px', border: '1px solid #EBEBEB', minHeight: '400px', marginBottom: '40px' };
const glassBanner: React.CSSProperties = { background: 'linear-gradient(135deg, #4680FF 0%, #0046E5 100%)', borderRadius: '20px', padding: '45px', color: 'white', position: 'relative', overflow: 'hidden', marginBottom: '30px' };
const glassCircle1: React.CSSProperties = { position: 'absolute', top: '-20px', right: '-20px', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' };
const glassCircle2: React.CSSProperties = { position: 'absolute', bottom: '-30px', left: '10%', width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' };