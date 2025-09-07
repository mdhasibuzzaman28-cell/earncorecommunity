import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CommunityTypes } from "./types";

export const communityApi = createApi({
  reducerPath: "communityApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/v1/" }),
  endpoints: (builder) => ({
    getAllCommunities: builder.query<CommunityTypes[], void>({
      query: () => "community",
      transformResponse: (res: { data: CommunityTypes[] }) => res.data,
    }),
  }),
});

export const { useGetAllCommunitiesQuery } = communityApi;
