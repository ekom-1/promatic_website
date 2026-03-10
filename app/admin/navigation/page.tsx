'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, Plus, Edit, Trash2, GripVertical, Save } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface MenuItem {
  label: string;
  url: string;
  order: number;
}

export default function NavigationEditor() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [activeMenu, setActiveMenu] = useState<'header' | 'footer'>('header');

  const [headerMenu, setHeaderMenu] = useState<MenuItem[]>([]);
  const [footerMenu, setFooterMenu] = useState<MenuItem[]>([]);

  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState({ label: '', url: '', order: 0 });

  useEffect(() => {
    checkAuth();
    fetchMenus();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
    }
  };

  const fetchMenus = async () => {
    try {
      const { data: headerData } = await supabase
        .from('navigation_menus')
        .select('menu_items')
        .eq('menu_name', 'header')
        .single();

      const { data: footerData } = await supabase
        .from('navigation_menus')
        .select('menu_items')
        .eq('menu_name', 'footer')
        .single();

      if (headerData) setHeaderMenu(headerData.menu_items);
      if (footerData) setFooterMenu(footerData.menu_items);
    } catch (error) {
      console.error('Error fetching menus:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage('');

    try {
      await supabase
        .from('navigation_menus')
        .upsert({
          menu_name: 'header',
          menu_items: headerMenu,
          is_active: true,
          updated_at: new Date().toISOString()
        });

      await supabase
        .from('navigation_menus')
        .upsert({
          menu_name: 'footer',
          menu_items: footerMenu,
          is_active: true,
          updated_at: new Date().toISOString()
        });

      setSaveMessage('Navigation menus saved successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      console.error('Error saving menus:', error);
      setSaveMessage('Error saving menus. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddItem = () => {
    const currentMenu = activeMenu === 'header' ? headerMenu : footerMenu;
    const newItem = {
      label: formData.label,
      url: formData.url,
      order: currentMenu.length + 1
    };

    if (activeMenu === 'header') {
      setHeaderMenu([...headerMenu, newItem]);
    } else {
      setFooterMenu([...footerMenu, newItem]);
    }

    setShowModal(false);
    setFormData({ label: '', url: '', order: 0 });
  };

  const handleEditItem = () => {
    if (editingIndex === null) return;

    const updatedItem = {
      label: formData.label,
      url: formData.url,
      order: formData.order
    };

    if (activeMenu === 'header') {
      const updated = [...headerMenu];
      updated[editingIndex] = updatedItem;
      setHeaderMenu(updated);
    } else {
      const updated = [...footerMenu];
      updated[editingIndex] = updatedItem;
      setFooterMenu(updated);
    }

    setShowModal(false);
    setEditingItem(null);
    setEditingIndex(null);
    setFormData({ label: '', url: '', order: 0 });
  };

  const handleDeleteItem = (index: number) => {
    if (!confirm('Are you sure you want to delete this menu item?')) return;

    if (activeMenu === 'header') {
      setHeaderMenu(headerMenu.filter((_, i) => i !== index));
    } else {
      setFooterMenu(footerMenu.filter((_, i) => i !== index));
    }
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const currentMenu = activeMenu === 'header' ? [...headerMenu] : [...footerMenu];
    const newIndex = direction === 'up' ? index - 1 : index + 1;

    if (newIndex < 0 || newIndex >= currentMenu.length) return;

    [currentMenu[index], currentMenu[newIndex]] = [currentMenu[newIndex], currentMenu[index]];

    // Update order numbers
    currentMenu.forEach((item, i) => {
      item.order = i + 1;
    });

    if (activeMenu === 'header') {
      setHeaderMenu(currentMenu);
    } else {
      setFooterMenu(currentMenu);
    }
  };

  const openEditModal = (item: MenuItem, index: number) => {
    setEditingItem(item);
    setEditingIndex(index);
    setFormData({ label: item.label, url: item.url, order: item.order });
    setShowModal(true);
  };

  const openAddModal = () => {
    setEditingItem(null);
    setEditingIndex(null);
    setFormData({ label: '', url: '', order: 0 });
    setShowModal(true);
  };

  const currentMenu = activeMenu === 'header' ? headerMenu : footerMenu;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-primary">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Navigation Editor</h1>
            <p className="text-slate-400">Manage your website navigation menus</p>
          </div>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 bg-primary text-background-dark px-4 py-2 rounded-lg font-bold hover:brightness-110 transition-all shadow-[0_0_15px_rgba(57,255,20,0.4)] disabled:opacity-50"
          >
            <Save size={20} />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        {saveMessage && (
          <div className={`mb-6 p-4 rounded-lg ${
            saveMessage.includes('success')
              ? 'bg-primary/20 text-primary border border-primary/30'
              : 'bg-red-500/20 text-red-500 border border-red-500/30'
          }`}>
            {saveMessage}
          </div>
        )}

        {/* Menu Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveMenu('header')}
            className={`px-6 py-3 rounded-lg font-bold transition-all ${
              activeMenu === 'header'
                ? 'bg-primary text-background-dark shadow-[0_0_15px_rgba(57,255,20,0.4)]'
                : 'bg-white/5 text-slate-400 hover:bg-white/10'
            }`}
          >
            Header Menu
          </button>
          <button
            onClick={() => setActiveMenu('footer')}
            className={`px-6 py-3 rounded-lg font-bold transition-all ${
              activeMenu === 'footer'
                ? 'bg-primary text-background-dark shadow-[0_0_15px_rgba(57,255,20,0.4)]'
                : 'bg-white/5 text-slate-400 hover:bg-white/10'
            }`}
          >
            Footer Menu
          </button>
        </div>

        {/* Menu Items */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Menu className="text-primary size-6" />
              <h2 className="text-xl font-bold text-white">
                {activeMenu === 'header' ? 'Header' : 'Footer'} Menu Items
              </h2>
            </div>
            <button
              onClick={openAddModal}
              className="flex items-center gap-2 bg-primary text-background-dark px-4 py-2 rounded-lg font-bold hover:brightness-110 transition-all"
            >
              <Plus size={18} />
              Add Item
            </button>
          </div>

          <div className="space-y-3">
            {currentMenu.map((item, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-lg p-4 flex items-center gap-4 hover:border-primary/50 transition-all"
              >
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => moveItem(index, 'up')}
                    disabled={index === 0}
                    className="text-slate-400 hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    ▲
                  </button>
                  <button
                    onClick={() => moveItem(index, 'down')}
                    disabled={index === currentMenu.length - 1}
                    className="text-slate-400 hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    ▼
                  </button>
                </div>

                <GripVertical className="text-slate-600 size-5" />

                <div className="flex-1">
                  <div className="font-bold text-white">{item.label}</div>
                  <div className="text-sm text-slate-400">{item.url}</div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(item, index)}
                    className="p-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-all"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteItem(index)}
                    className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-500 rounded-lg transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}

            {currentMenu.length === 0 && (
              <div className="text-center py-12">
                <Menu className="mx-auto size-16 text-slate-600 mb-4" />
                <p className="text-slate-400">No menu items yet. Add your first item!</p>
              </div>
            )}
          </div>
        </div>

        {/* Preview */}
        <div className="mt-6 bg-white/5 border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Preview</h3>
          <div className="bg-black/40 rounded-lg p-4 flex gap-6 flex-wrap">
            {currentMenu.map((item, index) => (
              <a
                key={index}
                href={item.url}
                className="text-white hover:text-primary transition-colors font-medium"
                onClick={(e) => e.preventDefault()}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-white mb-6">
              {editingItem ? 'Edit Menu Item' : 'Add Menu Item'}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Label</label>
                <input
                  type="text"
                  required
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary outline-none"
                  placeholder="Home"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">URL</label>
                <input
                  type="text"
                  required
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary outline-none"
                  placeholder="/"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={editingItem ? handleEditItem : handleAddItem}
                  className="flex-1 bg-primary text-background-dark px-4 py-2 rounded-lg font-bold hover:brightness-110 transition-all shadow-[0_0_15px_rgba(57,255,20,0.4)]"
                >
                  {editingItem ? 'Update Item' : 'Add Item'}
                </button>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setEditingItem(null);
                    setEditingIndex(null);
                  }}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg font-medium transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
