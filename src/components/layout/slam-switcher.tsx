'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const slams = [
  {
    id: 'australian-open',
    name: 'Australian Open',
    emoji: '🇦🇺',
    color: 'bg-[#377DB8]',
  },
  {
    id: 'french-open',
    name: 'French Open',
    emoji: '🇫🇷',
    color: 'bg-[#B24E3A]',
  },
  {
    id: 'wimbledon',
    name: 'Wimbledon',
    emoji: '🇬🇧',
    color: 'bg-[#6C8E48]',
  },
  {
    id: 'us-open',
    name: 'US Open',
    emoji: '🇺🇸',
    color: 'bg-[#3C638E]',
  },
] as const;

type SlamId = (typeof slams)[number]['id'];

export function SlamSwitcher() {
  const [currentSlam, setCurrentSlam] = useState<SlamId>('australian-open');

  useEffect(() => {
    // Get saved preference or default to australian-open
    const saved = localStorage.getItem('slam-theme') as SlamId | null;
    if (saved && slams.some(s => s.id === saved)) {
      setCurrentSlam(saved);
      document.documentElement.setAttribute('data-slam', saved);
    }
  }, []);

  const handleSlamChange = (slamId: SlamId) => {
    setCurrentSlam(slamId);
    document.documentElement.setAttribute('data-slam', slamId);
    localStorage.setItem('slam-theme', slamId);
  };

  const current = slams.find(s => s.id === currentSlam) ?? slams[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <span className={`h-3 w-3 rounded-full ${current.color}`} />
          <span className="hidden sm:inline text-xs font-medium">{current.name}</span>
          <span className="sm:hidden">{current.emoji}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {slams.map((slam) => (
          <DropdownMenuItem
            key={slam.id}
            onClick={() => handleSlamChange(slam.id)}
            className="gap-3 cursor-pointer"
          >
            <span className={`h-3 w-3 rounded-full ${slam.color}`} />
            <span>{slam.emoji}</span>
            <span>{slam.name}</span>
            {currentSlam === slam.id && (
              <span className="ml-auto text-xs">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
