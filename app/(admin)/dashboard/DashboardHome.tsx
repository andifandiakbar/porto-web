import React from 'react';

export default function DashboardHome({ setActiveMenu, daftarWBP, daftarPengaduan, daftarBerita }: any) {
  return (
    <div style={{ padding: '40px' }}>
      <div style={{ marginBottom: '35px' }}>
        <h3 style={{ color: '#093661', fontSize: '22px', fontWeight: '700', marginBottom: '8px' }}>Selamat Datang Kembali Admin! 👋</h3>
        <p style={{ color: '#718096', fontSize: '14px' }}>Pantau dan kelola data operasional Rutan Sinjai dalam satu panel.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '25px', marginBottom: '45px' }}>
        <QuickActionCard icon="👥" label="Data WBP" sub="Input Narapidana" onClick={() => setActiveMenu('wbp')} color="#4680FF" />
        <QuickActionCard icon="📰" label="Update Berita" sub="Posting info terbaru" onClick={() => setActiveMenu('berita')} color="#2ECC71" />
        <QuickActionCard icon="📩" label="Pengaduan" sub="Cek laporan masuk" onClick={() => setActiveMenu('pengaduan')} color="#FFB811" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '30px' }}>
        <div style={{ backgroundColor: '#F8FAFC', padding: '25px', borderRadius: '18px', border: '1px solid #E2E8F0' }}>
          <h4 style={{ fontSize: '16px', color: '#093661', marginBottom: '20px', fontWeight: 'bold' }}>Aktivitas Terakhir</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {daftarWBP.length > 0 && <ActivityItem label={`Input WBP: ${daftarWBP[0].nama}`} time="Baru saja" status="Selesai" />}
            {daftarPengaduan.length > 0 && <ActivityItem label={`Aduan Baru: ${daftarPengaduan[0].pelapor}`} time="Baru saja" status={daftarPengaduan[0].status || "Pending"} />}
            {daftarBerita.length > 0 && <ActivityItem label={`Update Berita: ${daftarBerita[0].judul}`} time="Baru saja" status="Selesai" />}
          </div>
        </div>

        <div style={{ backgroundColor: '#093661', padding: '25px', borderRadius: '18px', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h4 style={{ fontSize: '16px', marginBottom: '15px', fontWeight: '600' }}>Status Sistem Cloud</h4>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#2ECC71' }}></div>
            <span style={{ fontSize: '14px', fontWeight: '500' }}>Database Supabase: Online</span>
          </div>
          <p style={{ fontSize: '13px', opacity: 0.7, lineHeight: '1.6' }}>Server berjalan optimal. Semua data terenkripsi dan aman di cloud server.</p>
        </div>
      </div>
    </div>
  );
}

function QuickActionCard({ icon, label, sub, onClick, color }: any) {
  return (
    <div onClick={onClick} style={{ padding: '15px 20px', backgroundColor: 'white', borderRadius: '14px', border: '1px solid #EBEBEB', cursor: 'pointer', transition: '0.3s', display: 'flex', gap: '15px', alignItems: 'center', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.01)' }}>
      <div style={{ fontSize: '22px', width: '45px', height: '45px', backgroundColor: `${color}10`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: color }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: '700', fontSize: '14px', color: '#2D3748' }}>{label}</div>
        <div style={{ fontSize: '12px', color: '#A0AEC0' }}>{sub}</div>
      </div>
    </div>
  );
}

function ActivityItem({ label, time, status }: any) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 15px', backgroundColor: 'white', borderRadius: '12px', border: '1px solid #EDF2F7' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: status === 'Selesai' ? '#2ECC71' : '#FFB811' }}></div>
        <div>
          <div style={{ fontSize: '13px', fontWeight: '600', color: '#4A5568' }}>{label}</div>
          <div style={{ fontSize: '11px', color: '#CBD5E0' }}>{time}</div>
        </div>
      </div>
      <span style={{ fontSize: '10px', padding: '4px 10px', borderRadius: '20px', backgroundColor: status === 'Selesai' ? '#E6FFFA' : '#FFFBEB', color: status === 'Selesai' ? '#234E52' : '#975A16', fontWeight: '800', border: `1px solid ${status === 'Selesai' ? '#B2F5EA' : '#FEEBC8'}` }}>{status}</span>
    </div>
  );
}