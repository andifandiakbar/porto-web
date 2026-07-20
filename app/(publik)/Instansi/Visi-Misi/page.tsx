"use client";
import React from 'react';

export default function VisiMisiPage() {
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

  const headingStyle: React.CSSProperties = {
    color: '#093b77',
    marginBottom: '10px',
    fontSize: '1.15rem',
    fontWeight: 'bold',
    fontFamily: '"Arial", sans-serif'
  };

  const textStyle: React.CSSProperties = {
    fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontFamily: '"Arial", sans-serif'
  };

  const listStyle: React.CSSProperties = {
    paddingLeft: '20px',
    fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
    fontFamily: '"Arial", sans-serif'
  };

  const itemStyle: React.CSSProperties = {
    marginBottom: '6px',
    fontWeight: 'normal',
    fontFamily: '"Arial", sans-serif'
  };

  return (
    <div className="container" style={containerStyle}>
      <h1 style={titleStyle}>Visi dan Misi</h1>
      
      <section style={{ marginBottom: '25px' }}>
        <h2 style={headingStyle}>Visi</h2>
        <p style={textStyle}>
          &quot;Terwujudnya Penegakan Hukum dan Pelayanan Keimigrasian dan Pemasyarakatan untuk Stabilitas Keamanan yang Tangguh menuju Indonesia Emas 2045&quot;
        </p>
      </section>

      <section style={{ marginBottom: '25px' }}>
        <h2 style={headingStyle}>Misi</h2>
        <ul style={listStyle}>
          <li style={itemStyle}>
            Mewujudkan Penegakan Hukum dan pelayanan serta jaminan pelindungan Imigrasi dan Pemasyarakatan yang transparan dan berkeadilan.
          </li>
          <li style={itemStyle}>
            Meningkatkan kapasitas kelembagaan Imigrasi dan Pemasyarakatan yang modern, profesional, dan berintegritas.
          </li>
        </ul>
      </section>

      <section>
        <h2 style={headingStyle}>Tujuan</h2>
        <ul style={listStyle}>
          <li style={itemStyle}>
            Menciptakan penegakan dan pelayanan hukum untuk mendukung kedaulatan negara serta reintegrasi sosial secara transparan dan berkeadilan.
          </li>
          <li style={itemStyle}>
            Menciptakan sistem keimigrasian dan pemasyarakatan yang modern, terintegrasi dan akuntabel melalui peningkatan kompetensi dan profesionalisme sumber daya manusia yang berintegritas, responsif dan adaptif di bidang Imigrasi dan Pemasyarakatan.
          </li>
        </ul>
      </section>
    </div>
  );
}