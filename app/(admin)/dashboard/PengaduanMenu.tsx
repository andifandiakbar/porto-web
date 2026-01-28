"use client";
import React, { useState, useEffect } from 'react';

export default function PengaduanMenu({ 
  pengaduanForm, setPengaduanForm, 
  handleSimpanPengaduan, daftarPengaduan, 
  toggleStatusPengaduan, handleDelete 
}: any) {
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

  const getStatusStyle = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'selesai':
        return { bg: '#F0FFF4', text: '#2F855A' };
      case 'proses':
        return { bg: '#EBF8FF', text: '#2B6CB0' };
      default:
        return { bg: '#FFFBEB', text: '#B7791F' };
    }
  };

  return (
    <div style={{ padding: isMobile ? '15px' : '30px', backgroundColor: '#FFFFFF', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#093661', fontSize: isMobile ? '18px' : '20px', fontWeight: '700', margin: '0 0 10px 0', fontFamily: 'inherit' }}>
          📩 Manajemen Pengaduan Layanan
        </h3>
        <p style={{ color: '#718096', fontSize: isMobile ? '13px' : '14px', margin: 0, fontFamily: 'inherit' }}>
          Pantau dan kelola laporan atau keluhan masyarakat mengenai layanan satuan kerja.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '20px' }}>
        <div>
          <label style={labelStyle}>Nama Pelapor</label>
          <input 
            style={inputStyle} 
            placeholder="Masukkan nama lengkap pelapor" 
            value={pengaduanForm.pelapor} 
            onChange={(e: any) => setPengaduanForm({...pengaduanForm, pelapor: e.target.value})} 
          />
        </div>
        <div>
          <label style={labelStyle}>Email / No. HP</label>
          <input 
            style={inputStyle} 
            placeholder="Kontak yang bisa dihubungi" 
            value={pengaduanForm.kontak} 
            onChange={(e: any) => setPengaduanForm({...pengaduanForm, kontak: e.target.value})} 
          />
        </div>
        <div style={{ gridColumn: isMobile ? 'span 1' : 'span 2' }}>
          <label style={labelStyle}>Isi Pengaduan</label>
          <textarea 
            style={{ ...inputStyle, height: '100px', resize: 'none' }} 
            placeholder="Tuliskan detail pengaduan secara jelas di sini..." 
            value={pengaduanForm.isi} 
            onChange={(e: any) => setPengaduanForm({...pengaduanForm, isi: e.target.value})}
          ></textarea>
        </div>
        
        <button 
          onClick={handleSimpanPengaduan} 
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          style={{ 
            ...buttonStyle, 
            gridColumn: isMobile ? 'span 1' : 'span 2',
            backgroundColor: isHover ? '#0d4a85' : '#093661' 
          }}
        >
          Simpan Laporan Pengaduan
        </button>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '40px 0 30px 0' }} />

      <h4 style={{ color: '#2D3748', fontSize: '16px', fontWeight: '600', marginBottom: '15px', fontFamily: 'inherit' }}>
        Riwayat Pengaduan Masuk
      </h4>
      <div style={{ overflowX: 'auto', border: '1px solid #E2E8F0', borderRadius: '12px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC' }}>
              <th style={thStyle}>Pelapor</th>
              <th style={thStyle}>Isi Pengaduan</th>
              <th style={thStyle}>Status</th>
              <th style={{ ...thStyle, textAlign: 'center' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {daftarPengaduan.length > 0 ? (
              daftarPengaduan.map((item: any) => {
                const style = getStatusStyle(item.status);
                return (
                  <tr key={item.id} style={{ borderBottom: '1px solid #EDF2F7' }}>
                    <td style={tdStyle}>
                      <div style={{ fontWeight: '600', color: '#2D3748' }}>{item.pelapor}</div>
                      <div style={{ fontSize: '12px', color: '#718096' }}>{item.kontak}</div>
                    </td>
                    <td style={tdStyle}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                         <span style={{ maxWidth: isMobile ? '100px' : '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '13px' }}>
                           {item.isi}
                         </span>
                         <button 
                           onClick={() => alert(item.isi)} 
                           style={viewBtnStyle}
                         >
                           Lihat
                         </button>
                      </div>
                    </td>
                    <td style={tdStyle}>
                      <button 
                        onClick={() => toggleStatusPengaduan(item.id, item.status)} 
                        style={{ 
                          padding: '4px 12px', 
                          borderRadius: '6px', 
                          border: 'none', 
                          fontSize: '11px', 
                          cursor: 'pointer', 
                          fontWeight: '700', 
                          textTransform: 'uppercase',
                          backgroundColor: style.bg, 
                          color: style.text,
                          transition: '0.3s'
                        }}
                      >
                        {item.status || 'Pending'}
                      </button>
                    </td>
                    <td style={{ ...tdStyle, textAlign: 'center' }}>
                      <button 
                        onClick={() => handleDelete(item.id, 'daftar_pengaduan')} 
                        style={deleteBtnStyle}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center', padding: '40px', color: '#A0AEC0', fontSize: '14px' }}>
                  Belum ada pengaduan masuk.
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
const tdStyle = { padding: '15px', fontSize: '14px', fontFamily: 'inherit' };
const deleteBtnStyle = { color: '#E53E3E', border: 'none', background: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '13px', fontFamily: 'inherit' };
const viewBtnStyle = { padding: '4px 10px', fontSize: '11px', borderRadius: '6px', border: '1px solid #E2E8F0', cursor: 'pointer', background: '#FFF', color: '#4A5568', fontWeight: '600', fontFamily: 'inherit' };