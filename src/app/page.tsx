// src/app/page.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

import Footer from './components/Footer';


export default function Home() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } }
  };

  const staggerCards = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.4 }
    }
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-red-600 selection:text-white flex flex-col">
      <main className="flex-grow">
        
        {/* Navbar Section */}
        <motion.nav 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex items-center justify-between p-6 lg:px-12 max-w-7xl mx-auto h-24 relative z-50"
        >
          <Link href="/" className="text-2xl font-black tracking-tighter hover:text-red-600 transition-colors">
              GEMA RAYA.
          </Link>
          <ul className="flex gap-8 font-semibold text-sm items-center">
            <li><Link href="/blog" className="hover:text-sky-500 transition-colors">Blog</Link></li>
            <li><Link href="/login" className="px-5 py-2.5 bg-black text-white hover:bg-gray-800 rounded-full transition-colors">Admin</Link></li>
          </ul>
        </motion.nav>

        {/* NEW HERO SECTION */}
        <section className="relative flex flex-col items-center min-h-screen overflow-hidden">
          {/* --- VIDEO BACKGROUND --- */}
          <div className="absolute inset-0 -z-20 w-full h-full">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover [transform:scaleY(-1)]"
            >
              <source
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260302_085640_276ea93b-d7da-4418-a09b-2aa5b490e838.mp4"
                type="video/mp4"
              />
            </video>
            {/* GRADIENT OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-b from-[26.416%] from-[rgba(255,255,255,0)] to-[66.943%] to-white"></div>
          </div>

          {/* BACKGROUND FALLBACK (In case video takes time to load) */}
          <div className="absolute inset-0 -z-30 bg-[#f8f8f8]"></div>

          {/* KONTEN HERO */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15, delayChildren: 0.2 },
              },
            }}
            className="relative z-10 w-full max-w-[1200px] px-6 pt-[290px] flex flex-col items-center text-center gap-[32px] mx-auto"
          >
            {/* Heading */}
            <motion.h1
              variants={fadeInUp}
              className="text-[48px] md:text-[64px] lg:text-[80px] font-medium tracking-[-0.04em] text-black leading-[1.1] max-w-[900px]"
            >
              Simple <span className="font-instrument-serif italic text-[60px] md:text-[80px] lg:text-[100px] font-normal tracking-normal">management</span> for your remote team
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeInUp}
              className="text-[18px] text-[#373a46] opacity-80 max-w-[554px] font-sans"
            >
              Gema Raya provides the tools and transparency you need to lead,
              collaborate, and achieve more together—no matter where your team
              is located.
            </motion.p>

            {/* Email Input & CTA */}
            <motion.div
              variants={fadeInUp}
              className="mt-4 flex flex-col items-center gap-6"
            >
              <div className="flex items-center bg-[#fcfcfc] border border-black/5 shadow-[0px_10px_40px_5px_rgba(194,194,194,0.25)] rounded-[40px] p-2 pl-6 w-full max-w-[500px] sm:w-[500px]">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-transparent outline-none flex-grow text-[#373a46] placeholder-gray-400 font-sans w-full"
                />
                <button className="whitespace-nowrap px-6 py-3.5 bg-gradient-to-b from-[#2a2a2a] to-[#111111] text-white rounded-full font-medium text-sm transition-transform hover:scale-105 shadow-[inset_-4px_-6px_25px_0px_rgba(201,201,201,0.08),inset_4px_4px_10px_0px_rgba(29,29,29,0.24)]">
                  Create Free Account
                </button>
              </div>

              {/* Social Proof */}
              <div className="flex items-center gap-3 text-sm font-medium text-gray-500">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-[10px]">✨</div>
                  <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-[10px]">🌟</div>
                  <div className="w-8 h-8 rounded-full bg-gray-400 border-2 border-white flex items-center justify-center text-[10px]">💫</div>
                </div>
                <div>
                  <span className="text-black font-semibold">1,020+ Reviews</span> from remote teams
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Philosophy Section */}
        <section className="bg-white py-32 px-6 border-t border-gray-100 relative z-20">
          <motion.div 
            variants={staggerCards}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 text-center"
          >
            {/* Red - Leadership */}
            <motion.div variants={fadeInUp} className="flex flex-col items-center group">
              <div className="w-20 h-20 rounded-full bg-red-600 mb-8 shadow-2xl shadow-red-200 group-hover:scale-110 transition-transform duration-500"></div>
              <h3 className="text-2xl font-black mb-4 tracking-tight">Leadership</h3>
              <p className="text-gray-500 text-base leading-relaxed max-w-xs">
                Mewakili semangat kepemimpinan yang berkobar dalam setiap mahasiswa untuk menjadi agen perubahan.
              </p>
            </motion.div>

            {/* Blue - Collaboration */}
            <motion.div variants={fadeInUp} className="flex flex-col items-center group">
              <div className="w-20 h-20 rounded-full bg-sky-500 mb-8 shadow-2xl shadow-sky-200 group-hover:scale-110 transition-transform duration-500"></div>
              <h3 className="text-2xl font-black mb-4 tracking-tight">Collaboration</h3>
              <p className="text-gray-500 text-base leading-relaxed max-w-xs">
                Melambangkan kolaborasi, kemampuan mahasiswa untuk bekerja sama dalam kegiatan belajar dan proyek sosial.
              </p>
            </motion.div>

            {/* Black - Integrity */}
            <motion.div variants={fadeInUp} className="flex flex-col items-center group">
              <div className="w-20 h-20 rounded-full bg-black mb-8 shadow-2xl shadow-gray-300 group-hover:scale-110 transition-transform duration-500"></div>
              <h3 className="text-2xl font-black mb-4 tracking-tight">Integrity</h3>
              <p className="text-gray-500 text-base leading-relaxed max-w-xs">
                Mewakili dasar yang kokoh dalam integritas dan komitmen, sikap yang bertanggung jawab dan tangguh.
              </p>
            </motion.div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}