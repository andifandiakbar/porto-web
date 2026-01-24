"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const res = await fetch('/api/wbp/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (res.ok) {
      router.push('/dashboard'); 
    } else {
      alert("Username atau Password Salah!");
    }
  };

  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#093661' }}>
      <form onSubmit={handleLogin} style={{ 
        backgroundColor: 'white', 
        padding: '40px', 
        borderRadius: '16px', 
        width: '380px', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)' 
      }}>
        
        <img 
          src="/assets/logo.png" 
          alt="Logo Rutan" 
          style={{ width: '100px', height: '100px', marginBottom: '0px', objectFit: 'contain' }} 
        />
        <div style={{ textAlign: 'center', marginBottom: '25px' }}>
          <h1 style={{ fontSize: '18px', fontWeight: '800', color: '#093661', margin: 0, }}>
            Rutan Kelas II B
          </h1>
          <p style={{ fontSize: '17px', fontWeight: '800', color: '#093661', margin: 0 }}>
            Sinjai
          </p>
        </div>

        <h2 style={{ color: '#093661', fontSize: '14px', marginBottom: '20px', fontWeight: 'bold', letterSpacing: '1px' }}>
          LOGIN CMS STAFF
        </h2>
        
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          style={{ 
            width: '100%', 
            padding: '12px 15px', 
            margin: '8px 0', 
            borderRadius: '8px', 
            border: '1px solid #E2E8F0', 
            boxSizing: 'border-box',
            outlineColor: '#093661'
          }} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          style={{ 
            width: '100%', 
            padding: '12px 15px', 
            margin: '8px 0', 
            borderRadius: '8px', 
            border: '1px solid #E2E8F0', 
            boxSizing: 'border-box',
            outlineColor: '#093661'
          }} 
        />
        
        <button 
          type="submit" 
          style={{ 
            width: '100%', 
            padding: '14px', 
            backgroundColor: '#093661',
            color: 'white', 
            border: 'none', 
            borderRadius: '8px', 
            cursor: 'pointer', 
            fontWeight: 'bold', 
            marginTop: '15px',
            fontSize: '15px',
            transition: '0.3s'
          }}
        >
          Masuk ke Sistem
        </button>
      </form>
    </div>
  );
}