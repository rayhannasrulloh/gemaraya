// src/app/admin/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

// PENTING: Import React Quill secara dinamis untuk menghindari error SSR di Next.js
const ReactQuill = dynamic(() => import('react-quill-new'), { 
  ssr: false,
  loading: () => <p className="text-gray-400 p-4 border border-gray-200 rounded-lg">Loading Editor...</p> 
});
import 'react-quill-new/dist/quill.snow.css'; // Import style bawaan Quill (Tema Snow)

interface PostItem {
  id: string;
  title: string;
  slug: string;
  is_published: boolean;
  content: string;
}

interface MediaItem {
  name: string;
  url: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  
  // Navigation State
  const [activeTab, setActiveTab] = useState<'posts' | 'media'>('posts');

  // --- POSTS STATE ---
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState(''); // Sekarang menyimpan HTML, bukan teks biasa
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isEditing = editingPostId !== null;

  // --- MEDIA STATE ---
  const [mediaFiles, setMediaFiles] = useState<MediaItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);

// --- AUTHENTICATION CHECK ---
  useEffect(() => {
    checkUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function checkUser() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      // Jika tidak ada sesi (belum login), tendang kembali ke halaman login
      router.push('/login');
    } else {
      // Jika sudah login, baru ambil data
      fetchPosts();
      fetchMedia();
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/login');
  }

  useEffect(() => {
    fetchPosts();
    fetchMedia();
  }, []);

  // ==========================================
  // LOGIKA MEDIA MANAGER (SUPABASE STORAGE)
  // ==========================================
  async function fetchMedia() {
    // Mengambil daftar file dari bucket 'media'
    const { data, error } = await supabase.storage.from('media').list();
    
    if (data) {
      // Mengubah daftar file menjadi URL publik
      const filesWithUrls = data
        .filter(file => file.name !== '.emptyFolderPlaceholder') // abaikan file sistem
        .map(file => {
          const { data: publicUrlData } = supabase.storage.from('media').getPublicUrl(file.name);
          return {
            name: file.name,
            url: publicUrlData.publicUrl
          };
        });
      setMediaFiles(filesWithUrls);
    }
    if (error) console.error('Error fetching media:', error.message);
  }

  async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    // Bikin nama file unik agar tidak tertimpa
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;

    const { error } = await supabase.storage.from('media').upload(fileName, file);

    if (error) {
      alert('Gagal mengunggah file: ' + error.message);
    } else {
      fetchMedia(); // Refresh daftar media
    }
    setIsUploading(false);
  }

  function copyToClipboard(url: string) {
    navigator.clipboard.writeText(url);
    alert('URL Gambar berhasil disalin! Kamu bisa Paste (Ctrl+V) URL ini di Editor Konten.');
  }

  // ==========================================
  // LOGIKA POSTS (CRUD ARTIKEL)
  // ==========================================
  async function fetchPosts() {
    const { data, error } = await supabase
      .from('posts')
      .select('id, title, slug, content, is_published')
      .order('created_at', { ascending: false });
    
    if (data) setPosts(data);
    if (error) console.error('Error fetching posts:', error.message);
  }

  function handleCreateStart() {
    setEditingPostId(null);
    setTitle('');
    setSlug('');
    setContent('');
    setIsModalOpen(true);
  }

  function handleEditStart(post: PostItem) {
    setEditingPostId(post.id);
    setTitle(post.title);
    setSlug(post.slug);
    setContent(post.content); // Quill otomatis merender format HTML ini
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setTimeout(() => {
        setEditingPostId(null);
        setTitle('');
        setSlug('');
        setContent('');
    }, 300);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsLoading(true);
    let error = null;

    if (isEditing) {
      const { error: updateError } = await supabase.from('posts').update({ title, slug, content }).eq('id', editingPostId);
      error = updateError;
    } else {
      const { error: insertError } = await supabase.from('posts').insert([{ title, slug, content, is_published: true }]);
      error = insertError;
    }

    if (error) {
      alert(`Gagal menyimpan: ` + error.message);
    } else {
      handleCloseModal();
      fetchPosts();
    }
    setIsLoading(false);
  }

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newTitle = e.target.value;
    setTitle(newTitle);
    const generatedSlug = newTitle.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    setSlug(generatedSlug);
  }

  // Konfigurasi Toolbar untuk React Quill (Menambahkan tombol Image/Video)
  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'], // Tombol Media!
      ['clean']
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 text-black font-sans flex relative">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-black text-white p-6 hidden md:block">
        <h2 className="text-2xl font-black tracking-tight mb-10 cursor-pointer" onClick={() => router.push('/')}>GEMA RAYA.</h2>
        <nav className="flex flex-col gap-4 text-sm font-medium">
          <div 
            onClick={() => setActiveTab('posts')}
            className={`cursor-pointer transition-colors ${activeTab === 'posts' ? 'text-red-600' : 'text-gray-400 hover:text-white'}`}
          >
            Blog Posts
          </div>
          <div 
            onClick={() => setActiveTab('media')}
            className={`cursor-pointer transition-colors ${activeTab === 'media' ? 'text-sky-500' : 'text-gray-400 hover:text-white'}`}
          >
            Media Manager
          </div>
          <div className="text-gray-500 mt-8 mb-2 text-xs uppercase tracking-wider">Public Site</div>
          <div className="text-gray-400 hover:text-white cursor-pointer transition-colors" onClick={() => router.push('/blog')}>View Blog</div>
        </nav>

        {/* LOGOUT BUTTON AREA */}
        <div className="mt-auto pt-6 border-t border-gray-800">
          <button 
            onClick={handleLogout}
            className="text-gray-400 hover:text-red-500 transition-colors text-sm font-semibold flex items-center gap-2"
          >
            Log out
          </button>
        </div>

      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 max-w-6xl mx-auto overflow-y-auto h-screen">
        
        {/* TAB 1: POSTS MANAGER */}
        {activeTab === 'posts' && (
          <div className="animate-fadeIn">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
                <h1 className="text-3xl font-extrabold">Posts Management</h1>
                <button 
                    onClick={handleCreateStart}
                    className="bg-black text-white font-semibold px-6 py-2.5 rounded-full hover:bg-gray-800 transition-colors flex items-center gap-2 text-sm shadow-md"
                >
                    <span className="text-lg">+</span> Create Post
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <div key={post.id} className="bg-white border border-gray-200 p-6 rounded-2xl flex flex-col justify-between gap-4 group hover:border-black hover:shadow-lg transition-all">
                        <div>
                            <h3 className="font-bold text-lg line-clamp-2 leading-snug mb-2 group-hover:text-red-600 transition-colors cursor-pointer" onClick={() => router.push(`/blog/${post.slug}`)}>
                                {post.title}
                            </h3>
                            {/* Menghilangkan tag HTML saat ditampilkan sebagai preview di card */}
                            <div className="text-gray-500 text-sm line-clamp-3 leading-relaxed" dangerouslySetInnerHTML={{ __html: post.content }} />
                        </div>
                        <div className="flex items-center justify-between mt-2 pt-4 border-t border-gray-100">
                            <span className="text-xs font-bold text-sky-500 bg-sky-50 px-2 py-1 rounded">Published</span>
                            <button onClick={() => handleEditStart(post)} className="text-sm font-semibold text-black hover:underline">Edit</button>
                        </div>
                    </div>
                ))}
            </div>
          </div>
        )}

        {/* TAB 2: MEDIA MANAGER */}
        {activeTab === 'media' && (
          <div className="animate-fadeIn">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
                <h1 className="text-3xl font-extrabold">Media Manager</h1>
                
                {/* Upload Button */}
                <label className="bg-sky-500 text-white font-semibold px-6 py-2.5 rounded-full hover:bg-sky-600 transition-colors cursor-pointer flex items-center gap-2 text-sm shadow-md">
                    {isUploading ? 'Uploading...' : 'Upload Image'}
                    <input type="file" accept="image/*,video/*" className="hidden" onChange={handleFileUpload} disabled={isUploading} />
                </label>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {mediaFiles.length === 0 ? (
                  <p className="text-gray-500 col-span-full py-10">Belum ada media. Silakan upload gambar pertama kamu.</p>
                ) : (
                  mediaFiles.map((media) => (
                      <div key={media.name} className="bg-white border border-gray-200 rounded-xl overflow-hidden group">
                          <div className="h-40 bg-gray-100 relative">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={media.url} alt={media.name} className="w-full h-full object-cover" />
                              
                              {/* Overlay Copy Link */}
                              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                <button onClick={() => copyToClipboard(media.url)} className="bg-white text-black text-xs font-bold px-4 py-2 rounded-full hover:scale-105 transition-transform">
                                  Copy Image URL
                                </button>
                              </div>
                          </div>
                          <div className="p-3">
                              <p className="text-xs text-gray-500 truncate font-mono" title={media.name}>{media.name}</p>
                          </div>
                      </div>
                  ))
                )}
            </div>
          </div>
        )}
      </main>

      {/* ------------------------------------------------------------------ */}
      {/* POP-UP MODAL SECTION (POST EDITOR) */}
      {/* ------------------------------------------------------------------ */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 md:p-6 backdrop-blur-md animate-fadeIn">
            <div className="bg-white rounded-2xl p-6 md:p-8 max-w-5xl w-full max-h-[95vh] flex flex-col border border-gray-200 shadow-2xl relative animate-scaleIn">
                
                <button onClick={handleCloseModal} className="absolute top-6 right-6 text-gray-400 hover:text-red-600 text-3xl font-black transition-colors leading-none">&times;</button>
                
                <h2 className="text-2xl font-extrabold mb-6 pb-4 border-b border-gray-100">
                    {isEditing ? 'Edit Post' : 'Create New Post'}
                </h2>
                
                {/* Gunakan overflow-y-auto di sini agar form bisa di-scroll, sementara header modal tetap di atas */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-5 overflow-y-auto pr-2 pb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                          <label className="block text-sm font-semibold mb-2">Post Title</label>
                          <input type="text" value={title} onChange={handleTitleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none" placeholder="Enter title..." required />
                      </div>
                      <div>
                          <label className="block text-sm font-semibold mb-2">URL Slug</label>
                          <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-gray-50 text-gray-500 outline-none" placeholder="auto-generated-slug" required />
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col">
                        <label className="block text-sm font-semibold mb-2">Content (WYSIWYG Editor)</label>
                        {/* WADAH EDITOR REACT QUILL */}
                        <div className="bg-white rounded-lg overflow-hidden border border-gray-300 focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500 transition-all">
                          <ReactQuill 
                            theme="snow" 
                            value={content} 
                            onChange={setContent} 
                            modules={quillModules}
                            className="h-[400px] sm:h-[500px]" // Tinggi editor yang nyaman
                          />
                        </div>
                    </div>

                    <div className="flex gap-4 mt-12 pt-4 border-t border-gray-100 shrink-0">
                        <button type="submit" disabled={isLoading} className="bg-black text-white font-semibold px-8 py-3 rounded-full hover:bg-gray-800 transition-colors disabled:bg-gray-400 flex-1">
                            {isLoading ? 'Processing...' : (isEditing ? 'Update Post' : 'Publish Post')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )}

    </div>
  );
}