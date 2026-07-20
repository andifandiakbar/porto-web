"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function SejarahPemasyarakatan() {
  const containerStyle: React.CSSProperties = {
    padding: '40px 15px',
    margin: '0 auto',
    maxWidth: '800px',
    lineHeight: '1.8',
    color: '#333',
    fontFamily: '"Arial", sans-serif'
  };

  const titleStyle: React.CSSProperties = {
    color: '#093b77',
    marginBottom: '20px',
    fontSize: 'clamp(1.3rem, 3.5vw, 1.75rem)',
    fontWeight: 'bold',
    fontFamily: '"Arial", sans-serif',
    textTransform: 'uppercase',
    lineHeight: '1.3'
  };

  const textStyle: React.CSSProperties = {
    fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
    marginBottom: '20px',
    fontFamily: '"Arial", sans-serif',
    fontWeight: 'normal'
  };

  const quoteStyle: React.CSSProperties = {
    paddingLeft: '20px',
    margin: '25px 0',
    fontStyle: 'normal',
    backgroundColor: '#f9f9f9',
    padding: '15px',
    fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
    fontFamily: '"Arial", sans-serif',
    fontWeight: 'normal',
  };

  return (
    <motion.div 
      className="container" 
      style={containerStyle}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <motion.h1 
        style={titleStyle}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
      >
        Sejarah Pemasyarakatan
      </motion.h1>
      
      <p style={textStyle}>
        Indonesia adalah negara yang berdasarkan Pancasila menjunjung tinggi nilai-nilai kemanusiaan. 
        Konsep pembalasan dan penjeraan dalam sistem kepenjaraan sebagai bentuk pemidanaan adalah 
        bentuk warisan kolonial yang tidak selaras lagi dengan semangat dan jati diri bangsa Indonesia. 
        Pada tanggal 5 Juli 1963 istilah Pemasyarakatan pertama kali diperkenalkan melalui pidato 
        “Pohon Beringin Pengayoman” oleh Bapak Sahardjo, SH dalam penganugerahan gelar Doctor Honoris Causa 
        oleh Universitas Indonesia.
      </p>

      <blockquote style={quoteStyle}>
        &quot;Di bawah Pohon Beringin Pengayoman maka tujuan hukum pidana adalah mengayomi masyarakat. 
        Bukan hanya masyarakat umum yang diayomi dari tindak kejahatan, namun masyarakat yang tersesat 
        juga diayomi dengan memberikan bekal hidup, membimbing agar bertobat, dan mendidik supaya menjadi 
        anggota masyarakat yang berguna. Dengan singkat tujuan pidana penjara ialah Pemasyarakatan.&quot;
      </blockquote>

      <p style={textStyle}>
        Peneguhan pemasyarakatan sebagai Sistem dideklarasikan sebagai pengganti Sistem Kepenjaraan 
        pada tanggal 27 April 1964 dalam Konferensi Jawatan Kepenjaraan yang dilaksanakan di Lembang, Bandung. 
        Pemasyarakatan dalam konferensi tersebut dinyatakan sebagai suatu sistem Perlakuan terhadap para 
        pelanggar hukum dan sebagai pengejawantahan keadilan yang bertujuan untuk mencapai reintegrasi 
        sosial atau pulihnya kesatuan hubungan hidup, kehidupan dan penghidupan Warga Binaan Pemasyarakatan.
      </p>

      <p style={textStyle}>
        Transformasi menuju Sistem Pemasyarakatan dilegitimasi melalui Undang-Undang Nomor 12 Tahun 1995 
        tentang Pemasyarakatan sehingga menjadikan pelaksanaan Sistem Pemasyarakatan semakin baik dan mantap. 
        Seiring berjalannya waktu, tuntutan tugas Pemasyarakatan sebagai bagian dari sistem peradilan pidana 
        harus dapat merespon dinamika sosial dengan melakukan perubahan undang-undang Pemasyarakatan.
      </p>

      <p style={textStyle}>
        Undang-Undang Nomor 22 Tahun 2022 tentang Pemasyarakatan telah menjawab perluasan peran dan 
        tanggungjawab dalam memberikan perlakuan terhadap tersangka, terdakwa, dan terpidana, yaitu perlakuan 
        sejak proses peradilan sampai dengan menjalankan pidana berdasarkan putusan pengadilan yang telah 
        memperoleh kekuatan hukum tetap. Sistem Pemasyarakatan mewujudkan jaminan pelindungan terhadap 
        hak Tahanan dan Anak serta meningkatkan kualitas kepribadian dan kemandirian Warga Binaan agar 
        menyadari kesalahan, memperbaiki diri, dan tidak mengulangi tindak pidana, sehingga lingkungan 
        Masyarakat dapat menerima kembali, dapat hidup secara wajar sebagai warga yang berkualitas, 
        taat hukum, bertanggung jawab, dan aktif berperan dalam Pembangunan sekaligus memberikan 
        pelindungan kepada masyarakat dari pengulangan tindak pidana.
      </p>

      <p style={{ ...textStyle, marginTop: '4px' }}>
        Demikian sejarah singkat Sistem Pemasyarakatan, semoga jaya selamanya, abadi mengiringi sejarah 
        perjalanan bangsa dan negara Indonesia.
      </p>
    </motion.div>
  );
}