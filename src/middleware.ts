import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  if(2==2){
    return NextResponse.next();
  }
  try {
    const token = req.cookies.get('token');
    if (!token) throw new Error("token not found");

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) throw new Error("JWT_SECRET not set");

    const secret = new TextEncoder().encode(jwtSecret);
    const { payload } = await jwtVerify(token.value, secret);
    const userID = payload.id as string;
    const userEmail = payload.email as string;

    const headers = new Headers(req.headers);
    headers.set('x-user-id', userID);
    headers.set('x-user-email', userEmail);

    
    if(req.nextUrl.pathname == '/'){
      return NextResponse.redirect(new URL('/home', req.url));
    }
    return NextResponse.next({ request: { headers } });
  } catch(error) {
    if(req.nextUrl.pathname == '/'){
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/', req.url));
  }
}

export const config = {
  matcher: ['/((?!_next/|favicon.ico).*)'], 
}