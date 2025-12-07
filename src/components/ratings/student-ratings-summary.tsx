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
    textClass: 'text-emerald-600 dark:text-emerald-400',
    format: (v: number) => v.toFixed(2),
  },
  wtn: {
    label: 'WTN',
    textClass: 'text-blue-600 dark:text-blue-400',
    format: (v: number) => v.toFixed(1),
  },
  ntrp: {
    label: 'NTRP',
    textClass: 'text-orange-500 dark:text-orange-400',
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
    <div className={cn('flex flex-wrap gap-3 text-xs font-medium', className)}>
      {ratings.utr && (
        <span className={cn('tabular-nums', RATING_STYLES.utr.textClass)}>
          {RATING_STYLES.utr.label} {RATING_STYLES.utr.format(ratings.utr.singles)}
        </span>
      )}
      {ratings.wtn && (
        <span className={cn('tabular-nums', RATING_STYLES.wtn.textClass)}>
          {RATING_STYLES.wtn.label} {RATING_STYLES.wtn.format(ratings.wtn.singles)}
        </span>
      )}
      {ratings.ntrp && (
        <span className={cn('tabular-nums', RATING_STYLES.ntrp.textClass)}>
          {RATING_STYLES.ntrp.label} {RATING_STYLES.ntrp.format(ratings.ntrp.rating)}
        </span>
      )}
    </div>
  );
}
