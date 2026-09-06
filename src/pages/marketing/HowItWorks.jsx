import {
  FinalCta,
  MarketingHeading,
  MarketingSection,
} from '../../components/marketing/MarketingPrimitives';
import { usePublicConfig, whatsappUrl } from '../../hooks/usePublicConfig';

const STEPS = [
  {
    n: '01',
    title: 'Create your owner account',
    body: 'Register, verify email, and open the dashboard. No hardware required to explore packages and vouchers.',
  },
  {
    n: '02',
    title: 'Add a location and router',
    body: 'One location maps to one MikroTik. Copy the hotspot setup script once, then the SpaiHub connection script for heartbeat and commands.',
  },
  {
    n: '03',
    title: 'Publish packages or vouchers',
    body: 'Time-based browse, data-based download, shared device limits for families. Print PDF voucher sheets when you sell cash.',
  },
  {
    n: '04',
    title: 'Subscribers pay or redeem',
    body: 'Captive portal opens SpaiHub. MoMo via Campay or voucher code + PIN. Credentials grant access on the Hex.',
  },
  {
    n: '05',
    title: 'Withdraw to MoMo',
    body: 'Successful MoMo sales credit your wallet after the platform fee. Request a withdrawal to your MTN or Orange number.',
  },
];

export default function HowItWorks() {
  const { platformFeePercent, contactWhatsApp } = usePublicConfig();
  const wa = whatsappUrl(contactWhatsApp, 'Hi — I need help setting up Spai-Hub.');

  return (
    <>
      <MarketingSection className="pt-14 sm:pt-20 pb-6">
        <MarketingHeading
          eyebrow="How it works"
          title="From empty Hex to night sales."
          subtitle={`Owners connect MikroTik, sell access, and withdraw. Platform fee on MoMo sales is ${platformFeePercent}% — always shown from live config.`}
        />
      </MarketingSection>

      <MarketingSection className="pb-16 sm:pb-20">
        <ol className="space-y-0 border-l border-gray-200 ml-3 sm:ml-4">
          {STEPS.map((step) => (
            <li key={step.n} className="relative pl-8 sm:pl-10 pb-10 last:pb-0">
              <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-brand ring-4 ring-white" />
              <p className="font-mono text-xs font-semibold text-brand">{step.n}</p>
              <h3 className="mt-2 text-lg font-semibold text-navy">{step.title}</h3>
              <p className="mt-2 text-sm text-navy/55 leading-relaxed max-w-xl">{step.body}</p>
            </li>
          ))}
        </ol>
      </MarketingSection>

      <MarketingSection tone="muted" className="py-14 sm:py-16">
        <MarketingHeading
          title="Two scripts, not a new fleet."
          subtitle="Script 1 configures hotspot profiles and login.html. Script 2 keeps SpaiHub talking to the router every minute and every 15 seconds for commands. Re-run script 2 when we ship command acknowledgements."
        />
      </MarketingSection>

      <FinalCta
        title="Walk it with your own router."
        subtitle="Create an account and open Locations to copy the scripts."
        whatsappHref={wa}
      />
    </>
  );
}
