import { useEffect, useState, useCallback, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CheckCircle, Loader, Clock, Ticket, KeyRound, LogOut } from 'lucide-react';
import api from '../../services/api';
import { getPortalDeviceId, getPortalSubscriberPhone, savePortalSubscriberPhone, clearPortalSubscriberPhone } from '../../utils/portalDevice';
import { savePendingPayment, loadPendingPayment, clearPendingPayment } from '../../utils/portalPayment';
import PortalBrand, { PortalCredit } from '../../components/PortalBrand';
import LanguageToggle from '../../components/LanguageToggle';

function detectOperator(phone) {
  if (phone.startsWith('69')) return 'Orange';
  if (['65', '67', '68'].some((p) => phone.startsWith(p))) return 'MTN';
  return null;
}

function formatPortalDuration(t, minutes) {
  if (!minutes || minutes <= 0) return t('durZero');
  const days = Math.floor(minutes / 1440);
  const hours = Math.floor((minutes % 1440) / 60);
  const mins = minutes % 60;
  const parts = [];
  if (days) parts.push(t('durDay', { count: days }));
  if (hours) parts.push(t('durHour', { count: hours }));
  if (mins) parts.push(t('durMinute', { count: mins }));
  return parts.join(' ');
}

function formatPortalCap(t, mb) {
  if (!mb) return t('unlimited');
  if (mb >= 1024 && mb % 1024 === 0) return t('gb', { n: mb / 1024 });
  if (mb >= 1024) return t('gb', { n: Number((mb / 1024).toFixed(1)) });
  return t('mb', { n: mb });
}

function formatTranslatedPortalPackageSummary(t, pkg, { showUploadSpeed = false } = {}) {
  const extra = [
    showUploadSpeed ? t('uploadSpeed', { n: pkg.uploadSpeedMbPerSec ?? 1 }) : '',
    Number(pkg.maxSharedDevices) > 1 ? t('upToDevices', { n: pkg.maxSharedDevices }) : '',
  ].filter(Boolean);
  const extraStr = extra.length ? ` · ${extra.join(' · ')}` : '';
  if (pkg.type === 'DATA_BASED') {
    return t('pkgData', {
      cap: formatPortalCap(t, pkg.dataCapMb),
      duration: formatPortalDuration(t, pkg.durationMinutes),
    }) + extraStr;
  }
  return t('pkgTime', {
    duration: formatPortalDuration(t, pkg.durationMinutes),
  }) + extraStr;
}

function buildMikrotikLoginUrl(linkLogin, username, password) {
  if (!linkLogin || !username || !password) return null;
  try {
    const url = new URL(linkLogin, window.location.origin);
    url.searchParams.set('username', username);
    url.searchParams.set('password', password);
    return url.toString();
  } catch {
    const separator = linkLogin.includes('?') ? '&' : '?';
    return `${linkLogin}${separator}username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
  }
}

const AUTO_LOGIN_COOLDOWN_MS = 60_000;
/** Wait for Hex command poll (~15s) before recommending Connect. */
const ROUTER_IMPORT_WAIT_MS = 22_000;

function autoLoginStorageKey(routerToken) {
  return `spaihub_autologin_${routerToken}`;
}

function credentialsStorageKey(routerToken) {
  return `spaihub_wifi_creds_${routerToken}`;
}

function saveWifiCredentials(routerToken, username, pin, readyAt = Date.now() + ROUTER_IMPORT_WAIT_MS) {
  if (!routerToken || !username || !pin) return;
  try {
    sessionStorage.setItem(
      credentialsStorageKey(routerToken),
      JSON.stringify({ username, pin, readyAt })
    );
  } catch {
    // Ignore quota / private mode failures.
  }
}

function loadWifiCredentials(routerToken) {
  if (!routerToken) return null;
  try {
    const raw = sessionStorage.getItem(credentialsStorageKey(routerToken));
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.username || !parsed?.pin) return null;
    return parsed;
  } catch {
    return null;
  }
}

function clearWifiCredentials(routerToken) {
  try {
    sessionStorage.removeItem(credentialsStorageKey(routerToken));
  } catch {
    // ignore
  }
}

/** Navigate to MikroTik login on user tap; cooldown prevents portal ↔ router loops. */
function navigateToMikrotikLogin(linkLogin, username, pin, routerToken) {
  if (!linkLogin || !username || !pin || !routerToken) return false;
  const key = autoLoginStorageKey(routerToken);
  const lastAttempt = Number(sessionStorage.getItem(key) || 0);
  if (lastAttempt && Date.now() - lastAttempt < AUTO_LOGIN_COOLDOWN_MS) return false;

  const loginUrl = buildMikrotikLoginUrl(linkLogin, username, pin);
  if (!loginUrl) return false;

  sessionStorage.setItem(key, String(Date.now()));
  window.location.href = loginUrl;
  return true;
}

function Countdown({ endTime, onExpired }) {
  const { t } = useTranslation('portal');
  const [remaining, setRemaining] = useState('');

  useEffect(() => {
    const tick = () => {
      const diff = new Date(endTime) - Date.now();
      if (diff <= 0) {
        setRemaining(t('expired'));
        onExpired?.();
        return;
      }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setRemaining(t('remainingFmt', { h, m, s }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [endTime, onExpired, t]);

  return <span className="font-mono font-semibold">{remaining}</span>;
}

function PortalShell({ children, branding }) {
  const headerStyle = branding?.accentColor
    ? { backgroundColor: branding.accentColor }
    : undefined;

  return (
    <div className="min-h-[100dvh] bg-surface-muted flex flex-col">
      <header
        className={`shrink-0 px-4 pt-[max(1.5rem,env(safe-area-inset-top))] pb-20 text-center text-white ${
          branding?.accentColor ? '' : 'bg-navy'
        }`}
        style={headerStyle}
      >
        <div className="relative z-10 flex min-h-[5rem] items-center justify-center">
          <PortalBrand branding={branding} theme="dark" className="mx-auto" textClassName="text-2xl" />
          <div className="absolute right-0 top-0">
            <LanguageToggle compact className="text-white" />
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-md flex-1 px-4 -mt-14 pb-[max(2rem,env(safe-area-inset-bottom))]">
        {children}
        <PortalCredit />
      </main>
    </div>
  );
}

function PortalCard({ children, className = '' }) {
  return (
    <div className={`card card-body animate-slide-up overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

function CredentialsPanel({ username, pin, linkLogin, accentColor, routerToken, readyAt }) {
  const { t } = useTranslation('portal');
  const loginUrl = buildMikrotikLoginUrl(linkLogin, username, pin);
  const accentStyle = accentColor ? { backgroundColor: accentColor } : undefined;
  const [secondsLeft, setSecondsLeft] = useState(() => {
    if (!readyAt) return 0;
    return Math.max(0, Math.ceil((readyAt - Date.now()) / 1000));
  });
  const routerReady = secondsLeft <= 0;

  useEffect(() => {
    if (!readyAt) {
      setSecondsLeft(0);
      return undefined;
    }
    const tick = () => {
      setSecondsLeft(Math.max(0, Math.ceil((readyAt - Date.now()) / 1000)));
    };
    tick();
    const id = setInterval(tick, 250);
    return () => clearInterval(id);
  }, [readyAt]);

  function handleConnect(e) {
    e.preventDefault();
    const ok = navigateToMikrotikLogin(linkLogin, username, pin, routerToken);
    if (!ok && loginUrl) {
      // Cooldown or missing token — still allow manual navigation.
      window.location.href = loginUrl;
    }
  }

  return (
    <div className="mt-5 p-4 rounded-lg bg-surface-muted border border-gray-200 text-left">
      <div className="flex items-center gap-2 mb-3">
        <KeyRound className="w-4 h-4 text-brand" style={accentColor ? { color: accentColor } : undefined} />
        <p className="text-xs font-medium text-navy/50 tracking-wide">{t('saveThese')}</p>
      </div>
      <div className="space-y-2">
        <div>
          <p className="text-xs text-navy/45">{t('username')}</p>
          <p className="font-mono font-semibold text-navy break-all text-sm">{username}</p>
        </div>
        <div>
          <p className="text-xs text-navy/45">{t('pin')}</p>
          <p
            className="font-mono font-semibold text-brand text-lg tracking-widest"
            style={accentColor ? { color: accentColor } : undefined}
          >
            {pin}
          </p>
        </div>
      </div>
      {loginUrl ? (
        <>
          <button
            type="button"
            onClick={handleConnect}
            className="btn-primary w-full mt-4 py-3 text-center block text-sm"
            style={accentStyle}
          >
            {routerReady
              ? t('connectNow')
              : t('preparing', { s: secondsLeft })}
          </button>
          <p className="text-xs text-navy/50 mt-2">
            {routerReady
              ? t('connectFailHint')
              : t('waitImport')}
          </p>
        </>
      ) : (
        <p className="text-xs text-navy/50 mt-3">
          {t('connectFromCaptive')}
        </p>
      )}
    </div>
  );
}

const DEV_TEST_MAC = 'AA:BB:CC:DD:EE:01';
const PAYMENT_POLL_INTERVAL_MS = 2000;
const PAYMENT_SOFT_TIMEOUT_ATTEMPTS = 90;
const PORTAL_BOOTSTRAP_TIMEOUT_MS = 10_000;

function isAbortError(err) {
  return (
    err?.name === 'CanceledError' ||
    err?.name === 'AbortError' ||
    err?.code === 'ERR_CANCELED' ||
    err?.code === 'ECONNABORTED'
  );
}

function sessionFromPayment(data) {
  return {
    active: true,
    sessionEnd: data.sessionEnd,
    packageName: data.packageName,
    packageType: data.packageType,
    dataCapMb: data.dataCapMb,
    hotspotUsername: data.hotspotUsername,
    hotspotPin: data.hotspotPin,
    connectReadyAt: data.connectReadyAt,
  };
}

function applyPaidSession(data, { routerToken, phone: paidPhone, setSession, setWaiting, setPaymentTimedOut, setError }) {
  const readyAt = Date.now() + ROUTER_IMPORT_WAIT_MS;
  const nextSession = { ...sessionFromPayment(data), connectReadyAt: readyAt };
  const phoneToSave = paidPhone || data.hotspotUsername;
  if (phoneToSave) savePortalSubscriberPhone(routerToken, phoneToSave);
  saveWifiCredentials(routerToken, nextSession.hotspotUsername, nextSession.hotspotPin, readyAt);
  setSession(nextSession);
  setWaiting(false);
  setPaymentTimedOut(false);
  setError('');
  clearPendingPayment(routerToken);
  return true;
}

export default function Portal() {
  const { t } = useTranslation('portal');
  const { routerToken } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryMac = searchParams.get('mac') || '';
  const linkLogin = searchParams.get('link-login-only') || searchParams.get('link-login') || '';
  const linkLogout = searchParams.get('link-logout-only') || searchParams.get('link-logout') || '';
  const mac = queryMac || (import.meta.env.DEV ? DEV_TEST_MAC : '');
  const deviceId = useMemo(() => getPortalDeviceId(routerToken), [routerToken]);

  const [portal, setPortal] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bootstrapKey, setBootstrapKey] = useState(0);
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [phone, setPhone] = useState(() => getPortalSubscriberPhone(routerToken) || '');
  const [paying, setPaying] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [paymentReference, setPaymentReference] = useState('');
  const [error, setError] = useState('');
  const [mode, setMode] = useState('pay');
  const [voucherCode, setVoucherCode] = useState('');
  const [voucherPin, setVoucherPin] = useState('');
  const [redeeming, setRedeeming] = useState(false);
  const [paymentTimedOut, setPaymentTimedOut] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [checkingPayment, setCheckingPayment] = useState(false);
  const [cancellingPayment, setCancellingPayment] = useState(false);
  const [disconnecting, setDisconnecting] = useState(false);
  const [fairUseNotice, setFairUseNotice] = useState(() => searchParams.get('reason') === 'fair-use');

  useEffect(() => {
    if (searchParams.get('reason') !== 'fair-use') return;
    setFairUseNotice(true);
    const next = new URLSearchParams(searchParams);
    next.delete('reason');
    setSearchParams(next, { replace: true });
  }, [searchParams, setSearchParams]);

  const retryPortalBootstrap = useCallback(() => {
    setError('');
    setPortal(null);
    setLoading(true);
    setBootstrapKey((k) => k + 1);
  }, []);

  const routerUnavailable =
    portal?.routerStatus === 'OFFLINE' || portal?.routerStatus === 'DEGRADED';

  const checkSession = useCallback(async () => {
    if (!deviceId) return null;
    const params = new URLSearchParams({ deviceId });
    if (mac) params.set('mac', mac);
    const sessionPhone = phone || getPortalSubscriberPhone(routerToken);
    if (sessionPhone) params.set('phone', sessionPhone);
    const { data } = await api.get(`/portal/${routerToken}/session?${params}`);
    if (data?.active && data.hotspotUsername) {
      savePortalSubscriberPhone(routerToken, data.hotspotUsername);
    }
    setSession(data);
    return data;
  }, [routerToken, deviceId, mac, phone]);

  const handleSessionExpired = useCallback(async () => {
    try {
      const sessionData = await checkSession();
      if (!sessionData?.active) {
        setSession(null);
        setError('sessionExpired');
      }
    } catch {
      setSession(null);
      setError('sessionExpired');
    }
  }, [checkSession]);

  const resumePendingPayment = useCallback(
    ({ reference, phone: pendingPhone, packageId }) => {
      setPaymentReference(reference);
      setPhone(pendingPhone || '');
      if (packageId) setSelectedPkg(packageId);
      setWaiting(true);
      setPaymentTimedOut(false);
      setError('');
      savePendingPayment(routerToken, {
        reference,
        phone: pendingPhone || '',
        packageId: packageId || '',
      });
      if (pendingPhone) savePortalSubscriberPhone(routerToken, pendingPhone);
    },
    [routerToken]
  );

  const checkPaymentOnce = useCallback(
    async (reference) => {
      if (!reference || !deviceId) return false;

      try {
        const params = new URLSearchParams({
          reference,
          deviceId,
        });
        const { data } = await api.get(`/portal/${routerToken}/payment-status?${params}`);

        if (data.status === 'SUCCESS') {
          applyPaidSession(data, {
            routerToken,
            phone,
            setSession,
            setWaiting,
            setPaymentTimedOut,
            setError,
          });
          return true;
        }

        if (data.status === 'FAILED') {
          setWaiting(false);
          setPaymentTimedOut(false);
          setError(data.error || 'payRetry');
          clearPendingPayment(routerToken);
          return true;
        }
      } catch {
        // Fall through to session check — webhook may have completed the session already.
      }

      try {
        const sessionData = await checkSession();
        if (sessionData?.active) {
          const readyAt = Date.now() + ROUTER_IMPORT_WAIT_MS;
          const stored = loadWifiCredentials(routerToken);
          const next = {
            ...sessionData,
            hotspotUsername: sessionData.hotspotUsername || stored?.username,
            hotspotPin: sessionData.hotspotPin || stored?.pin,
            connectReadyAt: stored?.readyAt || readyAt,
          };
          if (next.hotspotUsername && next.hotspotPin) {
            saveWifiCredentials(routerToken, next.hotspotUsername, next.hotspotPin, next.connectReadyAt);
          }
          setSession(next);
          setWaiting(false);
          setPaymentTimedOut(false);
          setError('');
          clearPendingPayment(routerToken);
          return true;
        }
      } catch {
        // Keep waiting.
      }

      return false;
    },
    [deviceId, routerToken, checkSession, phone]
  );

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), PORTAL_BOOTSTRAP_TIMEOUT_MS);

    async function init() {
      try {
        const { data } = await api.get(`/portal/${routerToken}`, {
          signal: controller.signal,
        });
        if (cancelled) return;
        setPortal(data);

        const sessionData = await checkSession();
        if (cancelled) return;
        if (sessionData?.active) {
          clearPendingPayment(routerToken);
          const stored = loadWifiCredentials(routerToken);
          setSession({
            ...sessionData,
            hotspotUsername: sessionData.hotspotUsername || stored?.username,
            hotspotPin: sessionData.hotspotPin || stored?.pin,
            connectReadyAt: stored?.readyAt || Date.now(),
          });
          return;
        }

        const storedPending = loadPendingPayment(routerToken);
        if (storedPending?.reference) {
          resumePendingPayment(storedPending);
          return;
        }

        if (!deviceId) return;

        const params = new URLSearchParams({ deviceId });
        const sessionPhone = getPortalSubscriberPhone(routerToken);
        if (sessionPhone) params.set('phone', sessionPhone);
        const { data: pendingData } = await api.get(
          `/portal/${routerToken}/pending-payment?${params}`,
          { signal: controller.signal }
        );
        if (cancelled) return;

        if (pendingData.session?.active) {
          const stored = loadWifiCredentials(routerToken);
          const readyAt = stored?.readyAt || Date.now() + ROUTER_IMPORT_WAIT_MS;
          const next = {
            ...pendingData.session,
            hotspotUsername: pendingData.session.hotspotUsername || stored?.username,
            hotspotPin: pendingData.session.hotspotPin || stored?.pin,
            connectReadyAt: readyAt,
          };
          if (next.hotspotUsername && next.hotspotPin) {
            saveWifiCredentials(routerToken, next.hotspotUsername, next.hotspotPin, readyAt);
          }
          setSession(next);
          clearPendingPayment(routerToken);
          return;
        }

        if (pendingData.pending && pendingData.reference) {
          resumePendingPayment({
            reference: pendingData.reference,
            phone: pendingData.phone,
            packageId: pendingData.packageId,
          });
        }
      } catch (err) {
        if (cancelled) return;
        const aborted = controller.signal.aborted || isAbortError(err);
        setError(
          aborted
            ? 'loadSlow'
            : 'notFound'
        );
      } finally {
        clearTimeout(timeoutId);
        if (!cancelled) setLoading(false);
      }
    }

    init();
    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [routerToken, checkSession, deviceId, linkLogin, resumePendingPayment, bootstrapKey]);

  useEffect(() => {
    if (!waiting || !paymentReference) return;

    let attempts = 0;
    let cancelled = false;

    const poll = async () => {
      if (cancelled) return true;
      attempts++;
      const done = await checkPaymentOnce(paymentReference);
      if (done) return true;

      if (attempts >= PAYMENT_SOFT_TIMEOUT_ATTEMPTS) {
        setPaymentTimedOut(true);
        setError('stillWaiting');
      }
      return false;
    };

    poll();
    const id = setInterval(async () => {
      const done = await poll();
      if (done) clearInterval(id);
    }, PAYMENT_POLL_INTERVAL_MS);

    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [waiting, paymentReference, checkPaymentOnce]);

  useEffect(() => {
    if (!session?.active) return undefined;

    const id = setInterval(async () => {
      try {
        const sessionData = await checkSession();
        if (!sessionData?.active) {
          setSession(null);
          setError('sessionExpired');
        }
      } catch {
        // Ignore transient poll errors.
      }
    }, 60_000);

    return () => clearInterval(id);
  }, [session?.active, checkSession]);

  async function handleLogout() {
    if (!deviceId || loggingOut) return;
    setLoggingOut(true);
    setError('');
    try {
      await api.post(`/portal/${routerToken}/logout`, {
        deviceId,
        mac: mac || undefined,
        phone: phone || getPortalSubscriberPhone(routerToken) || undefined,
      });
      setSession(null);
      clearPortalSubscriberPhone(routerToken);
      clearWifiCredentials(routerToken);
      sessionStorage.removeItem(autoLoginStorageKey(routerToken));
      if (linkLogout) {
        window.location.href = linkLogout;
        return;
      }
    } catch (err) {
      setError(err.response?.data?.error || 'logoutFailed');
    } finally {
      setLoggingOut(false);
    }
  }

  async function handleDisconnectDevice() {
    if (!deviceId || disconnecting) return;
    setDisconnecting(true);
    setError('');
    try {
      await api.post(`/portal/${routerToken}/disconnect-device`, {
        deviceId,
        mac: mac || undefined,
        phone: phone || getPortalSubscriberPhone(routerToken) || undefined,
      });
      setSession(null);
      clearWifiCredentials(routerToken);
      sessionStorage.removeItem(autoLoginStorageKey(routerToken));
      if (linkLogout) {
        window.location.href = linkLogout;
      }
    } catch (err) {
      setError(err.response?.data?.error || 'disconnectFailed');
    } finally {
      setDisconnecting(false);
    }
  }

  async function handleRedeemVoucher() {
    if (!voucherCode.trim() || !voucherPin.trim() || !deviceId) return;
    setRedeeming(true);
    setError('');
    try {
      const { data } = await api.post(`/portal/${routerToken}/redeem`, {
        code: voucherCode,
        pin: voucherPin,
        deviceId,
        macAddress: mac || undefined,
      });
      const readyAt = Date.now() + ROUTER_IMPORT_WAIT_MS;
      const nextSession = {
        active: true,
        sessionEnd: data.sessionEnd,
        packageName: data.packageName,
        hotspotUsername: data.hotspotUsername,
        hotspotPin: data.hotspotPin,
        connectReadyAt: readyAt,
      };
      saveWifiCredentials(routerToken, nextSession.hotspotUsername, nextSession.hotspotPin, readyAt);
      setSession(nextSession);
    } catch (err) {
      setError(err.response?.data?.error || 'invalidVoucher');
    } finally {
      setRedeeming(false);
    }
  }

  async function handleCheckPayment() {
    if (!paymentReference || checkingPayment) return;
    setCheckingPayment(true);
    setError('');
    try {
      await checkPaymentOnce(paymentReference);
    } finally {
      setCheckingPayment(false);
    }
  }

  async function handleCancelPayment() {
    if (!deviceId || cancellingPayment) return;
    setCancellingPayment(true);
    setError('');
    try {
      const { data } = await api.post(`/portal/${routerToken}/cancel-payment`, {
        deviceId,
        reference: paymentReference || undefined,
      });
      if (data.recovered && data.session?.active) {
        applyPaidSession(data.session, {
          routerToken,
          phone,
          setSession,
          setWaiting,
          setPaymentTimedOut,
          setError,
        });
        return;
      }
      setWaiting(false);
      setPaymentTimedOut(false);
      setPaymentReference('');
      clearPendingPayment(routerToken);
    } catch (err) {
      setError(err.response?.data?.error || 'cancelFailed');
    } finally {
      setCancellingPayment(false);
    }
  }

  async function handlePay() {
    if (!selectedPkg || !phone || !deviceId) return;
    setPaying(true);
    setError('');
    try {
      const { data } = await api.post(`/portal/${routerToken}/pay`, {
        packageId: selectedPkg,
        phoneNumber: phone,
        deviceId,
        macAddress: mac || undefined,
      });
      resumePendingPayment({
        reference: data.reference,
        phone,
        packageId: selectedPkg,
      });
    } catch (err) {
      const data = err.response?.data;
      if (data?.recoverSession && data.active) {
        applyPaidSession(data, {
          routerToken,
          phone,
          setSession,
          setWaiting,
          setPaymentTimedOut,
          setError,
        });
        return;
      }
      setError(data?.error || 'payFailed');
    } finally {
      setPaying(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-[100dvh] bg-portal-gradient flex flex-col items-center justify-center gap-3 px-4 text-center">
        <Loader className="w-8 h-8 animate-spin text-brand" />
        <p className="text-sm text-navy/60">{t('loading')}</p>
      </div>
    );
  }

  if (error && !portal) {
    return (
      <PortalShell branding={null}>
        <PortalCard className="text-center">
          <p className="text-red-600 font-medium">{t(error, { defaultValue: error })}</p>
          <div className="mt-5 flex flex-col gap-2">
            <button type="button" className="btn-primary w-full py-3 text-sm" onClick={retryPortalBootstrap}>
              {t('retry')}
            </button>
            <a
              href={typeof window !== 'undefined' ? window.location.href : '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary w-full py-3 text-center text-sm"
            >
              {t('openBrowser')}
            </a>
          </div>
        </PortalCard>
      </PortalShell>
    );
  }

  const branding = portal?.branding;
  const welcomeText = branding?.welcomeText || t('welcomeDefault');
  const accentStyle = branding?.accentColor ? { backgroundColor: branding.accentColor } : undefined;
  const familyPlan = (session?.maxSharedDevices ?? 1) > 1;

  if (session?.active) {
    return (
      <PortalShell branding={branding}>
        <PortalCard className="text-center">
          <CheckCircle className="w-8 h-8 text-signal mx-auto" strokeWidth={1.75} />
          <h1 className="text-xl font-semibold text-navy mt-4">{t('accessReady')}</h1>
          <p className="text-navy/55 mt-1 text-sm">{session.packageName}</p>
          <p className="text-navy/50 mt-2 text-sm">
            {t('saveCreds')}
          </p>
          <div className="mt-6 p-4 rounded-lg bg-surface-muted border border-gray-200">
            <p className="text-xs text-navy/50 tracking-wide font-medium">{t('timeLeft')}</p>
            <div className="flex items-center justify-center gap-2 mt-1 text-brand text-lg font-mono">
              <Clock className="w-4 h-4" />
              <Countdown endTime={session.sessionEnd} onExpired={handleSessionExpired} />
            </div>
          </div>
          {familyPlan && (
            <p className="text-xs text-navy/50 mt-3">
              {t('family', { n: session.maxSharedDevices })}
            </p>
          )}
          {session.packageType === 'DATA_BASED' && session.dataCapMb ? (
            <p className="text-sm text-navy/50 mt-4">
              {t('allowance', { cap: formatPortalCap(t, session.dataCapMb) })}
            </p>
          ) : session.packageType === 'TIME_BASED' ? (
            <p className="text-sm text-navy/50 mt-4">{t('unlimitedTime')}</p>
          ) : null}
          {session.hotspotUsername && session.hotspotPin && (
            <CredentialsPanel
              username={session.hotspotUsername}
              pin={session.hotspotPin}
              linkLogin={linkLogin}
              accentColor={branding?.accentColor}
              routerToken={routerToken}
              readyAt={session.connectReadyAt}
            />
          )}
          {error && <p className="text-red-600 text-sm text-center mt-4 font-medium">{t(error, { defaultValue: error })}</p>}
          {familyPlan ? (
            <div className="mt-5 space-y-2">
              <button
                type="button"
                onClick={handleDisconnectDevice}
                disabled={disconnecting}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border border-gray-200 text-navy/70 text-sm font-medium hover:bg-surface-muted transition-colors disabled:opacity-50"
              >
                <LogOut className="w-4 h-4" />
                {disconnecting ? t('disconnecting') : t('disconnectDevice')}
              </button>
              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border border-red-200 text-red-700 text-sm font-medium hover:bg-red-50 transition-colors disabled:opacity-50"
              >
                {loggingOut ? t('ending') : t('endAll')}
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="mt-5 w-full flex items-center justify-center gap-2 py-3 rounded-lg border border-gray-200 text-navy/70 text-sm font-medium hover:bg-surface-muted transition-colors disabled:opacity-50"
            >
              <LogOut className="w-4 h-4" />
              {loggingOut ? t('loggingOut') : t('logout')}
            </button>
          )}
        </PortalCard>
      </PortalShell>
    );
  }

  if (waiting) {
    return (
      <PortalShell branding={branding}>
        <PortalCard className="text-center py-8">
          <Loader className="w-10 h-10 animate-spin text-brand mx-auto" />
          <h1 className="text-lg font-semibold text-navy mt-5">{t('waitingTitle')}</h1>
          <p className="text-navy/60 mt-2 text-sm">
            {t('waitingBody')}
          </p>
          <p className="text-xs text-navy/40 mt-3 font-mono">{t('usernameWillBe', { phone: phone || t('yourNumber') })}</p>
          {paymentTimedOut && (
            <p className="text-amber-700 text-sm mt-4 font-medium">{t(error, { defaultValue: error })}</p>
          )}
          {!paymentTimedOut && error && (
            <p className="text-red-600 text-sm mt-4 font-medium">{t(error, { defaultValue: error })}</p>
          )}
          <div className="mt-6 space-y-3">
            <button
              type="button"
              onClick={handleCheckPayment}
              disabled={checkingPayment}
              className="btn-primary w-full py-3 text-sm"
              style={accentStyle}
            >
              {checkingPayment ? t('checking') : t('checkStatus')}
            </button>
            <button
              type="button"
              onClick={handleCancelPayment}
              disabled={cancellingPayment}
              className="w-full py-3 rounded-lg border border-gray-200 text-navy/70 text-sm font-medium hover:bg-surface-muted transition-colors disabled:opacity-50"
            >
              {cancellingPayment ? t('cancelling') : t('cancel')}
            </button>
          </div>
          <p className="text-xs text-navy/40 mt-4">
            {t('comeBack')}
          </p>
        </PortalCard>
      </PortalShell>
    );
  }

  if (!portal?.packages?.length) {
    return (
      <PortalShell branding={branding}>
        <PortalCard className="text-center py-10">
          <h1 className="text-lg font-semibold text-navy">{portal?.locationName}</h1>
          <p className="text-navy/55 mt-2 text-sm">
            {t('noPackages')}
          </p>
        </PortalCard>
      </PortalShell>
    );
  }

  const selected = portal?.packages.find((p) => p.id === selectedPkg);
  const operator = detectOperator(phone);

  return (
    <PortalShell branding={branding}>
      <PortalCard>
        <div className="text-center mb-6">
          <p className="text-xs font-medium text-navy/45 tracking-wide mb-2">{t('hotspot')}</p>
          <h1 className="text-xl font-semibold text-navy">{portal?.locationName}</h1>
          <p className="text-navy/55 text-sm mt-1">{welcomeText}</p>
          {fairUseNotice && (
            <div className="mt-3 text-left rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5">
              <p className="text-sm font-medium text-amber-900">
                {t('fairUse')}
              </p>
              <button
                type="button"
                onClick={() => setFairUseNotice(false)}
                className="mt-2 text-xs font-medium text-amber-800/80 hover:text-amber-950 underline"
              >
                {t('dismiss')}
              </button>
            </div>
          )}
          {routerUnavailable && (
            <p className="mt-3 text-sm font-medium text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
              {portal?.routerStatus === 'OFFLINE'
                ? t('offline')
                : t('degraded')}
            </p>
          )}
        </div>

        <div className="flex rounded-lg bg-surface-muted border border-gray-200 p-0.5 mb-6">
          {[
            { id: 'pay', label: t('payTab'), icon: null },
            { id: 'voucher', label: t('voucherTab'), icon: Ticket },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => { setMode(tab.id); setError(''); }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-md text-sm font-medium transition-colors ${
                mode === tab.id ? 'bg-white text-navy border border-gray-200' : 'text-navy/50 hover:text-navy/70'
              }`}
            >
              {tab.icon && <tab.icon className="w-3.5 h-3.5" />}
              {tab.label}
            </button>
          ))}
        </div>

        {mode === 'voucher' ? (
          <div>
            <label className="label-field text-center">{t('voucherCode')}</label>
            <input
              value={voucherCode}
              onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
              placeholder={t('voucherPh')}
              className="input-field text-center font-mono text-lg tracking-widest uppercase mb-3"
            />
            <label className="label-field text-center">{t('pin')}</label>
            <input
              value={voucherPin}
              onChange={(e) => setVoucherPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder={t('pinPh')}
              inputMode="numeric"
              className="input-field text-center font-mono text-lg tracking-widest mb-4"
            />
            {error && <p className="text-red-600 text-sm text-center mb-3 font-medium">{t(error, { defaultValue: error })}</p>}
            <button
              onClick={handleRedeemVoucher}
              disabled={!voucherCode.trim() || voucherPin.length < 6 || redeeming}
              className="btn-primary w-full py-3.5 text-base"
              style={accentStyle}
            >
              {redeeming ? t('redeeming') : t('redeem')}
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-2.5 mb-5">
              {portal?.packages.map((pkg) => (
                <button
                  key={pkg.id}
                  onClick={() => setSelectedPkg(pkg.id)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-150 ${
                    selectedPkg === pkg.id
                      ? 'border-navy bg-navy/[0.03] shadow-sm'
                      : 'border-gray-100 hover:border-gray-200'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-navy">{pkg.name}</span>
                    <span className="font-bold text-brand">
                      {t('priceXaf', { amount: pkg.priceXaf.toLocaleString() })}
                    </span>
                  </div>
                  <p className="text-sm text-navy/55 mt-1">
                    {formatTranslatedPortalPackageSummary(t, pkg, {
                      showUploadSpeed: branding?.showUploadSpeed === true,
                    })}
                  </p>
                </button>
              ))}
            </div>

            <div className="mb-4">
              <input
                type="tel"
                placeholder={t('phonePh')}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 9))}
                className="input-field text-center text-lg tracking-wide"
              />
              {operator && (
                <p className="text-xs text-center text-navy/45 mt-2 font-medium">
                  {t('operator', { op: operator })}
                </p>
              )}
              <p className="text-xs text-center text-navy/45 mt-2">
                {t('payHint')}
              </p>
            </div>

            {error && <p className="text-red-600 text-sm text-center mb-3 font-medium">{t(error, { defaultValue: error })}</p>}

            <button
              onClick={handlePay}
              disabled={!selectedPkg || phone.length < 9 || paying || portal?.routerStatus === 'OFFLINE'}
              className="btn-primary w-full py-3.5 text-base"
              style={accentStyle}
            >
              {paying
                ? t('processing')
                : selected
                  ? t('pay', { amount: selected.priceXaf.toLocaleString() })
                  : t('selectPackage')}
            </button>
          </>
        )}
      </PortalCard>
    </PortalShell>
  );
}
