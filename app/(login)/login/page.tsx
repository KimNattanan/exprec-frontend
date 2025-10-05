'use client'

import GoogleLoginBtn from "@/components/GoogleLoginBtn";
import { useEffect, useState } from "react";
import { BsCashCoin } from "react-icons/bs";

const FRONTEND_URL = (process.env.NEXT_PUBLIC_FRONTEND_URL || '').replace(/\/+$/,'')

export default function Login() {

  const [iconStyle, setIconStyle] = useState({
    translate: "0 50px",
    opacity: "0"
    
  });
  const [exprecStyle, setExprecStyle] = useState({
    translate: "0 -50px",
    opacity: "0"
  });

  useEffect(()=>{
    document.documentElement.removeAttribute("data-theme");
    setIconStyle({
      translate: "0 0",
      opacity: "1"
    });
    setExprecStyle({
      translate: "0 0",
      opacity: "1"
    });
  },[])
  return (
    <div className="flex justify-center items-center h-dvh">
      <div>
        <a href={FRONTEND_URL}>
          <div
            className="flex items-center font-medium justify-center text-8xl select-none"
          >
            <div className="text-foreground3 transition-all ease-linear duration-1000" style={iconStyle}><BsCashCoin/></div>
            <div className="text-good transition-all ease-linear duration-1000" style={exprecStyle}>Exprec</div>
          </div>
        </a>
        <div className="text-2xl font-black mx-auto w-fit mt-4">TRACK YOUR EXPENSES</div>
      </div>
        <div className="ml-16">
          <GoogleLoginBtn/>
        </div>
    </div>
  )
}