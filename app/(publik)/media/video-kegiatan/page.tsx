"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from '../../../../lib/supabase';

export default function VideoKegiatanPublikPage() {
  const [videoList, setVideoList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<any | null>(null);

  useEffect(() => {
    fetchVideoPublik();
  }, []);

  const fetchVideoPublik = async () => {
    try {
      const response = await supabase
        .from('daftar_video')
        .select('*')
        .order('id', { ascending: false });

      if (response.error) {
        return;
      }
      setVideoList(response.data || []);
    } catch {
      // 
    } finally {
      setLoading(false);
    }
  };

  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    if (url.includes('embed/')) return url;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };

  return (
    <div className="container" style={{ margin: '0 auto', padding: '60px 20px', boxSizing: 'border-box', fontFamily: '"Arial"' }}>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      <div style={{ textAlign: 'center', marginBottom: '45px' }}>
        <h2 style={{ color: '#093b77', fontSize: '32px', fontWeight: '700', marginBottom: '10px', letterSpacing: '-0.5px' }}>
          Video Kegiatan Rutan
        </h2>
        <p style={{ color: '#718096', fontSize: '15px', maxWidth: '600px', margin: '0 auto', lineHeight: '1.5' }}>
          Kumpulan tayangan video dokumentasi kegiatan resmi, layanan publik, dan pembinaan warga binaan di Rutan Kelas IIB Sinjai.
        </p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', color: '#718096', padding: '60px', fontSize: '15px' }}>Memuat daftar video...</div>
      ) : videoList.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '25px' }}>
          {videoList.map((video) => (
            <div 
              key={video.id} 
              onClick={() => setSelectedVideo(video)}
              style={{ 
                backgroundColor: '#fff', 
                borderRadius: '16px', 
                overflow: 'hidden', 
                border: '1px solid #E2E8F0', 
                boxShadow: '0 4px 15px rgba(0,0,0,0.04)', 
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.04)';
              }}
            >
              <div style={{ width: '100%', height: '200px', overflow: 'hidden', backgroundColor: '#000', position: 'relative' }}>
                <iframe 
                  src={getEmbedUrl(video.url || video.video_url || video.link)} 
                  title={video.judul || 'Video Kegiatan'} 
                  style={{ width: '100%', height: '100%', border: 'none', pointerEvents: 'none' }}
                />
              </div>
              <div style={{ padding: '20px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#093b77', margin: '0 0 8px 0', lineHeight: '1.4' }}>
                  {video.judul || 'Kegiatan Rutan Sinjai'}
                </h3>
                {video.tanggal && (
                  <p style={{ fontSize: '12px', color: '#A0AEC0', margin: 0, fontWeight: '600' }}>
                    <i className="fa-regular fa-calendar" style={{ marginRight: '6px' }}></i>
                    {video.tanggal}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '80px 20px', color: '#A0AEC0', border: '1px solid #E2E8F0', borderRadius: '16px', backgroundColor: '#F8FAFC', fontSize: '15px' }}>
          Belum ada video kegiatan yang diunggah.
        </div>
      )}

      {selectedVideo && (
        <div 
          onClick={() => setSelectedVideo(null)} 
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(9,54,97,0.85)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out', padding: '20px', backdropFilter: 'blur(8px)' }}
        >
          <div style={{ position: 'relative', width: '100%', maxWidth: '800px', background: '#000', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.4)' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%' }}>
              <iframe 
                src={getEmbedUrl(selectedVideo.url || selectedVideo.video_url || selectedVideo.link)} 
                title="Detail Video" 
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen 
              />
            </div>
            <div style={{ padding: '20px', background: '#fff' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#093b77', margin: '0 0 5px 0' }}>{selectedVideo.judul}</h3>
              {selectedVideo.tanggal && <p style={{ fontSize: '13px', color: '#A0AEC0', margin: 0, fontWeight: '600' }}>{selectedVideo.tanggal}</p>}
            </div>
            <button 
              onClick={() => setSelectedVideo(null)}
              style={{ position: 'absolute', top: '15px', right: '15px', background: 'rgba(0,0,0,0.6)', color: '#FFFFFF', border: 'none', borderRadius: '50%', width: '35px', height: '35px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', zIndex: 10 }}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}