"use client";
import React, { useState, useEffect } from 'react';

export default function WBPMenu({ wbpForm, setWbpForm, handleSimpanWBP, daftarWBP, handleDelete, handleUpdate }: any) {
  const [isHover, setIsHover] = useState(false);
  const [viewFilter, setViewFilter] = useState('Narapidana');
  const [editId, setEditId] = useState<number | null>(null);
  const [tempData, setTempData] = useState<any>({});

  useEffect(() => {
    if (wbpForm.status_wbp) {
      setViewFilter(wbpForm.status_wbp);
    }
  }, [wbpForm.status_wbp]);

  const filteredData = daftarWBP.filter((item: any) => {
    if (viewFilter === 'Narapidana') return !item.status_wbp || item.status_wbp === 'Narapidana';
    return item.status_wbp === 'Tahanan';
  });

  const startEdit = (item: any) => {
    setEditId(item.id);
    setTempData({ ...item });
  };

  const saveEdit = async () => {
    await handleUpdate(tempData);
    setEditId(null);
  };

  return (
    <div style={containerStyle}>
      <div style={{ marginBottom: '30px' }}>
        <h3 style={headerTitleStyle}>👥 Manajemen Data WBP</h3>
        <p style={headerSubStyle}>Sistem administrasi data narapidana dan tahanan.</p>
      </div>

      <div style={formContainerStyle}>
        <div style={{ gridColumn: 'span 2' }}>
          <label style={labelStyle}>Kategori WBP</label>
          <select 
            style={selectStyle}
            value={wbpForm.status_wbp || 'Narapidana'} 
            onChange={(e) => setWbpForm({...wbpForm, status_wbp: e.target.value})}
          >
            <option value="Narapidana">Narapidana</option>
            <option value="Tahanan">Tahanan</option>
          </select>
        </div>

        <FormInput label="Nama Lengkap" placeholder="Nama WBP" value={wbpForm.nama} onChange={(e: any) => setWbpForm({...wbpForm, nama: e.target.value})} />
        <FormInput label="No. REG" placeholder="Contoh: AIV.38/2025" value={wbpForm.nik} onChange={(e: any) => setWbpForm({...wbpForm, nik: e.target.value})} />
        <FormInput label="Perkara" placeholder="Contoh: UU No. 35 Tahun 2009" value={wbpForm.kasus} onChange={(e: any) => setWbpForm({...wbpForm, kasus: e.target.value})} />
        <FormInput label="Putusan" placeholder="... THN ... BLN ... HR" value={wbpForm.lama_pidana} onChange={(e: any) => setWbpForm({...wbpForm, lama_pidana: e.target.value})} />
        <FormInput label="Ekspirasi" type="date" value={wbpForm.ekspirasi} onChange={(e: any) => setWbpForm({...wbpForm, ekspirasi: e.target.value})} />
        
        <button 
          onClick={handleSimpanWBP} 
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          style={{ ...submitButtonStyle, backgroundColor: isHover ? '#0d4a85' : '#093661' }}
        >
          Simpan Data {wbpForm.status_wbp || 'Narapidana'}
        </button>
      </div>

      <div style={dividerStyle} />

      <div style={tableHeaderActionStyle}>
        <h4 style={tableTitleStyle}>Daftar Terdaftar: <span style={{color: '#093661'}}>{viewFilter}</span></h4>
        <select style={filterSelectStyle} value={viewFilter} onChange={(e) => setViewFilter(e.target.value)}>
          <option value="Narapidana">Filter: Narapidana</option>
          <option value="Tahanan">Filter: Tahanan</option>
        </select>
      </div>

      <div style={tableWrapperStyle}>
        <table style={tableStyle}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC' }}>
              <th style={thStyle}>Biodata</th>
              <th style={thStyle}>Perkara</th>
              <th style={thStyle}>Putusan</th>
              <th style={thStyle}>Ekspirasi</th>
              <th style={{ ...thStyle, textAlign: 'center' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item: any) => (
              <tr key={item.id} style={trStyle}>
                <td style={tdStyle}>
                  {editId === item.id ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <input style={editInputStyle} value={tempData.nama} onChange={(e) => setTempData({...tempData, nama: e.target.value})} />
                        <input style={editInputStyle} value={tempData.nik} onChange={(e) => setTempData({...tempData, nik: e.target.value})} />
                    </div>
                  ) : (
                    <div>
                      <div style={{ fontWeight: '700', color: '#2D3748' }}>{item.nama}</div>
                      <div style={{ fontSize: '11px', color: '#093661', fontWeight: 'bold' }}>{item.nik}</div>
                    </div>
                  )}
                </td>
                <td style={tdStyle}>
                  {editId === item.id ? (
                    <input style={editInputStyle} value={tempData.kasus} onChange={(e) => setTempData({...tempData, kasus: e.target.value})} />
                  ) : (
                    <div style={{ fontSize: '13px' }}>{item.kasus}</div>
                  )}
                </td>
                <td style={tdStyle}>
                  {editId === item.id ? (
                    <input style={editInputStyle} value={tempData.lama_pidana} onChange={(e) => setTempData({...tempData, lama_pidana: e.target.value})} />
                  ) : (
                    <div style={{ fontSize: '13px', fontWeight: '500' }}>{item.lama_pidana}</div>
                  )}
                </td>
                <td style={tdStyle}>
                  {editId === item.id ? (
                    <input type="date" style={editInputStyle} value={tempData.ekspirasi} onChange={(e) => setTempData({...tempData, ekspirasi: e.target.value})} />
                  ) : (
                    <span style={badgeStyle}>{item.ekspirasi || '-'}</span>
                  )}
                </td>
                <td style={{ ...tdStyle, textAlign: 'center' }}>
                  {editId === item.id ? (
                    <button onClick={saveEdit} style={btnSaveInline}>Simpan</button>
                  ) : (
                    <button onClick={() => startEdit(item)} style={btnEditInline}>Edit</button>
                  )}
                  <button onClick={() => handleDelete(item.id, 'daftar_wbp')} style={btnDeleteInline}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FormInput({ label, ...props }: any) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <label style={labelStyle}>{label}</label>
      <input style={inputStyle} {...props} />
    </div>
  );
}

const containerStyle = { padding: '30px', backgroundColor: '#FFFFFF', borderRadius: '20px' };
const headerTitleStyle = { color: '#093661', fontSize: '22px', fontWeight: '800', margin: '0 0 5px 0' };
const headerSubStyle = { color: '#718096', fontSize: '14px', margin: 0 };
const formContainerStyle = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', padding: '25px', backgroundColor: '#F8FAFC', borderRadius: '15px', marginTop: '20px' };
const labelStyle = { display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '700', color: '#4A5568' };
const inputStyle = { padding: '12px 15px', borderRadius: '10px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none' };
const selectStyle = { ...inputStyle, width: '100%', cursor: 'pointer' };
const submitButtonStyle: any = { gridColumn: 'span 2', padding: '14px', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', fontSize: '15px', transition: '0.3s', marginTop: '10px' };
const dividerStyle = { height: '1px', backgroundColor: '#EDF2F7', margin: '40px 0' };
const tableHeaderActionStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' };
const tableTitleStyle = { fontSize: '17px', fontWeight: '700', color: '#4A5568', margin: 0 };
const filterSelectStyle = { padding: '8px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '13px' };
const tableWrapperStyle = { border: '1px solid #E2E8F0', borderRadius: '12px', overflow: 'hidden' };
const tableStyle = { width: '100%', borderCollapse: 'collapse' as 'collapse' };
const thStyle = { padding: '15px 20px', textAlign: 'left' as 'left', fontSize: '12px', fontWeight: '700', color: '#718096', textTransform: 'uppercase' as 'uppercase' };
const tdStyle = { padding: '16px 20px', fontSize: '14px' };
const trStyle = { borderBottom: '1px solid #F1F5F9' };
const editInputStyle = { width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #4680FF' };
const badgeStyle = { padding: '4px 8px', borderRadius: '6px', backgroundColor: '#FFF5F5', color: '#C53030', fontSize: '12px', fontWeight: '700' };
const btnEditInline = { color: '#3182CE', border: 'none', background: 'none', cursor: 'pointer', fontWeight: '600', marginRight: '15px' };
const btnSaveInline = { color: '#38A169', border: 'none', background: 'none', cursor: 'pointer', fontWeight: '700', marginRight: '15px' };
const btnDeleteInline = { color: '#E53E3E', border: 'none', background: 'none', cursor: 'pointer', fontWeight: '600' };