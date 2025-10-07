import { NextResponse } from "next/server";

export function GET(req: Request) {
  return NextResponse.redirect(new URL("/", req.url));

  // const url = new URL(req.url);
  // const token = url.searchParams.get("token");

  // if (!token) {
  //   return NextResponse.redirect(new URL("/login", req.url)); // fallback if no token
  // }

  // const res = NextResponse.redirect(new URL("/", req.url));

  // res.cookies.set("loginToken", token, {
  //   httpOnly: true,
  //   secure: true,    
  //   sameSite: "lax",
  //   path: "/",
  //   maxAge: 60 * 60 * 24 * 3, // 3 days
  // });

  // return res;
}