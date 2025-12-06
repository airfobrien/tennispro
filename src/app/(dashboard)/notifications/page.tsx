'use client';

import { Bell, Check, CheckCheck, Filter, Trash2, Video, Users, Calendar, MessageSquare, CreditCard, AlertCircle } from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface Notification {
  id: string;
  type: 'video' | 'student' | 'lesson' | 'message' | 'billing' | 'system';
  title: string;
  description: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'video',
    title: 'New video uploaded',
    description: 'Sarah Johnson uploaded a new serve video for review',
    time: '5 minutes ago',
    read: false,
  },
  {
    id: '2',
    type: 'video',
    title: 'Analysis complete',
    description: 'Video analysis for Mike Chen\'s forehand is ready to view',
    time: '15 minutes ago',
    read: false,
  },
  {
    id: '3',
    type: 'lesson',
    title: 'Lesson reminder',
    description: 'Upcoming lesson with John Smith in 1 hour',
    time: '1 hour ago',
    read: false,
  },
  {
    id: '4',
    type: 'message',
    title: 'New message',
    description: 'Emily Davis sent you a message about scheduling',
    time: '2 hours ago',
    read: true,
  },
  {
    id: '5',
    type: 'student',
    title: 'Student milestone',
    description: 'Alex Thompson completed Level 3 of Forehand Mastery',
    time: '3 hours ago',
    read: true,
  },
  {
    id: '6',
    type: 'billing',
    title: 'Payment received',
    description: 'Monthly subscription payment of $99.00 processed successfully',
    time: '1 day ago',
    read: true,
  },
  {
    id: '7',
    type: 'system',
    title: 'System update',
    description: 'New features available: Enhanced video comparison tools',
    time: '2 days ago',
    read: true,
  },
  {
    id: '8',
    type: 'video',
    title: 'Video processing failed',
    description: 'Unable to process video from Sarah Johnson. Please re-upload.',
    time: '3 days ago',
    read: true,
  },
];

const notificationIcons: Record<Notification['type'], React.ElementType> = {
  video: Video,
  student: Users,
  lesson: Calendar,
  message: MessageSquare,
  billing: CreditCard,
  system: AlertCircle,
};

const notificationColors: Record<Notification['type'], string> = {
  video: 'bg-blue-500/10 text-blue-500',
  student: 'bg-green-500/10 text-green-500',
  lesson: 'bg-purple-500/10 text-purple-500',
  message: 'bg-orange-500/10 text-orange-500',
  billing: 'bg-emerald-500/10 text-emerald-500',
  system: 'bg-gray-500/10 text-gray-500',
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<Notification['type'] | 'all'>('all');

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredNotifications = filter === 'all'
    ? notifications
    : notifications.filter((n) => n.type === filter);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">
            Stay updated on your coaching activity
          </p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              <CheckCheck className="mr-2 h-4 w-4" />
              Mark all as read
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by type</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setFilter('all')}>
                All notifications
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter('video')}>
                <Video className="mr-2 h-4 w-4" />
                Videos
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter('student')}>
                <Users className="mr-2 h-4 w-4" />
                Students
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter('lesson')}>
                <Calendar className="mr-2 h-4 w-4" />
                Lessons
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter('message')}>
                <MessageSquare className="mr-2 h-4 w-4" />
                Messages
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter('billing')}>
                <CreditCard className="mr-2 h-4 w-4" />
                Billing
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Unread</CardDescription>
            <CardTitle className="text-3xl">{unreadCount}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total</CardDescription>
            <CardTitle className="text-3xl">{notifications.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>This week</CardDescription>
            <CardTitle className="text-3xl">
              {notifications.filter((n) => !n.time.includes('day')).length}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Notifications List */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>All Notifications</CardTitle>
            <CardDescription>
              {filter === 'all' ? 'Showing all notifications' : `Filtered by ${filter}`}
            </CardDescription>
          </div>
          {notifications.length > 0 && (
            <Button variant="ghost" size="sm" onClick={clearAll}>
              <Trash2 className="mr-2 h-4 w-4" />
              Clear all
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Bell className="mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="text-lg font-semibold">No notifications</h3>
              <p className="text-muted-foreground">
                {filter === 'all'
                  ? "You're all caught up!"
                  : `No ${filter} notifications`}
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {filteredNotifications.map((notification, index) => {
                const Icon = notificationIcons[notification.type];
                return (
                  <div key={notification.id}>
                    <div
                      className={cn(
                        'flex items-start gap-4 rounded-lg p-4 transition-colors hover:bg-muted/50',
                        !notification.read && 'bg-muted/30'
                      )}
                    >
                      <div
                        className={cn(
                          'flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
                          notificationColors[notification.type]
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{notification.title}</p>
                            {!notification.read && (
                              <Badge variant="default" className="h-5 px-1.5 text-xs">
                                New
                              </Badge>
                            )}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {notification.time}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {notification.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => markAsRead(notification.id)}
                          >
                            <Check className="h-4 w-4" />
                            <span className="sr-only">Mark as read</span>
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => deleteNotification(notification.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </div>
                    {index < filteredNotifications.length - 1 && (
                      <Separator className="my-1" />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
