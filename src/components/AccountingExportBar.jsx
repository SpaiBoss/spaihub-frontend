import { useState } from 'react';
import { Download, FileSpreadsheet } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../services/api';
import { Button } from '../ui';

function defaultRange() {
  const to = new Date();
  const from = new Date();
  from.setDate(from.getDate() - 29);
  return {
    dateFrom: from.toISOString().slice(0, 10),
    dateTo: to.toISOString().slice(0, 10),
  };
}

export default function AccountingExportBar({ mode = 'owner' }) {
  const [range, setRange] = useState(defaultRange);
  const [loading, setLoading] = useState(false);

  const basePath = mode === 'admin' ? '/api/admin/reports/accounting' : '/api/owner/reports/accounting';

  async function exportAccounting() {
    setLoading(true);
    try {
      const params = new URLSearchParams(range);
      const response = await api.get(`${basePath}?${params}`, { responseType: 'blob' });
      const url = URL.createObjectURL(response.data);
      const a = document.createElement('a');
      a.href = url;
      a.download = `accounting-${range.dateFrom}-${range.dateTo}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success('Accounting report downloaded');
    } catch {
      toast.error('Failed to export accounting report');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card p-4 sm:p-5 flex flex-col lg:flex-row lg:items-end gap-4 lg:justify-between">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <FileSpreadsheet className="w-4 h-4 text-brand" />
          <h3 className="font-semibold text-navy">Accounting export</h3>
        </div>
        <p className="text-sm text-navy/55 max-w-2xl">
          Download a CSV with summary totals, daily breakdown, location or owner totals, and full transaction detail for your accountant.
        </p>
      </div>
      <div className="flex flex-wrap items-end gap-3">
        <div>
          <label className="label-field">From</label>
          <input
            type="date"
            value={range.dateFrom}
            onChange={(e) => setRange({ ...range, dateFrom: e.target.value })}
            className="input-field py-2 w-auto"
          />
        </div>
        <div>
          <label className="label-field">To</label>
          <input
            type="date"
            value={range.dateTo}
            onChange={(e) => setRange({ ...range, dateTo: e.target.value })}
            className="input-field py-2 w-auto"
          />
        </div>
        <Button onClick={exportAccounting} disabled={loading} className="gap-2">
          <Download className="w-4 h-4" />
          {loading ? 'Exporting...' : 'Export CSV'}
        </Button>
      </div>
    </div>
  );
}
