"use client";
import React, { useState } from 'react';
import { supabase } from '../../../lib/supabase';

interface ProdukMenuProps {
  daftarKarya: any[];
  fetchKarya: () => void;
  handleDelete: (id: number, table: string) => void;
}

export default function ProdukMenu({ daftarKarya = [], fetchKarya, handleDelete }: ProdukMenuProps) {
  const [nama, setNama] = useState('');
  const [harga, setHarga] = useState('');
  const [kategori, setKategori] = useState('');
  const [unit, setUnit] = useState('Unit Produksi Rutan Sinjai');
  const [deskripsi, setDeskripsi] = useState('');
  const [fileGambar, setFileGambar] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileGambar(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSimpan = async () => {
    if (!nama || !harga || !fileGambar || !kategori) {
      alert("Mohon lengkapi Nama, Harga, Kategori, dan Foto Produk");
      return;
    }

    setLoading(true);
    try {
      const fileExt = fileGambar.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `produk/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, fileGambar);

      if (uploadError) throw new Error("Gagal upload gambar.");

      const { data: urlData } = supabase.storage.from('images').getPublicUrl(filePath);
      const publicUrl = urlData.publicUrl;

      const { error: insertError } = await supabase
        .from('daftar_karya')
        .insert([{ 
          nama: nama, 
          harga: harga, 
          kategori: kategori,
          unit: unit,
          deskripsi: deskripsi, 
          img: publicUrl 
        }]);

      if (insertError) throw insertError;

      alert("Produk Berhasil Ditambahkan!");
      setNama(''); setHarga(''); setKategori(''); setDeskripsi(''); setFileGambar(null); setPreviewUrl(null);
      fetchKarya();
    } catch (error: any) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '30px', backgroundColor: '#FFFFFF', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#093661', fontSize: '20px', fontWeight: '700', margin: '0 0 10px 0' }}>🎨 Manajemen Karya WBP</h3>
        <p style={{ color: '#718096', fontSize: '14px', margin: 0 }}>Kelola dan publikasikan produk hasil karya warga binaan ke galeri publik.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        <div>
          <label style={labelStyle}>Nama Produk</label>
          <input 
            type="text" 
            placeholder="Nama barang karya WBP" 
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            style={inputStyle} 
          />
        </div>
        <div>
          <label style={labelStyle}>Harga (Rp)</label>
          <input 
            type="text" 
            placeholder="Masukkan nominal harga" 
            value={harga}
            onChange={(e) => setHarga(e.target.value)}
            style={inputStyle} 
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        <div>
          <label style={labelStyle}>Kategori Produk</label>
          <input 
            type="text" 
            placeholder="Contoh: Aksesoris" 
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
            style={inputStyle} 
          />
        </div>
        <div>
          <label style={labelStyle}>Unit Produksi</label>
          <input 
            type="text" 
            placeholder="Unit Produksi" 
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            style={inputStyle} 
          />
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={labelStyle}>Upload Foto Produk</label>
        <div style={uploadBoxStyle}>
          <input type="file" accept="image/*" onChange={handleFileChange} style={{ fontSize: '14px', cursor: 'pointer', fontFamily: 'inherit' }} />
          {previewUrl && (
            <div style={{ marginTop: '15px' }}>
              <img src={previewUrl} alt="Preview" style={{ maxHeight: '150px', borderRadius: '8px', border: '1px solid #E2E8F0' }} />
            </div>
          )}
        </div>
      </div>

      <div style={{ marginBottom: '25px' }}>
        <label style={labelStyle}>Deskripsi Produk</label>
        <textarea 
          placeholder="Jelaskan detail produk secara singkat..." 
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
          style={{ ...inputStyle, height: '100px', resize: 'none' }}
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
        {loading ? 'Sedang Menyimpan...' : 'Tambah Produk Karya Binaan'}
      </button>

      <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '40px 0 30px 0' }} />

      <h4 style={{ color: '#2D3748', fontSize: '16px', fontWeight: '600', marginBottom: '15px' }}>Produk Terbit</h4>
      <div style={{ overflowX: 'auto', border: '1px solid #E2E8F0', borderRadius: '12px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC' }}>
              <th style={thStyle}>Foto</th>
              <th style={thStyle}>Nama Produk</th>
              <th style={thStyle}>Kategori</th>
              <th style={thStyle}>Unit</th>
              <th style={thStyle}>Harga</th>
              <th style={{ ...thStyle, textAlign: 'center' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {daftarKarya.length > 0 ? (
              daftarKarya.map((item: any) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #EDF2F7' }}>
                  <td style={tdStyle}>
                    <img 
                      src={item.img || item.image_url || 'https://via.placeholder.com/50'} 
                      alt="produk" 
                      style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '6px' }} 
                    />
                  </td>
                  <td style={{ ...tdStyle, fontWeight: '600', color: '#2D3748' }}>{item.nama}</td>
                  <td style={tdStyle}>
                    <span style={{ backgroundColor: '#FFF7D6', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', color: '#000' }}>
                      {item.kategori}
                    </span>
                  </td>
                  <td style={{ ...tdStyle, fontSize: '12px', color: '#718096' }}>{item.unit}</td>
                  <td style={{ ...tdStyle, color: '#4A5568' }}>{item.harga}</td>
                  <td style={{ ...tdStyle, textAlign: 'center' }}>
                    <button 
                      onClick={() => handleDelete(item.id, 'daftar_karya')} 
                      style={deleteBtnStyle}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '40px', color: '#A0AEC0', fontSize: '14px' }}>
                  Belum ada produk terbit.
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
const uploadBoxStyle = { padding: '15px', border: '1px solid #E2E8F0', borderRadius: '8px', backgroundColor: '#F8FAFC' };
const buttonStyle = { width: '100%', padding: '14px', color: 'white', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer', transition: '0.2s', fontFamily: 'inherit' };
const thStyle = { padding: '15px', textAlign: 'left' as 'left', fontSize: '12px', color: '#718096', textTransform: 'uppercase' as 'uppercase', letterSpacing: '0.5px', fontFamily: 'inherit' };
const tdStyle = { padding: '15px', fontSize: '14px', fontFamily: 'inherit' };
const deleteBtnStyle = { color: '#E53E3E', border: 'none', background: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '13px', fontFamily: 'inherit' };