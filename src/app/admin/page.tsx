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
  
  // State for editing mode and modal visibility
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Controls the pop-up
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
    if (error) console.error('Error fetching posts from Supabase:', error.message);
  }

  // Open modal for Creating a NEW post
  function handleCreateStart() {
    setEditingPostId(null); // Ensure we are NOT in edit mode
    setTitle('');
    setSlug('');
    setContent('');
    setIsModalOpen(true); // Open the modal
  }

  // Open modal for Editing an EXISTING post
  function handleEditStart(post: PostItem) {
    setEditingPostId(post.id); // Set the ID of the post we are editing
    setTitle(post.title);
    setSlug(post.slug);
    setContent(post.content);
    setIsModalOpen(true); // Open the modal
  }

  // Close modal and reset form
  function handleCloseModal() {
    setIsModalOpen(false); // Close the modal
    // Wait for the animation to finish before resetting state (optional but nice)
    setTimeout(() => {
        setEditingPostId(null);
        setTitle('');
        setSlug('');
        setContent('');
    }, 300);
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
      // Close modal and reset form
      handleCloseModal();
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
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    setSlug(generatedSlug);
  }

  return (
    <div className="min-h-screen bg-gray-50 text-black font-sans flex relative">
      
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
      <main className="flex-1 p-8 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
            <h1 className="text-3xl font-extrabold ">Admin Dashboard</h1>
            <button 
                onClick={handleCreateStart}
                className="bg-black text-white font-semibold px-6 py-2.5 rounded-full hover:bg-gray-800 transition-colors flex items-center gap-2 text-sm"
            >
                <span className="text-lg">+</span> Create New Post
            </button>
        </div>

        {/* List of Posts Section - Full Width now */}
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm h-fit">
            <h2 className="text-2xl font-bold mb-8">Recent Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.length === 0 ? (
                <p className="text-sm text-gray-500 lg:col-span-3 text-center py-10">No posts found. Click 'Create New Post' to begin.</p>
                ) : (
                posts.map((post) => (
                    <div key={post.id} className="bg-gray-50 border border-gray-100 p-6 rounded-xl flex flex-col justify-between gap-4 group hover:border-sky-200 transition-colors">
                        <div>
                            <h3 className="font-bold text-lg line-clamp-2 leading-snug hover:text-red-600 transition-colors cursor-pointer mb-2" onClick={() => router.push(`/blog/${post.slug}`)}>
                                {post.title}
                            </h3>
                            <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed whitespace-pre-line">
                                {post.content}
                            </p>
                        </div>
                        
                        <div className="flex items-center justify-between mt-2 pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                                <span className="text-xs text-gray-500 font-medium">Published</span>
                            </div>
                            <button 
                                onClick={() => handleEditStart(post)}
                                className="text-sm font-semibold text-black hover:text-sky-600 hover:underline opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                Edit Post
                            </button>
                        </div>
                    </div>
                ))
                )}
            </div>
        </div>
      </main>

      {/* ------------------------------------------------------------------ */}
      {/* POP-UP MODAL SECTION */}
      {/* ------------------------------------------------------------------ */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6 backdrop-blur-sm animate-fadeIn">
            {/* Modal Container */}
            <div className="bg-white rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 shadow-2xl relative animate-scaleIn">
                
                {/* Close Button */}
                <button 
                    onClick={handleCloseModal}
                    className="absolute top-6 right-6 text-gray-400 hover:text-red-600 text-2xl font-black transition-colors"
                >
                    &times;
                </button>
                
                <h2 className="text-3xl font-extrabold mb-10 pb-4 border-b border-gray-100 tracking-tight">
                    {isEditing ? `Edit Post: ${posts.find(p => p.id === editingPostId)?.title}` : 'Create New Post'}
                </h2>
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div>
                        <label className="block text-sm font-semibold mb-2">Post Title</label>
                        <input 
                        type="text" 
                        value={title}
                        onChange={handleTitleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
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
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-gray-50 text-gray-500 focus:outline-none"
                        placeholder="auto-generated-slug"
                        required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2">Content</label>
                        <textarea 
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 h-80 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 leading-relaxed font-mono text-sm"
                        placeholder="Write your brilliant ideas here..."
                        required
                        ></textarea>
                    </div>

                    <div className="flex gap-4 mt-4 pt-6 border-t border-gray-100">
                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="bg-black text-white font-semibold px-10 py-3.5 rounded-full hover:bg-gray-800 transition-colors disabled:bg-gray-400 flex-1 text-sm shadow-md"
                        >
                            {isLoading ? 'Processing...' : (isEditing ? 'Update Post' : 'Publish Post')}
                        </button>
                        <button 
                            type="button"
                            onClick={handleCloseModal}
                            className="bg-gray-100 text-gray-700 font-semibold px-10 py-3.5 rounded-full hover:bg-gray-200 transition-colors flex-1 text-sm"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )}

    </div>
  );
}