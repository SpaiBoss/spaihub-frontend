import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../../services/api';
import { useContributorAuth } from '../../context/ContributorAuthContext';
import { Button, Input, Skeleton, Card } from '../../components/ui';

export default function ContributorSettings() {
  const { contributor, refreshProfile } = useContributorAuth();
  const [name, setName] = useState('');
  const [momoPhone, setMomoPhone] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (contributor) {
      setName(contributor.name || '');
      setMomoPhone(contributor.momoPhone || '');
    }
  }, [contributor]);

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    try {
      await api.patch('/api/contributor/me', { name, momoPhone });
      await refreshProfile();
      toast.success('Saved');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Save failed');
    } finally {
      setSaving(false);
    }
  }

  if (!contributor) return <Skeleton className="h-40 rounded-xl" />;

  return (
    <div className="space-y-4 max-w-lg">
      <div>
        <h1 className="text-xl font-semibold text-navy">Settings</h1>
        <p className="text-sm text-navy/50 mt-1">Profile and payout phone</p>
      </div>
      <Card className="p-6">
        <form onSubmit={handleSave} className="space-y-4">
          <p className="text-sm text-navy/55">
            Email: <span className="font-medium text-navy">{contributor.email}</span>
          </p>
          <Input label="Display name" value={name} onChange={(e) => setName(e.target.value)} required />
          <Input
            label="MoMo phone"
            value={momoPhone}
            onChange={(e) => setMomoPhone(e.target.value.replace(/\D/g, '').slice(0, 9))}
            placeholder="6XXXXXXXX"
          />
          <Button type="submit" disabled={saving}>
            {saving ? 'Saving...' : 'Save'}
          </Button>
        </form>
      </Card>
    </div>
  );
}
