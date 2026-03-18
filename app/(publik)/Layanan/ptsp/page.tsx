"use client";

import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';

export default function PtspPage() {
  const [currentAntrian, setCurrentAntrian] = useState(1);

  const [dataKunjungan, setDataKunjungan] = useState({
    nama: "",
    alamat: "",
    wbp: "",
    hubungan: "",
    laki: "0",
    perempuan: "0",
    anak: "0",
    bayi: "0",
    tanggal: "" 
  });

  const [dataTitipan, setDataTitipan] = useState({
    namaWbp: "",
    statusWbp: "",
    alamatWbp: "",
    jenisBarang: "",
    jumlah: ""
  });

  useEffect(() => {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    setDataKunjungan(prev => ({ ...prev, tanggal: today.toLocaleDateString('id-ID', options) }));
  }, []);

  const totalPengikut = Number(dataKunjungan.laki) + Number(dataKunjungan.perempuan) + Number(dataKunjungan.anak) + Number(dataKunjungan.bayi);

  const handleSelesaiDanCetak = () => {
    window.print();
  };

  const formatAntrian = (num: number) => num.toString().padStart(3, '0');

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    <div className="ptsp-wrapper" style={{ 
      padding: '60px 20px', 
      backgroundColor: '#f8fafc', 
      minHeight: '70vh', 
      fontFamily: "'Plus Jakarta Sans', sans-serif" 
    }}>
      
      <div className="container-minimalist" style={{ maxWidth: '850px', margin: '0 auto' }}>
        <motion.div 
          className="no-print"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            variants={itemVariants}
            style={{ textAlign: 'center', marginBottom: '40px' }}
          >
            <h2 style={{ color: '#093b77', fontSize: '28px', fontWeight: '700', marginBottom: '7px' }}>
              Input Data Pelayanan PTSP
            </h2>
            <div style={{ width: '45px', height: '4px', background: '#ddb309', margin: '0 auto 15px', borderRadius: '10px' }}></div>
            <p style={{ color: '#64748b', fontSize: '14px', margin: '0' }}>
              Silakan lengkapi formulir pendaftaran kunjungan dan titipan di bawah ini
            </p>
          </motion.div>
          
          <div className="form-container">
            <motion.div 
              variants={itemVariants}
              style={{ background: '#ffffff', borderRadius: '16px', padding: '24px', border: '1px solid #f1f5f9', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#093b77', margin: 0 }}>Bukti Pendaftaran Kunjungan</h2>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={labelStyle}>No. Antrian</label>
                  <input type="number" style={inputStyle} value={currentAntrian} onChange={(e) => setCurrentAntrian(Number(e.target.value))} />
                </div>
                <div>
                  <label style={labelStyle}>Nama Pengunjung</label>
                  <input style={inputStyle} value={dataKunjungan.nama} onChange={(e) => setDataKunjungan({...dataKunjungan, nama: e.target.value})} />
                </div>
                <div>
                  <label style={labelStyle}>Alamat Pengunjung</label>
                  <input style={inputStyle} value={dataKunjungan.alamat} onChange={(e) => setDataKunjungan({...dataKunjungan, alamat: e.target.value})} />
                </div>
                <div>
                  <label style={labelStyle}>WBP Dikunjungi</label>
                  <input style={inputStyle} value={dataKunjungan.wbp} onChange={(e) => setDataKunjungan({...dataKunjungan, wbp: e.target.value})} />
                </div>
                <div>
                  <label style={labelStyle}>Hubungan</label>
                  <input style={inputStyle} value={dataKunjungan.hubungan} onChange={(e) => setDataKunjungan({...dataKunjungan, hubungan: e.target.value})} />
                </div>
                <div>
                  <label style={labelStyle}>Jumlah Pengikut (L | P | Anak | Bayi)</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                    <input type="number" style={inputStyle} value={dataKunjungan.laki} onChange={(e) => setDataKunjungan({...dataKunjungan, laki: e.target.value})} />
                    <input type="number" style={inputStyle} value={dataKunjungan.perempuan} onChange={(e) => setDataKunjungan({...dataKunjungan, perempuan: e.target.value})} />
                    <input type="number" style={inputStyle} value={dataKunjungan.anak} onChange={(e) => setDataKunjungan({...dataKunjungan, anak: e.target.value})} />
                    <input type="number" style={inputStyle} value={dataKunjungan.bayi} onChange={(e) => setDataKunjungan({...dataKunjungan, bayi: e.target.value})} />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              style={{ background: '#ffffff', borderRadius: '16px', padding: '24px', border: '1px solid #f1f5f9', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#093b77', margin: 0 }}>Label Titipan Makanan</h2>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={labelStyle}>Nama WBP</label>
                  <input style={inputStyle} value={dataTitipan.namaWbp} onChange={(e) => setDataTitipan({...dataTitipan, namaWbp: e.target.value})} />
                </div>
                <div>
                  <label style={labelStyle}>Status WBP</label>
                  <input style={inputStyle} value={dataTitipan.statusWbp} onChange={(e) => setDataTitipan({...dataTitipan, statusWbp: e.target.value})} />
                </div>
                <div>
                  <label style={labelStyle}>Jenis Barang</label>
                  <input style={inputStyle} value={dataTitipan.jenisBarang} onChange={(e) => setDataTitipan({...dataTitipan, jenisBarang: e.target.value})} />
                </div>
                <div>
                  <label style={labelStyle}>Jumlah</label>
                  <input style={inputStyle} value={dataTitipan.jumlah} onChange={(e) => setDataTitipan({...dataTitipan, jumlah: e.target.value})} />
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div 
            variants={itemVariants}
            style={{ textAlign: 'center', marginTop: '32px', marginBottom: '20px' }}
          >
            <motion.button 
              type="button" 
              style={{ width: '100%', maxWidth: '400px', backgroundColor: '#093661', color: 'white', border: 'none', paddingTop: '16px', paddingBottom: '16px', fontSize: '16px', borderRadius: '14px', cursor: 'pointer', fontWeight: '700' }}
              whileHover={{ backgroundColor: '#0c467e' }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSelesaiDanCetak} 
            >
              Cetak & Simpan
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      <div className="print-area">
        <div className="thermal-page">
          <h4 className="header-struk">BUKTI PENDAFTARAN KUNJUNGAN</h4>
          <p style={{ textAlign: 'center', fontSize: '11px', margin: '0' }}>NO. ANTRIAN: {formatAntrian(currentAntrian)}</p>
          <div className="dashed-line"></div>
          <table className="table-struk">
            <tbody>
              <tr><td width="85">Nama</td><td>: {dataKunjungan.nama}</td></tr>
              <tr><td>Pengunjung</td><td></td></tr>
              <tr><td>Alamat</td><td>: {dataKunjungan.alamat}</td></tr>
              <tr><td colSpan={2}><div className="dashed-line"></div></td></tr>
              <tr><td>WBP</td><td>: {dataKunjungan.wbp}</td></tr>
              <tr><td>Dikunjungi</td><td></td></tr>
              <tr><td>Hubungan</td><td>: {dataKunjungan.hubungan}</td></tr>
              <tr><td colSpan={2}><div className="dashed-line"></div></td></tr>
              <tr><td colSpan={2}>Pengikut:</td></tr>
              <tr><td>Laki-laki</td><td>: {dataKunjungan.laki} orang</td></tr>
              <tr><td>Perempuan</td><td>: {dataKunjungan.perempuan} orang</td></tr>
              <tr><td>Anak-anak</td><td>: {dataKunjungan.anak} orang</td></tr>
              <tr><td>Bayi</td><td>: {dataKunjungan.bayi} orang</td></tr>
              <tr><td>Total</td><td>: {totalPengikut} orang</td></tr>
              <tr><td colSpan={2}><div className="dashed-line"></div></td></tr>
              <tr><td>Tanggal</td><td>: {dataKunjungan.tanggal}</td></tr>
            </tbody>
          </table>
          <div className="signature-section">
            <div className="sig-item">
              <p>Pengunjung</p>
              <div className="sig-space"></div>
              <p>( {dataKunjungan.nama || '........'} )</p>
            </div>
            <div className="sig-item">
              <p>Petugas Pendaftaran</p>
              <div className="sig-space"></div>
              <p>( ........................ )</p>
            </div>
          </div>
        </div>

        <div className="thermal-page">
          <h4 className="header-struk">LABEL TITIPAN MAKANAN</h4>
          <div className="dashed-line"></div>
          <table className="table-struk">
            <tbody>
              <tr><td width="85">Nama WBP</td><td>: {dataTitipan.namaWbp}</td></tr>
              <tr><td>Status WBP</td><td>: {dataTitipan.statusWbp}</td></tr>
              <tr><td>Alamat WBP</td><td>: {dataKunjungan.alamat}</td></tr>
              <tr><td colSpan={2}><div className="dashed-line"></div></td></tr>
              <tr><td>Pengirim</td><td>: {dataKunjungan.nama}</td></tr>
              <tr><td>Alamat</td><td>: {dataKunjungan.alamat}</td></tr>
              <tr><td colSpan={2}><div className="dashed-line"></div></td></tr>
              <tr><td>Jenis Barang</td><td>: {dataTitipan.jenisBarang}</td></tr>
              <tr><td>Jumlah</td><td>: {dataTitipan.jumlah}</td></tr>
            </tbody>
          </table>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
             <div className="qr-placeholder">
               <span style={{ fontSize: '8px' }}>QR CODE</span>
             </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .print-area { display: none; }

        @media print {
          html, body { margin: 0 !important; padding: 0 !important; }
          body * { visibility: hidden; }
          .print-area, .print-area * { visibility: visible; display: block !important; }
          .print-area { position: absolute; left: 0; top: 0; width: 80mm; }
          
          .thermal-page { 
            width: 80mm; 
            padding: 5mm; 
            page-break-after: always;
            font-family: 'Courier New', Courier, monospace;
            color: black;
          }

          .header-struk { text-align: center; font-size: 13px; font-weight: bold; margin: 0 0 5px 0; }
          .dashed-line { border-top: 1px dashed #000; margin: 5px 0; width: 100%; }
          .table-struk { width: 100%; font-size: 11px; border-collapse: collapse; }
          .table-struk td { vertical-align: top; padding: 1px 0; }
          
          .signature-section {
            margin-top: 20px;
            display: flex !important;
            flex-direction: row !important;
            justify-content: space-between;
            align-items: flex-start;
            width: 100%;
          }

          .sig-item {
            display: flex !important;
            flex-direction: column !important;
            align-items: center;
            width: 48%;
            font-size: 10px;
            text-align: center;
          }

          .sig-space { height: 35px; }
          .qr-placeholder { width: 50px; height: 50px; border: 1px solid black; display: flex !important; align-items: center; justify-content: center; }
          
          @page { size: 80mm auto; margin: 0; }
        }
      `}</style>

      <style jsx>{`
        @media screen { 
          .form-container { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        }
        @media (max-width: 768px) {
          .form-container { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}

const labelStyle = { display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '6px' };
const inputStyle = { width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '14px', outline: 'none' };