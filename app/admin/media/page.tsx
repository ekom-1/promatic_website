'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Image as ImageIcon, Upload, Trash2, Search, Download, Copy } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function MediaLibrary() {
  const router = useRouter();
  const [media, setMedia] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    checkAuth();
    fetchMedia();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
    }
  };

  const fetchMedia = async () => {
    try {
      const { data, error } = await supabase
        .from('media_library')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMedia(data || []);
    } catch (error) {
      console.error('Error fetching media:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileName = `${Date.now()}-${file.name}`;

        // In a real implementation, you would upload to Supabase Storage
        // For now, we'll store the file info in the database
        const { error } = await supabase
          .from('media_library')
          .insert([{
            filename: fileName,
            original_name: file.name,
            file_path: `/uploads/${fileName}`, // This would be the actual storage path
            file_type: file.type,
            file_size: file.size,
            alt_text: '',
            caption: '',
            uploaded_by: 'admin'
          }]);

        if (error) throw error;

        setUploadProgress(((i + 1) / files.length) * 100);
      }

      fetchMedia();
      alert('Files uploaded successfully!');
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Error uploading files. Please try again.');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this media file?')) return;

    try {
      const { error } = await supabase
        .from('media_library')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchMedia();
    } catch (error) {
      console.error('Error deleting media:', error);
      alert('Error deleting media file.');
    }
  };

  const copyToClipboard = (path: string) => {
    navigator.clipboard.writeText(path);
    alert('File path copied to clipboard!');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const filteredMedia = media.filter(item => {
    const matchesSearch = item.original_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.alt_text?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || item.file_type.startsWith(filterType);
    return matchesSearch && matchesType;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-primary">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Media Library</h1>
            <p className="text-slate-400">Upload and manage your media files</p>
          </div>
          <label className="flex items-center gap-2 bg-primary text-background-dark px-4 py-2 rounded-lg font-bold hover:brightness-110 transition-all shadow-[0_0_15px_rgba(57,255,20,0.4)] cursor-pointer">
            <Upload size={20} />
            Upload Files
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              disabled={isUploading}
            />
          </label>
        </div>

        {/* Upload Progress */}
        {isUploading && (
          <div className="mb-6 bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-300">Uploading...</span>
              <span className="text-sm text-primary font-bold">{Math.round(uploadProgress)}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-5" />
            <input
              type="text"
              placeholder="Search media..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:ring-2 focus:ring-primary outline-none"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-primary outline-none"
          >
            <option value="all">All Types</option>
            <option value="image">Images</option>
            <option value="video">Videos</option>
            <option value="application">Documents</option>
          </select>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="text-2xl font-bold text-white">{media.length}</div>
            <div className="text-sm text-slate-400">Total Files</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="text-2xl font-bold text-white">
              {media.filter(m => m.file_type.startsWith('image')).length}
            </div>
            <div className="text-sm text-slate-400">Images</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="text-2xl font-bold text-white">
              {formatFileSize(media.reduce((acc, m) => acc + m.file_size, 0))}
            </div>
            <div className="text-sm text-slate-400">Total Size</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="text-2xl font-bold text-white">
              {media.filter(m => new Date(m.created_at).toDateString() === new Date().toDateString()).length}
            </div>
            <div className="text-sm text-slate-400">Uploaded Today</div>
          </div>
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-primary/50 transition-all group"
            >
              <div className="aspect-square bg-white/5 flex items-center justify-center relative">
                {item.file_type.startsWith('image') ? (
                  <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                    <ImageIcon className="text-slate-600 size-12" />
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <ImageIcon className="text-slate-600 size-12" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => copyToClipboard(item.file_path)}
                    className="p-2 bg-primary text-background-dark rounded-lg hover:brightness-110 transition-all"
                    title="Copy path"
                  >
                    <Copy size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 bg-red-500 text-white rounded-lg hover:brightness-110 transition-all"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-white truncate" title={item.original_name}>
                  {item.original_name}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-slate-500">{formatFileSize(item.file_size)}</span>
                  <span className="text-xs text-slate-500">
                    {new Date(item.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMedia.length === 0 && (
          <div className="text-center py-12">
            <ImageIcon className="mx-auto size-16 text-slate-600 mb-4" />
            <p className="text-slate-400">No media files found. Upload your first file!</p>
          </div>
        )}
      </div>
    </div>
  );
}
