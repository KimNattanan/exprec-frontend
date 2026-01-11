'use client'

import AboutPage from "@/app/_components/AboutPage";
import Footer from "@/app/_components/Footer";
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
    <>
      <div className="
        flex justify-center items-center h-screen
        md:px-12
        sm:px-6 sm:flex-row
        flex-col
      ">
        <div className="flex-4 sm:flex-1 flex items-center justify-end flex-col">
          <a href={FRONTEND_URL}>
            <div className="
              flex items-center font-medium justify-center
              lg:text-8xl
              md:text-7xl
              sm:text-6xl
              xs:text-8xl
              text-6xl
            ">
              <div className="text-foreground3 transition-all ease-linear duration-1000" style={iconStyle}><BsCashCoin/></div>
              <div className="text-good transition-all ease-linear duration-1000" style={exprecStyle}>Exprec</div>
            </div>
          </a>
          <div className="
            font-black mx-auto w-fit mt-4
            lg:text-2xl
            md:text-lg
            sm:text-sm
            xs:text-2xl
            text-sm
          ">TRACK YOUR EXPENSES</div>
        </div>
        <div className="flex-3 sm:flex-1 flex items-start justify-center mt-12 sm:mt-0">
          <div className="h-fit w-fit text-center">
            <GoogleLoginBtn/>
            <button
              className="rounded-full font-semibold text-blue-500 underline text-xl mt-4 cursor-pointer"
              onClick={()=>{window.location.hash = ''; window.location.hash = 'about'; }}
            >
              {`↓ What's Exprec? ↓`}
            </button>
          </div>
        </div>
      </div>
      <AboutPage/>
      <Footer/>
    </>
  )
}