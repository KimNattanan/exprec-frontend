'use server'
import { importJWK, SignJWT } from "jose";
import { cookies as _cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function writeLoginToken(email: string) {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) throw new Error("JWT_SECRET not set");
  const secretJWK = {
    kty: 'oct',
    k: jwtSecret
  }
  const secretKey = await importJWK(secretJWK, 'HS256')
  const token = await new SignJWT({ email }).setProtectedHeader({ alg: 'HS256' })
                                            .setIssuedAt()
                                            .setExpirationTime('2352h')
                                            .sign(secretKey);
  const cookies = await _cookies();
  cookies.set("token", token);
  redirect("/")
}