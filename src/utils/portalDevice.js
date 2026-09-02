const DEVICE_KEY_PREFIX = 'spaihub_device_';
const PHONE_KEY_PREFIX = 'spaihub_phone_';

export function getPortalDeviceId(routerToken) {
  const key = `${DEVICE_KEY_PREFIX}${routerToken}`;
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
}

export function clearPortalDeviceId(routerToken) {
  localStorage.removeItem(`${DEVICE_KEY_PREFIX}${routerToken}`);
}

export function getPortalSubscriberPhone(routerToken) {
  return localStorage.getItem(`${PHONE_KEY_PREFIX}${routerToken}`) || '';
}

export function savePortalSubscriberPhone(routerToken, phone) {
  if (!routerToken || !phone) return;
  localStorage.setItem(`${PHONE_KEY_PREFIX}${routerToken}`, String(phone).replace(/\D/g, '').slice(0, 9));
}

export function clearPortalSubscriberPhone(routerToken) {
  localStorage.removeItem(`${PHONE_KEY_PREFIX}${routerToken}`);
}

export function clearPortalIdentity(routerToken) {
  clearPortalDeviceId(routerToken);
  clearPortalSubscriberPhone(routerToken);
}
