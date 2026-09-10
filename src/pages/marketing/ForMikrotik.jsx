import { Link } from 'react-router-dom';
import {
  FinalCta,
  MarketingHeading,
  MarketingSection,
} from '../../components/marketing/MarketingPrimitives';
import { usePublicConfig, whatsappUrl } from '../../hooks/usePublicConfig';

export default function ForMikrotik() {
  const { contactWhatsApp } = usePublicConfig();
  const wa = whatsappUrl(contactWhatsApp, 'Hi — I need MikroTik setup help for Spai-Hub.');

  return (
    <>
      <MarketingSection className="pt-14 sm:pt-20 pb-10" dividerLabel="MikroTik">
        <MarketingHeading
          eyebrow="MikroTik"
          title="Built for RouterOS hotspots."
          subtitle="SpaiHub does not replace your Hex — it talks to it. Heartbeat keeps status fresh; commands grant and kick subscribers."
        />
        <Link to="/how-it-works" className="font-mono text-xs tracking-wide text-brand font-medium hover:text-brand-dark transition-colors">
          How setup works →
        </Link>
      </MarketingSection>

      <MarketingSection tone="muted" className="py-14 sm:py-16" dividerLabel="Scripts">
        <div className="grid gap-10 sm:grid-cols-2">
          <div>
            <h3 className="mkt-display text-base text-navy">1. Hotspot setup (once)</h3>
            <p className="mt-2 text-sm text-navy/55 leading-relaxed">
              Existing hotspot overlay, or create a guest network (10.10.10.0/24) when needed — then walled garden,
              PAP, and branded login/status HTML.
            </p>
          </div>
          <div>
            <h3 className="mkt-display text-base text-navy">2. Connect to SpaiHub</h3>
            <p className="mt-2 text-sm text-navy/55 leading-relaxed">
              Schedulers for heartbeat (1m) and commands (15s). After import, the router acknowledges commands so
              grants do not get stuck as pending.
            </p>
          </div>
        </div>
      </MarketingSection>

      <MarketingSection className="py-14 sm:py-16">
        <MarketingHeading
          title="Online means the Hex is talking."
          subtitle="If subscribers pay but never get online, check /system scheduler print — you need both spaihub-heartbeat and spaihub-commands. Heartbeat alone is not enough."
        />
      </MarketingSection>

      <FinalCta
        title="Paste the scripts from your dashboard."
        subtitle="Locations → router → Setup. Physical MikroTik or CHR."
        whatsappHref={wa}
      />
    </>
  );
}
