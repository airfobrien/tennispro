import type { PlayerRatings, RatingSnapshot } from './types';

// Generate 12 months of rating history with realistic progression
function generateRatingHistory(
  baseUTR: number,
  baseWTN: number,
  monthsBack: number = 12,
  volatility: number = 0.15
): RatingSnapshot[] {
  const history: RatingSnapshot[] = [];
  const now = new Date();

  // Start from monthsBack ago and progress to now
  for (let i = monthsBack; i >= 0; i--) {
    const date = new Date(now);
    date.setMonth(date.getMonth() - i);

    // Calculate progressive improvement with some volatility
    const progressFactor = (monthsBack - i) / monthsBack;
    const randomVariance = (Math.random() - 0.5) * volatility;

    // UTR tends to improve (go up) over time with training
    const utrImprovement = progressFactor * 0.8 + randomVariance;
    const utrSingles = Math.min(16.5, Math.max(1, baseUTR + utrImprovement));
    const utrDoubles = Math.min(16.5, Math.max(1, utrSingles - 0.3 + (Math.random() * 0.4)));

    // WTN tends to improve (go down) over time with training
    const wtnImprovement = progressFactor * 2.5 + randomVariance;
    const wtnSingles = Math.max(1, Math.min(40, baseWTN - wtnImprovement));
    const wtnDoubles = Math.max(1, Math.min(40, wtnSingles + 0.5 + (Math.random() * 0.8)));

    history.push({
      date,
      utrSingles: Math.round(utrSingles * 100) / 100,
      utrDoubles: Math.round(utrDoubles * 100) / 100,
      wtnSingles: Math.round(wtnSingles * 10) / 10,
      wtnDoubles: Math.round(wtnDoubles * 10) / 10,
    });
  }

  return history;
}

// Mock ratings data for development students
export const mockPlayerRatings: Record<string, PlayerRatings> = {
  // Alex Thompson - Competitive Junior (Demo Coach's student)
  'student-uuid-001': {
    studentId: 'student-uuid-001',
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
    history: generateRatingHistory(7.65, 14.9, 12, 0.12),
  },

  // Jordan Williams - Recreational (Demo Coach's student)
  'student-uuid-002': {
    studentId: 'student-uuid-002',
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
    history: generateRatingHistory(3.85, 27.5, 12, 0.18),
  },

  // Casey Martinez - Senior (Starter Coach's student)
  'student-uuid-003': {
    studentId: 'student-uuid-003',
    utr: {
      singles: 6.78,
      doubles: 7.15,
      singlesReliability: 78,
      doublesReliability: 82,
      lastUpdated: new Date(),
      profileUrl: 'https://app.utrsports.net/profiles/example3',
    },
    wtn: {
      singles: 16.2,
      doubles: 15.4,
      confidence: 'high',
      lastUpdated: new Date(),
      profileUrl: 'https://worldtennisnumber.com/player/example3',
    },
    history: generateRatingHistory(6.25, 18.0, 12, 0.1),
  },

  // Riley Johnson - Collegiate Track (Starter Coach's student)
  'student-uuid-004': {
    studentId: 'student-uuid-004',
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
    history: generateRatingHistory(10.15, 9.8, 12, 0.08),
  },
};

// Get ratings for a student
export function getStudentRatings(studentId: string): PlayerRatings | null {
  return mockPlayerRatings[studentId] || null;
}

// Get current month's rating change
export function getMonthlyChange(ratings: PlayerRatings): {
  utr: { change: number; improved: boolean };
  wtn: { change: number; improved: boolean };
} {
  const history = ratings.history;
  if (history.length < 2) {
    return {
      utr: { change: 0, improved: false },
      wtn: { change: 0, improved: false },
    };
  }

  const current = history[history.length - 1];
  const previous = history[history.length - 2];

  if (!current || !previous) {
    return {
      utr: { change: 0, improved: false },
      wtn: { change: 0, improved: false },
    };
  }

  const utrChange = current.utrSingles - previous.utrSingles;
  const wtnChange = current.wtnSingles - previous.wtnSingles;

  return {
    utr: {
      change: Math.round(utrChange * 100) / 100,
      improved: utrChange > 0,
    },
    wtn: {
      change: Math.round(wtnChange * 10) / 10,
      improved: wtnChange < 0, // Lower WTN = improvement
    },
  };
}
