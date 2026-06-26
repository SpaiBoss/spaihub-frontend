import { useState, useEffect } from 'react';
import { User, Mail, Shield, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { Card, Button, Input, StatusBadge } from '../../components/ui';
import PortalBrandingSettings from '../../components/PortalBrandingSettings';

export default function Settings() {
  const { currentOwner, updateOwner } = useAuth();
  const [name, setName] = useState(currentOwner?.name || '');
  const [savingName, setSavingName] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirm: '',
  });
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    if (currentOwner?.name) setName(currentOwner.name);
  }, [currentOwner?.name]);

  async function saveName(e) {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('Name is required');
      return;
    }
    setSavingName(true);
    try {
      const { data } = await api.patch('/api/owner/me', { name: name.trim() });
      updateOwner(data);
      toast.success('Profile updated');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to update profile');
    } finally {
      setSavingName(false);
    }
  }

  async function changePassword(e) {
    e.preventDefault();
    if (passwordForm.newPassword.length < 8) {
      toast.error('New password must be at least 8 characters');
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirm) {
      toast.error('New passwords do not match');
      return;
    }
    setChangingPassword(true);
    try {
      await api.post('/api/owner/change-password', {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      toast.success('Password updated');
      setPasswordForm({ currentPassword: '', newPassword: '', confirm: '' });
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to change password');
    } finally {
      setChangingPassword(false);
    }
  }

  return (
    <div className="space-y-8">
      <Card className="max-w-xl">
        <h3 className="font-semibold text-navy mb-1">Account</h3>
        <p className="text-sm text-navy/50 mb-6">Your profile information</p>
        <div className="space-y-5 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center shrink-0">
              <Mail className="w-4 h-4 text-brand" />
            </div>
            <div>
              <p className="text-xs font-semibold text-navy/50 uppercase tracking-wide">Email address</p>
              <p className="font-medium text-navy mt-0.5">{currentOwner?.email || '—'}</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center shrink-0">
              <Shield className="w-4 h-4 text-brand" />
            </div>
            <div>
              <p className="text-xs font-semibold text-navy/50 uppercase tracking-wide">Account status</p>
              <div className="mt-1">
                <StatusBadge status={currentOwner?.status || 'PENDING'} />
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={saveName} className="space-y-4 border-t border-gray-100 pt-6">
          <div className="flex items-center gap-2 mb-2">
            <User className="w-4 h-4 text-brand" />
            <h4 className="font-semibold text-navy">Display name</h4>
          </div>
          <Input
            label="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Button type="submit" disabled={savingName}>
            {savingName ? 'Saving...' : 'Save name'}
          </Button>
        </form>
      </Card>

      <Card className="max-w-xl">
        <div className="flex items-center gap-2 mb-1">
          <Lock className="w-4 h-4 text-brand" />
          <h3 className="font-semibold text-navy">Change password</h3>
        </div>
        <p className="text-sm text-navy/50 mb-6">Use at least 8 characters</p>
        <form onSubmit={changePassword} className="space-y-4">
          <Input
            label="Current password"
            type="password"
            value={passwordForm.currentPassword}
            onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
            required
          />
          <Input
            label="New password"
            type="password"
            value={passwordForm.newPassword}
            onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
            required
            minLength={8}
          />
          <Input
            label="Confirm new password"
            type="password"
            value={passwordForm.confirm}
            onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
            required
          />
          <Button type="submit" disabled={changingPassword}>
            {changingPassword ? 'Updating...' : 'Update password'}
          </Button>
        </form>
      </Card>

      <PortalBrandingSettings />
    </div>
  );
}
