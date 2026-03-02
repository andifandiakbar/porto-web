"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';

export default function PejabatMenu({ setSelectedImage }: any) {
  const [isHover, setIsHover] = useState(false);
  const [pejabat, setPejabat] = useState<any[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [tempData, setTempData] = useState<any>({});
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hoverBtnId, setHoverBtnId] = useState<string | null>(null);
  
  const [form, setForm] = useState({
    nama: '',
    jabatan: '',
    foto: '',
    urutan: 0
  });

  useEffect(() => {
    fetchPejabat();
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchPejabat = async () => {
    const { data, error } = await supabase
      .from('daftar_pejabat')
      .select('*')
      .order('urutan', { ascending: true });
    if (!error) setPejabat(data || []);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, isEdit: boolean = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `pejabat/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      if (isEdit) {
        setTempData({ ...tempData, foto: publicUrl });
      } else {
        setForm({ ...form, foto: publicUrl });
      }
    } catch (error) {
      alert('Gagal mengunggah foto');
    } finally {
      setLoading(false);
    }
  };

  const handleSimpan = async () => {
    if (!form.nama || !form.jabatan) return alert("Nama dan Jabatan wajib diisi!");
    const { error } = await supabase.from('daftar_pejabat').insert([form]);
    if (!error) {
      setForm({ nama: '', jabatan: '', foto: '', urutan: 0 });
      fetchPejabat();
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Hapus data pejabat ini?")) {
      const { error } = await supabase.from('daftar_pejabat').delete().eq('id', id);
      if (!error) fetchPejabat();
    }
  };

  const startEdit = (item: any) => {
    setEditId(item.id);
    setTempData({ ...item });
  };

  const saveEdit = async () => {
    setLoading(true);
    const { error } = await supabase
      .from('daftar_pejabat')
      .update({
        nama: tempData.nama,
        jabatan: tempData.jabatan,
        foto: tempData.foto,
        urutan: parseInt(tempData.urutan) || 0
      })
      .eq('id', editId);
    
    if (!error) {
      setEditId(null);
      fetchPejabat();
    }
    setLoading(false);
  };

  return (
    <div style={{ ...containerStyle, padding: isMobile ? '20px' : '40px' }}>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      
      <div style={{ marginBottom: '35px' }}>
        <h3 style={headerTitleStyle}>Manajemen Data Pejabat</h3>
        <p style={headerSubStyle}>Sistem administrasi data struktural Rutan Kelas IIB Sinjai.</p>
      </div>

      <div style={{ ...formContainerStyle, gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr' }}>
        <FormInput label="Nama Lengkap" placeholder="NAMA PEJABAT" value={form.nama} onChange={(e: any) => setForm({...form, nama: e.target.value})} />
        <FormInput label="Jabatan" placeholder="Contoh: KEPALA RUTAN" value={form.jabatan} onChange={(e: any) => setForm({...form, jabatan: e.target.value})} />
        <FormInput 
          label="Urutan" 
          type="number" 
          value={isNaN(form.urutan) ? "" : form.urutan} 
          onChange={(e: any) => setForm({...form, urutan: e.target.value === "" ? 0 : parseInt(e.target.value)})} 
        />
        
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={labelStyle}>Foto Pejabat</label>
          <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e)} style={inputStyle} />
          {form.foto && (
            <div style={{ marginTop: '10px', position: 'relative', width: '60px' }}>
              <img src={form.foto} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} />
              <button 
                onClick={() => setForm({...form, foto: ''})} 
                style={removeFotoBadgeStyle}
              >×</button>
            </div>
          )}
        </div>

        <button 
          className="btn-react"
          onClick={handleSimpan}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          disabled={loading}
          style={{ 
            ...submitButtonStyle, 
            gridColumn: isMobile ? 'span 1' : 'span 2',
            backgroundColor: isHover ? '#0d4a85' : '#093661',
            opacity: loading ? 0.6 : 1
          }}
        >
          {loading ? 'Mengunggah...' : 'Simpan Data Pejabat'}
        </button>
      </div>

      <div style={dividerStyle} />

      <div style={{ ...tableHeaderActionStyle, flexDirection: isMobile ? 'column' : 'row' }}>
        <h4 style={tableTitleStyle}>Daftar Struktural Aktif</h4>
      </div>

      <div style={tableWrapperStyle}>
        <table style={{...tableStyle, width: '100%'}}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '2px solid #EDF2F7' }}>
              <th style={{ ...thStyle, width: '80px' }}>FOTO</th>
              <th style={thStyle}>BIODATA</th>
              <th style={thStyle}>JABATAN</th>
              <th style={{ ...thStyle, width: '100px', textAlign: 'center' }}>URUTAN</th>
              <th style={{ ...thStyle, textAlign: 'center', width: '150px' }}>NAVIGASI</th>
            </tr>
          </thead>
          <tbody>
            {pejabat.length > 0 ? (
              pejabat.map((item) => (
                <tr key={item.id} style={trStyle}>
                  <td style={tdStyle}>
                    <div style={avatarWrapperStyle} onClick={() => setSelectedImage?.(editId === item.id ? tempData.foto : item.foto)}>
                      {(editId === item.id ? tempData.foto : item.foto) ? (
                        <img src={editId === item.id ? tempData.foto : item.foto} style={avatarImgStyle} />
                      ) : (
                        <i className="fa fa-user" style={{color: '#CBD5E0'}}></i>
                      )}
                    </div>
                  </td>
                  <td style={tdStyle}>
                    {editId === item.id ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <input style={editInputStyle} value={tempData.nama} onChange={(e) => setTempData({...tempData, nama: e.target.value})} />
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <label style={{ fontSize: '10px', fontWeight: 'bold', color: '#718096' }}>GANTI / HAPUS FOTO:</label>
                          <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, true)} style={{ fontSize: '11px' }} />
                          
                          {tempData.foto && (
                            <button 
                              onClick={() => setTempData({...tempData, foto: ''})} 
                              style={{ border: 'none', background: 'none', color: '#E53E3E', fontSize: '11px', cursor: 'pointer', textAlign: 'left', padding: 0, fontWeight: 'bold' }}
                            >
                              <i className="fa fa-trash-can" style={{ marginRight: '5px' }}></i> Hapus Foto
                            </button>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div style={{fontWeight: '700', color: '#2D3748', textTransform: 'uppercase'}}>{item.nama}</div>
                    )}
                  </td>
                  <td style={tdStyle}>
                    {editId === item.id ? 
                      <input style={editInputStyle} value={tempData.jabatan} onChange={(e) => setTempData({...tempData, jabatan: e.target.value})} /> : 
                      <div style={{color: '#4A5568', fontWeight: '500'}}>{item.jabatan}</div>
                    }
                  </td>
                  <td style={{ ...tdStyle, textAlign: 'center' }}>
                    {editId === item.id ? 
                      <input type="number" style={{...editInputStyle, textAlign: 'center'}} value={tempData.urutan} onChange={(e) => setTempData({...tempData, urutan: e.target.value})} /> : 
                      <span style={badgeStyle}>{item.urutan}</span>
                    }
                  </td>
                  <td style={{ ...tdStyle, textAlign: 'center' }}>
                    <div style={{display: 'flex', justifyContent: 'center', gap: '8px'}}>
                      {editId === item.id ? (
                        <>
                          <button 
                            onMouseEnter={() => setHoverBtnId(`simpan-${item.id}`)}
                            onMouseLeave={() => setHoverBtnId(null)}
                            onClick={saveEdit} 
                            style={{
                                ...btnEditInline, 
                                backgroundColor: hoverBtnId === `simpan-${item.id}` ? '#2F855A' : '#38A169', 
                                color: 'white',
                                border: 'none'
                            }}>
                            Simpan
                          </button>
                          <button 
                            onMouseEnter={() => setHoverBtnId(`batal-${item.id}`)}
                            onMouseLeave={() => setHoverBtnId(null)}
                            onClick={() => setEditId(null)} 
                            style={{
                                ...btnEditInline,
                                backgroundColor: hoverBtnId === `batal-${item.id}` ? '#E2E8F0' : 'white'
                            }}>
                            Batal
                          </button>
                        </>
                      ) : (
                        <button 
                            onMouseEnter={() => setHoverBtnId(`edit-${item.id}`)}
                            onMouseLeave={() => setHoverBtnId(null)}
                            onClick={() => startEdit(item)} 
                            style={{
                                ...btnEditInline,
                                backgroundColor: hoverBtnId === `edit-${item.id}` ? '#EBF8FF' : 'white',
                                borderColor: hoverBtnId === `edit-${item.id}` ? '#3182CE' : '#E2E8F0',
                                color: hoverBtnId === `edit-${item.id}` ? '#3182CE' : '#093661'
                            }}>
                            Edit
                        </button>
                      )}
                      <button 
                        onMouseEnter={() => setHoverBtnId(`hapus-${item.id}`)}
                        onMouseLeave={() => setHoverBtnId(null)}
                        onClick={() => handleDelete(item.id)} 
                        style={{
                            ...btnDeleteInline,
                            backgroundColor: hoverBtnId === `hapus-${item.id}` ? '#E53E3E' : '#FFF5F5',
                            color: hoverBtnId === `hapus-${item.id}` ? 'white' : '#E53E3E',
                            borderColor: hoverBtnId === `hapus-${item.id}` ? '#C53030' : '#FED7D7'
                        }}>
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '50px', color: '#A0AEC0' }}>Data tidak ditemukan</td>
              </tr>
            )}
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

const removeFotoBadgeStyle: any = {
  position: 'absolute', 
  top: '-5px', 
  right: '-5px', 
  backgroundColor: '#E53E3E', 
  color: 'white', 
  border: 'none', 
  borderRadius: '50%', 
  width: '18px', 
  height: '18px', 
  cursor: 'pointer', 
  fontSize: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const containerStyle = { backgroundColor: '#FFFFFF', borderRadius: '20px', fontFamily: "'Inter', sans-serif" };
const headerTitleStyle = { color: '#093661', fontSize: '24px', fontWeight: '700', margin: '0 0 5px 0' };
const headerSubStyle = { color: '#718096', fontSize: '14px', margin: 0 };
const formContainerStyle = { display: 'grid', gap: '20px', padding: '30px', backgroundColor: '#F8FAFC', borderRadius: '18px', marginTop: '20px', border: '1px solid #E2E8F0' };
const labelStyle = { display: 'block', marginBottom: '10px', fontSize: '13px', fontWeight: '700', color: '#2D3748' };
const inputStyle = { padding: '12px 16px', borderRadius: '10px', border: '2px solid #E2E8F0', fontSize: '14px', outline: 'none', backgroundColor: 'white' };
const submitButtonStyle: any = { padding: '16px', color: 'white', border: 'none', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', fontSize: '15px', transition: '0.3s', marginTop: '10px' };
const dividerStyle = { height: '1px', backgroundColor: '#EDF2F7', margin: '45px 0' };
const tableHeaderActionStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', gap: '15px' };
const tableTitleStyle = { fontSize: '18px', fontWeight: '700', color: '#2D3748', margin: 0 };
const tableWrapperStyle = { overflowX: 'auto' as 'auto', border: '1px solid #E2E8F0', borderRadius: '12px' };
const tableStyle = { borderCollapse: 'collapse' as 'collapse' };
const thStyle = { padding: '18px 15px', textAlign: 'left' as 'left', fontSize: '11px', fontWeight: '550', color: '#718096', textTransform: 'uppercase' as 'uppercase', letterSpacing: '1px' };
const tdStyle = { padding: '15px', fontSize: '14px', borderBottom: '1px solid #F1F5F9' };
const trStyle = { transition: '0.2s' };
const avatarWrapperStyle = { width: '45px', height: '55px', backgroundColor: '#F1F5F9', borderRadius: '6px', overflow: 'hidden', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-in' };
const avatarImgStyle = { width: '100%', height: '100%', objectFit: 'cover' as 'cover' };
const editInputStyle = { width: '100%', padding: '6px 10px', borderRadius: '6px', border: '2px solid #093661', outline: 'none', fontSize: '13px' };
const badgeStyle = { padding: '4px 10px', borderRadius: '6px', backgroundColor: '#EBF8FF', color: '#2B6CB0', fontSize: '12px', fontWeight: '700' };
const btnEditInline = { border: '1px solid #E2E8F0', background: 'white', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '12px', transition: 'all 0.2s' };
const btnDeleteInline = { border: '1px solid #FED7D7', background: '#FFF5F5', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '12px', transition: 'all 0.2s' };