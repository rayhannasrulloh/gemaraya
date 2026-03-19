// src/app/blog/[slug]/page.tsx
import React from 'react';
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';

// Define the data structure (TypeScript Interface)
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  author: string;
  created_at: string;
}

// 1. Fetch data function from Supabase by slug
async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .maybeSingle(); // FIX 1: Change .single() to .maybeSingle() to prevent hard errors when post is not found

  if (error) {
    console.error('Error fetching post from Supabase:', error.message);
    return null;
  }

  return data as BlogPost | null;
}

// 2. The dynamic Page component
// FIX 2: In Next.js 15+, params is a Promise. We must type it as a Promise and await it.
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  
  // Resolve the params promise first
  const resolvedParams = await params;
  
  // Execute the fetch function with the resolved slug
  const post = await getPostBySlug(resolvedParams.slug);

  // Conditional rendering if post not found
  if (!post) {
    notFound(); // Triggers Next.js 404 page gracefully
  }

  return (
    <main className="min-h-screen bg-white text-black font-sans selection:bg-red-600 selection:text-white pb-20 px-6">
      
      {/* Article Header (Navbar) */}
      <nav className="flex items-center justify-between py-6 max-w-4xl mx-auto border-b border-gray-100">
        <h1 className="text-xl font-black tracking-tighter cursor-pointer">GEMA RAYA.</h1>
        <ul className="flex gap-6 font-medium text-xs">
          <li className="text-gray-400 hover:text-black cursor-pointer transition-colors">Blog</li>
          <li className="text-gray-400 hover:text-black cursor-pointer transition-colors">Author</li>
          <li className="text-gray-400 hover:text-black cursor-pointer transition-colors">Share</li>
        </ul>
      </nav>

      {/* Article Full Content */}
      <article className="max-w-2xl mx-auto pt-20">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6">
          {post.title}
        </h1>
        
        <div className="flex gap-4 items-center text-sm text-gray-500 mb-12 font-medium border-b border-gray-100 pb-6">
          <span>By {post.author}</span>
          <span>•</span>
          <span>{new Date(post.created_at).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
        
        {/* Render content as text, preserving line breaks */}
        <p className="text-lg text-gray-800 leading-relaxed whitespace-pre-line">
          {post.content}
        </p>
        
        <div className="mt-16 pt-10 border-t border-gray-100 text-center">
          {/* Note: In a real app, use the <Link> component from next/link instead of an anchor tag or button for internal routing */}
          <a href="/blog" className="px-8 py-3 border-2 border-black text-black rounded-full font-semibold hover:bg-gray-100 transition-all text-sm inline-block">
            &larr; Back to Blog
          </a>
        </div>
      </article>

    </main>
  );
}