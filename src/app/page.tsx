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
        <motion.header 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' as const }}
          className="absolute top-6 left-0 right-0 z-50 flex items-center justify-between px-3 py-3 md:px-6 md:py-4 mx-auto max-w-6xl w-[calc(100%-3rem)] bg-white/40 backdrop-blur-2xl border border-white/50 rounded-[40px] shadow-[0px_4px_30px_rgba(0,0,0,0.05)]"
        >
          {/* Left - Logo */}
          <div className="flex w-1/3">
            <Link href="/" className="text-xl font-bold tracking-tight text-black hover:text-gray-600 transition-colors px-4">
              GEMA RAYA
            </Link>
          </div>

          {/* Center - Links */}
          <ul className="hidden md:flex w-1/3 justify-center gap-8 font-medium text-sm items-center text-gray-800">
            <li><Link href="/" className="hover:text-black transition-colors">Beranda</Link></li>
            <li><Link href="#tentang" className="hover:text-black transition-colors">Tentang</Link></li>
            <li><Link href="#filosofi" className="hover:text-black transition-colors">Filosofi</Link></li>
            <li><Link href="#galeri" className="hover:text-black transition-colors">Galeri</Link></li>
          </ul>

          {/* Right - Button */}
          <div className="flex w-1/3 justify-end pr-2 md:pr-0">
            <Link href="/blog" className="px-6 py-2.5 bg-black text-white hover:bg-gray-800 rounded-full text-sm font-medium transition-colors shadow-[inset_0px_1px_4px_rgba(255,255,255,0.2)]">Blog</Link>
          </div>
        </motion.header>

        {/* NEW HERO SECTION */}
        <section className="relative z-0 flex flex-col items-center min-h-screen overflow-hidden">
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
                src="/hf_20260302_085640_276ea93b-d7da-4418-a09b-2aa5b490e838.mp4"
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
              Dekatkan <span className="font-instrument-serif italic text-[60px] md:text-[80px] lg:text-[100px] font-normal tracking-normal">hati</span>,
              <br />
              kuatkan <span className="font-instrument-serif italic text-[60px] md:text-[80px] lg:text-[100px] font-normal tracking-normal">prestasi</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeInUp}
              className="text-[18px] text-[#373a46] opacity-80 max-w-[554px] font-sans"
            >
              Gema Raya adalah wadah bagi mahasiswa untuk menyalurkan aspirasi, mengembangkan potensi, dan berkontribusi bagi almamater tercinta.
            </motion.p>

            {/* CTA Lanjut Bawah */}
            <motion.div
              variants={fadeInUp}
              className="mt-8 flex flex-col items-center gap-6"
            >
              <button 
                onClick={() => {
                  const lenis = (window as any).lenis;
                  if (lenis) {
                    lenis.scrollTo('#filosofi', { offset: -50 });
                  } else {
                    document.getElementById('filosofi')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="group flex items-center justify-center gap-3 px-8 py-3.5 bg-gradient-to-b from-[#2a2a2a] to-[#111111] text-white rounded-full font-medium text-sm transition-transform hover:scale-105 shadow-[inset_-4px_-6px_25px_0px_rgba(201,201,201,0.08),inset_4px_4px_10px_0px_rgba(29,29,29,0.24)]"
              >
                Lanjut ke bawah
                <svg className="w-4 h-4 transition-transform group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        </section>

        {/* Philosophy Section */}
        <section id="filosofi" className="bg-white py-32 px-6 relative z-20 overflow-hidden">
          <div className="max-w-4xl mx-auto flex flex-col gap-32">
            
            {/* Image 1: Intro */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="min-h-[60vh] flex flex-col items-center justify-center text-center"
            >
              <h2 className="text-5xl md:text-6xl font-black tracking-tight text-black mb-4">yuk bedah filosofi</h2>
              <p className="text-3xl font-instrument-serif tracking-[0.4em] mb-16 text-black">g e m a &nbsp; r a y a</p>
              <div className="mt-20 text-sm font-medium italic text-gray-800">with <span className="font-bold not-italic">tim</span> gema raya</div>
            </motion.div>

            {/* Image 2: Base on shape 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="grid md:grid-cols-2 gap-16 items-center"
            >
              <div>
                <h3 className="text-lg tracking-[0.3em] text-gray-800 font-medium mb-1 uppercase">Filosofi Logo</h3>
                <h2 className="text-3xl font-extrabold mb-12">base on shape</h2>
                
                <div className="mb-12">
                  <div className="flex items-start gap-6">
                    <div className="mt-1 w-12 flex-shrink-0 flex items-start justify-center">
                      {/* Segitiga Terbalik */}
                      <svg viewBox="0 0 24 24" fill="black" className="w-10 h-10"><polygon points="24 4 0 4 12 20"/></svg>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">Segitiga Terbalik:</h4>
                      <p className="text-gray-800 leading-relaxed font-sans text-base">segitiga terbalik diartikan sebagai simbol pengetahuan yang mengalir dari atas ke bawah, mencerminkan sikap rendah hati dan keinginan untuk terus belajar tanpa henti. tiga sudut nya mencerminkan tri sukses generus.</p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-start gap-6">
                    <div className="mt-1 w-12 flex-shrink-0 flex items-start justify-center">
                      {/* Heart */}
                      <svg viewBox="0 0 24 24" fill="black" className="w-10 h-10"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">Bentuk Love:</h4>
                      <p className="text-gray-800 leading-relaxed font-sans text-base">Mahasiswa diharapkan tidak hanya mengejar kesuksesan pribadi, tetapi juga membawa dampak positif bagi masyarakat (social impact).</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center md:justify-end">
                <img src="/logo-gema-raya.png" alt="Logo Shape" className="w-64 max-w-full drop-shadow-2xl" />
              </div>
            </motion.div>

            {/* Image 3: Base on shape 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="grid md:grid-cols-2 gap-16 items-center"
            >
              <div className="order-2 md:order-1 flex justify-center md:justify-start">
                <img src="/logo-gema-raya.png" alt="Logo Structure" className="w-64 max-w-full drop-shadow-2xl" />
              </div>
              <div className="order-1 md:order-2">
                <h3 className="text-lg tracking-[0.3em] text-gray-800 font-medium mb-1 uppercase md:text-right">Filosofi Logo</h3>
                <h2 className="text-3xl font-extrabold mb-12 md:text-right">base on shape</h2>
                
                <div className="mb-12">
                  <div className="flex items-start gap-6">
                    <div className="mt-1 w-12 flex-shrink-0 flex items-start justify-center">
                      <div className="w-8 h-8 bg-black mt-1"></div>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">Persegi:</h4>
                      <p className="text-gray-800 leading-relaxed font-sans text-base">segi empat yang kokoh merepresentasikan kemandirian mahasiswa. Selain itu, struktur yang kokoh melambangkan tanggung jawab dan kedisiplinan dalam menjalani kehidupan baik perkuliahan dan mengajinya. 4 sudutnya juga menjadi representasi 4 roda berputar</p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-start gap-6">
                    <div className="mt-1 w-12 flex-shrink-0 flex items-start justify-center">
                      {/* Graduation Cap */}
                      <svg viewBox="0 0 24 24" fill="black" className="w-10 h-10"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3z"/></svg>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">Tiga Segitiga:</h4>
                      <p className="text-gray-800 leading-relaxed font-sans text-base">diartikan sebagai tiga pilar perguruan tinggi: pendidikan dan pengajaran, penelitian dan pengembangan, dan pengabdian kepada masyarakat. Semua aspek ini berdiri berdampingan dan saling menguatkan.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Image 4: Base on designation */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center mt-12"
            >
              <h3 className="text-lg tracking-[0.3em] text-gray-800 font-medium mb-1 uppercase">Filosofi</h3>
              <h2 className="text-3xl font-extrabold mb-16">Base on designation</h2>
              
              <img src="/logo-gema-raya.png" alt="Gema Raya Logo" className="h-32 mb-16" />
              
              <div className="text-left space-y-6 text-lg text-gray-900 leading-relaxed max-w-2xl font-medium">
                <p>"gema" sebagai <span className="font-bold text-black">Refleksi Suara</span> juga mencerminkan tujuan untuk <span className="font-bold text-black">menggema-kan nilai-nilai 29 karakter luhur generus LDII</span> dan menyebarkan kebaikan di lingkungan kampus, seperti gema suara yang terus meluas dan berdampak.</p>
                <p>Penggunaan huruf kecil melambangkan <span className="font-bold text-black">kerendahan hati dan kesederhanaan</span>, mengingatkan bahwa komunitas ini berfungsi sebagai <span className="font-bold text-black">wadah yang inklusif dan terbuka</span> untuk semua mahasiswa tanpa melihat tingkatan.</p>
                <p>Dalam konteks mahasiswa, "<span className="font-bold text-black">Raya</span>" menginspirasi agar mereka <span className="font-bold text-black">berani bermimpi besar</span> dan <span className="font-bold text-black">berkontribusi maksimal</span> di berbagai bidang.</p>
              </div>
            </motion.div>

            {/* Image 5: Base on Tag-line */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center mt-12 mb-32"
            >
              <h3 className="text-lg tracking-[0.3em] text-gray-800 font-medium mb-1 uppercase">Filosofi</h3>
              <h2 className="text-3xl font-extrabold mb-16">Base on Tag-line</h2>
              
              <img src="/logo-gema-raya.png" alt="Gema Raya Logo Outline" className="h-32 mb-16 opacity-40 grayscale" />
              
              <h3 className="text-2xl md:text-3xl font-extrabold mb-16 text-center tracking-tight">
                <span className="text-red-600">"Dekatkan Hati</span>, <span className="text-sky-500">Kuatkan Prestasi"</span>
              </h3>
              
              <div className="text-left space-y-8 text-lg text-gray-900 leading-relaxed max-w-3xl font-medium">
                <p><span className="font-bold text-red-600">Frasa pertama,</span> "Dekatkan Hati," mengandung dua unsur kedekatan yaitu pertama secara vertikal yaitu <span className="font-bold text-black">mendekatkan diri kepada Allah SWT.</span> Dan yang kedua secara horizontal yaitu mempererat hubungan dan <span className="font-bold text-black">meningkatkan kualitas ikatan sesama mahasiswa.</span></p>
                <p><span className="font-bold text-sky-500">Frasa kedua,</span> "Kuatkan Prestasi," mengandung ajakan untuk mencapai prestasi dan kontribusi positif. Prestasi di sini tidak hanya berarti nilai akademik, tetapi juga prestasi dalam pengembangan diri, karakter, dan kontribusi sosial.</p>
              </div>
            </motion.div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}