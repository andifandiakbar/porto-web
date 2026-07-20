"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from '../../../../lib/supabase';

export default function GaleriFotoPublikPage() {
  const [fotoList, setFotoList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFoto, setSelectedFoto] = useState<any | null>(null);

  useEffect(() => {
    fetchFotoPublik();
  }, []);

  const fetchFotoPublik = async () => {
    try {
      const response = await supabase
        .from('daftar_foto')
        .select('*')
        .order('id', { ascending: false });

      if (response.error) {
        return;
      }
      setFotoList(response.data || []);
    } catch {
      // 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ margin: '0 auto', padding: '60px 20px', boxSizing: 'border-box', fontFamily: '"Arial"' }}>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      <div style={{ textAlign: 'center', marginBottom: '45px' }}>
        <h2 style={{ color: '#093b77', fontSize: '32px', fontWeight: '700', marginBottom: '10px', letterSpacing: '-0.5px' }}>
          Galeri Foto Kegiatan Rutan
        </h2>
        <p style={{ color: '#718096', fontSize: '15px', maxWidth: '600px', margin: '0 auto', lineHeight: '1.5' }}>
          Dokumentasi aktivitas, pembinaan warga binaan, serta berbagai kegiatan resmi di lingkungan Rutan Kelas IIB Sinjai.
        </p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', color: '#718096', padding: '60px', fontSize: '15px' }}>Memuat dokumentasi foto...</div>
      ) : fotoList.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px' }}>
          {fotoList.map((foto) => (
            <div 
              key={foto.id} 
              onClick={() => setSelectedFoto(foto)}
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
              <div style={{ width: '100%', height: '220px', overflow: 'hidden', backgroundColor: '#F1F5F9' }}>
                <img 
                  src={foto.img_url || foto.foto || foto.url} 
                  alt={foto.judul || 'Dokumentasi Rutan'} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }} 
                />
              </div>
              <div style={{ padding: '20px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#093b77', margin: '0 0 8px 0', lineHeight: '1.4' }}>
                  {foto.judul || 'Kegiatan Rutan Sinjai'}
                </h3>
                {foto.tanggal && (
                  <p style={{ fontSize: '12px', color: '#A0AEC0', margin: 0, fontWeight: '600' }}>
                    <i className="fa-regular fa-calendar" style={{ marginRight: '6px' }}></i>
                    {foto.tanggal}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '80px 20px', color: '#A0AEC0', border: '1px solid #E2E8F0', borderRadius: '16px', backgroundColor: '#F8FAFC', fontSize: '15px' }}>
          Belum ada dokumentasi foto kegiatan yang diunggah.
        </div>
      )}

      {selectedFoto && (
        <div 
          onClick={() => setSelectedFoto(null)} 
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(9,54,97,0.85)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out', padding: '20px', backdropFilter: 'blur(8px)' }}
        >
          <div style={{ position: 'relative', maxWidth: '85%', maxHeight: '85vh', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
            <img 
              src={selectedFoto.img_url || selectedFoto.foto || selectedFoto.url} 
              alt="Detail" 
              style={{ maxWidth: '100%', maxHeight: '75vh', borderRadius: '16px', boxShadow: '0 30px 60px rgba(0,0,0,0.4)', objectFit: 'contain' }} 
            />
            <div style={{ marginTop: '15px', color: '#FFFFFF' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 5px 0' }}>{selectedFoto.judul}</h3>
              {selectedFoto.tanggal && <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', margin: 0 }}>{selectedFoto.tanggal}</p>}
            </div>
            <button 
              onClick={() => setSelectedFoto(null)}
              style={{ position: 'absolute', top: '-15px', right: '-15px', background: '#FFFFFF', color: '#093b77', border: 'none', borderRadius: '50%', width: '35px', height: '35px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}