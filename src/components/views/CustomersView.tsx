import React, { useState } from 'react';
import { CustomerCohort, TopCustomer } from '../../types';
import { MOCK_COHORTS, MOCK_TOP_CUSTOMERS } from '../../mockData';
import { Users, Crown, ArrowUpRight, Search, Mail, ShieldCheck } from 'lucide-react';

export const CustomersView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = MOCK_TOP_CUSTOMERS.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRetentionColor = (rate: number) => {
    if (rate === 0) return 'bg-slate-50 dark:bg-slate-800 text-slate-300 dark:text-slate-600';
    if (rate >= 40) return 'bg-emerald-600 text-white font-bold';
    if (rate >= 35) return 'bg-emerald-500 text-white font-semibold';
    if (rate >= 30) return 'bg-emerald-400 text-emerald-950 font-medium';
    if (rate >= 25) return 'bg-emerald-200 text-emerald-900';
    return 'bg-emerald-100 text-emerald-800';
  };

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
              Customer Retention & Cohort Dynamics
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60">
              42.8% 6-Mo Retention
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Long-term cohort retention velocity, recurring repurchase rate, and executive VIP accounts.
          </p>
        </div>
      </div>

      {/* Cohort Heatmap Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl shadow-card p-6">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
              Repurchase Cohort Heatmap (6-Month Horizon)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Percentage of monthly acquired customers who placed subsequent repeat orders
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="w-3 h-3 rounded bg-emerald-100" />
            <span>&lt;25%</span>
            <span className="w-3 h-3 rounded bg-emerald-300 ml-1" />
            <span>30%</span>
            <span className="w-3 h-3 rounded bg-emerald-600 ml-1" />
            <span>&gt;40%</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 text-[11px] font-semibold uppercase tracking-wider h-10 border-b border-slate-200 dark:border-slate-700">
                <th className="px-4 py-2">Acquisition Cohort</th>
                <th className="px-4 py-2 text-right">Size</th>
                <th className="px-3 py-2 text-center">Month 0</th>
                <th className="px-3 py-2 text-center">Month 1</th>
                <th className="px-3 py-2 text-center">Month 2</th>
                <th className="px-3 py-2 text-center">Month 3</th>
                <th className="px-3 py-2 text-center">Month 4</th>
                <th className="px-3 py-2 text-center">Month 5</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs font-mono-data tabular-nums">
              {MOCK_COHORTS.map((cohort) => (
                <tr key={cohort.cohortMonth} className="h-12 hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="px-4 py-2 font-sans font-bold text-slate-900 dark:text-white">
                    {cohort.cohortMonth}
                  </td>
                  <td className="px-4 py-2 text-right text-slate-500 dark:text-slate-400">
                    {cohort.totalCustomers.toLocaleString()} users
                  </td>
                  {cohort.retentionRates.map((rate, i) => (
                    <td key={i} className="px-2 py-1.5 text-center">
                      <div
                        className={`py-1.5 px-2 rounded text-xs transition-transform hover:scale-105 ${getRetentionColor(
                          rate
                        )}`}
                      >
                        {rate > 0 ? `${rate}%` : '—'}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Customers / VIP Tier Section */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl shadow-card p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <Crown className="w-4 h-4 text-amber-500" />
              <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
                High-Value VIP Spenders
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Accounts contributing &gt; $3,000 cumulative lifetime GMV
            </p>
          </div>

          <div className="relative w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search customer name or email..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {filteredCustomers.map((cust) => (
            <div
              key={cust.id}
              className="py-3.5 flex items-center justify-between gap-4 hover:bg-slate-50/80 dark:hover:bg-slate-800/40 p-2 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-3">
                <img
                  src={cust.avatar}
                  alt={cust.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {cust.name}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.2 rounded-full ${
                        cust.tier === 'VIP Platinum'
                          ? 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300'
                          : cust.tier === 'Gold Tier'
                          ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {cust.tier}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 block">{cust.email}</span>
                </div>
              </div>

              <div className="text-right font-mono-data tabular-nums">
                <div className="text-sm font-bold text-slate-900 dark:text-white">
                  ${cust.totalSpent.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
                <div className="text-[11px] text-slate-400">
                  {cust.totalOrders} orders · AOV ${cust.averageOrderValue.toFixed(0)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
