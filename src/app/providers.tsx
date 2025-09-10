"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { useGetCurrentUserQuery } from "@/store/features/authentication/authApi";
import { getCookie } from "@/utils/cookies";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthHydrator />
      {children}
    </Provider>
  );
}

function AuthHydrator() {
  const hasToken = typeof window !== "undefined" && !!getCookie("accessToken");
  useGetCurrentUserQuery(undefined, { skip: !hasToken });
  return null;
}
