import React from 'react';
import { ViewMode } from '../types';
import {
  LayoutDashboard,
  ShoppingBag,
  PackageCheck,
  Users2,
  Activity,
  Layers,
  ChevronDown,
  Sparkles,
  Radio,
  ExternalLink,
  X,
} from 'lucide-react';

interface SidebarProps {
  currentView: ViewMode;
  onSelectView: (view: ViewMode) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  isLivePolling: boolean;
  onToggleLivePolling: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onSelectView,
  isOpenMobile,
  onCloseMobile,
  isLivePolling,
  onToggleLivePolling,
}) => {
  const navItems: { id: ViewMode; label: string; icon: React.ReactNode; badge?: string }[] = [
    {
      id: 'overview',
      label: 'Executive Overview',
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      id: 'orders',
      label: 'Orders & Transactions',
      icon: <ShoppingBag className="w-4 h-4" />,
      badge: '8 new',
    },
    {
      id: 'inventory',
      label: 'Inventory & SKUs',
      icon: <PackageCheck className="w-4 h-4" />,
      badge: '2 alerts',
    },
    {
      id: 'customers',
      label: 'Cohorts & Retention',
      icon: <Users2 className="w-4 h-4" />,
    },
    {
      id: 'operations',
      label: 'Channels & Health',
      icon: <Activity className="w-4 h-4" />,
    },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 flex flex-col justify-between transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top: Brand & Workspace */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm font-display font-black text-lg">
                L
              </div>
              <div>
                <span className="font-display font-bold text-base text-slate-900 dark:text-white tracking-tight leading-none block">
                  Lumina
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Analytics OS
                </span>
              </div>
            </div>

            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Store Switcher Pill */}
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between cursor-pointer hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              <div className="truncate">
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate block">
                  Nordic Living Direct
                </span>
                <span className="text-[10px] text-slate-400 font-mono-data tabular-nums">
                  Storefront #01 · EUR/USD
                </span>
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-1" />
          </div>
        </div>

        {/* Navigation list */}
        <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-sans">
            Intelligence Views
          </div>

          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectView(item.id);
                  onCloseMobile();
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`${
                      isActive
                        ? 'text-indigo-600 dark:text-indigo-400'
                        : 'text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    {item.icon}
                  </div>
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[10px] font-semibold px-1.5 py-0.2 rounded-full ${
                      item.id === 'inventory'
                        ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400'
                        : 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-6 px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-sans">
            Integrations & Stores
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between px-3 py-2 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Shopify Plus Store
              </span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </div>
            <div className="flex items-center justify-between px-3 py-2 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Stripe Payments API
              </span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </div>
            <div className="flex items-center justify-between px-3 py-2 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Klaviyo Marketing Feed
              </span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </div>
          </div>
        </div>

        {/* Bottom: Live Polling switch & User */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
          {/* Live Polling Card */}
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Radio
                className={`w-3.5 h-3.5 ${
                  isLivePolling ? 'text-emerald-500 animate-pulse' : 'text-slate-400'
                }`}
              />
              <div>
                <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 block">
                  {isLivePolling ? 'Real-Time Sync' : 'Live Sync Paused'}
                </span>
                <span className="text-[10px] text-slate-400">
                  {isLivePolling ? 'Polling every 10s' : 'Click to resume'}
                </span>
              </div>
            </div>

            <button
              onClick={onToggleLivePolling}
              className={`text-[10px] font-bold px-2 py-1 rounded-md transition-colors ${
                isLivePolling
                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              {isLivePolling ? 'Active' : 'Enable'}
            </button>
          </div>

          {/* User profile */}
          <div className="flex items-center gap-3 p-1.5 rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80"
              alt="Elena Vance"
              className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-slate-700"
            />
            <div className="truncate">
              <span className="text-xs font-bold text-slate-900 dark:text-white block truncate">
                Elena Vance
              </span>
              <span className="text-[10px] text-slate-400 truncate block">
                VP Commerce Operations
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
