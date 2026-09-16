import { useEffect, useState, useRef } from 'react';
import { Upload, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import api from '../services/api';
import { resolveMediaUrl } from '../utils/mediaUrl';
import { Button, Card, Input } from './ui';
import PortalBrand, { PortalCredit } from './PortalBrand';

const DEFAULT_ACCENT = '#0F766E';

const DEFAULT_FORM = {
  portalBrandName: '',
  portalLogoUrl: '',
  portalAccentColor: '',
  portalWelcomeText: '',
  showPlatformCredit: true,
  portalShowUploadSpeed: false,
};

export default function PortalBrandingSettings() {
  const { t } = useTranslation('owner');
  const { t: tc } = useTranslation('common');
  const [form, setForm] = useState(DEFAULT_FORM);
  const [resolved, setResolved] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [logoPreviewKey, setLogoPreviewKey] = useState(0);
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
          portalShowUploadSpeed: data.portalShowUploadSpeed === true,
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
      toast.success(t('branding.saved'));
    } catch (err) {
      toast.error(err.response?.data?.error || t('branding.saveFailed'));
    } finally {
      setSaving(false);
    }
  }

  async function handleLogoFile(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 512 * 1024) {
      toast.error(t('branding.tooBig'));
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
      setLogoPreviewKey(Date.now());
      toast.success(t('branding.logoUploaded'));
    } catch (err) {
      toast.error(err.response?.data?.error || t('branding.logoUploadFailed'));
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
      setLogoPreviewKey(Date.now());
      toast.success(t('branding.logoRemoved'));
    } catch {
      toast.error(t('branding.logoRemoveFailed'));
    }
  }

  const previewBranding = {
    brandName: form.portalBrandName || null,
    logoUrl: resolveMediaUrl(resolved?.logoUrl) || resolveMediaUrl(form.portalLogoUrl),
    accentColor: form.portalAccentColor || null,
    welcomeText: form.portalWelcomeText || null,
  };

  const currentLogoSrc = previewBranding.logoUrl
    ? `${previewBranding.logoUrl}${previewBranding.logoUrl.includes('?') ? '&' : '?'}v=${logoPreviewKey}`
    : null;

  if (loading) {
    return <div className="animate-pulse bg-gray-200/80 rounded-lg h-64" />;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <div className="mb-6">
          <h3 className="font-semibold text-navy">{t('branding.pageTitle')}</h3>
          <p className="text-sm text-navy/50 mt-0.5">
            {t('branding.subtitle')}
          </p>
        </div>

        <div className="space-y-4">
          <Input
            label={t('branding.displayName')}
            placeholder={t('branding.brandNamePh')}
            value={form.portalBrandName}
            onChange={(e) => setForm({ ...form, portalBrandName: e.target.value })}
          />

          <Input
            label={t('branding.welcomeMessage')}
            placeholder={t('branding.welcomePh')}
            value={form.portalWelcomeText}
            onChange={(e) => setForm({ ...form, portalWelcomeText: e.target.value.slice(0, 160) })}
          />

          <div>
            <label className="label-field">{t('branding.accent')}</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={form.portalAccentColor || DEFAULT_ACCENT}
                onChange={(e) => setForm({ ...form, portalAccentColor: e.target.value })}
                className="h-11 w-14 rounded-lg border border-gray-300 cursor-pointer"
              />
              <input
                value={form.portalAccentColor}
                onChange={(e) => setForm({ ...form, portalAccentColor: e.target.value })}
                placeholder={DEFAULT_ACCENT}
                className="input-field flex-1 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="label-field">{t('branding.logo')}</label>
            <div className="flex flex-wrap gap-2 mb-2">
              <Button
                type="button"
                variant="secondary"
                className="gap-2"
                disabled={uploading}
                onClick={() => fileRef.current?.click()}
              >
                <Upload className="w-4 h-4" />
                {uploading ? t('branding.uploading') : t('branding.uploadImage')}
              </Button>
              {(form.portalLogoUrl || resolved?.logoUrl) && (
                <Button type="button" variant="secondary" className="gap-2" onClick={removeLogo}>
                  <Trash2 className="w-4 h-4" /> {tc('actions.remove')}
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
              placeholder={t('branding.logoUrlPh')}
              value={form.portalLogoUrl.startsWith('/uploads/') || form.portalLogoUrl.startsWith('http') ? '' : form.portalLogoUrl}
              onChange={(e) => setForm({ ...form, portalLogoUrl: e.target.value })}
            />
            {currentLogoSrc && (
              <img
                key={currentLogoSrc}
                src={currentLogoSrc}
                alt={t('branding.currentLogo')}
                className="mt-3 max-h-16 max-w-[200px] object-contain rounded border border-gray-200 p-2"
              />
            )}
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.portalShowUploadSpeed}
              onChange={(e) => setForm({ ...form, portalShowUploadSpeed: e.target.checked })}
              className="mt-1 rounded border-gray-300 text-brand focus:ring-brand"
            />
            <span>
              <span className="font-medium text-navy block">{t('branding.showSpeedPackages')}</span>
              <span className="text-sm text-navy/50">
                {t('branding.showSpeedHint')}
              </span>
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked
              onChange={() => toast(t('branding.credit'), { duration: 6000 })}
              className="mt-1 rounded border-gray-300 text-brand focus:ring-brand cursor-pointer"
            />
            <span>
              <span className="font-medium text-navy block">{t('branding.showCredit')}</span>
              <span className="text-sm text-navy/50">
                {t('branding.showCreditHint')}
              </span>
            </span>
          </label>

          <Button onClick={saveBranding} disabled={saving} className="w-full sm:w-auto">
            {saving ? tc('actions.saving') : t('branding.save')}
          </Button>
        </div>
      </Card>

      <Card>
        <h3 className="font-semibold text-navy mb-4">{t('branding.preview')}</h3>
        <div className="rounded-lg overflow-hidden border border-gray-200">
          <div
            className={previewBranding.accentColor ? 'px-4 pt-6 pb-12 text-center text-white' : 'bg-navy px-4 pt-6 pb-12 text-center text-white'}
            style={
              previewBranding.accentColor
                ? { backgroundColor: previewBranding.accentColor }
                : undefined
            }
          >
            <PortalBrand branding={{ ...previewBranding, logoUrl: currentLogoSrc }} theme="dark" textClassName="text-2xl" />
          </div>
          <div className="bg-white p-4 -mt-6 mx-3 mb-3 rounded-lg border border-gray-200">
            <p className="text-xs text-navy/45 font-medium tracking-wide">{t('branding.wifiHotspot')}</p>
            <p className="font-semibold text-navy mt-1">{t('branding.sampleLocation')}</p>
            <p className="text-sm text-navy/55 mt-1">
              {previewBranding.welcomeText || t('branding.defaultWelcome')}
            </p>
            <div
              className="mt-4 py-2.5 rounded-lg text-center text-white text-sm font-medium"
              style={{ backgroundColor: previewBranding.accentColor || DEFAULT_ACCENT }}
            >
              {t('branding.payMomo')}
            </div>
          </div>
        </div>
        <PortalCredit />
      </Card>
    </div>
  );
}
