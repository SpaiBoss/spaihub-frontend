import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { CheckCircle, Loader, Clock, Wifi, Ticket, KeyRound } from 'lucide-react';
import api from '../../services/api';
import { formatPortalPackageSummary } from '../../utils/packages';
import { getPortalDeviceId } from '../../utils/portalDevice';
import PortalBrand, { PortalCredit } from '../../components/PortalBrand';

function detectOperator(phone) {
  if (phone.startsWith('69')) return 'Orange';
  if (['65', '67', '68'].some((p) => phone.startsWith(p))) return 'MTN';
  return null;
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

function Countdown({ endTime }) {
  const [remaining, setRemaining] = useState('');

  useEffect(() => {
    const tick = () => {
      const diff = new Date(endTime) - Date.now();
      if (diff <= 0) {
        setRemaining('Expired');
        return;
      }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setRemaining(`${h}h ${m}m ${s}s`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [endTime]);

  return <span className="font-mono font-semibold">{remaining}</span>;
}

function PortalShell({ children, branding }) {
  const headerStyle = branding?.accentColor
    ? { background: `linear-gradient(135deg, ${branding.accentColor}, #1A3C5E)` }
    : undefined;

  return (
    <div className="min-h-[100dvh] bg-portal-gradient flex flex-col">
      <header
        className={`relative shrink-0 px-4 pt-[max(1.75rem,env(safe-area-inset-top))] pb-24 text-center text-white ${
          branding?.accentColor ? '' : 'bg-brand-gradient'
        }`}
        style={headerStyle}
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 right-0 h-40 w-40 rounded-full bg-white/20 blur-3xl" />
        </div>
        <div className="relative z-10 flex min-h-[5.5rem] items-center justify-center">
          <PortalBrand branding={branding} theme="dark" className="mx-auto" textClassName="text-3xl" />
        </div>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-md flex-1 px-4 -mt-16 pb-[max(2rem,env(safe-area-inset-bottom))]">
        {children}
        <PortalCredit />
      </main>
    </div>
  );
}

function PortalCard({ children, className = '' }) {
  return (
    <div className={`card shadow-elevated card-body animate-slide-up overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

function CredentialsPanel({ username, pin, linkLogin, accentColor }) {
  const loginUrl = buildMikrotikLoginUrl(linkLogin, username, pin);
  const accentStyle = accentColor ? { backgroundColor: accentColor } : undefined;

  return (
    <div className="mt-5 p-4 rounded-xl bg-navy/[0.04] border border-navy/10 text-left">
      <div className="flex items-center gap-2 mb-3">
        <KeyRound className="w-4 h-4 text-brand" style={accentColor ? { color: accentColor } : undefined} />
        <p className="text-xs font-semibold text-navy/50 uppercase tracking-wide">WiFi login</p>
      </div>
      <div className="space-y-2">
        <div>
          <p className="text-xs text-navy/45">Username</p>
          <p className="font-mono font-semibold text-navy break-all">{username}</p>
        </div>
        <div>
          <p className="text-xs text-navy/45">PIN</p>
          <p
            className="font-mono font-semibold text-brand text-lg tracking-widest"
            style={accentColor ? { color: accentColor } : undefined}
          >
            {pin}
          </p>
        </div>
      </div>
      {loginUrl ? (
        <a
          href={loginUrl}
          className="btn-primary w-full mt-4 py-3 text-center block text-sm"
          style={accentStyle}
        >
          Connect to WiFi now
        </a>
      ) : (
        <p className="text-xs text-navy/50 mt-3">
          Enter these credentials on the MikroTik hotspot login page to get online.
        </p>
      )}
    </div>
  );
}

const DEV_TEST_MAC = 'AA:BB:CC:DD:EE:01';

export default function Portal() {
  const { routerToken } = useParams();
  const [searchParams] = useSearchParams();
  const queryMac = searchParams.get('mac') || '';
  const linkLogin = searchParams.get('link-login-only') || searchParams.get('link-login') || '';
  const mac = queryMac || (import.meta.env.DEV ? DEV_TEST_MAC : '');
  const deviceId = useMemo(() => getPortalDeviceId(routerToken), [routerToken]);
  const autoLoginAttempted = useRef(false);

  const [portal, setPortal] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [phone, setPhone] = useState('');
  const [paying, setPaying] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [paymentReference, setPaymentReference] = useState('');
  const [error, setError] = useState('');
  const [mode, setMode] = useState('pay');
  const [voucherCode, setVoucherCode] = useState('');
  const [voucherPin, setVoucherPin] = useState('');
  const [redeeming, setRedeeming] = useState(false);

  const checkSession = useCallback(async () => {
    if (!deviceId) return null;
    const params = new URLSearchParams({ deviceId });
    if (mac) params.set('mac', mac);
    const { data } = await api.get(`/portal/${routerToken}/session?${params}`);
    setSession(data);
    return data;
  }, [routerToken, deviceId, mac]);

  useEffect(() => {
    async function init() {
      try {
        const { data } = await api.get(`/portal/${routerToken}`);
        setPortal(data);
        await checkSession();
      } catch {
        setError('Router not found');
      } finally {
        setLoading(false);
      }
    }
    init();
  }, [routerToken, checkSession]);

  useEffect(() => {
    if (!waiting || !paymentReference) return;
    let attempts = 0;
    const maxAttempts = 60;
    const poll = async () => {
      attempts++;
      try {
        const params = new URLSearchParams({
          reference: paymentReference,
          deviceId,
        });
        const { data } = await api.get(`/portal/${routerToken}/payment-status?${params}`);
        if (data.status === 'SUCCESS') {
          setSession({
            active: true,
            sessionEnd: data.sessionEnd,
            packageName: data.packageName,
            dataCapMb: data.dataCapMb,
            hotspotUsername: data.hotspotUsername,
            hotspotPin: data.hotspotPin,
          });
          setWaiting(false);
          return true;
        }
        if (data.status === 'FAILED') {
          setWaiting(false);
          setError(data.error || 'Payment failed. Please try again.');
          return true;
        }
      } catch {
        // fall through to session check
      }
      if (attempts >= maxAttempts) {
        setWaiting(false);
        setError('Payment not confirmed. Please try again or contact support.');
        return true;
      }
      return false;
    };
    poll();
    const id = setInterval(async () => {
      const done = await poll();
      if (done) clearInterval(id);
    }, 2000);
    return () => clearInterval(id);
  }, [waiting, paymentReference, routerToken, deviceId]);

  useEffect(() => {
    if (!session?.active || !session.hotspotUsername || !session.hotspotPin || !linkLogin) return;
    if (autoLoginAttempted.current) return;
    autoLoginAttempted.current = true;
    const loginUrl = buildMikrotikLoginUrl(linkLogin, session.hotspotUsername, session.hotspotPin);
    if (loginUrl) {
      window.location.href = loginUrl;
    }
  }, [session, linkLogin]);

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
      setSession({
        active: true,
        sessionEnd: data.sessionEnd,
        packageName: data.packageName,
        hotspotUsername: data.hotspotUsername,
        hotspotPin: data.hotspotPin,
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid voucher code');
    } finally {
      setRedeeming(false);
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
      setPaymentReference(data.reference);
      setWaiting(true);
    } catch (err) {
      setError(err.response?.data?.error || 'Payment failed');
    } finally {
      setPaying(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-[100dvh] bg-portal-gradient flex items-center justify-center px-4">
        <Loader className="w-8 h-8 animate-spin text-brand" />
      </div>
    );
  }

  if (error && !portal) {
    return (
      <PortalShell>
        <PortalCard className="text-center">
          <p className="text-red-600 font-medium">{error}</p>
        </PortalCard>
      </PortalShell>
    );
  }

  const branding = portal?.branding;
  const welcomeText = branding?.welcomeText || 'Pay with Mobile Money to get online instantly';

  if (session?.active) {
    return (
      <PortalShell branding={branding}>
        <PortalCard className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto">
            <CheckCircle className="w-9 h-9 text-emerald-500" />
          </div>
          <h1 className="text-xl font-bold text-navy mt-5">You&apos;re connected</h1>
          <p className="text-navy/60 mt-1 text-sm">{session.packageName}</p>
          <div className="mt-6 p-4 rounded-xl bg-brand/5 border border-brand/10">
            <p className="text-xs text-navy/50 uppercase tracking-wide font-semibold">Time remaining</p>
            <div className="flex items-center justify-center gap-2 mt-1 text-brand text-lg">
              <Clock className="w-4 h-4" />
              <Countdown endTime={session.sessionEnd} />
            </div>
          </div>
          {session.dataCapMb && (
            <p className="text-sm text-navy/50 mt-4">Data allowance: {session.dataCapMb} MB</p>
          )}
          {session.hotspotUsername && session.hotspotPin && (
            <CredentialsPanel
              username={session.hotspotUsername}
              pin={session.hotspotPin}
              linkLogin={linkLogin}
              accentColor={branding?.accentColor}
            />
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
          <h1 className="text-lg font-bold text-navy mt-5">Approve MoMo on your phone</h1>
          <p className="text-navy/60 mt-2 text-sm">
            Your WiFi username and PIN appear here instantly once Campay confirms payment.
          </p>
          <p className="text-xs text-navy/40 mt-3 font-mono">Username will be {phone || 'your number'}</p>
        </PortalCard>
      </PortalShell>
    );
  }

  const selected = portal?.packages.find((p) => p.id === selectedPkg);
  const operator = detectOperator(phone);
  const accentStyle = branding?.accentColor ? { backgroundColor: branding.accentColor } : undefined;

  return (
    <PortalShell branding={branding}>
      <PortalCard>
        <div className="text-center mb-6">
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-3 ${
              branding?.accentColor ? '' : 'bg-brand/10 text-brand'
            }`}
            style={
              branding?.accentColor
                ? { backgroundColor: `${branding.accentColor}18`, color: branding.accentColor }
                : undefined
            }
          >
            <Wifi className="w-3 h-3" />
            WiFi Hotspot
          </div>
          <h1 className="text-xl font-bold text-navy">{portal?.locationName}</h1>
          <p className="text-navy/60 text-sm mt-1">{welcomeText}</p>
        </div>

        <div className="flex rounded-xl bg-gray-100 p-1 mb-6">
          {[
            { id: 'pay', label: 'Pay with MoMo', icon: null },
            { id: 'voucher', label: 'I have a voucher', icon: Ticket },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => { setMode(tab.id); setError(''); }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                mode === tab.id ? 'bg-white text-navy shadow-sm' : 'text-navy/50 hover:text-navy/70'
              }`}
            >
              {tab.icon && <tab.icon className="w-3.5 h-3.5" />}
              {tab.label}
            </button>
          ))}
        </div>

        {mode === 'voucher' ? (
          <div>
            <label className="label-field text-center">Voucher code</label>
            <input
              value={voucherCode}
              onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
              placeholder="SPAI-XXXX-XXXX"
              className="input-field text-center font-mono text-lg tracking-widest uppercase mb-3"
            />
            <label className="label-field text-center">PIN</label>
            <input
              value={voucherPin}
              onChange={(e) => setVoucherPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="6-digit PIN"
              inputMode="numeric"
              className="input-field text-center font-mono text-lg tracking-widest mb-4"
            />
            {error && <p className="text-red-600 text-sm text-center mb-3 font-medium">{error}</p>}
            <button
              onClick={handleRedeemVoucher}
              disabled={!voucherCode.trim() || voucherPin.length < 6 || redeeming}
              className="btn-primary w-full py-3.5 text-base"
              style={accentStyle}
            >
              {redeeming ? 'Redeeming...' : 'Connect with voucher'}
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
                    <span className="font-bold text-brand">{pkg.priceXaf.toLocaleString()} XAF</span>
                  </div>
                  <p className="text-sm text-navy/55 mt-1">
                    {formatPortalPackageSummary(pkg, {
                      showUploadSpeed: branding?.showUploadSpeed === true,
                    })}
                  </p>
                </button>
              ))}
            </div>

            <div className="mb-4">
              <input
                type="tel"
                placeholder="6XX XXX XXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 9))}
                className="input-field text-center text-lg tracking-wide"
              />
              {operator && (
                <p className="text-xs text-center text-navy/45 mt-2 font-medium">
                  {operator} Mobile Money detected
                </p>
              )}
              <p className="text-xs text-center text-navy/45 mt-2">
                Pay via Campay — your phone number becomes your WiFi username and a PIN is generated instantly.
              </p>
            </div>

            {error && <p className="text-red-600 text-sm text-center mb-3 font-medium">{error}</p>}

            <button
              onClick={handlePay}
              disabled={!selectedPkg || phone.length < 9 || paying}
              className="btn-primary w-full py-3.5 text-base"
              style={accentStyle}
            >
              {paying
                ? 'Processing...'
                : selected
                  ? `Pay ${selected.priceXaf.toLocaleString()} XAF`
                  : 'Select a package'}
            </button>
          </>
        )}
      </PortalCard>
    </PortalShell>
  );
}
