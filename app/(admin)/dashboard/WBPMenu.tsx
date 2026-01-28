"use client";
import React, { useState } from 'react';

export default function WBPMenu({ wbpForm, setWbpForm, handleSimpanWBP, daftarWBP, handleDelete }: any) {
  const [isHover, setIsHover] = useState(false);

  return (
    <div style={{ padding: '30px', backgroundColor: '#FFFFFF', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#093661', fontSize: '20px', fontWeight: '700', margin: '0 0 10px 0', fontFamily: 'inherit' }}>
          👥 Data Narapidana (WBP)
        </h3>
        <p style={{ color: '#718096', fontSize: '14px', margin: 0, fontFamily: 'inherit' }}>
          Input dan kelola data warga binaan pemasyarakatan secara terpusat.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '25px' }}>
        <FormInput 
          label="Nama Lengkap" 
          placeholder="Nama sesuai KTP" 
          value={wbpForm.nama} 
          onChange={(e: any) => setWbpForm({...wbpForm, nama: e.target.value})} 
        />
        <FormInput 
          label="NIK" 
          placeholder="16 digit NIK" 
          value={wbpForm.nik} 
          onChange={(e: any) => setWbpForm({...wbpForm, nik: e.target.value})} 
        />
        <FormInput 
          label="Kasus" 
          placeholder="Contoh: Narkotika" 
          value={wbpForm.kasus} 
          onChange={(e: any) => setWbpForm({...wbpForm, kasus: e.target.value})} 
        />
        <FormInput 
          label="Lama Pidana" 
          placeholder="Contoh: 5 Tahun" 
          value={wbpForm.lama_pidana} 
          onChange={(e: any) => setWbpForm({...wbpForm, lama_pidana: e.target.value})} 
        />
        <FormInput 
          label="Ekspirasi" 
          type="date" 
          value={wbpForm.ekspirasi} 
          onChange={(e: any) => setWbpForm({...wbpForm, ekspirasi: e.target.value})} 
        />
        <FormInput 
          label="Blok / Kamar" 
          placeholder="Contoh: A-04" 
          value={wbpForm.blok_kamar} 
          onChange={(e: any) => setWbpForm({...wbpForm, blok_kamar: e.target.value})} 
        />
        
        <button 
          onClick={handleSimpanWBP} 
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          style={{ 
            ...submitBtnBase, 
            gridColumn: 'span 2',
            backgroundColor: isHover ? '#0d4a85' : '#093661'
          }}
        >
          Simpan Data Narapidana
        </button>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '40px 0 30px 0' }} />

      <h4 style={{ color: '#2D3748', fontSize: '16px', fontWeight: '600', marginBottom: '15px', fontFamily: 'inherit' }}>
        Riwayat Data Terdaftar
      </h4>
      <div style={{ overflowX: 'auto', border: '1px solid #E2E8F0', borderRadius: '12px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC' }}>
              <th style={thStyle}>Nama</th>
              <th style={thStyle}>Kasus</th>
              <th style={thStyle}>Lama Pidana</th>
              <th style={thStyle}>Blok</th>
              <th style={{ ...thStyle, textAlign: 'center' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {daftarWBP.length > 0 ? (
              daftarWBP.map((item: any) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #EDF2F7' }}>
                  <td style={{ ...tdStyle, fontWeight: '600', color: '#2D3748' }}>{item.nama}</td>
                  <td style={tdStyle}>{item.kasus}</td>
                  <td style={tdStyle}>{item.lama_pidana}</td>
                  <td style={tdStyle}>
                    <span style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: '600', backgroundColor: '#EBF8FF', color: '#2B6CB0' }}>
                      {item.blok_kamar}
                    </span>
                  </td>
                  <td style={{ ...tdStyle, textAlign: 'center' }}>
                    <button 
                      onClick={() => handleDelete(item.id, 'daftar_wbp')} 
                      style={deleteBtnStyle}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '40px', color: '#A0AEC0', fontSize: '14px', fontFamily: 'inherit' }}>
                  Belum ada data narapidana terdaftar.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FormInput({ label, value, ...props }: any) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <label style={labelStyle}>{label}</label>
      <input style={inputStyle} value={value ?? ''} {...props} />
    </div>
  );
}

const labelStyle = { display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '600', color: '#4A5568', fontFamily: 'inherit' };
const inputStyle = { width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none', fontSize: '14px', boxSizing: 'border-box' as 'border-box', fontFamily: 'inherit' };
const submitBtnBase: any = { padding: '14px', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px', transition: '0.2s', fontFamily: 'inherit' };
const thStyle = { padding: '15px', textAlign: 'left' as 'left', fontSize: '12px', color: '#718096', textTransform: 'uppercase' as 'uppercase', letterSpacing: '0.5px', fontFamily: 'inherit' };
const tdStyle = { padding: '15px', fontSize: '14px', color: '#4A5568', fontFamily: 'inherit' };
const deleteBtnStyle = { color: '#E53E3E', border: 'none', background: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '13px', fontFamily: 'inherit' };