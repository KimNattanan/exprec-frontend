import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
  const email = req.headers.get("x-user-email");
  if(!email){
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({email}, { status: 200 })
}