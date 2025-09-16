import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  try {
    const loginToken = req.cookies.get('loginToken');
    if (!loginToken) throw new Error("loginToken not found");

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) throw new Error("JWT_SECRET not set");

    // Convert the secret to a Uint8Array
    const secret = new TextEncoder().encode(jwtSecret);
    const { payload } = await jwtVerify(loginToken.value, secret);

    const headers = new Headers(req.headers);
    headers.set('user_id', payload.user_id as string);

    return NextResponse.next({ request: { headers } });
  } catch(error) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/((?!login|register|api|_next|favicon.ico).*)'], 
}