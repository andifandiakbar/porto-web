"use client";

import React from 'react';

export default function SyaratKetentuan() {
  return (
    <section className="content-layanan">
      <div className="container-minimalist">
        
        <div className="section-title">
          <h2>Ketentuan Kunjungan</h2>
          <div className="underline"></div>
        </div>

        <div className="ketentuan-stack">
          <div className="k-card">
            <div className="k-icon-wrapper"><i className="fa-solid fa-id-card"></i></div>
            <div className="k-info">
              <h4>Identitas Resmi</h4>
              <p>Wajib Membawa Identitas Resmi (KTP, KK, SIM & KARTU PELAJAR)</p>
            </div>
          </div>

          <div className="k-card">
            <div className="k-icon-wrapper"><i className="fa-solid fa-file-signature"></i></div>
            <div className="k-info">
              <h4>Izin Pihak Penahan</h4>
              <p>Wajib Membawa Surat Izin Dari Pihak Penahan (Bagi Tahanan)</p>
            </div>
          </div>

          <div className="k-card">
            <div className="k-icon-wrapper"><i className="fa-solid fa-shirt"></i></div>
            <div className="k-info">
              <h4>Etika Berpakaian</h4>
              <p>Dilarang Menggunakan celana Pendek</p>
            </div>
          </div>

          <div className="k-card">
            <div className="k-icon-wrapper"><i className="fa-solid fa-calendar-xmark"></i></div>
            <div className="k-info">
              <h4>Hari Libur</h4>
              <p>Hari Minggu dan Libur Nasional Kunjungan Ditiadakan</p>
            </div>
          </div>
        </div>

      </div>

      <style jsx>{`
        .content-layanan {
          padding: 60px 20px;
          background-color: #ffffff;
          min-height: 70vh;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .container-minimalist {
          max-width: 850px;
          margin: 0 auto;
        }
        .section-title {
          text-align: center;
          margin-bottom: 40px;
        }
        .section-title h2 {
          color: #093b77;
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 7px;
        }
        .underline {
          width: 45px;
          height: 4px;
          background: #ddb309;
          margin: 0 auto;
          border-radius: 10px;
        }
        .ketentuan-stack {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .k-card {
          background: #ffffff;
          padding: 22px 25px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          gap: 20px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
          border: 1px solid #f1f5f9;
        }
        .k-icon-wrapper {
          width: 55px;
          height: 55px;
          min-width: 55px;
          background: #f1f5f9;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          color: #093b77;
        }
        .k-info h4 {
          margin: 0 0 4px 0;
          font-size: 17px;
          color: #093b77;
          font-weight: 700;
        }
        .k-info p {
          margin: 0;
          color: #64748b;
          font-size: 14px;
          line-height: 1.6;
        }
        @media (max-width: 600px) {
          .k-card { padding: 18px; gap: 15px; }
          .k-icon-wrapper { width: 45px; height: 45px; min-width: 45px; font-size: 18px; }
          .k-info h4 { font-size: 15px; }
        }
      `}</style>
    </section>
  );
}