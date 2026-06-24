import { useState } from 'react';
import { Modal, Button } from './ui';

const LAYOUT_OPTIONS = [
  { value: 2, label: '2 per page', hint: 'Large tickets — best for handouts' },
  { value: 4, label: '4 per page', hint: '2 × 2 grid' },
  { value: 6, label: '6 per page', hint: '2 × 3 grid (recommended)' },
  { value: 8, label: '8 per page', hint: '2 × 4 grid' },
  { value: 10, label: '10 per page', hint: '2 × 5 grid' },
  { value: 12, label: '12 per page', hint: '3 × 4 grid — most compact' },
];

export default function VoucherPdfModal({ open, onClose, onExport, filters, loading: externalLoading }) {
  const [perPage, setPerPage] = useState(6);
  const [loading, setLoading] = useState(false);

  async function handleExport() {
    setLoading(true);
    try {
      await onExport(perPage);
      onClose();
    } finally {
      setLoading(false);
    }
  }

  const filterParts = [
    filters.status ? filters.status.toLowerCase() : 'all statuses',
    filters.locationId ? 'selected location' : 'all locations',
  ];

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Export print-ready PDF"
      description="Branded A4 voucher sheets with cut guides. Uses your current filters."
    >
      <div className="space-y-5">
        <div className="rounded-xl bg-surface-muted border border-gray-100 p-4 text-sm text-navy/70">
          <p className="font-medium text-navy mb-1">Included vouchers</p>
          <p>
            Exporting <span className="font-semibold">{filterParts[0]}</span> at{' '}
            <span className="font-semibold">{filterParts[1]}</span>. Up to 500 vouchers per PDF.
          </p>
          <p className="text-xs text-navy/50 mt-2">
            Tip: filter to <strong>Unused</strong> before printing fresh codes.
          </p>
        </div>

        <div>
          <label className="label-field">Vouchers per A4 page</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {LAYOUT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setPerPage(opt.value)}
                className={`text-left p-3 rounded-xl border-2 transition-all ${
                  perPage === opt.value
                    ? 'border-brand bg-brand/5'
                    : 'border-gray-100 hover:border-gray-200'
                }`}
              >
                <p className="text-sm font-bold text-navy">{opt.label}</p>
                <p className="text-xs text-navy/50 mt-0.5">{opt.hint}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-dashed border-gray-200 p-4 text-xs text-navy/60 space-y-1">
          <p className="font-semibold text-navy">Each ticket includes</p>
          <p>Spai-Hub branding · location · package · voucher code · redeem instructions</p>
        </div>

        <div className="flex gap-3 pt-1">
          <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleExport}
            disabled={loading || externalLoading}
            className="flex-1"
          >
            {loading ? 'Generating PDF...' : 'Download PDF'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
