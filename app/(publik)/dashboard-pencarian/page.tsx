"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { supabase } from '../../../lib/supabase';

function PencarianContent() {
  const searchParams = useSearchParams();
  const queryNama = searchParams.get('nama');
  const [wbpList, setWbpList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [localSearch, setLocalSearch] = useState('');

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

  return (
    <div style={{ padding: '40px 0', fontFamily: 'sans-serif', backgroundColor: '#ffffff', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        
        <div style={{ backgroundColor: '#FAFBFF', borderRadius: '12px', padding: '30px' }}>
          
          <div style={{ backgroundColor: '#093661', color: 'white', padding: '20px', borderRadius: '8px', textAlign: 'center', marginBottom: '30px', fontSize: '22px', fontWeight: 'bold' }}>
            Silahkan Pilih WBP yang akan dikunjungi
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '14px' }}>
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
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #eef0f7', backgroundColor: '#f0f2f9' }}>
                  <th style={{ padding: '15px 12px', textAlign: 'left' }}>NAMA LENGKAP</th>
                  <th style={{ padding: '15px 12px', textAlign: 'center' }}>NO. REG</th>
                  <th style={{ padding: '15px 12px', textAlign: 'left' }}>PERKARA / PASAL</th>
                  <th style={{ padding: '15px 12px', textAlign: 'center' }}>MASA PIDANA</th>
                  <th style={{ padding: '15px 12px', textAlign: 'center' }}>EKSPIRASI</th>
                  <th style={{ padding: '15px 12px', textAlign: 'center' }}>AKSI</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', padding: '30px', color: '#666' }}>Memuat data...</td>
                  </tr>
                ) : filteredData.length > 0 ? (
                  filteredData.map((wbp, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #eef0f7' }}>
                      <td style={{ padding: '12px', fontWeight: 'bold', color: '#1f70b8' }}>{wbp.nama?.toUpperCase()}</td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>{wbp.nik}</td>
                      <td style={{ padding: '12px' }}>{wbp.kasus}</td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>{wbp.lama_pidana || '-'}</td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>
                        <span style={{ backgroundColor: '#FFF5F5', color: '#E53E3E', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold', fontSize: '12px' }}>
                          {wbp.ekspirasi || '-'}
                        </span>
                      </td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>
                        <button 
                          style={{ backgroundColor: '#093661', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', transition: '0.1s' }}
                          onMouseDown={handlePress} onMouseUp={handleRelease} onMouseLeave={handleRelease}
                        >
                          Pilih
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', padding: '30px', color: '#999' }}>Data tidak ditemukan</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '25px', color: '#666', fontSize: '13px' }}>
            <div>Showing {filteredData.length} entries</div>
            <div style={{ display: 'flex', gap: '5px' }}>
              <button style={{ padding: '6px 12px', border: '1px solid #dee2e6', backgroundColor: '#fff', cursor: 'pointer', borderRadius: '4px' }}>Previous</button>
              <button style={{ padding: '6px 14px', border: '1px solid #dee2e6', backgroundColor: '#093661', color: 'white', fontWeight: 'bold', borderRadius: '4px' }}>1</button>
              <button style={{ padding: '6px 12px', border: '1px solid #dee2e6', backgroundColor: '#fff', cursor: 'pointer', borderRadius: '4px' }}>Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPencarian() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', padding: '100px', fontSize: '18px' }}>Menyiapkan Halaman...</div>}>
      <PencarianContent />
    </Suspense>
  );
}