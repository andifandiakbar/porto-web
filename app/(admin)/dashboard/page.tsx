"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabase';
import DashboardHome from './DashboardHome';
import PengaduanMenu from './PengaduanMenu';
import WBPMenu from './WBPMenu'; 
import RunningTextMenu from './RunningTextMenu';
import BeritaMenu from './BeritaMenu';
import FotoMenu from './FotoMenu';
import VideoMenu from './VideoMenu';
import ProdukMenu from './ProdukMenu'; 
import Profil from './Profil';
import PtspMenu from './PtspMenu';
import BannerMenu from './BannerMenu';

interface NavItemProps { active: boolean; onClick: () => void; icon: string; label: string; }

export default function RutanSinjaiDashboard() {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const [activeExit, setActiveExit] = useState(false);
  const [isExitHover, setIsExitHover] = useState(false);
  const [judulBerita, setJudulBerita] = useState('');
  const [isiBerita, setIsiBerita] = useState('');
  const [kategoriBerita, setKategoriBerita] = useState('Informasi'); 
  const [fileGambar, setFileGambar] = useState<File | null>(null);
  const [pengaduanForm, setPengaduanForm] = useState({ pelapor: '', kontak: '', isi: '' });
  
  const [wbpForm, setWbpForm] = useState({ 
    nama: '', jenis_kelamin: '', nik: '', kasus: '', lama_pidana: '', ekspirasi: '', blok_kamar: '', status_wbp: 'Narapidana', foto: null 
  });

  const [daftarPengaduan, setDaftarPengaduan] = useState<any[]>([]);
  const [daftarBerita, setDaftarBerita] = useState<any[]>([]);
  const [daftarWBP, setDaftarWBP] = useState<any[]>([]);
  const [daftarKarya, setDaftarKarya] = useState<any[]>([]);
  const [daftarFoto, setDaftarFoto] = useState<any[]>([]);
  const [daftarVideo, setDaftarVideo] = useState<any[]>([]);
  const [daftarBanner, setDaftarBanner] = useState<any[]>([]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 1024;
      setIsMobile(mobile);
      setIsSidebarVisible(!mobile);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetchBerita();
    fetchWBP();
    fetchPengaduan();
    fetchKarya();
    fetchFoto();
    fetchVideo();
    fetchBanner();
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

  const fetchFoto = async () => {
    const { data } = await supabase.from('daftar_foto').select('*').order('id', { ascending: false });
    if (data) setDaftarFoto(data);
  };

  const fetchVideo = async () => {
    const { data } = await supabase.from('daftar_video').select('*').order('id', { ascending: false });
    if (data) setDaftarVideo(data);
  };

  const fetchBanner = async () => {
    const { data } = await supabase.from('daftar_banner').select('*').order('id', { ascending: false });
    if (data) setDaftarBanner(data);
  };

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/wbp/logout', { method: 'POST' });
      if (res.ok) {
        router.push('/admin');
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePublikasiBerita = async () => {
    if (!judulBerita || !isiBerita) { alert("Silahkan isi judul dan konten berita"); return; }
    let publicUrl = '/assets/berita1.png';
    if (fileGambar) {
      const fileExt = fileGambar.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `berita/${fileName}`;
      const { error: uploadError } = await supabase.storage.from('images').upload(filePath, fileGambar);
      if (uploadError) { alert("Gagal upload gambar"); return; }
      const { data: urlData } = supabase.storage.from('images').getPublicUrl(filePath);
      publicUrl = urlData.publicUrl;
    }
    const { error } = await supabase.from('daftar_berita').insert([{ judul: judulBerita, isi: isiBerita, konten: isiBerita, tanggal: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }), status: kategoriBerita, img: publicUrl }]);
    if (!error) { alert("Berita Online!"); setJudulBerita(''); setIsiBerita(''); setKategoriBerita('Informasi'); setFileGambar(null); fetchBerita(); }
  };

  const handleSimpanWBP = async () => {
    if(!wbpForm.nama) { alert("Nama wajib diisi"); return; }
    let publicUrl = '';
    if (wbpForm.foto && (wbpForm.foto as any).name) {
      const file = wbpForm.foto as File;
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `wbp/${fileName}`;
      const { error: uploadError } = await supabase.storage.from('images').upload(filePath, file);
      if (uploadError) { alert("Gagal upload foto: " + uploadError.message); return; }
      const { data: urlData } = supabase.storage.from('images').getPublicUrl(filePath);
      publicUrl = urlData.publicUrl;
    }
    const payload = { 
        nama: wbpForm.nama, 
        jenis_kelamin: wbpForm.jenis_kelamin || null,
        nik: wbpForm.nik, 
        kasus: wbpForm.kasus, 
        lama_pidana: wbpForm.lama_pidana, 
        ekspirasi: wbpForm.ekspirasi || null, 
        blok_kamar: wbpForm.blok_kamar,
        status_wbp: wbpForm.status_wbp,
        foto_url: publicUrl
    };
    const { error } = await supabase.from('daftar_wbp').insert([payload]);
    if (!error) { 
      alert(`Berhasil menyimpan data ${wbpForm.status_wbp}`); 
      setWbpForm({ nama: '', jenis_kelamin: '', nik: '', kasus: '', lama_pidana: '', ekspirasi: '', blok_kamar: '', status_wbp: 'Narapidana', foto: null }); 
      fetchWBP(); 
    } else { alert("Error: " + error.message); }
  };

  const handleUpdateWBP = async (data: any) => {
    const { error } = await supabase.from('daftar_wbp').update({ nama: data.nama, jenis_kelamin: data.jenis_kelamin, nik: data.nik, kasus: data.kasus, lama_pidana: data.lama_pidana, ekspirasi: data.ekspirasi, blok_kamar: data.blok_kamar, status_wbp: data.status_wbp, foto_url: data.foto_url }).eq('id', data.id);
    if (!error) { alert("Data berhasil diperbarui!"); fetchWBP(); } else { alert("Gagal memperbarui: " + error.message); }
  };

  const handleSimpanPengaduan = async () => {
    const { error } = await supabase.from('daftar_pengaduan').insert([{ pelapor: pengaduanForm.pelapor, kontak: pengaduanForm.kontak, isi: pengaduanForm.isi, status: 'Pending' }]);
    if (!error) { alert("Pengaduan Disimpan!"); setPengaduanForm({ pelapor: '', kontak: '', isi: '' }); fetchPengaduan(); }
  };

  const handleDelete = async (id: number, table: string) => {
    if (confirm("Hapus data ini?")) {
      const { error } = await supabase.from(table).delete().eq('id', id);
      if (!error) {
        if (table === 'daftar_berita') fetchBerita();
        else if (table === 'daftar_wbp') fetchWBP();
        else if (table === 'daftar_karya') fetchKarya();
        else if (table === 'daftar_foto') fetchFoto();
        else if (table === 'daftar_video') fetchVideo();
        else if (table === 'daftar_banner') fetchBanner();
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

  const getMenuLabel = () => {
    const labels: Record<string, string> = {
        dashboard: "Dashboard",
        profil: "Profil",
        banner: "Banner Header",
        wbp: "Data WBP",
        ptsp: "Pelayanan PTSP",
        pengaduan: "Pengaduan",
        runningtext: "Running Text",
        berita: "Update Berita",
        produk: "Karya WBP",
        foto: "Galeri Foto",
        video: "Galeri Video"
    };
    return labels[activeMenu] || "Dashboard";
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', backgroundColor: '#F4F7FE', overflow: 'hidden', fontFamily: '"Inter", "Roboto", "Segoe UI", sans-serif', position: 'fixed', top: 0, left: 0 }}>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" />
      
      {isMobile && isSidebarVisible && (
        <div onClick={() => setIsSidebarVisible(false)} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.2)', zIndex: 999, backdropFilter: 'blur(5px)' }}></div>
      )}

      <aside style={{ width: isSidebarVisible ? '260px' : '0px', backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column', zIndex: 1000, transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)', overflow: 'hidden', flexShrink: 0, position: isMobile ? 'fixed' : 'relative', height: '100vh', borderRight: '0px solid #E2E8F0' }}>
        <div style={{ width: '260px', height: '100%', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '10px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '0px', flexShrink: 0, backgroundColor: '#FFF' }}>
            <img src="/assets/logo.png" alt="Logo Rutan" style={{ width: '90px', height: '70px', objectFit: 'contain' }} />
            <div style={{ marginTop: '1px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#093b77', margin: '0 0 2px 0', letterSpacing: '-0.3px' }}>Rutan</h2>
              <p style={{ fontSize: '13px', color: '#093b77', margin: 0, fontWeight: '500' }}>Kelas IIB Sinjai</p>
            </div>
          </div>
          
          <nav style={{ flex: 1, padding: '10px 16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <NavItem active={activeMenu === 'dashboard'} onClick={() => { setActiveMenu('dashboard'); if(isMobile) setIsSidebarVisible(false); }} icon="fa-solid fa-house" label="Dashboard" />
            <NavItem active={activeMenu === 'profil'} onClick={() => { setActiveMenu('profil'); if(isMobile) setIsSidebarVisible(false); }} icon="fa-solid fa-id-card" label="Profil" />
            <NavItem active={activeMenu === 'banner'} onClick={() => { setActiveMenu('banner'); if(isMobile) setIsSidebarVisible(false); }} icon="fa-solid fa-layer-group" label="Banner Header" />
            <NavItem active={activeMenu === 'wbp'} onClick={() => { setActiveMenu('wbp'); if(isMobile) setIsSidebarVisible(false); }} icon="fa-solid fa-folder-open" label="Data WBP" />
            <NavItem active={activeMenu === 'ptsp'} onClick={() => { setActiveMenu('ptsp'); if(isMobile) setIsSidebarVisible(false); }} icon="fa-solid fa-clipboard-user" label="Pelayanan PTSP" />
            <NavItem active={activeMenu === 'pengaduan'} onClick={() => { setActiveMenu('pengaduan'); if(isMobile) setIsSidebarVisible(false); }} icon="fa-solid fa-comment-dots" label="Pengaduan" />
            <NavItem active={activeMenu === 'runningtext'} onClick={() => { setActiveMenu('runningtext'); if(isMobile) setIsSidebarVisible(false); }} icon="fa-solid fa-bullhorn" label="Running Text" />
            <NavItem active={activeMenu === 'berita'} onClick={() => { setActiveMenu('berita'); if(isMobile) setIsSidebarVisible(false); }} icon="fa-solid fa-file-invoice" label="Update Berita" />
            <NavItem active={activeMenu === 'produk'} onClick={() => { setActiveMenu('produk'); if(isMobile) setIsSidebarVisible(false); }} icon="fa-solid fa-bag-shopping" label="Karya WBP" />
            <NavItem active={activeMenu === 'foto'} onClick={() => { setActiveMenu('foto'); if(isMobile) setIsSidebarVisible(false); }} icon="fa-solid fa-images" label="Galeri Foto" />
            <NavItem active={activeMenu === 'video'} onClick={() => { setActiveMenu('video'); if(isMobile) setIsSidebarVisible(false); }} icon="fa-solid fa-clapperboard" label="Galeri Video" />
          </nav>
          
          <div style={{ padding: '20px 24px', borderTop: '0px solid #e1e7f5', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0, backgroundColor: '#FAFBFC' }}>
            <div style={avatarCircle}>AD</div>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <div style={{ fontSize: '14px', fontWeight: '700', color: '#093b77', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Staf Admin</div>
              <div style={{ fontSize: '12px', color: '#1b25596e', fontWeight: '500' }}>Administrator</div>
            </div>
            <button 
                onMouseEnter={() => setIsExitHover(true)}
                onMouseLeave={() => setIsExitHover(false)}
                onMouseDown={() => setActiveExit(true)} 
                onMouseUp={() => setActiveExit(false)} 
                onClick={handleLogout} 
                style={{ 
                    ...exitBtn, 
                    backgroundColor: isExitHover ? '#b2c1d8' : '#E2E8F0',
                    color: '#002d57',
                    transform: activeExit ? 'scale(0.95)' : 'scale(1)', 
                    fontSize: '13px', 
                    fontWeight: '700',
                    cursor: 'pointer'
                }}>
                Keluar
            </button>
          </div>
        </div>
      </aside>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', height: '100vh' }}>
        <header style={{ ...topHeaderStyle, height: '90px', padding: isMobile ? '0 24px' : '0 32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button onClick={() => setIsSidebarVisible(!isSidebarVisible)} style={{ cursor: 'pointer', border: 'none', background: '#FFFFFF', fontSize: '18px', color: '#093661', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              <i className="fa-solid fa-bars"></i>
            </button>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: isMobile ? '18px' : '28px', color: '#093b77', fontWeight: '700', letterSpacing: '-0.5px', marginTop: '2px' }}>Dashboard Admin</div>
            </div>
          </div>
        </header>

        <main style={{ flex: 1, overflowY: 'auto', padding: isMobile ? '20px' : '0 32px 32px 32px', backgroundColor: '#F4F7FE' }}>
          <div style={{ ...glassBanner, padding: isMobile ? '35px 24px' : '40px' }}>
            <div style={{ position: 'relative', zIndex: 2 }}>
              <span style={{ display: 'inline-block', backgroundColor: 'rgba(255,255,255,0.15)', padding: '6px 16px', borderRadius: '20px', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '14px' }}>{getMenuLabel()}</span>
              <h2 style={{ margin: '0 0 6px 0', fontSize: isMobile ? '24px' : '32px', fontWeight: '700', color: '#ebbc00', letterSpacing: '-0.5px' }}>Sistem Informasi Layanan Rutan IIB Sinjai</h2>
              <p style={{ margin: 0, color: 'rgba(255,255,255,0.8)', fontSize: isMobile ? '13px' : '15px', fontWeight: '30', maxWidth: '650px', lineHeight: '1.5' }}>Pusat kendali modern terintegrasi untuk pengelolaan portal data informasi, monitoring pengaduan masyarakat, serta rekapitulasi data warga binaan.</p>
            </div>
            <div style={glassCircle1}></div><div style={glassCircle2}></div>
          </div>

          <div style={contentCard}>
            {activeMenu === 'dashboard' && (
              <DashboardHome 
                setActiveMenu={setActiveMenu} 
                daftarWBP={daftarWBP} 
                daftarPengaduan={daftarPengaduan} 
                daftarBerita={daftarBerita} 
                daftarKarya={daftarKarya} 
                daftarFoto={daftarFoto} 
                daftarVideo={daftarVideo} 
                daftarBanner={daftarBanner} 
              />
            )}
            {activeMenu === 'ptsp' && <PtspMenu />}
            {activeMenu === 'pengaduan' && <PengaduanMenu pengaduanForm={pengaduanForm} setPengaduanForm={setPengaduanForm} handleSimpanPengaduan={handleSimpanPengaduan} daftarPengaduan={daftarPengaduan} toggleStatusPengaduan={toggleStatusPengaduan} handleDelete={handleDelete} />}
            {activeMenu === 'wbp' && <WBPMenu wbpForm={wbpForm} setWbpForm={setWbpForm} handleSimpanWBP={handleSimpanWBP} daftarWBP={daftarWBP} handleDelete={handleDelete} handleUpdate={handleUpdateWBP} setSelectedImage={setSelectedImage} />}
            {activeMenu === 'banner' && <BannerMenu daftarBanner={daftarBanner} fetchBanner={fetchBanner} handleDelete={handleDelete} />}
            {activeMenu === 'berita' && <BeritaMenu judulBerita={judulBerita} setJudulBerita={setJudulBerita} kategoriBerita={kategoriBerita} setKategoriBerita={setKategoriBerita} setFileGambar={setFileGambar} isiBerita={isiBerita} setIsiBerita={setIsiBerita} handlePublikasiBerita={handlePublikasiBerita} daftarBerita={daftarBerita} toggleStatusBerita={toggleStatusBerita} handleDelete={handleDelete} />}
            {activeMenu === 'foto' && <FotoMenu daftarFoto={daftarFoto} fetchFoto={fetchFoto} handleDelete={handleDelete} />}
            {activeMenu === 'video' && <VideoMenu daftarVideo={daftarVideo} fetchVideo={fetchVideo} handleDelete={handleDelete} />}
            {activeMenu === 'produk' && <ProdukMenu daftarKarya={daftarKarya} fetchKarya={fetchKarya} handleDelete={handleDelete} />}
            {activeMenu === 'profil' && <Profil />}
            {activeMenu === 'runningtext' && <RunningTextMenu />}
          </div>
        </main>
      </div>

      {selectedImage && (
        <div onClick={() => setSelectedImage(null)} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(9,54,97,0.8)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out', padding: '20px', backdropFilter: 'blur(8px)' }}>
          <div style={{ position: 'relative', maxWidth: '90%', maxHeight: '90%' }}>
            <img src={selectedImage} alt="Preview" style={{ maxWidth: '100%', maxHeight: '85vh', borderRadius: '20px', boxShadow: '0 30px 60px rgba(0,0,0,0.3)' }} />
          </div>
        </div>
      )}
    </div>
  );
}

function NavItem({ active, onClick, icon, label }: NavItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div 
        onClick={onClick} 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ 
            padding: '14px 22px', 
            borderRadius: '16px', 
            cursor: 'pointer', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '14px', 
            marginBottom: '2px', 
            backgroundColor: active ? '#094985' : isHovered ? '#eef2f7' : 'transparent', 
            color: active ? '#FFFFFF' : isHovered ? '#093661c2' : '#A3AED0', 
            fontWeight: '700', 
            whiteSpace: 'nowrap', 
            transition: 'all 0.2s ease-in-out', 
            position: 'relative' 
        }}>
      <i className={icon} style={{ fontSize: '16px', width: '20px', textAlign: 'center', color: active ? '#FFFFFF' : isHovered ? '#093661' : '#A3AED0', transition: 'all 0.2s' }}></i>
      <span style={{ fontSize: '14px', letterSpacing: '-0.2px' }}>{label}</span>
    </div>
  );
}

const avatarCircle: React.CSSProperties = { width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#093661', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', flexShrink: 0, fontSize: '14px' };
const exitBtn: React.CSSProperties = { padding: '8px 12px', border: 'none', borderRadius: '10px', transition: 'all 0.2s', width: 'auto' };
const topHeaderStyle: React.CSSProperties = { backgroundColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 };
const contentCard: React.CSSProperties = { width: '100%', boxSizing: 'border-box' };
const glassBanner: React.CSSProperties = { background: 'linear-gradient(135deg, #093661 0%, #06233f 100%)', borderRadius: '20px', color: 'white', position: 'relative', overflow: 'hidden', marginBottom: '32px', boxShadow: '0 12px 30px rgba(9,54,97,0.1)' };
const glassCircle2: React.CSSProperties = { position: 'absolute', bottom: '-40px', left: '10%', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)' };
const glassCircle1: React.CSSProperties = { position: 'absolute', top: '-50px', right: '-50px', width: '220px', height: '220px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)' };