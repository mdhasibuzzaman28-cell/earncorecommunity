import { InfiniteFeed } from "@/components/feed/infinite-feed";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const FeedPage = ({ params }: { params: { community: string } }) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-background sticky top-0 flex h-16 shrink-0 items-center z-50 gap-2 border-b px-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#">Feed</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>{params.community}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="max-w-3xl mx-auto py-8 px-4">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Feed</h1>
          <p className="text-foreground">
            Discover what's happening in your communities
          </p>
        </header>

        <InfiniteFeed />
      </div>
    </div>
  );
};

export default FeedPage;
