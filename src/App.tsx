import React, { useState, useEffect } from 'react';
import { ViewMode, TimeRange, Order, InventoryItem } from './types';
import { INITIAL_KPIS, REVENUE_TIMELINE, MOCK_ORDERS, MOCK_INVENTORY } from './mockData';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ExecutiveOverviewView } from './components/views/ExecutiveOverviewView';
import { OrdersView } from './components/views/OrdersView';
import { InventoryView } from './components/views/InventoryView';
import { CustomersView } from './components/views/CustomersView';
import { OperationalHealthView } from './components/views/OperationalHealthView';
import { OrderDrawer } from './components/modals/OrderDrawer';
import { RestockModal } from './components/modals/RestockModal';
import { CommandPalette } from './components/modals/CommandPalette';
import { ExportModal } from './components/modals/ExportModal';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('overview');
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [inventory, setInventory] = useState<InventoryItem[]>(MOCK_INVENTORY);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [restockItem, setRestockItem] = useState<InventoryItem | null>(null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLivePolling, setIsLivePolling] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Theme setup
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('lumina_theme') as 'light' | 'dark') || 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('lumina_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Live polling effect
  useEffect(() => {
    if (!isLivePolling) return;

    const interval = setInterval(() => {
      // Simulate real-time micro pulse
      setOrders((prev) => {
        // Occasionally increment items count or adjust timestamps
        return [...prev];
      });
    }, 15000);

    return () => clearInterval(interval);
  }, [isLivePolling]);

  // Refresh data trigger
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showToast('Analytics cache flushed. Real-time data synchronized.');
    }, 600);
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
    showToast(`Order ${orderId} marked as ${newStatus}`);
  };

  const handleConfirmRestock = (sku: string, units: number) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.sku === sku
          ? {
              ...item,
              stockLevel: item.stockLevel + units,
              status: item.stockLevel + units > item.reorderPoint ? 'Healthy' : 'Low Stock',
              lastRestocked: 'Just now',
            }
          : item
      )
    );
    showToast(`Purchase order approved: ${units} units queued for SKU ${sku}`);
  };

  const currentKpis = INITIAL_KPIS[timeRange] || INITIAL_KPIS['30d'];
  const currentRevenueData = REVENUE_TIMELINE[timeRange] || REVENUE_TIMELINE['30d'];

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#0B132B] text-[#0F172A] dark:text-[#E2E8F0] flex flex-col antialiased transition-colors duration-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-semibold rounded-lg shadow-flyout animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <Sidebar
        currentView={currentView}
        onSelectView={setCurrentView}
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
        isLivePolling={isLivePolling}
        onToggleLivePolling={() => setIsLivePolling(!isLivePolling)}
      />

      {/* Main Content Area: offset on desktop for 256px (w-64) sidebar */}
      <div className="lg:pl-64 flex flex-col flex-1 min-w-0">
        <Header
          currentView={currentView}
          timeRange={timeRange}
          onTimeRangeChange={setTimeRange}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onOpenExportModal={() => setIsExportModalOpen(true)}
          onToggleMobileMenu={() => setIsMobileMenuOpen(true)}
          onRefreshData={handleRefresh}
          isRefreshing={isRefreshing}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        {/* Viewport content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto">
          {currentView === 'overview' && (
            <ExecutiveOverviewView
              kpis={currentKpis}
              revenueData={currentRevenueData}
              timeRange={timeRange}
              onTimeRangeChange={setTimeRange}
              orders={orders}
              onSelectOrder={setSelectedOrder}
              onNavigateToOrders={() => setCurrentView('orders')}
              onNavigateToInventory={() => setCurrentView('inventory')}
              onOpenExportModal={() => setIsExportModalOpen(true)}
            />
          )}

          {currentView === 'orders' && (
            <OrdersView
              orders={orders}
              onSelectOrder={setSelectedOrder}
              onExport={() => setIsExportModalOpen(true)}
            />
          )}

          {currentView === 'inventory' && (
            <InventoryView
              inventory={inventory}
              onOpenRestockModal={setRestockItem}
            />
          )}

          {currentView === 'customers' && <CustomersView />}

          {currentView === 'operations' && <OperationalHealthView />}
        </main>

        {/* Quiet footer */}
        <footer className="mt-auto px-4 sm:px-8 py-4 border-t border-slate-200/60 dark:border-slate-800 text-xs text-slate-400 dark:text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Lumina Analytics</span>
            <span>·</span>
            <span>Enterprise E-Commerce Operations OS</span>
          </div>
          <div>
            <span>Audited & Encrypted Ledger · ISO 27001 Certified</span>
          </div>
        </footer>
      </div>

      {/* Modals & Drawers */}
      <OrderDrawer
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onUpdateStatus={handleUpdateOrderStatus}
      />

      <RestockModal
        item={restockItem}
        onClose={() => setRestockItem(null)}
        onConfirmRestock={handleConfirmRestock}
      />

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectView={setCurrentView}
        orders={orders}
        inventory={inventory}
        onSelectOrder={(order) => {
          setSelectedOrder(order);
          setCurrentView('orders');
        }}
        onSelectInventory={(item) => {
          setRestockItem(item);
          setCurrentView('inventory');
        }}
      />

      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        timeRange={timeRange}
      />
    </div>
  );
}
