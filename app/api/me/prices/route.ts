import { randomInt } from "crypto";
import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || '').replace(/\/+$/,'')

export async function GET(req: NextRequest) {
  const userId = req.headers.get("x-user-id");
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const res = await fetch(BACKEND_URL+'/api/v2/prices/user/'+userId);
    if(!res.ok){
      throw new Error("Failed to fetch user's prices");
    }
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch(error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch user's prices" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const userId = req.headers.get("x-user-id");
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { prev_id, next_id } = await req.json();
  try {
    const res = await fetch(BACKEND_URL + '/api/v2/prices', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: userId,
        prev_id,
        next_id,
        amount: randomInt(999),
        bg_color: '#74BCFF'
      })
    });
    if(!res.ok){
      throw new Error("Failed to create price");
    }
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch(error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create price" }, { status: 500 })
  }
}