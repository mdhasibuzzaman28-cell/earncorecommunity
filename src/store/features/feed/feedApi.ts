import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Post, Comment, FeedResponse, User } from "./types";
import {
  generateDummyPosts,
  generateDummyComments,
  generateDummyUser,
} from "./dummyData";

export const feedApi = createApi({
  reducerPath: "feedApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  tagTypes: ["Post", "Comment", "User"],
  endpoints: (builder) => ({
    getFeed: builder.query<FeedResponse, { cursor?: string; limit?: number }>({
      query: ({ cursor = "1", limit = 10 }) => ({
        url: "posts",
        params: {
          page: cursor,
          limit: limit,
        },
      }),
      transformResponse: (response: any) => {
        console.log("getFeed API Response:", response);
        // Return the data directly since your API wraps it in { data: {...} }
        return response.data;
      },
      providesTags: ["Post"],
    }),

    getPostComments: builder.query<Comment[], string>({
      queryFn: async (postId) => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        return { data: generateDummyComments(postId) };
      },
      providesTags: ["Comment"],
    }),

    getUserProfile: builder.query<User, string>({
      query: (username) => `users/c/${username}`,
      transformResponse: (response: any) => {
        return response.data;
      },
      providesTags: ["User"],
    }),

    togglePostLove: builder.mutation<
      void,
      { postId: string; isLoved: boolean }
    >({
      queryFn: async () => {
        await new Promise((resolve) => setTimeout(resolve, 200));
        return { data: undefined };
      },
      invalidatesTags: ["Post"],
    }),

    toggleBookmark: builder.mutation<
      void,
      { postId: string; isBookmarked: boolean }
    >({
      queryFn: async () => {
        await new Promise((resolve) => setTimeout(resolve, 200));
        return { data: undefined };
      },
      invalidatesTags: ["Post"],
    }),

    addComment: builder.mutation<Comment, { postId: string; content: string }>({
      queryFn: async ({ content }) => {
        await new Promise((resolve) => setTimeout(resolve, 300));
        const newComment: Comment = {
          id: Date.now().toString(),
          content,
          author: generateDummyUser("current-user"),
          createdAt: new Date().toISOString(),
          lovesCount: 0,
          isLoved: false,
        };
        return { data: newComment };
      },
      invalidatesTags: ["Comment", "Post"],
    }),
  }),
});

export const {
  useGetFeedQuery,
  useGetPostCommentsQuery,
  useGetUserProfileQuery,
  useTogglePostLoveMutation,
  useToggleBookmarkMutation,
  useAddCommentMutation,
} = feedApi;

//  getFeed: builder.query<FeedResponse, { cursor?: string; limit?: number }>({
//       query: ({ cursor = "1", limit = 10 }) => ({
//         url: "posts",
//         params: {
//           page: cursor,
//           limit: limit,
//         },
//       }),
//       providesTags: ["Post"],
//       serializeQueryArgs: ({ endpointName }) => {
//         return endpointName;
//       },
//       merge: (currentCache, newItems) => {
//         if (newItems?.data?.docs.length === 0) return currentCache;
//         return {
//           ...newItems,
//           posts: [...(currentCache.data?.docs || []), ...newItems.data?.docs],
//         };
//       },
//       forceRefetch({ currentArg, previousArg }) {
//         return currentArg?.cursor !== previousArg?.cursor;
//       },
//     }),
