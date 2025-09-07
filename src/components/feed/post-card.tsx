"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import {
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  MoreHorizontal,
  BadgeCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Post } from "@/store/features/feed/types";
import { ProfileDialog } from "./profile-dialog";
import { CommentsDrawer } from "./comments-drawer";
import {
  useTogglePostLoveMutation,
  useToggleBookmarkMutation,
} from "@/store/features/feed/feedApi";
import { cn } from "@/lib/utils";

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
      <article className="bg-card rounded-lg border border-border hover:border-accent transition-colors duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-4 pb-4">
          <button
            onClick={handleProfileClick}
            className="flex items-center space-x-3 hover:bg-accent/50 rounded-lg p-2 -m-2 transition-colors duration-200"
          >
            <Avatar className="h-10 w-10">
              <AvatarImage src={post?.owner?.avatar} alt={post?.author?.name} />
              <AvatarFallback>{post?.author?.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="text-left">
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-foreground">
                  {post?.author?.name}
                </span>
                {post?.author?.isVerified && (
                  <BadgeCheck className="h-6 w-6 text-primary" />
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                in {post?.community?.name} •{" "}
                {formatDistanceToNow(new Date(post.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </button>

          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBookmarkClick}
              className={cn(
                "h-8 w-8 p-0",
                post.isBookmarked ? "text-primary " : "text-muted-foreground"
              )}
            >
              <Bookmark
                className={cn("h-4 w-4", post.isBookmarked && "fill-current")}
              />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-muted-foreground"
            >
              <Share2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-muted-foreground"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 pb-4">
          <h2 className="text-xl font-bold text-foreground mb-3 leading-tight">
            {post.title}
          </h2>
          <p className="text-foreground leading-relaxed">{post.content}</p>
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
        <div className="flex items-center justify-between p-2 pt-4 border-t border-border">
          <div className="flex items-center ">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLoveClick}
              className={cn(
                "flex items-center  hover:bg-red-50 dark:hover:bg-red-950/20",
                post.isLoved
                  ? "text-red-600 dark:text-red-400"
                  : "text-muted-foreground"
              )}
            >
              <Heart
                className={cn("h-5 w-5", post.isLoved && "fill-current")}
              />
              {/* <span className="text-sm font-medium">Love</span> */}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCommentsClick}
              className="flex items-center  text-muted-foreground hover:bg-blue-50 dark:hover:bg-blue-950/20 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <MessageCircle className="h-5 w-5" />
              {/* <span className="text-sm font-medium">Comment</span> */}
            </Button>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex -space-x-1">
              {post?.lovedBy?.slice(0, 3).map((user, index) => (
                <Avatar key={user?.id} className="h-6 w-6 border-2 border-card">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback className="text-xs">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <span>{post.lovesCount} loves</span>
              <span>•</span>
              <span>{post.commentsCount} comments</span>
            </div>
          </div>
        </div>
      </article>

      <ProfileDialog
        userId={post?.author?.id}
        open={isProfileDialogOpen}
        onOpenChange={setIsProfileDialogOpen}
      />

      <CommentsDrawer
        postId={post?.id}
        open={isCommentsDrawerOpen}
        onOpenChange={setIsCommentsDrawerOpen}
      />
    </>
  );
}
