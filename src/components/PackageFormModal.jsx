import { useEffect, useState } from 'react';
import { toMinutes, toMegabytes, formatDuration, formatDataCap, formatPackageSummary } from '../utils/packages.js';

function durationToParts(minutes) {
  if (minutes % 1440 === 0 && minutes >= 1440) {
    return { value: minutes / 1440, unit: 'days' };
  }
  if (minutes % 60 === 0 && minutes >= 60) {
    return { value: minutes / 60, unit: 'hours' };
  }
  return { value: minutes || 60, unit: 'minutes' };
}

function dataToParts(mb) {
  if (mb && mb >= 1024 && mb % 1024 === 0) {
    return { value: mb / 1024, unit: 'GB' };
  }
  return { value: mb || 1, unit: 'MB' };
}

const defaultForm = () => ({
  name: '',
  type: 'TIME_BASED',
  priceXaf: 500,
  uploadSpeedMbPerSec: 1,
  browseDurationValue: 1,
  browseDurationUnit: 'hours',
  timeDataCapEnabled: false,
  timeDataCapValue: 1,
  timeDataCapUnit: 'GB',
  dataAllowanceValue: 1,
  dataAllowanceUnit: 'GB',
  expiryValue: 1,
  expiryUnit: 'days',
});

function buildPayload(form) {
  const uploadSpeedMbPerSec = Number(form.uploadSpeedMbPerSec) || 1;

  if (form.type === 'TIME_BASED') {
    const durationMinutes = toMinutes(form.browseDurationValue, form.browseDurationUnit);
    const dataCapMb = form.timeDataCapEnabled
      ? toMegabytes(form.timeDataCapValue, form.timeDataCapUnit)
      : null;

    return {
      name: form.name.trim(),
      type: 'TIME_BASED',
      durationMinutes,
      priceXaf: Number(form.priceXaf),
      dataCapMb,
      uploadSpeedMbPerSec,
    };
  }

  return {
    name: form.name.trim(),
    type: 'DATA_BASED',
    durationMinutes: toMinutes(form.expiryValue, form.expiryUnit),
    priceXaf: Number(form.priceXaf),
    dataCapMb: toMegabytes(form.dataAllowanceValue, form.dataAllowanceUnit),
    uploadSpeedMbPerSec,
  };
}

function validateForm(form) {
  if (!form.name?.trim()) return 'Package name is required';
  if (!form.priceXaf || Number(form.priceXaf) <= 0) return 'Price must be greater than 0';

  const uploadSpeed = Number(form.uploadSpeedMbPerSec);
  if (!uploadSpeed || uploadSpeed <= 0) return 'Upload speed must be greater than 0';
  if (uploadSpeed > 100) return 'Upload speed cannot exceed 100 MB/s';

  if (form.type === 'TIME_BASED') {
    const durationMinutes = toMinutes(form.browseDurationValue, form.browseDurationUnit);
    if (durationMinutes <= 0) return 'Browse duration must be greater than 0';
    if (form.timeDataCapEnabled) {
      const cap = toMegabytes(form.timeDataCapValue, form.timeDataCapUnit);
      if (cap <= 0) return 'Data cap must be greater than 0';
    }
  } else {
    const dataCapMb = toMegabytes(form.dataAllowanceValue, form.dataAllowanceUnit);
    const expiryMinutes = toMinutes(form.expiryValue, form.expiryUnit);
    if (dataCapMb <= 0) return 'Download allowance must be greater than 0';
    if (expiryMinutes <= 0) return 'Expiry period must be greater than 0';
  }

  return null;
}

export default function PackageFormModal({ open, onClose, onSubmit, initialPackage = null }) {
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!open) return;
    setError('');
    if (initialPackage) {
      const browse = durationToParts(initialPackage.durationMinutes);
      const data = dataToParts(initialPackage.dataCapMb);
      setForm({
        name: initialPackage.name,
        type: initialPackage.type || 'TIME_BASED',
        priceXaf: initialPackage.priceXaf,
        uploadSpeedMbPerSec: initialPackage.uploadSpeedMbPerSec ?? 1,
        browseDurationValue: browse.value,
        browseDurationUnit: browse.unit,
        timeDataCapEnabled: !!initialPackage.dataCapMb && initialPackage.type === 'TIME_BASED',
        timeDataCapValue: data.value,
        timeDataCapUnit: data.unit,
        dataAllowanceValue: initialPackage.type === 'DATA_BASED' ? data.value : 1,
        dataAllowanceUnit: initialPackage.type === 'DATA_BASED' ? data.unit : 'GB',
        expiryValue: initialPackage.type === 'DATA_BASED' ? durationToParts(initialPackage.durationMinutes).value : 1,
        expiryUnit: initialPackage.type === 'DATA_BASED' ? durationToParts(initialPackage.durationMinutes).unit : 'days',
      });
    } else {
      setForm(defaultForm());
    }
  }, [open, initialPackage]);

  const preview = (() => {
    const err = validateForm(form);
    if (err) return null;
    return formatPackageSummary(buildPayload(form));
  })();

  async function handleSubmit(e) {
    e.preventDefault();
    const err = validateForm(form);
    if (err) {
      setError(err);
      return;
    }
    setLoading(true);
    setError('');
    try {
      await onSubmit(buildPayload(form));
      onClose();
    } catch (submitErr) {
      setError(submitErr.response?.data?.error || 'Failed to save package');
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  const inputClass = 'w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand outline-none';
  const labelClass = 'block text-sm font-medium text-navy mb-1';
  const hintClass = 'text-xs text-navy/60 mt-1';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6">
        <h3 className="text-lg font-bold text-navy mb-1">
          {initialPackage ? 'Edit Package' : 'Create Package'}
        </h3>
        <p className="text-sm text-navy/60 mb-5 font-medium">
          Choose how subscribers pay for internet access at this location.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className={labelClass}>Package name</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. 1 Hour Browse, 2 GB Weekly"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Package type</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  value: 'TIME_BASED',
                  title: 'Time-based',
                  desc: 'Subscriber gets internet for a set browse time. Optional data cap.',
                },
                {
                  value: 'DATA_BASED',
                  title: 'Data-based',
                  desc: 'Subscriber gets a download allowance that must be used before expiry.',
                },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setForm({ ...form, type: option.value })}
                  className={`text-left p-4 rounded-xl border-2 transition-colors ${
                    form.type === option.value
                      ? 'border-brand bg-brand/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <p className="font-bold text-navy">{option.title}</p>
                  <p className="text-xs text-navy/60 mt-1 font-medium">{option.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={labelClass}>Price (XAF)</label>
            <input
              type="number"
              min={1}
              value={form.priceXaf}
              onChange={(e) => setForm({ ...form, priceXaf: e.target.value })}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Upload speed limit (MB/s)</label>
            <input
              type="number"
              min={1}
              max={100}
              step={1}
              value={form.uploadSpeedMbPerSec}
              onChange={(e) => setForm({ ...form, uploadSpeedMbPerSec: e.target.value })}
              required
              className={inputClass}
            />
            <p className={hintClass}>
              Maximum upload speed per subscriber. Default is 1 MB/s.
            </p>
          </div>

          {form.type === 'TIME_BASED' && (
            <>
              <div>
                <label className={labelClass}>Browse duration</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min={1}
                    value={form.browseDurationValue}
                    onChange={(e) => setForm({ ...form, browseDurationValue: e.target.value })}
                    className={`${inputClass} flex-1`}
                  />
                  <select
                    value={form.browseDurationUnit}
                    onChange={(e) => setForm({ ...form, browseDurationUnit: e.target.value })}
                    className={`${inputClass} w-36`}
                  >
                    <option value="minutes">Minutes</option>
                    <option value="hours">Hours</option>
                    <option value="days">Days</option>
                  </select>
                </div>
                <p className={hintClass}>
                  How long the subscriber stays connected after payment.
                  {form.browseDurationValue
                    ? ` · ${formatDuration(toMinutes(form.browseDurationValue, form.browseDurationUnit))}`
                    : ''}
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 p-4 space-y-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.timeDataCapEnabled}
                    onChange={(e) => setForm({ ...form, timeDataCapEnabled: e.target.checked })}
                    className="rounded border-gray-300 text-brand focus:ring-brand"
                  />
                  <span className="text-sm font-medium text-navy">Limit data during browse session</span>
                </label>
                {form.timeDataCapEnabled && (
                  <div className="flex gap-2">
                    <input
                      type="number"
                      min={1}
                      value={form.timeDataCapValue}
                      onChange={(e) => setForm({ ...form, timeDataCapValue: e.target.value })}
                      className={`${inputClass} flex-1`}
                    />
                    <select
                      value={form.timeDataCapUnit}
                      onChange={(e) => setForm({ ...form, timeDataCapUnit: e.target.value })}
                      className={`${inputClass} w-28`}
                    >
                      <option value="MB">MB</option>
                      <option value="GB">GB</option>
                    </select>
                  </div>
                )}
                {!form.timeDataCapEnabled && (
                  <p className={hintClass}>Leave unchecked for unlimited data during the browse period.</p>
                )}
              </div>
            </>
          )}

          {form.type === 'DATA_BASED' && (
            <>
              <div>
                <label className={labelClass}>Download allowance</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min={1}
                    value={form.dataAllowanceValue}
                    onChange={(e) => setForm({ ...form, dataAllowanceValue: e.target.value })}
                    className={`${inputClass} flex-1`}
                  />
                  <select
                    value={form.dataAllowanceUnit}
                    onChange={(e) => setForm({ ...form, dataAllowanceUnit: e.target.value })}
                    className={`${inputClass} w-28`}
                  >
                    <option value="MB">MB</option>
                    <option value="GB">GB</option>
                  </select>
                </div>
                <p className={hintClass}>Total data the subscriber can download after payment.</p>
              </div>

              <div>
                <label className={labelClass}>Expiry period</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min={1}
                    value={form.expiryValue}
                    onChange={(e) => setForm({ ...form, expiryValue: e.target.value })}
                    className={`${inputClass} flex-1`}
                  />
                  <select
                    value={form.expiryUnit}
                    onChange={(e) => setForm({ ...form, expiryUnit: e.target.value })}
                    className={`${inputClass} w-36`}
                  >
                    <option value="minutes">Minutes</option>
                    <option value="hours">Hours</option>
                    <option value="days">Days</option>
                  </select>
                </div>
                <p className={hintClass}>
                  Unused data expires after this period.
                  {form.expiryValue
                    ? ` · ${formatDuration(toMinutes(form.expiryValue, form.expiryUnit))}`
                    : ''}
                </p>
              </div>
            </>
          )}

          {preview && (
            <div className="rounded-xl bg-gray-50 border border-gray-200 p-4">
              <p className="text-xs font-medium text-navy/60 uppercase tracking-wide">Preview</p>
              <p className="text-sm font-medium text-navy mt-1">{preview}</p>
            </div>
          )}

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-navy font-medium hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2.5 bg-brand text-white rounded-lg font-medium hover:bg-brand/90 disabled:opacity-50"
            >
              {loading ? 'Saving...' : initialPackage ? 'Save changes' : 'Create package'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
