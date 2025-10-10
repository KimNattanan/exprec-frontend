import { User } from "@/types/api";
import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
  const userStr = req.headers.get("x-user");
  if(!userStr){
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const user: User = JSON.parse(userStr);
  return NextResponse.json(user, { status: 200 })
}