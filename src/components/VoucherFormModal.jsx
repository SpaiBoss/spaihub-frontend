import { useEffect, useState } from 'react';
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
      setError('Select a location');
      return;
    }
    if (!form.packageId) {
      setError('Select a package');
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
        setError('Voucher API not found. Restart the backend and try again.');
      } else if (!err.response) {
        setError('Cannot reach the API. Check that the backend is running on port 4000.');
      } else {
        setError('Failed to create vouchers');
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
      title={createdCodes ? 'Vouchers created' : 'Generate vouchers'}
      description={
        createdCodes
          ? `${createdCodes.length} code${createdCodes.length !== 1 ? 's' : ''} ready to distribute`
          : 'Create prepaid codes subscribers can redeem on the captive portal.'
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
              Copy all codes
            </Button>
            <Button type="button" variant="secondary" onClick={onClose} className="w-full mt-2">
              Done
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label-field">Location</label>
              <select
                value={form.locationId}
                onChange={(e) => setForm({ ...form, locationId: e.target.value, packageId: '' })}
                className="select-field"
                required
              >
                <option value="">Select location</option>
                {locations.map((loc) => (
                  <option key={loc.id} value={loc.id}>{loc.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="label-field">Package</label>
              <select
                value={form.packageId}
                onChange={(e) => setForm({ ...form, packageId: e.target.value })}
                className="select-field"
                required
                disabled={!form.locationId || activePackages.length === 0}
              >
                <option value="">Select package</option>
                {activePackages.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
              {form.locationId && activePackages.length === 0 && (
                <p className="text-xs text-amber-700 mt-1.5 font-medium">
                  This location has no active packages. Create one under Locations first.
                </p>
              )}
            </div>

            <div>
              <label className="label-field">Quantity</label>
              <input
                type="number"
                min={1}
                max={500}
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                className="input-field"
                required
              />
              <p className="text-xs text-navy/50 mt-1.5">Generate 1–500 unique codes at once.</p>
            </div>

            <div>
              <label className="label-field">Batch label (optional)</label>
              <input
                value={form.batchLabel}
                onChange={(e) => setForm({ ...form, batchLabel: e.target.value })}
                placeholder="e.g. March Promo, Event 2026"
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
                <span className="text-sm font-medium text-navy">Set redeem-by expiry</span>
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
                    <option value="minutes">Minutes</option>
                    <option value="hours">Hours</option>
                    <option value="days">Days</option>
                  </select>
                </div>
              )}
              <p className="text-xs text-navy/50">Codes must be redeemed before this period ends.</p>
            </div>

            {error && <p className="text-sm text-red-600 font-medium">{error}</p>}

            <div className="flex gap-3 pt-2">
              <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? 'Generating...' : 'Generate vouchers'}
              </Button>
            </div>
          </form>
        )}
    </Modal>
  );
}
