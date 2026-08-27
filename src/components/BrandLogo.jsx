export function TextWordmark({ theme = 'light', className = 'text-2xl', as: Tag = 'span' }) {
  const color = theme === 'dark' ? 'text-white' : 'text-navy';

  return (
    <Tag className={`font-semibold tracking-tight leading-none ${color} ${className}`} aria-label="Spai-Hub">
      Spai-Hub
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
    <div className={`flex items-center ${compact ? 'justify-center' : ''} ${className}`}>
      <TextWordmark theme={theme} className={compact ? 'text-xl' : sizeClass} />
    </div>
  );
}
