import React, { useState, useEffect } from 'react';
import { ViewMode, Order, InventoryItem } from '../../types';
import { Search, LayoutDashboard, ShoppingBag, PackageCheck, Users2, Activity, ArrowRight, X } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectView: (v: ViewMode) => void;
  orders: Order[];
  inventory: InventoryItem[];
  onSelectOrder: (o: Order) => void;
  onSelectInventory: (i: InventoryItem) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectView,
  orders,
  inventory,
  onSelectOrder,
  onSelectInventory,
}) => {
  const [query, setQuery] = useState('');

  // Keyboard shortcut listener (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const views: { id: ViewMode; label: string; icon: React.ReactNode; desc: string }[] = [
    { id: 'overview', label: 'Executive Overview', icon: <LayoutDashboard className="w-4 h-4" />, desc: 'KPI metrics, revenue dynamics, funnel' },
    { id: 'orders', label: 'Orders & Transactions', icon: <ShoppingBag className="w-4 h-4" />, desc: 'High-density checkout ledger' },
    { id: 'inventory', label: 'Inventory & SKUs', icon: <PackageCheck className="w-4 h-4" />, desc: 'Stock depletion & restock alerts' },
    { id: 'customers', label: 'Cohorts & Retention', icon: <Users2 className="w-4 h-4" />, desc: '6-month repurchase heatmap & VIPs' },
    { id: 'operations', label: 'Channels & Health', icon: <Activity className="w-4 h-4" />, desc: 'Attribution, gateway SLAs, uptime' },
  ];

  const filteredViews = views.filter(
    (v) => v.label.toLowerCase().includes(query.toLowerCase()) || v.desc.toLowerCase().includes(query.toLowerCase())
  );

  const matchedOrders = orders.filter(
    (o) =>
      o.id.toLowerCase().includes(query.toLowerCase()) ||
      o.customerName.toLowerCase().includes(query.toLowerCase()) ||
      o.shippingCity.toLowerCase().includes(query.toLowerCase())
  );

  const matchedSkus = inventory.filter(
    (i) => i.sku.toLowerCase().includes(query.toLowerCase()) || i.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
      />

      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-xl shadow-flyout border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Search Input Bar */}
        <div className="p-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a view name, order number (e.g. ORD-98421), or SKU..."
            className="w-full text-xs bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
          />
          <kbd
            onClick={onClose}
            className="px-1.5 py-0.5 text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-500 rounded cursor-pointer"
          >
            ESC
          </kbd>
        </div>

        {/* Results Container */}
        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-slate-100 dark:divide-slate-800/60">
          {/* Navigation Views */}
          {filteredViews.length > 0 && (
            <div className="py-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 pb-1 block">
                Views & Navigation
              </span>
              {filteredViews.map((v) => (
                <button
                  key={v.id}
                  onClick={() => {
                    onSelectView(v.id);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-left transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                      {v.icon}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-900 dark:text-white block">
                        {v.label}
                      </span>
                      <span className="text-[11px] text-slate-400">{v.desc}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-indigo-600 transition-colors" />
                </button>
              ))}
            </div>
          )}

          {/* Matched Orders */}
          {query.trim().length > 0 && matchedOrders.length > 0 && (
            <div className="py-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 pb-1 block">
                Orders
              </span>
              {matchedOrders.slice(0, 3).map((o) => (
                <button
                  key={o.id}
                  onClick={() => {
                    onSelectOrder(o);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-left transition-colors cursor-pointer"
                >
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white font-mono-data">
                      {o.id} · {o.customerName}
                    </span>
                    <span className="text-[11px] text-slate-400 block">
                      ${o.total.toFixed(2)} · {o.status} · {o.shippingCity}
                    </span>
                  </div>
                  <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">Inspect</span>
                </button>
              ))}
            </div>
          )}

          {/* Matched SKUs */}
          {query.trim().length > 0 && matchedSkus.length > 0 && (
            <div className="py-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 pb-1 block">
                Catalog SKUs
              </span>
              {matchedSkus.slice(0, 3).map((sku) => (
                <button
                  key={sku.sku}
                  onClick={() => {
                    onSelectInventory(sku);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-left transition-colors cursor-pointer"
                >
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white font-mono-data">
                      {sku.sku} · {sku.name}
                    </span>
                    <span className="text-[11px] text-slate-400 block">
                      Stock: {sku.stockLevel} units · ${sku.retailPrice}
                    </span>
                  </div>
                  <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">Restock</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
