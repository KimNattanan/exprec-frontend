import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
  const userEmail = req.headers.get("x-user-email");
  if(!userEmail){
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(userEmail, { status: 200 })
}