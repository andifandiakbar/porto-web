"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';

export default function RunningTextMenu() {
  const [runningText, setRunningText] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRunningText();
  }, []);

  const fetchRunningText = async () => {
    const { data, error } = await supabase
      .from('running_text')
      .select('*')
      .single();
    if (data) setRunningText(data.content);
  };

  const handleUpdate = async () => {
    setLoading(true);
    const { error } = await supabase
      .from('running_text')
      .update({ content: runningText })
      .eq('id', 1);

    if (!error) {
      alert("Running Text diperbarui!");
    } else {
      alert("Gagal memperbarui: " + error.message);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '30px' }}>
      <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#093661', marginBottom: '20px' }}>
        Pengaturan Running Text
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <label style={{ fontSize: '14px', color: '#666' }}>Isi Pesan Running Text:</label>
        <textarea
          value={runningText}
          onChange={(e) => setRunningText(e.target.value)}
          style={{
            width: '100%',
            height: '100px',
            padding: '15px',
            borderRadius: '12px',
            border: '1px solid #EBEBEB',
            fontSize: '14px',
            outline: 'none'
          }}
          placeholder="Masukkan teks yang akan berjalan di landing page..."
        />
        <button
          onClick={handleUpdate}
          disabled={loading}
          style={{
            width: 'fit-content',
            padding: '12px 25px',
            backgroundColor: '#093661',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: '600',
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
        </button>
      </div>
    </div>
  );
}