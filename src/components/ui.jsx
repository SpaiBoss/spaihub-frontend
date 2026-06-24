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

const STATUS_COLORS = {
  SUCCESS: 'bg-emerald-50 text-emerald-700 ring-emerald-600/10',
  PENDING: 'bg-amber-50 text-amber-700 ring-amber-600/10',
  FAILED: 'bg-red-50 text-red-700 ring-red-600/10',
  APPROVED: 'bg-emerald-50 text-emerald-700 ring-emerald-600/10',
  REJECTED: 'bg-red-50 text-red-700 ring-red-600/10',
  ONLINE: 'bg-emerald-50 text-emerald-700 ring-emerald-600/10',
  OFFLINE: 'bg-red-50 text-red-700 ring-red-600/10',
  ACTIVE: 'bg-emerald-50 text-emerald-700 ring-emerald-600/10',
  SUSPENDED: 'bg-red-50 text-red-700 ring-red-600/10',
  UNUSED: 'bg-brand/10 text-brand ring-brand/10',
  REDEEMED: 'bg-emerald-50 text-emerald-700 ring-emerald-600/10',
  EXPIRED: 'bg-amber-50 text-amber-700 ring-amber-600/10',
  REVOKED: 'bg-red-50 text-red-700 ring-red-600/10',
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
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ring-1 ring-inset ${
        STATUS_COLORS[status] || 'bg-gray-100 text-gray-600 ring-gray-500/10'
      }`}
    >
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
    md: 'px-4 py-2.5 text-sm rounded-xl',
    lg: 'px-5 py-3 text-base rounded-xl',
  };
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost',
    danger: 'btn bg-red-600 text-white px-4 py-2.5 hover:bg-red-700 shadow-sm',
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
        <h2 className="text-xl font-bold text-navy">{title}</h2>
        {description && <p className="text-sm text-navy/60 mt-1 max-w-2xl">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2 shrink-0">{actions}</div>}
    </div>
  );
}

export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center animate-fade-in">
      {Icon && (
        <div className="w-14 h-14 rounded-2xl bg-brand/10 flex items-center justify-center mb-4">
          <Icon className="w-7 h-7 text-brand" />
        </div>
      )}
      <h3 className="text-base font-semibold text-navy">{title}</h3>
      {description && <p className="text-sm text-navy/60 mt-1 max-w-sm">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function StatCard({ title, value, icon: Icon, trend, accent = 'brand' }) {
  const accents = {
    brand: 'bg-brand/10 text-brand',
    green: 'bg-emerald-50 text-emerald-600',
    navy: 'bg-navy/10 text-navy',
    amber: 'bg-amber-50 text-amber-600',
  };

  return (
    <Card className="hover:shadow-card-hover transition-shadow duration-200">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-navy/60">{title}</p>
          <p className="text-2xl font-bold text-navy mt-2 tracking-tight">{value}</p>
          {trend !== undefined && (
            <p className={`text-xs font-medium mt-2 ${trend >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
              {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}% vs yesterday
            </p>
          )}
        </div>
        {Icon && (
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${accents[accent]}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
    </Card>
  );
}

export function Skeleton({ className = '' }) {
  return <div className={`animate-pulse bg-gray-200/80 rounded-xl ${className}`} />;
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
      <div className="absolute inset-0 bg-navy-dark/60 backdrop-blur-sm" onClick={onClose} />
      <div
        className={`relative bg-white rounded-2xl shadow-elevated w-full ${sizes[size]} max-h-[90vh] overflow-y-auto animate-slide-up`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-start justify-between gap-4 p-6 border-b border-gray-100">
          <div>
            <h3 className="text-lg font-bold text-navy">{title}</h3>
            {description && <p className="text-sm text-navy/60 mt-0.5">{description}</p>}
          </div>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-navy/40 hover:text-navy hover:bg-gray-100 transition-colors"
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
          <span className="text-sm text-navy/60 font-medium px-1">
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
