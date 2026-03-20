// src/app/blog/page.tsx
import React from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

// Define the data structure (TypeScript Interface)
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  author: string;
  created_at: string;
}

// Fetch data function from Supabase
async function getPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts from Supabase:', error.message);
    return [];
  }

  return data as BlogPost[];
}

export default async function BlogPage() {
  // Execute the fetch function
  const posts = await getPosts();

  return (
    // Wrapper luar dibikin full width (w-full) dengan background putih
    <div className="min-h-screen bg-white text-black font-sans w-full selection:bg-red-600 selection:text-white">
      
      {/* Navbar Minimalis */}
      <nav className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-20">
          <Link href="/" className="text-2xl font-black tracking-tighter hover:text-red-600 transition-colors">
            GEMA RAYA.
          </Link>
          <ul className="flex gap-8 font-semibold text-sm">
            <li>
              <Link href="/" className="text-gray-500 hover:text-black transition-colors">Home</Link>
            </li>
            <li>
              <Link href="/blog" className="text-black transition-colors">Blog</Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content Area - Menggunakan max-w-7xl agar lebih lebar di desktop */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        
        {/* Header Section */}
        <div className="max-w-3xl mb-16">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Pikiran. <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-sky-500">Ide.</span> Aksi.
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Kumpulan tulisan, gagasan, dan cerita dari pergerakan mahasiswa. Bacalah untuk memahami, menulislah untuk menginspirasi.
          </p>
        </div>

        {/* Blog Posts Grid System */}
        {posts.length === 0 ? (
          <div className="py-20 text-center border-2 border-dashed border-gray-200 rounded-2xl">
            <p className="text-lg text-gray-500 font-medium">Belum ada artikel yang dipublikasikan.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              // Menggunakan Link Next.js untuk navigasi super cepat (SPA feel)
              <Link 
                href={`/blog/${post.slug}`} 
                key={post.id} 
                className="group flex flex-col justify-between p-8 rounded-3xl border border-gray-200 bg-white hover:border-black hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full"
              >
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full uppercase tracking-wider group-hover:bg-red-50 group-hover:text-red-600 transition-colors">
                      Artikel
                    </span>
                    <span className="text-sm text-gray-400 font-medium">
                      {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-4 line-clamp-3 leading-snug group-hover:text-sky-500 transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-600 line-clamp-3 leading-relaxed mb-6">
                    {post.content}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-auto">
                  <span className="text-sm font-semibold text-gray-900">
                    {post.author}
                  </span>
                  <span className="text-sky-500 font-bold group-hover:translate-x-1 transition-transform">
                    &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}