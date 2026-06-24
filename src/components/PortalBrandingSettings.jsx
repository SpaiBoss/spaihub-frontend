import { useEffect, useState, useRef } from 'react';
import { Palette, Upload, Trash2, Eye } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../services/api';
import { Button, Card, Input } from './ui';
import PortalBrand, { PortalCredit } from './PortalBrand';

const DEFAULT_FORM = {
  portalBrandName: '',
  portalLogoUrl: '',
  portalAccentColor: '',
  portalWelcomeText: '',
  showPlatformCredit: true,
};

const PLATFORM_CREDIT_MESSAGE =
  'White-label removal requires a custom agreement. Contact us at spaitrace.com to negotiate.';

export default function PortalBrandingSettings() {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [resolved, setResolved] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);

  useEffect(() => {
    api
      .get('/api/owner/branding')
      .then(({ data }) => {
        setForm({
          portalBrandName: data.portalBrandName || '',
          portalLogoUrl: data.portalLogoUrl || '',
          portalAccentColor: data.portalAccentColor || '',
          portalWelcomeText: data.portalWelcomeText || '',
          showPlatformCredit: data.showPlatformCredit !== false,
        });
        setResolved(data.resolved);
      })
      .finally(() => setLoading(false));
  }, []);

  async function saveBranding() {
    setSaving(true);
    try {
      const { showPlatformCredit, ...payload } = form;
      const { data } = await api.patch('/api/owner/branding', {
        ...payload,
        showPlatformCredit: true,
      });
      setResolved(data.resolved);
      toast.success('Portal branding saved');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to save branding');
    } finally {
      setSaving(false);
    }
  }

  async function handleLogoFile(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 512 * 1024) {
      toast.error('Logo must be 512 KB or smaller');
      return;
    }

    setUploading(true);
    try {
      const dataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const { data } = await api.post('/api/owner/branding/logo', { dataUrl });
      setForm((prev) => ({ ...prev, portalLogoUrl: data.portalLogoUrl || '' }));
      setResolved(data.resolved);
      toast.success('Logo uploaded');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to upload logo');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  }

  async function removeLogo() {
    try {
      const { data } = await api.delete('/api/owner/branding/logo');
      setForm((prev) => ({ ...prev, portalLogoUrl: '' }));
      setResolved(data.resolved);
      toast.success('Logo removed');
    } catch {
      toast.error('Failed to remove logo');
    }
  }

  const previewBranding = {
    brandName: form.portalBrandName || null,
    logoUrl: resolved?.logoUrl || (form.portalLogoUrl?.startsWith('http') ? form.portalLogoUrl : null),
    accentColor: form.portalAccentColor || null,
    welcomeText: form.portalWelcomeText || null,
  };

  if (loading) {
    return <div className="animate-pulse bg-gray-200/80 rounded-2xl h-64" />;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <div className="flex items-start gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center shrink-0">
            <Palette className="w-4 h-4 text-brand" />
          </div>
          <div>
            <h3 className="font-semibold text-navy">Captive portal branding</h3>
            <p className="text-sm text-navy/50 mt-0.5">
              Customize what subscribers see when they connect. Leave blank to use Spai-Hub defaults.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <Input
            label="Display name"
            placeholder="e.g. Mbingfibieh WiFi"
            value={form.portalBrandName}
            onChange={(e) => setForm({ ...form, portalBrandName: e.target.value })}
          />

          <Input
            label="Welcome message"
            placeholder="Pay with MoMo to get online instantly"
            value={form.portalWelcomeText}
            onChange={(e) => setForm({ ...form, portalWelcomeText: e.target.value.slice(0, 160) })}
          />

          <div>
            <label className="label-field">Accent color</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={form.portalAccentColor || '#5463FF'}
                onChange={(e) => setForm({ ...form, portalAccentColor: e.target.value })}
                className="h-11 w-14 rounded-lg border border-gray-200 cursor-pointer"
              />
              <input
                value={form.portalAccentColor}
                onChange={(e) => setForm({ ...form, portalAccentColor: e.target.value })}
                placeholder="#5463FF"
                className="input-field flex-1 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="label-field">Logo</label>
            <div className="flex flex-wrap gap-2 mb-2">
              <Button
                type="button"
                variant="secondary"
                className="gap-2"
                disabled={uploading}
                onClick={() => fileRef.current?.click()}
              >
                <Upload className="w-4 h-4" />
                {uploading ? 'Uploading...' : 'Upload image'}
              </Button>
              {(form.portalLogoUrl || resolved?.logoUrl) && (
                <Button type="button" variant="secondary" className="gap-2" onClick={removeLogo}>
                  <Trash2 className="w-4 h-4" /> Remove
                </Button>
              )}
              <input
                ref={fileRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={handleLogoFile}
              />
            </div>
            <Input
              placeholder="Or paste logo URL (https://...)"
              value={form.portalLogoUrl.startsWith('/uploads/') ? '' : form.portalLogoUrl}
              onChange={(e) => setForm({ ...form, portalLogoUrl: e.target.value })}
            />
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked
              onChange={() => toast(PLATFORM_CREDIT_MESSAGE, { icon: 'ℹ️', duration: 6000 })}
              className="mt-1 rounded border-gray-300 text-brand focus:ring-brand cursor-pointer"
            />
            <span>
              <span className="font-medium text-navy block">Show &quot;Powered by spaitrace.com&quot;</span>
              <span className="text-sm text-navy/50">
                Always shown on the captive portal. Uncheck to contact us about white-label options.
              </span>
            </span>
          </label>

          <Button onClick={saveBranding} disabled={saving} className="w-full sm:w-auto">
            {saving ? 'Saving...' : 'Save branding'}
          </Button>
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-2 mb-4">
          <Eye className="w-4 h-4 text-brand" />
          <h3 className="font-semibold text-navy">Preview</h3>
        </div>
        <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
          <div
            className={previewBranding.accentColor ? 'px-4 pt-6 pb-12 text-center text-white' : 'bg-brand-gradient px-4 pt-6 pb-12 text-center text-white'}
            style={
              previewBranding.accentColor
                ? { background: `linear-gradient(135deg, ${previewBranding.accentColor}, #1A3C5E)` }
                : undefined
            }
          >
            <PortalBrand branding={previewBranding} theme="dark" textClassName="text-2xl" />
          </div>
          <div className="bg-white p-4 -mt-6 mx-3 mb-3 rounded-xl shadow-sm border border-gray-100">
            <p className="text-xs text-brand font-semibold uppercase tracking-wide">WiFi Hotspot</p>
            <p className="font-bold text-navy mt-1">Sample Location</p>
            <p className="text-sm text-navy/55 mt-1">
              {previewBranding.welcomeText || 'Pay with Mobile Money to get online instantly'}
            </p>
            <div
              className="mt-4 py-2.5 rounded-lg text-center text-white text-sm font-semibold"
              style={{ backgroundColor: previewBranding.accentColor || '#5463FF' }}
            >
              Pay with MoMo
            </div>
          </div>
        </div>
        <PortalCredit />
      </Card>
    </div>
  );
}
