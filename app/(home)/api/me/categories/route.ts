import { randomInt } from "crypto";
import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || '').replace(/\/+$/,'')

export async function GET(req: NextRequest) {
  const userId = req.headers.get("x-user-id");
  if (!userId) {
    return NextResponse.json(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
  try {
    const res = await fetch(BACKEND_URL+'/api/v2/categories/user/'+userId);
    if(!res.ok){
      throw new Error(await res.text());
    }
    return NextResponse.json(await res.json(), { status: 200 });
  } catch(error) {
    console.log(error);
    return NextResponse.json(JSON.stringify({ error: "Failed to fetch user's categories" }), { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const userId = req.headers.get("x-user-id");
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { prev_id, next_id } = await req.json();
  try {
    const res = await fetch(BACKEND_URL + '/api/v2/categories', {
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
      throw new Error("Failed to create category");
    }
    return NextResponse.json(await res.json(), { status: 201 })
  } catch(error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 })
  }
}