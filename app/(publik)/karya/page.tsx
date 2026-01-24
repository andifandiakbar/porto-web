"use client";
import React from 'react';
import "./karya.css"; 

interface Karya {
  id: number;
  nama: string;
  kategori: string;
  harga: string;
  img: string;
}

export default function KaryaBinaanPage() {
  const daftarKarya: Karya[] = [
    {
      id: 1,
      nama: "Cincin Tempurung Kelapa",
      kategori: "Aksesoris",
      harga: "Rp 15.000",
      img: "/assets/etalase1.jpeg"
    },
    {
      id: 2,
      nama: "Filter Rokok Unik",
      kategori: "Peralatan",
      harga: "Rp 25.000",
      img: "/assets/etalase2.jpeg"
    },
    {
      id: 3,
      nama: "Gantungan Kunci Udang",
      kategori: "Souvenir",
      harga: "Rp 10.000",
      img: "/assets/etalase3.jpeg"
    },
    {
      id: 4,
      nama: "Miniatur Kapal Pinisi",
      kategori: "Pajangan",
      harga: "Rp 150.000",
      img: "/assets/etalase4.jpeg"
    }
  ];

  return (
    <div className="karya-page-wrapper">
      <div className="karya-container">
        
        <div className="karya-header-section">
          <h1>Hasil Karya Warga Binaan</h1>
          <p>Mendukung kreativitas dan kemandirian Rutan Sinjai</p>
          <div className="karya-underline"></div>
        </div>

        <div className="karya-product-grid">
          {daftarKarya.map((item) => (
            <div key={item.id} className="karya-item-card">
              <div className="karya-image-container">
                <img src={item.img} alt={item.nama} />
                <span className="karya-badge">{item.kategori}</span>
              </div>
              
              <div className="karya-info-box">
                <h3>{item.nama}</h3>
                <p className="karya-brand">Unit Produksi Rutan Sinjai</p>
                <div className="karya-footer-flex">
                  <span className="karya-price-tag">{item.harga}</span>
                  <button 
                    className="karya-btn-buy"
                    onClick={() => window.open('https://wa.me/628714409435', '_blank')}
                  >
                    Beli
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}