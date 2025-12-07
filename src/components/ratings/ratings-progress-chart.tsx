'use client';

import { format } from 'date-fns';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { useMemo, useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { RatingSnapshot } from '@/lib/ratings/types';
import { cn } from '@/lib/utils';

interface CurrentRatings {
  utr?: number;
  wtn?: number;
  ntrp?: number;
}

interface RatingsProgressChartProps {
  history: RatingSnapshot[];
  currentRatings?: CurrentRatings;
  className?: string;
}

type ViewMode = 'combined' | 'utr' | 'wtn' | 'ntrp';
type TimeRange = '3m' | '6m' | '12m';

// Custom tooltip component - defined outside to avoid recreation during render
function CustomTooltip({ active, payload, label }: {
  active?: boolean;
  payload?: Array<{ value: number | undefined; name: string; color: string }>;
  label?: string;
}) {
  if (active && payload && payload.length) {
    const validPayload = payload.filter(entry => entry.value !== undefined);
    if (validPayload.length === 0) return null;

    return (
      <div className="rounded-lg border bg-background p-3 shadow-lg">
        <p className="font-medium text-sm mb-2">{label}</p>
        {validPayload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="font-medium">
              {entry.name.includes('UTR')
                ? entry.value?.toFixed(2)
                : entry.value?.toFixed(1)}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

export function RatingsProgressChart({
  history,
  currentRatings,
  className,
}: RatingsProgressChartProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('combined');
  const [timeRange, setTimeRange] = useState<TimeRange>('12m');

  // Determine which ratings have data
  const hasUTR = useMemo(() =>
    history.some(s => s.utrSingles !== undefined), [history]);
  const hasWTN = useMemo(() =>
    history.some(s => s.wtnSingles !== undefined), [history]);
  const hasNTRP = useMemo(() =>
    history.some(s => s.ntrp !== undefined), [history]);

  // Filter history based on time range
  const filteredHistory = useMemo(() => {
    const now = new Date();
    const months = timeRange === '3m' ? 3 : timeRange === '6m' ? 6 : 12;
    const cutoff = new Date(now);
    cutoff.setMonth(cutoff.getMonth() - months);

    return history
      .filter((snapshot) => new Date(snapshot.date) >= cutoff)
      .map((snapshot) => ({
        ...snapshot,
        date: format(new Date(snapshot.date), 'MMM yyyy'),
        dateRaw: new Date(snapshot.date),
      }))
      .sort((a, b) => a.dateRaw.getTime() - b.dateRaw.getTime());
  }, [history, timeRange]);

  // Calculate improvements
  const improvements = useMemo(() => {
    if (filteredHistory.length < 2) {
      return { utr: 0, wtn: 0, ntrp: 0 };
    }
    const first = filteredHistory[0];
    const last = filteredHistory[filteredHistory.length - 1];
    if (!first || !last) {
      return { utr: 0, wtn: 0, ntrp: 0 };
    }

    // UTR improvement (higher is better)
    const utrImprovement = (first.utrSingles !== undefined && last.utrSingles !== undefined)
      ? last.utrSingles - first.utrSingles
      : null;

    // WTN improvement (lower is better, so invert)
    const wtnImprovement = (first.wtnSingles !== undefined && last.wtnSingles !== undefined)
      ? first.wtnSingles - last.wtnSingles
      : null;

    // NTRP improvement (higher is better)
    const ntrpImprovement = (first.ntrp !== undefined && last.ntrp !== undefined)
      ? last.ntrp - first.ntrp
      : null;

    return {
      utr: utrImprovement,
      wtn: wtnImprovement,
      ntrp: ntrpImprovement,
    };
  }, [filteredHistory]);

  // Always show all view mode tabs
  const availableViewModes: { value: ViewMode; label: string; hasData: boolean }[] = useMemo(() => [
    { value: 'combined', label: 'Combined', hasData: [hasUTR, hasWTN, hasNTRP].filter(Boolean).length >= 2 },
    { value: 'utr', label: 'UTR', hasData: hasUTR },
    { value: 'wtn', label: 'WTN', hasData: hasWTN },
    { value: 'ntrp', label: 'NTRP', hasData: hasNTRP },
  ], [hasUTR, hasWTN, hasNTRP]);

  // Get data availability for current view mode
  const currentModeHasData = useMemo(() => {
    const mode = availableViewModes.find(m => m.value === viewMode);
    return mode?.hasData ?? false;
  }, [viewMode, availableViewModes]);

  // Use the selected view mode directly (allow selection even without data)
  const effectiveViewMode = viewMode;

  const showUTR = effectiveViewMode === 'combined' ? hasUTR : effectiveViewMode === 'utr';
  const showWTN = effectiveViewMode === 'combined' ? hasWTN : effectiveViewMode === 'wtn';
  const showNTRP = effectiveViewMode === 'combined' ? hasNTRP : effectiveViewMode === 'ntrp';

  return (
    <Card className={cn('', className)}>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-xl">Rating Progress</CardTitle>
            <CardDescription>
              Track your rating improvement over time
            </CardDescription>
          </div>

          <div className="flex items-center gap-2">
            {/* Time Range Selector */}
            <div className="flex gap-1 border rounded-lg p-1">
              {(['3m', '6m', '12m'] as TimeRange[]).map((range) => (
                <Button
                  key={range}
                  variant={timeRange === range ? 'secondary' : 'ghost'}
                  size="sm"
                  className="h-7 px-3 text-xs"
                  onClick={() => setTimeRange(range)}
                >
                  {range.toUpperCase()}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Rating badges - show current rating + trend */}
        <div className="flex flex-wrap gap-4 mt-4">
          {(currentRatings?.utr !== undefined || improvements.utr !== null) && (
            <div
              className={cn(
                'flex items-center gap-3 px-4 py-2 rounded-lg border-2 font-medium',
                improvements.utr !== null && improvements.utr > 0
                  ? 'border-green-300 bg-green-50'
                  : improvements.utr !== null && improvements.utr < 0
                    ? 'border-red-300 bg-red-50'
                    : 'border-emerald-300 bg-emerald-50'
              )}
            >
              <span className="text-base text-emerald-700">
                UTR {currentRatings?.utr?.toFixed(2) ?? '--'}
              </span>
              {improvements.utr !== null && improvements.utr !== 0 && (
                <span
                  className={cn(
                    'flex items-center gap-1 text-sm',
                    improvements.utr > 0 ? 'text-green-600' : 'text-red-600'
                  )}
                >
                  {improvements.utr > 0 ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  {improvements.utr >= 0 ? '+' : ''}{improvements.utr.toFixed(2)}
                </span>
              )}
            </div>
          )}
          {(currentRatings?.wtn !== undefined || improvements.wtn !== null) && (
            <div
              className={cn(
                'flex items-center gap-3 px-4 py-2 rounded-lg border-2 font-medium',
                improvements.wtn !== null && improvements.wtn > 0
                  ? 'border-green-300 bg-green-50'
                  : improvements.wtn !== null && improvements.wtn < 0
                    ? 'border-red-300 bg-red-50'
                    : 'border-blue-300 bg-blue-50'
              )}
            >
              <span className="text-base text-blue-700">
                WTN {currentRatings?.wtn?.toFixed(1) ?? '--'}
              </span>
              {improvements.wtn !== null && improvements.wtn !== 0 && (
                <span
                  className={cn(
                    'flex items-center gap-1 text-sm',
                    improvements.wtn > 0 ? 'text-green-600' : 'text-red-600'
                  )}
                >
                  {improvements.wtn > 0 ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  {improvements.wtn >= 0 ? '+' : ''}{improvements.wtn.toFixed(1)}
                </span>
              )}
            </div>
          )}
          {(currentRatings?.ntrp !== undefined || improvements.ntrp !== null) && (
            <div
              className={cn(
                'flex items-center gap-3 px-4 py-2 rounded-lg border-2 font-medium',
                improvements.ntrp !== null && improvements.ntrp > 0
                  ? 'border-green-300 bg-green-50'
                  : improvements.ntrp !== null && improvements.ntrp < 0
                    ? 'border-red-300 bg-red-50'
                    : 'border-orange-300 bg-orange-50'
              )}
            >
              <span className="text-base text-orange-700">
                NTRP {currentRatings?.ntrp?.toFixed(1) ?? '--'}
              </span>
              {improvements.ntrp !== null && improvements.ntrp !== 0 && (
                <span
                  className={cn(
                    'flex items-center gap-1 text-sm',
                    improvements.ntrp > 0 ? 'text-green-600' : 'text-red-600'
                  )}
                >
                  {improvements.ntrp > 0 ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  {improvements.ntrp >= 0 ? '+' : ''}{improvements.ntrp.toFixed(1)}
                </span>
              )}
            </div>
          )}
        </div>

        {/* View Mode Tabs - Always show all options */}
        <Tabs
          value={effectiveViewMode}
          onValueChange={(v) => setViewMode(v as ViewMode)}
          className="mt-4"
        >
          <TabsList>
            {availableViewModes.map((mode) => (
              <TabsTrigger
                key={mode.value}
                value={mode.value}
                className={cn(!mode.hasData && 'opacity-50')}
              >
                {mode.label}
                {!mode.hasData && <span className="ml-1 text-xs">○</span>}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </CardHeader>

      <CardContent>
        {!currentModeHasData ? (
          /* No data message for selected rating type */
          <div className="h-[300px] w-full flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <p className="text-lg font-medium mb-2">No {effectiveViewMode.toUpperCase()} Data Available</p>
              <p className="text-sm">
                {effectiveViewMode === 'combined'
                  ? 'Need at least 2 rating types to show combined view.'
                  : effectiveViewMode === 'ntrp'
                    ? 'NTRP ratings are typically for adult players (18+) in USTA leagues.'
                    : `No ${effectiveViewMode.toUpperCase()} rating history recorded.`}
              </p>
            </div>
          </div>
        ) : (
        <>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={filteredHistory}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="utrGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="wtnGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="ntrpGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                className="text-muted-foreground"
              />
              {showUTR && (
                <YAxis
                  yAxisId="utr"
                  orientation="left"
                  domain={['dataMin - 0.5', 'dataMax + 0.5']}
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => value.toFixed(1)}
                  className="text-emerald-600"
                />
              )}
              {showWTN && (
                <YAxis
                  yAxisId="wtn"
                  orientation="right"
                  domain={['dataMin - 1', 'dataMax + 1']}
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => value.toFixed(0)}
                  reversed // WTN: lower is better, so reverse the axis
                  className="text-blue-600"
                />
              )}
              {showNTRP && !showUTR && !showWTN && (
                <YAxis
                  yAxisId="ntrp"
                  orientation="left"
                  domain={[1.5, 7]}
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => value.toFixed(1)}
                  className="text-orange-600"
                />
              )}
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              {showUTR && (
                <Area
                  yAxisId="utr"
                  type="monotone"
                  dataKey="utrSingles"
                  name="UTR Singles"
                  stroke="#10b981"
                  strokeWidth={2}
                  fill="url(#utrGradient)"
                  dot={{ fill: '#10b981', strokeWidth: 0, r: 3 }}
                  activeDot={{ r: 5, strokeWidth: 0 }}
                  connectNulls
                />
              )}
              {showWTN && (
                <Area
                  yAxisId="wtn"
                  type="monotone"
                  dataKey="wtnSingles"
                  name="WTN Singles"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fill="url(#wtnGradient)"
                  dot={{ fill: '#3b82f6', strokeWidth: 0, r: 3 }}
                  activeDot={{ r: 5, strokeWidth: 0 }}
                  connectNulls
                />
              )}
              {showNTRP && (
                <Area
                  yAxisId={showUTR ? 'utr' : showWTN ? 'wtn' : 'ntrp'}
                  type="monotone"
                  dataKey="ntrp"
                  name="NTRP"
                  stroke="#f97316"
                  strokeWidth={2}
                  fill="url(#ntrpGradient)"
                  dot={{ fill: '#f97316', strokeWidth: 0, r: 3 }}
                  activeDot={{ r: 5, strokeWidth: 0 }}
                  connectNulls
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Legend explanation */}
        <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
          {hasUTR && (
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-emerald-500" />
              <span>UTR (1-16.5, higher = better)</span>
            </div>
          )}
          {hasWTN && (
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-blue-500" />
              <span>WTN (40-1, lower = better)</span>
            </div>
          )}
          {hasNTRP && (
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-orange-500" />
              <span>NTRP (1.5-7.0, higher = better)</span>
            </div>
          )}
        </div>
        </>
        )}
      </CardContent>
    </Card>
  );
}
