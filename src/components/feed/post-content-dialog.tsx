"use client";

import { formatDistanceToNow } from "date-fns";
import { ExternalLink, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Post } from "@/store/features/feed/types";

interface PostContentDialogProps {
  post: Post;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PostContentDialog({
  post,
  open,
  onOpenChange,
}: PostContentDialogProps) {
  const formatContent = (content: string) => {
    if (!content) return "";

    return content
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/\n/g, "<br>")
      .replace(/^(\s*)\* (.+)/gm, "$1• $2")
      .replace(
        /^>\s*(.+)/gm,
        '<blockquote class="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-2">$1</blockquote>'
      );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  className="object-cover"
                  src={post?.owner?.avatar}
                  alt={post?.owner?.fullName}
                />
                <AvatarFallback>{post?.owner?.fullName?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center space-x-2">
                  <DialogTitle className="text-lg font-semibold">
                    {post?.owner?.fullName}
                  </DialogTitle>
                  {post?.community && (
                    <Badge variant="secondary" className="text-xs">
                      {post.community.name}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <span>@{post?.owner?.username}</span>
                  <span>•</span>
                  <span>
                    {formatDistanceToNow(new Date(post.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                  {post.platform && (
                    <>
                      <span>•</span>
                      <span className="capitalize">{post.platform}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            {post.sourceUrl && (
              <Button variant="outline" size="sm" asChild>
                <a href={post.sourceUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Original
                </a>
              </Button>
            )}
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1 px-6">
          <div className="pb-6">
            <h1 className="text-2xl font-bold text-foreground mb-4 leading-tight">
              {post.title}
            </h1>
            
            {post.image && (
              <div className="mb-6">
                <img
                  src={post.image}
                  alt="Post image"
                  className="w-full rounded-lg object-cover max-h-96"
                />
              </div>
            )}
            
            <div className="prose max-w-none leading-relaxed">
              <div
                dangerouslySetInnerHTML={{
                  __html: formatContent(post.content),
                }}
              />
            </div>

            {/* Metadata */}
            {post.scrapingMetadata && (
              <div className="mt-8 pt-6 border-t border-border">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">
                  Post Information
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {post.scrapingMetadata.qualityScore && (
                    <div>
                      <span className="text-muted-foreground">Quality Score:</span>
                      <span className="ml-2 font-medium">
                        {Math.round(post.scrapingMetadata.qualityScore * 100)}%
                      </span>
                    </div>
                  )}
                  {post.scrapingMetadata.contentType && (
                    <div>
                      <span className="text-muted-foreground">Content Type:</span>
                      <span className="ml-2 font-medium capitalize">
                        {post.scrapingMetadata.contentType}
                      </span>
                    </div>
                  )}
                  {post.scrapingMetadata.originalAuthor && (
                    <div>
                      <span className="text-muted-foreground">Original Author:</span>
                      <span className="ml-2 font-medium">
                        {post.scrapingMetadata.originalAuthor}
                      </span>
                    </div>
                  )}
                  {post.scrapingMetadata.originalCreatedAt && (
                    <div>
                      <span className="text-muted-foreground">Originally Posted:</span>
                      <span className="ml-2 font-medium">
                        {formatDistanceToNow(new Date(post.scrapingMetadata.originalCreatedAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  )}
                </div>
                
                {post.scrapingMetadata.tags && post.scrapingMetadata.tags.length > 0 && (
                  <div className="mt-4">
                    <span className="text-muted-foreground text-sm">Tags:</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {post.scrapingMetadata.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}