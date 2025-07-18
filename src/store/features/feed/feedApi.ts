import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Post, Comment, FeedResponse, User } from './types';
import { generateDummyPosts, generateDummyComments, generateDummyUser } from './dummyData';

export const feedApi = createApi({
  reducerPath: 'feedApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  tagTypes: ['Post', 'Comment', 'User'],
  endpoints: (builder) => ({
    getFeed: builder.query<FeedResponse, { cursor?: string; limit?: number }>({
      queryFn: async ({ cursor = '0', limit = 10 }) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const startIndex = parseInt(cursor);
        const posts = generateDummyPosts(limit, startIndex);
        
        return {
          data: {
            posts,
            hasNextPage: startIndex + limit < 100, // Assume 100 total posts
            nextCursor: (startIndex + limit).toString(),
          },
        };
      },
      providesTags: ['Post'],
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        if (newItems.posts.length === 0) return currentCache;
        return {
          ...newItems,
          posts: [...currentCache.posts, ...newItems.posts],
        };
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.cursor !== previousArg?.cursor;
      },
    }),
    
    getPostComments: builder.query<Comment[], string>({
      queryFn: async (postId) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return { data: generateDummyComments(postId) };
      },
      providesTags: ['Comment'],
    }),
    
    getUserProfile: builder.query<User, string>({
      queryFn: async (userId) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return { data: generateDummyUser(userId) };
      },
      providesTags: ['User'],
    }),
    
    togglePostLove: builder.mutation<void, { postId: string; isLoved: boolean }>({
      queryFn: async () => {
        await new Promise(resolve => setTimeout(resolve, 200));
        return { data: undefined };
      },
      invalidatesTags: ['Post'],
    }),
    
    toggleBookmark: builder.mutation<void, { postId: string; isBookmarked: boolean }>({
      queryFn: async () => {
        await new Promise(resolve => setTimeout(resolve, 200));
        return { data: undefined };
      },
      invalidatesTags: ['Post'],
    }),
    
    addComment: builder.mutation<Comment, { postId: string; content: string }>({
      queryFn: async ({ content }) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        const newComment: Comment = {
          id: Date.now().toString(),
          content,
          author: generateDummyUser('current-user'),
          createdAt: new Date().toISOString(),
          lovesCount: 0,
          isLoved: false,
        };
        return { data: newComment };
      },
      invalidatesTags: ['Comment', 'Post'],
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