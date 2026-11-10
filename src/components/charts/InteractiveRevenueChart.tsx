import React, { useState, useId } from 'react';
import { RevenueDataPoint, TimeRange } from '../../types';
import { TrendingUp, Calendar, Download, Sparkles } from 'lucide-react';

interface InteractiveRevenueChartProps {
  data: RevenueDataPoint[];
  timeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
  onExport?: () => void;
}

export const InteractiveRevenueChart: React.FC<InteractiveRevenueChartProps> = ({
  data,
  timeRange,
  onTimeRangeChange,
  onExport,
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [metricMode, setMetricMode] = useState<'both' | 'revenue' | 'margin'>('both');
  const gradientId = useId();

  if (!data || data.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl p-6 shadow-card h-80 flex items-center justify-center text-slate-400">
        No revenue data recorded for this timeframe.
      </div>
    );
  }

  // Dimensions
  const svgWidth = 800;
  const svgHeight = 280;
  const paddingLeft = 60;
  const paddingRight = 30;
  const paddingTop = 20;
  const paddingBottom = 40;

  const chartWidth = svgWidth - paddingLeft - paddingRight;
  const chartHeight = svgHeight - paddingTop - paddingBottom;

  // Max calculations
  const maxRevenue = Math.max(...data.map((d) => d.revenue)) * 1.15;
  const maxMargin = Math.max(...data.map((d) => d.margin)) * 1.15;

  const getX = (index: number) => {
    if (data.length <= 1) return paddingLeft;
    return paddingLeft + (index / (data.length - 1)) * chartWidth;
  };

  const getYRevenue = (val: number) => {
    return paddingTop + chartHeight - (val / maxRevenue) * chartHeight;
  };

  const getYMargin = (val: number) => {
    return paddingTop + chartHeight - (val / maxMargin) * chartHeight;
  };

  // Build line paths
  const revenuePoints = data.map((d, i) => `${getX(i).toFixed(1)},${getYRevenue(d.revenue).toFixed(1)}`);
  const revenueLine = `M ${revenuePoints.join(' L ')}`;
  const revenueArea = `${revenueLine} L ${getX(data.length - 1)},${paddingTop + chartHeight} L ${paddingLeft},${paddingTop + chartHeight} Z`;

  const marginPoints = data.map((d, i) => `${getX(i).toFixed(1)},${getYMargin(d.margin).toFixed(1)}`);
  const marginLine = `M ${marginPoints.join(' L ')}`;

  // Y-axis ticks (4 ticks)
  const yTicks = [0, 0.33, 0.66, 1].map((pct) => {
    const val = maxRevenue * pct;
    const y = paddingTop + chartHeight - pct * chartHeight;
    return { val, y };
  });

  const activePoint = hoverIndex !== null ? data[hoverIndex] : data[data.length - 1];
  const activeX = hoverIndex !== null ? getX(hoverIndex) : getX(data.length - 1);
  const activeYRev = hoverIndex !== null ? getYRevenue(activePoint.revenue) : getYRevenue(activePoint.revenue);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-xl p-6 shadow-card flex flex-col justify-between">
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
              Revenue & Margin Dynamics
            </h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900">
              Audited Ledger
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time daily transaction velocity, margin realization, and AOV performance.
          </p>
        </div>

        {/* Controls & Timeframe Selector */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Metric View Toggle */}
          <div className="inline-flex items-center p-0.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300">
            <button
              onClick={() => setMetricMode('both')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                metricMode === 'both'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                  : 'hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Combined
            </button>
            <button
              onClick={() => setMetricMode('revenue')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                metricMode === 'revenue'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                  : 'hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Revenue
            </button>
            <button
              onClick={() => setMetricMode('margin')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                metricMode === 'margin'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                  : 'hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Margin
            </button>
          </div>

          {/* Timeframe Buttons */}
          <div className="inline-flex items-center p-0.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300">
            {(['7d', '30d', '90d', '1y'] as TimeRange[]).map((range) => (
              <button
                key={range}
                onClick={() => onTimeRangeChange(range)}
                className={`px-2.5 py-1 rounded-md uppercase transition-colors ${
                  timeRange === range
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          {onExport && (
            <button
              onClick={onExport}
              title="Export revenue data"
              className="p-1.5 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Quick Summary Pill Bar above chart */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4 p-3 bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-lg">
        <div>
          <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">
            Focused Point ({activePoint.date})
          </span>
          <span className="font-display text-lg font-bold text-slate-900 dark:text-white tabular-nums">
            ${activePoint.revenue.toLocaleString()}
          </span>
        </div>
        <div>
          <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">
            Net Margin Realized
          </span>
          <span className="font-display text-lg font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
            ${activePoint.margin.toLocaleString()}{' '}
            <span className="text-xs text-slate-500 font-normal">
              ({((activePoint.margin / activePoint.revenue) * 100).toFixed(1)}%)
            </span>
          </span>
        </div>
        <div>
          <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">
            Orders Processed
          </span>
          <span className="font-display text-lg font-bold text-slate-900 dark:text-white tabular-nums">
            {activePoint.orders.toLocaleString()}
          </span>
        </div>
        <div>
          <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">
            Average Order Value
          </span>
          <span className="font-display text-lg font-bold text-slate-900 dark:text-white tabular-nums">
            ${activePoint.aov.toFixed(2)}
          </span>
        </div>
      </div>

      {/* SVG Canvas with Interactive Hover */}
      <div className="relative w-full h-[280px]">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-full select-none"
          preserveAspectRatio="none"
          onMouseLeave={() => setHoverIndex(null)}
        >
          <defs>
            <linearGradient id={`${gradientId}-rev`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id={`${gradientId}-mar`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {yTicks.map((tick, i) => (
            <g key={i}>
              <line
                x1={paddingLeft}
                y1={tick.y}
                x2={svgWidth - paddingRight}
                y2={tick.y}
                stroke="currentColor"
                className="text-slate-100 dark:text-slate-800"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <text
                x={paddingLeft - 10}
                y={tick.y + 4}
                textAnchor="end"
                className="text-[11px] fill-slate-400 font-mono-data tabular-nums"
              >
                ${Math.round(tick.val / 1000)}k
              </text>
            </g>
          ))}

          {/* Revenue Area & Line */}
          {(metricMode === 'both' || metricMode === 'revenue') && (
            <>
              <path d={revenueArea} fill={`url(#${gradientId}-rev)`} />
              <path
                d={revenueLine}
                fill="none"
                stroke="#4F46E5"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </>
          )}

          {/* Margin Line */}
          {(metricMode === 'both' || metricMode === 'margin') && (
            <path
              d={marginLine}
              fill="none"
              stroke="#10B981"
              strokeWidth="2"
              strokeDasharray={metricMode === 'both' ? '3 3' : 'none'}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Hover Crosshair */}
          {hoverIndex !== null && (
            <g>
              <line
                x1={activeX}
                y1={paddingTop}
                x2={activeX}
                y2={paddingTop + chartHeight}
                stroke="#6366F1"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
              {/* Point Indicator */}
              <circle
                cx={activeX}
                cy={activeYRev}
                r="5"
                fill="#4F46E5"
                stroke="#FFFFFF"
                strokeWidth="2"
              />
              {(metricMode === 'both' || metricMode === 'margin') && (
                <circle
                  cx={activeX}
                  cy={getYMargin(activePoint.margin)}
                  r="4"
                  fill="#10B981"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                />
              )}
            </g>
          )}

          {/* X Axis labels */}
          {data.map((d, i) => {
            const step = Math.ceil(data.length / 7);
            if (i % step !== 0 && i !== data.length - 1) return null;
            return (
              <text
                key={i}
                x={getX(i)}
                y={svgHeight - 12}
                textAnchor="middle"
                className="text-[11px] fill-slate-400 font-sans"
              >
                {d.date}
              </text>
            );
          })}

          {/* Invisible interactive hover rects */}
          {data.map((_, i) => {
            const widthPerBar = chartWidth / data.length;
            const x = getX(i) - widthPerBar / 2;
            return (
              <rect
                key={i}
                x={Math.max(paddingLeft, x)}
                y={paddingTop}
                width={widthPerBar}
                height={chartHeight}
                fill="transparent"
                className="cursor-crosshair"
                onMouseEnter={() => setHoverIndex(i)}
              />
            );
          })}
        </svg>
      </div>

      {/* Legend & Footnote */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-3 mt-2 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-1 bg-indigo-600 rounded-full"></span>
            <span className="font-medium text-slate-700 dark:text-slate-300">Gross Revenue (GMV)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-1 bg-emerald-500 rounded-full"></span>
            <span className="font-medium text-slate-700 dark:text-slate-300">Net Profit Margin</span>
          </div>
        </div>
        <div className="text-[11px] text-slate-400">
          Hover to inspect granular daily performance
        </div>
      </div>
    </div>
  );
};
