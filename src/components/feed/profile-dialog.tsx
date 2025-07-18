'use client';

import { formatDistanceToNow } from 'date-fns';
import { Calendar, Users, FileText } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetUserProfileQuery } from '@/store/features/feed/feedApi';

interface ProfileDialogProps {
  userId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProfileDialog({ userId, open, onOpenChange }: ProfileDialogProps) {
  const { data: user, isLoading } = useGetUserProfileQuery(userId, {
    skip: !open,
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Profile</DialogTitle>
        </DialogHeader>
        
        {isLoading ? (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-16 w-16 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          </div>
        ) : user ? (
          <div className="space-y-6">
            {/* Profile Header */}
            <div className="flex items-start space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-lg">{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-bold">{user.name}</h3>
                  {user.isVerified && (
                    <Badge variant="secondary" className="text-xs">Verified</Badge>
                  )}
                </div>
                <p className="text-sm text-gray-500">@{user.username}</p>
                <Button size="sm" className="w-full">
                  Follow
                </Button>
              </div>
            </div>

            {/* Bio */}
            <p className="text-gray-700">{user.bio}</p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="space-y-1">
                <div className="flex flex-col items-center">
                  <FileText className="h-5 w-5 text-gray-400 mb-1" />
                  <span className="text-lg font-bold">{user.postsCount}</span>
                </div>
                <span className="text-sm text-gray-500">Posts</span>
              </div>
              <div className="space-y-1">
                <div className="flex flex-col items-center">
                  <Users className="h-5 w-5 text-gray-400 mb-1" />
                  <span className="text-lg font-bold">{user.followersCount}</span>
                </div>
                <span className="text-sm text-gray-500">Followers</span>
              </div>
              <div className="space-y-1">
                <div className="flex flex-col items-center">
                  <Users className="h-5 w-5 text-gray-400 mb-1" />
                  <span className="text-lg font-bold">{user.followingCount}</span>
                </div>
                <span className="text-sm text-gray-500">Following</span>
              </div>
            </div>

            {/* Join Date */}
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              <span>Joined {formatDistanceToNow(new Date(user.joinedDate), { addSuffix: true })}</span>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}