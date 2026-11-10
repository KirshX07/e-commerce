import React from 'react';
import { CONVERSION_FUNNEL } from '../../mockData';
import { ArrowDown } from 'lucide-react';

export const ConversionFunnelChart: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-xl p-6 shadow-card flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
            E-Commerce Conversion Funnel
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Session to completed transaction conversion velocity
          </p>
        </div>
        <div className="text-right">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Overall Rate
          </span>
          <span className="font-display text-base font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
            7.11%
          </span>
        </div>
      </div>

      <div className="space-y-3.5 my-auto">
        {CONVERSION_FUNNEL.map((step, idx) => {
          return (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-slate-700 dark:text-slate-200 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-[11px] font-bold text-slate-600 dark:text-slate-300 flex items-center justify-center">
                    {idx + 1}
                  </span>
                  {step.stage}
                </span>
                <div className="flex items-center gap-3 font-mono-data tabular-nums">
                  <span className="font-bold text-slate-900 dark:text-white">
                    {step.count.toLocaleString()}
                  </span>
                  <span className="text-slate-400 text-[11px] w-12 text-right">
                    {step.rate}%
                  </span>
                </div>
              </div>

              {/* Progress bar representing funnel stage width */}
              <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 dark:from-indigo-600 dark:to-indigo-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.max(step.rate, 3)}%` }}
                />
              </div>

              {idx < CONVERSION_FUNNEL.length - 1 && (
                <div className="flex items-center justify-end gap-1 text-[11px] text-rose-500 dark:text-rose-400 font-medium tabular-nums pl-7">
                  <ArrowDown className="w-3 h-3" />
                  <span>{step.dropoff} drop-off to next step</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="pt-3 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
        <span>Cart abandonment rate: 45.6%</span>
        <span className="text-indigo-600 dark:text-indigo-400 font-medium cursor-pointer hover:underline">
          Optimize Checkout Flow →
        </span>
      </div>
    </div>
  );
};
