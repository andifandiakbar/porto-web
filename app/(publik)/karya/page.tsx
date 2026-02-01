"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';
import { motion, Variants } from 'framer-motion';

export default function KaryaBinaanPage() {
  const [daftarKarya, setDaftarKarya] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [pressedId, setPressedId] = useState<number | null>(null);

  useEffect(() => {
    const fetchKarya = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('daftar_karya')
          .select('*')
          .order('id', { ascending: false });
        if (error) throw error;
        setDaftarKarya(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchKarya();
  }, []);

  const navy = '#0b2d57';
  const gold = '#f1c40f';
  const blueActive = '#0070f3';

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: "easeOut" } 
    }
  };

  return (
    <div style={{ padding: '60px 0', backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .grid-karya {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 25px;
        }
        @media (max-width: 640px) {
          .grid-karya {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
          .card-text-title {
            font-size: 14px !important;
          }
          .card-text-price {
            font-size: 14px !important;
          }
          .card-text-unit {
            font-size: 10px !important;
          }
          .btn-beli {
            padding: 6px 12px !important;
            font-size: 12px !important;
          }
        }
      `}</style>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          <h1 style={{ color: '#093b77', fontSize: '28px', fontWeight: '700', marginBottom: '7px' }}>
            Hasil Karya Warga Binaan
          </h1>
          <p style={{ color: '#64748b', margin: '0' }}>Mendukung kreativitas dan kemandirian Rutan Sinjai</p>
          <div style={{ width: '50px', height: '4px', background: '#ddb309', margin: '15px auto 0', borderRadius: '2px' }}></div>
        </motion.div>

        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
            <div style={{ width: '40px', height: '40px', border: '4px solid #f3f3f3', borderTop: `4px solid ${navy}`, borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: '15px' }}></div>
            <p style={{ color: '#093b77', fontWeight: '600' }}>Memuat halaman...</p>
          </div>
        ) : (
          <motion.div 
            className="grid-karya"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {daftarKarya.map((item) => (
              <motion.div 
                key={item.id} 
                variants={itemVariants}
                style={{ 
                  background: navy, 
                  borderRadius: '15px', 
                  overflow: 'hidden', 
                  display: 'flex', 
                  flexDirection: 'column',
                  boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                }}
              >
                <div style={{ position: 'relative', width: '100%', height: '160px', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '15px', overflow: 'hidden' }}>
                  <img 
                    src={item.img || 'https://via.placeholder.com/300'} 
                    alt={item.nama} 
                    style={{ maxWidth: '150%', maxHeight: '150%', objectFit: 'contain' }}
                  />
                  <span style={{ position: 'absolute', top: '10px', left: '10px', background: gold, color: navy, padding: '3px 10px', borderRadius: '5px', fontSize: '11px', fontWeight: 'bold' }}>
                    {item.kategori || 'Aksesoris'}
                  </span>
                </div>
                
                <div style={{ padding: '15px', flexGrow: 1, color: '#ffffff' }}>
                  <h3 className="card-text-title" style={{ fontSize: '1.1rem', marginBottom: '5px', color: '#ffffff', fontWeight: '700' }}>
                    {item.nama}
                  </h3>
                  <p className="card-text-unit" style={{ fontSize: '12px', color: '#bdc3c7', marginBottom: '18px' }}>
                    {item.unit || 'Unit Produksi Rutan Sinjai'}
                  </p>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="card-text-price" style={{ fontWeight: '800', color: gold, fontSize: '1.2rem' }}>
                      {item.harga.includes('Rp') ? item.harga : `Rp ${item.harga}`}
                    </span>
                    <motion.button 
                      className="btn-beli"
                      onClick={() => window.open(`https://wa.me/6281356640175?text=Halo, saya ingin memesan: ${item.nama}`, '_blank')}
                      onMouseDown={() => setPressedId(item.id)}
                      onMouseUp={() => setPressedId(null)}
                      onMouseLeave={() => setPressedId(null)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{ 
                        background: pressedId === item.id ? blueActive : gold, 
                        color: pressedId === item.id ? '#ffffff' : navy, 
                        border: 'none', 
                        padding: '8px 18px', 
                        borderRadius: '6px', 
                        fontWeight: '700', 
                        cursor: 'pointer',
                        transition: 'background 0.1s ease'
                      }}
                    >
                      Beli
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {!loading && daftarKarya.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ textAlign: 'center', padding: '50px', color: '#64748b' }}
          >
            Belum ada produk karya yang tersedia.
          </motion.div>
        )}
      </div>
    </div>
  );
}