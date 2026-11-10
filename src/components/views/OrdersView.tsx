import React, { useState, useMemo } from 'react';
import { Order } from '../../types';
import { Search, Filter, ArrowUpDown, Download, CheckSquare, Square, ChevronRight, AlertTriangle, ShieldCheck, ShoppingBag } from 'lucide-react';

interface OrdersViewProps {
  orders: Order[];
  onSelectOrder: (order: Order) => void;
  onExport: () => void;
}

export const OrdersView: React.FC<OrdersViewProps> = ({ orders, onSelectOrder, onExport }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [channelFilter, setChannelFilter] = useState<string>('All');
  const [sortField, setSortField] = useState<'date' | 'total' | 'status'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedOrderIds, setSelectedOrderIds] = useState<Set<string>>(new Set());

  // Filtering
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.shippingCity.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
      const matchesChannel = channelFilter === 'All' || order.channel === channelFilter;

      return matchesSearch && matchesStatus && matchesChannel;
    });
  }, [orders, searchTerm, statusFilter, channelFilter]);

  // Sorting
  const sortedOrders = useMemo(() => {
    return [...filteredOrders].sort((a, b) => {
      if (sortField === 'total') {
        return sortOrder === 'asc' ? a.total - b.total : b.total - a.total;
      }
      if (sortField === 'status') {
        return sortOrder === 'asc'
          ? a.status.localeCompare(b.status)
          : b.status.localeCompare(a.status);
      }
      // default: date/timestamp
      return sortOrder === 'asc'
        ? a.timestamp.localeCompare(b.timestamp)
        : b.timestamp.localeCompare(a.timestamp);
    });
  }, [filteredOrders, sortField, sortOrder]);

  const toggleSelectAll = () => {
    if (selectedOrderIds.size === sortedOrders.length) {
      setSelectedOrderIds(new Set());
    } else {
      setSelectedOrderIds(new Set(sortedOrders.map((o) => o.id)));
    }
  };

  const toggleSelectOne = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const next = new Set(selectedOrderIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedOrderIds(next);
  };

  const totalFilteredSum = useMemo(() => {
    return filteredOrders.reduce((sum, o) => sum + o.total, 0);
  }, [filteredOrders]);

  return (
    <div className="space-y-4">
      {/* View Header with stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl shadow-card">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
              Orders & Transaction Ledger
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono-data tabular-nums">
              {filteredOrders.length} records
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            High-density ledger for customer checkout attribution, fraud scores, and line items.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block font-mono-data tabular-nums">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Filtered Volume
            </span>
            <span className="text-base font-bold text-slate-900 dark:text-white">
              ${totalFilteredSum.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>

          <button
            onClick={onExport}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 shadow-xs transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl shadow-card space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter by Order ID, customer name, email, or city..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>

          {/* Status Segmented Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0">
            {['All', 'Completed', 'Processing', 'Flagged', 'Refunded'].map((status) => (
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

          {/* Channel Select */}
          <div className="flex items-center gap-2">
            <select
              value={channelFilter}
              onChange={(e) => setChannelFilter(e.target.value)}
              className="px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="All">All Channels</option>
              <option value="Direct Web">Direct Web</option>
              <option value="Google Search">Google Search</option>
              <option value="Instagram Shop">Instagram Shop</option>
              <option value="Wholesale">Wholesale</option>
            </select>
          </div>
        </div>

        {/* Selected row action strip */}
        {selectedOrderIds.size > 0 && (
          <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-900 rounded-lg flex items-center justify-between text-xs text-indigo-900 dark:text-indigo-200">
            <span>
              <strong>{selectedOrderIds.size}</strong> orders selected
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => alert(`Batch exported ${selectedOrderIds.size} orders to CSV`)}
                className="px-2.5 py-1 bg-white dark:bg-slate-800 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 rounded font-semibold hover:bg-indigo-100 dark:hover:bg-slate-700 cursor-pointer transition-colors"
              >
                Batch Export
              </button>
              <button
                onClick={() => {
                  alert(`Status updated for ${selectedOrderIds.size} orders`);
                  setSelectedOrderIds(new Set());
                }}
                className="px-2.5 py-1 bg-indigo-600 text-white rounded font-semibold hover:bg-indigo-700 cursor-pointer transition-colors"
              >
                Mark Fulfilled
              </button>
            </div>
          </div>
        )}
      </div>

      {/* High-density Data Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8F9FA] dark:bg-slate-800/60 text-[#64748B] dark:text-slate-400 h-10 border-b border-[#E2E8F0] dark:border-slate-800 text-[11px] font-semibold tracking-wider uppercase font-sans">
                <th className="px-4 py-2 w-10 text-center">
                  <button
                    onClick={toggleSelectAll}
                    className="text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {selectedOrderIds.size === sortedOrders.length && sortedOrders.length > 0 ? (
                      <CheckSquare className="w-4 h-4 text-indigo-600" />
                    ) : (
                      <Square className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="px-4 py-2">Order ID</th>
                <th className="px-4 py-2">Customer</th>
                <th className="px-4 py-2">Items</th>
                <th className="px-4 py-2">Channel</th>
                <th className="px-4 py-2">Payment</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2 text-right cursor-pointer" onClick={() => {
                  setSortField('total');
                  setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                }}>
                  <div className="inline-flex items-center gap-1">
                    <span>Total (USD)</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-4 py-2 text-right">Time</th>
                <th className="px-3 py-2 w-8"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {sortedOrders.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-6 py-12 text-center text-slate-400 text-xs">
                    No orders matching current search or filters.
                  </td>
                </tr>
              ) : (
                sortedOrders.map((order) => {
                  const isSelected = selectedOrderIds.has(order.id);
                  return (
                    <tr
                      key={order.id}
                      onClick={() => onSelectOrder(order)}
                      className={`h-[52px] group cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-indigo-50/60 dark:bg-indigo-950/30'
                          : 'hover:bg-[#F8FAFC] dark:hover:bg-slate-800/50 bg-white dark:bg-slate-900'
                      }`}
                    >
                      <td className="px-4 py-2 text-center" onClick={(e) => toggleSelectOne(order.id, e)}>
                        <button className="text-slate-400 hover:text-slate-600 cursor-pointer">
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-indigo-600" />
                          ) : (
                            <Square className="w-4 h-4" />
                          )}
                        </button>
                      </td>

                      <td className="px-4 py-2 font-mono-data text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {order.id}
                      </td>

                      <td className="px-4 py-2">
                        <div className="flex items-center gap-2">
                          <div>
                            <span className="text-xs font-semibold text-slate-900 dark:text-white block">
                              {order.customerName}
                            </span>
                            <span className="text-[11px] text-slate-400 block">
                              {order.shippingCity}, {order.country}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-2 text-xs text-slate-600 dark:text-slate-300">
                        <span className="font-semibold">{order.itemsCount}</span>{' '}
                        <span className="text-slate-400">({order.items[0]?.name.slice(0, 24)}...)</span>
                      </td>

                      <td className="px-4 py-2 text-xs text-slate-600 dark:text-slate-300">
                        {order.channel}
                      </td>

                      <td className="px-4 py-2 text-xs text-slate-500 dark:text-slate-400">
                        {order.paymentMethod}
                      </td>

                      <td className="px-4 py-2">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                            order.status === 'Completed'
                              ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60'
                              : order.status === 'Processing'
                              ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 border border-blue-200/60'
                              : order.status === 'Flagged'
                              ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-400 border border-rose-200/60'
                              : 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 border border-amber-200/60'
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>

                      <td className="px-4 py-2 text-right font-mono-data text-xs font-bold text-slate-900 dark:text-white tabular-nums">
                        ${order.total.toFixed(2)}
                      </td>

                      <td className="px-4 py-2 text-right text-xs text-slate-400 font-mono-data tabular-nums">
                        {order.timestamp}
                      </td>

                      <td className="px-3 py-2 text-right text-slate-400 group-hover:text-indigo-600">
                        <ChevronRight className="w-4 h-4 ml-auto" />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer with pagination stats */}
        <div className="px-4 py-3 bg-[#F8F9FA] dark:bg-slate-800/60 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>
            Showing <strong className="text-slate-800 dark:text-slate-200">{sortedOrders.length}</strong> of{' '}
            <strong className="text-slate-800 dark:text-slate-200">{orders.length}</strong> total orders
          </span>
          <div className="flex items-center gap-2">
            <button className="px-2.5 py-1 border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-800 disabled:opacity-50 text-slate-700 dark:text-slate-300">
              Previous
            </button>
            <span className="font-semibold px-2">Page 1 of 1</span>
            <button className="px-2.5 py-1 border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-800 disabled:opacity-50 text-slate-700 dark:text-slate-300">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
