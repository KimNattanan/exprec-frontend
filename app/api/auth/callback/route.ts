import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export function GET(req: NextRequest) {
  const token = new URLSearchParams(window.location.search).get('token');
  if(token){
    localStorage.setItem("loginToken", token);
  }
  redirect('/')
}