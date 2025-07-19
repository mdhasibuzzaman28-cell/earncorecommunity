"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Send, Smile, Heart } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  useGetPostCommentsQuery,
  useAddCommentMutation,
} from "@/store/features/feed/feedApi";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

const EmojiPicker = dynamic(() => import("emoji-picker-react"), { ssr: false });

interface CommentsDrawerProps {
  postId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommentsDrawer({
  postId,
  open,
  onOpenChange,
}: CommentsDrawerProps) {
  const [newComment, setNewComment] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { data: comments, isLoading } = useGetPostCommentsQuery(postId, {
    skip: !open,
  });
  const [addComment, { isLoading: isAddingComment }] = useAddCommentMutation();

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;

    try {
      await addComment({ postId, content: newComment }).unwrap();
      setNewComment("");
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  const handleEmojiSelect = (emoji: any) => {
    setNewComment((prev) => prev + emoji.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="h-[85vh]">
        <DrawerHeader>
          <DrawerTitle>Comments</DrawerTitle>
        </DrawerHeader>

        <div className="flex flex-col flex-1 min-h-0">
          {/* Comments List */}
          <ScrollArea className="flex-1 px-6">
            {isLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex space-x-3">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4 pb-4">
                {comments?.map((comment) => (
                  <div key={comment.id} className="flex space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={comment.author.avatar}
                        alt={comment.author.name}
                      />
                      <AvatarFallback className="text-xs">
                        {comment.author.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="bg-muted rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-semibold text-sm text-foreground">
                            {comment.author.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(comment.createdAt), {
                              addSuffix: true,
                            })}
                          </span>
                        </div>
                        <p className="text-sm text-foreground">
                          {comment.content}
                        </p>
                      </div>
                      <div className="flex items-center space-x-3 px-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={cn(
                            "h-6 px-2 text-xs",
                            comment.isLoved
                              ? "text-red-600 dark:text-red-400"
                              : "text-muted-foreground"
                          )}
                        >
                          <Heart
                            className={cn(
                              "h-3 w-3 mr-1",
                              comment.isLoved && "fill-current"
                            )}
                          />
                          {comment.lovesCount > 0 && comment.lovesCount}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2 text-xs text-muted-foreground"
                        >
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>

          {/* Comment Input */}
          <div className="border-t border-border p-4 space-y-3">
            <div className="relative">
              <Textarea
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="resize-none pr-20"
                rows={3}
              />
              <div className="absolute bottom-2 right-2 flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="h-8 w-8 p-0"
                >
                  <Smile className="h-4 w-4" />
                </Button>
                <Button
                  onClick={handleSubmitComment}
                  disabled={!newComment.trim() || isAddingComment}
                  size="sm"
                  className="h-8 w-8 p-0"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {showEmojiPicker && (
              <div className="absolute bottom-full right-4 z-50">
                <EmojiPicker
                  onEmojiClick={handleEmojiSelect}
                  width={300}
                  height={400}
                />
              </div>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
