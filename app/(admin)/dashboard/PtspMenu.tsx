"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import * as XLSX from 'xlsx';

export default function PtspMenu() {
  const [riwayat, setRiwayat] = useState([]);
  const [wbpList, setWbpList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [tabAktif, setTabAktif] = useState('kunjungan');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    
    const fetchData = async () => {
      const { data: riwayatData } = await supabase.from('riwayat_ptsp').select('*').order('id', { ascending: true });
      const { data: wbpData } = await supabase.from('daftar_wbp').select('nama, status_wbp');
      
      if (riwayatData) setRiwayat(riwayatData);
      if (wbpData) setWbpList(wbpData);
    };

    fetchData();
    const channel = supabase.channel('realtime_riwayat_ptsp').on('postgres_changes', { event: '*', schema: 'public', table: 'riwayat_ptsp' }, () => fetchData()).subscribe();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      supabase.removeChannel(channel);
    };
  }, []);

  const dataKunjungan = riwayat.filter(item => item.kunjungan?.nama && item.titipan === null);
  const dataTitipan = riwayat.filter(item => item.titipan && item.titipan.jenisBarang);

  const getStatusWbp = (namaWbp) => {
    const wbp = wbpList.find(w => w.nama.toLowerCase() === namaWbp?.toLowerCase());
    return wbp ? wbp.status_wbp : '-';
  };

  const downloadExcel = () => {
    const dataToExport = tabAktif === 'kunjungan' ? dataKunjungan : dataTitipan;
    const formattedData = dataToExport.map((item) => {
      if (tabAktif === 'kunjungan') {
        return {
          "WBP Dikunjungi": item.kunjungan?.wbp,
          "Status WBP": getStatusWbp(item.kunjungan?.wbp),
          "Nama Pengunjung": item.kunjungan?.nama,
          "Jenis Kelamin": item.kunjungan?.jk,
          "Alamat": item.kunjungan?.alamat,
          "No HP": item.kunjungan?.nomorHp,
          "Hubungan": item.kunjungan?.hubungan,
          "Pengikut Dewasa": Number(item.kunjungan?.laki) + Number(item.kunjungan?.perempuan),
          "Pengikut Anak": item.kunjungan?.anak,
          "Tgl Kunjungan": item.kunjungan?.tanggal
        };
      } else {
        return {
          "Nama WBP": item.titipan?.namaWbp,
          "Status WBP": getStatusWbp(item.titipan?.namaWbp),
          "Nama Penitip": item.kunjungan?.nama,
          "Jenis Kelamin": item.kunjungan?.jk,
          "Alamat": item.kunjungan?.alamat,
          "No HP": item.kunjungan?.nomorHp,
          "Hubungan": item.kunjungan?.hubungan,
          "Jenis Barang": item.titipan?.jenisBarang,
          "Jumlah": item.titipan?.jumlah,
          "Tgl Registrasi": item.waktuInput ? item.waktuInput.split(',')[0] : '-'
        };
      }
    });

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data PTSP");
    XLSX.writeFile(workbook, `Data_PTSP_${tabAktif}.xlsx`);
  };

  useEffect(() => {
    if (selectedItem) {
      setTimeout(() => {
        window.print();
        setSelectedItem(null);
      }, 500);
    }
  }, [selectedItem]);

  const hapusRiwayat = async (id) => {
    const { error } = await supabase.from('riwayat_ptsp').delete().eq('id', id);
    if (!error) setRiwayat(riwayat.filter(item => item.id !== id));
  };

  const cetakUlang = (item) => setSelectedItem(item);

  const toTitleCase = (str) => {
    return str?.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div style={{ padding: isMobile ? '20px' : '40px', backgroundColor: '#FFFFFF', borderRadius: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div className="no-print">
        <div style={{ marginBottom: '35px' }}>
          <h3 style={{ color: '#093b77', fontSize: '24px', fontWeight: '700', margin: '0 0 5px 0', letterSpacing: '-0.5px' }}>Riwayat Pelayanan PTSP</h3>
          <p style={{ color: '#64748b', fontSize: '14px', margin: 0, letterSpacing: '-0.2px' }}>Manajemen data pendaftaran kunjungan dan titipan makanan</p>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <div style={{ display: 'flex', gap: '10px', borderBottom: '2px solid #EDF2F7' }}>
            <button onClick={() => setTabAktif('kunjungan')} style={tabBtn(tabAktif === 'kunjungan')}>Antrian Pengunjung ({dataKunjungan.length})</button>
            <button onClick={() => setTabAktif('titipan')} style={tabBtn(tabAktif === 'titipan')}>Titipan Barang ({dataTitipan.length})</button>
          </div>
          <button 
            onClick={downloadExcel} 
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#072a4d'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#093b77'}
            style={{ padding: '10px 20px', backgroundColor: '#093b77', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px', transition: '0.3s' }}
          >
            Download Excel
          </button>
        </div>
      </div>

      <div className="no-print" style={{ overflowX: 'auto', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', minWidth: '1000px' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '2px solid #EDF2F7' }}>
              {tabAktif === 'kunjungan' ? (
                <>
                  <th style={thStyle}>WBP Dikunjungi</th>
                  <th style={thStyle}>Status WBP</th>
                  <th style={thStyle}>Nama Pengunjung</th>
                  <th style={thStyle}>Jenis Kelamin</th>
                  <th style={thStyle}>Alamat</th>
                  <th style={thStyle}>No. HP</th>
                  <th style={thStyle}>Hubungan WBP</th>
                  <th style={thStyle}>Pengikut Dewasa</th>
                  <th style={thStyle}>Pengikut Anak</th>
                  <th style={thStyle}>Tgl Kunjungan</th>
                  <th style={{ ...thStyle, textAlign: 'center' }}>Navigasi</th>
                </>
              ) : (
                <>
                  <th style={thStyle}>Nama WBP</th>
                  <th style={thStyle}>Status WBP</th>
                  <th style={thStyle}>Nama Penitip / Pengirim</th>
                  <th style={thStyle}>Jenis Kelamin</th>
                  <th style={thStyle}>Alamat</th>
                  <th style={thStyle}>No. HP</th>
                  <th style={thStyle}>Hubungan WBP</th>
                  <th style={thStyle}>Jenis Barang Titipan</th>
                  <th style={thStyle}>Jumlah</th>
                  <th style={thStyle}>Tgl Registrasi</th>
                  <th style={{ ...thStyle, textAlign: 'center' }}>Navigasi</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {(tabAktif === 'kunjungan' ? [...dataKunjungan].reverse() : [...dataTitipan].reverse()).map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                {tabAktif === 'kunjungan' ? (
                  <>
                    <td style={tdStyle}>{toTitleCase(item.kunjungan?.wbp)}</td>
                    <td style={tdStyle}>{toTitleCase(getStatusWbp(item.kunjungan?.wbp))}</td>
                    <td style={tdStyle}>{toTitleCase(item.kunjungan?.nama)}</td>
                    <td style={tdStyle}>{toTitleCase(item.kunjungan?.jk || '-')}</td>
                    <td style={tdStyle}>{toTitleCase(item.kunjungan?.alamat || '-')}</td>
                    <td style={tdStyle}>{item.kunjungan?.nomorHp}</td>
                    <td style={tdStyle}>{toTitleCase(item.kunjungan?.hubungan)}</td>
                    <td style={tdStyle}>{Number(item.kunjungan?.laki) + Number(item.kunjungan?.perempuan)}</td>
                    <td style={tdStyle}>{item.kunjungan?.anak}</td>
                    <td style={tdStyle}>{item.kunjungan?.tanggal}</td>
                    <td style={{ ...tdStyle, textAlign: 'center' }}>
                      <button onClick={() => cetakUlang(item)} style={viewBtnStyle}>Cetak</button>
                      <button onClick={() => hapusRiwayat(item.id)} style={deleteBtnStyle}>Hapus</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td style={tdStyle}>{toTitleCase(item.titipan?.namaWbp)}</td>
                    <td style={tdStyle}>{toTitleCase(getStatusWbp(item.titipan?.namaWbp))}</td>
                    <td style={tdStyle}>{toTitleCase(item.kunjungan?.nama)}</td>
                    <td style={tdStyle}>{toTitleCase(item.kunjungan?.jk || '-')}</td>
                    <td style={tdStyle}>{toTitleCase(item.kunjungan?.alamat || '-')}</td>
                    <td style={tdStyle}>{item.kunjungan?.nomorHp || '-'}</td>
                    <td style={tdStyle}>{toTitleCase(item.kunjungan?.hubungan || '-')}</td>
                    <td style={tdStyle}>{toTitleCase(item.titipan?.jenisBarang || '-')}</td>
                    <td style={tdStyle}>{item.titipan?.jumlah || '-'}</td>
                    <td style={tdStyle}>{item.waktuInput.split(',')[0]}</td>
                    <td style={{ ...tdStyle, textAlign: 'center' }}>
                      <button onClick={() => cetakUlang(item)} style={viewBtnStyle}>Cetak</button>
                      <button onClick={() => hapusRiwayat(item.id)} style={deleteBtnStyle}>Hapus</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="print-area">
        {selectedItem && (
          selectedItem.titipan?.jenisBarang ? (
            <div className="thermal-ticket">
              <div style={{ textAlign: 'center', fontSize: '15px', fontWeight: 'bold' }}>Bukti Titipan</div>
              <div style={{ borderTop: '1px dashed #000', margin: '8px 0' }}></div>
              <p style={{ margin: '4px 0', fontSize: '12px' }}>Nama Wbp</p>
              <p style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 'bold' }}>{toTitleCase(selectedItem.titipan.namaWbp)}</p>
              <div style={{ borderTop: '1px dashed #000', margin: '8px 0' }}></div>
              <p style={{ margin: '4px 0', fontSize: '12px' }}>Nama Penitip / Pengirim</p>
              <p style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 'bold' }}>{toTitleCase(selectedItem.kunjungan?.nama)}</p>
              <p style={{ margin: '4px 0', fontSize: '12px' }}>Jenis Kelamin</p>
              <p style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 'bold' }}>{toTitleCase(selectedItem.kunjungan?.jk || '-')}</p>
              <p style={{ margin: '4px 0', fontSize: '12px' }}>Alamat</p>
              <p style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 'bold' }}>{toTitleCase(selectedItem.kunjungan?.alamat || '-')}</p>
              <p style={{ margin: '4px 0', fontSize: '12px' }}>No. Hp</p>
              <p style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 'bold' }}>{selectedItem.kunjungan?.nomorHp || '-'}</p>
              <p style={{ margin: '4px 0', fontSize: '12px' }}>Hubungan Wbp</p>
              <p style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 'bold' }}>{toTitleCase(selectedItem.kunjungan?.hubungan || '-')}</p>
              <p style={{ margin: '4px 0', fontSize: '12px' }}>Jenis Barang Titipan</p>
              <p style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 'bold' }}>{toTitleCase(selectedItem.titipan.jenisBarang)}</p>
              <p style={{ margin: '4px 0', fontSize: '12px' }}>Jumlah</p>
              <p style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 'bold' }}>{selectedItem.titipan.jumlah}</p>
              <div style={{ borderTop: '1px dashed #000', margin: '8px 0' }}></div>
              <p style={{ margin: '4px 0', fontSize: '12px' }}>Tgl Registrasi</p>
              <p style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 'bold' }}>{selectedItem.waktuInput.split(',')[0]}</p>
              <div style={{ textAlign: 'center', marginTop: '15px', fontSize: '12px' }}>*** Terima Kasih ***</div>
            </div>
          ) : (
            <div className="thermal-ticket">
              <div style={{ textAlign: 'center', fontSize: '13px', fontWeight: 'bold' }}>Bukti Pendaftaran Kunjungan</div>
              <div style={{ borderTop: '1px dashed #000', margin: '8px 0' }}></div>
              <p style={{ margin: '4px 0', fontSize: '10px' }}>Nama Pengunjung</p>
              <p style={{ margin: '0 0 8px 0', fontSize: '12px', fontWeight: 'bold' }}>{toTitleCase(selectedItem.kunjungan?.nama)}</p>
              <p style={{ margin: '4px 0', fontSize: '10px' }}>Jenis Kelamin</p>
              <p style={{ margin: '0 0 8px 0', fontSize: '12px', fontWeight: 'bold' }}>{toTitleCase(selectedItem.kunjungan?.jk || '-')}</p>
              <p style={{ margin: '4px 0', fontSize: '10px' }}>Alamat</p>
              <p style={{ margin: '0 0 8px 0', fontSize: '12px', fontWeight: 'bold' }}>{toTitleCase(selectedItem.kunjungan?.alamat)}</p>
              <p style={{ margin: '4px 0', fontSize: '10px' }}>No. Hp</p>
              <p style={{ margin: '0 0 8px 0', fontSize: '12px', fontWeight: 'bold' }}>{selectedItem.kunjungan?.nomorHp}</p>
              <div style={{ borderTop: '1px dashed #000', margin: '8px 0' }}></div>
              <p style={{ margin: '4px 0', fontSize: '10px' }}>Wbp Dikunjungi</p>
              <p style={{ margin: '0 0 8px 0', fontSize: '12px', fontWeight: 'bold' }}>{toTitleCase(selectedItem.kunjungan?.wbp)}</p>
              <p style={{ margin: '4px 0', fontSize: '10px' }}>Hubungan Wbp</p>
              <p style={{ margin: '0 0 8px 0', fontSize: '12px', fontWeight: 'bold' }}>{toTitleCase(selectedItem.kunjungan?.hubungan)}</p>
              <div style={{ borderTop: '1px dashed #000', margin: '8px 0' }}></div>
              <p style={{ margin: '4px 0', fontSize: '10px' }}>Pengikut Dewasa: {Number(selectedItem.kunjungan?.laki) + Number(selectedItem.kunjungan?.perempuan)} orang</p>
              <p style={{ margin: '4px 0', fontSize: '10px' }}>Pengikut Anak: {selectedItem.kunjungan?.anak} orang</p>
              <div style={{ borderTop: '1px dashed #000', margin: '8px 0' }}></div>
              <p style={{ margin: '4px 0', fontSize: '10px' }}>Tgl Kunjungan</p>
              <p style={{ margin: '0', fontSize: '12px', fontWeight: 'bold' }}>{selectedItem.kunjungan?.tanggal}</p>
              <div style={{ textAlign: 'center', marginTop: '15px', fontSize: '10px' }}>*** Terima Kasih ***</div>
            </div>
          )
        )}
      </div>

      <style jsx global>{`
        .print-area { display: none; }
        @media print {
          body * { visibility: hidden; }
          .no-print { display: none !important; }
          .print-area, .print-area * { visibility: visible; }
          .print-area { display: block !important; position: absolute; left: 0; top: 0; width: 80mm; }
          .thermal-ticket { width: 72mm; padding: 10px; color: black; font-family: Arial; }
          @page { size: 80mm auto; margin: 0; }
        }
      `}</style>
    </div>
  );
}

const thStyle = { padding: '18px 20px', textAlign: 'left', fontSize: '11px', color: '#64748b', textTransform: 'capitalize', fontWeight: '700', borderBottom: '2px solid #EDF2F7', borderTop: '1px solid #E2E8F0' };
const tdStyle = { padding: '20px', fontSize: '14px', color: '#333', borderBottom: '1px solid #F1F5F9' };
const tabBtn = (aktif) => ({ padding: '12px 20px', cursor: 'pointer', border: 'none', backgroundColor: 'transparent', fontSize: '14px', fontWeight: '700', color: aktif ? '#093b77' : '#A0AEC0', borderBottom: aktif ? '3px solid #093b77' : '3px solid transparent' });
const deleteBtnStyle = { color: '#E53E3E', border: '1px solid #FED7D7', background: '#FFF5F5', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '12px', transition: '0.2s' };
const viewBtnStyle = { padding: '6px 12px', fontSize: '11px', borderRadius: '8px', border: '1px solid #E2E8F0', cursor: 'pointer', background: '#FFF', color: '#093b77', fontWeight: '700', marginRight: '5px', transition: '0.2s' };