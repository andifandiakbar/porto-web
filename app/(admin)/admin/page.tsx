"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Pastikan fetch mengarah ke api/wbp/login sesuai folder Anda
    const res = await fetch('/api/wbp/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (res.ok) {
      // PERBAIKAN DI SINI:
      // Karena folder dashboard sejajar dengan folder admin di dalam (admin)
      router.push('/dashboard'); 
    } else {
      alert("Username atau Password Salah!");
    }
  };

  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#093661' }}>
      <form onSubmit={handleLogin} style={{ backgroundColor: 'white', padding: '40px', borderRadius: '12px', width: '350px' }}>
        <h2 style={{ textAlign: 'center', color: '#093661' }}>Login CMS Staff</h2>
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ddd' }} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ddd' }} 
        />
        <button 
          type="submit" 
          style={{ width: '100%', padding: '10px', backgroundColor: '#1f70b8', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Masuk
        </button>
      </form>
    </div>
  );
}