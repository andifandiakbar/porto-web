"use client";

import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

export default function WBPMenu({ wbpForm, setWbpForm, handleSimpanWBP, daftarWBP, handleDelete, handleUpdate, setSelectedImage }: any) {
  const [isHover, setIsHover] = useState(false);
  const [viewFilter, setViewFilter] = useState('Narapidana');
  const [editId, setEditId] = useState<number | null>(null);
  const [tempData, setTempData] = useState<any>({});
  const [isMobile, setIsMobile] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (wbpForm.status_wbp) {
      setViewFilter(wbpForm.status_wbp);
    }
  }, [wbpForm.status_wbp]);

  const filteredData = daftarWBP.filter((item: any) => {
    const matchesFilter = viewFilter === 'Narapidana' 
      ? (!item.status_wbp || item.status_wbp === 'Narapidana')
      : item.status_wbp === 'Tahanan';
    
    const namaWBP = item.nama || "";
    const nikWBP = item.nik || "";
    
    const matchesSearch = namaWBP.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          nikWBP.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const downloadExcel = () => {
    const formattedData = filteredData.map(item => ({
      "Nama Lengkap": item.nama,
      "Kategori": item.status_wbp || "Narapidana",
      "Jenis Kelamin": item.jenis_kelamin,
      "2/3 Masa Pidana": item.nik,
      "Perkara": item.kasus,
      "Tanggal Bebas": item.ekspirasi
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data WBP");
    XLSX.writeFile(workbook, `Data_WBP_${viewFilter}.xlsx`);
  };

  const startEdit = (item: any) => {
    setEditId(item.id);
    setTempData({ ...item });
  };

  const cancelEdit = () => {
    setEditId(null);
    setTempData({});
  };

  const saveEdit = async () => {
    let dataToUpdate = { ...tempData };
    
    if (tempData.foto instanceof File) {
      try {
        const formData = new FormData();
        formData.append('file', tempData.foto);
        
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const uploadRes = await res.json();
          if (uploadRes.url) {
            dataToUpdate.foto_url = uploadRes.url;
          }
        }
      } catch (error) {
        console.error(error);
      }
    }

    delete dataToUpdate.foto;
    await handleUpdate(dataToUpdate);
    setEditId(null);
    setTempData({});
  };

  const handleFileChange = (e: any, isEdit = false) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      if (isEdit) {
        setTempData({ ...tempData, foto: file, foto_url: URL.createObjectURL(file) });
      } else {
        setWbpForm({ ...wbpForm, foto: file });
      }
    }
  };

  const toTitleCase = (str: string) => {
    return str?.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div style={{ ...containerStyle, padding: isMobile ? '20px' : '40px' }}>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      
      <div style={{ marginBottom: '35px' }}>
        <h3 style={headerTitleStyle}>Manajemen Data WBP</h3>
        <p style={headerSubStyle}>Sistem administrasi data narapidana dan tahanan Rutan Sinjai.</p>
      </div>

      <div style={{ ...formContainerStyle, gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr' }}>
        <div style={{ gridColumn: isMobile ? 'span 1' : 'span 2' }}>
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

        <FormInput label="Nama Lengkap" placeholder="Nama Lengkap WBP" value={wbpForm.nama} onChange={(e: any) => setWbpForm({...wbpForm, nama: e.target.value})} />
        
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={labelStyle}>Jenis Kelamin</label>
          <select 
            style={selectStyle}
            value={wbpForm.jenis_kelamin || ''} 
            onChange={(e) => setWbpForm({...wbpForm, jenis_kelamin: e.target.value})}
          >
            <option value="">Pilih Jenis Kelamin</option>
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
        </div>

        <FormInput label="2/3 Masa Pidana" placeholder="Contoh: BI.05/2026" value={wbpForm.nik} onChange={(e: any) => setWbpForm({...wbpForm, nik: e.target.value})} />
        <FormInput label="Perkara" placeholder="Contoh: Maling" value={wbpForm.kasus} onChange={(e: any) => setWbpForm({...wbpForm, kasus: e.target.value})} />
        <FormInput label="Tanggal Bebas" type="date" value={wbpForm.ekspirasi} onChange={(e: any) => setWbpForm({...wbpForm, ekspirasi: e.target.value})} />
        
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={labelStyle}>Foto WBP</label>
          <input type="file" accept="image/*" onChange={(e) => handleFileChange(e)} style={inputStyle} />
          {wbpForm.foto && (
            <div style={{ position: 'relative', width: '60px', marginTop: '10px' }}>
              <img 
                src={wbpForm.foto instanceof File ? URL.createObjectURL(wbpForm.foto) : wbpForm.foto} 
                alt="Preview" 
                onClick={() => setSelectedImage?.(wbpForm.foto instanceof File ? URL.createObjectURL(wbpForm.foto) : wbpForm.foto)}
                style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px', cursor: 'zoom-in', border: '1px solid #E2E8F0' }} 
              />
              <button onClick={() => setWbpForm({...wbpForm, foto: null})} style={removeFotoBadgeStyle}>×</button>
            </div>
          )}
        </div>

        <button 
          onClick={handleSimpanWBP} 
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          style={{ 
            ...submitButtonStyle, 
            gridColumn: isMobile ? 'span 1' : 'span 2',
            backgroundColor: isHover ? '#072e5c' : '#093b77'
          }}
        >
          Simpan Data {wbpForm.status_wbp || 'Narapidana'}
        </button>
      </div>

      <div style={dividerStyle} />

      <div style={{ ...tableHeaderActionStyle, flexDirection: isMobile ? 'column' : 'row' }}>
        <h4 style={tableTitleStyle}>
          Daftar Aktif : <span style={{color: '#093b77', marginLeft: '5px'}}>{viewFilter}</span>
        </h4>
        
        <div style={{ display: 'flex', gap: '10px', width: isMobile ? '100%' : 'auto', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <i className="fa fa-search" style={searchIconStyle}></i>
            <input 
              type="text" 
              placeholder="Cari..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ ...searchInputStyle, width: isMobile ? '100%' : '200px' }}
            />
          </div>

          <select style={filterSelectStyle} value={viewFilter} onChange={(e) => setViewFilter(e.target.value)}>
            <option value="Narapidana">Narapidana</option>
            <option value="Tahanan">Tahanan</option>
          </select>

          <button 
            onClick={downloadExcel}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#072a4d'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#093b77'}
            style={{ padding: '10px 15px', backgroundColor: '#093b77', color: 'white', border: 'none', borderRadius: '10px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', transition: '0.3s' }}
          >
            Excel
          </button>
        </div>
      </div>

      <div style={tableWrapperStyle}>
        <table style={{...tableStyle, width: '100%'}}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '2px solid #EDF2F7' }}>
              <th style={thStyle}>Foto</th>
              <th style={thStyle}>Nama Lengkap</th>
              <th style={thStyle}>Jenis Kelamin</th>
              <th style={thStyle}>2/3 Masa Pidana</th>
              <th style={thStyle}>Perkara</th>
              <th style={thStyle}>Tanggal Bebas</th>
              <th style={{ ...thStyle, textAlign: 'center' }}>Navigasi</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item: any) => (
              <tr key={item.id} style={trStyle}>
                <td style={tdStyle}>
                  <div style={avatarWrapperStyle} onClick={() => setSelectedImage?.(editId === item.id ? tempData.foto_url : item.foto_url)}>
                    {(editId === item.id ? tempData.foto_url : item.foto_url) ? (
                      <img src={editId === item.id ? tempData.foto_url : item.foto_url} style={avatarImgStyle} />
                    ) : (
                      <i className="fa fa-user" style={{ color: '#CBD5E0' }}></i>
                    )}
                  </div>
                </td>
                <td style={tdStyle}>
                  {editId === item.id ? (
                    <input style={editInputStyle} value={tempData.nama} onChange={(e) => setTempData({...tempData, nama: e.target.value})} />
                  ) : (
                    <div style={{ fontWeight: 'normal', fontSize: '14px', color: '#093b77' }}>{toTitleCase(item.nama || '')}</div>
                  )}
                </td>
                <td style={tdStyle}>
                  {editId === item.id ? (
                    <select style={editInputStyle} value={tempData.jenis_kelamin || ''} onChange={(e) => setTempData({...tempData, jenis_kelamin: e.target.value})}>
                      <option value="">-</option>
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                  ) : (
                    <div style={{ fontSize: '14px', color: '#475569' }}>{toTitleCase(item.jenis_kelamin || '-')}</div>
                  )}
                </td>
                <td style={tdStyle}>
                  {editId === item.id ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <input style={editInputStyle} value={tempData.nik} onChange={(e) => setTempData({...tempData, nik: e.target.value})} />
                      <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, true)} style={{ fontSize: '11px' }} />
                    </div>
                  ) : (
                    <div style={{ fontSize: '14px', color: '#093b77', fontWeight: 'normal' }}>{item.nik}</div>
                  )}
                </td>
                <td style={tdStyle}>
                  {editId === item.id ? (
                    <input style={editInputStyle} value={tempData.kasus} onChange={(e) => setTempData({...tempData, kasus: e.target.value})} />
                  ) : (
                    <div style={{ fontSize: '14px', color: '#475569' }}>{toTitleCase(item.kasus || '-')}</div>
                  )}
                </td>
                <td style={tdStyle}>
                  {editId === item.id ? (
                    <input type="date" style={editInputStyle} value={tempData.ekspirasi} onChange={(e) => setTempData({...tempData, ekspirasi: e.target.value})} />
                  ) : (
                    <span style={{ fontSize: '14px', color: '#475569' }}>{item.ekspirasi || '-'}</span>
                  )}
                </td>
                <td style={{ ...tdStyle, textAlign: 'center' }}>
                  <div style={{display: 'flex', justifyContent: 'center', gap: '8px'}}>
                    {editId === item.id ? (
                      <>
                        <button onClick={saveEdit} 
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2f855a'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#38A169'}
                          style={{...btnEditInline, backgroundColor: '#38A169', color: 'white', border: 'none', transition: '0.3s'}}>Simpan</button>
                        <button onClick={cancelEdit} 
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#EDF2F7'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                          style={{...btnEditInline, backgroundColor: 'white', transition: '0.3s'}}>Batal</button>
                      </>
                    ) : (
                      <button onClick={() => startEdit(item)} 
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F7FAFC'; e.currentTarget.style.borderColor = '#093b77'; }}
                        onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#FFF'; e.currentTarget.style.borderColor = '#E2E8F0'; }}
                        style={viewBtnStyle}>Edit</button>
                    )}
                    <button onClick={() => handleDelete(item.id, 'daftar_wbp')} 
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FEB2B2'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFF5F5'}
                      style={btnDeleteInline}>Hapus</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FormInput({ label, value, ...props }: any) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <label style={labelStyle}>{label}</label>
      <input style={inputStyle} value={value ?? ""} {...props} />
    </div>
  );
}

const removeFotoBadgeStyle: any = { position: 'absolute', top: '-5px', right: '-5px', backgroundColor: '#E53E3E', color: 'white', border: 'none', borderRadius: '50%', width: '18px', height: '18px', cursor: 'pointer', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' };
const containerStyle = { backgroundColor: '#FFFFFF', borderRadius: '20px' };
const headerTitleStyle = { color: '#093b77', fontSize: '24px', fontWeight: '700', margin: '0 0 5px 0', letterSpacing: '-0.5px' };
const headerSubStyle = { color: '#64748b', fontSize: '14px', margin: 0, letterSpacing: '-0.2px' };
const formContainerStyle = { display: 'grid', gap: '20px', padding: '30px', backgroundColor: '#F8FAFC', borderRadius: '18px', marginTop: '20px', border: '1px solid #E2E8F0' };
const labelStyle = { display: 'block', marginBottom: '10px', fontSize: '13px', fontWeight: '700', color: '#093b77', letterSpacing: '-0.1px' };
const inputStyle = { padding: '12px 16px', borderRadius: '10px', border: '2px solid #E2E8F0', fontSize: '14px', outline: 'none', backgroundColor: 'white', color: '#475569' };
const selectStyle = { ...inputStyle, width: '100%', cursor: 'pointer', fontWeight: '700', color: '#093b77' };
const submitButtonStyle: any = { padding: '16px', color: 'white', border: 'none', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', fontSize: '15px', transition: '0.3s', marginTop: '10px' };
const dividerStyle = { height: '1px', backgroundColor: '#EDF2F7', margin: '45px 0' };
const tableHeaderActionStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', gap: '15px' };
const tableTitleStyle = { fontSize: '18px', fontWeight: '700', color: '#093b77', margin: 0, letterSpacing: '-0.3px' };
const searchInputStyle = { padding: '10px 15px 10px 35px', borderRadius: '10px', border: '2px solid #E2E8F0', fontSize: '13px', outline: 'none', color: '#475569' };
const searchIconStyle: any = { position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#A0AEC0', fontSize: '13px' };
const filterSelectStyle = { padding: '10px 15px', borderRadius: '10px', border: '2px solid #093b77', fontSize: '13px', fontWeight: '700', color: '#093b77', outline: 'none', cursor: 'pointer' };
const tableWrapperStyle = { overflowX: 'auto' as 'auto', border: '1px solid #E2E8F0', borderRadius: '12px' };
const tableStyle = { borderCollapse: 'collapse' as 'collapse' };
const thStyle = { padding: '18px 20px', textAlign: 'left' as 'left', fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'capitalize' as 'capitalize', borderBottom: '2px solid #EDF2F7' };
const tdStyle = { padding: '20px', fontSize: '14px', borderBottom: '1px solid #F1F5F9', verticalAlign: 'top' as 'top' };
const trStyle = { transition: '0.2s' };
const avatarWrapperStyle = { width: '45px', height: '55px', backgroundColor: '#F1F5F9', borderRadius: '6px', overflow: 'hidden', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-in' };
const avatarImgStyle = { width: '100%', height: '100%', objectFit: 'cover' as 'cover' };
const editInputStyle = { width: '100%', padding: '6px 10px', borderRadius: '8px', border: '2px solid #093b77', outline: 'none', fontSize: '13px', color: '#475569' };
const viewBtnStyle = { padding: '6px 12px', fontSize: '11px', borderRadius: '8px', border: '1px solid #E2E8F0', cursor: 'pointer', fontWeight: '700', color: '#093b77', background: 'white', transition: '0.2s' };
const btnEditInline = { border: '1px solid #E2E8F0', background: 'white', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '12px', color: '#093b77', transition: '0.2s' };
const btnDeleteInline = { border: '1px solid #FED7D7', background: '#FFF5F5', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '12px', color: '#E53E3E', transition: '0.2s' };