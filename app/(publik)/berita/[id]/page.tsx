"use client";
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { motion, Variants } from 'framer-motion';

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
  
  const sliderRef = useRef<HTMLDivElement>(null);

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
        setBeritaDisplay(safeList.slice(0, 12));

      } catch (err) {
        console.error("Gagal mengambil data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [params?.id]);

  const scrollSlider = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      sliderRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

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
    setBeritaDisplay(beritaLain.slice(0, 12));
  };

  const handleSearch = () => {
    setKategoriAktif(null);
    if (!searchTerm.trim()) {
      setBeritaDisplay(beritaLain.slice(0, 12));
      return;
    }
    const hasilCari = beritaLain.filter(item => 
      item.judul.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setBeritaDisplay(hasilCari);
  };

  const fadeInVariant: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
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
        .slider-wrapper { position: relative; display: flex; align-items: center; width: 100%; margin-top: 20px; }
        .grid-slider { 
          display: grid; 
          grid-auto-flow: column; 
          grid-auto-columns: calc(25% - 15px); 
          gap: 20px; 
          overflow-x: hidden; 
          scroll-behavior: smooth;
          width: 100%;
          padding: 10px 0;
        }
        .card-berita-mini { 
          background: #fff; 
          border-radius: 8px; 
          overflow: hidden; 
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
          cursor: pointer;
          transition: transform 0.3s;
        }
        .card-berita-mini:hover { transform: translateY(-5px); }
        .nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: #002e5b;
          color: white;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        }
        .prev-btn { left: -20px; }
        .next-btn { right: -20px; }
        .meta-ikon { color: #007bff; margin-right: 5px; }
        .form-input { padding: 12px; border: 1px solid #ddd; border-radius: 4px; outline: none; font-size: 14px; width: 100%; }
        .btn-submit { margin-top: 15px; padding: 12px 25px; background-color: #002e5b; color: #ffffff; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; transition: background-color 0.2s; }
        
        @media (max-width: 992px) { 
          .grid-slider { grid-auto-columns: calc(50% - 10px); } 
          .container-utama { flex-direction: column; }
        }
        @media (max-width: 576px) { 
          .grid-slider { grid-auto-columns: 100%; } 
        }
      `}} />

      <div className="container-utama">
        <motion.div 
          className="area-berita"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInVariant}
        >
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

          <div style={{ marginTop: '50px' }}>
            <h3 style={{ color: '#002e5b', borderLeft: '4px solid #002e5b', paddingLeft: '15px' }}>Berita Terkait</h3>
            
            <div className="slider-wrapper">
              <button className="nav-btn prev-btn" onClick={() => scrollSlider('left')}>
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              
              <div className="grid-slider" ref={sliderRef}>
                {beritaDisplay.map((item) => (
                  <div key={item.id} className="card-berita-mini" onClick={() => window.location.href = `/berita/${item.id}`}>
                    <img src={item.img || '/assets/berita1.png'} style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
                    <div style={{ padding: '12px' }}>
                      <h4 style={{ fontSize: '13px', margin: '0 0 8px 0', height: '36px', overflow: 'hidden', color: '#333' }}>{item.judul}</h4>
                      <small style={{ color: '#999', fontSize: '10px' }}><i className="fa-regular fa-calendar"></i> {item.tanggal}</small>
                    </div>
                  </div>
                ))}
              </div>

              <button className="nav-btn next-btn" onClick={() => scrollSlider('right')}>
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          </div>

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
        </motion.div>
      </div>
    </div>
  );
}