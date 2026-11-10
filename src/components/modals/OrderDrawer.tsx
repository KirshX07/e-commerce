import React from 'react';
import { Order } from '../../types';
import { X, CheckCircle2, ShieldCheck, AlertCircle, ShoppingBag, MapPin, CreditCard, ExternalLink, Printer } from 'lucide-react';

interface OrderDrawerProps {
  order: Order | null;
  onClose: () => void;
  onUpdateStatus?: (orderId: string, newStatus: Order['status']) => void;
}

export const OrderDrawer: React.FC<OrderDrawerProps> = ({ order, onClose, onUpdateStatus }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Darkened scrim with backdrop blur matching spec Layer 4 */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 shadow-flyout border-l border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                  {order.id}
                </h3>
                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
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
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{order.dateFormatted}</p>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {/* Customer Profile Box */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Customer & Shipping Destination
              </span>
              <div className="flex items-center gap-3 pt-1">
                <img
                  src={order.customerAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                  alt={order.customerName}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {order.customerName}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {order.customerEmail}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>
                  {order.shippingCity}, {order.country} (Standard Express Courier)
                </span>
              </div>
            </div>

            {/* Line Items */}
            <div className="space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Purchased Merchandise ({order.items.length} SKUs)
              </span>

              <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200/80 dark:border-slate-800 rounded-xl overflow-hidden">
                {order.items.map((item, idx) => (
                  <div key={idx} className="p-3 bg-white dark:bg-slate-900 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-900 dark:text-white block">
                        {item.name}
                      </span>
                      <span className="text-[11px] font-mono-data text-slate-400">
                        {item.sku} · Qty: {item.quantity} × ${item.unitPrice.toFixed(2)}
                      </span>
                    </div>
                    <span className="text-xs font-bold font-mono-data tabular-nums text-slate-900 dark:text-white">
                      ${(item.quantity * item.unitPrice).toFixed(2)}
                    </span>
                  </div>
                ))}

                <div className="p-3 bg-slate-50 dark:bg-slate-800/80 flex items-center justify-between font-bold text-xs">
                  <span>Grand Total</span>
                  <span className="font-mono-data tabular-nums text-sm text-indigo-600 dark:text-indigo-400">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment & Security Breakdown */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Transaction Security & Risk Matrix
              </span>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg border border-slate-200/80 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Payment Rail</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {order.paymentMethod}
                  </span>
                </div>
                <div className="p-3 rounded-lg border border-slate-200/80 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Fraud Risk</span>
                  <span
                    className={`font-bold ${
                      order.riskScore === 'Low'
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-rose-600 dark:text-rose-400'
                    }`}
                  >
                    {order.riskScore} Risk
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between gap-3">
            <button
              onClick={() => alert(`Packing slip printed for ${order.id}`)}
              className="px-3 py-2 text-xs font-semibold border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Slip</span>
            </button>

            {onUpdateStatus && order.status !== 'Completed' && (
              <button
                onClick={() => onUpdateStatus(order.id, 'Completed')}
                className="px-4 py-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                Mark as Fulfilled
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
