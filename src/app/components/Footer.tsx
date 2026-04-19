// src/app/components/Footer.tsx
import React from 'react';
import Link from 'next/link';

export default function Footer() {
  // Use Gema Raya primary colors for hover accents (Light Mode version)
  const primaryAcsent = 'text-black';
  const hoverAccent = 'hover:text-red-600';
  const buttonGradient = 'from-red-600 to-sky-500';

  return (
    // Background diubah menjadi putih (bg-white) dengan border atas tipis agar terpisah rapi dari konten sebelumnya
    <footer className="w-full bg-white text-gray-600 font-sans selection:bg-red-600 selection:text-white py-24 border-t border-gray-100">
      
      {/* Container utama dengan padding horizontal */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Bagian Atas: Logo & Slogan Besar */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-6xl font-black text-black tracking-tighter mb-4">GEMA RAYA.</h2>
          <p className="text-lg text-gray-500 font-light max-w-2xl">
            Gerakan Mahasiswa Raya - Agen Perubahan Kampus & Masyarakat.
          </p>
        </div>

        {/* Bagian Bawah Berkolom (4 Kolom) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-gray-100 pt-16 mb-16">
          
          {/* Kolom 1: Gema Raya */}
          <div className="flex flex-col">
            <h4 className={`text-lg font-bold ${primaryAcsent} mb-6 tracking-tight uppercase`}>Gema Raya</h4>
            <ul className="space-y-4 text-sm text-gray-500 font-medium">
              <li><Link href="/about" className={`${hoverAccent} transition-colors`}>About Us</Link></li>
              <li><Link href="/about/philosophy" className={`${hoverAccent} transition-colors`}>Our Philosophy</Link></li>
              <li><Link href="/about/story" className={`${hoverAccent} transition-colors`}>Our Story</Link></li>
              <li><Link href="/admin" className={`${hoverAccent} transition-colors`}>Join Movement</Link></li>
            </ul>
          </div>

          {/* Kolom 2: Fokus Gerakan */}
          <div className="flex flex-col">
            <h4 className={`text-lg font-bold ${primaryAcsent} mb-6 tracking-tight uppercase`}>Fokus Gerakan</h4>
            <ul className="space-y-4 text-sm text-gray-500 font-medium">
              <li><Link href="/focus/critical" className={`${hoverAccent} transition-colors`}>Critical Thinking</Link></li>
              <li><Link href="/focus/collaboration" className={`${hoverAccent} transition-colors`}>Collaboration</Link></li>
              <li><Link href="/focus/integrity" className={`${hoverAccent} transition-colors`}>Integrity</Link></li>
              <li><Link href="/focus/social" className={`${hoverAccent} transition-colors`}>Social Projects</Link></li>
              <li><Link href="/focus/politics" className={`${hoverAccent} transition-colors`}>Political Education</Link></li>
            </ul>
          </div>

          {/* Kolom 3: Publikasi */}
          <div className="flex flex-col">
            <h4 className={`text-lg font-bold ${primaryAcsent} mb-6 tracking-tight uppercase`}>Publikasi</h4>
            <ul className="space-y-4 text-sm text-gray-500 font-medium">
              <li><Link href="/blog" className={`${hoverAccent} transition-colors`}>Blog</Link></li>
              <li><Link href="/blog/archive" className={`${hoverAccent} transition-colors`}>Archive Posts</Link></li>
              <li><Link href="/privacy" className={`${hoverAccent} transition-colors`}>Privacy Policy</Link></li>
              <li><Link href="/terms" className={`${hoverAccent} transition-colors`}>Terms of Use</Link></li>
            </ul>
          </div>

          {/* Kolom 4: Tetap Terhubung */}
          <div className="flex flex-col">
            <h4 className={`text-lg font-bold ${primaryAcsent} mb-6 tracking-tight uppercase`}>Daftar Newsletter</h4>
            
            {/* Input Email dengan background abu-abu sangat muda */}
            <input 
              type="email" 
              placeholder="Email Anda" 
              className="w-full bg-gray-50 text-black px-4 py-3 rounded-lg border border-gray-200 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none mb-4 transition-all" 
            />
            
            {/* Tombol Subscribe Bergradasi Gema Raya (Tetap dipertahankan agar stand out) */}
            <button className={`w-full bg-gradient-to-r ${buttonGradient} text-white font-bold py-3.5 rounded-lg hover:from-red-700 hover:to-sky-600 transition-colors shadow-md text-sm`}>
              Daftar Newsletter
            </button>
            
            {/* Ikuti Kami Section dengan Ikon Sosial */}
            <h4 className={`text-sm font-bold ${primaryAcsent} mt-10 mb-5 tracking-wide uppercase`}>Ikuti Kami</h4>
            <div className="flex gap-4 items-center">
              {/* <a href="#" className="text-gray-400 hover:text-red-600 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a> */}
              {/* <a href="#" className="text-gray-400 hover:text-red-600 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.25 2.25h6.663l4.715 6.16 4.616-6.16zM17.087 19.773H18.92L6.51 3.511H4.542l12.545 16.262z"/></svg>
              </a> */}
              <a href="https://www.instagram.com/gemaraya_official" target='_blank' rel='noopener noreferrer' className="text-gray-400 hover:text-red-600 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.919-.058-1.265-.069-1.644-.069-4.849 0-3.204.013-3.583.069-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              {/* <a href="#" className="text-gray-400 hover:text-red-600 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.312 0 2.61.16 3.86.47l.1.02a6.93 6.93 0 0 1 5.25 5.25c.31 1.25.47 2.55.47 3.86v4.75c0 1.31-.16 2.61-.47 3.86a6.93 6.93 0 0 1-5.25 5.25c-1.25.31-2.55.47-3.86.47h-4.75c-1.31 0-2.61-.16-3.86-.47a6.93 6.93 0 0 1-5.25-5.25C1.16 17.11 1 15.81 1 14.5v-4.75c0-1.31.16-2.61.47-3.86a6.93 6.93 0 0 1 5.25-5.25c1.25-.31 2.55-.47 3.86-.47h4.75ZM15 6.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2ZM11.3 7h1.4c1.11 0 2.01.83 2.1 1.88l.01.12v3a1.9 1.9 0 0 1-1.79 1.89h-.03v.25l1.62 2.16c.38.5 .45 1.16.18 1.73l-.11.2a1.35 1.35 0 0 1-1.2.78H12.3c-.62 0-1.18-.4-1.38-1.02l-.04-.15L9.34 14.5H9.1c-1.11 0-2.01-.83-2.1-1.88l-.01-.12v-3a1.9 1.9 0 0 1 1.79-1.89h.03v-.25l-1.62-2.16c-.38-.5-.45-1.16-.18-1.73l.11-.2a1.35 1.35 0 0 1 1.2-.78H9.7c.62 0 1.18.4 1.38 1.02l.04.15 1.54 3.33H11.3V7ZM12 8.1l-1.86 4.02h3.72L12 8.1Zm.7 9.8c0 .28-.22.5-.5.5-.28 0-.5-.22-.5-.5a.5.5 0 0 1 .5-.5c.28 0 .5.22.5.5Z"/></svg>
              </a> */}
            </div>
          </div>
        </div>

        {/* Bagian Paling Bawah: Hak Cipta & Vercel Logo */}
        <div className="text-center text-xs text-gray-500 pt-4 border-t border-gray-100 flex flex-col items-center gap-3">
          <p>© 2026 Gema Raya. Gerakan Mahasiswa Raya.</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-gema-raya.png" alt="Logo" className="mt-4 w-16 h-auto" />
        </div>
        
      </div>
    </footer>
  );
}