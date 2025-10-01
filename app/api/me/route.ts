import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || '').replace(/\/+$/,'')

export function GET(req: NextRequest) {
  const user = req.headers.get("x-user");
  if(!user){
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(user, { status: 200 })
}

export async function DELETE(req: NextRequest) {
  const userId = req.headers.get("x-user-id");
  if(!userId){
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try{
    const res = await fetch(BACKEND_URL+'/api/v2/users/'+userId, {
      method: 'DELETE'
    });
    if(!res.ok){
      throw new Error("Failed to delete user")
    }
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch(error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }

}