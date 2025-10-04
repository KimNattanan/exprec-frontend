import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  
  const user = req.headers.get("x-user");
  if(!user){
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const cookieStore = await cookies();
  cookieStore.delete("loginToken");
  return NextResponse.json(null, { status: 200 });
}