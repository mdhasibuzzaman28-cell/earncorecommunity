import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Course, UpdateProgressPayload } from "../types/lms.types";

// Mock data for demonstration
const mockCourseData: Course = {
  id: "1",
  title: "Mastering The Hiring Game",
  description: "Mastering The Hiring Game",
  currentProgress: 15,
  totalLessons: 24,
  completedLessons: 4,
  modules: [
    {
      id: "module-1",
      title: "Entrepreneurship Fundamentals",
      isCompleted: false,
      isExpanded: true,
      totalDuration: 195,
      lessons: [
        {
          id: "lesson-1",
          title: "Introduction to Entrepreneurship",
          videoUrl: "https://www.youtube.com/embed/Wbp96roLw9Y",
          duration: 30,
          isCompleted: true,
        },
        {
          id: "lesson-2",
          title: "Identifying Market Opportunities",
          videoUrl: "https://www.youtube.com/embed/Wbp96roLw9Y",
          duration: 45,
          isCompleted: true,
        },
        {
          id: "lesson-3",
          title: "Validating Your Business Idea",
          videoUrl: "https://www.youtube.com/embed/Wbp96roLw9Y",
          duration: 40,
          isCompleted: false,
        },
        {
          id: "lesson-4",
          title: "Building Your MVP",
          videoUrl: "https://www.youtube.com/embed/Wbp96roLw9Y",
          duration: 50,
          isCompleted: false,
        },
        {
          id: "lesson-5",
          title: "Customer Development Process",
          videoUrl: "https://www.youtube.com/embed/Wbp96roLw9Y",
          duration: 30,
          isCompleted: false,
        },
      ],
    },
    {
      id: "module-2",
      title: "Business Planning & Strategy",
      isCompleted: false,
      isExpanded: false,
      totalDuration: 220,
      lessons: [
        {
          id: "lesson-6",
          title: "Writing a Business Plan",
          videoUrl: "https://www.youtube.com/embed/Wbp96roLw9Y",
          duration: 55,
          isCompleted: false,
        },
        {
          id: "lesson-7",
          title: "Market Research & Analysis",
          videoUrl: "https://www.youtube.com/embed/Wbp96roLw9Y",
          duration: 45,
          isCompleted: false,
        },
        {
          id: "lesson-8",
          title: "Competitive Analysis",
          videoUrl: "https://www.youtube.com/embed/Wbp96roLw9Y",
          duration: 35,
          isCompleted: false,
        },
        {
          id: "lesson-9",
          title: "Financial Projections",
          videoUrl: "https://www.youtube.com/embed/Wbp96roLw9Y",
          duration: 50,
          isCompleted: false,
        },
        {
          id: "lesson-10",
          title: "Risk Assessment & Mitigation",
          videoUrl: "https://www.youtube.com/embed/Wbp96roLw9Y",
          duration: 35,
          isCompleted: false,
        },
      ],
    },
    {
      id: "module-3",
      title: "Digital Marketing for Startups",
      isCompleted: false,
      isExpanded: false,
      totalDuration: 280,
      lessons: [
        {
          id: "lesson-11",
          title: "Building Your Brand Identity",
          videoUrl: "https://www.youtube.com/embed/Wbp96roLw9Y",
          duration: 40,
          isCompleted: false,
        },
        {
          id: "lesson-12",
          title: "Social Media Marketing Strategy",
          videoUrl: "https://www.youtube.com/embed/Wbp96roLw9Y",
          duration: 50,
          isCompleted: false,
        },
        {
          id: "lesson-13",
          title: "Content Marketing & SEO",
          videoUrl: "https://www.youtube.com/embed/Wbp96roLw9Y",
          duration: 45,
          isCompleted: false,
        },
        {
          id: "lesson-14",
          title: "Email Marketing Campaigns",
          videoUrl: "https://www.youtube.com/embed/Wbp96roLw9Y",
          duration: 35,
          isCompleted: false,
        },
        {
          id: "lesson-15",
          title: "Paid Advertising & PPC",
          videoUrl: "https://www.youtube.com/embed/Wbp96roLw9Y",
          duration: 40,
          isCompleted: false,
        },
        {
          id: "lesson-16",
          title: "Analytics & Performance Tracking",
          videoUrl: "https://www.youtube.com/embed/Wbp96roLw9Y",
          duration: 30,
          isCompleted: false,
        },
        {
          id: "lesson-17",
          title: "Conversion Rate Optimization",
          videoUrl: "https://www.youtube.com/embed/Wbp96roLw9Y",
          duration: 40,
          isCompleted: false,
        },
      ],
    },
    {
      id: "module-4",
      title: "Funding & Investment",
      isCompleted: false,
      isExpanded: false,
      totalDuration: 200,
      lessons: [
        {
          id: "lesson-18",
          title: "Understanding Funding Options",
          videoUrl: "https://www.youtube.com/embed/Wbp96roLw9Y",
          duration: 35,
          isCompleted: false,
        },
        {
          id: "lesson-19",
          title: "Bootstrapping Your Business",
          videoUrl: "https://www.youtube.com/embed/Wbp96roLw9Y",
          duration: 30,
          isCompleted: false,
        },
        {
          id: "lesson-20",
          title: "Angel Investors & Venture Capital",
          videoUrl: "https://www.youtube.com/embed/Wbp96roLw9Y",
          duration: 50,
          isCompleted: false,
        },
        {
          id: "lesson-21",
          title: "Preparing Your Pitch Deck",
          videoUrl: "https://www.youtube.com/embed/Wbp96roLw9Y",
          duration: 45,
          isCompleted: false,
        },
        {
          id: "lesson-22",
          title: "Due Diligence Process",
          videoUrl: "https://www.youtube.com/embed/Wbp96roLw9Y",
          duration: 40,
          isCompleted: false,
        },
      ],
    },
    {
      id: "module-5",
      title: "Operations & Growth",
      isCompleted: false,
      isExpanded: false,
      totalDuration: 240,
      lessons: [
        {
          id: "lesson-23",
          title: "Building Your Team",
          videoUrl: "https://www.youtube.com/embed/Wbp96roLw9Y",
          duration: 45,
          isCompleted: false,
        },
        {
          id: "lesson-24",
          title: "Legal Structure & Compliance",
          videoUrl: "https://www.youtube.com/embed/Wbp96roLw9Y",
          duration: 40,
          isCompleted: false,
        },
        {
          id: "lesson-25",
          title: "Financial Management & Bookkeeping",
          videoUrl: "https://www.youtube.com/embed/Wbp96roLw9Y",
          duration: 50,
          isCompleted: false,
        },
        {
          id: "lesson-26",
          title: "Scaling Your Business",
          videoUrl: "https://www.youtube.com/embed/Wbp96roLw9Y",
          duration: 55,
          isCompleted: false,
        },
        {
          id: "lesson-27",
          title: "Customer Success & Retention",
          videoUrl: "https://www.youtube.com/embed/Wbp96roLw9Y",
          duration: 35,
          isCompleted: false,
        },
        {
          id: "lesson-28",
          title: "Exit Strategies",
          videoUrl: "https://www.youtube.com/embed/Wbp96roLw9Y",
          duration: 15,
          isCompleted: false,
        },
      ],
    },
  ],
};

export const lmsApi = createApi({
  reducerPath: "lmsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/lms",
  }),
  tagTypes: ["Course", "Progress"],
  endpoints: (builder) => ({
    getCourse: builder.query<Course, string>({
      queryFn: async (courseId) => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Return mock data for now
        return { data: { ...mockCourseData, id: courseId } };
      },
      providesTags: (result, error, courseId) => [
        { type: "Course", id: courseId },
      ],
    }),

    updateProgress: builder.mutation<void, UpdateProgressPayload>({
      queryFn: async (payload) => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 200));

        // In a real app, this would make an API call to update progress
        console.log("Updating progress:", payload);

        return { data: undefined };
      },
      invalidatesTags: (result, error, { courseId }) => [
        { type: "Course", id: courseId },
        { type: "Progress", id: courseId },
      ],
    }),

    getCourseProgress: builder.query<number, string>({
      queryFn: async (courseId) => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 300));

        // Return mock progress data
        return { data: mockCourseData.currentProgress };
      },
      providesTags: (result, error, courseId) => [
        { type: "Progress", id: courseId },
      ],
    }),
  }),
});

export const {
  useGetCourseQuery,
  useUpdateProgressMutation,
  useGetCourseProgressQuery,
} = lmsApi;
