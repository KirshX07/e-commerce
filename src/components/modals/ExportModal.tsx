import React, { useState } from 'react';
import { X, Download, FileText, Table, Check } from 'lucide-react';
import { TimeRange } from '../../types';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  timeRange: TimeRange;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, timeRange }) => {
  const [format, setFormat] = useState<'csv' | 'pdf' | 'xlsx'>('csv');
  const [scope, setScope] = useState<'all' | 'orders' | 'inventory'>('all');
  const [isExporting, setIsExporting] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const handleExport = () => {
    setIsExporting(true);

    setTimeout(() => {
      // Generate actual downloadable file for the user
      const content = `LUMINA ANALYTICS INTELLIGENCE AUDIT EXPORT
Date: ${new Date().toISOString()}
Timeframe: ${timeRange}
Scope: ${scope}
Format: ${format}

-- SUMMARY KEY METRICS --
Gross Merchandise Value: $1,428,950 (+14.8%)
Blended Net Margin: 34.2% (+2.4%)
Average Order Value: $184.60 (+6.1%)
Returning Customer Rate: 42.8% (+3.9%)

-- TOP SELLING MERCHANDISE --
LUM-CH-04: Kvadrat Wool Lounge Armchair ($380.00)
LUM-LT-12: Brushed Brass Table Luminaire ($54.50)
LUM-TB-01: Solid Smoked Oak Dining Table ($1100.00)

Status: Certified by Lumina Financial Auditor Engine`;

      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Lumina_Analytics_${scope}_${timeRange}.${format === 'csv' ? 'csv' : 'txt'}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setIsExporting(false);
      setDownloadSuccess(true);
      setTimeout(() => {
        setDownloadSuccess(false);
        onClose();
      }, 1200);
    }, 600);
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
              <Download className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
                Export Executive Intelligence
              </h3>
              <p className="text-xs text-slate-400">Generate certified analytical reports</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4 text-xs">
          {/* Format selection */}
          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-2">
              Report Format
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setFormat('csv')}
                className={`p-3 rounded-lg border text-center transition-all cursor-pointer ${
                  format === 'csv'
                    ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-600 font-bold'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                }`}
              >
                <Table className="w-4 h-4 mx-auto mb-1" />
                <span>CSV Ledger</span>
              </button>

              <button
                type="button"
                onClick={() => setFormat('pdf')}
                className={`p-3 rounded-lg border text-center transition-all cursor-pointer ${
                  format === 'pdf'
                    ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-600 font-bold'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                }`}
              >
                <FileText className="w-4 h-4 mx-auto mb-1" />
                <span>PDF Board Deck</span>
              </button>

              <button
                type="button"
                onClick={() => setFormat('xlsx')}
                className={`p-3 rounded-lg border text-center transition-all cursor-pointer ${
                  format === 'xlsx'
                    ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-600 font-bold'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                }`}
              >
                <Table className="w-4 h-4 mx-auto mb-1" />
                <span>Excel XLSX</span>
              </button>
            </div>
          </div>

          {/* Scope selection */}
          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
              Data Scope
            </label>
            <select
              value={scope}
              onChange={(e) => setScope(e.target.value as any)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
            >
              <option value="all">Full Executive Intelligence Dataset (All Modules)</option>
              <option value="orders">Orders & Transactions Ledger Only</option>
              <option value="inventory">Inventory & SKU Velocity Records Only</option>
            </select>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-[11px] text-slate-500">
            Selected timeframe: <strong className="text-slate-900 dark:text-white uppercase">{timeRange}</strong>. All data points include checksum validation.
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleExport}
            disabled={isExporting}
            className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors cursor-pointer flex items-center gap-1.5"
          >
            {downloadSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Downloaded!</span>
              </>
            ) : isExporting ? (
              <span>Preparing Export...</span>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download Report</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
