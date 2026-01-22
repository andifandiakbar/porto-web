"use client";
import { useState, useEffect } from 'react';

export default function PengaduanPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="content-pengaduan" style={{ padding: '60px 0', backgroundColor: '#f9f9f9', minHeight: '80vh' }}>
      <div className="container">
        <div className="form-container" style={{
          maxWidth: '800px', margin: '0 auto', background: '#fff', padding: isMobile ? '25px' : '40px',
          borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
        }}>
          <h2 style={{ textAlign: 'center', fontSize: '28px', color: '#0b2d57', marginBottom: '30px', fontWeight: '600' }}>
            Form Pengaduan
          </h2>
          
          <form action="#">
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Nama:</label>
              <input type="text" required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} />
            </div>

            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Nomor KTP:</label>
              <input type="text" required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} />
            </div>

            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Alamat:</label>
              <input type="text" required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} />
            </div>

            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Pengaduan:</label>
              <textarea required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '4px', minHeight: '120px', resize: 'vertical' }}></textarea>
            </div>

            <button type="submit" className="btn-submit" style={{
              width: '100%', padding: '15px', backgroundColor: '#0b2d57', color: 'white',
              border: 'none', borderRadius: '4px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer'
            }}>
              Submit Pengaduan
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}