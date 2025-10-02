'use client'

import { getUser, getUserPreference, logoutUser, setUserPreference } from "@/utils/api/user-api";
import { Preference } from "@/utils/types/Preference";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { BsCashCoin } from "react-icons/bs";
import { CiDark, CiLight, CiSettings } from "react-icons/ci";

export default function NavigateBar() {

  const router = useRouter()

  const [userEmail, setUserEmail] = useState('...')
  const [themeState, setThemeState] = useState('light');

  const setTheme = (theme: string)=>{
    setThemeState(theme);
    setUserPreference({ theme });
    const root = document.documentElement;
    if(theme == 'light'){
      root.removeAttribute("data-theme");
    }else if(theme == 'dark'){
      root.setAttribute("data-theme", "dark");
    }
  }
  const toggleTheme = ()=>setTheme(themeState=='light' ? 'dark' : 'light');

  useEffect(()=>{
    const fetchUser = async()=>{
      const user = await getUser();
      if(user && user.email) setUserEmail(user.email);
      else setUserEmail('error!');
    }
    const fetchPreference = async()=>{
      const preference: Preference = await getUserPreference();
      setTheme(preference.theme);
    }
    fetchUser();
    fetchPreference();
  },[])

  return (
    <div className="sticky flex items-center top-0 w-full h-16  bg-background z-50">
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
              onClick={()=>logoutUser(router)}
            >Logout</span>
          }
        </div>
      </div>
      <div className="flex h-full items-center justify-end">
        <Link href={'/'} className="h-full mx-8">
          <div className="h-full aspect-square flex items-center justify-center text-xl">
            Home
          </div>
        </Link>
        <Link href={'/history'} className="h-full mx-8">
          <div className="h-full aspect-square flex items-center justify-center text-xl">
            History
          </div>
        </Link>
        <div
          className="cursor-pointer mx-8 select-none h-full aspect-square flex items-center justify-center text-4xl"
          onClick={toggleTheme}
        >
          {themeState=='light' ? (
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