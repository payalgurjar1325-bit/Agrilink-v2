import React from 'react';
import { LucideIcon } from 'lucide-react';

export function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  onClick,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  sub?: string;
  onClick?: () => void;
}) {
  const Wrapper = onClick ? 'button' : 'div';
  return (
    <Wrapper
      onClick={onClick}
      className={`rounded-card border border-soil-100 bg-white p-4 text-left ${onClick ? 'hover:border-field-300' : ''}`}
    >
      <div className="flex items-center gap-2 text-soil-900/60">
        <Icon size={16} />
        <span className="text-xs font-medium">{label}</span>
      </div>
      <div className="mt-2 text-2xl font-semibold text-soil-900">{value}</div>
      {sub && <div className="mt-0.5 text-xs text-soil-900/50">{sub}</div>}
    </Wrapper>
  );
}
