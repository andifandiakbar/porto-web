"use client";
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { motion } from 'framer-motion';

const supabase = createClient(
  'https://xnwqcxaehvaqxzodqidc.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhud3FjeGFlaHZhcXh6b2RxaWRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk0OTE4NDAsImV4cCI6MjA4NTA2Nzg0MH0.RLjUPr-7Qez5gUcAQUOJ-3TPPIf_CfGeOE2gSKqHz7s'
);

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
    <section style={{ padding: '60px 0', backgroundColor: '#f9f9f9', minHeight: '80vh', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ background: '#fff', padding: isMobile ? '25px' : '40px', borderRadius: '12px', border: '1px solid #e0e0e0' }}
        >
          <h2 style={{ textAlign: 'center', color: '#0b2d57', marginBottom: '30px', fontWeight: 'bold' }}>Layanan Pengaduan Publik</h2>
          
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Nama Lengkap Pelapor:</label>
              <input type="text" required value={namaPelapor} onChange={(e) => setNamaPelapor(e.target.value)} style={{ width: '100%', padding: '14px', border: '1px solid #e0e0e0', borderRadius: '8px', outline: 'none' }} />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Email / No. HP (Kontak):</label>
              <input type="text" required value={kontak} onChange={(e) => setKontak(e.target.value)} style={{ width: '100%', padding: '14px', border: '1px solid #e0e0e0', borderRadius: '8px', outline: 'none' }} />
            </div>

            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Isi Detail Pengaduan:</label>
              <textarea required value={isiPengaduan} onChange={(e) => setIsiPengaduan(e.target.value)} style={{ width: '100%', padding: '14px', border: '1px solid #e0e0e0', borderRadius: '8px', minHeight: '150px', outline: 'none' }}></textarea>
            </div>

            <button type="submit" disabled={loading} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}
              style={{ width: '100%', padding: '16px', backgroundColor: loading ? '#999' : (isHover ? '#004080' : '#0b2d57'), color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer', transition: 'background 0.2s' }}>
              {loading ? 'Sedang Mengirim...' : 'Kirim Laporan Pengaduan'}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}