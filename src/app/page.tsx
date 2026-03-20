// src/app/page.tsx
import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black font-sans selection:bg-red-600 selection:text-white">
      
      {/* Navbar Section */}
      <nav className="flex items-center justify-between p-6 max-w-6xl mx-auto">
        <h1 className="text-2xl font-black tracking-tighter">GEMA RAYA.</h1>
        <ul className="flex gap-6 font-medium text-sm">
          <li className="hover:text-red-600 cursor-pointer transition-colors">About</li>
          <li className="hover:text-sky-500 cursor-pointer transition-colors"><Link href="/blog">Blog</Link></li>
          <li className="hover:text-gray-500 cursor-pointer transition-colors">Contact</li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 pt-32 pb-20 max-w-4xl mx-auto">
        <img className="w-64 mb-10" src="/logo-gema-raya.png" alt="Logo" />

        <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-6">
          Kritis. Penuh Ide. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-sky-500">
            Siap Menghadapi Perubahan.
          </span>
        </h2>
        
        <p className="text-lg text-gray-600 max-w-2xl mb-10 leading-relaxed">
          Gema Raya (Gerakan Mahasiswa Raya) represents the spirit of leadership, collaboration, and unyielding integrity. We are the agents of change for the campus and society.
        </p>

        <div className="flex gap-4">
          <button className="px-8 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-all">
            Join the Movement
          </button>
          <button className="px-8 py-3 border-2 border-black text-black rounded-full font-semibold hover:bg-gray-100 transition-all">
            Read Our Blog
          </button>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-gray-50 py-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {/* Red - Leadership */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-red-600 mb-6 shadow-lg shadow-red-200"></div>
            <h3 className="text-xl font-bold mb-3">Leadership</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Mewakili semangat kepemimpinan yang berkobar dalam setiap mahasiswa untuk menjadi agen perubahan.
            </p>
          </div>

          {/* Blue - Collaboration */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-sky-500 mb-6 shadow-lg shadow-sky-200"></div>
            <h3 className="text-xl font-bold mb-3">Collaboration</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Melambangkan kolaborasi, kemampuan mahasiswa untuk bekerja sama dalam kegiatan belajar dan proyek sosial.
            </p>
          </div>

          {/* Black - Integrity */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-black mb-6 shadow-lg shadow-gray-300"></div>
            <h3 className="text-xl font-bold mb-3">Integrity</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Mewakili dasar yang kokoh dalam integritas dan komitmen, sikap yang bertanggung jawab dan tangguh.
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}