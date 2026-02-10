"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://xnwqcxaehvaqxzodqidc.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhud3FjeGFlaHZhcXh6b2RxaWRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk0OTE4NDAsImV4cCI6MjA4NTA2Nzg0MH0.RLjUPr-7Qez5gUcAQUOJ-3TPPIf_CfGeOE2gSKqHz7s'
);

export default function DetailBerita() {
  const params = useParams();
  const router = useRouter();
  const [berita, setBerita] = useState<any>(null);
  const [beritaLain, setBeritaLain] = useState<any[]>([]);
  const [beritaDisplay, setBeritaDisplay] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [kategoriAktif, setKategoriAktif] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchData() {
      const newsId = params?.id;
      if (!newsId) return;

      setLoading(true);
      try {
        const { data: detail, error: detailError } = await supabase
          .from('daftar_berita')
          .select('*')
          .eq('id', newsId)
          .maybeSingle();

        if (detailError) throw detailError;
        setBerita(detail);

        const { data: list, error: listError } = await supabase
          .from('daftar_berita')
          .select('id, judul, tanggal, status, img')
          .neq('id', newsId)
          .order('id', { ascending: false });

        if (listError) throw listError;

        const safeList = list || [];
        setBeritaLain(safeList);
        setBeritaDisplay(safeList.slice(0, 5));

      } catch (err) {
        console.error("Gagal mengambil data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [params?.id]);

  const handleFilterKategori = (kat: string) => {
    setKategoriAktif(kat);
    setSearchTerm('');
    const hasilFilter = beritaLain.filter(item => 
      item.status?.toString().toLowerCase() === kat.toLowerCase()
    );
    setBeritaDisplay(hasilFilter);
  };

  const resetFilter = () => {
    setKategoriAktif(null);
    setSearchTerm('');
    setBeritaDisplay(beritaLain.slice(0, 5));
  };

  const handleSearch = () => {
    setKategoriAktif(null);
    if (!searchTerm.trim()) {
      setBeritaDisplay(beritaLain.slice(0, 5));
      return;
    }
    const hasilCari = beritaLain.filter(item => 
      item.judul.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setBeritaDisplay(hasilCari);
  };

  if (loading) return (
    <div style={{ backgroundColor: '#f9fbff', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div className="loader"></div>
      <p style={{ marginTop: '15px', color: '#093661', fontWeight: 'bold', fontFamily: 'sans-serif' }}>Memuat halaman...</p>
      <style dangerouslySetInnerHTML={{ __html: `
        .loader { border: 4px solid #f3f3f3; border-top: 4px solid #093661; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}} />
    </div>
  );

  if (!berita) return (
    <div style={{ textAlign: 'center', padding: '100px', fontFamily: 'sans-serif' }}>
      <h3>Berita tidak ditemukan.</h3>
      <button onClick={() => router.push('/')} style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}>Kembali ke Home</button>
    </div>
  );

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      
      <style dangerouslySetInnerHTML={{ __html: `
        .container-utama { max-width: 1140px; margin: 0 auto; display: flex; flex-wrap: wrap; gap: 40px; }
        .area-berita { flex: 1; min-width: 300px; background: #fff; }
        .sidebar { width: 320px; }
        .sidebar-box { background: #fff; padding: 25px; border-radius: 8px; box-shadow: 0 2px 15px rgba(0,0,0,0.05); margin-bottom: 30px; }
        .sidebar-title { color: #002e5b; font-size: 18px; font-weight: bold; margin-bottom: 20px; display: flex; align-items: center; }
        
        .news-item { margin-bottom: 20px; cursor: pointer; padding-bottom: 15px; border-bottom: 1px solid #f0f0f0; }
        .news-item h4 { margin: 0 0 5px 0; font-size: 14px; color: #333; transition: color 0.2s; line-height: 1.4; font-weight: 600; }
        .news-item:hover h4 { color: #007bff; }
        .news-item small { color: #aaa; font-size: 11px; }

        .cat-item { display: block; padding: 10px 0; color: #555; text-decoration: none; font-size: 14px; cursor: pointer; transition: 0.2s; border-bottom: 1px solid #f9f9f9; }
        .cat-item:hover { color: #007bff; }
        .cat-aktif { color: #007bff; font-weight: bold; }

        .meta-ikon { color: #007bff; margin-right: 5px; }
        .form-input { padding: 12px; border: 1px solid #ddd; border-radius: 4px; outline: none; font-size: 14px; width: 100%; }
        
        .btn-submit { margin-top: 15px; padding: 12px 25px; background-color: #002e5b; color: #ffffff; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; transition: background-color 0.2s; }
        .btn-submit:hover { background-color: #004080; }

        .btn-search { position: absolute; right: 5px; top: 50%; transform: translateY(-50%); background-color: #002e5b; color: #ffffff; border: none; border-radius: 4px; width: 35px; height: 35px; cursor: pointer; transition: background-color 0.2s; }
        .btn-search:hover { background-color: #004080; }

        @media (max-width: 992px) { .container-utama { flex-direction: column; } .sidebar { width: 100%; } }
      `}} />

      <div className="container-utama">
        <div className="area-berita">
          <img 
            src={berita.img || '/assets/berita1.png'} 
            style={{ width: '100%', maxHeight: '500px', borderRadius: '12px', marginBottom: '25px', objectFit: 'cover' }} 
            alt="Thumbnail" 
          />

          <h1 style={{ color: '#002e5b', fontSize: '28px', marginBottom: '15px', fontWeight: 'bold' }}>{berita.judul}</h1>
          
          <div style={{ color: '#888', fontSize: '13px', marginBottom: '30px', display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center' }}>
             <span><i className="fa-solid fa-user meta-ikon"></i>Administrator</span>
             <span>|</span>
             <span><i className="fa-solid fa-calendar meta-ikon"></i>{berita.tanggal}</span>
             <span>|</span>
             <span style={{ textTransform: 'capitalize' }}><i className="fa-solid fa-tag meta-ikon"></i>{berita.status || 'Informasi'}</span>
          </div>

          <div 
            style={{ lineHeight: '1.8', color: '#444', fontSize: '16px', textAlign: 'justify', whiteSpace: 'pre-line' }} 
            dangerouslySetInnerHTML={{ __html: berita.isi }} 
          />

          <div style={{ marginTop: '60px' }}>
            <h3 style={{ margin: '0 0 20px 0', color: '#333', fontSize: '20px', fontWeight: 'bold' }}>0 Komentar</h3>
            <div style={{ backgroundColor: '#f8f9fa', padding: '30px', borderRadius: '8px' }}>
              <h4 style={{ marginTop: 0, marginBottom: '20px' }}>Kirim Komentar</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                <input type="text" placeholder="Nama" className="form-input" />
                <input type="email" placeholder="Email" className="form-input" />
              </div>
              <textarea placeholder="Pesan Anda" className="form-input" style={{ height: '100px', resize: 'none' }}></textarea>
              <button className="btn-submit">Kirim</button>
            </div>
          </div>
        </div>

        <div className="sidebar">
          <div className="sidebar-box">
            <div className="sidebar-title">Search</div>
            <div style={{ position: 'relative', marginBottom: '30px', marginTop: '15px' }}>
              <input 
                type="text" 
                placeholder="Cari berita..." 
                className="form-input" 
                style={{ paddingRight: '45px' }} 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button onClick={handleSearch} className="btn-search">
                <i className="fa-solid fa-search"></i>
              </button>
            </div>

            <div className="sidebar-title">Kategori</div>
            <div style={{ marginBottom: '30px' }}>
              <span onClick={resetFilter} className={`cat-item ${!kategoriAktif && !searchTerm ? 'cat-aktif' : ''}`}>Semua Kategori</span>
              <span onClick={() => handleFilterKategori('Informasi')} className={`cat-item ${kategoriAktif === 'Informasi' ? 'cat-aktif' : ''}`}>Informasi</span>
              <span onClick={() => handleFilterKategori('Wawasan')} className={`cat-item ${kategoriAktif === 'Wawasan' ? 'cat-aktif' : ''}`}>Wawasan</span>
            </div>

            <div className="sidebar-title">
              {searchTerm ? `Hasil Cari: "${searchTerm}"` : (kategoriAktif ? `Berita ${kategoriAktif}` : 'Berita Terakhir')}
            </div>
            
            <div style={{ marginTop: '15px' }}>
              {beritaDisplay.length > 0 ? (
                beritaDisplay.map((item) => (
                  <div key={item.id} className="news-item" onClick={() => window.location.href = `/berita/${item.id}`}>
                    <h4>{item.judul}</h4>
                    <small><i className="fa-regular fa-calendar" style={{ marginRight: '5px' }}></i>{item.tanggal}</small>
                  </div>
                ))
              ) : (
                <p style={{ fontSize: '13px', color: '#999' }}>Tidak ada berita yang sesuai.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}