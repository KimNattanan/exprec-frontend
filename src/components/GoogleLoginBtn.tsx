'use client';

import { getUser } from "@/lib/api/user-api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const BACKEND_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || '').replace(/\/+$/,'')


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

  const [authorized, setAuthorized] = useState(0);

  useEffect(()=>{
    const checkAuthorized = async() => {
      setAuthorized((await getUser()) ? 1 : -1);
    };
    checkAuthorized();
  },[]);

  if(authorized == -1){
    return (
      <a href={`${BACKEND_URL}/api/v2/auth/google/login`}>
        <LoginBtn/>
      </a>
    );
  }
  if(authorized == 0){
    return (
      <div className="opacity-50 hover:animate-[pulse_1s_cubic-bezier(0.4,0,0.6,1)_infinite]">
        <LoginBtn/>
      </div>
    );
  }
  return (
    <Link href={'/home'} className="hover:animate-[pulse_1s_cubic-bezier(0.4,0,0.6,1)_infinite]">
      <LoginBtn/>
    </Link>
  );
}