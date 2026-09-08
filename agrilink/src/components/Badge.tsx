import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { useApp } from '../context/AppContext';

type BadgeTone = 'green' | 'red' | 'amber' | 'neutral';

const toneClasses: Record<BadgeTone, string> = {
  green: 'bg-field-100 text-field-800',
  red: 'bg-red-50 text-clay-500',
  amber: 'bg-amber-50 text-wheat-500',
  neutral: 'bg-soil-100 text-soil-900',
};

export function Badge({ tone = 'neutral', children }: { tone?: BadgeTone; children: React.ReactNode }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${toneClasses[tone]}`}>
      {children}
    </span>
  );
}

export function TrendBadge({ trend, changePercent }: { trend: 'up' | 'down' | 'stable'; changePercent: number }) {
  const { t } = useApp();
  if (trend === 'up') {
    return (
      <Badge tone="green">
        <ArrowUpRight size={13} /> {Math.abs(changePercent).toFixed(1)}%
      </Badge>
    );
  }
  if (trend === 'down') {
    return (
      <Badge tone="red">
        <ArrowDownRight size={13} /> {Math.abs(changePercent).toFixed(1)}%
      </Badge>
    );
  }
  return (
    <Badge tone="neutral">
    <Minus size={13} /> {t('Stable')}
    </Badge>
  );
}

export function DemandBadge({ level }: { level: 'high' | 'medium' | 'low' | 'stable' }) {
  const { t } = useApp();
  const map = {
    high: { tone: 'green' as const, label: t('High Demand') },
    medium: { tone: 'amber' as const, label: t('Medium Demand') },
    low: { tone: 'red' as const, label: t('Low Demand') },
    stable: { tone: 'neutral' as const, label: t('Stable') },
  };
  const { tone, label } = map[level];
  return <Badge tone={tone}>{label}</Badge>;
}
