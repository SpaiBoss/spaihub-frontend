export function detectCameroonOperator(phone) {
  const digits = String(phone || '').replace(/\D/g, '');
  const local = digits.startsWith('237') && digits.length === 12 ? digits.slice(3) : digits;
  if (!/^6\d{8}$/.test(local)) return null;
  if (local.startsWith('69')) return 'ORANGE';
  if (/^6[5678]/.test(local)) return 'MTN';
  return null;
}

export function paymentMethodForOperator(operator) {
  if (operator === 'MTN') return 'MTN_MOMO';
  if (operator === 'ORANGE') return 'ORANGE_MONEY';
  return null;
}
