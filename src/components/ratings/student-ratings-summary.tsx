'use client';

import type { PlayerRatings } from '@/lib/ratings/types';
import { cn } from '@/lib/utils';

interface StudentRatingsSummaryProps {
  ratings: PlayerRatings | null;
  className?: string;
}

const RATING_STYLES = {
  utr: {
    label: 'UTR',
    bgClass: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    format: (v: number) => v.toFixed(2),
  },
  wtn: {
    label: 'WTN',
    bgClass: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    format: (v: number) => v.toFixed(1),
  },
  ntrp: {
    label: 'NTRP',
    bgClass: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    format: (v: number) => v.toFixed(1),
  },
};

/**
 * Compact inline display of student ratings (UTR, WTN, NTRP).
 * Suitable for table rows and lists.
 */
export function StudentRatingsSummary({ ratings, className }: StudentRatingsSummaryProps) {
  if (!ratings) {
    return (
      <span className="text-sm text-muted-foreground italic">No ratings</span>
    );
  }

  const hasAnyRating = ratings.utr || ratings.wtn || ratings.ntrp;

  if (!hasAnyRating) {
    return (
      <span className="text-sm text-muted-foreground italic">No ratings</span>
    );
  }

  return (
    <div className={cn('flex flex-wrap gap-1.5', className)}>
      {ratings.utr && (
        <span
          className={cn(
            'inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium',
            RATING_STYLES.utr.bgClass
          )}
        >
          <span className="opacity-70">{RATING_STYLES.utr.label}</span>
          <span className="font-semibold tabular-nums">
            {RATING_STYLES.utr.format(ratings.utr.singles)}
          </span>
        </span>
      )}
      {ratings.wtn && (
        <span
          className={cn(
            'inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium',
            RATING_STYLES.wtn.bgClass
          )}
        >
          <span className="opacity-70">{RATING_STYLES.wtn.label}</span>
          <span className="font-semibold tabular-nums">
            {RATING_STYLES.wtn.format(ratings.wtn.singles)}
          </span>
        </span>
      )}
      {ratings.ntrp && (
        <span
          className={cn(
            'inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium',
            RATING_STYLES.ntrp.bgClass
          )}
        >
          <span className="opacity-70">{RATING_STYLES.ntrp.label}</span>
          <span className="font-semibold tabular-nums">
            {RATING_STYLES.ntrp.format(ratings.ntrp.rating)}
          </span>
        </span>
      )}
    </div>
  );
}
