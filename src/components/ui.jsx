import { X } from 'lucide-react';

const STATUS_LABELS = {
  SUCCESS: 'Success',
  PENDING: 'Pending',
  FAILED: 'Failed',
  APPROVED: 'Approved',
  REJECTED: 'Rejected',
  ONLINE: 'Online',
  OFFLINE: 'Offline',
  ACTIVE: 'Active',
  SUSPENDED: 'Suspended',
  UNUSED: 'Unused',
  REDEEMED: 'Redeemed',
  EXPIRED: 'Expired',
  REVOKED: 'Revoked',
};

const STATUS_DOT = {
  SUCCESS: 'bg-signal',
  PENDING: 'bg-amber-500',
  FAILED: 'bg-red-600',
  APPROVED: 'bg-signal',
  REJECTED: 'bg-red-600',
  ONLINE: 'bg-signal',
  OFFLINE: 'bg-red-600',
  ACTIVE: 'bg-signal',
  SUSPENDED: 'bg-red-600',
  UNUSED: 'bg-brand',
  REDEEMED: 'bg-signal',
  EXPIRED: 'bg-amber-500',
  REVOKED: 'bg-red-600',
};

function formatDuration(minutes) {
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

export { formatDuration };

export function StatusBadge({ status }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium text-navy bg-surface-muted border border-gray-200">
      <span
        className={`w-1.5 h-1.5 rounded-sm shrink-0 ${STATUS_DOT[status] || 'bg-gray-400'}`}
        aria-hidden
      />
      {STATUS_LABELS[status] || status}
    </span>
  );
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  ...props
}) {
  const sizes = {
    sm: 'px-3 py-1.5 text-xs rounded-lg',
    md: 'px-4 py-2.5 text-sm rounded-lg',
    lg: 'px-5 py-3 text-base rounded-lg',
  };
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost',
    danger: 'btn bg-red-700 text-white px-4 py-2.5 hover:bg-red-800',
  };

  return (
    <button
      type={type}
      className={`${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function Input({ label, className = '', ...props }) {
  return (
    <div>
      {label && <label className="label-field">{label}</label>}
      <input className={`input-field ${className}`} {...props} />
    </div>
  );
}

export function Select({ label, children, className = '', ...props }) {
  return (
    <div>
      {label && <label className="label-field">{label}</label>}
      <select className={`select-field ${className}`} {...props}>
        {children}
      </select>
    </div>
  );
}

export function Card({ children, className = '', bodyClassName = '', padding = true }) {
  return (
    <div className={`card ${className}`}>
      <div className={padding ? `card-body ${bodyClassName}` : bodyClassName}>{children}</div>
    </div>
  );
}

export function PageHeader({ title, description, actions }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
      <div>
        <h2 className="text-xl font-semibold text-navy">{title}</h2>
        {description && <p className="text-sm text-navy/55 mt-1 max-w-2xl">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2 shrink-0">{actions}</div>}
    </div>
  );
}

export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-14 px-6 text-center animate-fade-in">
      <h3 className="text-base font-semibold text-navy">{title}</h3>
      {description && <p className="text-sm text-navy/55 mt-1.5 max-w-sm">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function StatCard({ title, value, icon: Icon, trend, accent = 'brand' }) {
  return (
    <Card className="hover:shadow-card-hover transition-shadow duration-200">
      <div className="min-w-0">
        <p className="text-xs font-medium tracking-wide text-navy/55 uppercase">{title}</p>
        <p className="text-2xl font-semibold text-navy mt-2 tracking-tight tabular-nums">{value}</p>
        {trend !== undefined && (
          <p className={`text-xs font-medium mt-2 ${trend >= 0 ? 'text-signal' : 'text-red-600'}`}>
            {trend >= 0 ? '+' : ''}
            {trend}% vs yesterday
          </p>
        )}
      </div>
    </Card>
  );
}

export function Skeleton({ className = '' }) {
  return <div className={`animate-pulse bg-gray-200/80 rounded-lg ${className}`} />;
}

export function TableShell({ children, className = '' }) {
  return (
    <div className={`table-shell overflow-x-auto ${className}`}>
      {children}
    </div>
  );
}

export function Modal({ open, onClose, title, description, children, size = 'md' }) {
  if (!open) return null;

  const sizes = {
    md: 'max-w-lg',
    lg: 'max-w-xl',
    xl: 'max-w-2xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-navy-dark/55" onClick={onClose} />
      <div
        className={`relative bg-white rounded-lg border border-gray-200 shadow-elevated w-full ${sizes[size]} max-h-[90vh] overflow-y-auto animate-slide-up`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-start justify-between gap-4 px-6 py-4 border-b border-gray-200">
          <div>
            <h3 className="text-lg font-semibold text-navy">{title}</h3>
            {description && <p className="text-sm text-navy/55 mt-0.5">{description}</p>}
          </div>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-navy/40 hover:text-navy hover:bg-navy/[0.04] transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export function Pagination({ page = 1, totalPages = 1, total = 0, limit = 20, onPageChange, className = '' }) {
  if (!total) return null;

  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-between gap-3 ${className}`}>
      <p className="text-sm text-navy/50">
        Showing {start.toLocaleString()}–{end.toLocaleString()} of {total.toLocaleString()}
      </p>
      {totalPages > 1 && (
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
          >
            Previous
          </Button>
          <span className="text-sm text-navy/60 font-medium px-1 tabular-nums">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="secondary"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
