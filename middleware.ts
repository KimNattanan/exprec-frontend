import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { User } from "./types/api";

export async function middleware(req: NextRequest) {
  try {
    const loginToken = req.cookies.get('loginToken');
    if (!loginToken) throw new Error("loginToken not found");

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) throw new Error("JWT_SECRET not set");

    const secret = new TextEncoder().encode(jwtSecret);
    const { payload } = await jwtVerify(loginToken.value, secret);
    const user = payload.user_info as User;

    const headers = new Headers(req.headers);
    headers.set('x-user', JSON.stringify(user));
    
    return NextResponse.next({ request: { headers } });
  } catch(error) {
    console.log(error);
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/((?!login|_next|favicon.ico).*)'], 
}