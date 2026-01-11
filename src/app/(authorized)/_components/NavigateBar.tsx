'use client'

import { usePreferences } from "@/features/preferences/api/get-preferences";
import { useUpdatePreferences } from "@/features/preferences/api/update-preferences";
import { useUser } from "@/lib/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react"
import { BsCashCoin } from "react-icons/bs";
import { CiDark, CiLight, CiSettings } from "react-icons/ci";

function MenuBtn({ toggle }:{ toggle: boolean }) {
  return (
    <div>
      <div
        className="rounded-full transition-all w-12 h-1 bg-foreground mb-2"
        style={toggle ? {
          rotate: "30deg",
          translate: "0 0.375rem"
        } : {
          rotate: "0deg"
        }}
      />
      <div
        className="rounded-full transition-all w-12 h-1 bg-foreground mt-2"
        style={toggle ? {
          rotate: "-30deg",
          translate: "0 -0.375rem"
        } : {
          rotate: "0deg"
        }}
      />
    </div>
  )
}

function MenuContainer({ toggle, toggleTheme, themeState }:{ toggle: boolean, toggleTheme: ()=>void, themeState: string }) {
  return (
    <div
      className="
        fixed h-[calc(100dvh-4rem)] z-50 w-dvw md:hidden
        bg-background/50
        p-12
      "
      hidden={!toggle}
    >
      <div className="h-full w-full bg-background rounded-4xl">
        <div className="
          h-full w-full p-2
          bg-foreground3/30 rounded-4xl
        ">
          <div className="
            h-full w-full py-12 flex flex-col
            border-background rounded-3xl border-4 border-dashed
            text-2xl xs:text-4xl
          ">
            <div className="flex-1 mx-auto w-fit font-medium cursor-pointer">
              <Link href={'/home'}>
                <div className="hover:border-b-2">Home</div>
              </Link>
            </div>
            <div className="flex-1 mx-auto w-fit font-medium cursor-pointer">
              <Link href={'/history'}>
                <div className="hover:border-b-2">History</div>
              </Link>
            </div>
            <div className="flex-1 mx-auto w-fit font-medium cursor-pointer">
              <Link href={'/history/dashboard'}>
                <div className="hover:border-b-2">Dashboard</div>
              </Link>
            </div>
            <div
              className="
                flex-1 mx-auto w-fit cursor-pointer
                text-4xl xs:text-6xl
              "
              onClick={toggleTheme}
            >
              {themeState=='light' ? (
                <CiLight/>
              ) : (
                <CiDark/>
              )}
            </div>
            <Link href={'/settings'}>
              <div className="
                flex-1 mx-auto w-fit
                text-4xl xs:text-6xl
              ">
                <CiSettings/>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function NavigateBar() {
  const user = useUser();
  const preferences = usePreferences({
    queryConfig: {
      staleTime: 1000 * 60 * 30,
    }
  });
  const [themeState, setThemeState] = useState('light');
  const updatePreferences = useUpdatePreferences({
    mutationConfig: {
      onMutate: ({ data }) => {
        setThemeState(data.theme);
      },
    },
  });

  useEffect(()=>{setThemeState(preferences.data?.theme||'light')},[preferences.data?.theme]);
  
  const pathname = usePathname();
  
  const [showMenu, setShowMenu] = useState(false);

  const setTheme = (theme: string)=>{
    if(preferences.isPending || preferences.isError) return;
    if(theme == preferences.data.theme) return;
    updatePreferences.mutate({ data: {
      theme,
    }});
  }
  useEffect(()=>{
    const root = document.documentElement;
    if(themeState == 'light'){
      root.removeAttribute("data-theme");
    }else if(themeState == 'dark'){
      root.setAttribute("data-theme", "dark");
    }
  },[themeState]);
  const toggleTheme = ()=>{
    if(preferences.isPending || preferences.isError) return;
    setTheme(preferences.data.theme=='light' ? 'dark' : 'light');
  }

  useEffect(()=>{
    setShowMenu(false)
  },[pathname])

  return (
    <>
      <div className="sticky h-16"/>
      <div className="fixed bg-background transition-colors duration-500 flex items-center top-0 w-full h-16 z-50">
        <div className="flex h-full items-center grow">
          <Link href={'/'} className="h-full pl-8">
            <div className="h-full flex items-center justify-center text-xl">
              <BsCashCoin/> Exprec
            </div>
          </Link>
        </div>
        <div className="flex md:hidden text-4xl h-full aspect-square items-center justify-center px-8">
          <div className="h-fit" onClick={()=>setShowMenu(!showMenu)}>
            <MenuBtn toggle={showMenu}/>
          </div>
        </div>
        <div className="hidden md:flex h-full items-center justify-end text-lg lg:text-xl">
          <div className="h-full mx-8 aspect-square flex items-center justify-center">
            <Link href={'/home'}>
              <div className="hover:border-b-2">Home</div>
            </Link>
          </div>
          <div className="h-full mx-8 aspect-square flex items-center justify-center">
            <Link href={'/history'}>
              <div className="hover:border-b-2">History</div>
            </Link>
          </div>
          <div className="h-full mx-8 aspect-square flex items-center justify-center">
            <Link href={'/history/dashboard'}>
              <div className="hover:border-b-2">Dashboard</div>
            </Link>
          </div>
          <div
            className="cursor-pointer mx-8 h-full aspect-square flex items-center justify-center text-4xl"
            onClick={toggleTheme}
          >
            {(preferences.data?.theme||'light')=='light' ? (
              <CiLight/>
            ) : (
              <CiDark/>
            )}
          </div>
          <div className="h-full mx-8">
            <Link href={'/settings'}>
              <div className="h-full aspect-square flex items-center justify-center text-4xl">
                <CiSettings/>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <MenuContainer toggle={showMenu} toggleTheme={toggleTheme} themeState={preferences.data?.theme||'light'}/>
      <div className="fixed xs:text-sm text-xs right-0 px-4 mx-4 font-medium border-b-1 z-50 bg-background/50">
        {user.isPending ? '...' : user.data?.email}
      </div>
    </>
  )
}