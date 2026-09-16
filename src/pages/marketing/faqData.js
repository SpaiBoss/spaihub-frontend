export function getMarketingFaq(t, fee) {
  const items = t('faq.items', { returnObjects: true });
  if (!Array.isArray(items)) return [];
  return items.map((_, i) => ({
    q: t(`faq.items.${i}.q`, { fee }),
    a: t(`faq.items.${i}.a`, { fee }),
  }));
}
