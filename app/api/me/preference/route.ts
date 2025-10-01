import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || '').replace(/\/+$/,'')

export async function GET(req: NextRequest) {
  const userId = req.headers.get("x-user-id");
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const res = await fetch(BACKEND_URL+'/api/v2/preferences/'+userId);
    if(!res.ok){
      throw new Error("Failed to fetch user's preference");
    }
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch(error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch user's preference" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const userId = req.headers.get("x-user-id");
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const preference = await req.json();
  try {
    const res = await fetch(BACKEND_URL+'/api/v2/preferences/'+userId, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: userId,
        ...preference
      })
    });
    if(!res.ok){
      throw new Error("Failed to patch preference");
    }
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch(error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to patch preference" }, { status: 500 })
  }
}