import { NextRequest, NextResponse } from "next/server"
import { importJWK, jwtVerify } from "jose"

export async function middleware(req: NextRequest) {
  try {
    const loginToken = req.cookies.get('token')
    if(!loginToken){
      throw new Error('loginToken not found')
    }
    const secretJWK = {
      kty: 'oct',
      k: process.env.NEXT_PUBLIC_JWT_SECRET
    }
    const secretKey = await importJWK(secretJWK, 'HS256')
    const { payload } = await jwtVerify(loginToken.value, secretKey)
    console.log(payload)

    return NextResponse.next()
  } catch(error) {
    console.log(error)
    return NextResponse.redirect(new URL('/login', req.url))
  }
}

export const config = {
  matcher: [
    '/((?!login|register).*)',
  ]
}