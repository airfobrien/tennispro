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

import { Badge } from '@/components/ui/badge';
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

interface RatingsProgressChartProps {
  history: RatingSnapshot[];
  className?: string;
}

type ViewMode = 'combined' | 'utr' | 'wtn';
type TimeRange = '3m' | '6m' | '12m';

// Custom tooltip component - defined outside to avoid recreation during render
function CustomTooltip({ active, payload, label }: {
  active?: boolean;
  payload?: Array<{ value: number; name: string; color: string }>;
  label?: string;
}) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-3 shadow-lg">
        <p className="font-medium text-sm mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="font-medium">
              {entry.name.includes('UTR')
                ? entry.value.toFixed(2)
                : entry.value.toFixed(1)}
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
  className,
}: RatingsProgressChartProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('combined');
  const [timeRange, setTimeRange] = useState<TimeRange>('12m');

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
      return { utr: 0, wtn: 0 };
    }
    const first = filteredHistory[0];
    const last = filteredHistory[filteredHistory.length - 1];
    if (!first || !last) {
      return { utr: 0, wtn: 0 };
    }
    return {
      utr: last.utrSingles - first.utrSingles,
      wtn: first.wtnSingles - last.wtnSingles, // Inverted because lower WTN is better
    };
  }, [filteredHistory]);

  return (
    <Card className={cn('', className)}>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-xl">Rating Progress</CardTitle>
            <CardDescription>
              Track your UTR and WTN improvement over time
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

        {/* Improvement badges */}
        <div className="flex gap-3 mt-4">
          <Badge
            variant="outline"
            className={cn(
              'gap-1.5 py-1',
              improvements.utr > 0
                ? 'border-green-200 bg-green-50 text-green-700'
                : improvements.utr < 0
                  ? 'border-red-200 bg-red-50 text-red-700'
                  : 'border-gray-200 bg-gray-50 text-gray-700'
            )}
          >
            {improvements.utr > 0 ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            UTR {improvements.utr >= 0 ? '+' : ''}{improvements.utr.toFixed(2)}
          </Badge>
          <Badge
            variant="outline"
            className={cn(
              'gap-1.5 py-1',
              improvements.wtn > 0
                ? 'border-green-200 bg-green-50 text-green-700'
                : improvements.wtn < 0
                  ? 'border-red-200 bg-red-50 text-red-700'
                  : 'border-gray-200 bg-gray-50 text-gray-700'
            )}
          >
            {improvements.wtn > 0 ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            WTN {improvements.wtn >= 0 ? '+' : ''}{improvements.wtn.toFixed(1)}
          </Badge>
        </div>

        {/* View Mode Tabs */}
        <Tabs
          value={viewMode}
          onValueChange={(v) => setViewMode(v as ViewMode)}
          className="mt-4"
        >
          <TabsList>
            <TabsTrigger value="combined">Combined</TabsTrigger>
            <TabsTrigger value="utr">UTR Only</TabsTrigger>
            <TabsTrigger value="wtn">WTN Only</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>

      <CardContent>
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
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                className="text-muted-foreground"
              />
              {(viewMode === 'combined' || viewMode === 'utr') && (
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
              {(viewMode === 'combined' || viewMode === 'wtn') && (
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
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              {(viewMode === 'combined' || viewMode === 'utr') && (
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
                />
              )}
              {(viewMode === 'combined' || viewMode === 'wtn') && (
                <Area
                  yAxisId={viewMode === 'wtn' ? 'wtn' : 'wtn'}
                  type="monotone"
                  dataKey="wtnSingles"
                  name="WTN Singles"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fill="url(#wtnGradient)"
                  dot={{ fill: '#3b82f6', strokeWidth: 0, r: 3 }}
                  activeDot={{ r: 5, strokeWidth: 0 }}
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Legend explanation */}
        <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-emerald-500" />
            <span>UTR (1-16.5, higher = better)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-blue-500" />
            <span>WTN (40-1, lower = better)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
