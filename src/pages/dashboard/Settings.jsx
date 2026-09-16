import { useState, useEffect } from 'react';
import { User, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { Card, Button, Input, StatusBadge } from '../../components/ui';
import PortalBrandingSettings from '../../components/PortalBrandingSettings';

export default function Settings() {
  const { t } = useTranslation('owner');
  const { t: tc } = useTranslation('common');
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
      toast.error(tc('errors.nameRequired'));
      return;
    }
    setSavingName(true);
    try {
      const { data } = await api.patch('/api/owner/me', { name: name.trim() });
      updateOwner(data);
      toast.success(t('settings.updated'));
    } catch (err) {
      toast.error(err.response?.data?.error || t('settings.updateFailed'));
    } finally {
      setSavingName(false);
    }
  }

  async function changePassword(e) {
    e.preventDefault();
    if (passwordForm.newPassword.length < 8) {
      toast.error(t('settings.passwordTooShort'));
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirm) {
      toast.error(t('settings.passwordMismatch'));
      return;
    }
    setChangingPassword(true);
    try {
      await api.post('/api/owner/change-password', {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      toast.success(t('settings.passwordUpdated'));
      setPasswordForm({ currentPassword: '', newPassword: '', confirm: '' });
    } catch (err) {
      toast.error(err.response?.data?.error || t('settings.passwordFailed'));
    } finally {
      setChangingPassword(false);
    }
  }

  return (
    <div className="space-y-8">
      <Card className="max-w-xl">
        <h3 className="font-semibold text-navy mb-1">{t('settings.account')}</h3>
        <p className="text-sm text-navy/50 mb-6">{t('settings.profile')}</p>
        <div className="space-y-5 mb-8">
          <div className="flex items-start gap-4">
            <div>
              <p className="text-xs font-medium text-navy/50 tracking-wide">{t('settings.email')}</p>
              <p className="font-medium text-navy mt-0.5">{currentOwner?.email || '—'}</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div>
              <p className="text-xs font-medium text-navy/50 tracking-wide">{t('settings.accountStatus')}</p>
              <div className="mt-1">
                <StatusBadge status={currentOwner?.status || 'PENDING'} />
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={saveName} className="space-y-4 border-t border-gray-100 pt-6">
          <div className="flex items-center gap-2 mb-2">
            <User className="w-4 h-4 text-brand" />
            <h4 className="font-semibold text-navy">{t('settings.displayName')}</h4>
          </div>
          <Input
            label={t('settings.fullName')}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Button type="submit" disabled={savingName}>
            {savingName ? tc('actions.saving') : t('settings.saveName')}
          </Button>
        </form>
      </Card>

      <Card className="max-w-xl">
        <div className="flex items-center gap-2 mb-1">
          <Lock className="w-4 h-4 text-brand" />
          <h3 className="font-semibold text-navy">{t('settings.password')}</h3>
        </div>
        <p className="text-sm text-navy/50 mb-6">{t('settings.passwordHint')}</p>
        <form onSubmit={changePassword} className="space-y-4">
          <Input
            label={t('settings.current')}
            type="password"
            value={passwordForm.currentPassword}
            onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
            required
          />
          <Input
            label={t('settings.new')}
            type="password"
            value={passwordForm.newPassword}
            onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
            required
            minLength={8}
          />
          <Input
            label={t('settings.confirm')}
            type="password"
            value={passwordForm.confirm}
            onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
            required
          />
          <Button type="submit" disabled={changingPassword}>
            {changingPassword ? t('settings.updating') : t('settings.updatePassword')}
          </Button>
        </form>
      </Card>

      <PortalBrandingSettings />
    </div>
  );
}
