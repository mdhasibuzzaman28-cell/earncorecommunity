import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}api/user/checkUser`,
      {},
      {
        headers: {
          Cookie: request.headers.get("cookie") || "",
        },
      }
    );

    const user = res?.data?.isValid;

    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } catch (error) {
    console.error("Auth check failed:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  // matcher: ["/dashboard/:path*"],
};
