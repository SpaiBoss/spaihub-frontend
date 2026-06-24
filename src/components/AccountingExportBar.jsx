import { useState } from 'react';
import { Download } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../services/api';
import { Button } from './ui';

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
      toast.success('CSV downloaded');
    } catch {
      toast.error('Export failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-wrap items-end gap-3">
      <input
        type="date"
        value={range.dateFrom}
        onChange={(e) => setRange({ ...range, dateFrom: e.target.value })}
        className="input-field py-2 w-auto"
      />
      <input
        type="date"
        value={range.dateTo}
        onChange={(e) => setRange({ ...range, dateTo: e.target.value })}
        className="input-field py-2 w-auto"
      />
      <Button onClick={exportAccounting} disabled={loading} variant="secondary" className="gap-2">
        <Download className="w-4 h-4" />
        {loading ? 'Exporting...' : 'Export CSV'}
      </Button>
    </div>
  );
}
