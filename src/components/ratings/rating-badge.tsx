'use client';

import { ArrowDown, ArrowUp, Minus } from 'lucide-react';

import { cn } from '@/lib/utils';

interface RatingBadgeProps {
  type: 'utr' | 'wtn';
  value: number;
  change?: number;
  improved?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export function RatingBadge({
  type,
  value,
  change,
  improved,
  size = 'md',
  showLabel = true,
  className,
}: RatingBadgeProps) {
  const sizeClasses = {
    sm: 'text-lg font-bold',
    md: 'text-2xl font-bold',
    lg: 'text-4xl font-bold',
  };

  const containerClasses = {
    sm: 'p-2 min-w-[60px]',
    md: 'p-3 min-w-[80px]',
    lg: 'p-4 min-w-[100px]',
  };

  // UTR uses green gradient (higher is better)
  // WTN uses blue gradient (lower is better)
  const gradientClasses = type === 'utr'
    ? 'bg-gradient-to-br from-emerald-500 to-green-600'
    : 'bg-gradient-to-br from-blue-500 to-indigo-600';

  const hasChange = change !== undefined && change !== 0;
  const isImproved = improved ?? (type === 'utr' ? (change ?? 0) > 0 : (change ?? 0) < 0);

  return (
    <div
      className={cn(
        'rounded-xl text-white shadow-lg',
        gradientClasses,
        containerClasses[size],
        className
      )}
    >
      <div className="flex flex-col items-center">
        {showLabel && (
          <span className="text-xs font-medium uppercase tracking-wider opacity-90">
            {type === 'utr' ? 'UTR' : 'WTN'}
          </span>
        )}
        <span className={cn(sizeClasses[size], 'tabular-nums')}>
          {type === 'utr' ? value.toFixed(2) : value.toFixed(1)}
        </span>
        {hasChange && (
          <div
            className={cn(
              'mt-1 flex items-center gap-0.5 text-xs font-medium',
              isImproved ? 'text-white' : 'text-white/70'
            )}
          >
            {isImproved ? (
              <ArrowUp className="h-3 w-3" />
            ) : change === 0 ? (
              <Minus className="h-3 w-3" />
            ) : (
              <ArrowDown className="h-3 w-3" />
            )}
            <span>
              {type === 'utr'
                ? Math.abs(change).toFixed(2)
                : Math.abs(change).toFixed(1)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
