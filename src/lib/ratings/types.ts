// UTR (Universal Tennis Rating) - Scale: 1.00 to 16.50 (higher = better)
// WTN (World Tennis Number) - Scale: 40 to 1 (lower = better)

export interface UTRRating {
  singles: number;
  doubles: number;
  singlesReliability: number; // 0-100, percentage confidence
  doublesReliability: number;
  lastUpdated: Date;
  profileUrl?: string;
}

export interface WTNRating {
  singles: number;
  doubles: number;
  confidence: 'high' | 'medium' | 'low';
  lastUpdated: Date;
  profileUrl?: string;
}

export interface RatingSnapshot {
  date: Date;
  utrSingles: number;
  utrDoubles: number;
  wtnSingles: number;
  wtnDoubles: number;
}

export interface PlayerRatings {
  studentId: string;
  utr: UTRRating;
  wtn: WTNRating;
  history: RatingSnapshot[];
}

// UTR Rating Levels (approximate skill descriptions)
export const UTR_LEVELS = {
  BEGINNER: { min: 1.0, max: 3.0, label: 'Beginner' },
  INTERMEDIATE: { min: 3.0, max: 5.0, label: 'Intermediate' },
  ADVANCED: { min: 5.0, max: 7.0, label: 'Advanced' },
  COMPETITIVE: { min: 7.0, max: 9.0, label: 'Competitive' },
  ELITE_JUNIOR: { min: 9.0, max: 11.0, label: 'Elite Junior' },
  COLLEGE: { min: 11.0, max: 13.0, label: 'College Level' },
  PRO_FUTURES: { min: 13.0, max: 14.5, label: 'Pro Futures' },
  ATP_WTA: { min: 14.5, max: 16.5, label: 'ATP/WTA Level' },
} as const;

// WTN Rating Levels (approximate skill descriptions)
export const WTN_LEVELS = {
  BEGINNER: { min: 30.0, max: 40.0, label: 'Beginner' },
  INTERMEDIATE: { min: 20.0, max: 30.0, label: 'Intermediate' },
  ADVANCED: { min: 15.0, max: 20.0, label: 'Advanced' },
  COMPETITIVE: { min: 10.0, max: 15.0, label: 'Competitive' },
  ELITE_JUNIOR: { min: 7.0, max: 10.0, label: 'Elite Junior' },
  COLLEGE: { min: 5.0, max: 7.0, label: 'College Level' },
  PRO_SATELLITE: { min: 3.0, max: 5.0, label: 'Pro Satellite' },
  ATP_WTA: { min: 1.0, max: 3.0, label: 'ATP/WTA Level' },
} as const;

export function getUTRLevel(rating: number): string {
  for (const level of Object.values(UTR_LEVELS)) {
    if (rating >= level.min && rating < level.max) {
      return level.label;
    }
  }
  return 'Unknown';
}

export function getWTNLevel(rating: number): string {
  for (const level of Object.values(WTN_LEVELS)) {
    if (rating >= level.min && rating <= level.max) {
      return level.label;
    }
  }
  return 'Unknown';
}

// Calculate rating change trend
export function calculateTrend(history: RatingSnapshot[], type: 'utr' | 'wtn'): {
  direction: 'up' | 'down' | 'stable';
  change: number;
  percentage: number;
} {
  if (history.length < 2) {
    return { direction: 'stable', change: 0, percentage: 0 };
  }

  const sortedHistory = [...history].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const currentSnapshot = sortedHistory[0];
  const previousSnapshot = sortedHistory[1];
  if (!currentSnapshot || !previousSnapshot) {
    return { direction: 'stable', change: 0, percentage: 0 };
  }

  const current = type === 'utr' ? currentSnapshot.utrSingles : currentSnapshot.wtnSingles;
  const previous = type === 'utr' ? previousSnapshot.utrSingles : previousSnapshot.wtnSingles;

  const change = current - previous;
  const percentage = previous !== 0 ? (change / previous) * 100 : 0;

  // For WTN, lower is better, so invert the direction logic
  let direction: 'up' | 'down' | 'stable';
  if (Math.abs(change) < 0.1) {
    direction = 'stable';
  } else if (type === 'wtn') {
    direction = change < 0 ? 'up' : 'down'; // Lower WTN = improvement
  } else {
    direction = change > 0 ? 'up' : 'down'; // Higher UTR = improvement
  }

  return { direction, change: Math.abs(change), percentage: Math.abs(percentage) };
}
