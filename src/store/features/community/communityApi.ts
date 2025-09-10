import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CommunityTypes } from "./types";

export const communityApi = createApi({
  reducerPath: "communityApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  endpoints: (builder) => ({
    getAllCommunities: builder.query<CommunityTypes[], void>({
      query: () => "community",
      transformResponse: (res: { data: CommunityTypes[] }) => res.data,
    }),
  }),
});

export const { useGetAllCommunitiesQuery } = communityApi;
