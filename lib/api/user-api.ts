'use client'

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Preference } from "@/types/api";

const FRONTEND_URL = (process.env.NEXT_PUBLIC_FRONTEND_URL || '').replace(/\/+$/,'')
const BACKEND_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || '').replace(/\/+$/,'')

export async function getUser() {
  try{
    const res = await fetch(`${FRONTEND_URL}/api/me`);
    if(!res.ok){
      console.error(await res.json());
      return null;
    }
    return JSON.parse(await res.json());
  } catch(error) {
    console.error(error);
    return null;
  }
}

export async function logoutUser(router: AppRouterInstance){
  try{
    const res = await fetch(`${FRONTEND_URL}/api/me/logout`, {
      method: 'POST'
    });
    if(!res.ok){
      console.error(await res.json());
      return;
    }
    router.refresh();
  } catch(error) {
    console.error(error);
  }
}

export async function deleteUser(router: AppRouterInstance) {
  try{
    const res = await fetch(`${BACKEND_URL}/api/v2/users`, {
      method: 'DELETE',
      credentials: 'include'
    });
    if(!res.ok){
      console.error(await res.json());
      return false;
    }
    logoutUser(router);
    return true;
  } catch(error) {
    console.error(error);
    return false;
  }
}

export async function getUserPreference() {
  try{
    const res = await fetch(`${BACKEND_URL}/api/v2/preferences`,{
      method: "GET",
      credentials: "include"
    });
    if(!res.ok){
      console.error(await res.json());
      return null;
    }
    const data = await res.json();
    return data;
  } catch(error) {
    console.error(error);
    return null;
  }
}
export async function setUserPreference(preference: Preference) {
  try{
    const res = await fetch(`${BACKEND_URL}/api/v2/preferences`,{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(preference),
      credentials: "include"
    });
    if(!res.ok){
      console.error(await res.json());
      return null;
    }
    const data = res.json();
    return data;
  } catch(error) {
    console.error(error);
    return null;
  }
}