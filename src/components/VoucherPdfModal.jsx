import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Modal, Button } from './ui';

const LAYOUT_VALUES = [2, 4, 6, 8, 10, 12];

export default function VoucherPdfModal({ open, onClose, onExport, filters, branding, loading: externalLoading }) {
  const { t } = useTranslation('owner');
  const { t: tc } = useTranslation('common');
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

  const statusLabel = filters.status ? tc(`status.${filters.status}`) : t('vouchers.includedAllStatuses');
  const locationLabel = filters.locationId
    ? t('vouchers.includedSelectedLocation')
    : t('vouchers.includedAllLocations');

  const brandLabel = branding?.brandName || t('vouchers.hotspotBrand');
  const accent = branding?.accentColor || '#0F766E';

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={t('vouchers.pdfTitle')}
      description={t('vouchers.pdfDesc')}
    >
      <div className="space-y-5">
        <div
          className="rounded-xl border p-4 text-sm"
          style={{ borderColor: `${accent}33`, backgroundColor: `${accent}08` }}
        >
          <p className="font-semibold text-navy mb-1">{t('vouchers.brandingPreview')}</p>
          <p className="text-navy/70">
            <Trans
              i18nKey="vouchers.ticketsWillUse"
              ns="owner"
              values={{
                name: brandLabel,
                logo: branding?.logoUrl ? t('vouchers.withLogo') : '',
                accent: branding?.accentColor ? t('vouchers.andAccent') : '',
              }}
              components={{ brand: <span className="font-semibold text-navy" /> }}
            />
          </p>
          <p className="text-xs text-navy/50 mt-2">
            {t('vouchers.customizeBranding')}
          </p>
        </div>

        <div className="rounded-xl bg-surface-muted border border-gray-100 p-4 text-sm text-navy/70">
          <p className="font-medium text-navy mb-1">{t('vouchers.included')}</p>
          <p>
            <Trans
              i18nKey="vouchers.exportingIncluded"
              ns="owner"
              values={{ status: statusLabel, location: locationLabel }}
              components={{
                status: <span className="font-semibold" />,
                location: <span className="font-semibold" />,
              }}
            />
          </p>
          <p className="text-xs text-navy/50 mt-2">
            <Trans i18nKey="vouchers.pdfTip" ns="owner" components={{ strong: <strong /> }} />
          </p>
        </div>

        <div>
          <label className="label-field">{t('vouchers.perPage')}</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {LAYOUT_VALUES.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setPerPage(value)}
                className={`text-left p-3 rounded-xl border-2 transition-all ${
                  perPage === value
                    ? 'border-brand bg-brand/5'
                    : 'border-gray-100 hover:border-gray-200'
                }`}
              >
                <p className="text-sm font-bold text-navy">{t(`vouchers.layout${value}`)}</p>
                <p className="text-xs text-navy/50 mt-0.5">{t(`vouchers.layout${value}Hint`)}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-dashed border-gray-200 p-4 text-xs text-navy/60 space-y-1">
          <p className="font-semibold text-navy">{t('vouchers.eachTicket')}</p>
          <p>{t('vouchers.ticketContents')}</p>
          <p className="text-navy/45">{t('vouchers.footerCredit', { credit: tc('poweredBy') })}</p>
        </div>

        <div className="flex gap-3 pt-1">
          <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
            {tc('actions.cancel')}
          </Button>
          <Button
            type="button"
            onClick={handleExport}
            disabled={loading || externalLoading}
            className="flex-1"
          >
            {loading ? t('vouchers.generatingPdf') : t('vouchers.downloadPdf')}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
