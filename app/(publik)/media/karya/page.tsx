"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '../../../../lib/supabase';
import { motion, Variants } from 'framer-motion';

export default function KaryaBinaanPage() {
  const [daftarKarya, setDaftarKarya] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.15 
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    <div style={{ padding: '60px 20px', backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: "Roboto, Arial, sans-serif" }}>
      <style>{`
        .grid-karya {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 26px;
        }
        .card-karya {
          background: #ffffff;
          border-radius: 20px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
          transition: box-shadow 0.35s ease, transform 0.35s ease;
          border: 1px solid #e2e8f0;
          position: relative;
        }
        .card-karya:hover {
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.06);
          transform: translateY(-4px);
        }
        .card-img-wrap {
          position: relative;
          width: calc(100% - 32px);
          height: 230px;
          background: #f5f7fb;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          margin: 16px 16px 0 16px;
          border-radius: 16px;
        }
        .card-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .card-karya:hover .card-img-wrap img {
          transform: scale(1.04);
        }
        .badge-kategori {
          position: absolute;
          top: 12px;
          left: 12px;
          background: rgba(11, 45, 87, 0.9);
          color: #ffffff;
          padding: 5px 12px;
          border-radius: 30px;
          font-size: 11px;
          font-weight: 700;
          z-index: 2;
          letter-spacing: 0.3px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.15);
          backdrop-filter: blur(4px);
        }
        .card-body {
          padding: 16px 18px 18px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .card-nama {
          font-size: 16px;
          font-weight: 700;
          color: #0b2d57;
          margin: 0;
          line-height: 1.35;
        }
        .card-unit {
          font-size: 12.5px;
          color: #94a3b8;
          margin: 0 0 10px;
          line-height: 1.5;
        }
        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
          padding-top: 4px;
        }
        .card-harga {
          font-weight: 800;
          color: #0b2d57;
          font-size: 1.05rem;
        }
        .btn-beli {
          background: #0b2d57;
          color: #ffffff;
          border: none;
          padding: 9px 20px;
          border-radius: 999px;
          font-weight: 700;
          font-size: 12.5px;
          cursor: pointer;
          transition: background 0.25s ease, box-shadow 0.25s ease;
          letter-spacing: 0.2px;
          box-shadow: 0 2px 6px rgba(11,45,87,0.15);
        }
        .btn-beli:hover {
          background: #123a6e;
        }
        .btn-beli:active {
          background: #082448;
        }
        @media (max-width: 640px) {
          .grid-karya {
            grid-template-columns: repeat(2, 1fr);
            gap: 14px;
          }
          .card-karya {
            border-radius: 16px;
          }
          .card-img-wrap {
            height: 140px;
            width: calc(100% - 20px);
            margin: 10px 10px 0 10px;
            border-radius: 12px;
          }
          .badge-kategori {
            top: 8px;
            left: 8px;
            padding: 4px 9px;
            font-size: 9.5px;
          }
          .card-nama {
            font-size: 13px;
          }
          .card-harga {
            font-size: 13px;
          }
          .card-unit {
            font-size: 10px;
          }
          .btn-beli {
            padding: 6px 12px !important;
            font-size: 12px !important;
          }
        }
      `}</style>

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '40px', paddingTops: '10px' }}
        >
          <h1 style={{ 
            color: '#093b77', 
            fontSize: '28px', 
            fontWeight: 'bold', 
            marginBottom: '7px',
            fontFamily: "Roboto, Arial, sans-serif"
          }}>
            Hasil Karya Warga Binaan
          </h1>
          <p style={{ color: '#64748b', margin: '0' }}>Mendukung kreativitas dan kemandirian Rutan Sinjai</p>
          <div style={{ width: '50px', height: '4px', background: '#ddb309', margin: '15px auto 0', borderRadius: '2px' }}></div>
        </motion.div>

        {!loading && (
          <motion.div 
            className="grid-karya"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {daftarKarya.map((item) => (
              <motion.div 
                key={item.id} 
                variants={itemVariants}
                className="card-karya"
              >
                <div className="card-img-wrap">
                  {item.kategori && (
                    <span className="badge-kategori">{item.kategori}</span>
                  )}
                  <img 
                    src={item.img || 'https://via.placeholder.com/300'} 
                    alt={item.nama} 
                  />
                </div>
                
                <div className="card-body">
                  <h3 className="card-nama">
                    {item.nama}
                  </h3>
                  <p className="card-unit">
                    {item.unit || 'Unit Produksi Rutan Sinjai'}
                  </p>
                  
                  <div className="card-footer">
                    <span className="card-harga">
                      {item.harga.includes('Rp') ? item.harga : `Rp ${item.harga}`}
                    </span>
                    <motion.button 
                      className="btn-beli"
                      onClick={() => window.open(`https://wa.me/6285167687099?text=Halo, saya ingin memesan: ${item.nama}`, '_blank')}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
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