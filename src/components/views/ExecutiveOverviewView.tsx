import React from 'react';
import { KPIMetric, RevenueDataPoint, TimeRange, Order } from '../../types';
import { MetricCard } from '../MetricCard';
import { InteractiveRevenueChart } from '../charts/InteractiveRevenueChart';
import { ConversionFunnelChart } from '../charts/ConversionFunnelChart';
import { CategoryBreakdown } from '../charts/CategoryBreakdown';
import { OperationalFeed } from '../OperationalFeed';
import { DollarSign, Percent, ShoppingCart, Users, ArrowUpRight, AlertTriangle, Sparkles } from 'lucide-react';

interface ExecutiveOverviewViewProps {
  kpis: KPIMetric[];
  revenueData: RevenueDataPoint[];
  timeRange: TimeRange;
  onTimeRangeChange: (t: TimeRange) => void;
  orders: Order[];
  onSelectOrder: (order: Order) => void;
  onNavigateToOrders: () => void;
  onNavigateToInventory: () => void;
  onOpenExportModal: () => void;
}

export const ExecutiveOverviewView: React.FC<ExecutiveOverviewViewProps> = ({
  kpis,
  revenueData,
  timeRange,
  onTimeRangeChange,
  orders,
  onSelectOrder,
  onNavigateToOrders,
  onNavigateToInventory,
  onOpenExportModal,
}) => {
  const getKpiIcon = (id: string) => {
    switch (id) {
      case 'gross_revenue':
        return <DollarSign className="w-4 h-4" />;
      case 'net_margin':
        return <Percent className="w-4 h-4" />;
      case 'aov':
        return <ShoppingCart className="w-4 h-4" />;
      case 'returning_rate':
        return <Users className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Executive Welcome & Key Summary Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 rounded-xl text-white shadow-card">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-white/90 text-xs font-semibold backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
            <span>Q4 Peak Trading Velocity</span>
          </div>
          <h2 className="font-display text-2xl font-bold tracking-tight">
            Executive Performance Briefing
          </h2>
          <p className="text-xs text-slate-300 max-w-xl">
            Store revenue is pacing <span className="text-emerald-400 font-semibold">+14.8%</span> ahead of prior period projections, driven by surging architectural lighting and elevated Average Order Value ($184.60).
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onNavigateToInventory}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/30 text-xs font-semibold transition-colors cursor-pointer"
          >
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>2 Low-Stock Alerts</span>
          </button>

          <button
            onClick={onOpenExportModal}
            className="px-4 py-2 rounded-lg bg-white text-indigo-950 hover:bg-slate-100 text-xs font-bold transition-colors shadow-sm cursor-pointer"
          >
            Download Deck
          </button>
        </div>
      </div>

      {/* 4 KPI Metric Cards in 12-Column Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi) => (
          <MetricCard
            key={kpi.id}
            metric={kpi}
            icon={getKpiIcon(kpi.id)}
            onClick={kpi.id === 'gross_revenue' ? onNavigateToOrders : undefined}
          />
        ))}
      </div>

      {/* Main 12-Column Layout: 8 cols Revenue Chart + 4 cols Live Operational Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-8 flex flex-col">
          <InteractiveRevenueChart
            data={revenueData}
            timeRange={timeRange}
            onTimeRangeChange={onTimeRangeChange}
            onExport={onOpenExportModal}
          />
        </div>

        <div className="lg:col-span-4 flex flex-col">
          <OperationalFeed
            orders={orders}
            onSelectOrder={onSelectOrder}
            onViewAllOrders={onNavigateToOrders}
          />
        </div>
      </div>

      {/* Lower 12-Column Layout: Conversion Funnel (6 cols) + Category Breakdown (6 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-6 flex flex-col">
          <ConversionFunnelChart />
        </div>

        <div className="lg:col-span-6 flex flex-col">
          <CategoryBreakdown />
        </div>
      </div>
    </div>
  );
};
