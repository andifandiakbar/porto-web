"use client";
import React from 'react';

export default function TugasFungsiPage() {
  return (
    <div className="container" style={{ padding: '20px 15px', lineHeight: '1.5', color: '#333' }}>
      <h1 style={{ 
        color: '#093b77', 
        marginBottom: '20px', 
        fontSize: '1.5rem', 
        lineHeight: '1.3' 
      }}>
        Tugas Pokok dan Fungsi Kementerian Imigrasi dan Pemasyarakatan
      </h1>
      
      <section style={{ marginBottom: '25px' }}>
        <h2 style={{ color: '#093b77', marginBottom: '10px', fontSize: '1.25rem' }}>Tugas</h2>
        <p style={{ 
          fontSize: '0.95rem', 
          fontStyle: 'italic', 
          padding: '12px', 
          backgroundColor: '#f9f9f9',
          margin: 0
        }}>
          "Kementerian mempunyai tugas menyelenggarakan suburusan pemerintahan di bidang imigrasi dan pemasyarakatan yang merupakan lingkup urusan pemerintahan di bidang hukum untuk membantu Presiden dalam menyelenggarakan pemerintahan negara."
        </p>
      </section>

      <section>
        <h2 style={{ color: '#093b77', marginBottom: '10px', fontSize: '1.25rem' }}>Fungsi</h2>
        <p style={{ marginBottom: '15px', fontSize: '0.95rem' }}>
          Dalam melaksanakan tugas sebagaimana dimaksud dalam Pasal 5 Peraturan Menteri Imigrasi dan Pemasyarakatan Nomor 1 Tahun 2024, Kementerian Imigrasi dan Pemasyarakatan menyelenggarakan fungsi:
        </p>
        <ul style={{ paddingLeft: '20px', fontSize: '0.95rem', margin: 0 }}>
          <li style={{ marginBottom: '6px' }}>Perumusan, penetapan dan pelaksanaan kebijakan di bidang keimigrasian dan pemasyarakatan.</li>
          <li style={{ marginBottom: '6px' }}>Pelaksanaan bimbingan teknis, dan supervisi atas pelaksanaan urusan keimigrasian dan pemasyarakatan di daerah.</li>
          <li style={{ marginBottom: '6px' }}>Koordinasi pelaksanaan tugas, pembinaan dan pemberian dukungan administrasi kepada seluruh unsur organisasi di lingkungan Kementerian.</li>
          <li style={{ marginBottom: '6px' }}>Pengelolaan barang milik negara/kekayaan negara yang menjadi tanggung jawab Kementerian.</li>
          <li style={{ marginBottom: '6px' }}>Pengawasan atas pelaksanaan tugas di lingkungan Kementerian.</li>
          <li style={{ marginBottom: '6px' }}>Pelaksanaan pengembangan sumber daya manusia di bidang keimigrasian dan pemasyarakatan.</li>
          <li style={{ marginBottom: '6px' }}>Pelaksanaan kegiatan teknis yang berskala nasional.</li>
          <li style={{ marginBottom: '6px' }}>Pelaksanaan tugas pokok sampai ke daerah.</li>
          <li style={{ marginBottom: '6px' }}>Pelaksanaan dukungan yang bersifat substantif kepada seluruh unsur organisasi di lingkungan Kementerian Imigrasi dan Pemasyarakatan.</li>
          <li style={{ marginBottom: '6px' }}>Pelaksanaan fungsi lain yang diberikan oleh Presiden.</li>
        </ul>
      </section>
    </div>
  );
}