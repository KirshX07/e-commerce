import React, { useState, useMemo } from 'react';
import { InventoryItem } from '../../types';
import { Search, AlertTriangle, CheckCircle, PackagePlus, ArrowUpRight, TrendingUp, Layers, RefreshCw } from 'lucide-react';

interface InventoryViewProps {
  inventory: InventoryItem[];
  onOpenRestockModal: (item: InventoryItem) => void;
}

export const InventoryView: React.FC<InventoryViewProps> = ({ inventory, onOpenRestockModal }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filteredItems = useMemo(() => {
    return inventory.filter((item) => {
      const matchesSearch =
        item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === 'All'
          ? true
          : statusFilter === 'Alerts'
          ? item.status === 'Low Stock' || item.status === 'Critical'
          : item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [inventory, searchTerm, statusFilter]);

  const lowStockCount = inventory.filter((i) => i.status === 'Low Stock' || i.status === 'Critical').length;
  const totalStockUnits = inventory.reduce((acc, i) => acc + i.stockLevel, 0);

  return (
    <div className="space-y-4">
      {/* Top Summary Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl shadow-card">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
              Inventory & SKU Velocity Monitor
            </h2>
            {lowStockCount > 0 && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200/60 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                {lowStockCount} Reorder Alerts
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time stock depletion thresholds, days of inventory remaining, and margin health.
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono-data tabular-nums">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 rounded-lg text-right">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
              Units on Hand
            </span>
            <span className="text-base font-bold text-slate-900 dark:text-white">
              {totalStockUnits.toLocaleString()} units
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl shadow-card flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search SKU identifier, furniture or lighting model..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto">
          {['All', 'Alerts', 'Healthy', 'Low Stock', 'Critical', 'Overstocked'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                statusFilter === status
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* High-density SKU Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8F9FA] dark:bg-slate-800/60 text-[#64748B] dark:text-slate-400 h-10 border-b border-[#E2E8F0] dark:border-slate-800 text-[11px] font-semibold tracking-wider uppercase font-sans">
                <th className="px-4 py-2">SKU Code</th>
                <th className="px-4 py-2">Product Name</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2 text-right">Stock Level</th>
                <th className="px-4 py-2 text-right">Reorder Pt</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2 text-right">Retail / Margin</th>
                <th className="px-4 py-2 text-right">Runway</th>
                <th className="px-4 py-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredItems.map((item) => {
                const isCritical = item.status === 'Critical';
                const isLow = item.status === 'Low Stock';
                const isOver = item.status === 'Overstocked';

                return (
                  <tr
                    key={item.sku}
                    className="h-[52px] hover:bg-[#F8FAFC] dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="px-4 py-2 font-mono-data text-xs font-bold text-slate-900 dark:text-white">
                      {item.sku}
                    </td>

                    <td className="px-4 py-2">
                      <span className="text-xs font-semibold text-slate-900 dark:text-white block">
                        {item.name}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        Monthly velocity: {item.monthlyVelocity} units/mo
                      </span>
                    </td>

                    <td className="px-4 py-2 text-xs text-slate-600 dark:text-slate-300">
                      {item.category}
                    </td>

                    <td className="px-4 py-2 text-right font-mono-data text-xs font-bold tabular-nums">
                      <span
                        className={
                          isCritical
                            ? 'text-rose-600 dark:text-rose-400'
                            : isLow
                            ? 'text-amber-600 dark:text-amber-400'
                            : 'text-slate-900 dark:text-white'
                        }
                      >
                        {item.stockLevel} units
                      </span>
                    </td>

                    <td className="px-4 py-2 text-right font-mono-data text-xs text-slate-400 tabular-nums">
                      {item.reorderPoint}
                    </td>

                    <td className="px-4 py-2">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                          item.status === 'Healthy'
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60'
                            : isCritical
                            ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border border-rose-200/60'
                            : isLow
                            ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200/60'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {(isCritical || isLow) && <AlertTriangle className="w-3 h-3" />}
                        {item.status === 'Healthy' && <CheckCircle className="w-3 h-3" />}
                        {item.status}
                      </span>
                    </td>

                    <td className="px-4 py-2 text-right font-mono-data tabular-nums">
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        ${item.retailPrice.toFixed(2)}
                      </div>
                      <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                        {item.marginPercent}% margin
                      </div>
                    </td>

                    <td className="px-4 py-2 text-right font-mono-data text-xs text-slate-500 dark:text-slate-400 tabular-nums">
                      {item.turnoverDays} days
                    </td>

                    <td className="px-4 py-2 text-right">
                      <button
                        onClick={() => onOpenRestockModal(item)}
                        className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                          isCritical || isLow
                            ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                            : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200'
                        }`}
                      >
                        Restock
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
