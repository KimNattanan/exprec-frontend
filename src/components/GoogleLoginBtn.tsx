'use client';

import { useUser } from "@/lib/auth";
import Link from "next/link";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/+$/,'')

function LoginBtn() {
  return (
    <div className="
      bg-foreground text-background rounded-full font-medium
      lg:p-2
      p-1 w-fit
    ">
      <div className="
        rounded-full py-1
        lg:px-12 lg:text-lg lg:border-3
        md:text-sm
        sm:px-9 sm:text-sm sm:border-2
        xs:text-base
        border-2 px-12 text-sm
      ">
        Log in / Register with Google
      </div>
    </div>
  )
}
export default function GoogleLoginBtn() {

  const user = useUser();

  if(user.isPending){
    return (
      <div className="opacity-50 hover:animate-[pulse_1s_cubic-bezier(0.4,0,0.6,1)_infinite]">
        <LoginBtn/>
      </div>
    );
  }
  if(user.isError){
    return (
      <a href={`${API_URL}/auth/google/login`}>
        <LoginBtn/>
      </a>
    );
  }
  return (
    <Link href={'/home'} className="hover:animate-[pulse_1s_cubic-bezier(0.4,0,0.6,1)_infinite]">
      <LoginBtn/>
    </Link>
  );
}