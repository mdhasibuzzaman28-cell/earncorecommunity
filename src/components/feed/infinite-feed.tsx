"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { PostCard } from "./post-card";
import { PostSkeleton } from "./post-skeleton";
import { useGetFeedQuery } from "@/store/features/feed/feedApi";

export function InfiniteFeed() {
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "100px",
  });

  const { data, isLoading, isFetching, hasNextPage, fetchNextPage } =
    useGetFeedQuery(
      { cursor: "1", limit: 10 },
      {
        selectFromResult: (result) => ({
          ...result,
          hasNextPage: result.data?.hasNextPage ?? false,
          fetchNextPage: () => {
            if (result.data?.hasNextPage && result.data?.nextPage) {
              // result.refetch();
            }
          },
        }),
      }
    );

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetching, fetchNextPage]);

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
  console.log("posts", posts);

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {/* Loading trigger */}
      <div ref={ref} className="h-10">
        {isFetching && hasNextPage && (
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <PostSkeleton key={`loading-${i}`} />
            ))}
          </div>
        )}
      </div>

      {!hasNextPage && posts.length > 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>You've reached the end of the feed!</p>
        </div>
      )}
    </div>
  );
}
