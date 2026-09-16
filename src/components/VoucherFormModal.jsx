import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toMinutes } from '../utils/packages';
import { Modal, Button } from './ui';

const defaultForm = () => ({
  locationId: '',
  packageId: '',
  quantity: 10,
  batchLabel: '',
  expiryValue: '',
  expiryUnit: 'days',
  hasExpiry: false,
});

export default function VoucherFormModal({ open, onClose, onSubmit, locations, packagesByLocation }) {
  const { t } = useTranslation('owner');
  const { t: tc } = useTranslation('common');
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [createdCodes, setCreatedCodes] = useState(null);

  const packages = form.locationId ? packagesByLocation[form.locationId] || [] : [];
  const activePackages = packages.filter((p) => p.isActive);

  useEffect(() => {
    if (!open) return;
    setForm(defaultForm());
    setError('');
    setCreatedCodes(null);
    const withPackages = locations.find((loc) =>
      (packagesByLocation[loc.id] || []).some((p) => p.isActive)
    );
    if (withPackages) {
      setForm((f) => ({ ...f, locationId: withPackages.id }));
    } else if (locations.length === 1) {
      setForm((f) => ({ ...f, locationId: locations[0].id }));
    }
  }, [open, locations, packagesByLocation]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.locationId) {
      setError(t('vouchers.selectLocationErr'));
      return;
    }
    if (!form.packageId) {
      setError(t('vouchers.selectPackageErr'));
      return;
    }

    setLoading(true);
    setError('');
    try {
      let expiresAt = null;
      if (form.hasExpiry && form.expiryValue) {
        const minutes = toMinutes(form.expiryValue, form.expiryUnit);
        expiresAt = new Date(Date.now() + minutes * 60 * 1000).toISOString();
      }

      const result = await onSubmit(form.locationId, {
        packageId: form.packageId,
        quantity: Number(form.quantity),
        batchLabel: form.batchLabel.trim() || undefined,
        expiresAt,
      });

      setCreatedCodes(result.vouchers.map((v) => v.code));
    } catch (err) {
      const apiError = err.response?.data?.error;
      if (apiError) {
        setError(apiError);
      } else if (err.response?.status === 404) {
        setError(t('vouchers.apiNotFound'));
      } else if (!err.response) {
        setError(t('vouchers.networkError'));
      } else {
        setError(t('vouchers.createFailed'));
      }
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={createdCodes ? t('vouchers.createdTitle') : t('vouchers.generate')}
      description={
        createdCodes
          ? t('vouchers.createdDesc', { count: createdCodes.length })
          : t('vouchers.createDesc')
      }
    >
        {createdCodes ? (
          <div>
            <div className="max-h-64 overflow-y-auto rounded-xl border border-gray-100 bg-surface-muted p-4 space-y-1.5">
              {createdCodes.map((code) => (
                <p key={code} className="font-mono text-sm font-semibold text-navy">{code}</p>
              ))}
            </div>
            <Button
              type="button"
              onClick={() => navigator.clipboard.writeText(createdCodes.join('\n'))}
              className="w-full mt-4"
            >
              {t('vouchers.copyAll')}
            </Button>
            <Button type="button" variant="secondary" onClick={onClose} className="w-full mt-2">
              {t('vouchers.done')}
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label-field">{t('vouchers.location')}</label>
              <select
                value={form.locationId}
                onChange={(e) => setForm({ ...form, locationId: e.target.value, packageId: '' })}
                className="select-field"
                required
              >
                <option value="">{t('vouchers.selectLocationPh')}</option>
                {locations.map((loc) => (
                  <option key={loc.id} value={loc.id}>{loc.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="label-field">{t('vouchers.package')}</label>
              <select
                value={form.packageId}
                onChange={(e) => setForm({ ...form, packageId: e.target.value })}
                className="select-field"
                required
                disabled={!form.locationId || activePackages.length === 0}
              >
                <option value="">{t('vouchers.selectPackagePh')}</option>
                {activePackages.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
              {form.locationId && activePackages.length === 0 && (
                <p className="text-xs text-amber-700 mt-1.5 font-medium">
                  {t('vouchers.noActivePackages')}
                </p>
              )}
            </div>

            <div>
              <label className="label-field">{t('vouchers.quantity')}</label>
              <input
                type="number"
                min={1}
                max={500}
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                className="input-field"
                required
              />
              <p className="text-xs text-navy/50 mt-1.5">{t('vouchers.quantityHint')}</p>
            </div>

            <div>
              <label className="label-field">{t('vouchers.batchLabel')}</label>
              <input
                value={form.batchLabel}
                onChange={(e) => setForm({ ...form, batchLabel: e.target.value })}
                placeholder={t('vouchers.batchPh')}
                className="input-field"
              />
            </div>

            <div className="rounded-xl border border-gray-100 bg-surface-muted/50 p-4 space-y-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.hasExpiry}
                  onChange={(e) => setForm({ ...form, hasExpiry: e.target.checked })}
                  className="rounded border-gray-300 text-brand focus:ring-brand"
                />
                <span className="text-sm font-medium text-navy">{t('vouchers.setExpiry')}</span>
              </label>
              {form.hasExpiry && (
                <div className="flex gap-2">
                  <input
                    type="number"
                    min={1}
                    value={form.expiryValue}
                    onChange={(e) => setForm({ ...form, expiryValue: e.target.value })}
                    className="input-field flex-1"
                  />
                  <select
                    value={form.expiryUnit}
                    onChange={(e) => setForm({ ...form, expiryUnit: e.target.value })}
                    className="select-field w-36"
                  >
                    <option value="minutes">{t('packages.minutes')}</option>
                    <option value="hours">{t('packages.hours')}</option>
                    <option value="days">{t('packages.days')}</option>
                  </select>
                </div>
              )}
              <p className="text-xs text-navy/50">{t('vouchers.expiryHint')}</p>
            </div>

            {error && <p className="text-sm text-red-600 font-medium">{error}</p>}

            <div className="flex gap-3 pt-2">
              <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
                {tc('actions.cancel')}
              </Button>
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? t('vouchers.generating') : t('vouchers.generate')}
              </Button>
            </div>
          </form>
        )}
    </Modal>
  );
}
