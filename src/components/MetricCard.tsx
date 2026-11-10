import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { KPIMetric } from '../types';

interface MetricCardProps {
  metric: KPIMetric;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({ metric, icon, onClick }) => {
  const { category, label, value, changePercent, isPositive, timeframeLabel, sparklineData } = metric;

  // Build SVG sparkline path
  const minVal = Math.min(...sparklineData);
  const maxVal = Math.max(...sparklineData);
  const range = maxVal - minVal || 1;
  const width = 120;
  const height = 36;
  const paddingY = 4;

  const points = sparklineData.map((val, idx) => {
    const x = (idx / (sparklineData.length - 1)) * width;
    const y = height - paddingY - ((val - minVal) / range) * (height - paddingY * 2);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  const linePath = `M ${points.join(' L ')}`;
  const areaPath = `${linePath} L ${width},${height} L 0,${height} Z`;

  const strokeColor = isPositive ? '#10B981' : '#EF4444';
  const fillColor = isPositive ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.08)';

  return (
    <div
      onClick={onClick}
      className={`group relative bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between ${
        onClick ? 'cursor-pointer hover:border-slate-300 dark:hover:border-slate-700' : ''
      }`}
    >
      {/* Upper Tier: Category & Action Icon */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-[11px] font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase font-sans">
          {category}
        </span>
        {icon && (
          <div className="text-slate-400 dark:text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {icon}
          </div>
        )}
      </div>

      {/* Metric Label */}
      <div className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">
        {label}
      </div>

      {/* Center Tier: Bold Metric Value */}
      <div className="font-display text-[30px] font-bold leading-9 tracking-tight text-slate-900 dark:text-white tabular-nums my-1">
        {value}
      </div>

      {/* Lower Tier: Sparkline & Growth Badge */}
      <div className="flex items-end justify-between gap-3 pt-3 mt-1 border-t border-slate-100 dark:border-slate-800/60">
        {/* Growth Chip */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span
            className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-semibold tabular-nums ${
              isPositive
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800/60'
                : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border border-rose-200/80 dark:border-rose-800/60'
            }`}
          >
            {isPositive ? (
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
            ) : (
              <ArrowDownRight className="w-3.5 h-3.5 shrink-0" />
            )}
            <span>{isPositive ? `+${changePercent}%` : `${changePercent}%`}</span>
          </span>
          <span className="text-xs text-slate-400 dark:text-slate-500 font-normal">
            {timeframeLabel}
          </span>
        </div>

        {/* Micro Sparkline SVG */}
        <div className="shrink-0 w-[110px] h-[34px] overflow-hidden">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-full overflow-visible"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id={`grad-${metric.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={strokeColor} stopOpacity="0.25" />
                <stop offset="100%" stopColor={strokeColor} stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path d={areaPath} fill={`url(#grad-${metric.id})`} />
            <path
              d={linePath}
              fill="none"
              stroke={strokeColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
