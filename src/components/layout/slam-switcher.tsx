'use client';

import { Check, ChevronDown, Palette } from 'lucide-react';
import { useEffect, useSyncExternalStore } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const themes = [
  {
    id: 'australian-open',
    name: 'Australian Open',
    shortName: 'Melbourne',
    color: '#0077C8',
    description: 'Fresh & vibrant',
  },
  {
    id: 'roland-garros',
    name: 'Roland Garros',
    shortName: 'Paris',
    color: '#C84B31',
    description: 'Warm & elegant',
  },
  {
    id: 'wimbledon',
    name: 'Wimbledon',
    shortName: 'London',
    color: '#006633',
    description: 'Classic & refined',
  },
  {
    id: 'us-open',
    name: 'US Open',
    shortName: 'New York',
    color: '#003087',
    description: 'Bold & dynamic',
  },
] as const;

type ThemeId = (typeof themes)[number]['id'];

const DEFAULT_THEME: ThemeId = 'australian-open';

// Theme storage management
const themeStore = {
  getTheme(): ThemeId {
    if (typeof window === 'undefined') return DEFAULT_THEME;

    // Check for new key first, then migrate from old key if needed
    let saved = localStorage.getItem('tennispro-theme') as ThemeId | null;

    if (!saved) {
      // Migrate from old localStorage key
      const oldSaved = localStorage.getItem('slam-theme');
      if (oldSaved) {
        // Handle old theme ID migration (french-open -> roland-garros)
        saved = oldSaved === 'french-open' ? 'roland-garros' : (oldSaved as ThemeId);
        localStorage.setItem('tennispro-theme', saved);
        localStorage.removeItem('slam-theme');
      }
    }

    if (saved && themes.some((t) => t.id === saved)) {
      return saved;
    }

    return DEFAULT_THEME;
  },

  setTheme(theme: ThemeId): void {
    localStorage.setItem('tennispro-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    window.dispatchEvent(new CustomEvent('theme-change', { detail: theme }));
  },

  subscribe(callback: () => void): () => void {
    const handleChange = () => callback();
    window.addEventListener('theme-change', handleChange);
    window.addEventListener('storage', handleChange);
    return () => {
      window.removeEventListener('theme-change', handleChange);
      window.removeEventListener('storage', handleChange);
    };
  },
};

export function SlamSwitcher() {
  const currentTheme = useSyncExternalStore(
    themeStore.subscribe,
    themeStore.getTheme,
    () => DEFAULT_THEME
  );

  // Apply theme to DOM on mount and when theme changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);

  const handleThemeChange = (themeId: ThemeId) => {
    themeStore.setTheme(themeId);
  };

  const current = themes.find((t) => t.id === currentTheme) ?? themes[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 px-3 hover:bg-accent/50 transition-colors"
        >
          <span
            className="h-2.5 w-2.5 rounded-full ring-1 ring-inset ring-black/10"
            style={{ backgroundColor: current.color }}
          />
          <span className="hidden sm:inline text-sm font-medium text-foreground/80">
            {current.shortName}
          </span>
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <Palette className="h-3.5 w-3.5" />
          Grand Slam Theme
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {themes.map((theme) => (
          <DropdownMenuItem
            key={theme.id}
            onClick={() => handleThemeChange(theme.id)}
            className={cn(
              'flex items-center gap-3 cursor-pointer py-2.5 px-3',
              'focus:bg-accent/50 transition-colors',
              currentTheme === theme.id && 'bg-accent/30'
            )}
          >
            <span
              className={cn(
                'h-4 w-4 rounded-full ring-1 ring-inset ring-black/10 flex-shrink-0',
                'transition-transform duration-150',
                currentTheme === theme.id && 'scale-110'
              )}
              style={{ backgroundColor: theme.color }}
            />
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-sm font-medium truncate">{theme.name}</span>
              <span className="text-xs text-muted-foreground">
                {theme.description}
              </span>
            </div>
            {currentTheme === theme.id && (
              <Check className="h-4 w-4 text-primary flex-shrink-0" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
