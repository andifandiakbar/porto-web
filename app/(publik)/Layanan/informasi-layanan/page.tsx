"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function LayananIntegrasi() {
  return (
    <motion.section 
      className="content-layanan" 
      style={{ padding: '60px 20px', backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: '"Roboto", Arial, sans-serif' }}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="container-minimalist" style={{ maxWidth: '750px', margin: '0 auto' }}>
        
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
          className="box-container" 
          style={{ background: '#ffffff', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)', border: '1px solid #e2e8f0', overflow: 'hidden', marginBottom: '50px' }}
        >
          
          <div className="header-blue" style={{ background: '#093b77', color: 'white', padding: '24px 30px', display: 'flex', alignItems: 'center', gap: '15px', fontFamily: '"Roboto", Arial, sans-serif' }}>
            <i className="fa-solid fa-location-dot" style={{ fontSize: '24px' }}></i>
            <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 'bold', fontFamily: '"Roboto", Arial, sans-serif' }}>Layanan Integrasi CB/PB dan Remisi</h2>
          </div>

          <div className="body-text" style={{ padding: '50px 40px', color: '#475569', lineHeight: '1.85', fontSize: '15px', textAlign: 'left', fontFamily: '"Roboto", Arial, sans-serif' }}>
            
            <p style={{ marginBottom: '16px' }}>Cuti bersyarat atau CB adalah proses pembinaan di luar Rutan atau Lembaga Pemasyarakatan bagi Narapidana yang dipidana paling lama 1 (satu) tahun 6 (enam) bulan, sekurang-kurangnya telah menjalani 2/3 ( dua pertiga ) masa pidana dengan syarat sebagai berikut :</p>
            <ul style={{ marginTop: '10px', paddingLeft: '20px', listStyleType: 'decimal', marginBottom: '24px' }}>
              <li style={{ marginBottom: '8px' }}>Dipidana dengan pidana penjara paling lama 1 (satu) tahun 6 (enam) bulan</li>
              <li style={{ marginBottom: '8px' }}>Telah menjalani paling sedikit 2/3 (dua per tiga) masa pidana</li>
              <li style={{ marginBottom: '8px' }}>Berkelakuan baik dalam kurun waktu 6 (enam) bulan terakhir</li>
              <li style={{ marginBottom: '8px' }}>CB bagi Narapidana dan Anak Pidana dapat diberikan untuk jangka waktu paling lama 6 (enam) bulan</li>
              <li style={{ marginBottom: '8px' }}>Fotokopi kutipan putusan hakim dan berita acara pelaksanaan putusan pengadilan dan laporan perkembangan pembinaan yang dibuat oleh wali pemasyarakatan/ hasil assessment resiko dan assessment kebutuhan yang dilakukan oleh asesor dan laporan penelitian kemasyarakatan yang dibuat oleh Pembimbing Kemasyarakatan yang diketahui oleh Kepala Bapas</li>
              <li style={{ marginBottom: '8px' }}>Surat pemberitahuan ke Kejaksaan Negeri tentang rencana pemberian CB terhadap Narapidana dan Anak Didik Pemasyarakatan yang bersangkutan</li>
              <li style={{ marginBottom: '8px' }}>Salinan register F, salinan daftar perubahan dari Kepala Lapas dan surat pernyataan dari Narapidana atau Anak Didik Pemasyarakatan tidak akan melakukan perbuatan melanggar hukum</li>
              <li style={{ marginBottom: '8px' }}>Surat jaminan kesanggupan dari pihak keluarga yang diketahui oleh lurah, kepala desa yang menyatakan Narapidana atau Anak Didik Pemasyarakatan tidak akan melarikan diri dan melakukan perbuatan melanggar hukum, serta membantu dalam membimbing dan mengawasi Narapidana/anak didik pemasyarakatan selama mengikuti program CB. Untuk mendapatkan surat jaminan silahkan mengklik tautan <a href="https://docs.google.com/forms/d/e/1FAIpQLSctP_AqsA1_CMpp0LQpqjCKCRaRAAre0mi2C_gnERtZdQlB5g/viewform" className="link-disini" style={{ color: '#093b77', fontWeight: 'bold', textDecoration: 'underline', fontStyle: 'italic' }}>Disini</a></li>
            </ul>

            <div style={{ height: '1px', background: '#f1f5f9', margin: '35px 0', width: '100%' }}></div>

            <p style={{ marginBottom: '16px' }}>PB atau Pembebasan bersyarat adalah proses pembinaan Narapidana dan Anak Pidana di luar Rutan atau Lembaga Pemasyarakatan setelah menjalani sekurang-kurangnya 2/3 (dua pertiga) masa pidananya minimal 9 (Sembilan) bulan. PB diperuntukan untuk warga binaan dengan pidana sama atau lebih dari 1 (satu) Tahun 7 (Tujuh) Bulan.</p>
            <ul style={{ marginTop: '10px', paddingLeft: '20px', listStyleType: 'decimal', marginBottom: '24px' }}>
              <li style={{ marginBottom: '8px' }}>Telah menjalani masa pidana paling singkat 2/3 (dua per tiga), dengan ketentuan 2/3 (dua per tiga) masa pidana tersebut paling sedikit 9 (sembilan) bulan</li>
              <li style={{ marginBottom: '8px' }}>Berkelakuan baik selama menjalani masa pidana paling singkat 9 (sembilan) bulan terakhir dihitung sebelum tanggal 2/3 (dua per tiga) masa pidana</li>
              <li style={{ marginBottom: '8px' }}>Telah menjalani Asimilasi paling sedikit 1/2 (satu per dua) dari sisa masa pidana yang wajib dijalani (Narapidana tindak pidana terorisme, narkotika dan precursor narkotika, psikotropika, korupsi, kejahatan HAM yang berat, kejahatan transnasional, dan kejahatan terhadap keamanan negara )</li>
              <li style={{ marginBottom: '8px' }}>Telah menjalani Asimilasi paling sedikit 1/2 (satu per dua) dari sisa masa pidana yang wajib dijalani (Narapidana tindak pidana terorisme, narkotika dan precursor narkotika, psikotropika, korupsi, kejahatan HAM yang berat, kejahatan transnasional, dan kejahatan terhadap keamanan negara )</li>
              <li style={{ marginBottom: '8px' }}>Telah mengikuti program pembinaan dengan baik, tekun,dan bersemangat</li>
              <li style={{ marginBottom: '8px' }}>Masyarakat dapat menerima program kegiatan pembinaan Narapidana</li>
              <li style={{ marginBottom: '8px' }}>PB dapat diberikan bagi Anak Negara setelah menjalani pembinaan paling sedikit 1 (satu) tahun. Sedangkan untuk Dewasa telah menjalani pidana lebih dari 1 (satu) tahun 6 (enam) bulan.</li>
              <li style={{ marginBottom: '8px' }}>Fotokopi kutipan putusan hakim dan berita acara pelaksanaan putusan pengadilan</li>
              <li style={{ marginBottom: '8px' }}>Laporan perkembangan pembinaan yang dibuat oleh wali pemasyarakatan/ hasil assessment resiko dan assessment kebutuhan yang dilakukan oleh asesor</li>
              <li style={{ marginBottom: '8px' }}>Laporan penelitian kemasyarakatan yang dibuat oleh Pembimbing Kemasyarakatan yang diketahui oleh Kepala Bapas</li>
              <li style={{ marginBottom: '8px' }}>Surat pemberitahuan ke Kejaksaan Negeri tentang rencana pemberian PB terhadap Narapidana dan Anak Didik Pemasyarakatan yang bersangkutan</li>
              <li style={{ marginBottom: '8px' }}>Salinan register F dari Kepala Lapas</li>
              <li style={{ marginBottom: '8px' }}>Salinan daftar perubahan dari Kepala Lapas</li>
              <li style={{ marginBottom: '8px' }}>Surat pernyataan dari Narapidana atau Anak Didik Pemasyarakatan tidak akan melakukan perbuatan melanggar hukum</li>
              <li style={{ marginBottom: '8px' }}>Surat jaminan kesanggupan dari pihak keluarga yang diketahui oleh lurah, kepala desa yang menyatakan Narapidana atau Anak Didik Pemasyarakatan tidak akan melarikan diri dan melakukan perbuatan melanggar hukum, serta membantu dalam membimbing dan mengawasi Narapidana/anak didik pemasyarakatan selama mengikuti program PB, Untuk mendapatkan surat jaminan silahkan mengklik tautan <a href="https://docs.google.com/forms/d/e/1FAIpQLSctP_AqsA1_CMpp0LQpqjCKCRaRAAre0mi2C_gnERtZdQlB5g/viewform" style={{ color: '#093b77', fontWeight: 'bold', textDecoration: 'underline', fontStyle: 'italic' }}>Disini</a></li>
            </ul>

            <div style={{ height: '1px', background: '#f1f5f9', margin: '35px 0', width: '100%' }}></div>

            <p style={{ marginBottom: '12px' }}>Remisi merupakan pengurangan masa menjalani pidana yang diberikan kepada narapidana dan anak yang berkonflik dengan hukum.</p>
            <p style={{ marginBottom: '12px' }}>Remisi diberikan kepada mereka yang memenuhi syarat-syarat yang ditentukan dalam peraturan perundang-undangan. Peraturan Menteri Hukum dan Hak Asasi Manusia Nomor 3 Tahun 2018 pasal 3 dan 4 membagi remisi menjadi beberapa jenis, yakni:</p>
            
            <p style={{ marginBottom: '6px' }}><strong style={{ color: '#093b77' }}>1. Remisi umum:</strong></p>
            <p style={{ marginBottom: '16px' }}>Remisi umum diberikan pada hari peringatan kemerdekaan RI tiap 17 Agustus. Adapun regulasinya yaitu untuk tahun pertama bagi narapidana yang telah menjalani pidana 6-12 bulan diberikan remisi 1 bulan. Bagi yang lebih dari 12 bulan dapat 2 bulan. Untuk tahun kedua dapat 3 bulan, tahun ketiga dapat 4 bulan, tahun keempat dan kelima dapat 5 bulan, dan tahun keenam dan seterusnya dapat 6 bulan.</p>
            
            <p style={{ marginBottom: '6px' }}><strong style={{ color: '#093b77' }}>2. Remisi khusus:</strong></p>
            <p style={{ marginBottom: '20px' }}>Remisi khusus diberikan pada hari besar keagamaan yang dianut oleh napi atau anak yang bersangkutan. Hari raya keagamaan yang dijadikan acuan antara lain Islam pada Idul Fitri, Kristen Protestan dan Katolik pada Natal, Hindu pada Nyepi, dan Buddha pada Waisak. Besaran remisi khusus yaitu untuk tahun pertama bagi narapidana yang telah menjalani pidana 6 sampai 12 bulan diberikan remisi 15 hari. Bagi yang lebih dari 12 bulan dapat 1 bulan. Untuk tahun kedua dan ketiga dapat 1 bulan. Tahun keempat dan tahun kelima dapat 1 bulan 15 hari.</p>
            
            <p style={{ marginTop: '28px', fontWeight: 'bold', color: '#093b77', fontSize: '16px' }}>Syarat Pemberian Remisi:</p>
            <ul style={{ marginTop: '10px', paddingLeft: '20px', listStyleType: 'disc' }}>
              <li style={{ marginBottom: '6px' }}>Telah menjalani masa pidana lebih dari 6 (enam) bulan</li>
              <li style={{ marginBottom: '6px' }}>Berkelakuan baik dibuktikan dengan:</li>
              <li style={{ marginBottom: '6px', listStyleType: 'circle', marginLeft: '20px' }}>Tidak sedang menjalani hukuman disiplin dalam kurun waktu 6 (enam) bulan terakhir, terhitung sebelum tanggal pemberian Remisi</li>
              <li style={{ marginBottom: '6px', listStyleType: 'circle', marginLeft: '20px' }}>Telah mengikuti program pembinaan yang diselenggarakan oleh LAPAS dengan predikat baik.</li>
              <li style={{ marginBottom: '6px' }}>Tidak sedang menjalani pidana kurungan pengganti denda/uang pengganti</li>
              <li style={{ marginBottom: '6px' }}>Tidak sedang menjalani Cuti Menjelang Bebas</li>
              <li style={{ marginBottom: '6px' }}>Telah membayar lunas denda dan uang pengganti sesuai dengan putusan pengadilan untuk tindak pidana Korupsi</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}