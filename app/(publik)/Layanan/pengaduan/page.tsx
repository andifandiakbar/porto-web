"use client";

import { useState, useEffect } from 'react';
import { supabase } from '../../../../lib/supabase';
import { motion } from 'framer-motion';

export default function PengaduanPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isHover, setIsHover] = useState(false);
  
  const [namaPelapor, setNamaPelapor] = useState('');
  const [kontak, setKontak] = useState('');
  const [isiPengaduan, setIsiPengaduan] = useState('');

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('daftar_pengaduan')
        .insert([
          { 
            pelapor: namaPelapor, 
            kontak: kontak, 
            isi: isiPengaduan    
          }
        ]);

      if (error) throw error;

      alert("Laporan Anda telah berhasil terkirim!");
      setNamaPelapor('');
      setKontak('');
      setIsiPengaduan('');

    } catch (error: any) {
      console.error(error);
      alert("Gagal mengirim! Pastikan tabel 'daftar_pengaduan' sudah benar di Supabase.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section 
      style={{ padding: '60px 20px', backgroundColor: '#f8fafc', minHeight: '70vh', fontFamily: '"Roboto", Arial, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div style={{ maxWidth: '750px', margin: '0 auto', width: '100%' }}>
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
          style={{ background: '#ffffff', padding: isMobile ? '30px 20px' : '50px 40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)', border: '1px solid #e2e8f0' }}
        >
          <h2 style={{ textAlign: 'center', color: '#093b77', marginBottom: '35px', fontWeight: 'bold', fontSize: '28px', fontFamily: '"Roboto", Arial, sans-serif' }}>LAYANAN PENGADUAN PUBLIK</h2>
          
          <form onSubmit={handleSubmit} style={{ fontFamily: '"Roboto", Arial, sans-serif' }}>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', color: '#093b77', fontSize: '15px' }}>Nama lengkap pelapor:</label>
              <input type="text" required value={namaPelapor} onChange={(e) => setNamaPelapor(e.target.value)} style={{ width: '100%', padding: '14px 16px', border: '1px solid #e2e8f0', borderRadius: '12px', outline: 'none', fontSize: '15px', color: '#475569', fontFamily: '"Roboto", Arial, sans-serif', boxSizing: 'border-box' }} />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', color: '#093b77', fontSize: '15px' }}>Email / No. HP (Kontak):</label>
              <input type="text" required value={kontak} onChange={(e) => setKontak(e.target.value)} style={{ width: '100%', padding: '14px 16px', border: '1px solid #e2e8f0', borderRadius: '12px', outline: 'none', fontSize: '15px', color: '#475569', fontFamily: '"Roboto", Arial, sans-serif', boxSizing: 'border-box' }} />
            </div>

            <div style={{ marginBottom: '32px' }}>
              <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', color: '#093b77', fontSize: '15px' }}>Isi detail pengaduan:</label>
              <textarea required value={isiPengaduan} onChange={(e) => setIsiPengaduan(e.target.value)} style={{ width: '100%', padding: '14px 16px', border: '1px solid #e2e8f0', borderRadius: '12px', minHeight: '160px', outline: 'none', fontSize: '15px', color: '#475569', fontFamily: '"Roboto", Arial, sans-serif', boxSizing: 'border-box', resize: 'vertical', lineHeight: '1.6' }}></textarea>
            </div>

            <button type="submit" disabled={loading} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}
              style={{ width: '100%', padding: '16px 32px', backgroundColor: loading ? '#94a3b8' : (isHover ? '#052347' : '#093b77'), color: '#ffffff', border: 'none', borderRadius: '50px', fontWeight: 'bold', fontSize: '16px', cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.3s ease', boxShadow: '0 4px 15px rgba(9, 59, 119, 0.2)', transform: isHover && !loading ? 'translateY(-2px)' : 'translateY(0)', fontFamily: '"Roboto", Arial, sans-serif' }}>
              {loading ? 'Sedang Mengirim...' : 'Kirim Laporan Pengaduan'}
            </button>
          </form>
        </motion.div>
      </div>
    </motion.section>
  );
}