import { NextResponse } from "next/server";

export async function middleware(req) {
  if (req.nextUrl.pathname.startsWith("/register")) {
    if (req.cookies.has("visited") === false) {
      const response = NextResponse.next();
      response.cookies.set({
        name: "visited",
        value: true,
        maxAge: 3600,
        httpOnly: true,
      });
      console.log("쿠키생성");
      return response;
    }
  }
  return NextResponse.next();
}
