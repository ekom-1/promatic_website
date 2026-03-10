'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Palette, Save } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function DesignCustomizer() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const [themeSettings, setThemeSettings] = useState({
    primaryColor: '#39FF14',
    backgroundColor: '#0A0A0A',
    textColor: '#FFFFFF',
    secondaryColor: '#1a1a1a',
    accentColor: '#39FF14'
  });

  const [typography, setTypography] = useState({
    headingFont: 'Inter',
    bodyFont: 'Inter',
    fontSize: '16px',
    headingWeight: '700',
    bodyWeight: '400'
  });

  const [layout, setLayout] = useState({
    headerStyle: 'default',
    footerStyle: 'default',
    containerWidth: '1280px',
    spacing: 'normal'
  });

  useEffect(() => {
    checkAuth();
    fetchSettings();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
    }
  };

  const fetchSettings = async () => {
    try {
      const { data: themeData } = await supabase
        .from('site_settings')
        .select('setting_value')
        .eq('setting_key', 'theme')
        .single();

      const { data: typographyData } = await supabase
        .from('site_settings')
        .select('setting_value')
        .eq('setting_key', 'typography')
        .single();

      const { data: layoutData } = await supabase
        .from('site_settings')
        .select('setting_value')
        .eq('setting_key', 'layout')
        .single();

      if (themeData) setThemeSettings(themeData.setting_value);
      if (typographyData) setTypography(typographyData.setting_value);
      if (layoutData) setLayout(layoutData.setting_value);
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage('');

    try {
      // Update theme settings
      await supabase
        .from('site_settings')
        .upsert({
          setting_key: 'theme',
          setting_value: themeSettings,
          updated_at: new Date().toISOString()
        });

      // Update typography settings
      await supabase
        .from('site_settings')
        .upsert({
          setting_key: 'typography',
          setting_value: typography,
          updated_at: new Date().toISOString()
        });

      // Update layout settings
      await supabase
        .from('site_settings')
        .upsert({
          setting_key: 'layout',
          setting_value: layout,
          updated_at: new Date().toISOString()
        });

      setSaveMessage('Design settings saved successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
      setSaveMessage('Error saving settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

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
            <h1 className="text-3xl font-bold text-white mb-2">Design Customizer</h1>
            <p className="text-slate-400">Customize your website's appearance</p>
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

        <div className="space-y-6">
          {/* Theme Colors */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Palette className="text-primary size-6" />
              <h2 className="text-xl font-bold text-white">Theme Colors</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Primary Color</label>
                <div className="flex gap-3">
                  <input
                    type="color"
                    value={themeSettings.primaryColor}
                    onChange={(e) => setThemeSettings({ ...themeSettings, primaryColor: e.target.value })}
                    className="w-16 h-10 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={themeSettings.primaryColor}
                    onChange={(e) => setThemeSettings({ ...themeSettings, primaryColor: e.target.value })}
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Background Color</label>
                <div className="flex gap-3">
                  <input
                    type="color"
                    value={themeSettings.backgroundColor}
                    onChange={(e) => setThemeSettings({ ...themeSettings, backgroundColor: e.target.value })}
                    className="w-16 h-10 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={themeSettings.backgroundColor}
                    onChange={(e) => setThemeSettings({ ...themeSettings, backgroundColor: e.target.value })}
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Text Color</label>
                <div className="flex gap-3">
                  <input
                    type="color"
                    value={themeSettings.textColor}
                    onChange={(e) => setThemeSettings({ ...themeSettings, textColor: e.target.value })}
                    className="w-16 h-10 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={themeSettings.textColor}
                    onChange={(e) => setThemeSettings({ ...themeSettings, textColor: e.target.value })}
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Secondary Color</label>
                <div className="flex gap-3">
                  <input
                    type="color"
                    value={themeSettings.secondaryColor}
                    onChange={(e) => setThemeSettings({ ...themeSettings, secondaryColor: e.target.value })}
                    className="w-16 h-10 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={themeSettings.secondaryColor}
                    onChange={(e) => setThemeSettings({ ...themeSettings, secondaryColor: e.target.value })}
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Accent Color</label>
                <div className="flex gap-3">
                  <input
                    type="color"
                    value={themeSettings.accentColor}
                    onChange={(e) => setThemeSettings({ ...themeSettings, accentColor: e.target.value })}
                    className="w-16 h-10 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={themeSettings.accentColor}
                    onChange={(e) => setThemeSettings({ ...themeSettings, accentColor: e.target.value })}
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Typography */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Typography</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Heading Font</label>
                <select
                  value={typography.headingFont}
                  onChange={(e) => setTypography({ ...typography, headingFont: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary outline-none"
                >
                  <option value="Inter">Inter</option>
                  <option value="Roboto">Roboto</option>
                  <option value="Poppins">Poppins</option>
                  <option value="Montserrat">Montserrat</option>
                  <option value="Open Sans">Open Sans</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Body Font</label>
                <select
                  value={typography.bodyFont}
                  onChange={(e) => setTypography({ ...typography, bodyFont: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary outline-none"
                >
                  <option value="Inter">Inter</option>
                  <option value="Roboto">Roboto</option>
                  <option value="Poppins">Poppins</option>
                  <option value="Montserrat">Montserrat</option>
                  <option value="Open Sans">Open Sans</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Base Font Size</label>
                <select
                  value={typography.fontSize}
                  onChange={(e) => setTypography({ ...typography, fontSize: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary outline-none"
                >
                  <option value="14px">14px (Small)</option>
                  <option value="16px">16px (Normal)</option>
                  <option value="18px">18px (Large)</option>
                  <option value="20px">20px (Extra Large)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Heading Weight</label>
                <select
                  value={typography.headingWeight}
                  onChange={(e) => setTypography({ ...typography, headingWeight: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary outline-none"
                >
                  <option value="400">400 (Normal)</option>
                  <option value="500">500 (Medium)</option>
                  <option value="600">600 (Semi Bold)</option>
                  <option value="700">700 (Bold)</option>
                  <option value="800">800 (Extra Bold)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Body Weight</label>
                <select
                  value={typography.bodyWeight}
                  onChange={(e) => setTypography({ ...typography, bodyWeight: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary outline-none"
                >
                  <option value="300">300 (Light)</option>
                  <option value="400">400 (Normal)</option>
                  <option value="500">500 (Medium)</option>
                  <option value="600">600 (Semi Bold)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Layout */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Layout Settings</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Header Style</label>
                <select
                  value={layout.headerStyle}
                  onChange={(e) => setLayout({ ...layout, headerStyle: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary outline-none"
                >
                  <option value="default">Default</option>
                  <option value="minimal">Minimal</option>
                  <option value="centered">Centered</option>
                  <option value="sticky">Sticky</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Footer Style</label>
                <select
                  value={layout.footerStyle}
                  onChange={(e) => setLayout({ ...layout, footerStyle: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary outline-none"
                >
                  <option value="default">Default</option>
                  <option value="minimal">Minimal</option>
                  <option value="expanded">Expanded</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Container Width</label>
                <select
                  value={layout.containerWidth}
                  onChange={(e) => setLayout({ ...layout, containerWidth: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary outline-none"
                >
                  <option value="1024px">1024px (Narrow)</option>
                  <option value="1280px">1280px (Normal)</option>
                  <option value="1536px">1536px (Wide)</option>
                  <option value="100%">100% (Full Width)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Spacing</label>
                <select
                  value={layout.spacing}
                  onChange={(e) => setLayout({ ...layout, spacing: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary outline-none"
                >
                  <option value="compact">Compact</option>
                  <option value="normal">Normal</option>
                  <option value="relaxed">Relaxed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Preview</h2>
            <div
              className="p-8 rounded-lg border-2"
              style={{
                backgroundColor: themeSettings.backgroundColor,
                borderColor: themeSettings.primaryColor,
                color: themeSettings.textColor
              }}
            >
              <h1
                style={{
                  fontFamily: typography.headingFont,
                  fontWeight: typography.headingWeight,
                  color: themeSettings.primaryColor
                }}
                className="text-4xl mb-4"
              >
                Heading Preview
              </h1>
              <p
                style={{
                  fontFamily: typography.bodyFont,
                  fontWeight: typography.bodyWeight,
                  fontSize: typography.fontSize
                }}
              >
                This is a preview of your body text. It will appear throughout your website with these settings.
              </p>
              <button
                style={{
                  backgroundColor: themeSettings.primaryColor,
                  color: themeSettings.backgroundColor
                }}
                className="mt-4 px-6 py-2 rounded-lg font-bold"
              >
                Button Preview
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
