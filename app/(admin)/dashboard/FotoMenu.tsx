"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';

interface FotoMenuProps {
  daftarFoto: any[];
  fetchFoto: () => void;
  handleDelete: (id: number, table: string) => void;
}

export default function FotoMenu({ daftarFoto = [], fetchFoto, handleDelete }: FotoMenuProps) {
  const [keterangan, setKeterangan] = useState('');
  const [fileFoto, setFileFoto] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSimpan = async () => {
    if (!keterangan || !fileFoto) {
      alert("Mohon isi keterangan dan pilih foto");
      return;
    }

    setLoading(true);
    try {
      const fileExt = fileFoto.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `galeri/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, fileFoto);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage.from('images').getPublicUrl(filePath);
      const publicUrl = urlData.publicUrl;

      const { error: insertError } = await supabase
        .from('daftar_foto')
        .insert([{ 
          keterangan: keterangan, 
          url: publicUrl 
        }]);

      if (insertError) throw insertError;

      alert("Foto Berhasil Diunggah!");
      setKeterangan('');
      setFileFoto(null);
      fetchFoto();
    } catch (error: any) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: isMobile ? '15px' : '30px', backgroundColor: '#FFFFFF' }}>
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#093661', fontSize: isMobile ? '18px' : '20px', fontWeight: '700', margin: '0 0 10px 0' }}>📸 Galeri Foto</h3>
        <p style={{ color: '#718096', fontSize: isMobile ? '13px' : '14px', margin: 0 }}>Kelola dan publikasikan dokumentasi kegiatan ke website publik.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '20px', marginBottom: '25px' }}>
        <div>
          <label style={labelStyle}>Keterangan Foto</label>
          <input 
            style={inputStyle} 
            placeholder="Contoh: Kegiatan Bakti Sosial" 
            value={keterangan}
            onChange={(e) => setKeterangan(e.target.value)}
          />
        </div>
        <div>
          <label style={labelStyle}>Pilih File Foto</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={(e) => setFileFoto(e.target.files ? e.target.files[0] : null)}
            style={{ ...inputStyle, padding: '10px' }} 
          />
        </div>
      </div>

      <button 
        onClick={handleSimpan}
        disabled={loading}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        style={{ 
          ...buttonStyle, 
          backgroundColor: loading ? '#A0AEC0' : (isHover ? '#0d4a85' : '#093661') 
        }}
      >
        {loading ? 'Sedang Mengunggah...' : 'Upload ke Galeri Foto'}
      </button>

      <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '40px 0 30px 0' }} />

      <h4 style={{ color: '#2D3748', fontSize: '16px', fontWeight: '600', marginBottom: '15px' }}>Foto Terbit</h4>
      <div style={{ overflowX: 'auto', border: '1px solid #E2E8F0', borderRadius: '12px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC' }}>
              <th style={thStyle}>Pratinjau</th>
              <th style={thStyle}>Keterangan</th>
              <th style={{ ...thStyle, textAlign: 'center' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {daftarFoto.length > 0 ? (
              daftarFoto.map((foto: any) => (
                <tr key={foto.id} style={{ borderBottom: '1px solid #EDF2F7' }}>
                  <td style={tdStyle}>
                    <img src={foto.url} alt="galeri" style={{ width: isMobile ? '60px' : '80px', height: isMobile ? '40px' : '50px', objectFit: 'cover', borderRadius: '6px' }} />
                  </td>
                  <td style={{ ...tdStyle, color: '#4A5568', fontSize: isMobile ? '12px' : '14px' }}>{foto.keterangan}</td>
                  <td style={{ ...tdStyle, textAlign: 'center' }}>
                    <button 
                      onClick={() => handleDelete(foto.id, 'daftar_foto')} 
                      style={deleteBtnStyle}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} style={{ textAlign: 'center', padding: '40px', color: '#A0AEC0', fontSize: '14px' }}>Belum ada foto yang diunggah.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const labelStyle = { display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '600', color: '#4A5568' };
const inputStyle = { width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none', fontSize: '14px', boxSizing: 'border-box' as 'border-box' };
const buttonStyle = { width: '100%', padding: '14px', color: 'white', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer', transition: '0.2s' };
const thStyle = { padding: '15px', textAlign: 'left' as 'left', fontSize: '12px', color: '#718096', textTransform: 'uppercase' as 'uppercase', letterSpacing: '0.5px' };
const tdStyle = { padding: '15px', fontSize: '14px' };
const deleteBtnStyle = { color: '#E53E3E', border: 'none', background: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '13px' };