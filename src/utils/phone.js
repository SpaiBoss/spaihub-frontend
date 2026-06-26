export function detectCameroonOperator(phone) {
  const digits = String(phone || '').replace(/\D/g, '');
  const local = digits.startsWith('237') && digits.length === 12 ? digits.slice(3) : digits;
  if (!/^6\d{8}$/.test(local)) return null;

  const prefix3 = local.slice(0, 3);
  if (prefix3 >= '655' && prefix3 <= '659') return 'ORANGE';
  if (local.startsWith('69')) return 'ORANGE';
  if (prefix3 >= '650' && prefix3 <= '654') return 'MTN';
  if (local.startsWith('67') || local.startsWith('68')) return 'MTN';

  return null;
}

export function paymentMethodForOperator(operator) {
  if (operator === 'MTN') return 'MTN_MOMO';
  if (operator === 'ORANGE') return 'ORANGE_MONEY';
  return null;
}
