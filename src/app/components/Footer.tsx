// src/app/components/Footer.tsx
import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-[#fdfdfd] text-black font-sans py-24 border-t border-black/5">
      
      {/* Container utama dengan padding horizontal */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Bagian Atas: Logo & Slogan Besar */}
        <div className="flex flex-col items-center text-center mb-20">
          <p className="text-4xl font-bold mb-6 text-black">
            GEMA RAYA
          </p>
          <p className="text-[18px] text-[#373a46] opacity-80 max-w-2xl font-sans">
            Wadah bagi mahasiswa untuk menyalurkan aspirasi, mengembangkan potensi, dan berkontribusi secara maksimal.
          </p>
        </div>

        {/* Bagian Bawah Berkolom (4 Kolom) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 border-t border-black/5 pt-16 mb-16">
          
          {/* Kolom 1: Navigasi Utama */}
          <div className="flex flex-col">
            <h4 className="text-xs tracking-[0.15em] text-black font-bold mb-6 uppercase">Jelajahi</h4>
            <ul className="space-y-4 text-sm text-[#373a46] opacity-80 font-medium">
              <li><Link href="/" className="hover:text-black hover:opacity-100 transition-colors">Beranda</Link></li>
              <li><Link href="/#tentang" className="hover:text-black hover:opacity-100 transition-colors">Tentang</Link></li>
              <li><Link href="/#filosofi" className="hover:text-black hover:opacity-100 transition-colors">Filosofi</Link></li>
              <li><Link href="/#galeri" className="hover:text-black hover:opacity-100 transition-colors">Galeri</Link></li>
            </ul>
          </div>

          {/* Kolom 2: Publikasi */}
          <div className="flex flex-col">
            <h4 className="text-xs tracking-[0.15em] text-black font-bold mb-6 uppercase">Publikasi</h4>
            <ul className="space-y-4 text-sm text-[#373a46] opacity-80 font-medium">
              <li><Link href="/blog" className="hover:text-black hover:opacity-100 transition-colors">Artikel Blog</Link></li>
            </ul>
          </div>

          {/* Kolom 3: Internal */}
          <div className="flex flex-col">
            <h4 className="text-xs tracking-[0.15em] text-black font-bold mb-6 uppercase">Internal</h4>
            <ul className="space-y-4 text-sm text-[#373a46] opacity-80 font-medium">
              <li><Link href="/login" className="hover:text-black hover:opacity-100 transition-colors">Admin Panel</Link></li>
            </ul>
          </div>

          {/* Kolom 4: Tetap Terhubung */}
          <div className="flex flex-col lg:col-span-1">
            <h4 className="text-xs tracking-[0.15em] text-black font-bold mb-6 uppercase">Daftar Newsletter</h4>
            
            <div className="flex items-center bg-[#fcfcfc] border border-black/5 shadow-[0px_10px_40px_5px_rgba(194,194,194,0.25)] rounded-[40px] p-2 pl-5 w-full">
              <input
                type="email"
                placeholder="Email Anda"
                className="bg-transparent outline-none flex-grow text-[#373a46] placeholder-gray-400 font-sans w-full text-xs"
              />
              <button className="whitespace-nowrap px-5 py-2.5 bg-gradient-to-b from-[#2a2a2a] to-[#111111] text-white rounded-full font-medium text-[10px] uppercase tracking-wider transition-transform hover:scale-105 shadow-[inset_-4px_-6px_25px_0px_rgba(201,201,201,0.08),inset_4px_4px_10px_0px_rgba(29,29,29,0.24)]">
                Daftar
              </button>
            </div>
            
            {/* Ikuti Kami Section dengan Ikon Sosial */}
            <h4 className="text-xs tracking-[0.15em] text-black font-bold mt-10 mb-5 uppercase">Ikuti Kami</h4>
            <div className="flex gap-4 items-center">
              <a href="https://www.instagram.com/gemaraya_official" target='_blank' rel='noopener noreferrer' className="text-[#373a46] opacity-80 hover:text-black hover:opacity-100 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.919-.058-1.265-.069-1.644-.069-4.849 0-3.204.013-3.583.069-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bagian Paling Bawah: Hak Cipta & Vercel Logo */}
        <div className="text-center text-xs text-[#373a46] pt-8 border-t border-black/5 flex flex-col items-center gap-4">
          <p>© 2026 Gema Raya. Hak cipta dilindungi.</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-gema-raya.png" alt="Logo" className="w-12 h-auto" />
        </div>
        
      </div>
    </footer>
  );
}