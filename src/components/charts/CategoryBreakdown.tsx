import React from 'react';
import { CATEGORY_BREAKDOWN } from '../../mockData';

export const CategoryBreakdown: React.FC = () => {
  const totalRevenue = CATEGORY_BREAKDOWN.reduce((acc, c) => acc + c.revenue, 0);

  const colors = [
    'bg-indigo-600',
    'bg-teal-500',
    'bg-amber-500',
    'bg-slate-400',
  ];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-xl p-6 shadow-card flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
            Category Contribution
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Merchandise gross revenue mix & inventory volume
          </p>
        </div>
        <div className="text-right">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Catalog Revenue
          </span>
          <span className="font-display text-base font-bold text-slate-900 dark:text-white tabular-nums">
            ${totalRevenue.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Multi-segment bar */}
      <div className="h-3 w-full rounded-full overflow-hidden flex gap-1 p-0.5 bg-slate-100 dark:bg-slate-800 mb-6">
        {CATEGORY_BREAKDOWN.map((cat, i) => (
          <div
            key={cat.name}
            style={{ width: `${cat.share}%` }}
            className={`h-full ${colors[i % colors.length]} rounded-sm transition-all duration-300`}
            title={`${cat.name}: ${cat.share}%`}
          />
        ))}
      </div>

      {/* Categories Breakdown List */}
      <div className="space-y-3.5 my-auto">
        {CATEGORY_BREAKDOWN.map((cat, i) => (
          <div
            key={cat.name}
            className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className={`w-2.5 h-2.5 rounded-full ${colors[i % colors.length]} shrink-0`} />
              <div>
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 block">
                  {cat.name}
                </span>
                <span className="text-[11px] text-slate-400">
                  {cat.count} · Growth{' '}
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                    {cat.growth}
                  </span>
                </span>
              </div>
            </div>

            <div className="text-right font-mono-data tabular-nums">
              <div className="text-xs font-bold text-slate-900 dark:text-white">
                ${cat.revenue.toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-400 font-medium">
                {cat.share}% share
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-3 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
        <span>Active SKUs tracked: 142</span>
        <span className="text-indigo-600 dark:text-indigo-400 font-medium cursor-pointer hover:underline">
          View Catalog Report →
        </span>
      </div>
    </div>
  );
};
