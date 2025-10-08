import { NextRequest, NextResponse } from "next/server";
import { importJWK, jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) throw new Error("JWT_SECRET not set");
    const secretJWK = {
      kty: 'oct',
      k: jwtSecret
    }
    const secretKey = await importJWK(secretJWK, 'HS256')
    
    let loginToken = req.cookies.get('login-token')?.value;
    if(!loginToken){
      const authorizationHeader = req.headers.get('Authorization');
      if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
        loginToken = authorizationHeader.substring(7);
      } else {
        throw new Error("Unauthorized");
      }
    }

    const { payload } = await jwtVerify(loginToken, secretKey);
    const userEmail = payload.email as string

    const headers = new Headers(req.headers);
    headers.set('x-user-email', userEmail);

    return NextResponse.next({ request: { headers } });
  } catch(error) {
    console.error(error);
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/((?!login|_next|favicon.ico).*)'], 
}