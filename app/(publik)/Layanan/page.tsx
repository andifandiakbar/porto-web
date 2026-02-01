"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function LayananIntegrasi() {
  return (
    <section className="content-layanan" style={{ padding: '40px 0', backgroundColor: '#f4f7f6', minHeight: '100vh' }}>
      <div className="container">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="box-container" 
          style={{ background: 'white', borderRadius: '10px', boxShadow: '0 5px 20px rgba(0,0,0,0.1)', overflow: 'hidden', marginBottom: '50px' }}
        >
          
          <div className="header-blue" style={{ background: '#093b77', color: 'white', padding: '20px 30px', display: 'flex', alignItems: 'center', gap: '15px' }}>
            <i className="fa-solid fa-location-dot" style={{ fontSize: '24px' }}></i>
            <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 'bold' }}>Layanan Integrasi CB/PB dan Remisi</h2>
          </div>

          <div className="body-text" style={{ padding: '40px', color: '#333', lineHeight: '1.8', fontSize: '15px', textAlign: 'left' }}>
            
            <p>Cuti bersyarat atau CB adalah proses pembinaan di luar Rutan atau Lembaga Pemasyarakatan bagi Narapidana yang dipidana paling lama 1 (satu) tahun 6 (enam) bulan, sekurang-kurangnya telah menjalani 2/3 ( dua pertiga ) masa pidana dengan syarat sebagai berikut :</p>
            <ul style={{ marginTop: '10px', paddingLeft: '20px', listStyleType: 'decimal' }}>
              <li>Dipidana dengan pidana penjara paling lama 1 (satu) tahun 6 (enam) bulan</li>
              <li>Telah menjalani paling sedikit 2/3 (dua per tiga) masa pidana</li>
              <li>Berkelakuan baik dalam kurun waktu 6 (enam) bulan terakhir</li>
              <li>CB bagi Narapidana dan Anak Pidana dapat diberikan untuk jangka waktu paling lama 6 (enam) bulan</li>
              <li>Fotokopi kutipan putusan hakim dan berita acara pelaksanaan putusan pengadilan dan laporan perkembangan pembinaan yang dibuat oleh wali pemasyarakatan/ hasil assessment resiko dan assessment kebutuhan yang dilakukan oleh asesor dan laporan penelitian kemasyarakatan yang dibuat oleh Pembimbing Kemasyarakatan yang diketahui oleh Kepala Bapas</li>
              <li>Surat pemberitahuan ke Kejaksaan Negeri tentang rencana pemberian CB terhadap Narapidana dan Anak Didik Pemasyarakatan yang bersangkutan</li>
              <li>Salinan register F, salinan daftar perubahan dari Kepala Lapas dan surat pernyataan dari Narapidana atau Anak Didik Pemasyarakatan tidak akan melakukan perbuatan melanggar hukum</li>
              <li>Surat jaminan kesanggupan dari pihak keluarga yang diketahui oleh lurah, kepala desa yang menyatakan Narapidana atau Anak Didik Pemasyarakatan tidak akan melarikan diri dan melakukan perbuatan melanggar hukum, serta membantu dalam membimbing dan mengawasi Narapidana/anak didik pemasyarakatan selama mengikuti program CB. Untuk mendapatkan surat jaminan silahkan mengklik tautan <a href="https://docs.google.com/forms/d/e/1FAIpQLSctP_AqsA1_CMpp0LQpqjCKCRaRAAre0mi2C_gnERtZdQlB5g/viewform" className="link-disini" style={{ color: '#2980b9', fontWeight: 'bold', textDecoration: 'underline', fontStyle: 'italic' }}>Disini</a></li>
            </ul>

            <hr style={{ border: 0, borderTop: '1px solid #eee', margin: '30px 0' }} />

            <p>PB atau Pembebasan bersyarat adalah proses pembinaan Narapidana dan Anak Pidana di luar Rutan atau Lembaga Pemasyarakatan setelah menjalani sekurang-kurangnya 2/3 (dua pertiga) masa pidananya minimal 9 (Sembilan) bulan. PB diperuntukan untuk warga binaan dengan pidana sama atau lebih dari 1 (satu) Tahun 7 (Tujuh) Bulan.</p>
            <ul style={{ marginTop: '10px', paddingLeft: '20px', listStyleType: 'decimal' }}>
              <li>Telah menjalani masa pidana paling singkat 2/3 (dua per tiga), dengan ketentuan 2/3 (dua per tiga) masa pidana tersebut paling sedikit 9 (sembilan) bulan</li>
              <li>Berkelakuan baik selama menjalani masa pidana paling singkat 9 (sembilan) bulan terakhir dihitung sebelum tanggal 2/3 (dua per tiga) masa pidana</li>
              <li>Telah menjalani Asimilasi paling sedikit 1/2 (satu per dua) dari sisa masa pidana yang wajib dijalani (Narapidana tindak pidana terorisme, narkotika dan precursor narkotika, psikotropika, korupsi, kejahatan HAM yang berat, kejahatan transnasional, dan kejahatan terhadap keamanan negara )</li>
              <li>Telah menjalani Asimilasi paling sedikit 1/2 (satu per dua) dari sisa masa pidana yang wajib dijalani (Narapidana tindak pidana terorisme, narkotika dan precursor narkotika, psikotropika, korupsi, kejahatan HAM yang berat, kejahatan transnasional, dan kejahatan terhadap keamanan negara )</li>
              <li>Telah mengikuti program pembinaan dengan baik, tekun,dan bersemangat</li>
              <li>Masyarakat dapat menerima program kegiatan pembinaan Narapidana</li>
              <li>PB dapat diberikan bagi Anak Negara setelah menjalani pembinaan paling sedikit 1 (satu) tahun. Sedangkan untuk Dewasa telah menjalani pidana lebih dari 1 (satu) tahun 6 (enam) bulan.</li>
              <li>Fotokopi kutipan putusan hakim dan berita acara pelaksanaan putusan pengadilan</li>
              <li>Laporan perkembangan pembinaan yang dibuat oleh wali pemasyarakatan/ hasil assessment resiko dan assessment kebutuhan yang dilakukan oleh asesor</li>
              <li>Laporan penelitian kemasyarakatan yang dibuat oleh Pembimbing Kemasyarakatan yang diketahui oleh Kepala Bapas</li>
              <li>Surat pemberitahuan ke Kejaksaan Negeri tentang rencana pemberian PB terhadap Narapidana dan Anak Didik Pemasyarakatan yang bersangkutan</li>
              <li>Salinan register F dari Kepala Lapas</li>
              <li>Salinan daftar perubahan dari Kepala Lapas</li>
              <li>Surat pernyataan dari Narapidana atau Anak Didik Pemasyarakatan tidak akan melakukan perbuatan melanggar hukum</li>
              <li>Surat jaminan kesanggupan dari pihak keluarga yang diketahui oleh lurah, kepala desa yang menyatakan Narapidana atau Anak Didik Pemasyarakatan tidak akan melarikan diri dan melakukan perbuatan melanggar hukum, serta membantu dalam membimbing dan mengawasi Narapidana/anak didik pemasyarakatan selama mengikuti program PB, Untuk mendapatkan surat jaminan silahkan mengklik tautan <a href="https://docs.google.com/forms/d/e/1FAIpQLSctP_AqsA1_CMpp0LQpqjCKCRaRAAre0mi2C_gnERtZdQlB5g/viewform" style={{ color: '#2980b9', fontWeight: 'bold', textDecoration: 'underline', fontStyle: 'italic' }}>Disini</a></li>
            </ul>

            <hr style={{ border: 0, borderTop: '1px solid #eee', margin: '30px 0' }} />

            <p>Remisi merupakan pengurangan masa menjalani pidana yang diberikan kepada narapidana dan anak yang berkonflik dengan hukum.</p>
            <p>Remisi diberikan kepada mereka yang memenuhi syarat-syarat yang ditentukan dalam peraturan perundang-undangan. Peraturan Menteri Hukum dan Hak Asasi Manusia Nomor 3 Tahun 2018 pasal 3 dan 4 membagi remisi menjadi beberapa jenis, yakni:</p>
            <p><strong>1. Remisi umum:</strong></p>
            <p>Remisi umum diberikan pada hari peringatan kemerdekaan RI tiap 17 Agustus. Adapun regulasinya yaitu untuk tahun pertama bagi narapidana yang telah menjalani pidana 6-12 bulan diberikan remisi 1 bulan. Bagi yang lebih dari 12 bulan dapat 2 bulan. Untuk tahun kedua dapat 3 bulan, tahun ketiga dapat 4 bulan, tahun keempat dan kelima dapat 5 bulan, dan tahun keenam dan seterusnya dapat 6 bulan.</p>
            <p><strong>2. Remisi khusus:</strong></p>
            <p>Remisi khusus diberikan pada hari besar keagamaan yang dianut oleh napi atau anak yang bersangkutan. Hari raya keagamaan yang dijadikan acuan antara lain Islam pada Idul Fitri, Kristen Protestan dan Katolik pada Natal, Hindu pada Nyepi, dan Buddha pada Waisak. Besaran remisi khusus yaitu untuk tahun pertama bagi narapidana yang telah menjalani pidana 6 sampai 12 bulan diberikan remisi 15 hari. Bagi yang lebih dari 12 bulan dapat 1 bulan. Untuk tahun kedua dan ketiga dapat 1 bulan. Tahun keempat dan tahun kelima dapat 1 bulan 15 hari.</p>
            
            <p style={{ marginTop: '20px', fontWeight: 'bold' }}>Syarat Pemberian Remisi:</p>
            <ul style={{ marginTop: '10px', paddingLeft: '20px', listStyleType: 'disc' }}>
              <li>Telah menjalani masa pidana lebih dari 6 (enam) bulan</li>
              <li>Berkelakuan baik dibuktikan dengan:</li>
              <li>Tidak sedang menjalani hukuman disiplin dalam kurun waktu 6 (enam) bulan terakhir, terhitung sebelum tanggal pemberian Remisi</li>
              <li>Telah mengikuti program pembinaan yang diselenggarakan oleh LAPAS dengan predikat baik.</li>
              <li>Tidak sedang menjalani pidana kurungan pengganti denda/uang pengganti</li>
              <li>Tidak sedang menjalani Cuti Menjelang Bebas</li>
              <li>Telah membayar lunas denda dan uang pengganti sesuai dengan putusan pengadilan untuk tindak pidana Korupsi</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}