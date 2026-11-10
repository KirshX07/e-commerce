import React from 'react';
import { CHANNEL_PERFORMANCES, GATEWAY_HEALTH } from '../../mockData';
import { Activity, ShieldCheck, CheckCircle2, Zap, Globe, ArrowUpRight, Server } from 'lucide-react';

export const OperationalHealthView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
              Acquisition Channels & Infrastructure Health
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              99.98% System Uptime
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Omnichannel revenue attribution, customer acquisition cost (CAC), ROAS, and payment gateway SLAs.
          </p>
        </div>
      </div>

      {/* Gateway SLA & Latency Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {GATEWAY_HEALTH.map((gw) => (
          <div
            key={gw.name}
            className="p-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl shadow-card"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Payment Connector
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                {gw.status}
              </span>
            </div>

            <div className="text-xs font-bold text-slate-900 dark:text-white mb-3">
              {gw.name}
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 font-mono-data tabular-nums text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block">Avg Latency</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {gw.avgLatencyMs}ms
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">Success Rate</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  {gw.successRate}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Channel Attribution & Marketing ROI Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl shadow-card p-6">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
              Marketing Attribution & Channel Efficiency
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Blended Return on Ad Spend (ROAS) and Customer Acquisition Cost (CAC) by channel
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 text-[11px] font-semibold uppercase tracking-wider h-10 border-b border-slate-200 dark:border-slate-700">
                <th className="px-4 py-2">Acquisition Channel</th>
                <th className="px-4 py-2 text-right">Sessions</th>
                <th className="px-4 py-2 text-right">Orders</th>
                <th className="px-4 py-2 text-right">CR%</th>
                <th className="px-4 py-2 text-right">GMV Contribution</th>
                <th className="px-4 py-2 text-right">CAC</th>
                <th className="px-4 py-2 text-right">ROAS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs font-mono-data tabular-nums">
              {CHANNEL_PERFORMANCES.map((ch) => (
                <tr key={ch.channel} className="h-12 hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="px-4 py-2 font-sans font-bold text-slate-900 dark:text-white">
                    {ch.channel}
                  </td>
                  <td className="px-4 py-2 text-right text-slate-500 dark:text-slate-400">
                    {ch.sessions.toLocaleString()}
                  </td>
                  <td className="px-4 py-2 text-right font-bold text-slate-900 dark:text-white">
                    {ch.conversions.toLocaleString()}
                  </td>
                  <td className="px-4 py-2 text-right font-bold text-indigo-600 dark:text-indigo-400">
                    {ch.conversionRate}%
                  </td>
                  <td className="px-4 py-2 text-right font-bold text-slate-900 dark:text-white">
                    ${ch.revenue.toLocaleString()}
                  </td>
                  <td className="px-4 py-2 text-right text-slate-600 dark:text-slate-300">
                    ${ch.cac.toFixed(2)}
                  </td>
                  <td className="px-4 py-2 text-right">
                    <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 font-bold border border-emerald-200/50">
                      <ArrowUpRight className="w-3 h-3" />
                      {ch.roas}x
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
