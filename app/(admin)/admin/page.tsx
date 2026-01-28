"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 480);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
    <div style={{ 
      minHeight: '100vh', 
      width: '100%', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: '#093661',
      margin: 0,
      padding: isMobile ? '20px' : '0',
      position: 'fixed',
      top: 0,
      left: 0,
      boxSizing: 'border-box'
    }}>
      <form onSubmit={handleLogin} style={{ 
        backgroundColor: 'white', 
        padding: isMobile ? '30px 20px' : '40px', 
        borderRadius: '16px', 
        width: isMobile ? '100%' : '380px', 
        maxWidth: '400px',
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        boxSizing: 'border-box'
      }}>
        
        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          <img 
            src="/assets/logo.png" 
            alt="Logo" 
            style={{ width: isMobile ? '160px' : '200px', height: '70px', objectFit: 'contain' }} 
          />
        </div>

        <div style={{ textAlign: 'center', marginBottom: '25px' }}>
          <h1 style={{ fontSize: isMobile ? '19px' : '21px', fontWeight: '800', color: '#093661', margin: 0 }}>
            Rutan Kelas II B Sinjai
          </h1>
        </div>

        <h2 style={{ color: '#093661', fontSize: isMobile ? '16px' : '18px', marginBottom: '20px', fontWeight: 'bold', letterSpacing: '1px', textAlign: 'center' }}>
          Login Content Management System
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
            outlineColor: '#093661',
            fontSize: '14px'
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
            outlineColor: '#093661',
            fontSize: '14px'
          }} 
        />
        
        <button 
          type="submit" 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => { setIsHovered(false); setIsActive(false); }}
          onMouseDown={() => setIsActive(true)}
          onMouseUp={() => setIsActive(false)}
          onTouchStart={() => setIsActive(true)}
          onTouchEnd={() => setIsActive(false)}
          style={{ 
            width: '100%', 
            padding: '14px', 
            backgroundColor: isActive ? '#05213d' : isHovered ? '#0d4a85' : '#093661',
            color: 'white', 
            border: 'none', 
            borderRadius: '8px', 
            cursor: 'pointer', 
            fontWeight: 'bold', 
            marginTop: '15px',
            fontSize: '15px',
            transform: isActive ? 'scale(0.96)' : 'scale(1)',
            transition: 'all 0.2s ease'
          }}
        >
          Masuk ke Sistem
        </button>
      </form>
    </div>
  );
}