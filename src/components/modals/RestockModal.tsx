import React, { useState } from 'react';
import { InventoryItem } from '../../types';
import { X, PackageCheck, AlertTriangle } from 'lucide-react';

interface RestockModalProps {
  item: InventoryItem | null;
  onClose: () => void;
  onConfirmRestock: (sku: string, units: number) => void;
}

export const RestockModal: React.FC<RestockModalProps> = ({ item, onClose, onConfirmRestock }) => {
  const [units, setUnits] = useState(50);

  if (!item) return null;

  const totalCost = units * item.unitCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirmRestock(item.sku, units);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
      />

      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-xl shadow-flyout border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <PackageCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
                Initiate Purchase Order
              </h3>
              <p className="text-xs text-slate-400 font-mono-data">{item.sku}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 rounded-lg">
            <span className="text-xs font-bold text-slate-900 dark:text-white block">
              {item.name}
            </span>
            <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
              <span>Current Stock: <strong>{item.stockLevel} units</strong></span>
              <span>Reorder Trigger: <strong>{item.reorderPoint} units</strong></span>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
              Restock Quantity (Units)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="10"
                max="1000"
                step="10"
                value={units}
                onChange={(e) => setUnits(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono-data tabular-nums focus:outline-none focus:border-indigo-500"
              />
              <span className="text-xs text-slate-400 whitespace-nowrap">units</span>
            </div>
          </div>

          {/* Cost calculation */}
          <div className="p-3 rounded-lg border border-slate-200/80 dark:border-slate-800 text-xs space-y-1.5 font-mono-data tabular-nums">
            <div className="flex justify-between text-slate-500">
              <span>Unit Manufacturing Cost:</span>
              <span>${item.unitCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Estimated Freight & Duties:</span>
              <span>${(units * 4.2).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-slate-900 dark:text-white pt-1.5 border-t border-slate-100 dark:border-slate-800 text-sm">
              <span>Total Purchase Order:</span>
              <span className="text-indigo-600 dark:text-indigo-400">
                ${(totalCost + units * 4.2).toFixed(2)}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              Authorize PO & Transmit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
