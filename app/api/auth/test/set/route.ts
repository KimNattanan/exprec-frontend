import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || '').replace(/\/+$/,'')

export async function GET(req: NextRequest) {
  const res = await fetch(`${BACKEND_URL}/api/v2/test/set-cookie`, {
    method: 'GET',
    credentials: 'include'
  })
  if(!res.ok){
    return NextResponse.json({ error: "fail" }, { status: 500 })
  }
  return NextResponse.json({ message: await res.text() }, { status: 200 });
}