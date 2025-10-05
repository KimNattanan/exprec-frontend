'use client'

import { getUser, getUserPreference, logoutUser, setUserPreference } from "@/lib/api/user-api";
import { Preference } from "@/types/api";
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
    if(theme == themeState) return;
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
    <div className="sticky bg-background transition-colors duration-500 flex items-center top-0 w-full h-16 z-50">
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
              className="ml-4 px-4 py-1 border-2 border-bad bg-bad hover:bg-background text-background hover:text-bad rounded-full cursor-pointer text-sm font-semibold"
              onClick={()=>logoutUser(router)}
            >Logout</span>
          }
        </div>
      </div>
      <div className="flex h-full items-center justify-end">
        <div className="h-full mx-8 aspect-square flex items-center justify-center text-xl">
          <Link href={'/'}>
            <div className="hover:border-b-2">Home</div>
          </Link>
        </div>
        <div className="h-full mx-8 aspect-square flex items-center justify-center text-xl">
          <Link href={'/history'}>
            <div className="hover:border-b-2">History</div>
          </Link>
        </div>
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