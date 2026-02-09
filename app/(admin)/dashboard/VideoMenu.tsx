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
    <div style={{ padding: '40px', backgroundColor: '#FFFFFF', borderRadius: '20px', fontFamily: "'Inter', sans-serif" }}>
      
      <div style={{ marginBottom: '35px' }}>
        <h3 style={{ color: '#093661', fontSize: '24px', fontWeight: '800', margin: '0 0 5px 0' }}>Galeri Video</h3>
        <p style={{ color: '#718096', fontSize: '14px', margin: 0 }}>Kelola konten video YouTube atau unggah file video manual.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', padding: '30px', backgroundColor: '#F8FAFC', borderRadius: '18px', border: '1px solid #E2E8F0' }}>
        <div>
          <label style={labelStyle}>Judul Video</label>
          <input 
            type="text" 
            placeholder="Masukkan judul video" 
            value={judul || ''} 
            onChange={(e) => setJudul(e.target.value)}
            style={inputStyle} 
          />
        </div>
        <div>
          <label style={labelStyle}>Sumber Video</label>
          <select 
            value={tipeVideo} 
            onChange={(e) => setTipeVideo(e.target.value)} 
            style={{ ...inputStyle, cursor: 'pointer', backgroundColor: 'white' }}
          >
            <option value="youtube">Link YouTube</option>
            <option value="manual">Upload File Manual</option>
          </select>
        </div>

        <div style={{ gridColumn: 'span 2' }}>
          {tipeVideo === 'youtube' ? (
            <div>
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
            <div>
              <label style={labelStyle}>Pilih File Video</label>
              <input 
                type="file" 
                accept="video/*"
                onChange={(e) => setFileVideo(e.target.files ? e.target.files[0] : null)}
                style={{ ...inputStyle, padding: '10px', backgroundColor: 'white' }} 
              />
            </div>
          )}
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
          {loading ? 'Sedang Memproses...' : 'Publikasikan Video'}
        </button>
      </div>

      <div style={{ height: '1px', backgroundColor: '#EDF2F7', margin: '45px 0' }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <h4 style={{ fontSize: '18px', fontWeight: '800', color: '#2D3748', margin: 0 }}>
          Riwayat Video Terbit
        </h4>
      </div>

      <div style={{ border: '1px solid #E2E8F0', borderRadius: '16px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '2px solid #EDF2F7' }}>
              <th style={{ ...thStyle, width: '15%' }}>PREVIEW</th>
              <th style={{ ...thStyle, width: '45%' }}>JUDUL VIDEO</th>
              <th style={{ ...thStyle, width: '20%' }}>TIPE</th>
              <th style={{ ...thStyle, textAlign: 'center', width: '20%' }}>NAVIGASI</th>
            </tr>
          </thead>
          <tbody>
            {daftarVideo.length > 0 ? (
              daftarVideo.map((vid: any) => (
                <tr key={vid.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={tdStyle}>
                    <div style={{ width: '60px', height: '40px', backgroundColor: '#2D3748', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '12px' }}>▶</div>
                  </td>
                  <td style={{ ...tdStyle, fontWeight: '800', color: '#2D3748' }}>{vid.judul}</td>
                  <td style={tdStyle}>
                    <span style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', backgroundColor: vid.tipe === 'youtube' ? '#FFF5F5' : '#F0FFF4', color: vid.tipe === 'youtube' ? '#C53030' : '#2F855A', border: vid.tipe === 'youtube' ? '1px solid #FED7D7' : '1px solid #C6F6D5' }}>
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
                <td colSpan={4} style={{ textAlign: 'center', padding: '100px 20px', color: '#A0AEC0', fontSize: '14px' }}>
                  Belum ada video yang diterbitkan.
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
const inputStyle = { width: '100%', padding: '12px 16px', borderRadius: '10px', border: '2px solid #E2E8F0', fontSize: '14px', outline: 'none', boxSizing: 'border-box' as 'border-box', transition: '0.3s' };
const buttonStyle: any = { gridColumn: 'span 2', padding: '16px', color: 'white', border: 'none', borderRadius: '12px', fontWeight: '800', cursor: 'pointer', fontSize: '15px', transition: '0.3s' };
const thStyle = { padding: '18px 20px', textAlign: 'left' as 'left', fontSize: '11px', fontWeight: '800', color: '#718096', textTransform: 'uppercase' as 'uppercase', letterSpacing: '1px' };
const tdStyle = { padding: '20px', fontSize: '14px' };
const deleteBtnStyle = { color: '#E53E3E', border: '1px solid #FED7D7', background: '#FFF5F5', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '12px' };