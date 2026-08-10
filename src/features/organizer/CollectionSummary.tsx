import { Download, IndianRupee, Receipt, Users2 } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { EmptyState } from '../../components/ui/EmptyState';
import { Button } from '../../components/ui/Button';
import { formatInr, formatDateTime } from '../../utils/formatters';
import { downloadTextFile } from '../../utils/download';
import { collectionSummary, exportDonationsAsCsv, listDonations } from '../../services/mandalService';

export function CollectionSummary({ isDemo = false }: { isDemo?: boolean }) {
  const summary = collectionSummary(isDemo);
  const donations = listDonations(isDemo);

  const handleExport = () => {
    const csv = exportDonationsAsCsv(isDemo);
    downloadTextFile(`utsavam-collections-${new Date().toISOString().slice(0, 10)}.csv`, csv);
  };

  if (donations.length === 0) {
    return (
      <Card>
        <EmptyState
          icon={<Receipt className="h-8 w-8" />}
          title="No donations recorded yet"
          description="Once your collectors start recording donations, collection summaries and exports will appear here."
        />
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="flex items-center gap-3" padded>
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--accent-bg)] text-[var(--accent)]">
            <IndianRupee className="h-5 w-5" />
          </span>
          <div>
            <p className="text-xs text-[var(--text)]">Total collected</p>
            <p className="text-xl font-semibold text-[var(--text-h)]">{formatInr(summary.totalAmount)}</p>
          </div>
        </Card>
        <Card className="flex items-center gap-3" padded>
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--accent-bg)] text-[var(--accent)]">
            <Receipt className="h-5 w-5" />
          </span>
          <div>
            <p className="text-xs text-[var(--text)]">Receipts issued</p>
            <p className="text-xl font-semibold text-[var(--text-h)]">{summary.totalDonations}</p>
          </div>
        </Card>
        <Card className="flex items-center gap-3" padded>
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--accent-bg)] text-[var(--accent)]">
            <Users2 className="h-5 w-5" />
          </span>
          <div>
            <p className="text-xs text-[var(--text)]">Average donation</p>
            <p className="text-xl font-semibold text-[var(--text-h)]">{formatInr(summary.averageAmount)}</p>
          </div>
        </Card>
      </div>

      <Card>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-semibold text-[var(--text-h)]">Recent donations</h3>
          <Button size="sm" variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4" /> Export CSV
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] text-xs uppercase tracking-wide text-[var(--text)]">
                <th className="py-2 pr-4 font-medium">Donor</th>
                <th className="py-2 pr-4 font-medium">Amount</th>
                <th className="py-2 pr-4 font-medium">Collector</th>
                <th className="py-2 pr-4 font-medium">Status</th>
                <th className="py-2 pr-4 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {donations.slice(0, 25).map((d) => (
                <tr key={d.id} className="border-b border-[var(--border)] last:border-0">
                  <td className="py-2.5 pr-4 font-medium text-[var(--text-h)]">{d.donorName}</td>
                  <td className="py-2.5 pr-4">{formatInr(d.amount)}</td>
                  <td className="py-2.5 pr-4">{d.collectorName}</td>
                  <td className="py-2.5 pr-4">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        d.paymentStatus === 'success'
                          ? 'bg-emerald-50 text-emerald-700'
                          : d.paymentStatus === 'failed'
                            ? 'bg-rose-50 text-rose-700'
                            : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {d.paymentStatus}
                    </span>
                  </td>
                  <td className="py-2.5 pr-4 text-[var(--text)]">{formatDateTime(d.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
