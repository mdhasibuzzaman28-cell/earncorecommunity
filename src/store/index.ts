import { configureStore } from "@reduxjs/toolkit";
import lmsReducer from "../lms/store/lms.slice";
import { lmsApi } from "../lms/store/lms.api";
import { feedApi } from "./features/feed/feedApi";
import { communityApi } from "./features/community/communityApi";

export const store = configureStore({
  reducer: {
    lms: lmsReducer,
    [lmsApi.reducerPath]: lmsApi.reducer,
    [feedApi.reducerPath]: feedApi.reducer,
    [communityApi.reducerPath]: communityApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      lmsApi.middleware,
      feedApi.middleware,
      communityApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
