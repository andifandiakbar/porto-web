"use client";
import React, { useState, useEffect } from 'react';

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
        console.error("Gagal mengunggah foto baru:", error);
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

  return (
    <div style={{ ...containerStyle, padding: isMobile ? '20px' : '40px', maxWidth: '100%', overflowX: 'hidden' }}>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      <style>{`
        .btn-react:active {
          filter: brightness(0.8);
          opacity: 0.9;
        }
      `}</style>
      
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
        <FormInput label="No. REG" placeholder="Contoh: AIV.38/2025" value={wbpForm.nik} onChange={(e: any) => setWbpForm({...wbpForm, nik: e.target.value})} />
        <FormInput label="Perkara / Pasal" placeholder="Contoh: UU No. 35 Tahun 2009" value={wbpForm.kasus} onChange={(e: any) => setWbpForm({...wbpForm, kasus: e.target.value})} />
        <FormInput label="Putusan Pidana" placeholder="... THN ... BLN ... HR" value={wbpForm.lama_pidana} onChange={(e: any) => setWbpForm({...wbpForm, lama_pidana: e.target.value})} />
        <FormInput label="Tanggal Ekspirasi" type="date" value={wbpForm.ekspirasi} onChange={(e: any) => setWbpForm({...wbpForm, ekspirasi: e.target.value})} />
        
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={labelStyle}>Foto WBP</label>
          <input type="file" accept="image/*" onChange={(e) => handleFileChange(e)} style={inputStyle} />
          {wbpForm.foto && (
            <div style={{ position: 'relative', width: '60px', marginTop: '10px' }}>
              <img 
                src={wbpForm.foto instanceof File ? URL.createObjectURL(wbpForm.foto) : wbpForm.foto} 
                alt="Preview" 
                onClick={() => {
                  if (typeof setSelectedImage === 'function') {
                    setSelectedImage(wbpForm.foto instanceof File ? URL.createObjectURL(wbpForm.foto) : wbpForm.foto);
                  }
                }}
                style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px', cursor: 'zoom-in' }} 
              />
              <button className="btn-react" onClick={() => setWbpForm({...wbpForm, foto: null})} style={{ position: 'absolute', top: '-5px', right: '-5px', backgroundColor: '#E53E3E', color: 'white', border: 'none', borderRadius: '50%', width: '20px', height: '20px', cursor: 'pointer', fontSize: '10px' }}>×</button>
            </div>
          )}
        </div>

        <button 
          className="btn-react"
          onClick={handleSimpanWBP} 
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          style={{ 
            ...submitButtonStyle, 
            gridColumn: isMobile ? 'span 1' : 'span 2',
            backgroundColor: isHover ? '#0d4a85' : '#093661'
          }}
        >
          Simpan Data {wbpForm.status_wbp || 'Narapidana'}
        </button>
      </div>

      <div style={dividerStyle} />

      <div style={{ ...tableHeaderActionStyle, flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center', gap: isMobile ? '15px' : '20px' }}>
        <h4 style={{ ...tableTitleStyle, flexShrink: 0 }}>
          Daftar Aktif : <span style={{color: '#093661', marginLeft: '5px'}}>{viewFilter}</span>
        </h4>
        
        <div style={{ display: 'flex', gap: '15px', width: isMobile ? '100%' : 'auto', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: isMobile ? 1 : 'none' }}>
            <i className="fa fa-search" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#A0AEC0', fontSize: '13px' }}></i>
            <input 
              type="text" 
              placeholder="Cari Nama atau No. REG..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ ...searchInputStyle, width: isMobile ? '100%' : '250px' }}
            />
          </div>

          <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
            <span style={{fontSize: '12px', fontWeight: '700', color: '#718096'}}>TAMPILKAN:</span>
            <select style={filterSelectStyle} value={viewFilter} onChange={(e) => setViewFilter(e.target.value)}>
              <option value="Narapidana">Narapidana</option>
              <option value="Tahanan">Tahanan</option>
            </select>
          </div>
        </div>
      </div>

      <div style={{ ...tableWrapperStyle, border: isMobile ? 'none' : '1px solid #E2E8F0', width: '100%' }}>
        {isMobile ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {filteredData.length > 0 ? (
              filteredData.map((item: any) => (
                <div key={item.id} style={{ backgroundColor: '#F8FAFC', padding: '20px', borderRadius: '15px', border: '1px solid #E2E8F0' }}>
                  <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                    <div 
                      style={{ width: '60px', height: '75px', backgroundColor: '#E2E8F0', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, cursor: (editId === item.id ? tempData.foto_url : item.foto_url) ? 'zoom-in' : 'default' }} 
                      onClick={() => {
                        const currentFoto = editId === item.id ? tempData.foto_url : item.foto_url;
                        if (currentFoto && typeof setSelectedImage === 'function') {
                          setSelectedImage(currentFoto);
                        }
                      }}
                    >
                      {(editId === item.id ? tempData.foto_url : item.foto_url) ? (
                        <img src={editId === item.id ? tempData.foto_url : item.foto_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                          <i className="fa fa-user" style={{ color: '#A0AEC0' }}></i>
                        </div>
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '11px', color: '#718096', fontWeight: 'bold' }}>BIODATA & NO. REG</div>
                      {editId === item.id ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                          <input style={editInputStyle} value={tempData.nama} onChange={(e) => setTempData({...tempData, nama: e.target.value})} />
                          <input style={editInputStyle} value={tempData.nik} onChange={(e) => setTempData({...tempData, nik: e.target.value})} />
                          <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, true)} style={{ ...editInputStyle, padding: '4px' }} />
                          <button className="btn-react" onClick={() => setTempData({...tempData, foto: null, foto_url: ""})} style={{ fontSize: '10px', color: '#E53E3E', background: 'none', border: 'none', cursor: 'pointer', padding: '0', textAlign: 'left' }}>
                            <i className="fa fa-trash-can"></i> Hapus Foto
                          </button>
                        </div>
                      ) : (
                        <div style={{ marginTop: '5px' }}>
                          <div style={{ fontWeight: '800', color: '#2D3748', fontSize: '15px' }}>{item.nama}</div>
                          <div style={{ fontSize: '12px', color: '#093661', fontWeight: '800' }}>{item.nik}</div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    <div style={{ fontSize: '11px', color: '#718096', fontWeight: 'bold' }}>KASUS</div>
                    {editId === item.id ? (
                      <input style={{...editInputStyle, marginTop: '5px'}} value={tempData.kasus} onChange={(e) => setTempData({...tempData, kasus: e.target.value})} />
                    ) : (
                      <div style={{ fontSize: '13px', color: '#4A5568', marginTop: '3px' }}>{item.kasus}</div>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
                    <div>
                      <div style={{ fontSize: '11px', color: '#718096', fontWeight: 'bold' }}>MASA PIDANA</div>
                      {editId === item.id ? (
                        <input style={{...editInputStyle, marginTop: '5px'}} value={tempData.lama_pidana} onChange={(e) => setTempData({...tempData, lama_pidana: e.target.value})} />
                      ) : (
                        <div style={{ fontSize: '13px', fontWeight: '700', color: '#2D3748' }}>{item.lama_pidana}</div>
                      )}
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', color: '#718096', fontWeight: 'bold' }}>EKSPIRASI</div>
                      {editId === item.id ? (
                        <input type="date" style={{...editInputStyle, marginTop: '5px'}} value={tempData.ekspirasi} onChange={(e) => setTempData({...tempData, ekspirasi: e.target.value})} />
                      ) : (
                        <div style={{ marginTop: '3px' }}><span style={badgeStyle}>{item.ekspirasi || '-'}</span></div>
                      )}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', paddingTop: '15px', borderTop: '1px solid #E2E8F0' }}>
                    {editId === item.id ? (
                      <>
                        <button className="btn-react" onClick={saveEdit} style={{...btnEditInline, flex: 1, justifyContent: 'center', color: '#38A169'}}>Simpan</button>
                        <button className="btn-react" onClick={cancelEdit} style={{...btnEditInline, flex: 1, justifyContent: 'center', color: '#2B6CB0', borderColor: '#BEE3F8'}}>Batal</button>
                      </>
                    ) : (
                      <button className="btn-react" onClick={() => startEdit(item)} style={{...btnEditInline, flex: 1, justifyContent: 'center'}}>Edit</button>
                    )}
                    <button className="btn-react" onClick={() => handleDelete(item.id, 'daftar_wbp')} style={{...btnDeleteInline, flex: 1, justifyContent: 'center'}}>Hapus</button>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '50px', color: '#A0AEC0', fontStyle: 'italic' }}>Data tidak ditemukan</div>
            )}
          </div>
        ) : (
          <table style={{...tableStyle, width: '100%', tableLayout: 'auto'}}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '2px solid #EDF2F7' }}>
                <th style={{ ...thStyle, width: '60px' }}>FOTO</th>
                <th style={{ ...thStyle, width: '25%' }}>BIODATA & NO. REG</th>
                <th style={{ ...thStyle, width: '25%' }}>KASUS / PERKARA</th>
                <th style={{ ...thStyle, width: '15%' }}>MASA PIDANA</th>
                <th style={{ ...thStyle, width: '15%' }}>EKSPIRASI</th>
                <th style={{ ...thStyle, textAlign: 'center', width: '15%' }}>NAVIGASI</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item: any) => (
                  <tr key={item.id} style={trStyle}>
                    <td style={tdStyle}>
                      <div 
                        style={{ width: '45px', height: '55px', backgroundColor: '#F1F5F9', borderRadius: '6px', overflow: 'hidden', border: '1px solid #E2E8F0', cursor: (editId === item.id ? tempData.foto_url : item.foto_url) ? 'zoom-in' : 'default' }} 
                        onClick={() => {
                          const currentFoto = editId === item.id ? tempData.foto_url : item.foto_url;
                          if (currentFoto && typeof setSelectedImage === 'function') {
                            setSelectedImage(currentFoto);
                          }
                        }}
                      >
                        {(editId === item.id ? tempData.foto_url : item.foto_url) ? (
                          <img src={editId === item.id ? tempData.foto_url : item.foto_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                            <i className="fa fa-user" style={{ color: '#CBD5E0' }}></i>
                          </div>
                        )}
                      </div>
                    </td>
                    <td style={tdStyle}>
                      {editId === item.id ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            <input style={{...editInputStyle, marginBottom: '4px'}} value={tempData.nama} onChange={(e) => setTempData({...tempData, nama: e.target.value})} placeholder="Nama" />
                            <input style={{...editInputStyle, marginBottom: '4px'}} value={tempData.nik} onChange={(e) => setTempData({...tempData, nik: e.target.value})} placeholder="No. Reg" />
                            <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, true)} style={{ fontSize: '10px', width: '100%' }} />
                            <button className="btn-react" onClick={() => setTempData({...tempData, foto: null, foto_url: ""})} style={{ fontSize: '10px', color: '#E53E3E', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', marginTop: '2px' }}>
                              <i className="fa fa-trash-can"></i> Hapus Foto
                            </button>
                        </div>
                      ) : (
                        <div>
                          <div style={{ fontWeight: '800', color: '#2D3748', fontSize: '14px' }}>{item.nama}</div>
                          <div style={{ fontSize: '11px', color: '#093661', fontWeight: '800', marginTop: '3px' }}>{item.nik}</div>
                        </div>
                      )}
                    </td>
                    <td style={tdStyle}>
                      {editId === item.id ? (
                        <input style={editInputStyle} value={tempData.kasus} onChange={(e) => setTempData({...tempData, kasus: e.target.value})} />
                      ) : (
                        <div style={{ fontSize: '13px', color: '#4A5568', fontWeight: '500' }}>{item.kasus}</div>
                      )}
                    </td>
                    <td style={tdStyle}>
                      {editId === item.id ? (
                        <input style={editInputStyle} value={tempData.lama_pidana} onChange={(e) => setTempData({...tempData, lama_pidana: e.target.value})} />
                      ) : (
                        <div style={{ fontSize: '13px', fontWeight: '700', color: '#2D3748' }}>{item.lama_pidana}</div>
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
                      <div style={{display: 'flex', justifyContent: 'center', gap: '5px', flexWrap: 'wrap'}}>
                        {editId === item.id ? (
                          <>
                            <button className="btn-react" onClick={saveEdit} style={{...btnEditInline, padding: '4px 8px', color: '#38A169', borderColor: '#C6F6D5'}}>Simpan</button>
                            <button className="btn-react" onClick={cancelEdit} style={{...btnEditInline, padding: '4px 8px', color: '#2B6CB0', borderColor: '#BEE3F8'}}>Batal</button>
                          </>
                        ) : (
                          <button className="btn-react" onClick={() => startEdit(item)} style={btnEditInline}>Edit</button>
                        )}
                        <button className="btn-react" onClick={() => handleDelete(item.id, 'daftar_wbp')} style={btnDeleteInline}>Hapus</button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '100px 20px', color: '#A0AEC0', fontSize: '14px', fontStyle: 'italic' }}>
                    Data tidak ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
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

const containerStyle = { backgroundColor: '#FFFFFF', borderRadius: '20px', fontFamily: "'Inter', sans-serif" };
const headerTitleStyle = { color: '#093661', fontSize: '24px', fontWeight: '800', margin: '0 0 5px 0' };
const headerSubStyle = { color: '#718096', fontSize: '14px', margin: 0 };
const formContainerStyle = { display: 'grid', gap: '20px', padding: '30px', backgroundColor: '#F8FAFC', borderRadius: '18px', marginTop: '20px', border: '1px solid #E2E8F0' };
const labelStyle = { display: 'block', marginBottom: '10px', fontSize: '13px', fontWeight: '700', color: '#2D3748' };
const inputStyle = { padding: '12px 16px', borderRadius: '10px', border: '2px solid #E2E8F0', fontSize: '14px', outline: 'none', transition: '0.3s', backgroundColor: 'white' };
const selectStyle = { ...inputStyle, width: '100%', cursor: 'pointer', fontWeight: '600', color: '#093661' };
const searchInputStyle = { padding: '10px 15px 10px 35px', borderRadius: '10px', border: '2px solid #E2E8F0', fontSize: '13px', outline: 'none', transition: '0.3s' };
const submitButtonStyle: any = { padding: '16px', color: 'white', border: 'none', borderRadius: '12px', fontWeight: '800', cursor: 'pointer', fontSize: '15px', transition: '0.3s', marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' };
const dividerStyle = { height: '1px', backgroundColor: '#EDF2F7', margin: '45px 0' };
const tableHeaderActionStyle = { display: 'flex', justifyContent: 'space-between', marginBottom: '25px' };
const tableTitleStyle = { fontSize: '18px', fontWeight: '800', color: '#2D3748', margin: 0, display: 'flex', alignItems: 'center' };
const filterSelectStyle = { padding: '10px 15px', borderRadius: '10px', border: '2px solid #093661', fontSize: '13px', fontWeight: '700', color: '#093661', outline: 'none', cursor: 'pointer' };
const tableWrapperStyle = { overflowX: 'auto' as 'auto' };
const tableStyle = { borderCollapse: 'collapse' as 'collapse' };
const thStyle = { padding: '18px 15px', textAlign: 'left' as 'left', fontSize: '11px', fontWeight: '800', color: '#718096', textTransform: 'uppercase' as 'uppercase', letterSpacing: '1px' };
const tdStyle = { padding: '15px', fontSize: '14px', verticalAlign: 'top' as 'top', overflow: 'visible', whiteSpace: 'normal' as 'normal', wordBreak: 'break-word' as 'break-word' };
const trStyle = { borderBottom: '1px solid #F1F5F9', transition: '0.2s' };
const editInputStyle = { width: '100%', padding: '6px 10px', borderRadius: '6px', border: '2px solid #093661', outline: 'none', fontSize: '12px' };
const badgeStyle = { padding: '6px 12px', borderRadius: '8px', backgroundColor: '#FFF5F5', color: '#E53E3E', fontSize: '12px', fontWeight: '800', display: 'inline-flex', alignItems: 'center' };
const btnEditInline = { color: '#093661', border: '1px solid #E2E8F0', background: 'white', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '5px' };
const btnDeleteInline = { color: '#E53E3E', border: '1px solid #FED7D7', background: '#FFF5F5', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '5px' };