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
    <div className="rounded-xl border border-gray-100 bg-white/95 backdrop-blur px-3.5 py-2.5 shadow-elevated text-sm">
      <p className="text-xs font-semibold text-navy/50 mb-1.5">{formatChartDate(label)}</p>
      {payload.map((entry) => (
        <div key={entry.name || entry.dataKey} className="flex items-center justify-between gap-6">
          <span className="flex items-center gap-2 text-navy/70">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color || entry.fill }} />
            {entry.name || entry.dataKey}
          </span>
          <span className="font-semibold text-navy">{formatter(entry.value)}</span>
        </div>
      ))}
    </div>
  );
}

export function ChartGradientDefs() {
  return (
    <defs>
      <linearGradient id="brandArea" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#5463FF" stopOpacity={0.35} />
        <stop offset="100%" stopColor="#5463FF" stopOpacity={0.02} />
      </linearGradient>
      <linearGradient id="navyArea" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1A3C5E" stopOpacity={0.3} />
        <stop offset="100%" stopColor="#1A3C5E" stopOpacity={0.02} />
      </linearGradient>
      <linearGradient id="brandBar" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#6b77ff" />
        <stop offset="100%" stopColor="#5463FF" />
      </linearGradient>
      <linearGradient id="navyBar" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#2a5280" />
        <stop offset="100%" stopColor="#1A3C5E" />
      </linearGradient>
    </defs>
  );
}

export const CHART_AXIS = {
  tick: { fontSize: 11, fill: '#64748b' },
  axisLine: false,
  tickLine: false,
};

export const PAYMENT_COLORS = ['#5463FF', '#1A3C5E', '#6b77ff'];
