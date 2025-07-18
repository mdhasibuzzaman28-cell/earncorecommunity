"use client";

import React from "react";
import { useSelector } from "react-redux";
import VideoPlayer from "./VideoPlayer";
import ModuleSidebar from "./ModuleSidebar";
import { Course } from "../types/lms.types";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

interface CourseContentProps {
  course: Course;
  courseId: string;
}

interface RootState {
  lms: {
    currentLesson: any;
    currentModule: any;
  };
}

export default function CourseContent({
  course,
  courseId,
}: CourseContentProps) {
  const { currentLesson, currentModule } = useSelector(
    (state: RootState) => state.lms
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Video Player Section - 65% on desktop */}
          <div className="md:col-span-8 ">
            <VideoPlayer
              lesson={currentLesson}
              module={currentModule}
              courseId={courseId}
            />
          </div>

          {/* Module Sidebar - 35% on desktop */}
          <div className="md:col-span-4 ">
            <div className="sticky top-8">
              <ModuleSidebar course={course} currentLesson={currentLesson} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Loading skeleton component
export function CourseContentSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Video Player Skeleton */}
          <div className="lg:col-span-8 space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Card className="overflow-hidden">
              <Skeleton className="aspect-video" />
              <div className="p-4">
                <Skeleton className="h-10 w-full" />
              </div>
            </Card>
            <Card className="p-6">
              <Skeleton className="h-6 w-1/3 mb-2" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </Card>
          </div>

          {/* Sidebar Skeleton */}
          <div className="lg:col-span-4 space-y-4">
            <Card className="p-6">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-4" />
              <Skeleton className="h-2 w-full mb-2" />
              <Skeleton className="h-3 w-1/2" />
            </Card>

            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <Skeleton className="h-5 w-2/3" />
                  <Skeleton className="h-4 w-8" />
                </div>
                <div className="space-y-2">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="flex items-center gap-3 p-2">
                      <Skeleton className="h-4 w-4" />
                      <Skeleton className="h-4 flex-1" />
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
