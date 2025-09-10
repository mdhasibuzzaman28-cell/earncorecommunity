"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { PostCard } from "./post-card";
import { PostSkeleton } from "./post-skeleton";
import { useGetFeedQuery } from "@/store/features/feed/feedApi";
import { Loader } from "lucide-react";

export function InfiniteFeed() {
  const [limit, setLimit] = useState(10);

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "100px",
  });

  const { data, isLoading, isFetching, refetch } = useGetFeedQuery({
    cursor: "1",
    limit: limit,
  });

  const loadMore = () => {
    setLimit((prevLimit) => prevLimit + 10);
  };

  useEffect(() => {
    if (inView && !isFetching && data?.docs?.length > 0) {
      // Check if we have more posts to potentially load
      // This is a simple check - you might want to adjust based on your API response
      const hasMorePosts = data.docs.length >= limit;

      if (hasMorePosts) {
        loadMore();
      }
    }
  }, [inView, isFetching, data?.docs?.length, limit]);

  // Refetch when limit changes
  useEffect(() => {
    if (limit > 10) {
      // Only refetch when limit increases from initial value
      refetch();
    }
  }, [limit, refetch]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <PostSkeleton key={i} />
        ))}
      </div>
    );
  }

  const posts = data?.docs || [];
  const hasMorePosts = posts.length >= limit;
  console.log("posts", posts, "limit", limit);

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {/* Loading trigger */}
      <div ref={ref} className="h-10">
        {isFetching && hasMorePosts && (
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <PostSkeleton key={`loading-${i}`} />
            ))}
          </div>
        )}
      </div>

      {!hasMorePosts && posts.length > 0 && (
        <div className="text-center py-2 text-muted-foreground">
          {/* <p>You've reached the end of the feed!</p> */}
          <div className="flex items-center justify-center">
            <Loader className="animate-spin" />
          </div>
        </div>
      )}
    </div>
  );
}
