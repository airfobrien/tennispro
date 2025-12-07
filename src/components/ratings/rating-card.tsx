'use client';

import { ExternalLink, Info, TrendingDown, TrendingUp } from 'lucide-react';
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
import { getUTRLevel, getWTNLevel } from '@/lib/ratings/types';
import { cn } from '@/lib/utils';

interface RatingCardProps {
  type: 'utr' | 'wtn';
  singles: number;
  doubles: number;
  reliability?: number; // UTR reliability percentage
  confidence?: 'high' | 'medium' | 'low'; // WTN confidence
  lastUpdated: Date;
  profileUrl?: string;
  monthlyChange?: { change: number; improved: boolean };
  className?: string;
}

export function RatingCard({
  type,
  singles,
  doubles,
  reliability,
  confidence,
  lastUpdated,
  profileUrl,
  monthlyChange,
  className,
}: RatingCardProps) {
  const isUTR = type === 'utr';
  const level = isUTR ? getUTRLevel(singles) : getWTNLevel(singles);

  const gradientClasses = isUTR
    ? 'from-emerald-500/10 via-green-500/5 to-transparent'
    : 'from-blue-500/10 via-indigo-500/5 to-transparent';

  const accentColor = isUTR ? 'text-emerald-600' : 'text-blue-600';
  const badgeVariant = isUTR ? 'default' : 'secondary';

  const confidenceColors = {
    high: 'bg-green-100 text-green-700',
    medium: 'bg-yellow-100 text-yellow-700',
    low: 'bg-red-100 text-red-700',
  };

  return (
    <Card className={cn('relative overflow-hidden', className)}>
      {/* Gradient overlay */}
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-br pointer-events-none',
          gradientClasses
        )}
      />

      <CardHeader className="relative pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg font-semibold">
              {isUTR ? 'Universal Tennis Rating' : 'World Tennis Number'}
            </CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="text-sm">
                    {isUTR
                      ? 'UTR rates players 1.00-16.50 based on match results. Higher is better.'
                      : 'WTN rates players 40-1 based on ITF standards. Lower is better.'}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Badge variant={badgeVariant} className="text-xs">
            {isUTR ? 'UTR' : 'WTN'}
          </Badge>
        </div>
        <CardDescription className="flex items-center gap-2">
          <span className={cn('font-medium', accentColor)}>{level}</span>
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
              {isUTR
                ? Math.abs(monthlyChange.change).toFixed(2)
                : Math.abs(monthlyChange.change).toFixed(1)}
              {' this month'}
            </span>
          )}
        </CardDescription>
      </CardHeader>

      <CardContent className="relative">
        <div className="grid grid-cols-2 gap-4">
          {/* Singles Rating */}
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              Singles
            </p>
            <p className={cn('text-3xl font-bold tabular-nums', accentColor)}>
              {isUTR ? singles.toFixed(2) : singles.toFixed(1)}
            </p>
          </div>

          {/* Doubles Rating */}
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              Doubles
            </p>
            <p className={cn('text-3xl font-bold tabular-nums', accentColor)}>
              {isUTR ? doubles.toFixed(2) : doubles.toFixed(1)}
            </p>
          </div>
        </div>

        {/* Reliability / Confidence */}
        <div className="mt-4 flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            {isUTR && reliability !== undefined ? (
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
            ) : confidence ? (
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
            ) : null}
          </div>

          <span className="text-xs text-muted-foreground">
            Updated {lastUpdated.toLocaleDateString()}
          </span>
        </div>

        {/* Profile Link */}
        {profileUrl && (
          <div className="mt-3 pt-3 border-t">
            <Button variant="ghost" size="sm" className="w-full" asChild>
              <Link href={profileUrl} target="_blank" rel="noopener noreferrer">
                View {isUTR ? 'UTR' : 'WTN'} Profile
                <ExternalLink className="ml-2 h-3 w-3" />
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
