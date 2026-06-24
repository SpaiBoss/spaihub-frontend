export function TextWordmark({ theme = 'light', className = 'text-2xl', as: Tag = 'span' }) {
  const spaiColor = theme === 'dark' ? 'text-white' : 'text-navy';
  const hyphenColor = theme === 'dark' ? 'text-white/45' : 'text-navy/35';

  return (
    <Tag className={`font-bold tracking-tight leading-none ${className}`} aria-label="Spai-Hub">
      <span className={spaiColor}>Spai</span>
      <span className={hyphenColor}>-</span>
      <span className="text-brand">Hub</span>
    </Tag>
  );
}

export default function BrandLogo({
  variant = 'full',
  theme = 'light',
  className = '',
  textClassName = 'text-2xl',
  iconClassName,
}) {
  const sizeClass = textClassName || iconClassName || 'text-2xl';
  const compact = variant === 'icon';

  return (
    <div
      className={`flex items-center justify-center ${compact ? '' : ''} ${className}`}
    >
      <TextWordmark theme={theme} className={compact ? 'text-xl' : sizeClass} />
    </div>
  );
}
