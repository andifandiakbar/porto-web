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

  const handleSelesaiDanCetak = () => {
    window.print();
  };

  const formatAntrian = (num: number) => num.toString().padStart(3, '0');

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const handleFocus = (field: string) => {
    if (dataKunjungan[field as keyof typeof dataKunjungan] === "0") {
      setDataKunjungan({ ...dataKunjungan, [field]: "" });
    }
  };

  const handleBlur = (field: string) => {
    if (dataKunjungan[field as keyof typeof dataKunjungan] === "") {
      setDataKunjungan({ ...dataKunjungan, [field]: "0" });
    }
  };

  return (
    <div className="ptsp-wrapper" style={{ padding: '60px 20px', backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      
      <div className="container-minimalist no-print" style={{ maxWidth: '850px', margin: '0 auto' }}>
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <motion.div variants={itemVariants} style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ color: '#093b77', fontSize: '28px', fontWeight: '700', marginBottom: '7px' }}>Input Data Pelayanan PTSP</h2>
            <div style={{ width: '45px', height: '4px', background: '#ddb309', margin: '0 auto 15px', borderRadius: '10px' }}></div>
          </motion.div>
          
          <div className="form-container">
            <motion.div variants={itemVariants} className="card-form">
              <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#093b77', marginBottom: '20px' }}>Data Pendaftaran Kunjungan</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label style={labelStyle}>No. Antrian</label>
                <input type="number" style={inputStyle} value={currentAntrian} onChange={(e) => setCurrentAntrian(Number(e.target.value))} />
                <label style={labelStyle}>Nama Pengunjung</label>
                <input style={inputStyle} value={dataKunjungan.nama} onChange={(e) => setDataKunjungan({...dataKunjungan, nama: e.target.value})} />
                <label style={labelStyle}>Alamat Pengunjung</label>
                <textarea style={inputStyle} rows={2} value={dataKunjungan.alamat} onChange={(e) => setDataKunjungan({...dataKunjungan, alamat: e.target.value})} />
                <label style={labelStyle}>WBP Dikunjungi</label>
                <input style={inputStyle} value={dataKunjungan.wbp} onChange={(e) => setDataKunjungan({...dataKunjungan, wbp: e.target.value})} />
                <label style={labelStyle}>Hubungan</label>
                <input style={inputStyle} value={dataKunjungan.hubungan} onChange={(e) => setDataKunjungan({...dataKunjungan, hubungan: e.target.value})} />
                <label style={labelStyle}>Pengikut (L | P | Anak | Bayi)</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '5px' }}>
                  <input type="number" style={inputStyle} value={dataKunjungan.laki} onFocus={() => handleFocus('laki')} onBlur={() => handleBlur('laki')} onChange={(e) => setDataKunjungan({...dataKunjungan, laki: e.target.value})} />
                  <input type="number" style={inputStyle} value={dataKunjungan.perempuan} onFocus={() => handleFocus('perempuan')} onBlur={() => handleBlur('perempuan')} onChange={(e) => setDataKunjungan({...dataKunjungan, perempuan: e.target.value})} />
                  <input type="number" style={inputStyle} value={dataKunjungan.anak} onFocus={() => handleFocus('anak')} onBlur={() => handleBlur('anak')} onChange={(e) => setDataKunjungan({...dataKunjungan, anak: e.target.value})} />
                  <input type="number" style={inputStyle} value={dataKunjungan.bayi} onFocus={() => handleFocus('bayi')} onBlur={() => handleBlur('bayi')} onChange={(e) => setDataKunjungan({...dataKunjungan, bayi: e.target.value})} />
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="card-form">
              <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#093b77', marginBottom: '20px' }}>Data Titipan Makanan</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label style={labelStyle}>Nama WBP</label>
                <input style={inputStyle} value={dataTitipan.namaWbp} onChange={(e) => setDataTitipan({...dataTitipan, namaWbp: e.target.value})} />
                <label style={labelStyle}>Status WBP</label>
                <input style={inputStyle} value={dataTitipan.statusWbp} onChange={(e) => setDataTitipan({...dataTitipan, statusWbp: e.target.value})} />
                <label style={labelStyle}>Alamat WBP</label>
                <textarea style={inputStyle} rows={2} value={dataTitipan.alamatWbp} onChange={(e) => setDataTitipan({...dataTitipan, alamatWbp: e.target.value})} />
                <label style={labelStyle}>Jenis Barang</label>
                <input style={inputStyle} value={dataTitipan.jenisBarang} onChange={(e) => setDataTitipan({...dataTitipan, jenisBarang: e.target.value})} />
                <label style={labelStyle}>Jumlah</label>
                <input style={inputStyle} value={dataTitipan.jumlah} onChange={(e) => setDataTitipan({...dataTitipan, jumlah: e.target.value})} />
              </div>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} style={{ textAlign: 'center', marginTop: '30px' }}>
            <button onClick={handleSelesaiDanCetak} style={btnStyle}>Cetak & Simpan Resi</button>
          </motion.div>
        </motion.div>
      </div>

      <div className="print-only">
        
        <div className="thermal-ticket page-break">
          <div className="ticket-header">
            <h3>BUKTI PENDAFTARARAN KUNJUNGAN</h3>
            <p>NO. ANTRIAN: {formatAntrian(currentAntrian)}</p>
          </div>
          <div className="line-dashed"></div>
          <table className="ticket-table">
            <tbody>
              <tr><td width="90">Nama</td><td>: {dataKunjungan.nama}</td></tr>
              <tr><td>Pengunjung</td><td></td></tr>
              <tr><td>Alamat</td><td>: {dataKunjungan.alamat}</td></tr>
              <tr><td colSpan={2}><div className="line-dashed"></div></td></tr>
              <tr><td>WBP</td><td>: {dataKunjungan.wbp}</td></tr>
              <tr><td>Dikunjungi</td><td></td></tr>
              <tr><td>Hubungan</td><td>: {dataKunjungan.hubungan}</td></tr>
              <tr><td colSpan={2}><div className="line-dashed"></div></td></tr>
              <tr><td>Pengikut:</td><td></td></tr>
              <tr><td>Laki-laki</td><td>: {dataKunjungan.laki} orang</td></tr>
              <tr><td>Perempuan</td><td>: {dataKunjungan.perempuan} orang</td></tr>
              <tr><td>Anak-anak</td><td>: {dataKunjungan.anak} orang</td></tr>
              <tr><td>Bayi</td><td>: {dataKunjungan.bayi} orang</td></tr>
              <tr><td>Total</td><td>: {Number(dataKunjungan.laki)+Number(dataKunjungan.perempuan)+Number(dataKunjungan.anak)+Number(dataKunjungan.bayi)} orang</td></tr>
              <tr><td colSpan={2}><div className="line-dashed"></div></td></tr>
              <tr><td>Tanggal</td><td>: {dataKunjungan.tanggal}</td></tr>
            </tbody>
          </table>
          <div className="footer-sig">
            <div><p>Pengunjung</p><br/><br/><p>( {dataKunjungan.nama || '........'} )</p></div>
            <div><p>Petugas Pendaftaran</p><br/><br/><p>( ................. )</p></div>
          </div>
          <div style={{textAlign:'center', marginTop:'15px', fontSize:'9px'}}>*** TERIMA KASIH ***</div>
        </div>

        <div className="thermal-ticket">
          <div className="ticket-header">
            <h3>LABEL TITIPAN MAKANAN</h3>
          </div>
          <div className="line-dashed"></div>
          <table className="ticket-table">
            <tbody>
              <tr><td width="90">Nama WBP</td><td>: {dataTitipan.namaWbp}</td></tr>
              <tr><td>Status WBP</td><td>: {dataTitipan.statusWbp}</td></tr>
              <tr><td>Alamat WBP</td><td>: {dataTitipan.alamatWbp}</td></tr>
              <tr><td colSpan={2}><div className="line-dashed"></div></td></tr>
              <tr><td>Pengirim</td><td>: {dataKunjungan.nama}</td></tr>
              <tr><td>Alamat</td><td>: {dataKunjungan.alamat}</td></tr>
              <tr><td colSpan={2}><div className="line-dashed"></div></td></tr>
              <tr><td>Jenis Barang</td><td>: {dataTitipan.jenisBarang}</td></tr>
              <tr><td>Jumlah</td><td>: {dataTitipan.jumlah}</td></tr>
            </tbody>
          </table>
          <div style={{textAlign:'center', marginTop:'20px', fontSize:'9px'}}>
            <p>Harap tempel label ini pada kemasan makanan.</p>
            <div style={{width:'60px', height:'60px', border:'1px solid #000', margin:'10px auto', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'8px'}}>QR CODE</div>
          </div>
        </div>

      </div>

      <style jsx global>{`
        .print-only { display: none; }
        .card-form { background: #fff; border-radius: 16px; padding: 24px; border: 1px solid #f1f5f9; box-shadow: 0 4px 12px rgba(0,0,0,0.03); }
        
        @media screen {
          .form-container { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        }

        @media screen and (max-width: 768px) {
          .form-container { grid-template-columns: 1fr; }
          .ptsp-wrapper { padding: 30px 15px !important; }
        }

        @media print {
          body * { visibility: hidden; }
          .print-only, .print-only * { visibility: visible; }
          .print-only { display: block !important; position: absolute; left: 0; top: 0; width: 80mm; }
          
          .page-break { 
            break-after: page; 
            page-break-after: always;
          }

          .thermal-ticket { 
            width: 80mm; 
            color: black; 
            font-family: 'Courier New', monospace; 
            font-size: 11px; 
            padding: 5mm;
            background: white;
          }
          .ticket-header { text-align: center; margin-bottom: 5px; }
          .ticket-header h3 { font-size: 12px; margin: 0; }
          .ticket-header p { font-size: 11px; margin: 2px 0; }
          .line-dashed { border-top: 1px dashed black; margin: 5px 0; }
          .ticket-table { width: 100%; border-collapse: collapse; }
          .ticket-table td { vertical-align: top; padding: 1px 0; line-height: 1.2; }
          .footer-sig { display: flex; justify-content: space-between; margin-top: 20px; text-align: center; }
          .footer-sig p { margin: 0; font-size: 10px; }
          
          @page { 
            size: 80mm auto; 
            margin: 0; 
          }
        }
      `}</style>
    </div>
  );
}

const labelStyle = { display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569' };
const inputStyle = { width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', outline: 'none', background: '#fff' };
const btnStyle = { width: '100%', maxWidth: '300px', padding: '15px', backgroundColor: '#093661', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: '700' };