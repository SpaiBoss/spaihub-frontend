export function formatXaf(amount) {
  return `${Number(amount || 0).toLocaleString()} XAF`;
}

export function formatChartDate(date) {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

export function ChartTooltip({ active, payload, label, formatter = formatXaf }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 shadow-elevated text-sm">
      <p className="text-xs font-medium text-navy/50 mb-1.5">{formatChartDate(label)}</p>
      {payload.map((entry) => (
        <div key={entry.name || entry.dataKey} className="flex items-center justify-between gap-6">
          <span className="flex items-center gap-2 text-navy/70">
            <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: entry.color || entry.fill }} />
            {entry.name || entry.dataKey}
          </span>
          <span className="font-semibold text-navy font-mono text-xs">{formatter(entry.value)}</span>
        </div>
      ))}
    </div>
  );
}

export function ChartGradientDefs() {
  return (
    <defs>
      <linearGradient id="brandArea" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#0F766E" stopOpacity={0.28} />
        <stop offset="100%" stopColor="#0F766E" stopOpacity={0.02} />
      </linearGradient>
      <linearGradient id="navyArea" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#0E141B" stopOpacity={0.22} />
        <stop offset="100%" stopColor="#0E141B" stopOpacity={0.02} />
      </linearGradient>
      <linearGradient id="brandBar" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#148F86" />
        <stop offset="100%" stopColor="#0F766E" />
      </linearGradient>
      <linearGradient id="navyBar" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#161D27" />
        <stop offset="100%" stopColor="#0E141B" />
      </linearGradient>
    </defs>
  );
}

export const CHART_AXIS = {
  tick: { fontSize: 11, fill: '#6B7280' },
  axisLine: false,
  tickLine: false,
};

export const PAYMENT_COLORS = ['#0F766E', '#0E141B', '#148F86'];
