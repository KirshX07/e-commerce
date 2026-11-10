import React from 'react';
import { Order } from '../types';
import { AlertCircle, CheckCircle2, Clock, ShieldAlert, ShoppingBag, ArrowRight } from 'lucide-react';

interface OperationalFeedProps {
  orders: Order[];
  onSelectOrder: (order: Order) => void;
  onViewAllOrders: () => void;
}

export const OperationalFeed: React.FC<OperationalFeedProps> = ({
  orders,
  onSelectOrder,
  onViewAllOrders,
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-xl p-6 shadow-card flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
              Live Operations Feed
            </h3>
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              STREAMING
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time fulfillment, risk triggers & checkout captures
          </p>
        </div>
        <button
          onClick={onViewAllOrders}
          className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 flex items-center gap-1 cursor-pointer"
        >
          Ledger <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Feed Items */}
      <div className="divide-y divide-slate-100 dark:divide-slate-800/80 overflow-y-auto max-h-[380px] pr-1">
        {orders.slice(0, 5).map((order) => {
          const isFlagged = order.status === 'Flagged';
          const isRefunded = order.status === 'Refunded';

          return (
            <div
              key={order.id}
              onClick={() => onSelectOrder(order)}
              className="py-3 flex items-start justify-between gap-3 group cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 p-2 rounded-lg transition-colors"
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                    isFlagged
                      ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-200/60'
                      : isRefunded
                      ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border border-amber-200/60'
                      : 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60'
                  }`}
                >
                  {isFlagged ? (
                    <ShieldAlert className="w-4 h-4" />
                  ) : isRefunded ? (
                    <AlertCircle className="w-4 h-4" />
                  ) : (
                    <ShoppingBag className="w-4 h-4" />
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {order.id}
                    </span>
                    <span className="text-[11px] text-slate-400 font-normal">
                      · {order.timestamp}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-1">
                    {order.customerName} ({order.shippingCity}, {order.country})
                  </p>

                  <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                    <span>{order.itemsCount} {order.itemsCount === 1 ? 'item' : 'items'}</span>
                    <span>·</span>
                    <span>{order.paymentMethod}</span>
                    <span>·</span>
                    <span className="text-slate-500 font-medium">{order.channel}</span>
                  </div>
                </div>
              </div>

              <div className="text-right font-mono-data tabular-nums shrink-0">
                <div className="text-xs font-bold text-slate-900 dark:text-white">
                  ${order.total.toFixed(2)}
                </div>
                <span
                  className={`inline-block text-[10px] font-semibold px-1.5 py-0.2 rounded-full mt-1 ${
                    order.status === 'Completed'
                      ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400'
                      : order.status === 'Processing'
                      ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400'
                      : order.status === 'Flagged'
                      ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-400'
                      : 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400'
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer System Status summary */}
      <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>Payment Gateways: 100% Online</span>
        </div>
        <span className="font-mono-data tabular-nums text-slate-400 text-[11px]">
          98ms latency
        </span>
      </div>
    </div>
  );
};
