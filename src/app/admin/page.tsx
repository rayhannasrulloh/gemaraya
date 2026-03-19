// src/app/admin/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

// Define the interface for the post list
interface PostItem {
  id: string;
  title: string;
  slug: string;
  is_published: boolean;
  content: string; // Add content to the interface for editing
}

export default function AdminDashboard() {
  const router = useRouter();

  // State for the form inputs
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  
  // State for the UI
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // State for editing mode
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const isEditing = editingPostId !== null;

  // Fetch posts when the dashboard loads
  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const { data, error } = await supabase
      .from('posts')
      .select('id, title, slug, content, is_published') // Also fetch content
      .order('created_at', { ascending: false });
    
    if (data) setPosts(data);
    if (error) console.error('Error fetching posts:', error);
  }

  // Handle start edit mode
  function handleEditStart(post: PostItem) {
    setEditingPostId(post.id);
    setTitle(post.title);
    setSlug(post.slug);
    setContent(post.content);
  }

  // Handle cancel edit mode
  function handleCancelEdit() {
    setEditingPostId(null);
    setTitle('');
    setSlug('');
    setContent('');
  }

  // Function to handle form submission (Create or Update)
  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsLoading(true);

    let error = null;

    if (isEditing) {
      // 1. UPDATE Mode
      const { error: updateError } = await supabase
        .from('posts')
        .update({ 
          title: title, 
          slug: slug, 
          content: content 
        })
        .eq('id', editingPostId);
      error = updateError;
    } else {
      // 2. CREATE Mode
      const { error: insertError } = await supabase
        .from('posts')
        .insert([
          { 
            title: title, 
            slug: slug, 
            content: content, 
            is_published: true // Automatically publish for now
          }
        ]);
      error = insertError;
    }

    if (error) {
      alert(`Failed to ${isEditing ? 'update' : 'publish'} post: ` + error.message);
    } else {
      alert(`Post ${isEditing ? 'updated' : 'published'} successfully!`);
      // Reset form and cancel edit mode
      handleCancelEdit();
      // Refresh the list of posts
      fetchPosts();
    }
    
    setIsLoading(false);
  }

  // Function to auto-generate slug from title
  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newTitle = e.target.value;
    setTitle(newTitle);
    
    // Convert "Hello World" to "hello-world"
    const generatedSlug = newTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    setSlug(generatedSlug);
  }

  return (
    <div className="min-h-screen bg-gray-50 text-black font-sans flex">
      
      {/* Sidebar Area */}
      <aside className="w-64 bg-black text-white p-6 hidden md:block">
        <h2 className="text-2xl font-black tracking-tight mb-10 cursor-pointer" onClick={() => router.push('/')}>GEMA RAYA.</h2>
        <nav className="flex flex-col gap-4 text-sm font-medium">
          <div className="text-red-600 cursor-pointer">Dashboard</div>
          <div className="text-gray-400 hover:text-white cursor-pointer transition-colors" onClick={() => router.push('/blog')}>View Blog</div>
          <div className="text-gray-400 hover:text-white cursor-pointer transition-colors">Settings</div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 max-w-5xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Form Section (Left side) */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-xl font-bold mb-6">
              {isEditing ? 'Edit Post' : 'Create New Post'}
            </h2>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-semibold mb-2">Post Title</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={handleTitleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  placeholder="Enter an engaging title..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">URL Slug</label>
                <input 
                  type="text" 
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 text-gray-500 focus:outline-none"
                  placeholder="auto-generated-slug"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Content</label>
                <textarea 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 h-64 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 leading-relaxed"
                  placeholder="Write your brilliant ideas here..."
                  required
                ></textarea>
              </div>

              <div className="flex gap-4 mt-2">
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="bg-black text-white font-semibold px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400 flex-1"
                >
                  {isLoading ? 'Processing...' : (isEditing ? 'Update Post' : 'Publish Post')}
                </button>
                {isEditing && (
                  <button 
                    type="button"
                    onClick={handleCancelEdit}
                    className="bg-gray-200 text-gray-700 font-semibold px-8 py-3 rounded-lg hover:bg-gray-300 transition-colors flex-1"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* List of Posts Section (Right side) */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-fit">
            <h2 className="text-xl font-bold mb-6">Recent Posts</h2>
            <div className="flex flex-col gap-4">
              {posts.length === 0 ? (
                <p className="text-sm text-gray-500">No posts found.</p>
              ) : (
                posts.map((post) => (
                  <div key={post.id} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                    <h3 className="font-semibold text-sm line-clamp-2 leading-snug hover:text-red-600 transition-colors cursor-pointer" onClick={() => router.push(`/blog/${post.slug}`)}>
                      {post.title}
                    </h3>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                        <span className="text-xs text-gray-500">Published</span>
                      </div>
                      <button 
                        onClick={() => handleEditStart(post)}
                        className="text-xs font-semibold text-gray-700 hover:text-black hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}