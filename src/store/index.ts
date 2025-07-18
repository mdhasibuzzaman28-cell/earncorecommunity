import { configureStore } from '@reduxjs/toolkit';
import lmsReducer from '../lms/store/lms.slice';
import { lmsApi } from '../lms/store/lms.api';

export const store = configureStore({
  reducer: {
    lms: lmsReducer,
    [lmsApi.reducerPath]: lmsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(lmsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;