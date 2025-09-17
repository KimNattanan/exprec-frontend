import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

interface UserInterface {
  id: string,
  email: string,
  name: string,
  prices: unknown[]
}

export async function middleware(req: NextRequest) {
  try {
    const loginToken = req.cookies.get('loginToken');
    if (!loginToken) throw new Error("loginToken not found");

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) throw new Error("JWT_SECRET not set");

    // Convert the secret to a Uint8Array
    const secret = new TextEncoder().encode(jwtSecret);
    const { payload } = await jwtVerify(loginToken.value, secret);
    const user = payload.user as UserInterface

    console.log(user)

    const headers = new Headers(req.headers);
    headers.set('x-user-id', user.id as string);
    headers.set('x-user-email', user.email as string);
    
    return NextResponse.next({ request: { headers } });
  } catch(error) {
    console.log(error);
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/((?!login|register|_next|favicon.ico).*)'], 
}