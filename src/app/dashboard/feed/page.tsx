import { InfiniteFeed } from "@/components/feed/infinite-feed";
import React from "react";

const FeedPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto py-8 px-4">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Feed</h1>
          <p className="text-gray-600">
            Discover what's happening in your communities
          </p>
        </header>

        <InfiniteFeed />
      </div>
    </div>
  );
};

export default FeedPage;
