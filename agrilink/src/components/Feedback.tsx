import React from 'react';
import { X, Inbox, Loader2 } from 'lucide-react';

export function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-soil-900/40 p-0 sm:items-center sm:p-4">
      <div className="max-h-[90vh] w-full overflow-y-auto rounded-t-2xl bg-white sm:max-w-lg sm:rounded-card">
        <div className="flex items-center justify-between border-b border-soil-100 px-5 py-4">
          <h3 className="text-lg font-semibold text-soil-900">{title}</h3>
          <button onClick={onClose} className="rounded-full p-1.5 text-soil-900/60 hover:bg-soil-100" aria-label="Close">
            <X size={18} />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-card border border-dashed border-soil-100 bg-white px-6 py-14 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-field-50 text-field-600">
        <Inbox size={22} />
      </div>
      <h3 className="text-base font-semibold text-soil-900">{title}</h3>
      <p className="max-w-sm text-sm text-soil-900/60">{description}</p>
      {action}
    </div>
  );
}

export function LoadingState({ label = 'Loading...' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-14 text-soil-900/50">
      <Loader2 size={22} className="animate-spin" />
      <span className="text-sm">{label}</span>
    </div>
  );
}
