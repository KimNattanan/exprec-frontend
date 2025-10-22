import { User } from "@/types/api";
import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
  const userID = req.headers.get("x-user-id");
  const userEmail = req.headers.get("x-user-email");
  if(!userID || !userEmail){
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({id: userID, email: userEmail}, { status: 200 })
}