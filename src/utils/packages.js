export function toMinutes(value, unit) {
  const n = Number(value);
  if (!n || n <= 0) return 0;
  if (unit === 'minutes') return Math.round(n);
  if (unit === 'hours') return Math.round(n * 60);
  if (unit === 'days') return Math.round(n * 1440);
  return 0;
}

export function toMegabytes(value, unit) {
  const n = Number(value);
  if (!n || n <= 0) return 0;
  if (unit === 'MB') return Math.round(n);
  if (unit === 'GB') return Math.round(n * 1024);
  return 0;
}

export function formatDuration(minutes) {
  if (!minutes || minutes <= 0) return '0 minutes';

  const days = Math.floor(minutes / 1440);
  const hours = Math.floor((minutes % 1440) / 60);
  const mins = minutes % 60;
  const parts = [];

  if (days) parts.push(`${days} day${days !== 1 ? 's' : ''}`);
  if (hours) parts.push(`${hours} hour${hours !== 1 ? 's' : ''}`);
  if (mins) parts.push(`${mins} minute${mins !== 1 ? 's' : ''}`);

  return parts.join(' ');
}

export function formatDataCap(mb) {
  if (!mb) return 'Unlimited';
  if (mb >= 1024 && mb % 1024 === 0) return `${mb / 1024} GB`;
  if (mb >= 1024) return `${(mb / 1024).toFixed(1)} GB`;
  return `${mb} MB`;
}

export function formatUploadSpeed(mbPerSec) {
  const speed = mbPerSec ?? 1;
  return `${speed} MB/s upload`;
}

export function formatPackageSummary(pkg, { includeSpeed = true } = {}) {
  const upload = includeSpeed ? ` · ${formatUploadSpeed(pkg.uploadSpeedMbPerSec)}` : '';
  if (pkg.type === 'DATA_BASED') {
    return `${formatDataCap(pkg.dataCapMb)} download · expires in ${formatDuration(pkg.durationMinutes)}${upload}`;
  }

  const browse = formatDuration(pkg.durationMinutes);
  const data = pkg.dataCapMb ? formatDataCap(pkg.dataCapMb) : 'Unlimited data';
  return `${browse} browse · ${data}${upload}`;
}

export function formatPortalPackageSummary(pkg) {
  return formatPackageSummary(pkg, { includeSpeed: false });
}

export const PACKAGE_TYPE_LABELS = {
  TIME_BASED: 'Time-based (Browse)',
  DATA_BASED: 'Data-based (Download)',
};
