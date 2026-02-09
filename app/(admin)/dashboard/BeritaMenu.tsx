"use client";
import React, { useState, useEffect } from 'react';

export default function BeritaMenu({ 
  judulBerita, setJudulBerita, 
  kategoriBerita, setKategoriBerita, 
  setFileGambar, isiBerita, setIsiBerita, 
  handlePublikasiBerita, daftarBerita, 
  toggleStatusBerita, handleDelete 
}: any) {
  const [isHover, setIsHover] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  return (
    <div style={{ padding: isMobile ? '15px' : '40px', backgroundColor: '#FFFFFF', borderRadius: '20px', fontFamily: "'Inter', sans-serif" }}>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      
      <div style={{ marginBottom: '35px' }}>
        <h3 style={{ color: '#093661', fontSize: isMobile ? '18px' : '22px', fontWeight: '800', margin: '0 0 5px 0' }}>
          Posting Berita Terbaru
        </h3>
        <p style={{ color: '#718096', fontSize: isMobile ? '13px' : '14px', margin: 0 }}>
          Tulis dan publikasikan artikel atau informasi terbaru mengenai kegiatan satuan kerja.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', backgroundColor: '#F8FAFC', padding: isMobile ? '20px' : '30px', borderRadius: '18px', border: '1px solid #E2E8F0' }}>
        <div>
          <label style={labelStyle}>Judul Berita</label>
          <input 
            style={inputStyle} 
            placeholder="Masukkan judul berita yang menarik" 
            value={judulBerita} 
            onChange={(e) => setJudulBerita(e.target.value)} 
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '20px' }}>
          <div>
            <label style={labelStyle}>Kategori</label>
            <select 
              style={selectStyle} 
              value={kategoriBerita} 
              onChange={(e) => setKategoriBerita(e.target.value)}
            >
              <option value="Informasi">Informasi</option>
              <option value="Wawasan">Wawasan</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Foto Berita</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={(e: any) => setFileGambar(e.target.files[0])} 
              style={{ ...inputStyle, padding: '10px', backgroundColor: 'white' }} 
            />
          </div>
        </div>

        <div>
          <label style={labelStyle}>Konten Berita</label>
          <textarea 
            style={{ ...inputStyle, height: '180px', resize: 'none' }} 
            placeholder="Tuliskan isi berita secara lengkap di sini..." 
            value={isiBerita} 
            onChange={(e) => setIsiBerita(e.target.value)}
          ></textarea>
        </div>

        <button 
          onClick={handlePublikasiBerita} 
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          style={{ 
            ...buttonStyle, 
            backgroundColor: isHover ? '#0d4a85' : '#093661',
            boxShadow: isHover ? '0 4px 12px rgba(9, 54, 97, 0.2)' : 'none'
          }}
        >
          Publikasikan Berita
        </button>
      </div>

      <div style={{ height: '1px', backgroundColor: '#EDF2F7', margin: '45px 0' }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h4 style={{ color: '#2D3748', fontSize: '18px', fontWeight: '800', margin: 0 }}>
          Riwayat Berita
        </h4>
      </div>

      <div style={{ overflowX: 'auto', border: '1px solid #E2E8F0', borderRadius: '16px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', tableLayout: 'fixed' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '2px solid #EDF2F7' }}>
              <th style={{ ...thStyle, width: isMobile ? '50%' : '40%' }}>Judul Berita</th>
              {!isMobile && <th style={{ ...thStyle, width: '20%' }}>Tanggal</th>}
              <th style={{ ...thStyle, width: isMobile ? '25%' : '20%' }}>Kategori</th>
              <th style={{ ...thStyle, textAlign: 'center', width: isMobile ? '25%' : '20%' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {daftarBerita.length > 0 ? (
              daftarBerita.map((news: any) => (
                <tr key={news.id} style={{ borderBottom: '1px solid #F1F5F9', transition: '0.2s' }}>
                  <td style={{ ...tdStyle, fontWeight: '700', color: '#2D3748' }}>
                    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {news.judul}
                    </div>
                  </td>
                  {!isMobile && <td style={{ ...tdStyle, color: '#718096' }}>{news.tanggal}</td>}
                  <td style={tdStyle}>
                    <span 
                      onClick={() => toggleStatusBerita(news.id, news.status)} 
                      style={{ 
                        color: news.status === 'Informasi' ? '#093661' : '#38A169', 
                        fontWeight: '800', 
                        cursor: 'pointer', 
                        backgroundColor: news.status === 'Informasi' ? '#09366110' : '#F0FFF4', 
                        padding: '6px 12px', 
                        borderRadius: '8px',
                        fontSize: '11px',
                        textTransform: 'uppercase',
                        border: news.status === 'Informasi' ? '1px solid #09366120' : '1px solid #C6F6D5'
                      }}
                    >
                      {news.status || 'Informasi'}
                    </span>
                  </td>
                  <td style={{ ...tdStyle, textAlign: 'center' }}>
                    <button 
                      onClick={() => handleDelete(news.id, 'daftar_berita')} 
                      style={deleteBtnStyle}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={isMobile ? 3 : 4} style={{ textAlign: 'center', padding: '100px 20px', color: '#A0AEC0', fontSize: '14px', fontStyle: 'italic' }}>
                  Belum ada berita yang dipublikasikan.
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
const inputStyle = { width: '100%', padding: '12px 16px', borderRadius: '10px', border: '2px solid #E2E8F0', fontSize: '14px', outline: 'none', transition: '0.3s', backgroundColor: 'white', boxSizing: 'border-box' as 'border-box' };
const selectStyle = { ...inputStyle, cursor: 'pointer', fontWeight: '600', color: '#093661' };
const buttonStyle = { width: '100%', padding: '16px', color: 'white', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: '800', cursor: 'pointer', transition: '0.3s', display: 'flex', justifyContent: 'center', alignItems: 'center' };
const thStyle = { padding: '18px 20px', textAlign: 'left' as 'left', fontSize: '11px', fontWeight: '800', color: '#718096', textTransform: 'uppercase' as 'uppercase', letterSpacing: '1px' };
const tdStyle = { padding: '20px', fontSize: '14px', color: '#4A5568' };
const deleteBtnStyle = { color: '#E53E3E', border: '1px solid #FED7D7', background: '#FFF5F5', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '12px', transition: '0.2s' };