'use client'

import { getUser, logoutUser } from "@/utils/userService";
import Link from "next/link";
import { useEffect, useState } from "react"
import { BsCashCoin } from "react-icons/bs";
import { CiDark, CiLight, CiSettings } from "react-icons/ci";

export default function NavigateBar() {

  const [userEmail, setUserEmail] = useState('...');
  const [isLightTheme, setIsLightTheme] = useState(true);

  const toggleTheme = ()=>{
    setIsLightTheme(!isLightTheme)
  }

  useEffect(()=>{
    const fetchData = async()=>{
      const user = await getUser();
      if(user && user.email) setUserEmail(user.email);
      else setUserEmail('error!');
    }
    fetchData()
  },[])

  return (
    <div className="sticky flex items-center top-0 w-full h-16  bg-white">
      <div className="flex h-full items-center grow">
        <Link href={'/'} className="h-full px-8">
          <div className="h-full flex items-center justify-center text-xl">
            <BsCashCoin/> Exprec
          </div>
        </Link>
        <div className="mx-4">
          <span className="mr-2">Logged in as:</span>
          {userEmail}
          { userEmail != '...' &&
            <span
              className="ml-4 px-4 py-1 border-2 border-red-700 rounded-lg text-red-700 hover:bg-red-50 cursor-pointer text-xs font-bold"
              onClick={logoutUser}
            >Logout</span>
          }
        </div>
      </div>
      <div className="flex h-full items-center justify-end">
        <div
          className="cursor-pointer mx-8 select-none h-full aspect-square flex items-center justify-center text-4xl"
          onClick={toggleTheme}
        >
          {isLightTheme ? (
            <CiLight/>
          ) : (
            <CiDark/>
          )}
        </div>
        <Link href={'/settings'} className="h-full mx-8">
          <div className="h-full aspect-square flex items-center justify-center text-4xl">
            <CiSettings/>
          </div>
        </Link>
      </div>
    </div>
  )
}