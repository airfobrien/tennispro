import type { PlayerRatings, RatingSnapshot } from './types';

// Configuration options for history generation
interface HistoryOptions {
  baseUTR?: number;
  baseWTN?: number;
  baseNTRP?: number;
  monthsBack?: number;
  volatility?: number;
}

// Generate 12 months of rating history with realistic progression
function generateRatingHistory(options: HistoryOptions): RatingSnapshot[] {
  const {
    baseUTR,
    baseWTN,
    baseNTRP,
    monthsBack = 12,
    volatility = 0.15,
  } = options;

  const history: RatingSnapshot[] = [];
  const now = new Date();

  // Start from monthsBack ago and progress to now
  for (let i = monthsBack; i >= 0; i--) {
    const date = new Date(now);
    date.setMonth(date.getMonth() - i);

    // Calculate progressive improvement with some volatility
    const progressFactor = (monthsBack - i) / monthsBack;
    const randomVariance = (Math.random() - 0.5) * volatility;

    const snapshot: RatingSnapshot = { date };

    // UTR tends to improve (go up) over time with training
    if (baseUTR !== undefined) {
      const utrImprovement = progressFactor * 0.8 + randomVariance;
      const utrSingles = Math.min(16.5, Math.max(1, baseUTR + utrImprovement));
      const utrDoubles = Math.min(16.5, Math.max(1, utrSingles - 0.3 + (Math.random() * 0.4)));
      snapshot.utrSingles = Math.round(utrSingles * 100) / 100;
      snapshot.utrDoubles = Math.round(utrDoubles * 100) / 100;
    }

    // WTN tends to improve (go down) over time with training
    if (baseWTN !== undefined) {
      const wtnImprovement = progressFactor * 2.5 + randomVariance;
      const wtnSingles = Math.max(1, Math.min(40, baseWTN - wtnImprovement));
      const wtnDoubles = Math.max(1, Math.min(40, wtnSingles + 0.5 + (Math.random() * 0.8)));
      snapshot.wtnSingles = Math.round(wtnSingles * 10) / 10;
      snapshot.wtnDoubles = Math.round(wtnDoubles * 10) / 10;
    }

    // NTRP tends to improve (go up) slowly - typically in 0.5 increments
    if (baseNTRP !== undefined) {
      // NTRP changes more slowly than other ratings
      const ntrpImprovement = progressFactor * 0.3 + (randomVariance * 0.1);
      const ntrp = Math.min(7.0, Math.max(1.5, baseNTRP + ntrpImprovement));
      // Round to nearest 0.5 (standard NTRP increments)
      snapshot.ntrp = Math.round(ntrp * 2) / 2;
    }

    history.push(snapshot);
  }

  return history;
}

// Mock ratings data for development students
export const mockPlayerRatings: Record<string, PlayerRatings> = {
  // Alex Thompson - Adult Competitive (Demo Coach's student)
  // Age 25 - Adult player with all three ratings (UTR, WTN, NTRP)
  'student-uuid-001': {
    studentId: 'student-uuid-001',
    age: 25,
    utr: {
      singles: 8.45,
      doubles: 8.12,
      singlesReliability: 85,
      doublesReliability: 72,
      lastUpdated: new Date(),
      profileUrl: 'https://app.utrsports.net/profiles/example',
    },
    wtn: {
      singles: 12.4,
      doubles: 13.1,
      confidence: 'high',
      lastUpdated: new Date(),
      profileUrl: 'https://worldtennisnumber.com/player/example',
    },
    ntrp: {
      rating: 4.5,
      type: 'tournament',
      lastUpdated: new Date(),
      expirationDate: new Date(new Date().getFullYear() + 1, 0, 1),
      profileUrl: 'https://www.usta.com/ntrp/example',
    },
    history: generateRatingHistory({ baseUTR: 7.65, baseWTN: 14.9, baseNTRP: 4.0, monthsBack: 12, volatility: 0.12 }),
  },

  // Jordan Williams - Junior Player (Demo Coach's student)
  // Age 16 - Junior player with UTR and WTN only (no NTRP - under 18)
  'student-uuid-002': {
    studentId: 'student-uuid-002',
    age: 16,
    utr: {
      singles: 4.23,
      doubles: 4.05,
      singlesReliability: 68,
      doublesReliability: 55,
      lastUpdated: new Date(),
      profileUrl: 'https://app.utrsports.net/profiles/example2',
    },
    wtn: {
      singles: 24.8,
      doubles: 26.2,
      confidence: 'medium',
      lastUpdated: new Date(),
      profileUrl: 'https://worldtennisnumber.com/player/example2',
    },
    // No NTRP - junior player (under 18)
    history: generateRatingHistory({ baseUTR: 3.85, baseWTN: 27.5, monthsBack: 12, volatility: 0.18 }),
  },

  // Casey Martinez - Senior Adult (Starter Coach's student)
  // Age 55 - Senior league player with NTRP only (recreational, no competitive ratings)
  'student-uuid-003': {
    studentId: 'student-uuid-003',
    age: 55,
    // No UTR - plays league only
    // No WTN - no ITF events
    ntrp: {
      rating: 3.5,
      type: 'computer',
      lastUpdated: new Date(),
      expirationDate: new Date(new Date().getFullYear() + 1, 0, 1),
      profileUrl: 'https://www.usta.com/ntrp/example3',
    },
    history: generateRatingHistory({ baseNTRP: 3.0, monthsBack: 12, volatility: 0.1 }),
  },

  // Riley Johnson - College Player (Starter Coach's student)
  // Age 20 - College player with UTR and WTN (competitive), plus NTRP from juniors
  'student-uuid-004': {
    studentId: 'student-uuid-004',
    age: 20,
    utr: {
      singles: 10.92,
      doubles: 10.45,
      singlesReliability: 91,
      doublesReliability: 88,
      lastUpdated: new Date(),
      profileUrl: 'https://app.utrsports.net/profiles/example4',
    },
    wtn: {
      singles: 8.3,
      doubles: 8.9,
      confidence: 'high',
      lastUpdated: new Date(),
      profileUrl: 'https://worldtennisnumber.com/player/example4',
    },
    ntrp: {
      rating: 5.5,
      type: 'tournament',
      lastUpdated: new Date(),
      expirationDate: new Date(new Date().getFullYear() + 1, 0, 1),
      profileUrl: 'https://www.usta.com/ntrp/example4',
    },
    history: generateRatingHistory({ baseUTR: 10.15, baseWTN: 9.8, baseNTRP: 5.0, monthsBack: 12, volatility: 0.08 }),
  },
};

// Get ratings for a student
export function getStudentRatings(studentId: string): PlayerRatings | null {
  return mockPlayerRatings[studentId] || null;
}

// Get current month's rating change
export function getMonthlyChange(ratings: PlayerRatings): {
  utr: { change: number; improved: boolean } | null;
  wtn: { change: number; improved: boolean } | null;
  ntrp: { change: number; improved: boolean } | null;
} {
  const history = ratings.history;
  if (history.length < 2) {
    return {
      utr: ratings.utr ? { change: 0, improved: false } : null,
      wtn: ratings.wtn ? { change: 0, improved: false } : null,
      ntrp: ratings.ntrp ? { change: 0, improved: false } : null,
    };
  }

  const current = history[history.length - 1];
  const previous = history[history.length - 2];

  if (!current || !previous) {
    return {
      utr: ratings.utr ? { change: 0, improved: false } : null,
      wtn: ratings.wtn ? { change: 0, improved: false } : null,
      ntrp: ratings.ntrp ? { change: 0, improved: false } : null,
    };
  }

  // Calculate UTR change if available
  let utrResult: { change: number; improved: boolean } | null = null;
  if (current.utrSingles !== undefined && previous.utrSingles !== undefined) {
    const utrChange = current.utrSingles - previous.utrSingles;
    utrResult = {
      change: Math.round(utrChange * 100) / 100,
      improved: utrChange > 0,
    };
  }

  // Calculate WTN change if available
  let wtnResult: { change: number; improved: boolean } | null = null;
  if (current.wtnSingles !== undefined && previous.wtnSingles !== undefined) {
    const wtnChange = current.wtnSingles - previous.wtnSingles;
    wtnResult = {
      change: Math.round(wtnChange * 10) / 10,
      improved: wtnChange < 0, // Lower WTN = improvement
    };
  }

  // Calculate NTRP change if available
  let ntrpResult: { change: number; improved: boolean } | null = null;
  if (current.ntrp !== undefined && previous.ntrp !== undefined) {
    const ntrpChange = current.ntrp - previous.ntrp;
    ntrpResult = {
      change: Math.round(ntrpChange * 10) / 10,
      improved: ntrpChange > 0, // Higher NTRP = improvement
    };
  }

  return {
    utr: utrResult,
    wtn: wtnResult,
    ntrp: ntrpResult,
  };
}
