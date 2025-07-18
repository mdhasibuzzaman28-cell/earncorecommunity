'use client';

import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Heart, MessageCircle, Bookmark, Share2, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Post } from '@/store/features/feed/types';
import { ProfileDialog } from './profile-dialog';
import { CommentsDrawer } from './comments-drawer';
import { useTogglePostLoveMutation, useToggleBookmarkMutation } from '@/store/features/feed/feedApi';
import { cn } from '@/lib/utils';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [isCommentsDrawerOpen, setIsCommentsDrawerOpen] = useState(false);
  const [toggleLove] = useTogglePostLoveMutation();
  const [toggleBookmark] = useToggleBookmarkMutation();

  const handleLoveClick = () => {
    toggleLove({ postId: post.id, isLoved: post.isLoved });
  };

  const handleBookmarkClick = () => {
    toggleBookmark({ postId: post.id, isBookmarked: post.isBookmarked });
  };

  const handleProfileClick = () => {
    setIsProfileDialogOpen(true);
  };

  const handleCommentsClick = () => {
    setIsCommentsDrawerOpen(true);
  };

  return (
    <>
      <article className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4">
          <button
            onClick={handleProfileClick}
            className="flex items-center space-x-3 hover:bg-gray-50 rounded-lg p-2 -m-2 transition-colors duration-200"
          >
            <Avatar className="h-10 w-10">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="text-left">
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-gray-900">{post.author.name}</span>
                {post.author.isVerified && (
                  <Badge variant="secondary" className="text-xs">Verified</Badge>
                )}
              </div>
              <p className="text-sm text-gray-500">
                in {post.community.name} • {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
              </p>
            </div>
          </button>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBookmarkClick}
              className={cn(
                "h-8 w-8 p-0",
                post.isBookmarked ? "text-blue-600" : "text-gray-500"
              )}
            >
              <Bookmark className={cn("h-4 w-4", post.isBookmarked && "fill-current")} />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-500">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-500">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-4">
          <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
            {post.title}
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {post.content}
          </p>
        </div>

        {/* Image */}
        {post.image && (
          <div className="px-6 pb-4">
            <img
              src={post.image}
              alt="Post image"
              className="w-full rounded-lg object-cover max-h-96"
            />
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between p-6 pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLoveClick}
              className={cn(
                "flex items-center space-x-2 hover:bg-red-50",
                post.isLoved ? "text-red-600" : "text-gray-500"
              )}
            >
              <Heart className={cn("h-5 w-5", post.isLoved && "fill-current")} />
              <span className="text-sm font-medium">Love</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCommentsClick}
              className="flex items-center space-x-2 text-gray-500 hover:bg-blue-50 hover:text-blue-600"
            >
              <MessageCircle className="h-5 w-5" />
              <span className="text-sm font-medium">Comment</span>
            </Button>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <span>{post.lovesCount} loves</span>
              <span>•</span>
              <span>{post.commentsCount} comments</span>
            </div>
            <div className="flex -space-x-1">
              {post.lovedBy.slice(0, 3).map((user, index) => (
                <Avatar key={user.id} className="h-6 w-6 border-2 border-white">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-xs">{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              ))}
            </div>
          </div>
        </div>
      </article>

      <ProfileDialog
        userId={post.author.id}
        open={isProfileDialogOpen}
        onOpenChange={setIsProfileDialogOpen}
      />

      <CommentsDrawer
        postId={post.id}
        open={isCommentsDrawerOpen}
        onOpenChange={setIsCommentsDrawerOpen}
      />
    </>
  );
}