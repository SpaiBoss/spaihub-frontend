const ICON_SRC = '/brand/icon.png';
const LOCKUP_LIGHT = '/brand/logo-lockup-light.png';
const LOCKUP_DARK = '/brand/logo-lockup-dark.png';

const SIZE_FROM_TEXT = [
  ['text-7xl', 88],
  ['text-6xl', 72],
  ['text-5xl', 56],
  ['text-4xl', 48],
  ['text-[3.25rem]', 52],
  ['text-3xl', 40],
  ['text-2xl', 32],
  ['text-xl', 28],
  ['text-lg', 24],
];

function resolveIconPx(textClassName = '', iconClassName = '', fallback = 32) {
  const haystack = `${textClassName} ${iconClassName}`;
  for (const [token, px] of SIZE_FROM_TEXT) {
    if (haystack.includes(token)) return px;
  }
  return fallback;
}

export function TextWordmark({ theme = 'light', className = 'text-2xl', as: Tag = 'span' }) {
  const color = theme === 'dark' ? 'text-white' : 'text-navy';

  return (
    <Tag
      className={`font-display font-bold tracking-tight leading-none ${color} ${className}`}
      aria-label="Spai-Hub"
    >
      Spai-Hub
    </Tag>
  );
}

/**
 * Spai-Hub brand mark.
 * @param {'full'|'icon'|'lockup'} variant
 * @param {'light'|'dark'} theme — light = navy wordmark on light UI; dark = white wordmark / dark lockup
 */
export default function BrandLogo({
  variant = 'full',
  theme = 'light',
  className = '',
  textClassName = 'text-2xl',
  iconClassName = '',
}) {
  const iconPx = resolveIconPx(textClassName, iconClassName, variant === 'icon' ? 36 : 32);

  if (variant === 'lockup') {
    const src = theme === 'dark' ? LOCKUP_DARK : LOCKUP_LIGHT;
    const height = Math.max(iconPx, 28);
    return (
      <img
        src={src}
        alt="Spai-Hub"
        className={`block w-auto object-contain ${className}`}
        style={{ height }}
        draggable={false}
      />
    );
  }

  if (variant === 'icon') {
    return (
      <img
        src={ICON_SRC}
        alt="Spai-Hub"
        className={`block object-contain ${iconClassName} ${className}`}
        style={{ width: iconPx, height: iconPx }}
        draggable={false}
      />
    );
  }

  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 ${className}`}>
      <img
        src={ICON_SRC}
        alt=""
        aria-hidden
        className={`block shrink-0 object-contain ${iconClassName}`}
        style={{ width: iconPx, height: iconPx }}
        draggable={false}
      />
      <TextWordmark theme={theme} className={textClassName} />
    </div>
  );
}
