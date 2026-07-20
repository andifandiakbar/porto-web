"use client";

import React, { ReactNode } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import "./desktop.css"; 
import "./mobile.css";

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <div className="layout-wrapper">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
        
        <main className="main-wrapper">
          <Navbar />
          {children}
          <Footer />
        </main>
    </div>
  );
}