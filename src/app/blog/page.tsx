// src/app/blog/page.tsx
import React from 'react';
import { supabase } from '@/lib/supabase';

// 1. Define the data structure (TypeScript Interface)
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  author: string;
  created_at: string;
}

// 2. Fetch data function from Supabase
async function getPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('is_published', true) // Only fetch published posts
    .order('created_at', { ascending: false }); // Newest first

  if (error) {
    console.error('Error fetching posts from Supabase:', error.message);
    return [];
  }

  return data as BlogPost[];
}

// 3. The Page UI
export default async function BlogPage() {
  // Execute the fetch function
  const posts = await getPosts();

  return (
    <main className="min-h-screen bg-white text-black font-sans px-6 py-20 max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-10 tracking-tight">
        Gema Raya <span className="text-sky-500">Blog</span>
      </h1>

      {/* Conditional rendering if there are no posts yet */}
      {posts.length === 0 ? (
        <p className="text-gray-500">No articles published yet. Stay tuned!</p>
      ) : (
        <div className="flex flex-col gap-8">
          {posts.map((post) => (
            <article key={post.id} className="border-b border-gray-200 pb-8">
              <h2 className="text-2xl font-bold mb-2 hover:text-red-600 transition-colors cursor-pointer">
                {post.title}
              </h2>
              
              <div className="flex gap-4 text-sm text-gray-500 mb-4 font-medium">
                <span>By {post.author}</span>
                <span>•</span>
                <span>{new Date(post.created_at).toLocaleDateString('en-US')}</span>
              </div>
              
              <p className="text-gray-700 line-clamp-3 leading-relaxed">
                {post.content}
              </p>
              
              <button className="mt-4 font-semibold text-sky-500 hover:text-sky-600 transition-colors">
                Read more &rarr;
              </button>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}