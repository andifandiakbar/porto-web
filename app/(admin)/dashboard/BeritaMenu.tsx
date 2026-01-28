"use client";
import React, { useState } from 'react';

export default function BeritaMenu({ 
  judulBerita, setJudulBerita, 
  kategoriBerita, setKategoriBerita, 
  setFileGambar, isiBerita, setIsiBerita, 
  handlePublikasiBerita, daftarBerita, 
  toggleStatusBerita, handleDelete 
}: any) {
  const [isHover, setIsHover] = useState(false);

  return (
    <div style={{ padding: '30px', backgroundColor: '#FFFFFF', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#093661', fontSize: '20px', fontWeight: '700', margin: '0 0 10px 0', fontFamily: 'inherit' }}>
          📰 Posting Berita Terbaru
        </h3>
        <p style={{ color: '#718096', fontSize: '14px', margin: 0, fontFamily: 'inherit' }}>
          Tulis dan publikasikan artikel atau informasi terbaru mengenai kegiatan satuan kerja.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={labelStyle}>Judul Berita</label>
          <input 
            style={inputStyle} 
            placeholder="Masukkan judul berita yang menarik" 
            value={judulBerita} 
            onChange={(e) => setJudulBerita(e.target.value)} 
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <label style={labelStyle}>Kategori</label>
            <select 
              style={inputStyle} 
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
              style={{ ...inputStyle, padding: '10px' }} 
            />
          </div>
        </div>

        <div>
          <label style={labelStyle}>Konten Berita</label>
          <textarea 
            style={{ ...inputStyle, height: '150px', resize: 'none' }} 
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
            backgroundColor: isHover ? '#0d4a85' : '#093661' 
          }}
        >
          Publikasikan Berita
        </button>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '40px 0 30px 0' }} />

      <h4 style={{ color: '#2D3748', fontSize: '16px', fontWeight: '600', marginBottom: '15px', fontFamily: 'inherit' }}>
        Riwayat Berita
      </h4>
      <div style={{ overflowX: 'auto', border: '1px solid #E2E8F0', borderRadius: '12px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC' }}>
              <th style={thStyle}>Judul Berita</th>
              <th style={thStyle}>Tanggal</th>
              <th style={thStyle}>Kategori</th>
              <th style={{ ...thStyle, textAlign: 'center' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {daftarBerita.length > 0 ? (
              daftarBerita.map((news: any) => (
                <tr key={news.id} style={{ borderBottom: '1px solid #EDF2F7' }}>
                  <td style={{ ...tdStyle, fontWeight: '500', color: '#2D3748', maxWidth: '300px' }}>{news.judul}</td>
                  <td style={{ ...tdStyle, color: '#718096' }}>{news.tanggal}</td>
                  <td style={tdStyle}>
                    <span 
                      onClick={() => toggleStatusBerita(news.id, news.status)} 
                      style={{ 
                        color: news.status === 'Informasi' ? '#3182CE' : '#38A169', 
                        fontWeight: '700', 
                        cursor: 'pointer', 
                        backgroundColor: news.status === 'Informasi' ? '#EBF8FF' : '#F0FFF4', 
                        padding: '4px 10px', 
                        borderRadius: '6px',
                        fontSize: '11px',
                        textTransform: 'uppercase'
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
                <td colSpan={4} style={{ textAlign: 'center', padding: '40px', color: '#A0AEC0', fontSize: '14px' }}>
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

const labelStyle = { display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '600', color: '#4A5568', fontFamily: 'inherit' };
const inputStyle = { width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none', fontSize: '14px', boxSizing: 'border-box' as 'border-box', fontFamily: 'inherit' };
const buttonStyle = { width: '100%', padding: '14px', color: 'white', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer', transition: '0.2s', fontFamily: 'inherit' };
const thStyle = { padding: '15px', textAlign: 'left' as 'left', fontSize: '12px', color: '#718096', textTransform: 'uppercase' as 'uppercase', letterSpacing: '0.5px', fontFamily: 'inherit' };
const tdStyle = { padding: '15px', fontSize: '14px', color: '#4A5568', fontFamily: 'inherit' };
const deleteBtnStyle = { color: '#E53E3E', border: 'none', background: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '13px', fontFamily: 'inherit' };