import { Record } from "@/utils/types/Record";
import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || '').replace(/\/+$/,'')

export async function GET(req: NextRequest) {
  const userId = req.headers.get("x-user-id");
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const res = await fetch(BACKEND_URL+'/api/v2/records/user/'+userId);
    if(!res.ok){
      throw new Error("Failed to fetch user's records");
    }
    const data = await res.json();
    const data2 = (data as Record[]).map(({ user_id: _, ...rest }) => rest);
    return NextResponse.json(data2, { status: res.status });
  } catch(error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch user's records" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const userId = req.headers.get("x-user-id");
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const record = await req.json();
  try {
    const res = await fetch(BACKEND_URL + '/api/v2/records', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: userId,
        ...record
      })
    });
    if(!res.ok){
      throw new Error("Failed to create record");
    }
    const data = await res.json();
    delete data.user_id;
    return NextResponse.json(data, { status: res.status })
  } catch(error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create record" }, { status: 500 })
  }
}