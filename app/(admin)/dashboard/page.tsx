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

interface NavItemProps { active: boolean; onClick: () => void; icon: string; label: string; }
interface StatCardProps { label: string; value: string; sub: string; color: string; isMobile: boolean; }

export default function RutanSinjaiDashboard() {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const [activeExit, setActiveExit] = useState(false);
  const [judulBerita, setJudulBerita] = useState('');
  const [isiBerita, setIsiBerita] = useState('');
  const [kategoriBerita, setKategoriBerita] = useState('Informasi'); 
  const [fileGambar, setFileGambar] = useState<File | null>(null);
  const [pengaduanForm, setPengaduanForm] = useState({ pelapor: '', kontak: '', isi: '' });
  
  const [wbpForm, setWbpForm] = useState({ 
    nama: '', nik: '', kasus: '', lama_pidana: '', ekspirasi: '', blok_kamar: '', status_wbp: 'Narapidana' 
  });

  const [daftarPengaduan, setDaftarPengaduan] = useState<any[]>([]);
  const [daftarBerita, setDaftarBerita] = useState<any[]>([]);
  const [daftarWBP, setDaftarWBP] = useState<any[]>([]);
  const [daftarKarya, setDaftarKarya] = useState<any[]>([]);
  const [daftarFoto, setDaftarFoto] = useState<any[]>([]);
  const [daftarVideo, setDaftarVideo] = useState<any[]>([]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
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
    const payload = { 
        nama: wbpForm.nama, 
        nik: wbpForm.nik, 
        kasus: wbpForm.kasus, 
        lama_pidana: wbpForm.lama_pidana, 
        ekspirasi: wbpForm.ekspirasi || null, 
        blok_kamar: wbpForm.blok_kamar,
        status_wbp: wbpForm.status_wbp 
    };
    const { error } = await supabase.from('daftar_wbp').insert([payload]);
    if (!error) { 
      alert(`Berhasil menyimpan data ${wbpForm.status_wbp}`); 
      setWbpForm({ 
        nama: '', nik: '', kasus: '', lama_pidana: '', 
        ekspirasi: '', blok_kamar: '', status_wbp: 'Narapidana' 
      }); 
      fetchWBP(); 
    } else {
      alert("Error: " + error.message);
    }
  };

  const handleUpdateWBP = async (data: any) => {
    const { error } = await supabase
      .from('daftar_wbp')
      .update({
        nama: data.nama,
        nik: data.nik,
        kasus: data.kasus,
        lama_pidana: data.lama_pidana,
        ekspirasi: data.ekspirasi,
        blok_kamar: data.blok_kamar,
        status_wbp: data.status_wbp
      })
      .eq('id', data.id);

    if (!error) {
      alert("Data berhasil diperbarui!");
      fetchWBP();
    } else {
      alert("Gagal memperbarui: " + error.message);
    }
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
    <div style={{ display: 'flex', height: '100vh', width: '100vw', backgroundColor: '#F4F7FE', overflow: 'hidden', fontFamily: "'Inter', sans-serif", position: 'fixed', top: 0, left: 0 }}>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      {isMobile && isSidebarVisible && (
        <div onClick={() => setIsSidebarVisible(false)} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 999 }}></div>
      )}

      <aside style={{ width: isSidebarVisible ? '210px' : '0px', backgroundColor: '#FFFFFF', borderRight: isSidebarVisible ? '1px solid #EBEBEB' : 'none', display: 'flex', flexDirection: 'column', zIndex: 1000, transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)', overflow: 'hidden', flexShrink: 0, position: isMobile ? 'fixed' : 'relative', height: '100vh' }}>
        <div style={{ width: '210px', height: '100%', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '27px 27px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left', gap: '0px', flexShrink: 0, backgroundColor: '#FFF' }}>
            <img src="/assets/logo.png" alt="Logo Rutan" style={{ width: '100px', height: '100px', objectFit: 'contain' }} />
            <div>
              <h2 style={{ fontSize: '17px', fontWeight: '800', color: '#093661', margin: 3 }}>Rutan Kelas II B</h2>
              <p style={{ fontSize: '17px', color: '#A0AEC0', margin: 3 }}>Sinjai</p>
            </div>
          </div>
          <nav style={{ flex: 1, padding: '20px 15px', overflowY: 'auto', backgroundColor: '#FFF' }}>
            <NavItem active={activeMenu === 'dashboard'} onClick={() => { setActiveMenu('dashboard'); if(isMobile) setIsSidebarVisible(false); }} icon="fa-solid fa-chart-line" label="Dashboard" />
            <NavItem active={activeMenu === 'pengaduan'} onClick={() => { setActiveMenu('pengaduan'); if(isMobile) setIsSidebarVisible(false); }} icon="fa-solid fa-envelope-open-text" label="Pengaduan" />
            <NavItem active={activeMenu === 'wbp'} onClick={() => { setActiveMenu('wbp'); if(isMobile) setIsSidebarVisible(false); }} icon="fa-solid fa-users-rectangle" label="Data WBP" />
            <NavItem active={activeMenu === 'berita'} onClick={() => { setActiveMenu('berita'); if(isMobile) setIsSidebarVisible(false); }} icon="fa-solid fa-newspaper" label="Update Berita" />
            <NavItem active={activeMenu === 'produk'} onClick={() => { setActiveMenu('produk'); if(isMobile) setIsSidebarVisible(false); }} icon="fa-solid fa-palette" label="Karya WBP" />
            <NavItem active={activeMenu === 'foto'} onClick={() => { setActiveMenu('foto'); if(isMobile) setIsSidebarVisible(false); }} icon="fa-solid fa-image" label="Galeri Foto" />
            <NavItem active={activeMenu === 'video'} onClick={() => { setActiveMenu('video'); if(isMobile) setIsSidebarVisible(false); }} icon="fa-solid fa-video" label="Galeri Video" />
          </nav>
          <div style={{ padding: '20px 15px', borderTop: '1px solid #F1F1F1', display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#FFF', flexShrink: 0 }}>
            <div style={avatarCircle}>AD</div>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#2D3748', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Staf Admin</div>
            </div>
            <button onMouseDown={() => setActiveExit(true)} onMouseUp={() => setActiveExit(false)} onClick={() => router.push('/admin')} style={{ ...exitBtn, transform: activeExit ? 'scale(0.92)' : 'scale(1)' }}>Keluar</button>
          </div>
        </div>
      </aside>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', height: '100vh' }}>
        <header style={{ ...topHeaderStyle, height: isMobile ? '60px' : '75px', padding: isMobile ? '0 15px' : '0 30px', flexShrink: 0 }}>
          <span onClick={() => setIsSidebarVisible(!isSidebarVisible)} style={{ cursor: 'pointer', fontSize: '22px', color: '#093661' }}><i className="fa-solid fa-bars"></i></span>
          <div style={{ fontSize: isMobile ? '12px' : '14px', color: '#666', fontWeight: '500', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            Dashboard Manajemen Data & Informasi – Rutan Kelas IIB Sinjai
          </div>
        </header>

        <main style={{ flex: 1, overflowY: 'auto', padding: isMobile ? '15px' : '30px', backgroundColor: '#F4F7FE' }}>
          <div style={{ ...glassBanner, padding: isMobile ? '25px' : '45px' }}>
            <div style={{ position: 'relative', zIndex: 2 }}>
              <h2 style={{ margin: '0 0 10px 0', fontSize: isMobile ? '20px' : '26px', fontWeight: 'bold' }}>Sistem Informasi</h2>
              <p style={{ margin: 0, opacity: 0.9, fontSize: isMobile ? '12px' : '14px' }}>Manajemen data warga binaan yang modern dan transparan.</p>
            </div>
            <div style={glassCircle1}></div><div style={glassCircle2}></div>
          </div>

          <div style={contentCard}>
            {activeMenu === 'dashboard' && <DashboardHome setActiveMenu={setActiveMenu} daftarWBP={daftarWBP} daftarPengaduan={daftarPengaduan} daftarBerita={daftarBerita} />}
            {activeMenu === 'pengaduan' && <PengaduanMenu pengaduanForm={pengaduanForm} setPengaduanForm={setPengaduanForm} handleSimpanPengaduan={handleSimpanPengaduan} daftarPengaduan={daftarPengaduan} toggleStatusPengaduan={toggleStatusPengaduan} handleDelete={handleDelete} />}
            {activeMenu === 'wbp' && <WBPMenu wbpForm={wbpForm} setWbpForm={setWbpForm} handleSimpanWBP={handleSimpanWBP} daftarWBP={daftarWBP} handleDelete={handleDelete} handleUpdate={handleUpdateWBP} />}
            {activeMenu === 'berita' && <BeritaMenu judulBerita={judulBerita} setJudulBerita={setJudulBerita} kategoriBerita={kategoriBerita} setKategoriBerita={setKategoriBerita} setFileGambar={setFileGambar} isiBerita={isiBerita} setIsiBerita={setIsiBerita} handlePublikasiBerita={handlePublikasiBerita} daftarBerita={daftarBerita} toggleStatusBerita={toggleStatusBerita} handleDelete={handleDelete} />}
            {activeMenu === 'foto' && <FotoMenu daftarFoto={daftarFoto} fetchFoto={fetchFoto} handleDelete={handleDelete} />}
            {activeMenu === 'video' && <VideoMenu daftarVideo={daftarVideo} fetchVideo={fetchVideo} handleDelete={handleDelete} />}
            {activeMenu === 'produk' && <ProdukMenu daftarKarya={daftarKarya} fetchKarya={fetchKarya} handleDelete={handleDelete} />}
          </div>
        </main>
      </div>
    </div>
  );
}

function NavItem({ active, onClick, icon, label }: NavItemProps) {
  return (
    <div onClick={onClick} style={{ padding: '12px 18px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '5px', backgroundColor: active ? '#F0F4FF' : 'transparent', color: active ? '#093661' : '#5B6B79', fontWeight: active ? '700' : '400', whiteSpace: 'nowrap', transition: 'all 0.3s ease' }}>
      <i className={icon} style={{ fontSize: '18px', width: '20px', textAlign: 'center' }}></i>
      <span style={{ fontSize: '14px' }}>{label}</span>
    </div>
  );
}

const avatarCircle: React.CSSProperties = { width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#093661', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 };
const exitBtn: React.CSSProperties = { padding: '8px 15px', backgroundColor: '#FFF5F5', color: '#E53E3E', border: '1px solid #FED7D7', borderRadius: '8px', fontSize: '12px', cursor: 'pointer', fontWeight: '600' };
const topHeaderStyle: React.CSSProperties = { backgroundColor: '#FFF', borderBottom: '1px solid #EBEBEB', display: 'flex', alignItems: 'center', gap: '20px', flexShrink: 0 };
const contentCard: React.CSSProperties = { backgroundColor: 'white', borderRadius: '20px', border: '1px solid #EBEBEB', minHeight: '400px', marginBottom: '40px' };
const glassBanner: React.CSSProperties = { background: 'linear-gradient(135deg, #093661 0%, #0046E5 100%)', borderRadius: '20px', color: 'white', position: 'relative', overflow: 'hidden', marginBottom: '30px' };
const glassCircle1: React.CSSProperties = { position: 'absolute', top: '-20px', right: '-20px', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' };
const glassCircle2: React.CSSProperties = { position: 'absolute', bottom: '-30px', left: '10%', width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' };