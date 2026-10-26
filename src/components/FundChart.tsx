// Fund overview: verified ledger totals by type, as horizontal bars with a table alternative.
import { useState } from 'react';
import { LEDGER_INFLOWS, LEDGER_TYPES, type LedgerEntry, type LedgerType } from '../../shared/types';
import { formatAmount, useApp } from '../lib/app-context';

function totals(entries: LedgerEntry[]) {
  const sums = new Map<LedgerType, number>();
  for (const e of entries) sums.set(e.type, (sums.get(e.type) ?? 0) + e.amount);
  return LEDGER_TYPES.filter((type) => sums.has(type)).map((type) => ({ type, amount: sums.get(type)! }));
}

export function FundChart({ entries }: { entries: LedgerEntry[] }) {
  const { lang, t } = useApp();
  const [asTable, setAsTable] = useState(false);
  const rows = totals(entries);
  const max = Math.max(...rows.map((r) => r.amount), 1);
  const groups = [
    { title: t.impact.inflows, rows: rows.filter((r) => LEDGER_INFLOWS.includes(r.type)) },
    { title: t.impact.allocations, rows: rows.filter((r) => !LEDGER_INFLOWS.includes(r.type)) },
  ].filter((g) => g.rows.length);

  return (
    <div className="rounded-2xl border border-line bg-white p-6 shadow-card sm:p-8">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setAsTable((v) => !v)}
          className="text-sm font-semibold text-brass-deep underline-offset-4 hover:underline"
          aria-pressed={asTable}
        >
          {asTable ? t.common.chartView : t.common.tableView}
        </button>
      </div>
      {groups.map((g) => (
        <section key={g.title} className="mt-4 first-of-type:mt-2">
          <h3 className="font-sans text-xs font-semibold tracking-[0.16em] text-muted uppercase">{g.title}</h3>
          {asTable ? (
            <table className="mt-3 w-full text-left text-[0.95rem]">
              <thead className="sr-only">
                <tr>
                  <th scope="col">{t.impact.type}</th>
                  <th scope="col">{t.impact.amount}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {g.rows.map((r) => (
                  <tr key={r.type}>
                    <th scope="row" className="py-2.5 font-normal">
                      {t.impact.ledgerTypes[r.type]}
                    </th>
                    <td className="py-2.5 text-right font-medium text-ink tabular-nums">{formatAmount(r.amount, lang)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <ul className="mt-4 space-y-4">
              {g.rows.map((r) => (
                <li key={r.type} title={`${t.impact.ledgerTypes[r.type]}: ${formatAmount(r.amount, lang)}`}>
                  <div className="flex items-baseline justify-between gap-4 text-[0.95rem]">
                    <span>{t.impact.ledgerTypes[r.type]}</span>
                    <span className="font-medium text-ink tabular-nums">{formatAmount(r.amount, lang)}</span>
                  </div>
                  <div aria-hidden className="mt-2 h-2.5 rounded-r bg-sand">
                    <div className="h-full rounded-r bg-deep-2" style={{ width: `${Math.max((r.amount / max) * 100, 1)}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}
