"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '../../../../../lib/supabase';
import { motion } from 'framer-motion';

export default function FormTitipan({ id }: { id: string }) {
  const cap = (str: string) => str ? str.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ') : '';

  const [wbp, setWbp] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);

  const [namaPenitip, setNamaPenitip] = useState('');
  const [jenisKelamin, setJenisKelamin] = useState('');
  const [alamatPenitip, setAlamatPenitip] = useState('');
  const [tanggalPenitipan, setTanggalPenitipan] = useState('');
  const [nomorHp, setNomorHp] = useState('');
  const [hubungan, setHubungan] = useState('');
  const [jenisBarang, setJenisBarang] = useState('');
  const [jumlahBarang, setJumlahBarang] = useState('');
  
  const [submittedData, setSubmittedData] = useState<any>(null);

  useEffect(() => {
    const fetchDetailWbp = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('daftar_wbp')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setWbp(data);
      } catch (error) {
        console.error("Gagal mengambil data WBP:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDetailWbp();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (
      !namaPenitip || !jenisKelamin || !alamatPenitip || 
      !tanggalPenitipan || !nomorHp || !hubungan || 
      !jenisBarang || !jumlahBarang
    ) {
      alert('Silahkan isi semua formulir dengan benar!');
      return;
    }

    try {
      const dateObj = new Date(tanggalPenitipan);
      const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
      const formattedDate = dateObj.toLocaleDateString('id-ID', options);

      const dataKunjungan = {
        nama: cap(namaPenitip),
        alamat: cap(alamatPenitip),
        wbp: wbp?.nama || '-',
        hubungan: cap(hubungan),
        laki: jenisKelamin === "PRIA" ? "1" : "0", 
        perempuan: jenisKelamin === "WANITA" ? "1" : "0",
        anak: "0",
        bayi: "0",
        tanggal: formattedDate
      };

      const dataTitipan = {
        isTitipanBarang: true,
        namaWbp: wbp?.nama || '-',
        alamatWbp: cap(alamatPenitip),
        jenisBarang: cap(jenisBarang),
        jumlah: cap(jumlahBarang)
      };

      const { error: insertError } = await supabase
        .from('riwayat_ptsp')
        .insert([
          {
            antrian: 0, 
            kunjungan: dataKunjungan,
            titipan: dataTitipan,
            waktuInput: new Date().toLocaleString('id-ID')
          }
        ]);

      if (insertError) throw insertError;

      setSubmittedData({
        namaWbp: wbp?.nama || '-',
        statusWbp: wbp?.status_wbp || 'Tahanan',
        namaPenitip: cap(namaPenitip),
        hubungan: cap(hubungan),
        nomorHp,
        jenisBarang: cap(jenisBarang),
        jumlahBarang: cap(jumlahBarang),
        tanggal: formattedDate
      });

      setShowReceipt(true);
      alert('Pendaftaran titipan berhasil dikirim!');
      
    } catch (error: any) {
      console.error("Gagal menyimpan data:", error);
      alert(`Terjadi kesalahan: ${error?.message || "Periksa koneksi database"}`);
    }
  };

  const formatStatus = (status: string) => status ? status.charAt(0).toUpperCase() + status.slice(1).toLowerCase() : 'Tahanan';

  return (
    <motion.div 
      style={{ backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: 'Arial, sans-serif', padding: '60px 15px', overscrollBehaviorY: 'none', touchAction: 'pan-y' }}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
    >
      
      {!showReceipt ? (
        <div className="responsive-container">
          
          <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '30px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', border: '1px solid #eef2f7', display: 'flex', flexDirection: 'column', alignItems: 'center', height: 'fit-content' }}>
            <div style={{ backgroundColor: '#093661', color: 'white', width: '100%', padding: '15px', borderRadius: '8px', textAlign: 'center', fontSize: '20px', fontWeight: 'bold', marginBottom: '30px' }}>
              Isi formulir dengan benar
            </div>
            
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', marginBottom: '8px', textAlign: 'center', textTransform: 'uppercase' }}>
              {wbp?.nama || '-'}
            </h2>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#093661' }}>
                {formatStatus(wbp?.jenis_kelamin || 'Pria')}
              </div>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#cbd5e1' }}></div>
              <div style={{ 
                fontSize: '12px', 
                fontWeight: 'bold', 
                color: (wbp?.status_wbp || 'Tahanan').toLowerCase() === 'narapidana' ? '#0369a1' : '#d97706', 
                backgroundColor: (wbp?.status_wbp || 'Tahanan').toLowerCase() === 'narapidana' ? '#e0f2fe' : '#fef3c7',
                padding: '4px 10px',
                borderRadius: '12px'
              }}>
                {formatStatus(wbp?.status_wbp || 'Tahanan')}
              </div>
            </div>

            <div style={{ width: '180px', height: '220px', backgroundColor: '#e2e8f0', borderRadius: '8px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #cbd5e1' }}>
              {wbp?.foto_url ? (
                <img src={wbp.foto_url} alt={wbp?.nama} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              )}
            </div>
          </div>

          <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '30px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', border: '1px solid #eef2f7' }}>
            <div style={{ backgroundColor: '#093661', color: 'white', width: '100%', padding: '15px', borderRadius: '8px', textAlign: 'center', fontSize: '18px', fontWeight: 'bold', marginBottom: '30px' }}>
              Formulir Pendaftaran Titipan Barang
            </div>

            <form onSubmit={handleSubmit} className="responsive-form">
              <div>
                <label style={{ display: 'block', fontSize: '14px', color: '#333', marginBottom: '8px', fontWeight: 'normal' }}>Nama Penitip</label>
                <input type="text" value={namaPenitip} onChange={(e) => setNamaPenitip(e.target.value)} placeholder="Nama penitip" style={inputStyle} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', color: '#333', marginBottom: '8px', fontWeight: 'normal' }}>Jenis Kelamin</label>
                <select value={jenisKelamin} onChange={(e) => setJenisKelamin(e.target.value)} style={{ ...inputStyle, backgroundColor: 'white' }}>
                  <option value="">Pilih Jenis Kelamin</option>
                  <option value="PRIA">Pria</option>
                  <option value="WANITA">Wanita</option>
                </select>
              </div>

              <div className="form-group-span-2">
                <label style={{ display: 'block', fontSize: '14px', color: '#333', marginBottom: '8px', fontWeight: 'normal' }}>Alamat Penitip</label>
                <input type="text" value={alamatPenitip} onChange={(e) => setAlamatPenitip(e.target.value)} placeholder="Tulis alamat lengkap" style={inputStyle} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', color: '#333', marginBottom: '8px', fontWeight: 'normal' }}>Tanggal Penitipan</label>
                <input type="date" value={tanggalPenitipan} onChange={(e) => setTanggalPenitipan(e.target.value)} style={inputStyle} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', color: '#333', marginBottom: '8px', fontWeight: 'normal' }}>Nomor Handphone</label>
                <input type="text" value={nomorHp} onChange={(e) => setNomorHp(e.target.value)} placeholder="No Handphone" style={inputStyle} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', color: '#333', marginBottom: '8px', fontWeight: 'normal' }}>Hubungan dengan WBP</label>
                <input type="text" value={hubungan} onChange={(e) => setHubungan(e.target.value)} placeholder="Keluarga / Saudara / Teman" style={inputStyle} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', color: '#333', marginBottom: '8px', fontWeight: 'normal' }}>Jenis Barang Titipan</label>
                <input type="text" value={jenisBarang} onChange={(e) => setJenisBarang(e.target.value)} placeholder="Makanan / Pakaian / dll" style={inputStyle} />
              </div>

              <div className="form-group-span-2">
                <label style={{ display: 'block', fontSize: '14px', color: '#333', marginBottom: '8px', fontWeight: 'normal' }}>Jumlah</label>
                <input type="text" value={jumlahBarang} onChange={(e) => setJumlahBarang(e.target.value)} placeholder="1 Kotak / 2 Bungkus" style={inputStyle} />
              </div>

              <div className="form-group-span-2" style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                <button type="submit" disabled={loading} style={{ backgroundColor: '#093661', color: 'white', border: 'none', padding: '14px 50px', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', boxShadow: '0 4px 6px rgba(9,54,97,0.2)', width: '100%', transition: 'all 0.2s' }}>
                  Kirim
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 20px' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '25px' }}>
            <div style={{ backgroundColor: '#22c55e', color: 'white', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px auto', boxShadow: '0 4px 10px rgba(34,197,94,0.3)' }}>
              <svg width="30" height="30" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b' }}>Pendaftaran Berhasil Terkirim!</h2>
          </div>

          <div className="receipt-box" style={{ backgroundColor: '#ffffff', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', padding: '25px', overflow: 'hidden', boxSizing: 'border-box', position: 'relative' }}>
            
            <div style={{ textAlign: 'center', borderBottom: '2px dashed #cbd5e1', paddingBottom: '15px', marginBottom: '20px' }}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', color: '#093661', fontWeight: 'bold' }}>TANDA TERIMA RESI</h3>
              <span style={{ backgroundColor: '#e0f2fe', color: '#0369a1', padding: '6px 16px', borderRadius: '30px', fontSize: '12px', fontWeight: 'bold', display: 'inline-block', letterSpacing: '0.5px' }}>
                Status: Titipan
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <span style={labelReceipt}>Nama WBP ({formatStatus(submittedData?.statusWbp)})</span>
                <div style={valueReceiptBold}>{submittedData?.namaWbp}</div>
              </div>
              
              <div>
                <span style={labelReceipt}>Nama Penitip / Pengirim</span>
                <div style={valueReceipt}>{submittedData?.namaPenitip}</div>
              </div>

              <div className="receipt-grid">
                <div>
                  <span style={labelReceipt}>Hubungan</span>
                  <div style={valueReceipt}>{submittedData?.hubungan}</div>
                </div>
                <div>
                  <span style={labelReceipt}>No. HP Pengirim</span>
                  <div style={valueReceipt}>{submittedData?.nomorHp}</div>
                </div>
              </div>

              <div>
                <span style={labelReceipt}>Jenis Barang Bawaan</span>
                <div style={valueReceipt}>{submittedData?.jenisBarang}</div>
                <div style={labelReceipt}>Jumlah: {submittedData?.jumlahBarang}</div>
              </div>

              <div>
                <span style={labelReceipt}>Waktu Registrasi</span>
                <div style={valueReceipt}>{submittedData?.tanggal}</div>
              </div>
            </div>

            <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#fff7ed', border: '1px solid #ffedd5', borderRadius: '8px', fontSize: '12px', color: '#c2410c', textAlign: 'center' }}>
              <b>PENTING:</b> Silakan Screenshot resi ini dan perlihatkan kepada petugas saat tiba di lokasi kunjungan.
            </div>

            <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', height: '4px', background: 'radial-gradient(circle, transparent, transparent 50%, #f8fafc 50%, #f8fafc)', backgroundSize: '10px 10px' }}></div>
          </div>
        </div>
      )}

      <style jsx global>{`
        html, body {
          margin: 0;
          padding: 0;
          overscroll-behavior-y: none;
          touch-action: pan-y;
        }
        .responsive-container {
          width: 90%;
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
        }
        .responsive-form {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .form-group-span-2 {
          grid-column: span 2;
        }
        .receipt-box {
          width: 380px;
          max-width: 100%;
        }
        .receipt-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        @media (max-width: 768px) {
          .responsive-container {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .responsive-form {
            grid-template-columns: 1fr;
          }
          .form-group-span-2 {
            grid-column: span 1;
          }
          .receipt-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </motion.div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '16px',
  border: '1px solid #cbd5e1',
  borderRadius: '8px',
  outline: 'none',
  fontSize: '16px',
  boxSizing: 'border-box' as 'border-box',
  color: '#333',
  fontWeight: 'normal'
};

const labelReceipt = {
  display: 'block',
  fontSize: '14px',
  color: '#94a3b8',
  marginBottom: '2px'
};

const valueReceipt = {
  fontSize: '16px',
  color: '#334155',
  fontWeight: 'normal'
};

const valueReceiptBold = {
  fontSize: '16px',
  color: '#093661',
  fontWeight: 'bold'
};