import {
  MarketingCtaGroupLight,
  MarketingHeading,
  MarketingSection,
} from '../../components/marketing/MarketingPrimitives';
import { usePublicConfig, whatsappUrl } from '../../hooks/usePublicConfig';

export default function Contact() {
  const { contactWhatsApp } = usePublicConfig();
  const wa = whatsappUrl(contactWhatsApp, 'Hi — I want to talk about Spai-Hub for my hotspot.');

  return (
    <>
      <MarketingSection className="pt-14 sm:pt-20 pb-16 sm:pb-20">
        <MarketingHeading
          eyebrow="Contact"
          title="Talk to us on WhatsApp."
          subtitle="Setup questions, demos, and owner support — Cameroon hotspot operators first."
        />

        {wa ? (
          <div className="max-w-md space-y-4">
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-brand px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
            >
              Open WhatsApp chat
            </a>
            <p className="text-sm text-navy/50">
              Prefer email or a website visit?{' '}
              <a
                href="https://spaitrace.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand font-medium hover:text-brand-dark"
              >
                spaitrace.com
              </a>
            </p>
          </div>
        ) : (
          <div className="max-w-md space-y-4">
            <p className="text-sm text-navy/60 leading-relaxed">
              WhatsApp contact is not configured on this deployment yet. Reach the SpaiTrace team at{' '}
              <a
                href="https://spaitrace.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand font-medium hover:text-brand-dark"
              >
                spaitrace.com
              </a>{' '}
              or create an account to explore the product.
            </p>
            <MarketingCtaGroupLight />
          </div>
        )}
      </MarketingSection>
    </>
  );
}
