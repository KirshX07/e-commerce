import React from 'react';
import { ViewMode, TimeRange } from '../types';
import { Search, Calendar, RefreshCw, Download, Menu, Bell, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  currentView: ViewMode;
  timeRange: TimeRange;
  onTimeRangeChange: (r: TimeRange) => void;
  onOpenCommandPalette: () => void;
  onOpenExportModal: () => void;
  onToggleMobileMenu: () => void;
  onRefreshData: () => void;
  isRefreshing: boolean;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const VIEW_TITLES: Record<ViewMode, { title: string; category: string }> = {
  overview: { title: 'Executive Overview', category: 'Intelligence' },
  orders: { title: 'Transactions & Orders', category: 'Fulfillment' },
  inventory: { title: 'Inventory & SKU Velocity', category: 'Supply Chain' },
  customers: { title: 'Cohort Retention & LTV', category: 'Customers' },
  operations: { title: 'Channel Performance & Health', category: 'Infrastructure' },
};

export const Header: React.FC<HeaderProps> = ({
  currentView,
  timeRange,
  onTimeRangeChange,
  onOpenCommandPalette,
  onOpenExportModal,
  onToggleMobileMenu,
  onRefreshData,
  isRefreshing,
  theme,
  onToggleTheme,
}) => {
  const current = VIEW_TITLES[currentView];

  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4 transition-colors">
      {/* Zone 1: Brand / Breadcrumbs */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onToggleMobileMenu}
          className="lg:hidden p-1.5 -ml-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
          aria-label="Toggle mobile navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span className="font-semibold text-slate-900 dark:text-white font-display text-sm">
            Lumina
          </span>
          <span className="text-slate-300 dark:text-slate-700">/</span>
          <span className="hidden sm:inline text-slate-400 font-medium">
            {current.category}
          </span>
          <span className="hidden sm:inline text-slate-300 dark:text-slate-700">/</span>
          <span className="font-semibold text-indigo-600 dark:text-indigo-400">
            {current.title}
          </span>
        </div>
      </div>

      {/* Zone 2: Command Search Bar */}
      <div className="flex-1 max-w-md hidden md:block">
        <button
          onClick={onOpenCommandPalette}
          className="w-full flex items-center justify-between px-3.5 py-1.5 text-xs text-slate-400 bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-white dark:hover:bg-slate-800 transition-all text-left group cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
            <span className="text-slate-500 dark:text-slate-400">
              Search orders, SKUs, customers...
            </span>
          </div>
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-300 rounded shadow-xs">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Zone 3: Actions & Quick Controls */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Refresh simulation button */}
        <button
          onClick={onRefreshData}
          disabled={isRefreshing}
          title="Refresh analytics telemetry"
          className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-indigo-600' : ''}`} />
        </button>

        {/* Theme Toggle Button */}
        <button
          onClick={onToggleTheme}
          title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Export / Primary Action */}
        <button
          onClick={onOpenExportModal}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg shadow-sm transition-colors cursor-pointer whitespace-nowrap shrink-0"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Report</span>
        </button>
      </div>
    </header>
  );
};
