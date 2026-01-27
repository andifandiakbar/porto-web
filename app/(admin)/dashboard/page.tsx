"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabase';

export default function RutanSinjaiDashboard() {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const router = useRouter();

  const [activeExit, setActiveExit] = useState(false);

  const [judulBerita, setJudulBerita] = useState('');
  const [isiBerita, setIsiBerita] = useState('');
  const [kategoriBerita, setKategoriBerita] = useState('Informasi'); 
  const [fileGambar, setFileGambar] = useState<File | null>(null);

  const [pengaduanForm, setPengaduanForm] = useState({
    pelapor: '',
    kontak: '',
    isi: ''
  });

  const [wbpForm, setWbpForm] = useState({
    nama: '',
    nik: '',
    kasus: '',
    lama_pidana: '',
    ekspirasi: '',
    blok_kamar: ''
  });

  const [daftarPengaduan, setDaftarPengaduan] = useState<any[]>([]);
  const [daftarBerita, setDaftarBerita] = useState<any[]>([]);
  const [daftarWBP, setDaftarWBP] = useState<any[]>([]);

  useEffect(() => {
    fetchBerita();
    fetchWBP();
    fetchPengaduan();
  }, []);

  const fetchPengaduan = async () => {
    const { data } = await supabase
      .from('daftar_pengaduan')
      .select('*')
      .order('id', { ascending: false });
    if (data) setDaftarPengaduan(data);
  };

  const fetchBerita = async () => {
    const { data } = await supabase
      .from('daftar_berita')
      .select('*')
      .order('id', { ascending: false });
    if (data) setDaftarBerita(data);
  };

  const fetchWBP = async () => {
    const { data } = await supabase
      .from('daftar_wbp')
      .select('*')
      .order('id', { ascending: false });
    if (data) setDaftarWBP(data);
  };

  const handlePublikasiBerita = async () => {
    if (!judulBerita || !isiBerita) {
      alert("Silahkan isi judul dan konten berita");
      return;
    }

    let publicUrl = '/assets/berita1.png';

    if (fileGambar) {
      const fileExt = fileGambar.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `berita/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, fileGambar);

      if (uploadError) {
        alert("Gagal upload gambar, pastikan bucket 'images' sudah publik");
        return;
      }

      const { data: urlData } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);
      
      publicUrl = urlData.publicUrl;
    }

    const { error } = await supabase
      .from('daftar_berita')
      .insert([{ 
        judul: judulBerita, 
        isi: isiBerita, 
        konten: isiBerita, 
        tanggal: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }), 
        status: kategoriBerita, 
        img: publicUrl 
      }]);

    if (!error) {
      alert("Berita sudah Online!");
      setJudulBerita('');
      setIsiBerita('');
      setKategoriBerita('Informasi');
      setFileGambar(null);
      fetchBerita();
    } else {
      console.error(error);
      alert("Gagal mempublikasikan berita");
    }
  };

  const handleSimpanWBP = async () => {
    const { error } = await supabase
      .from('daftar_wbp')
      .insert([{
        nama: wbpForm.nama,
        nik: wbpForm.nik,
        kasus: wbpForm.kasus,
        lama_pidana: wbpForm.lama_pidana,
        ekspirasi: wbpForm.ekspirasi,
        blok_kamar: wbpForm.blok_kamar
      }]);

    if (!error) {
      alert("Data WBP Berhasil Disimpan ke Cloud!");
      setWbpForm({ nama: '', nik: '', kasus: '', lama_pidana: '', ekspirasi: '', blok_kamar: '' });
      fetchWBP();
    } else {
      alert("Gagal menyimpan data WBP");
    }
  };

  const handleSimpanPengaduan = async () => {
    const { error } = await supabase
      .from('daftar_pengaduan')
      .insert([{
        pelapor: pengaduanForm.pelapor,
        kontak: pengaduanForm.kontak,
        isi: pengaduanForm.isi,
        status: 'Pending'
      }]);

    if (!error) {
      alert("Pengaduan Berhasil Disimpan!");
      setPengaduanForm({ pelapor: '', kontak: '', isi: '' });
      fetchPengaduan();
    } else {
      alert("Gagal menyimpan pengaduan");
    }
  };

  const handleDelete = async (id: number, table: string) => {
    if (confirm("Hapus data ini secara permanen?")) {
      const { error } = await supabase.from(table).delete().eq('id', id);
      if (!error) {
        if (table === 'daftar_berita') fetchBerita();
        else if (table === 'daftar_wbp') fetchWBP();
        else fetchPengaduan();
      }
    }
  };

  const toggleStatusBerita = async (id: number, currentStatus: string) => {
    const newStatus = currentStatus === 'Informasi' ? 'Wawasan' : 'Informasi';
    const { error } = await supabase
      .from('daftar_berita')
      .update({ status: newStatus })
      .eq('id', id);
    if (!error) fetchBerita();
  };

  const toggleStatusPengaduan = async (id: number, currentStatus: string) => {
    const newStatus = currentStatus === 'Pending' ? 'Proses' : 'Pending';
    const { error } = await supabase
      .from('daftar_pengaduan')
      .update({ status: newStatus })
      .eq('id', id);
    if (!error) fetchPengaduan();
  };

  return (
    <div style={{ display: 'flex', height: '96vh', width: '100vw', backgroundColor: '#F4F7FE', overflow: 'hidden', fontFamily: "'Inter', sans-serif" }}>
      
      <aside style={{ 
        width: isSidebarVisible ? '210px' : '0px', 
        backgroundColor: '#FFFFFF', 
        borderRight: isSidebarVisible ? '1px solid #EBEBEB' : 'none', 
        display: 'flex', 
        flexDirection: 'column', 
        zIndex: 1000,
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden',
        flexShrink: 0 
      }}>
        
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
          <button onMouseDown={() => setActiveExit(true)} onMouseUp={() => setActiveExit(false)} onClick={() => router.push('/admin')} 
            style={{ ...exitBtn, transform: activeExit ? 'scale(0.92)' : 'scale(1)', backgroundColor: activeExit ? '#FED7D7' : '#FFF5F5' }}>
            Keluar
          </button>
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
            <StatCard label="PRODUK KARYA" value="4" sub="Unit" color="#2ECC71" />
            <StatCard label="BERITA" value={daftarBerita.length.toString()} sub="Total" color="#E74C3C" />
          </div>

          <div style={contentCard}>
            {activeMenu === 'dashboard' ? (
              <div style={{ padding: '40px' }}>
                <div style={{ marginBottom: '35px' }}>
                  <h3 style={{ color: '#093661', fontSize: '22px', fontWeight: '700', marginBottom: '8px' }}>Selamat Datang Kembali Admin! 👋</h3>
                  <p style={{ color: '#718096', fontSize: '14px' }}>Pantau dan kelola data operasional Rutan Sinjai dalam satu panel.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '25px', marginBottom: '45px' }}>
                  <QuickActionCard icon="👥" label="Data WBP" sub="Input Narapidana" onClick={() => setActiveMenu('wbp')} color="#4680FF" />
                  <QuickActionCard icon="📰" label="Update Berita" sub="Posting info terbaru" onClick={() => setActiveMenu('berita')} color="#2ECC71" />
                  <QuickActionCard icon="📩" label="Pengaduan" sub="Cek laporan masuk" onClick={() => setActiveMenu('pengaduan')} color="#FFB811" />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '30px' }}>
                  <div style={{ backgroundColor: '#F8FAFC', padding: '25px', borderRadius: '18px', border: '1px solid #E2E8F0' }}>
                    <h4 style={{ fontSize: '16px', color: '#093661', marginBottom: '20px', fontWeight: 'bold' }}>Aktivitas Terakhir</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                      {daftarWBP.length > 0 && <ActivityItem label={`Input WBP: ${daftarWBP[0].nama}`} time="Baru saja" status="Selesai" />}
                      {daftarPengaduan.length > 0 && <ActivityItem label={`Aduan Baru: ${daftarPengaduan[0].pelapor}`} time="Baru saja" status={daftarPengaduan[0].status || "Pending"} />}
                      {daftarBerita.length > 0 && <ActivityItem label={`Update Berita: ${daftarBerita[0].judul}`} time="Baru saja" status="Selesai" />}
                      {daftarWBP.length === 0 && daftarPengaduan.length === 0 && <p style={{fontSize: '13px', color: '#A0AEC0'}}>Belum ada aktivitas.</p>}
                    </div>
                  </div>

                  <div style={{ backgroundColor: '#093661', padding: '25px', borderRadius: '18px', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <h4 style={{ fontSize: '16px', marginBottom: '15px', fontWeight: '600' }}>Status Sistem Cloud</h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#2ECC71' }}></div>
                      <span style={{ fontSize: '14px', fontWeight: '500' }}>Database Supabase: Online</span>
                    </div>
                    <p style={{ fontSize: '13px', opacity: 0.7, lineHeight: '1.6' }}>Server berjalan optimal. Semua data terenkripsi dan aman di cloud server.</p>
                  </div>
                </div>
              </div>
            ) : activeMenu === 'pengaduan' ? (
              <div style={{ padding: '30px' }}>
                <h3 style={sectionTitle}><span>📩</span> Manajemen Pengaduan Layanan</h3>
                <div style={formGrid}>
                  <FormInput 
                    label="Nama Pelapor" 
                    placeholder="Masukkan nama lengkap pelapor" 
                    value={pengaduanForm.pelapor} 
                    onChange={(e: any) => setPengaduanForm({...pengaduanForm, pelapor: e.target.value})} 
                  />
                  <FormInput 
                    label="Email / No. HP" 
                    placeholder="Kontak yang bisa dihubungi" 
                    value={pengaduanForm.kontak} 
                    onChange={(e: any) => setPengaduanForm({...pengaduanForm, kontak: e.target.value})} 
                  />
                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={labelStyled}>Isi Pengaduan</label>
                    <textarea 
                      style={{ ...inputStyled, height: '100px', width: '100%' }} 
                      placeholder="Tuliskan detail pengaduan di sini..."
                      value={pengaduanForm.isi}
                      onChange={(e: any) => setPengaduanForm({...pengaduanForm, isi: e.target.value})}
                    ></textarea>
                  </div>
                  <button onClick={handleSimpanPengaduan} style={{ ...submitBtnBase, gridColumn: 'span 2' }}>Simpan Laporan Pengaduan</button>
                </div>

                <div style={{ marginTop: '40px', borderTop: '1px solid #E2E8F0', paddingTop: '20px' }}>
                  <h3 style={sectionTitle}>📋 Daftar Pengaduan Masuk</h3>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#F8FAFC', textAlign: 'left' }}>
                        <th style={tableHeaderStyle}>Identitas Pelapor</th>
                        <th style={tableHeaderStyle}>Isi Pengaduan</th>
                        <th style={tableHeaderStyle}>Status</th>
                        <th style={tableHeaderStyle}>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {daftarPengaduan.map((item) => (
                        <tr key={item.id}>
                          <td style={tableCellStyle}>
                            <div style={{ fontWeight: 'bold', color: '#2D3748' }}>Nama: {item.pelapor}</div>
                            <div style={{ fontSize: '11px', color: '#718096' }}>Kontak: {item.kontak}</div>
                          </td>
                          <td style={tableCellStyle}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                               <span style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.isi}</span>
                               <button onClick={() => alert(item.isi)} style={{ padding: '2px 8px', fontSize: '10px', borderRadius: '4px', border: '1px solid #CBD5E0', cursor: 'pointer', background: '#FFF' }}>Lihat</button>
                            </div>
                          </td>
                          <td style={tableCellStyle}>
                              <button 
                                onClick={() => toggleStatusPengaduan(item.id, item.status)}
                                style={{ 
                                    padding: '5px 12px', 
                                    borderRadius: '6px', 
                                    border: 'none',
                                    fontSize: '11px',
                                    cursor: 'pointer',
                                    fontWeight: '800',
                                    backgroundColor: item.status === 'Proses' ? '#E9F9EF' : '#FFFBEB',
                                    color: item.status === 'Proses' ? '#2ECC71' : '#FFB811'
                                }}
                              >
                                {item.status || 'Pending'}
                              </button>
                          </td>
                          <td style={tableCellStyle}>
                            <button onClick={() => handleDelete(item.id, 'daftar_pengaduan')} style={{ border: 'none', background: 'none', color: '#E74C3C', cursor: 'pointer', fontWeight: 'bold' }}>Hapus</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : activeMenu === 'berita' ? (
              <div style={{ padding: '30px' }}>
                <h3 style={sectionTitle}>📰 Posting Berita Terbaru</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <input style={inputStyled} placeholder="Judul Berita" value={judulBerita} onChange={(e) => setJudulBerita(e.target.value)} />
                  
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={labelStyled}>Kategori Berita</label>
                    <select 
                      style={inputStyled} 
                      value={kategoriBerita} 
                      onChange={(e) => setKategoriBerita(e.target.value)}
                    >
                      <option value="Informasi">Informasi</option>
                      <option value="Wawasan">Wawasan</option>
                    </select>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={labelStyled}>Upload Foto Berita</label>
                    <input type="file" accept="image/*" onChange={(e: any) => setFileGambar(e.target.files[0])} style={inputStyled} />
                  </div>
                  <textarea style={{ ...inputStyled, height: '150px' }} placeholder="Isi Berita..." value={isiBerita} onChange={(e) => setIsiBerita(e.target.value)}></textarea>
                  <button onClick={handlePublikasiBerita} style={submitBtnBase}>Publikasikan Berita</button>
                </div>

                <div style={{ marginTop: '40px', borderTop: '1px solid #E2E8F0', paddingTop: '20px' }}>
                  <h3 style={sectionTitle}>📋 Riwayat Berita</h3>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#F8FAFC', textAlign: 'left' }}>
                        <th style={tableHeaderStyle}>Judul</th>
                        <th style={tableHeaderStyle}>Tanggal</th>
                        <th style={tableHeaderStyle}>Kategori</th>
                        <th style={tableHeaderStyle}>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {daftarBerita.map((news) => (
                        <tr key={news.id}>
                          <td style={tableCellStyle}>{news.judul}</td>
                          <td style={tableCellStyle}>{news.tanggal}</td>
                          <td style={tableCellStyle}>
                            <span 
                              onClick={() => toggleStatusBerita(news.id, news.status)} 
                              style={{ 
                                color: news.status === 'Informasi' ? '#4680FF' : '#2ECC71', 
                                fontWeight: 'bold', 
                                cursor: 'pointer',
                                backgroundColor: news.status === 'Informasi' ? '#EBF1FF' : '#E9F9EF',
                                padding: '4px 10px',
                                borderRadius: '6px'
                              }}
                            >
                              {news.status || 'Informasi'}
                            </span>
                          </td>
                          <td style={tableCellStyle}>
                            <button onClick={() => handleDelete(news.id, 'daftar_berita')} style={{ border: 'none', background: 'none', color: '#E74C3C', cursor: 'pointer', fontWeight: 'bold' }}>Hapus</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : activeMenu === 'wbp' ? (
              <div style={{ padding: '30px' }}>
                <h3 style={sectionTitle}><span>👥</span> Tambah Data Narapidana (WBP)</h3>
                <div style={formGrid}>
                  <FormInput label="Nama Lengkap" placeholder="Nama sesuai KTP" value={wbpForm.nama} onChange={(e:any) => setWbpForm({...wbpForm, nama: e.target.value})} />
                  <FormInput label="NIK" placeholder="16 digit NIK" value={wbpForm.nik} onChange={(e:any) => setWbpForm({...wbpForm, nik: e.target.value})} />
                  <FormInput label="Kasus" placeholder="Contoh: Narkotika" value={wbpForm.kasus} onChange={(e:any) => setWbpForm({...wbpForm, kasus: e.target.value})} />
                  <FormInput label="Lama Pidana" placeholder="Contoh: 5 Tahun" value={wbpForm.lama_pidana} onChange={(e:any) => setWbpForm({...wbpForm, lama_pidana: e.target.value})} />
                  <FormInput label="Ekspirasi" type="date" value={wbpForm.ekspirasi} onChange={(e:any) => setWbpForm({...wbpForm, ekspirasi: e.target.value})} />
                  <FormInput label="Blok / Kamar" placeholder="Contoh: A-04" value={wbpForm.blok_kamar} onChange={(e:any) => setWbpForm({...wbpForm, blok_kamar: e.target.value})} />
                  <button onClick={handleSimpanWBP} style={{ ...submitBtnBase, gridColumn: 'span 2' }}>Simpan Data Narapidana</button>
                </div>

                <div style={{ marginTop: '40px', borderTop: '1px solid #E2E8F0', paddingTop: '20px' }}>
                  <h3 style={sectionTitle}>📋 Daftar WBP Terdaftar</h3>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#F8FAFC', textAlign: 'left' }}>
                        <th style={tableHeaderStyle}>Nama</th>
                        <th style={tableHeaderStyle}>Kasus</th>
                        <th style={tableHeaderStyle}>Blok</th>
                        <th style={tableHeaderStyle}>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {daftarWBP.map((item) => (
                        <tr key={item.id}>
                          <td style={tableCellStyle}>{item.nama}</td>
                          <td style={tableCellStyle}>{item.kasus}</td>
                          <td style={tableCellStyle}>{item.blok_kamar}</td>
                          <td style={tableCellStyle}>
                            <button onClick={() => handleDelete(item.id, 'daftar_wbp')} style={{ border: 'none', background: 'none', color: '#E74C3C', cursor: 'pointer', fontWeight: 'bold' }}>Hapus</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : activeMenu === 'foto' ? (
              <div style={{ padding: '30px' }}>
                <h3 style={sectionTitle}>📸 Upload Galeri Foto</h3>
                <div style={formGrid}>
                  <FormInput label="Keterangan Foto" placeholder="Deskripsi singkat foto" />
                  <FormInput label="Pilih File Foto" type="file" />
                  <button style={{ ...submitBtnBase, gridColumn: 'span 2' }}>Upload Foto</button>
                </div>
              </div>
            ) : activeMenu === 'video' ? (
              <div style={{ padding: '30px' }}>
                <h3 style={sectionTitle}>🎥 Tambah Galeri Video</h3>
                <div style={formGrid}>
                  <FormInput label="Judul Video" placeholder="Judul video..." />
                  <FormInput label="Link URL Video" placeholder="https://youtube.com/watch?v=..." />
                  <button style={{ ...submitBtnBase, gridColumn: 'span 2' }}>Simpan Video</button>
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
                  <button style={{ ...submitBtnBase, gridColumn: 'span 2' }}>Tambah Produk Karya Binaan</button>
                </div>
              </div>
            ) : null}
          </div>
        </main>
      </div>
    </div>
  );
}

function QuickActionCard({ icon, label, sub, onClick, color }: any) {
  return (
    <div onClick={onClick} style={{ 
      padding: '15px 20px', backgroundColor: 'white', borderRadius: '14px', border: '1px solid #EBEBEB', 
      cursor: 'pointer', transition: '0.3s', display: 'flex', gap: '15px', alignItems: 'center',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.01)'
    }} onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = color;
      e.currentTarget.style.transform = 'translateY(-2px)';
    }} onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = '#EBEBEB';
      e.currentTarget.style.transform = 'translateY(0)';
    }}>
      <div style={{ 
        fontSize: '22px', width: '45px', height: '45px', 
        backgroundColor: `${color}10`, borderRadius: '12px', 
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: color
      }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: '700', fontSize: '14px', color: '#2D3748' }}>{label}</div>
        <div style={{ fontSize: '12px', color: '#A0AEC0' }}>{sub}</div>
      </div>
    </div>
  );
}

function ActivityItem({ label, time, status }: any) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 15px', backgroundColor: 'white', borderRadius: '12px', border: '1px solid #EDF2F7' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: status === 'Selesai' ? '#2ECC71' : '#FFB811' }}></div>
        <div>
          <div style={{ fontSize: '13px', fontWeight: '600', color: '#4A5568' }}>{label}</div>
          <div style={{ fontSize: '11px', color: '#CBD5E0' }}>{time}</div>
        </div>
      </div>
      <span style={{ fontSize: '10px', padding: '4px 10px', borderRadius: '20px', backgroundColor: status === 'Selesai' ? '#E6FFFA' : '#FFFBEB', color: status === 'Selesai' ? '#234E52' : '#975A16', fontWeight: '800', border: `1px solid ${status === 'Selesai' ? '#B2F5EA' : '#FEEBC8'}` }}>{status}</span>
    </div>
  );
}

function NavItem({ active, onClick, icon, label }: any) {
  return (
    <div onClick={onClick} style={{ padding: '12px 18px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '5px', backgroundColor: active ? '#F0F4FF' : 'transparent', color: active ? '#093661' : '#5B6B79', fontWeight: active ? '700' : '400' }}>
      <span style={{ fontSize: '18px' }}>{icon}</span><span style={{ fontSize: '14px' }}>{label}</span>
    </div>
  );
}

function FormInput({ label, value, ...props }: any) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <label style={labelStyled}>{label}</label>
      <input style={inputStyled} value={value ?? ''} {...props} />
    </div>
  );
}

function StatCard({ label, value, sub, color }: any) {
  return (
    <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '16px', border: '1px solid #EBEBEB' }}>
      <p style={{ margin: 0, fontSize: '11px', fontWeight: 'bold', color: '#A0AEC0' }}>{label}</p>
      <h2 style={{ margin: '10px 0', fontSize: '28px', color: '#2D3748' }}>{value} <span style={{ fontSize: '14px', color: '#CBD5E0' }}>{sub}</span></h2>
      <div style={{ height: '4px', background: '#F0F2F5', borderRadius: '2px' }}><div style={{ width: '60%', height: '100%', background: color, borderRadius: '2px' }}></div></div>
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
const inputStyled: any = { width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #E2E8F0', outline: 'none', fontSize: '14px', boxSizing: 'border-box' as const };
const submitBtnBase: any = { padding: '14px', backgroundColor: '#093661', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' };
const glassBanner: any = { background: 'linear-gradient(135deg, #4680FF 0%, #0046E5 100%)', borderRadius: '20px', padding: '45px', color: 'white', position: 'relative', overflow: 'hidden', marginBottom: '30px' };
const glassCircle1: any = { position: 'absolute', top: '-20px', right: '-20px', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' };
const glassCircle2: any = { position: 'absolute', bottom: '-30px', left: '10%', width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' };
const tableHeaderStyle = { padding: '12px 15px', color: '#4A5568', fontWeight: '600', borderBottom: '1px solid #E2E8F0' };
const tableCellStyle = { padding: '12px 15px', borderBottom: '1px solid #EDF2F7', color: '#4A5568' };