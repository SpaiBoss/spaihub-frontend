import { useEffect, useState } from 'react';
import api from '../services/api';

const DEFAULT_CONFIG = {
  platformFeePercent: 2,
  contactWhatsApp: '',
};

let cachedConfig = null;
let inflight = null;

async function fetchPublicConfig() {
  if (cachedConfig) return cachedConfig;
  if (inflight) return inflight;

  inflight = api
    .get('/api/public/config')
    .then((res) => {
      cachedConfig = {
        platformFeePercent: Number(res.data?.platformFeePercent) || 2,
        contactWhatsApp: String(res.data?.contactWhatsApp || '').replace(/\D/g, ''),
      };
      return cachedConfig;
    })
    .catch(() => DEFAULT_CONFIG)
    .finally(() => {
      inflight = null;
    });

  return inflight;
}

export function usePublicConfig() {
  const [config, setConfig] = useState(cachedConfig || DEFAULT_CONFIG);
  const [loading, setLoading] = useState(!cachedConfig);

  useEffect(() => {
    let cancelled = false;
    fetchPublicConfig().then((next) => {
      if (!cancelled) {
        setConfig(next);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return { ...config, loading };
}

export function whatsappUrl(phone, message) {
  if (!phone) return null;
  const base = `https://wa.me/${phone}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
