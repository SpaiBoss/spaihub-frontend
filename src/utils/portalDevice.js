const DEVICE_KEY_PREFIX = 'spaihub_device_';

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
