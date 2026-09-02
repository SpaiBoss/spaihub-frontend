const KEY_PREFIX = 'spaihub_pending_pay_';

export function savePendingPayment(routerToken, { reference, phone, packageId }) {
  if (!routerToken || !reference) return;
  sessionStorage.setItem(
    `${KEY_PREFIX}${routerToken}`,
    JSON.stringify({
      reference,
      phone: phone || '',
      packageId: packageId || '',
      savedAt: Date.now(),
    })
  );
}

export function loadPendingPayment(routerToken) {
  if (!routerToken) return null;
  try {
    const raw = sessionStorage.getItem(`${KEY_PREFIX}${routerToken}`);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.reference) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function clearPendingPayment(routerToken) {
  if (!routerToken) return;
  sessionStorage.removeItem(`${KEY_PREFIX}${routerToken}`);
}
