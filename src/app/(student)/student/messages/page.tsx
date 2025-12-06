'use client';

import { Send } from 'lucide-react';
import { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

// Mock messages data
const mockCoach = {
  name: 'John Smith',
  image: null,
};

const mockMessages = [
  {
    id: '1',
    content: 'Great session today! Your forehand is really improving.',
    sender: 'coach',
    timestamp: '2024-01-18 3:30 PM',
  },
  {
    id: '2',
    content: 'Thanks Coach! I really focused on the topspin technique you showed me.',
    sender: 'student',
    timestamp: '2024-01-18 3:32 PM',
  },
  {
    id: '3',
    content: 'I can see that. Keep practicing that low-to-high swing path.',
    sender: 'coach',
    timestamp: '2024-01-18 3:33 PM',
  },
  {
    id: '4',
    content: 'For our next session, we\'ll work on your serve. Make sure to stretch beforehand!',
    sender: 'coach',
    timestamp: '2024-01-18 3:35 PM',
  },
  {
    id: '5',
    content: 'Sounds good! I\'ll practice my toss at home this week.',
    sender: 'student',
    timestamp: '2024-01-18 4:00 PM',
  },
  {
    id: '6',
    content: 'Perfect. See you Saturday!',
    sender: 'coach',
    timestamp: '2024-01-18 4:05 PM',
  },
];

export default function StudentMessagesPage() {
  const [message, setMessage] = useState('');

  const coachInitials = mockCoach.name
    .split(' ')
    .map((n) => n[0])
    .join('');

  const handleSend = () => {
    if (message.trim()) {
      // In production, this would send the message
      setMessage('');
    }
  };

  return (
    <div className="container py-6">
      <Card className="mx-auto max-w-3xl">
        <CardHeader className="border-b">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={mockCoach.image ?? undefined} />
              <AvatarFallback>{coachInitials}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base">{mockCoach.name}</CardTitle>
              <p className="text-sm text-muted-foreground">Your Coach</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {/* Messages */}
          <ScrollArea className="h-[500px] p-4">
            <div className="space-y-4">
              {mockMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    'flex gap-3',
                    msg.sender === 'student' && 'flex-row-reverse'
                  )}
                >
                  {msg.sender === 'coach' && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={mockCoach.image ?? undefined} />
                      <AvatarFallback className="text-xs">
                        {coachInitials}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      'max-w-[70%] space-y-1',
                      msg.sender === 'student' && 'items-end'
                    )}
                  >
                    <div
                      className={cn(
                        'rounded-lg px-3 py-2',
                        msg.sender === 'coach'
                          ? 'bg-muted'
                          : 'bg-primary text-primary-foreground'
                      )}
                    >
                      <p className="text-sm">{msg.content}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="border-t p-4">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <Button size="icon" onClick={handleSend}>
                <Send className="h-4 w-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
