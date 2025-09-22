import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || '').replace(/\/+$/,'')

export async function GET(req: NextRequest) {
  const userId = req.headers.get("x-user-id");
  if (!userId) {
    return NextResponse.json(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
  try {
    const res = await axios.get(BACKEND_URL + '/api/v2/prices/user/'+userId);
    return NextResponse.json(JSON.stringify(res.data), { status: 200 });
  } catch(error) {
    console.log(error);
    return NextResponse.json(JSON.stringify({ error: "Failed to fetch user's prices" }), { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const userId = req.headers.get("x-user-id");
  if (!userId) {
    return NextResponse.json(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
  const { prev_id, next_id } = await req.json();
  try {
    const res = await axios.post(BACKEND_URL + '/api/v2/prices', {
      user_id: userId,
      prev_id,
      next_id,
      amount: 0,
      bg_color: '#74BCFF'
    });
    return NextResponse.json(JSON.stringify(res.data), { status: 201 })
  } catch(error) {
    console.log(error);
    return NextResponse.json(JSON.stringify({ error: "Failed to create price" }), { status: 500 })
  }
}