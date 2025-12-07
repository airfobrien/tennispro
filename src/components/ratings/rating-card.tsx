'use client';

import { ExternalLink, HelpCircle, Info, TrendingDown, TrendingUp } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { getNTRPLevel, getUTRLevel, getWTNLevel } from '@/lib/ratings/types';
import { cn } from '@/lib/utils';

type RatingType = 'utr' | 'wtn' | 'ntrp';

interface RatingCardProps {
  type: RatingType;
  // For established ratings
  singles?: number;
  doubles?: number;
  reliability?: number; // UTR reliability percentage
  confidence?: 'high' | 'medium' | 'low'; // WTN confidence
  ratingType?: 'self' | 'computer' | 'tournament' | 'appeal'; // NTRP rating type
  lastUpdated?: Date;
  expirationDate?: Date; // NTRP expiration
  profileUrl?: string;
  monthlyChange?: { change: number; improved: boolean } | null;
  className?: string;
}

const RATING_CONFIG = {
  utr: {
    title: 'Universal Tennis Rating',
    shortName: 'UTR',
    description: 'UTR rates players 1.00-16.50 based on match results. Higher is better.',
    notEstablishedDesc: 'Play rated matches to establish your UTR rating.',
    gradientClasses: 'from-emerald-500/10 via-green-500/5 to-transparent',
    accentColor: 'text-emerald-600',
    badgeVariant: 'default' as const,
    formatValue: (v: number) => v.toFixed(2),
    getLevel: getUTRLevel,
    scale: '1.00 - 16.50',
    higherIsBetter: true,
  },
  wtn: {
    title: 'World Tennis Number',
    shortName: 'WTN',
    description: 'WTN rates players 40-1 based on ITF standards. Lower is better.',
    notEstablishedDesc: 'Play ITF-sanctioned events to establish your WTN rating.',
    gradientClasses: 'from-blue-500/10 via-indigo-500/5 to-transparent',
    accentColor: 'text-blue-600',
    badgeVariant: 'secondary' as const,
    formatValue: (v: number) => v.toFixed(1),
    getLevel: getWTNLevel,
    scale: '40 - 1',
    higherIsBetter: false,
  },
  ntrp: {
    title: 'National Tennis Rating',
    shortName: 'NTRP',
    description: 'NTRP rates recreational players 1.5-7.0 using USTA standards. Higher is better.',
    notEstablishedDesc: 'Register with USTA and play league matches to establish your NTRP rating.',
    gradientClasses: 'from-orange-500/10 via-amber-500/5 to-transparent',
    accentColor: 'text-orange-600',
    badgeVariant: 'outline' as const,
    formatValue: (v: number) => v.toFixed(1),
    getLevel: getNTRPLevel,
    scale: '1.5 - 7.0',
    higherIsBetter: true,
  },
};

export function RatingCard({
  type,
  singles,
  doubles,
  reliability,
  confidence,
  ratingType,
  lastUpdated,
  expirationDate,
  profileUrl,
  monthlyChange,
  className,
}: RatingCardProps) {
  const config = RATING_CONFIG[type];
  const isEstablished = singles !== undefined;

  const confidenceColors = {
    high: 'bg-green-100 text-green-700',
    medium: 'bg-yellow-100 text-yellow-700',
    low: 'bg-red-100 text-red-700',
  };

  const ratingTypeLabels = {
    self: 'Self-Rated',
    computer: 'Computer-Rated',
    tournament: 'Tournament-Rated',
    appeal: 'Appeal-Rated',
  };

  return (
    <Card className={cn('relative overflow-hidden', className)}>
      {/* Gradient overlay */}
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-br pointer-events-none',
          config.gradientClasses,
          !isEstablished && 'opacity-50'
        )}
      />

      <CardHeader className="relative pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg font-semibold">
              {config.title}
            </CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="text-sm">{config.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Scale: {config.scale}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Badge variant={config.badgeVariant} className="text-xs">
            {config.shortName}
          </Badge>
        </div>
        <CardDescription className="flex items-center gap-2">
          {isEstablished ? (
            <>
              <span className={cn('font-medium', config.accentColor)}>
                {config.getLevel(singles)}
              </span>
              {monthlyChange && monthlyChange.change !== 0 && (
                <span
                  className={cn(
                    'flex items-center gap-0.5 text-xs',
                    monthlyChange.improved ? 'text-green-600' : 'text-red-600'
                  )}
                >
                  {monthlyChange.improved ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {Math.abs(monthlyChange.change).toFixed(type === 'utr' ? 2 : 1)}
                  {' this month'}
                </span>
              )}
            </>
          ) : (
            <span className="text-muted-foreground italic">Not Established</span>
          )}
        </CardDescription>
      </CardHeader>

      <CardContent className="relative">
        {isEstablished ? (
          <>
            {/* Established Rating Content */}
            <div className={cn(
              'grid gap-4',
              type === 'ntrp' ? 'grid-cols-1' : 'grid-cols-2'
            )}>
              {/* Singles Rating */}
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                  {type === 'ntrp' ? 'Rating' : 'Singles'}
                </p>
                <p className={cn('text-3xl font-bold tabular-nums', config.accentColor)}>
                  {config.formatValue(singles)}
                </p>
              </div>

              {/* Doubles Rating (not for NTRP) */}
              {type !== 'ntrp' && doubles !== undefined && (
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">
                    Doubles
                  </p>
                  <p className={cn('text-3xl font-bold tabular-nums', config.accentColor)}>
                    {config.formatValue(doubles)}
                  </p>
                </div>
              )}
            </div>

            {/* Reliability / Confidence / Rating Type */}
            <div className="mt-4 flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                {type === 'utr' && reliability !== undefined ? (
                  <>
                    <span className="text-muted-foreground">Reliability:</span>
                    <div className="flex items-center gap-1">
                      <div className="h-2 w-16 rounded-full bg-muted overflow-hidden">
                        <div
                          className={cn(
                            'h-full rounded-full',
                            reliability >= 70
                              ? 'bg-green-500'
                              : reliability >= 40
                                ? 'bg-yellow-500'
                                : 'bg-red-500'
                          )}
                          style={{ width: `${reliability}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {reliability}%
                      </span>
                    </div>
                  </>
                ) : type === 'wtn' && confidence ? (
                  <>
                    <span className="text-muted-foreground">Confidence:</span>
                    <span
                      className={cn(
                        'px-2 py-0.5 rounded-full text-xs font-medium capitalize',
                        confidenceColors[confidence]
                      )}
                    >
                      {confidence}
                    </span>
                  </>
                ) : type === 'ntrp' && ratingType ? (
                  <>
                    <span className="text-muted-foreground">Type:</span>
                    <span className="text-xs font-medium">
                      {ratingTypeLabels[ratingType]}
                    </span>
                  </>
                ) : null}
              </div>

              {lastUpdated && (
                <span className="text-xs text-muted-foreground">
                  Updated {lastUpdated.toLocaleDateString()}
                </span>
              )}
            </div>

            {/* NTRP Expiration */}
            {type === 'ntrp' && expirationDate && (
              <div className="mt-2 text-xs text-muted-foreground">
                Expires: {expirationDate.toLocaleDateString()}
              </div>
            )}

            {/* Profile Link */}
            {profileUrl && (
              <div className="mt-3 pt-3 border-t">
                <Button variant="ghost" size="sm" className="w-full" asChild>
                  <Link href={profileUrl} target="_blank" rel="noopener noreferrer">
                    View {config.shortName} Profile
                    <ExternalLink className="ml-2 h-3 w-3" />
                  </Link>
                </Button>
              </div>
            )}
          </>
        ) : (
          /* Not Established Content */
          <div className="py-4 text-center">
            <HelpCircle className="h-12 w-12 mx-auto text-muted-foreground/40 mb-3" />
            <p className="text-2xl font-semibold text-muted-foreground mb-2">
              --
            </p>
            <p className="text-sm text-muted-foreground max-w-[200px] mx-auto">
              {config.notEstablishedDesc}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
