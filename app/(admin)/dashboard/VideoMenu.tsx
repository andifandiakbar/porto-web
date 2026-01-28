"use client";
import React, { useState } from 'react';
import { supabase } from '../../../lib/supabase';

interface VideoMenuProps {
  daftarVideo: any[];
  fetchVideo: () => void;
  handleDelete: (id: number, table: string) => void;
}

export default function VideoMenu({ daftarVideo = [], fetchVideo, handleDelete }: VideoMenuProps) {
  const [judul, setJudul] = useState('');
  const [tipeVideo, setTipeVideo] = useState('youtube');
  const [linkYoutube, setLinkYoutube] = useState('');
  const [fileVideo, setFileVideo] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const handleSimpan = async () => {
    if (!judul) {
      alert("Masukkan judul video terlebih dahulu");
      return;
    }

    setLoading(true);
    try {
      let finalUrl = linkYoutube;

      if (tipeVideo === 'manual' && fileVideo) {
        const fileExt = fileVideo.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `videos/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('images')
          .upload(filePath, fileVideo);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage.from('images').getPublicUrl(filePath);
        finalUrl = urlData.publicUrl;
      }

      const { error: insertError } = await supabase
        .from('daftar_video')
        .insert([{ 
          judul: judul, 
          tipe: tipeVideo, 
          url: finalUrl 
        }]);

      if (insertError) throw insertError;

      alert("Video Berhasil Dipublikasikan!");
      setJudul('');
      setLinkYoutube('');
      setFileVideo(null);
      fetchVideo();
    } catch (error: any) {
      alert("Gagal menyimpan video: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '30px', backgroundColor: '#FFFFFF', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#093661', fontSize: '20px', fontWeight: '700', margin: '0 0 10px 0', fontFamily: 'inherit' }}>🎥 Galeri Video</h3>
        <p style={{ color: '#718096', fontSize: '14px', margin: 0, fontFamily: 'inherit' }}>Kelola konten video YouTube atau unggah file video manual.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        <div>
          <label style={labelStyle}>Judul Video</label>
          <input 
            type="text" 
            placeholder="Masukkan judul video" 
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            style={inputStyle} 
          />
        </div>
        <div>
          <label style={labelStyle}>Sumber Video</label>
          <select 
            value={tipeVideo} 
            onChange={(e) => setTipeVideo(e.target.value)} 
            style={inputStyle}
          >
            <option value="youtube">Link YouTube</option>
            <option value="manual">Upload File Manual</option>
          </select>
        </div>
      </div>

      {tipeVideo === 'youtube' ? (
        <div style={{ marginBottom: '25px' }}>
          <label style={labelStyle}>URL YouTube</label>
          <input 
            type="text" 
            placeholder="https://www.youtube.com/watch?v=..." 
            value={linkYoutube || ''} 
            onChange={(e) => setLinkYoutube(e.target.value)}
            style={inputStyle} 
            />
        </div>
      ) : (
        <div style={{ marginBottom: '25px' }}>
          <label style={labelStyle}>Pilih File Video</label>
          <input 
            type="file" 
            accept="video/*"
            onChange={(e) => setFileVideo(e.target.files ? e.target.files[0] : null)}
            style={{ ...inputStyle, padding: '10px' }} 
          />
        </div>
      )}

      <button 
        onClick={handleSimpan}
        disabled={loading}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        style={{
          ...buttonStyle,
          backgroundColor: loading ? '#A0AEC0' : (isHover ? '#0d4a85' : '#093661'),
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Sedang Memproses...' : 'Publikasikan Video'}
      </button>

      <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '40px 0 30px 0' }} />

      <h4 style={{ color: '#2D3748', fontSize: '16px', fontWeight: '600', marginBottom: '15px', fontFamily: 'inherit' }}>Riwayat Video Terbit</h4>
      <div style={{ overflowX: 'auto', border: '1px solid #E2E8F0', borderRadius: '12px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC' }}>
              <th style={thStyle}>Preview</th>
              <th style={thStyle}>Judul Video</th>
              <th style={thStyle}>Tipe</th>
              <th style={{ ...thStyle, textAlign: 'center' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {daftarVideo.length > 0 ? (
              daftarVideo.map((vid: any) => (
                <tr key={vid.id} style={{ borderBottom: '1px solid #EDF2F7' }}>
                  <td style={tdStyle}>
                    <div style={{ width: '70px', height: '40px', backgroundColor: '#2D3748', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '12px' }}>▶</div>
                  </td>
                  <td style={{ ...tdStyle, fontWeight: '500', color: '#2D3748' }}>{vid.judul}</td>
                  <td style={tdStyle}>
                    <span style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', backgroundColor: vid.tipe === 'youtube' ? '#FFF5F5' : '#F0FFF4', color: vid.tipe === 'youtube' ? '#C53030' : '#2F855A', fontFamily: 'inherit' }}>
                      {vid.tipe}
                    </span>
                  </td>
                  <td style={{ ...tdStyle, textAlign: 'center' }}>
                    <button 
                      onClick={() => handleDelete(vid.id, 'daftar_video')} 
                      style={deleteBtnStyle}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center', padding: '40px', color: '#A0AEC0', fontSize: '14px', fontFamily: 'inherit' }}>Belum ada video yang diterbitkan.</td>
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
const buttonStyle = { width: '100%', padding: '14px', color: 'white', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 'bold', transition: '0.2s', fontFamily: 'inherit' };
const thStyle = { padding: '15px', textAlign: 'left' as 'left', fontSize: '12px', color: '#718096', textTransform: 'uppercase' as 'uppercase', letterSpacing: '0.5px', fontFamily: 'inherit' };
const tdStyle = { padding: '15px', fontSize: '14px', fontFamily: 'inherit' };
const deleteBtnStyle = { color: '#E53E3E', border: 'none', background: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '13px', fontFamily: 'inherit' };