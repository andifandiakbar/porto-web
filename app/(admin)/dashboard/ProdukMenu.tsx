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
  const [updateLoading, setUpdateLoading] = useState(false); 
  
  const [isHover, setIsHover] = useState(false);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ nama: '', harga: '', kategori: '' });
  const [editFileGambar, setEditFileGambar] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileGambar(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleEditFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setEditFileGambar(e.target.files[0]);
    }
  };

  const startEdit = (item: any) => {
    setEditingId(item.id);
    setEditForm({
      nama: item.nama,
      harga: item.harga,
      kategori: item.kategori
    });
    setEditFileGambar(null);
  };

  const handleInlineUpdate = async (id: number) => {
    setUpdateLoading(true); 
    try {
      let updatedImgUrl = null;

      if (editFileGambar) {
        const fileExt = editFileGambar.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `produk/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('images')
          .upload(filePath, editFileGambar);

        if (uploadError) throw new Error("Gagal upload gambar baru.");

        const { data: urlData } = supabase.storage.from('images').getPublicUrl(filePath);
        updatedImgUrl = urlData.publicUrl;
      }

      const updateData: any = {
        nama: editForm.nama,
        harga: editForm.harga,
        kategori: editForm.kategori
      };

      if (updatedImgUrl) {
        updateData.img = updatedImgUrl;
      }

      const { error } = await supabase
        .from('daftar_karya')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;

      alert("Data berhasil diperbarui!");
      setEditingId(null);
      setEditFileGambar(null);
      fetchKarya();
    } catch (error: any) {
      alert("Gagal update: " + error.message);
    } finally {
      setUpdateLoading(false); 
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
    <div style={{ padding: '40px', backgroundColor: '#FFFFFF', borderRadius: '20px', fontFamily: '"Arial"' }}>
      <style>{`
        .btn-act:active {
          filter: brightness(0.85);
          opacity: 0.9;
          transform: scale(0.98);
        }
      `}</style>
      
      <div style={{ marginBottom: '35px' }}>
        <h3 style={{ color: '#093b77', fontSize: '24px', fontWeight: '700', margin: '0 0 5px 0', letterSpacing: '-0.5px' }}>Manajemen Karya WBP</h3>
        <p style={{ color: '#718096', fontSize: '14px', margin: 0, letterSpacing: '-0.2px' }}>Kelola dan publikasikan produk hasil karya warga binaan ke galeri publik.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', padding: '30px', backgroundColor: '#F8FAFC', borderRadius: '18px', border: '1px solid #E2E8F0' }}>
        <div>
          <label style={labelStyle}>Nama Produk</label>
          <input type="text" placeholder="Nama barang karya WBP" value={nama} onChange={(e) => setNama(e.target.value)} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Harga (Rp)</label>
          <input type="text" placeholder="Masukkan nominal harga" value={harga} onChange={(e) => setHarga(e.target.value)} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Kategori Produk</label>
          <input type="text" placeholder="Contoh: Aksesoris" value={kategori} onChange={(e) => setKategori(e.target.value)} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Foto Produk</label>
          <input type="file" accept="image/*" onChange={handleFileChange} style={{ ...inputStyle, padding: '10px', backgroundColor: 'white' }} />
        </div>
        <div style={{ gridColumn: 'span 2' }}>
          <label style={labelStyle}>Deskripsi Produk</label>
          <textarea placeholder="Jelaskan detail produk secara singkat..." value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} style={{ ...inputStyle, height: '100px', resize: 'none' }} />
        </div>

        <button 
          className="btn-act"
          onClick={handleSimpan}
          disabled={loading}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          style={{ 
            ...buttonStyle, 
            backgroundColor: loading ? '#A0AEC0' : (isHover ? '#072e5c' : '#093b77'),
            transition: '0.2s'
          }}
        >
          {loading ? 'Sedang Menyimpan...' : 'Simpan Produk Karya Binaan'}
        </button>
      </div>

      <div style={{ height: '1px', backgroundColor: '#EDF2F7', margin: '45px 0' }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <h4 style={{ fontSize: '18px', fontWeight: '700', color: '#093b77', margin: 0, letterSpacing: '-0.3px' }}>Daftar Produk Aktif</h4>
      </div>

      <div style={{ border: '1px solid #E2E8F0', borderRadius: '16px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '2px solid #EDF2F7' }}>
              <th style={{ ...thStyle, width: '15%' }}>Foto</th>
              <th style={{ ...thStyle, width: '30%' }}>Nama Produk</th>
              <th style={{ ...thStyle, width: '20%' }}>Kategori</th>
              <th style={{ ...thStyle, width: '15%' }}>Harga</th>
              <th style={{ ...thStyle, textAlign: 'center', width: '20%' }}>Navigasi</th>
            </tr>
          </thead>
          <tbody>
            {daftarKarya.length > 0 ? (
              daftarKarya.map((item: any) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={tdStyle}>
                    {editingId === item.id ? (
                      <input type="file" accept="image/*" onChange={handleEditFileChange} style={{ fontSize: '10px', width: '100%', fontFamily: '"Arial"' }} />
                    ) : (
                      <img src={item.img || item.image_url} alt="produk" style={{ width: '60px', height: '45px', objectFit: 'cover', borderRadius: '8px' }} />
                    )}
                  </td>
                  <td style={tdStyle}>
                    {editingId === item.id ? (
                      <input style={inlineInputStyle} value={editForm.nama} onChange={(e) => setEditForm({...editForm, nama: e.target.value})} />
                    ) : (
                      <div style={{ fontWeight: 'normal', color: '#2D3748', fontSize: '14px', letterSpacing: '-0.3px' }}>{item.nama}</div>
                    )}
                  </td>
                  <td style={tdStyle}>
                    {editingId === item.id ? (
                      <input style={inlineInputStyle} value={editForm.kategori} onChange={(e) => setEditForm({...editForm, kategori: e.target.value})} />
                    ) : (
                      <div style={{ fontSize: '13px', color: '#4A5568', fontWeight: 'normal', letterSpacing: '-0.2px' }}>{item.kategori}</div>
                    )}
                  </td>
                  <td style={tdStyle}>
                    {editingId === item.id ? (
                      <input style={inlineInputStyle} value={editForm.harga} onChange={(e) => setEditForm({...editForm, harga: e.target.value})} />
                    ) : (
                      <div style={{ fontSize: '13px', fontWeight: 'normal', color: '#2D3748', letterSpacing: '-0.2px' }}>{item.harga}</div>
                    )}
                  </td>
                  <td style={{ ...tdStyle, textAlign: 'center' }}>
                    <div style={{display: 'flex', justifyContent: 'center', gap: '10px'}}>
                      {editingId === item.id ? (
                        <button 
                          className="btn-act"
                          onClick={() => handleInlineUpdate(item.id)} 
                          disabled={updateLoading} 
                          style={{...btnEditInline, color: '#38A169', transition: '0.2s'}}
                        >
                          {updateLoading ? '...' : 'Simpan'}
                        </button>
                      ) : (
                        <button className="btn-act" onClick={() => startEdit(item)} style={{...btnEditInline, transition: '0.2s'}}>Edit</button>
                      )}
                      <button className="btn-act" onClick={() => handleDelete(item.id, 'daftar_karya')} style={{...btnDeleteInline, transition: '0.2s'}}>Hapus</button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '100px 20px', color: '#A0AEC0', fontSize: '14px', letterSpacing: '-0.2px' }}>Data produk belum tersedia</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const labelStyle = { display: 'block', marginBottom: '10px', fontSize: '13px', fontWeight: 'normal', color: '#2D3748', fontFamily: '"Arial"', letterSpacing: '-0.2px' };
const inputStyle = { width: '100%', padding: '12px 16px', borderRadius: '10px', border: '2px solid #E2E8F0', fontSize: '14px', outline: 'none', boxSizing: 'border-box' as 'border-box', fontFamily: '"Arial"', letterSpacing: '-0.2px' };
const inlineInputStyle = { width: '100%', padding: '5px 8px', borderRadius: '5px', border: '1px solid #093b77', fontSize: '13px', fontFamily: '"Arial"', letterSpacing: '-0.2px' };
const buttonStyle: any = { gridColumn: 'span 2', padding: '16px', color: 'white', border: 'none', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', fontSize: '15px', fontFamily: '"Arial"', letterSpacing: '-0.2px' };
const thStyle = { padding: '18px 20px', textAlign: 'left' as 'left', fontSize: '11px', fontWeight: '700', color: '#718096', letterSpacing: '0.5px', fontFamily: '"Arial"' };
const tdStyle = { padding: '20px', fontSize: '14px', fontFamily: '"Arial"' };
const btnEditInline = { color: '#093b77', border: '1px solid #E2E8F0', background: 'white', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '5px', fontFamily: '"Arial"', letterSpacing: '-0.1px' };
const btnDeleteInline = { color: '#E53E3E', border: '1px solid #FED7D7', background: '#FFF5F5', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '5px', fontFamily: '"Arial"', letterSpacing: '-0.1px' };