"use client";
import React, { useState } from 'react';

export default function AdminPage() {

  return (
    <main style={{ 
      backgroundColor: '#f4f7f9', 
      minHeight: '100vh', 
      padding: '40px 20px',
      fontFamily: '"Inter", "Segoe UI", sans-serif' 
    }}>
      <div style={{ 
        maxWidth: '600px', 
        margin: '0 auto', 
        backgroundColor: '#ffffff', 
        padding: '30px', 
        borderRadius: '12px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
      }}>
        
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ color: '#0b2d57', fontSize: '24px', fontWeight: '700', margin: '0' }}>
            PANEL CMS - INPUT WBP
          </h2>
          <div style={{ 
            width: '50px', 
            height: '3px', 
            backgroundColor: '#0b2d57', 
            margin: '10px auto' 
          }}></div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label style={{ fontSize: '14px', color: '#666', marginBottom: '5px', display: 'block' }}>Nama Lengkap</label>
            <input 
              type="text" 
              placeholder="Contoh: Andi Sinjai" 
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{ fontSize: '14px', color: '#666', marginBottom: '5px', display: 'block' }}>NIK (16 Digit)</label>
            <input 
              type="text" 
              placeholder="Masukkan NIK..." 
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{ fontSize: '14px', color: '#666', marginBottom: '5px', display: 'block' }}>Kasus / Perkara</label>
            <input 
              type="text" 
              placeholder="Masukkan Kasus..." 
              style={inputStyle}
            />
          </div>

          <button style={{
            backgroundColor: '#0b2d57',
            color: 'white',
            padding: '14px',
            borderRadius: '8px',
            border: 'none',
            fontWeight: '600',
            cursor: 'pointer',
            marginTop: '10px',
            transition: '0.3s'
          }}>
            SIMPAN KE DATABASE
          </button>
        </div>
      </div>
    </main>
  );
}

const inputStyle = {
  width: '100%',
  padding: '12px 15px',
  borderRadius: '8px',
  border: '1px solid #dce1e7',
  fontSize: '15px',
  outline: 'none',
  transition: 'border-color 0.3s',
  color: '#333'
};