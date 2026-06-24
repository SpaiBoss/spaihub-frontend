import { User, Mail, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/ui';
import PortalBrandingSettings from '../../components/PortalBrandingSettings';

export default function Settings() {
  const { currentOwner } = useAuth();

  const fields = [
    { icon: User, label: 'Full name', value: currentOwner?.name || '—' },
    { icon: Mail, label: 'Email address', value: currentOwner?.email || '—' },
    { icon: Shield, label: 'Account status', value: 'Active' },
  ];

  return (
    <div className="space-y-8">
      <Card className="max-w-xl">
        <h3 className="font-semibold text-navy mb-1">Account</h3>
        <p className="text-sm text-navy/50 mb-6">Your profile information</p>
        <div className="space-y-5">
          {fields.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-brand" />
              </div>
              <div>
                <p className="text-xs font-semibold text-navy/50 uppercase tracking-wide">{label}</p>
                <p className="font-medium text-navy mt-0.5">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <PortalBrandingSettings />
    </div>
  );
}
