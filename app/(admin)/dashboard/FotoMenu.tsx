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
    <div style={{ padding: '40px', backgroundColor: '#FFFFFF', borderRadius: '20px', fontFamily: "'Inter', sans-serif" }}>
      
      <div style={{ marginBottom: '35px' }}>
        <h3 style={{ color: '#093661', fontSize: '24px', fontWeight: '800', margin: '0 0 5px 0' }}>Galeri Foto</h3>
        <p style={{ color: '#718096', fontSize: '14px', margin: 0 }}>Kelola dan publikasikan dokumentasi kegiatan ke website publik.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '20px', padding: '30px', backgroundColor: '#F8FAFC', borderRadius: '18px', border: '1px solid #E2E8F0' }}>
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
            style={{ ...inputStyle, padding: '10px', backgroundColor: 'white' }} 
          />
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
      </div>

      <div style={{ height: '1px', backgroundColor: '#EDF2F7', margin: '45px 0' }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <h4 style={{ fontSize: '18px', fontWeight: '800', color: '#2D3748', margin: 0 }}>
          Foto Terbit
        </h4>
      </div>

      <div style={{ border: '1px solid #E2E8F0', borderRadius: '16px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '2px solid #EDF2F7' }}>
              <th style={{ ...thStyle, width: '20%' }}>PRATINJAU</th>
              <th style={{ ...thStyle, width: '60%' }}>KETERANGAN</th>
              <th style={{ ...thStyle, textAlign: 'center', width: '20%' }}>NAVIGASI</th>
            </tr>
          </thead>
          <tbody>
            {daftarFoto.length > 0 ? (
              daftarFoto.map((foto: any) => (
                <tr key={foto.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={tdStyle}>
                    <img src={foto.url} alt="galeri" style={{ width: '80px', height: '50px', objectFit: 'cover', borderRadius: '8px' }} />
                  </td>
                  <td style={{ ...tdStyle, fontWeight: '500', color: '#4A5568' }}>{foto.keterangan}</td>
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
                <td colSpan={3} style={{ textAlign: 'center', padding: '100px 20px', color: '#A0AEC0', fontSize: '14px' }}>
                  Belum ada foto yang diunggah.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const labelStyle = { display: 'block', marginBottom: '10px', fontSize: '13px', fontWeight: '700', color: '#2D3748' };
const inputStyle = { width: '100%', padding: '12px 16px', borderRadius: '10px', border: '2px solid #E2E8F0', fontSize: '14px', outline: 'none', boxSizing: 'border-box' as 'border-box' };
const buttonStyle: any = { gridColumn: 'span 2', padding: '16px', color: 'white', border: 'none', borderRadius: '12px', fontWeight: '800', cursor: 'pointer', fontSize: '15px', transition: '0.3s' };
const thStyle = { padding: '18px 20px', textAlign: 'left' as 'left', fontSize: '11px', fontWeight: '800', color: '#718096', textTransform: 'uppercase' as 'uppercase', letterSpacing: '1px' };
const tdStyle = { padding: '20px', fontSize: '14px' };
const deleteBtnStyle = { color: '#E53E3E', border: '1px solid #FED7D7', background: '#FFF5F5', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '12px' };