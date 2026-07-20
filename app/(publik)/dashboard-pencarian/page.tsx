"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { supabase } from '../../../lib/supabase';
import { motion } from 'framer-motion';

function PencarianContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryNama = searchParams.get('nama');
  const [wbpList, setWbpList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [localSearch, setLocalSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWbp, setSelectedWbp] = useState<{ id: string; nama: string; status: string } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('daftar_wbp')
          .select('*')
          .ilike('nama', `%${queryNama || ''}%`);

        if (error) throw error;
        setWbpList(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [queryNama]);

  const filteredData = wbpList.filter(item => 
    item.nama?.toLowerCase().includes(localSearch.toLowerCase()) ||
    item.nik?.toLowerCase().includes(localSearch.toLowerCase())
  );

  const handlePress = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.transform = 'scale(0.92)';
  };
  const handleRelease = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.transform = 'scale(1)';
  };

  const formatStatus = (status: string) => {
    return status ? status.charAt(0).toUpperCase() + status.slice(1).toLowerCase() : 'Narapidana';
  };

  return (
    <motion.div 
      style={{ padding: '60px 15px', fontFamily: 'sans-serif', backgroundColor: '#ffffff', minHeight: '100vh', overscrollBehaviorY: 'none', touchAction: 'pan-y' }}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <div style={{ backgroundColor: '#FAFBFF', borderRadius: '12px', padding: '30px' }} className="responsive-card-padding">
          
          <div style={{ backgroundColor: '#093661', color: 'white', padding: '20px', borderRadius: '8px', textAlign: 'center', marginBottom: '30px', fontSize: '22px', fontWeight: 'bold' }}>
            Silahkan Pilih WBP yang akan dikunjungi
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '14px', flexWrap: 'wrap', gap: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              Show 
              <select style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #ccc', cursor: 'pointer', outline: 'none' }}>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select> 
              entries
            </div>
            <div>Search: <input type="text" value={localSearch} onChange={(e) => setLocalSearch(e.target.value)} style={{ border: '1px solid #ccc', padding: '6px 12px', borderRadius: '4px', outline: 'none' }} /></div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', minWidth: '700px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #eef0f7', backgroundColor: '#f0f2f9' }}>
                  <th style={{ padding: '15px 12px', textAlign: 'center' }}>Foto</th>
                  <th style={{ padding: '15px 12px', textAlign: 'left' }}>Nama Lengkap</th>
                  <th style={{ padding: '15px 12px', textAlign: 'left' }}>Jenis Kelamin</th>
                  <th style={{ padding: '15px 12px', textAlign: 'center' }}>2/3 Masa Pidana</th>
                  <th style={{ padding: '15px 12px', textAlign: 'left' }}>Perkara</th>
                  <th style={{ padding: '15px 12px', textAlign: 'center' }}>Tanggal Bebas</th>
                  <th style={{ padding: '15px 12px', textAlign: 'center' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center', padding: '30px', color: '#666' }}>Memuat data...</td>
                  </tr>
                ) : filteredData.length > 0 ? (
                  filteredData.map((wbp, idx) => {
                    const statusAsli = wbp.status_wbp || 'Narapidana';

                    return (
                      <tr key={idx} style={{ borderBottom: '1px solid #eef0f7' }}>
                        <td style={{ padding: '12px', textAlign: 'center' }}>
                          <div style={{ width: '50px', height: '60px', backgroundColor: '#f0f0f0', borderRadius: '4px', overflow: 'hidden', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #ddd' }}>
                            {wbp.foto_url ? (
                              <img 
                                src={wbp.foto_url} 
                                alt={wbp.nama} 
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                              />
                            ) : (
                              <span style={{ fontSize: '10px', color: '#999' }}>No Pic</span>
                            )}
                          </div>
                        </td>
                        <td style={{ padding: '12px' }}>
                          <div style={{ fontWeight: 'bold', color: '#1f70b8', marginBottom: '4px' }}>
                            {wbp.nama}
                          </div>
                          <span style={{ 
                            backgroundColor: statusAsli.toLowerCase() === 'narapidana' ? '#e0f2fe' : '#fef3c7', 
                            color: statusAsli.toLowerCase() === 'narapidana' ? '#0369a1' : '#d97706', 
                            padding: '2px 8px', 
                            borderRadius: '12px', 
                            fontSize: '11px', 
                            fontWeight: 'bold',
                            display: 'inline-block'
                          }}>
                            {formatStatus(statusAsli)}
                          </span>
                        </td>
                        <td style={{ padding: '12px' }}>{wbp.jenis_kelamin || '-'}</td>
                        <td style={{ padding: '12px', textAlign: 'center' }}>{wbp.nik}</td>
                        <td style={{ padding: '12px' }}>{wbp.kasus}</td>
                        <td style={{ padding: '12px', textAlign: 'center' }}>
                          <span style={{ backgroundColor: '#FFF5F5', color: '#E53E3E', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold', fontSize: '12px' }}>
                            {wbp.ekspirasi || '-'}
                          </span>
                        </td>
                        <td style={{ padding: '12px', textAlign: 'center' }}>
                          <button
                            onMouseDown={handlePress}
                            onMouseUp={handleRelease}
                            onMouseLeave={handleRelease}
                            onClick={() => {
                              setSelectedWbp({ id: wbp.id, nama: wbp.nama, status: formatStatus(statusAsli) });
                              setIsModalOpen(true);
                            }}
                            style={{
                              backgroundColor: '#093b77',
                              color: 'white',
                              border: 'none',
                              padding: '8px 20px',
                              borderRadius: '6px',
                              fontWeight: 'bold',
                              cursor: 'pointer',
                              fontSize: '14px',
                              transition: 'transform 0.1s ease',
                              boxShadow: '0 2px 4px rgba(0,123,255,0.2)'
                            }}
                          >
                            Pilih
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center', padding: '30px', color: '#999' }}>Data tidak ditemukan</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '25px', color: '#666', fontSize: '13px', flexWrap: 'wrap', gap: '15px' }}>
            <div>Showing {filteredData.length} entries</div>
            <div style={{ display: 'flex', gap: '5px' }}>
              <button style={{ padding: '6px 12px', border: '1px solid #dee2e6', backgroundColor: '#fff', cursor: 'pointer', borderRadius: '4px' }}>Previous</button>
              <button style={{ padding: '6px 14px', border: '1px solid #dee2e6', backgroundColor: '#093661', color: 'white', fontWeight: 'bold', borderRadius: '4px' }}>1</button>
              <button style={{ padding: '6px 12px', border: '1px solid #dee2e6', backgroundColor: '#fff', cursor: 'pointer', borderRadius: '4px' }}>Next</button>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && selectedWbp && (
        <div style={overlayStyle}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            style={modalCardStyle}
          >
            <button 
              onClick={() => setIsModalOpen(false)} 
              style={closeBtnStyle}
            >
              ✕
            </button>

            <div style={{ textAlign: 'center', marginBottom: '25px' }}>
              <h3 style={{ margin: '0 0 6px 0', color: '#093b77', fontSize: '20px', fontWeight: 'bold' }}>
                Pilih Jenis Layanan
              </h3>
              <p style={{ margin: 0, color: '#64748b', fontSize: '14px', lineHeight: '1.5' }}>
                Silakan pilih jenis layanan untuk WBP: <br />
                <strong style={{ color: '#093b77', fontSize: '16px' }}>{selectedWbp.nama}</strong> <br/>
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>Status: {selectedWbp.status}</span>
              </p>
            </div>

            <div className="modal-options-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <motion.div 
                whileHover={{ scale: 1.02, translateY: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setIsModalOpen(false);
                  router.push(`/dashboard-pencarian/${selectedWbp.id}?layanan=kunjungan`);
                }}
                style={cardOptionStyle}
                className="hover-card-kunjungan"
              >
                <div style={{ ...iconContainerStyle, backgroundColor: '#eff6ff', color: '#2563eb' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </div>
                <h4 style={cardTitleStyle}>Kunjungan</h4>
                <p style={cardDescStyle}>Kunjungan fisik tatap muka langsung di Rutan.</p>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02, translateY: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setIsModalOpen(false);
                  router.push(`/dashboard-pencarian/${selectedWbp.id}?layanan=titipan`);
                }}
                style={cardOptionStyle}
                className="hover-card-titipan"
              >
                <div style={{ ...iconContainerStyle, backgroundColor: '#fef3c7', color: '#d97706' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><polygon points="12 22.08 12 12 3 6.92 3 17.08 12 22.08"></polygon><polygon points="12 12 21 6.92 21 17.08 12 22.08"></polygon><polygon points="12 2 3 6.92 12 12 21 6.92 12 2"></polygon><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                </div>
                <h4 style={cardTitleStyle}>Titipan Barang / Makanan</h4>
                <p style={cardDescStyle}>Penitipan barang bawaan atau makanan untuk WBP.</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}

      <style jsx global>{`
        html, body {
          margin: 0;
          padding: 0;
          overscroll-behavior-y: none;
          touch-action: pan-y;
        }
        .hover-card-kunjungan:hover {
          border-color: #2563eb !important;
          box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.1);
        }
        .hover-card-titipan:hover {
          border-color: #d97706 !important;
          box-shadow: 0 10px 15px -3px rgba(217, 119, 6, 0.1);
        }

        @media (max-width: 600px) {
          .responsive-card-padding {
            padding: 15px !important;
          }
          .modal-options-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </motion.div>
  );
}

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(15, 23, 42, 0.3)',
  backdropFilter: 'blur(4px)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  zIndex: 9999, padding: '20px'
};

const modalCardStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  padding: '35px 25px',
  width: '100%', maxWidth: '520px',
  boxShadow: '0 20px 25px -5px rgba(0,0,0,0.08), 0 10px 10px -5px rgba(0,0,0,0.02)',
  position: 'relative',
  fontFamily: 'Arial, sans-serif'
};

const closeBtnStyle: React.CSSProperties = {
  position: 'absolute', top: '15px', right: '15px',
  background: 'none', border: 'none', fontSize: '16px',
  color: '#94a3b8', cursor: 'pointer', padding: '5px'
};

const cardOptionStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  padding: '24px 16px',
  borderRadius: '12px',
  border: '2px solid #f1f5f9',
  textAlign: 'center', cursor: 'pointer',
  display: 'flex', flexDirection: 'column', alignItems: 'center'
};

const iconContainerStyle: React.CSSProperties = {
  width: '56px', height: '56px', borderRadius: '50%',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  marginBottom: '14px'
};

const cardTitleStyle: React.CSSProperties = {
  margin: '0 0 6px 0', fontSize: '15px', fontWeight: 'bold', color: '#1e293b'
};

const cardDescStyle: React.CSSProperties = {
  margin: 0, fontSize: '12px', color: '#64748b', lineHeight: '1.4'
};

export default function DashboardPencarian() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', padding: '100px', fontSize: '18px' }}>Menyiapkan Halaman...</div>}>
      <PencarianContent />
    </Suspense>
  );
}